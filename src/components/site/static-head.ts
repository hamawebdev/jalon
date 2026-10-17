// Build time only: the app never imports this file. scripts/static-head.mjs compiles it (vite build --ssr) and calls
// it to write, into the built site, one entry page per route with that route's own <head>, and scripts/sitemap.mjs
// calls it for the sitemap.
//
// Why: applyMeta() sets the title, description, robots and social tags in the browser, which is enough for people
// and for search engines that run JavaScript. Link previews (WhatsApp, Facebook, X) only read the HTML that is
// served: without this, every shared link shows the home title and description, the noindex of the order page is
// not in its file, and the preview image has no absolute URL. The values come from metaFor(), the same source the
// browser uses, so the two never disagree; the canonical URL, the absolute image URL and the structured data
// appear once site.domain exists.
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { PENDING_MODE } from '@/components/brand/mode'
import { HIDDEN_ROUTES, NOT_FOUND_META, PAGE_META, PLAN_PATHS, SITE_DOMAIN, pageTitle } from '@/lib/site'
import { HELP_GROUPS } from '@/pages/help/rows'
import { JSON_LD_ROUTE, JSON_LD_SERVED, metaFor, type ResolvedMeta } from './page-meta'
import { jsonLdText, type JsonLd } from './structured-data'

export { HIDDEN_ROUTES, PENDING_MODE, SITE_DOMAIN }

/**
 * Every route that gets an entry page: the PAGE_META routes and the plan pages, each ending with a slash. A route
 * of src/App.tsx that renders the 404 page for now (HIDDEN_ROUTES: /revendeur/ until the owner says yes) gets none:
 * its address is then answered by 404.html, with HTTP 404. A route added to src/App.tsx joins this list when it gets
 * its title and description in PAGE_META.
 */
export const STATIC_ROUTES: string[] = [...Object.keys(PAGE_META), ...PLAN_PATHS].filter((route) => !HIDDEN_ROUTES.includes(route))

/** The routes a search engine may list: the entry pages without the noindex ones (the order page). */
export const INDEXABLE_ROUTES: string[] = STATIC_ROUTES.filter((route) => !metaFor(route).noindex)

/** Which route of src/App.tsx serves an address: its path there ('abonnements/:slug' for the plan pages). */
export function appRoute(route: string): string {
  if (PLAN_PATHS.includes(route)) return 'abonnements/:slug'
  return route.replace(/^\/|\/$/g, '')
}

const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const metaTag = (key: string) => new RegExp(`(<meta\\s+(?:name|property)="${key}"\\s+content=")([^"]*)("\\s*/?>)`)

/** Rewrites the content of the <meta> named `key`. A tag missing from index.html is an error, never a silent skip. */
function setContent(html: string, key: string, next: (current: string) => string): string {
  const tag = metaTag(key)
  if (!tag.test(html)) throw new Error(`static-head: index.html has no <meta> for « ${key} »`)
  return html.replace(tag, (_all, open: string, current: string, close: string) => open + next(current) + close)
}

/** Removes the <meta> named `key`, with the white space before it. */
function drop(html: string, key: string): string {
  return html.replace(new RegExp(`\\s*${metaTag(key).source}`), '')
}

// ── Structured data that only the served HTML carries ────────────────────────────────────────────────────────

const ENTITIES: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'", '&#39;': "'" }

/** The words of a rendered answer: tags out, entities back to their characters, white space folded. */
function plainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&(?:amp|lt|gt|quot|#x27|#39);/g, (entity) => ENTITIES[entity])
    .replace(/[ \t\n\r]+/g, ' ')
    .trim()
}

/**
 * FAQPage for /aide/: the questions the page renders in this display mode, each with its answer as plain text. An
 * answer that still shows a marker (a missing fact) is left out: the block states real, complete answers only.
 * Fewer than two such answers: no block.
 */
function helpQuestions(): JsonLd[] {
  const entries = HELP_GROUPS.flatMap((group) => group.rows).flatMap((row) => {
    const html = renderToStaticMarkup(createElement(MemoryRouter, null, row.a))
    if (html.includes('data-pending')) return []
    const text = plainText(html)
    return text ? [{ '@type': 'Question', name: row.q, acceptedAnswer: { '@type': 'Answer', text } }] : []
  })
  return entries.length >= 2 ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: entries }] : []
}

/** Structured data written into a route's entry page and not kept by the app after a navigation. */
function servedOnly(route: string): JsonLd[] {
  return route === '/aide/' ? helpQuestions() : []
}

// ── The entry pages ──────────────────────────────────────────────────────────────────────────────────────────

/**
 * The lines this file adds before </head> sit between two comments, so a second run on the same folder (where
 * index.html is by then the home page's entry page) starts again from the built page.
 */
