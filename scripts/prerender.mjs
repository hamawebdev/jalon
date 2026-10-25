#!/usr/bin/env node
// Prerenders the whole site into dist/, after the client build (`vite build`). Part of `npm run build`:
//
//   node scripts/prerender.mjs [--dist <folder>]
//
// 1. Builds src/entry-server.tsx for Node (`vite build --ssr`, same config, same mode and same VITE_PENDING as the
//    client build: the display mode must match or hydration breaks) into node_modules/.cache/atlas-ssr.
// 2. Renders every page in every language (React's prerenderToNodeStream waits for lazy pages and Suspense) and
//    writes it as dist/<path>/index.html: the real body inside <div id="root" data-path="…">, which src/main.tsx
//    hydrates, and the page's own head (title, description, canonical, hreflang, Open Graph, JSON-LD), with
//    <link rel="modulepreload"> for the page's chunk and its language's dictionary, read from the build manifest.
// 3. Writes 404.html (the French « page introuvable », noindex), served by GitHub Pages for every unknown address;
//    the browser renders it again for the address actually asked (no hydration).
// 4. Removes the build manifest (dist/.vite) and the server build: neither is part of the site.
//
// The base path is read from the built index.html, so this script cannot disagree with the client build.
// Errors React reports while rendering a section are printed; that section is then rendered by the browser.
// PRERENDER_STRICT=1 turns them into a failure.
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const DIST = path.resolve(ROOT, args.includes('--dist') ? args[args.indexOf('--dist') + 1] : 'dist')
const SSR_OUT = path.join(ROOT, 'node_modules', '.cache', 'atlas-ssr')
const STRICT = process.env.PRERENDER_STRICT === '1'

const ROOT_DIV = '<div id="root"></div>'

function fail(message) {
  console.error(`prerender: ${message}`)
  process.exit(1)
}

// ── The client build ─────────────────────────────────────────────────────────────────────────────────────────

const indexFile = path.join(DIST, 'index.html')
if (!existsSync(indexFile)) fail(`no ${path.relative(ROOT, indexFile)}: run the client build first (vite build).`)
const template = readFileSync(indexFile, 'utf8')
if (!template.includes(ROOT_DIV)) {
  fail(`${path.relative(ROOT, indexFile)} is already prerendered (or not a fresh build): run vite build again first.`)
}
for (const marker of ['<!--app-head-->', '<!--/app-head-->', '<!--app-preload-->']) {
  if (!template.includes(marker)) fail(`the built index.html has no ${marker} marker (see index.html).`)
}

/** '/' or '/<repo>/', from the entry script of the built index.html. */
const entrySrc = template.match(/<script[^>]+type="module"[^>]+src="([^"]*?)assets\/[^"]+"/)
const BASE = entrySrc ? entrySrc[1] || '/' : '/'

const manifestFile = path.join(DIST, '.vite', 'manifest.json')
if (!existsSync(manifestFile)) fail('no build manifest (dist/.vite/manifest.json): vite.config.ts must keep build.manifest.')
const manifest = JSON.parse(readFileSync(manifestFile, 'utf8'))

function closure(key, seen = new Set()) {
  if (seen.has(key) || !manifest[key]) return seen
  seen.add(key)
  for (const next of manifest[key].imports ?? []) closure(next, seen)
  return seen
}
const entryKey = Object.keys(manifest).find((key) => manifest[key].isEntry)
const entryChunks = entryKey ? closure(entryKey) : new Set()
const entryCss = new Set([...entryChunks].flatMap((key) => manifest[key].css ?? []))

/** Scripts and styles a module needs beyond what the entry already loads. */
function assetsOf(moduleKey) {
  if (!manifest[moduleKey]) return null
  const chunks = [...closure(moduleKey)].filter((key) => !entryChunks.has(key))
  return {
    scripts: chunks.map((key) => BASE + manifest[key].file),
    styles: [...new Set(chunks.flatMap((key) => manifest[key].css ?? []))].filter((f) => !entryCss.has(f)).map((f) => BASE + f),
  }
}

