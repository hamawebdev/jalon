// Every page of the site, with its address in each language. Build every internal link with pathFor(): never type
// a path in a page. Paths always end with a slash. Plain TypeScript, no JSX: scripts import it too.

import { DEFAULT_LANG, LANGS, LOCALES, type Lang } from './locales.ts'

export const PAGES = [
  'home',
  'boutique',
  'revendeur',
  'telecharger',
  'contact',
  'mentions',
  'confidentialite',
  'conditions',
] as const
export type PageId = (typeof PAGES)[number]

/** Slug of each page in each language ('' is the language's home). */
export const SLUGS: Record<PageId, Record<Lang, string>> = {
  home: { fr: '', en: '', de: '', es: '', pt: '', it: '', fi: '' },
  boutique: { fr: 'boutique', en: 'shop', de: 'shop', es: 'tienda', pt: 'loja', it: 'negozio', fi: 'kauppa' },
  revendeur: {
    fr: 'revendeur',
    en: 'reseller',
    de: 'wiederverkaeufer',
    es: 'revendedor',
    pt: 'revendedor',
    it: 'rivenditore',
    fi: 'jalleenmyyja',
  },
  telecharger: {
    fr: 'telecharger',
    en: 'download',
    de: 'herunterladen',
    es: 'descargar',
    pt: 'transferir',
    it: 'scarica',
    fi: 'lataa',
  },
  contact: { fr: 'contact', en: 'contact', de: 'kontakt', es: 'contacto', pt: 'contacto', it: 'contatti', fi: 'yhteystiedot' },
  mentions: {
    fr: 'mentions-legales',
    en: 'legal-notice',
    de: 'impressum',
    es: 'aviso-legal',
    pt: 'aviso-legal',
    it: 'note-legali',
    fi: 'oikeudelliset-tiedot',
  },
  confidentialite: {
    fr: 'politique-de-confidentialite',
    en: 'privacy-policy',
    de: 'datenschutz',
    es: 'politica-de-privacidad',
    pt: 'politica-de-privacidade',
    it: 'privacy',
    fi: 'tietosuoja',
  },
  conditions: {
    fr: 'conditions-generales',
    en: 'terms-and-conditions',
    de: 'agb',
    es: 'condiciones-generales',
    pt: 'termos-e-condicoes',
    it: 'condizioni-generali',
    fi: 'kayttoehdot',
  },
}

/** Pages kept out of the sitemap and marked noindex. */
export const NOINDEX_PAGES: PageId[] = []

/**
 * Anchors of the home page sections, the same in every language (the brief's footer uses #hero, #points-forts,
 * #applications, #tarifs, #installation, #avis, #faq).
 */
export const HOME_ANCHORS = {
  hero: 'hero',
  why: 'points-forts',
  history: 'histoire',
  sport: 'sport',
  vod: 'vod',
  renewal: 'renouvellement',
  howTo: 'comment-acheter',
  pricing: 'tarifs',
  compat: 'compatibilite',
  install: 'installation',
  apps: 'applications',
  pillars: 'piliers',
  reviews: 'avis',
  faq: 'faq',
} as const
export type HomeAnchor = keyof typeof HOME_ANCHORS

/** Router path of a page in a language, without the deploy base: '/', '/boutique/', '/en/shop/'. */
export function pathFor(page: PageId, lang: Lang, hash?: string): string {
  const slug = SLUGS[page][lang]
  const path = `${LOCALES[lang].prefix}/${slug ? `${slug}/` : ''}`
  return hash ? `${path}#${hash}` : path
}

/** Link to a home section: homeAnchor('pricing', 'en') → '/en/#tarifs'. */
export function homeAnchor(anchor: HomeAnchor, lang: Lang): string {
  return pathFor('home', lang, HOME_ANCHORS[anchor])
}

/** The language and page of a router path ('/en/shop/' → en, boutique). Unknown page: page null. */
export function parsePath(pathname: string): { lang: Lang; page: PageId | null } {
  const parts = pathname.split('/').filter(Boolean)
  let lang: Lang = DEFAULT_LANG
  if (parts.length && LANGS.some((l) => l !== DEFAULT_LANG && l === parts[0])) lang = parts.shift() as Lang
  const slug = parts.join('/')
  const page = PAGES.find((p) => SLUGS[p][lang] === slug) ?? null
  return { lang, page }
}

/** Every (page, language) pair the site serves. */
export function allRoutes(): { page: PageId; lang: Lang; path: string }[] {
  return PAGES.flatMap((page) => LANGS.map((lang) => ({ page, lang, path: pathFor(page, lang) })))
}