const START = '<!-- static-head:start -->'
const END = '<!-- static-head:end -->'
const ADDED = new RegExp(`[ \\t]*${START}[\\s\\S]*?${END}\\n?`, 'g')

const ldScript = (kind: string, blocks: JsonLd[]) => `<script type="application/ld+json" data-ld="${kind}">${jsonLdText(blocks)}</script>`

/**
 * What the build manifest adds to an entry page. Fonts are not in it: preloaded from the served head, they would
 * share a slow link with the entry scripts that the first paint waits for (scripts/static-head.mjs, QA CL-01).
 * src/main.tsx asks for them itself, before the first render.
 */
export type Preloads = {
  /**
   * Addresses of the script chunks this route's page needs beyond the entry scripts, so the browser fetches them
   * with the entry scripts instead of one round trip later.
   */
  scripts?: string[]
}

function withMeta(built: string, { title, description, noindex, canonical, jsonLd }: ResolvedMeta, { scripts = [] }: Preloads, served: JsonLd[]): string {
  const html = built.replace(ADDED, '')
  if (!/<title>[^<]*<\/title>/.test(html)) throw new Error('static-head: index.html has no <title>')
  let page = html.replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtml(title)}</title>`)
  for (const key of ['og:title', 'twitter:title']) page = setContent(page, key, () => escapeHtml(title))
  // As applyMeta() does: a page without a description carries none, never the home page's.
  for (const key of ['description', 'og:description', 'twitter:description']) {
    page = description ? setContent(page, key, () => escapeHtml(description)) : drop(page, key)
  }
  // Preview readers only accept an absolute image URL. It exists once the owner gives the domain (site.domain);
  // the built page already holds the path, deploy base included.
  if (SITE_DOMAIN) {
    for (const key of ['og:image', 'twitter:image']) {
      page = setContent(page, key, (path) => (path.startsWith('/') ? `https://${SITE_DOMAIN}${path}` : path))
    }
  }
  const extra: string[] = []
  if (noindex) extra.push('<meta name="robots" content="noindex" />')
  if (canonical) {
    extra.push(`<link rel="canonical" href="${escapeHtml(canonical)}" />`, `<meta property="og:url" content="${escapeHtml(canonical)}" />`)
  }
  for (const href of scripts) extra.push(`<link rel="modulepreload" crossorigin href="${escapeHtml(href)}" />`)
  if (jsonLd.length > 0) extra.push(ldScript(JSON_LD_ROUTE, jsonLd))
  if (served.length > 0) extra.push(ldScript(JSON_LD_SERVED, served))
  if (extra.length === 0) return page
  if (!/[ \t]*<\/head>/.test(page)) throw new Error('static-head: index.html has no </head>')
  return page.replace(/([ \t]*)<\/head>/, (_all, indent: string) => [START, ...extra, END].map((line) => `${indent}  ${line}\n`).join('') + `${indent}</head>`)
}

/** The entry page of `route` (one of STATIC_ROUTES): the built index.html with that route's own head. */
export function routeHtml(builtIndexHtml: string, route: string, preloads: Preloads = {}): string {
  return withMeta(builtIndexHtml, metaFor(route), preloads, servedOnly(route))
}

/** 404.html, served on unknown paths: the built index.html with the 404 page's head (noindex). */
export function notFoundHtml(builtIndexHtml: string, preloads: Preloads = {}): string {
  const { page, description } = NOT_FOUND_META
  return withMeta(builtIndexHtml, { title: pageTitle(page), description, noindex: true, canonical: null, jsonLd: [] }, preloads, [])
}

// ── The sitemap ──────────────────────────────────────────────────────────────────────────────────────────────

/**
 * sitemap.xml: the indexable routes at their canonical address (absolute, https, final slash). No priority and no
 * changefreq (search engines ignore them), and no lastmod: the site holds no real per-page date. `null` until the
 * owner gives the domain: a sitemap never lists a placeholder address.
 */
export function sitemapXml(): string | null {
  if (!SITE_DOMAIN) return null
  const urls = INDEXABLE_ROUTES.map((route) => metaFor(route).canonical).filter((url): url is string => url != null)
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n')
}

/**
 * The address of the sitemap, for the Sitemap line of robots.txt: where the file is served, deploy base path
 * included. `null` until the domain exists.
 */
export const SITEMAP_URL: string | null = SITE_DOMAIN ? `https://${SITE_DOMAIN}${import.meta.env.BASE_URL.replace(/\/*$/, '/')}sitemap.xml` : null

/** The deploy base path this module was compiled for ('/' at a domain root). */
export const BASE_URL: string = import.meta.env.BASE_URL.replace(/\/*$/, '/')
