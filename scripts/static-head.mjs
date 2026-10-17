#!/usr/bin/env node
// Entry pages of the built site. Run after a build (`npm run build`), on dist/:
//
//   npm run static-head                      node scripts/static-head.mjs
//   node scripts/static-head.mjs --dist <folder>     another built folder (default: dist)
//   node scripts/static-head.mjs --config <file>     another Vite config (test builds with sample facts only)
//
// The site is a single-page app on static hosting. This script gives every real route its own index.html (so its
// address answers with HTTP 200) and writes 404.html for every other address. Each entry page is the built
// index.html with that route's own <head>:
//   - its title, description and social tags, and `noindex` on the order page and on 404.html, because link
//     previews (WhatsApp, Facebook, X) and many crawlers read the served HTML and never run the app;
//   - once the owner gives the domain (site.domain in src/lib/facts.data.ts): the canonical URL, an absolute
//     preview image URL and the page's structured data (JSON-LD), each block only from real, complete facts;
//   - one <link rel="modulepreload"> per script chunk the route's page needs, read from Vite's build manifest
//     (dist/.vite/manifest.json), so the page chunk downloads with the entry scripts instead of after them.
//
// No font preload goes into the served head. Nothing paints before the entry scripts have run, and on a slow phone
// link fonts asked for in that first wave share its bandwidth and hold the scripts back: 400 to 500 ms more to the
// first paint and to the largest one on slow 4G with a 4x slower CPU, no difference on a fast link (QA CL-01).
// src/main.tsx asks for the fonts itself as soon as the entry script runs, before the first render.
//
// There is no route list here. The routes, their titles and descriptions come from the app's own source
// (PAGE_META and the plan pages in src/lib/site.ts, through src/components/site/static-head.ts, which this script
// compiles with Vite), and the chunk of each route is read from the <Route> lines of src/App.tsx. A page hidden
// until the owner says yes (the reseller page) gets no entry page: its address is answered by 404.html.
//
// The display mode follows VITE_PENDING like the build does (launch when unset): run both with the same value.
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, rmdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ENTRY = 'src/components/site/static-head.ts'

/** The value that follows `--name` on the command line, if any. */
function option(name, argv = process.argv.slice(2)) {
  const at = argv.indexOf(`--${name}`)
  return at >= 0 && argv[at + 1] ? argv[at + 1] : null
}

/** `--dist <folder>` (default dist), resolved against the project root. */
export function distFolder() {
  return path.resolve(ROOT, option('dist') ?? 'dist')
}

/** The built index.html of a folder; exits with a clear message when the folder holds no build. */
export function readBuiltIndex(dist) {
  const file = path.join(dist, 'index.html')
  if (!existsSync(file)) {
    console.error(`No ${path.relative(ROOT, file) || file}: build the site first (npm run build).`)
    process.exit(1)
  }
  return readFileSync(file, 'utf8')
}

/**
 * The deploy base path the folder was built for ('/' or '/<repo>/'), read from the entry script of its index.html,
 * so this script needs no BASE_PATH of its own and cannot disagree with the build.
 */
export function basePathOf(indexHtml) {
  const entry = indexHtml.match(/<script[^>]+type="module"[^>]+src="([^"]*?)assets\/[^"]+"/)
  return entry ? entry[1] || '/' : '/'
}

/**
 * Compiles src/components/site/static-head.ts for Node (vite build --ssr, with the project's own config) and
 * returns its exports: the route list, the entry-page writers and the sitemap, all computed from the app's source.
 */
export async function loadSite(base) {
  const { build } = await import('vite')
  // Inside the project, so the compiled module finds react and react-router in node_modules.
  const outDir = path.join(ROOT, 'node_modules', '.cache', `jalon-static-head-${process.pid}`)
  try {
    const config = option('config')
    await build({
      root: ROOT,
      ...(config ? { configFile: path.resolve(ROOT, config) } : {}),
      base,
      logLevel: 'warn',
      build: { ssr: ENTRY, outDir, emptyOutDir: true, copyPublicDir: false, minify: false, manifest: false },
    })
    const file = readdirSync(outDir).find((name) => /^static-head\.m?js$/.test(name))
    if (!file) throw new Error(`the compiled ${ENTRY} was not found in ${outDir}`)
    return await import(pathToFileURL(path.join(outDir, file)).href)
  } finally {
    rmSync(outDir, { recursive: true, force: true })
  }
}

// ── Which script chunks a route needs ────────────────────────────────────────────────────────────────────────

/**
 * src/App.tsx read as text: each lazy page's module, and for each <Route> the page it renders first. The file keeps
 * one <Route> per line with its page component first in `element`, so this stays a two-pattern read.
 *   byRoute  'abonnements' → 'src/pages/Pricing.tsx', '' (index) → 'src/pages/Home.tsx', '*' → 'src/pages/NotFound.tsx'
 */
