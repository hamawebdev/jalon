// French <title>, meta description and social/structured-data wording of every page, from the brief's « Natural
// SEO Injection Strategy » (pp. 12–13): tier-1 keywords (Atlas Pro ONTV, atlas pro 2026, atlas pro on tv, IPTV Atlas
// Pro, abonnement Atlas Pro) in the home and Boutique tags, app and download keywords on Télécharger. Owner: seo.
//
// Titles are complete as written (no suffix is added) and stay under ~60 characters; descriptions ~140–160.
// Descriptions are functions of MetaVars: numbers, prices, versions and the phone number come from FACTS, already
// formatted for the language (src/components/site/seo/vars.ts). Translations in ../<lang>/meta.ts must have exactly
// the same keys and shapes.

/** Facts a description may quote, formatted for the page's language. */
export interface MetaVars {
  /** « 13 558 » */
  channels: string
  /** « 24 198 » */
  films: string
  /** « 6 278 » */
  series: string
  /** « 99,99 % » */
  uptime: string
  /** Lowest plan price: « 40 € » */
  priceFrom: string
  /** Reseller panel sizes as a list: « 10, 20 ou 30 » */
  panels: string
  /** App name with its version: « Atlas Pro ONTV 4.0.2 », « Atlas Pro Max v7 », « Atlas Pro IBO v4.3 » */
  ontv: string
  max: string
  ibo: string
  /** « +33 7 51 29 91 76 » */
  whatsapp: string
  /** « atlasprotvofficial.com » */
  domain: string
}

export interface PageMetaCopy {
  /** Short name of the page (breadcrumb). */
  name: string
  title: string
  description: (v: MetaVars) => string
}

type MetaPage =
  | 'home'
  | 'boutique'
  | 'revendeur'
  | 'telecharger'
  | 'contact'
  | 'mentions'
  | 'confidentialite'
  | 'conditions'
  | 'notFound'

const pages: Record<MetaPage, PageMetaCopy> = {
  home: {
    name: 'Accueil',
    title: 'Atlas Pro ONTV (2026) · Abonnement IPTV Atlas Pro',
    description: (v) =>
      `Découvrez Atlas Pro ONTV 2026, l'IPTV Atlas Pro on TV : +${v.channels} chaînes en Full HD, +${v.films} films et +${v.series} séries. Abonnement Atlas Pro activé sur WhatsApp.`,
  },
  boutique: {
    name: 'Boutique',
    title: 'Boutique · Abonnement Atlas Pro ONTV 12 mois',
    description: (v) =>
      `Commandez votre abonnement Atlas Pro ONTV en 3 clics : 1, 2 ou 3 écrans pour 12 mois, dès ${v.priceFrom}. Paiement PayPal ou virement SEPA, codes reçus sur WhatsApp.`,
  },
  revendeur: {
    name: 'Revendeur',
    title: 'Devenir revendeur Atlas Pro ONTV · Panel officiel',
    description: (v) =>
      `Devenez revendeur Atlas Pro : panel de ${v.panels} codes de 12 mois, livraison instantanée, formation gratuite et support dédié 24h/24. Tarifs sur WhatsApp.`,
  },
  telecharger: {
    name: 'Télécharger',
    title: 'Télécharger Atlas Pro ONTV APK · Applications officielles',
    description: (v) =>
      `Téléchargez ${v.ontv} (APK), ${v.max} et ${v.ibo} avec leur code Downloader, et les lecteurs pour iPhone, Smart TV, Windows et Mac.`,
  },
  contact: {
    name: 'Contact',
    title: 'Contact Atlas Pro · Support WhatsApp 7j/7',
    description: (v) =>
      `Une question sur votre abonnement Atlas Pro ou l'installation d'Atlas Pro ONTV ? Notre support vous répond sur WhatsApp au ${v.whatsapp}, 7j/7.`,
  },
  mentions: {
    name: 'Mentions légales',
    title: 'Mentions légales · AtlasProTVOfficial',
    description: (v) =>
      `Mentions légales du site ${v.domain} : éditeur, hébergement et propriété intellectuelle. AtlasProTVOfficial, distributeur officiel agréé Atlas Pro.`,
  },
  confidentialite: {
    name: 'Politique de confidentialité',
    title: 'Politique de confidentialité · AtlasProTVOfficial',
    description: () =>
      `Comment AtlasProTVOfficial traite les informations confiées pour commander et activer votre abonnement Atlas Pro sur WhatsApp, et quels sont vos droits.`,
  },
  conditions: {
    name: 'Conditions générales',
    title: 'Conditions générales & garantie · Atlas Pro ONTV',
    description: () =>
      `Conditions générales de l'abonnement Atlas Pro ONTV : commande et activation sur WhatsApp, paiement par PayPal ou virement SEPA, garantie satisfait ou remboursé.`,
  },
  notFound: {
    name: 'Page introuvable',
    title: 'Page introuvable · Atlas Pro ONTV',
    description: () =>
      `Cette page n'existe pas ou a changé d'adresse. Retrouvez l'abonnement Atlas Pro ONTV, les applications et les guides d'installation depuis l'accueil.`,
  },
}

export const meta = {
  siteName: 'AtlasProTVOfficial',
  /** Alt text of the social preview image (public/og.png). */
  ogImageAlt: 'Atlas Pro ONTV 2026 · Abonnement IPTV Atlas Pro chez AtlasProTVOfficial, distributeur officiel agréé',
  /** Structured data (JSON-LD). */
  organizationDescription: 'Distributeur Officiel Agréé Atlas Pro N°1 en France & en Europe.',
  productName: 'Abonnement Atlas Pro ONTV',
  productDescription:
    'Abonnement IPTV Atlas Pro ONTV de 12 mois pour 1, 2 ou 3 écrans : chaînes en direct en Full HD, films et séries en VOD, replay, sur Android, Smart TV, Fire TV Stick, iPhone et PC.',
  planNames: { premium: 'Premium', duo: 'Duo', famille: 'Famille' },
  /** « Premium · 1 écran · 12 mois » */
  offerName: (plan: string, screens: number, months: number) =>
    `${plan} · ${screens} écran${screens > 1 ? 's' : ''} · ${months} mois`,
  pages,
}
