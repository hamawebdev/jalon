// The facts a meta description quotes, formatted for one language. Owner: seo.
import { formatNumber, formatPrice } from '@/i18n/format'
import type { MetaVars } from '@/i18n/dict/fr/meta'
import { LOCALES, type Lang } from '@/i18n/locales'
import { FACTS } from '@/lib/facts'

/** « Atlas Pro ONTV 4.0.2 », « Atlas Pro Max v7 »: the brief writes ONTV's dotted version bare, the others with v. */
function appWithVersion(id: 'ontv' | 'max' | 'ibo'): string {
  const app = FACTS.apps[id]
  if (!app.version) return app.name
  return id === 'ontv' ? `${app.name} ${app.version}` : `${app.name} v${app.version}`
}

export function metaVars(lang: Lang): MetaVars {
  const prices = FACTS.plans.map((p) => p.price).filter((p): p is number => p != null)
  const list = new Intl.ListFormat(LOCALES[lang].intl, { type: 'disjunction' })
  return {
    channels: formatNumber(lang, FACTS.counts.channels),
    films: formatNumber(lang, FACTS.counts.films),
    series: formatNumber(lang, FACTS.counts.series),
    uptime: new Intl.NumberFormat(LOCALES[lang].intl, { style: 'percent', maximumFractionDigits: 2 }).format(
      FACTS.counts.uptime / 100,
    ),
    priceFrom: prices.length ? formatPrice(lang, Math.min(...prices)) : '',
    panels: list.format(FACTS.resellerPanels.map((n) => formatNumber(lang, n))),
    ontv: appWithVersion('ontv'),
    max: appWithVersion('max'),
    ibo: appWithVersion('ibo'),
    whatsapp: FACTS.whatsapp.display ?? '',
    domain: FACTS.brand.domain ?? '',
  }
}