function pageModules() {
  const source = readFileSync(path.join(ROOT, 'src/App.tsx'), 'utf8')
  const modules = new Map()
  for (const [, name, spec] of source.matchAll(/const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(\s*'@\/([^']+)'\s*\)\s*\)/g)) {
    const file = ['.tsx', '.ts', '/index.tsx'].map((ext) => `src/${spec}${ext}`).find((candidate) => existsSync(path.join(ROOT, candidate)))
    if (file) modules.set(name, file)
  }
  const byRoute = new Map()
  for (const [, index, route, element] of source.matchAll(/<Route\s+(?:(index)|path="([^"]+)")\s+element=\{(.+)\}\s*\/>/g)) {
    const first = element.match(/<(\w+)/)
    if (first && modules.has(first[1])) byRoute.set(index ? '' : route, modules.get(first[1]))
  }
  return byRoute
}

/** A chunk and everything it imports statically, as manifest keys. */
function closure(manifest, key, seen = new Set()) {
  if (seen.has(key) || !manifest[key]) return seen
  seen.add(key)
  for (const next of manifest[key].imports ?? []) closure(manifest, next, seen)
  return seen
}

/**
 * From the build manifest, or `null` without one:
 *   scriptsOf(pageModule)  the addresses of the chunks a page loads beyond what the entry scripts already bring (the
 *                          built index.html preloads those itself). Every one is a static import of the page chunk,
 *                          so each preload is used as soon as the route renders.
 */
function preloader(dist, base) {
  const file = path.join(dist, '.vite', 'manifest.json')
  if (!existsSync(file)) return null
  const manifest = JSON.parse(readFileSync(file, 'utf8'))
  const entryKey = Object.keys(manifest).find((key) => manifest[key].isEntry)
  const entry = entryKey ? closure(manifest, entryKey) : new Set()
  const scriptsOf = (pageModule) => {
    if (!pageModule || !manifest[pageModule]) return null
    return [...closure(manifest, pageModule)].filter((key) => !entry.has(key)).map((key) => base + manifest[key].file)
  }
  return { scriptsOf }
}

// ── Main ─────────────────────────────────────────────────────────────────────────────────────────────────────

async function main() {
  const dist = distFolder()
  const built = readBuiltIndex(dist)
  const base = basePathOf(built)
  const site = await loadSite(base)
  const byRoute = pageModules()
  const manifest = preloader(dist, base)
  const notes = []
  const preloads = (appRoute, label) => {
    if (!manifest) return {}
    const scripts = manifest.scriptsOf(byRoute.get(appRoute))
    if (!scripts) notes.push(`no page chunk found for ${label}: its entry page has no modulepreload link (check the <Route> line in src/App.tsx)`)
    return { scripts: scripts ?? [] }
  }

  const rows = []
  for (const route of site.STATIC_ROUTES) {
    const links = preloads(site.appRoute(route), route)
    const file = path.join(dist, route, 'index.html')
    mkdirSync(path.dirname(file), { recursive: true })
    writeFileSync(file, site.routeHtml(built, route, links))
    rows.push([route, links.scripts?.length ?? 0])
  }
  const links404 = preloads('*', '404.html')
  writeFileSync(path.join(dist, '404.html'), site.notFoundHtml(built, links404))
  rows.push(['404.html', links404.scripts?.length ?? 0])

  // A hidden page must not keep an entry page from an earlier run: its address is a 404.
  for (const route of site.HIDDEN_ROUTES) {
    const dir = path.join(dist, route)
    rmSync(path.join(dir, 'index.html'), { force: true })
    try { rmdirSync(dir) } catch { /* not there, or not empty */ }
  }

  const width = Math.max(...rows.map(([route]) => route.length))
  for (const [route, count] of rows) console.log(`  ${route.padEnd(width)}  ${manifest ? `${count} modulepreload` : ''}`)
  console.log(
    `Entry pages written in ${path.relative(ROOT, dist) || dist}: ${site.STATIC_ROUTES.length} routes and 404.html ` +
      `(display mode ${site.PENDING_MODE}, base path ${base}, domain ${site.SITE_DOMAIN ?? 'not set: no canonical URL, no absolute image URL'}).`,
  )
  if (site.HIDDEN_ROUTES.length) console.log(`Hidden for now, answered by 404.html: ${site.HIDDEN_ROUTES.join(', ')}`)
  if (!manifest) notes.push('no build manifest (.vite/manifest.json): the entry pages have no modulepreload link. `npm run build` writes it (vite build --manifest).')
  if (site.SITE_DOMAIN && base !== '/') {
    notes.push(`site.domain is set, but this build is for the base path ${base}: canonical addresses point to the domain root. Build with BASE_PATH=/ once the domain serves the site.`)
  }
  for (const note of notes) console.warn(`Note: ${note}`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  })
}