/** Each page's source module, read from the lazy imports of src/App.tsx (`home: lazy(() => import('@/pages/Home'))`). */
function pageModules() {
  const source = readFileSync(path.join(ROOT, 'src/App.tsx'), 'utf8')
  const modules = {}
  for (const [, name, spec] of source.matchAll(/(\w+)\s*(?::|=)\s*lazy\(\s*\(\)\s*=>\s*import\(\s*'@\/([^']+)'\s*\)\s*\)/g)) {
    const file = ['.tsx', '.ts', '/index.tsx'].map((ext) => `src/${spec}${ext}`).find((f) => existsSync(path.join(ROOT, f)))
    if (file) modules[name === 'NotFound' ? 'notFound' : name] = file
  }
  return modules
}

/** Self-hosted fonts the first paint needs: body text (Figtree) and headings (Poppins 700), Latin subset. */
function fontPreloads() {
  const assets = path.join(DIST, 'assets')
  const files = existsSync(assets) ? readdirSync(assets) : []
  return [/^figtree-latin-wght-normal-.*\.woff2$/, /^poppins-latin-700-normal-.*\.woff2$/]
    .map((pattern) => files.find((f) => pattern.test(f)))
    .filter(Boolean)
    .map((f) => `<link rel="preload" href="${BASE}assets/${f}" as="font" type="font/woff2" crossorigin>`)
}

// ── The server build ─────────────────────────────────────────────────────────────────────────────────────────

const { build } = await import('vite')
await build({
  root: ROOT,
  base: BASE,
  mode: 'production',
  logLevel: 'warn',
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: SSR_OUT,
    emptyOutDir: true,
    copyPublicDir: false,
    minify: false,
  },
})
const server = await import(pathToFileURL(path.join(SSR_OUT, 'entry-server.js')).href)

// ── Render ───────────────────────────────────────────────────────────────────────────────────────────────────

const modules = pageModules()
const fonts = fontPreloads()
const notes = []
const failures = []
let written = 0

for (const route of server.prerenderRoutes()) {
  const notFound = route.page === 'notFound'
  const label = notFound ? '404.html' : route.path
  let result
  try {
    result = await server.render(route.page, route.lang, route.path, BASE)
  } catch (error) {
    failures.push(`${label}: ${error?.stack ?? error}`)
    continue
  }
  for (const error of result.errors) (STRICT ? failures : notes).push(`${label}: ${error.split('\n')[0]}`)

  const links = [...fonts]
  const page = modules[route.page] ? assetsOf(modules[route.page]) : null
  if (!page) notes.push(`${label}: no chunk found for page « ${route.page} » in the build manifest (no modulepreload)`)
  const dict = assetsOf(`src/i18n/dict/${route.lang}/index.ts`)
  for (const asset of [dict, page]) {
    for (const href of asset?.styles ?? []) links.push(`<link rel="stylesheet" href="${href}">`)
    for (const href of asset?.scripts ?? []) links.push(`<link rel="modulepreload" crossorigin href="${href}">`)
  }

  const html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${result.htmlLang}" data-pending-mode="${server.PENDING_MODE}">`)
    .replace(/<!--app-head-->[\s\S]*?<!--\/app-head-->/, () => result.head)
    .replace('<!--app-preload-->', () => links.join('\n    '))
    .replace(ROOT_DIV, () => `<div id="root"${notFound ? '' : ` data-path="${route.path}"`}>${result.html}</div>`)

  const file = notFound ? path.join(DIST, '404.html') : path.join(DIST, route.path, 'index.html')
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, html)
  written++
}

rmSync(path.join(DIST, '.vite'), { recursive: true, force: true })
rmSync(SSR_OUT, { recursive: true, force: true })

for (const note of notes) console.warn(`prerender: warning: ${note}`)
if (failures.length) {
  for (const failure of failures) console.error(`prerender: ${failure}`)
  fail(`${failures.length} page(s) failed.`)
}
console.log(
  `prerender: ${written} pages written to ${path.relative(ROOT, DIST) || DIST} (display mode ${server.PENDING_MODE}, ` +
    `base path ${BASE}, canonical domain ${server.SITE_DOMAIN ?? 'not set'}).`,
)
