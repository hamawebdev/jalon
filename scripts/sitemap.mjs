#!/usr/bin/env node
// sitemap.xml and the Sitemap line of robots.txt. Run after a build and after the entry pages, on dist/:
//
//   npm run sitemap                      node scripts/sitemap.mjs
//   node scripts/sitemap.mjs --dist <folder>     another built folder (default: dist)
//
// The sitemap lists the pages a search engine may show: the same route list as the entry pages
// (scripts/static-head.mjs), without the noindex pages (the order page) and without a page hidden until the owner
// says yes (the reseller page). Each address is the page's canonical URL: absolute, https, with its final slash.
//
// Both wait for the site's domain (site.domain in src/lib/facts.data.ts): without it there is no sitemap.xml and
// robots.txt keeps no Sitemap line, because neither may name a placeholder address.
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { ROOT, basePathOf, distFolder, loadSite, readBuiltIndex } from './static-head.mjs'

const ROBOTS = 'User-agent: *\nAllow: /\n'

const dist = distFolder()
const site = await loadSite(basePathOf(readBuiltIndex(dist)))
const where = path.relative(ROOT, dist) || dist

// robots.txt comes from public/; a folder without one gets the same two lines.
const robotsFile = path.join(dist, 'robots.txt')
const robots = (existsSync(robotsFile) ? readFileSync(robotsFile, 'utf8') : ROBOTS)
  .split('\n')
  .filter((line) => !/^\s*sitemap\s*:/i.test(line))
  .join('\n')
  .replace(/\n*$/, '\n')

const xml = site.sitemapXml()
if (xml == null) {
  rmSync(path.join(dist, 'sitemap.xml'), { force: true })
  writeFileSync(robotsFile, robots)
  console.log(`No sitemap in ${where}: site.domain is not set yet. robots.txt has no Sitemap line.`)
} else {
  writeFileSync(path.join(dist, 'sitemap.xml'), xml)
  writeFileSync(robotsFile, `${robots}\nSitemap: ${site.SITEMAP_URL}\n`)
  console.log(`sitemap.xml written in ${where}: ${site.INDEXABLE_ROUTES.length} addresses. robots.txt names it: ${site.SITEMAP_URL}`)
  if (site.BASE_URL !== '/') {
    console.warn(`Note: this build is for the base path ${site.BASE_URL}, where robots.txt is not read (crawlers only read it at the host root).`)
  }
}
