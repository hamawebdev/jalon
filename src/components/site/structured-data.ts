// Structured data (JSON-LD, schema.org) of a page. A block is written only when every value in it is a real fact:
// nothing here falls back to a placeholder, and a block that lacks one of its facts is left out whole. No rating and
// no review block: they need a sourced rating (proof.rating), which the pages themselves do not show without it.
//
// Addresses are absolute, so every block waits for the site's domain (facts site.domain). Pages are addressed as
// their canonical URL is (page-meta.ts): https://<domain><path>.
import { FACTS, present } from '@/lib/facts'
import { BRAND, BRAND_LOCKUP, SITE_DOMAIN } from '@/lib/site'
import { productBySlug } from '@/pages/product/data'

export type JsonLd = Record<string, unknown>

const CONTEXT = 'https://schema.org'

/** https://<domain>, or null until the owner gives the domain. */
const ORIGIN: string | null = SITE_DOMAIN ? `https://${SITE_DOMAIN}` : null

/** A file of public/ as an absolute address (the deploy base path included). */
function asset(origin: string, file: string) {
  return `${origin}${import.meta.env.BASE_URL.replace(/\/*$/, '/')}${file}`
}

/**
 * Home page: WebSite (the name search results show for the site) and, once the company's legal name exists,
 * Organization with the logo; its contact point only with the support facts.
 */
function homeBlocks(origin: string): JsonLd[] {
  const site: JsonLd = {
    '@context': CONTEXT,
    '@type': 'WebSite',
    name: BRAND,
    alternateName: BRAND_LOCKUP,
    url: `${origin}/`,
    inLanguage: 'fr-FR',
  }
  const legalName = FACTS.company.legalName
  if (!present(legalName)) return [site]
  const { email, phone } = FACTS.support
  const contact: JsonLd | null =
    present(email) || present(phone)
      ? {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          ...(present(email) ? { email } : {}),
          ...(present(phone) ? { telephone: phone } : {}),
        }
      : null
  const organization: JsonLd = {
    '@context': CONTEXT,
    '@type': 'Organization',
    name: BRAND,
    legalName,
    url: `${origin}/`,
    logo: asset(origin, 'icon-512.png'),
    ...(contact ? { contactPoint: contact } : {}),
  }
  return [site, organization]
}

/**
 * Plan pages and the renewal page: the breadcrumb, equal to the visible one (Accueil › Formules › the page), and on
 * a plan page Product with one Offer, only when that plan's price is a fact.
 */
function productBlocks(origin: string, slug: string): JsonLd[] {
  const product = productBySlug(slug)
  if (!product) return []
  const url = `${origin}/abonnements/${slug}/`
  const name = product.kind === 'plan' ? product.name : product.title
  const crumbs: JsonLd = {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: 'Formules', item: `${origin}/abonnements/` },
      { '@type': 'ListItem', position: 3, name, item: url },
    ],
  }
  if (product.kind !== 'plan' || product.plan.price == null) return [crumbs]
  const sold: JsonLd = {
    '@context': CONTEXT,
    '@type': 'Product',
    name,
    description: product.description,
    brand: { '@type': 'Brand', name: BRAND },
    image: asset(origin, 'og.png'),
    offers: {
      '@type': 'Offer',
      price: product.plan.price.toFixed(2),
      priceCurrency: 'EUR',
      url,
      availability: 'https://schema.org/InStock',
    },
  }
  return [crumbs, sold]
}

/**
 * The blocks of a page, by route (`route` as page-meta.ts names it: '/' or '/abonnements/:slug/' with its slug).
 * Empty while the domain is missing, and for every other page.
 */
export function structuredDataFor(route: '/' | '/abonnements/:slug/', slug?: string): JsonLd[] {
  if (!ORIGIN) return []
  if (route === '/') return homeBlocks(ORIGIN)
  return slug ? productBlocks(ORIGIN, slug) : []
}

/** A block as the text of its <script type="application/ld+json">: no « < » can end the script early. */
export function jsonLdText(blocks: JsonLd[]): string {
  return JSON.stringify(blocks.length === 1 ? blocks[0] : blocks).replace(/</g, '\\u003c')
}
