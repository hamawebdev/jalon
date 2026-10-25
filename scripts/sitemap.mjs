#!/usr/bin/env node
// dist/sitemap.xml and the Sitemap line of dist/robots.txt. Part of `npm run build` (after the prerender).
//
//   node scripts/sitemap.mjs [--dist <folder>]
//
// Every indexable page (src/i18n/routes.ts: PAGES minus NOINDEX_PAGES) in every language, at its canonical address
// on the client's domain (FACTS.brand.domain), each with its xhtml:link hreflang alternates (every language plus
// x-default → French), as Google asks for multilingual sites. Nothing is written while the domain is not set.
// Reads the TypeScript sources directly (Node 24 strips the types).
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const DIST = path.resolve(ROOT, args.includes('--dist') ? args[args.indexOf('--dist') + 1] : 'dist')
const load = (file) => import(pathToFileURL(path.join(ROOT, file)).href)

const { FACTS } = await load('src/lib/facts.data.ts')
const { LANGS, LOCALES, DEFAULT_LANG } = await load('src/i18n/locales.ts')
const { PAGES, NOINDEX_PAGES, pathFor } = await load('src/i18n/routes.ts')

if (!existsSync(DIST)) {
  console.error(`sitemap: no ${path.relative(ROOT, DIST)}: build the site first.`)
  process.exit(1)
}
if (!FACTS.brand.domain) {
  console.warn('sitemap: brand.domain is not set in src/lib/facts.data.ts: no sitemap, no Sitemap line.')
  process.exit(0)
}

const origin = `https://${FACTS.brand.domain}`
const xml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const urls = []
for (const page of PAGES.filter((p) => !NOINDEX_PAGES.includes(p))) {
  const alternates = [
    ...LANGS.map((lang) => [LOCALES[lang].htmlLang, origin + pathFor(page, lang)]),
    ['x-default', origin + pathFor(page, DEFAULT_LANG)],
  ]
    .map(([hreflang, href]) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${xml(href)}"/>`)
    .join('\n')
  for (const lang of LANGS) {
    urls.push(`  <url>\n    <loc>${xml(origin + pathFor(page, lang))}</loc>\n${alternates}\n  </url>`)
  }
}

writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    `${urls.join('\n')}\n</urlset>\n`,
)

const robotsFile = path.join(DIST, 'robots.txt')
const robots = existsSync(robotsFile) ? readFileSync(robotsFile, 'utf8').replace(/^Sitemap:.*\n?/gm, '') : 'User-agent: *\nAllow: /\n'
writeFileSync(robotsFile, `${robots.trimEnd()}\n\nSitemap: ${origin}/sitemap.xml\n`)

console.log(`sitemap: ${urls.length} addresses (${urls.length / LANGS.length} pages × ${LANGS.length} languages) in sitemap.xml.`)
