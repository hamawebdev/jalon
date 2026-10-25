// The <head> of every page, as data: title, description, canonical, hreflang alternates, Open Graph / Twitter tags
// and structured data. One source for both sides:
//   - build time: src/entry-server.tsx → scripts/prerender.mjs writes headHtml() into each prerendered page;
//   - browser: <PageMeta> applies the same data on every client-side navigation (./apply.ts).
// Absolute URLs always use the client's domain (FACTS.brand.domain) and the route's path, whatever base path the
// build is served from (the GitHub Pages preview lives under /<repo>/, the canonical site at the domain root).
// Owner: seo.
import type { Dict } from '@/i18n/dict/types'
import { DEFAULT_LANG, LANGS, LOCALES, type Lang } from '@/i18n/locales'
import { NOINDEX_PAGES, pathFor, type PageId } from '@/i18n/routes'
import { structuredData } from './jsonld'
import { absoluteUrl, OG_IMAGE, SITE_ORIGIN } from './site'
import { metaVars } from './vars'

export type MetaPageId = PageId | 'notFound'

export interface HeadData {
  title: string
  description: string
  htmlLang: string
  /** Absolute canonical URL; null on the 404 page or without a domain. */
  canonical: string | null
  /** hreflang → absolute URL, every language plus x-default (→ French). Empty on the 404 page. */
  alternates: { hreflang: string; href: string }[]
  robots: string
  og: Record<string, string | string[]>
  twitter: Record<string, string>
  jsonLd: object[]
}

export function isIndexable(page: MetaPageId): page is PageId {
  return page !== 'notFound' && !NOINDEX_PAGES.includes(page)
}

export function buildHead(page: MetaPageId, lang: Lang, dict: Dict): HeadData {
  const copy = dict.meta.pages[page]
  const vars = metaVars(lang)
  const title = copy.title
  const description = copy.description(vars)
  const indexable = isIndexable(page)
  const canonical = page !== 'notFound' ? absoluteUrl(pathFor(page, lang)) : null
  const alternates =
    page !== 'notFound' && SITE_ORIGIN
      ? [
          ...LANGS.map((l) => ({ hreflang: LOCALES[l].htmlLang, href: SITE_ORIGIN + pathFor(page, l) })),
          { hreflang: 'x-default', href: SITE_ORIGIN + pathFor(page, DEFAULT_LANG) },
        ]
      : []
  const image = absoluteUrl(OG_IMAGE.path) ?? OG_IMAGE.path

  const og: HeadData['og'] = {
    'og:type': 'website',
    'og:site_name': dict.meta.siteName,
    'og:title': title,
    'og:description': description,
    ...(canonical ? { 'og:url': canonical } : {}),
    'og:image': image,
    'og:image:type': OG_IMAGE.type,
    'og:image:width': String(OG_IMAGE.width),
    'og:image:height': String(OG_IMAGE.height),
    'og:image:alt': dict.meta.ogImageAlt,
    'og:locale': LOCALES[lang].ogLocale,
    'og:locale:alternate': page === 'notFound' ? [] : LANGS.filter((l) => l !== lang).map((l) => LOCALES[l].ogLocale),
  }
  const twitter = {
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:image:alt': dict.meta.ogImageAlt,
  }

  return {
    title,
    description,
    htmlLang: LOCALES[lang].htmlLang,
    canonical,
    alternates,
    robots: indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow',
    og,
    twitter,
    jsonLd: structuredData(page, lang, dict),
  }
}

// ── Serialisation (prerender) ────────────────────────────────────────────────────────────────────────────────

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeText = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** JSON safe inside <script>: no « </script> », no HTML comment openers. */
export function jsonForScript(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
}

/**
 * Every tag of the page's head except <title>, as HTML. Each carries data-seo, so the browser side can replace
 * exactly these on navigation (./apply.ts) and leave everything else in <head> alone.
 */
export function headTags(head: HeadData): string[] {
  const tags: string[] = []
  const meta = (key: 'name' | 'property', name: string, content: string) =>
    tags.push(`<meta ${key}="${name}" content="${escapeAttr(content)}" data-seo>`)
  meta('name', 'description', head.description)
  meta('name', 'robots', head.robots)
  if (head.canonical) tags.push(`<link rel="canonical" href="${escapeAttr(head.canonical)}" data-seo>`)
  for (const alt of head.alternates) {
    tags.push(`<link rel="alternate" hreflang="${alt.hreflang}" href="${escapeAttr(alt.href)}" data-seo>`)
  }
  for (const [property, value] of Object.entries(head.og)) {
    for (const content of Array.isArray(value) ? value : [value]) meta('property', property, content)
  }
  for (const [name, content] of Object.entries(head.twitter)) meta('name', name, content)
  for (const block of head.jsonLd) {
    tags.push(`<script type="application/ld+json" data-seo>${jsonForScript(block)}</script>`)
  }
  return tags
}

/** The whole head block written into a prerendered page: <title> first, then headTags(). */
export function headHtml(head: HeadData, indent = '    '): string {
  return [`<title>${escapeText(head.title)}</title>`, ...headTags(head)].join(`\n${indent}`)
}
