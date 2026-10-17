import { matchRoutes } from 'react-router'
import { HIDDEN_ROUTES, NOT_FOUND_META, PAGE_META, SITE_DOMAIN, pageTitle, type PageMeta } from '@/lib/site'
import { productBySlug } from '@/pages/product/data'
import { jsonLdText, structuredDataFor, type JsonLd } from './structured-data'

export type ResolvedMeta = {
  title: string
  description: string
  noindex: boolean
  canonical: string | null
  /** Structured data of the page (structured-data.ts): only blocks whose every value is a real fact; often none. */
  jsonLd: JsonLd[]
}

/**
 * `path` is the page's own address and ends with a slash. The canonical URL exists only once the owner gives the
 * domain (meta.md: never a placeholder domain), and never on a noindex page (the 404 passes the address as typed).
 */
function resolve(meta: PageMeta, path: string, jsonLd: JsonLd[] = []): ResolvedMeta {
  const noindex = !!meta.noindex
  const canonical = SITE_DOMAIN && !noindex ? `https://${SITE_DOMAIN}${path}` : null
  return { title: meta.title ?? pageTitle(meta.page), description: meta.description, noindex, canonical, jsonLd: noindex ? [] : jsonLd }
}

/**
 * Plan page meta: the `title` (page name) and `description` fields build-a keeps in src/pages/product/data.ts.
 * The lookup is the product page's own, productBySlug(): only the map's own entries count, so `constructor`,
 * `toString` or `__proto__`, which name members of Object.prototype, are unknown slugs here as they are there.
 */
function productMeta(slug: string): PageMeta | null {
  const product: { title?: unknown; description?: unknown } | undefined = productBySlug(slug)
  if (!product) return null
  const page = typeof product.title === 'string' ? product.title : undefined
  const description = typeof product.description === 'string' ? product.description : ''
  return { page, description }
}

const PLAN_ROUTE = '/abonnements/:slug/' as const
/**
 * The routes of src/App.tsx by address, in the form react-router's own matcher takes. A route that renders the 404
 * page for now (HIDDEN_ROUTES: /revendeur/ until the owner says yes) is left out, so it gets the 404 head too.
 */
const META_ROUTES = [...Object.keys(PAGE_META).filter((path) => !HIDDEN_ROUTES.includes(path)), PLAN_ROUTE].map((path) => ({ path }))

/**
 * Title, description and robots for a pathname (copy meta.md); unknown paths get the 404 meta. The pathname goes
 * through the router's matcher, so an address the router accepts for a page (/Aide/, /aide//, /%61ide/: letter case,
 * extra final slashes, percent-encoding) gets that page's head, and the canonical URL keeps the route's one spelling.
 * A plan slug is looked up as the product page does it: exactly, so /abonnements/12-MOIS/ is a 404 in both.
 */
export function metaFor(pathname: string): ResolvedMeta {
  const match = matchRoutes(META_ROUTES, { pathname })?.[0]
  const route = match?.route.path
  if (route === PLAN_ROUTE) {
    const slug = match?.params.slug ?? ''
    const meta = productMeta(slug)
    if (meta) return resolve(meta, `/abonnements/${slug}/`, structuredDataFor(PLAN_ROUTE, slug))
  } else if (route) {
    return resolve(PAGE_META[route], route, route === '/' ? structuredDataFor('/') : [])
  }
  return resolve(NOT_FOUND_META, pathname)
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string | null) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (content == null) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (href == null) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

/** Marks the structured data of the current route in <head>; the entry pages (static-head.ts) write the same element. */
export const JSON_LD_ROUTE = 'route'
/**
 * Marks structured data that only the served HTML carries (static-head.ts: the questions of /aide/). It describes
 * the page the document was served for, so it goes at the first navigation to another page.
 */
export const JSON_LD_SERVED = 'served'

/** The page the document was served for, by its title (each page has its own); set at the first applyMeta call. */
let servedTitle: string | null = null

function setJsonLd(blocks: JsonLd[]) {
  let el = document.head.querySelector<HTMLScriptElement>(`script[data-ld="${JSON_LD_ROUTE}"]`)
  if (blocks.length === 0) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.dataset.ld = JSON_LD_ROUTE
    document.head.appendChild(el)
  }
  const text = jsonLdText(blocks)
  if (el.textContent !== text) el.textContent = text
}

/**
 * Writes the title, description, robots, canonical URL, the social title, description and URL, and the page's
 * structured data into <head>.
 */
export function applyMeta({ title, description, noindex, canonical, jsonLd }: ResolvedMeta) {
  // Structured data written for the served page only: gone once the visitor is on another page.
  if (servedTitle == null) servedTitle = title
  else if (servedTitle !== title) document.head.querySelectorAll(`script[data-ld="${JSON_LD_SERVED}"]`).forEach((el) => el.remove())
  setJsonLd(jsonLd)
  document.title = title
  setMeta('meta[name="description"]', 'name', 'description', description || null)
  setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex' : null)
  setCanonical(canonical)
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonical)
  setMeta('meta[property="og:title"]', 'property', 'og:title', title)
  setMeta('meta[property="og:description"]', 'property', 'og:description', description || null)
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description || null)
}

/**
 * A page whose title follows its own state (the checkout: « Panier vide », « Commande à finaliser »…) sets it
 * with this after the layout has applied the route's meta (the layout uses a layout effect, pages a plain effect).
 */
export function setPageTitle(page: string) {
  const title = pageTitle(page)
  document.title = title
  setMeta('meta[property="og:title"]', 'property', 'og:title', title)
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
}
