// Structured data (schema.org JSON-LD) of a page, from FACTS and the meta dictionary. Owner: seo.
//   every page        Organization (AtlasProTVOfficial, logo, WhatsApp contact point) and WebSite (inLanguage)
//   home, Boutique    Product « Abonnement Atlas Pro ONTV » with one Offer per plan that has a price
//   other pages       BreadcrumbList (home → page)
// No AggregateRating or Review: the reviews on the site are not verified. The FAQPage block lives in the FAQ section.
import type { Dict } from '@/i18n/dict/types'
import { LOCALES, type Lang } from '@/i18n/locales'
import { pathFor, type PageId } from '@/i18n/routes'
import { FACTS } from '@/lib/facts'
import { waLink } from '@/lib/whatsapp'
import { LOGO_PATH, OG_IMAGE, SITE_ORIGIN } from './site'

const PRODUCT_PAGES: (PageId | 'notFound')[] = ['home', 'boutique']

export function structuredData(page: PageId | 'notFound', lang: Lang, dict: Dict): object[] {
  const origin = SITE_ORIGIN
  if (!origin) return []
  const t = dict.meta
  const inLanguage = LOCALES[lang].htmlLang
  const orgId = `${origin}/#organization`
  const graph: object[] = []

  graph.push({
    '@type': 'Organization',
    '@id': orgId,
    name: FACTS.brand.seller,
    url: `${origin}/`,
    logo: { '@type': 'ImageObject', url: origin + LOGO_PATH, width: 512, height: 512 },
    description: t.organizationDescription,
    ...(FACTS.whatsapp.number
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            ...(FACTS.whatsapp.display ? { telephone: FACTS.whatsapp.display.replace(/\s+/g, '') } : {}),
            url: waLink(),
          },
        }
      : {}),
  })

  graph.push({
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: origin + pathFor('home', lang),
    name: t.siteName,
    alternateName: FACTS.brand.product,
    inLanguage,
    publisher: { '@id': orgId },
  })

  if (PRODUCT_PAGES.includes(page)) {
    const offers = FACTS.plans
      .filter((p) => p.price != null)
      .map((p) => ({
        '@type': 'Offer',
        name: t.offerName(t.planNames[p.id], p.screens, p.months),
        price: p.price!.toFixed(2),
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: origin + pathFor('boutique', lang),
        seller: { '@id': orgId },
      }))
    if (offers.length) {
      graph.push({
        '@type': 'Product',
        '@id': `${origin + pathFor('boutique', lang)}#product`,
        name: t.productName,
        description: t.productDescription,
        brand: { '@type': 'Brand', name: FACTS.brand.name },
        image: origin + OG_IMAGE.path,
        offers,
      })
    }
  }

  if (page !== 'home' && page !== 'notFound') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.pages.home.name, item: origin + pathFor('home', lang) },
        { '@type': 'ListItem', position: 2, name: t.pages[page].name, item: origin + pathFor(page, lang) },
      ],
    })
  }

  return [{ '@context': 'https://schema.org', '@graph': graph }]
}
