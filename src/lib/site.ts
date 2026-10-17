// Shared site constants: name forms, navigation, contact links and the per-route title and description.
// The brand name forms come from the brand kit (IDENTITY §8.4); owner facts come from src/lib/facts.ts.
import { BRAND, BRAND_LOCKUP } from '@/components/brand/identity'
import { anyInScope, switchedOn } from '@/components/brand/scope'
import { FACTS, mailtoHref, planPath, renewalPath, whatsappHref } from '@/lib/facts'

export {
  BRAND,
  BRAND_UPPER,
  BRAND_DESCRIPTOR,
  BRAND_LOCKUP,
  BRAND_STATEMENT,
  pageTitle,
  pendingText,
} from '@/components/brand/identity'

/** The site's domain (owner fact site.domain); `null` until given. */
export const SITE_DOMAIN: string | null = FACTS.site.domain

/**
 * The reseller programme is on show (owner fact reseller.offered, APPROVAL §2c.4): yes = on; no = off; not answered =
 * on in review mode (APPROVAL §2.8 keeps the page while its terms are pending) and off on the published site. One
 * switch for the page /revendeur/, its footer link, its teaser on /abonnements/, its mentions on /aide/, its entry
 * page and its sitemap line, so none of them can point to a page that is not there.
 */
export const RESELLER_ON: boolean = switchedOn('reseller.offered')

/** Routes of src/App.tsx that render the 404 page for now, because the page they name waits for the owner's « yes ». */
export const HIDDEN_ROUTES: string[] = RESELLER_ON ? [] : ['/revendeur/']

export type NavItem = { label: string; to: string }

/** Header menu and mobile menu (copy chrome.md › chrome-header; Revendeur lives in the footer, APPROVAL §2.2). */
export const MAIN_NAV: NavItem[] = [
  { label: 'Accueil', to: '/' },
  { label: 'Formules', to: '/abonnements/' },
  { label: 'Applications', to: '/applications/' },
  { label: 'Aide', to: '/aide/' },
  { label: 'Contact', to: '/contact/' },
]

/** Footer column « Parcourir » (chrome.md › chrome-footer). */
export const FOOTER_NAV: NavItem[] = [
  { label: 'Accueil', to: '/' },
  { label: 'Formules', to: '/abonnements/' },
  { label: 'Renouvellement', to: renewalPath() },
  { label: 'Applications', to: '/applications/' },
  { label: 'Aide', to: '/aide/' },
  { label: 'Contact', to: '/contact/' },
  ...(RESELLER_ON ? [{ label: 'Revendeur', to: '/revendeur/' }] : []),
]

/** Footer column « Informations légales » (chrome.md › chrome-footer). */
export const LEGAL_NAV: NavItem[] = [
  { label: 'Mentions légales', to: '/mentions-legales/' },
  { label: 'Conditions générales de vente', to: '/conditions-generales-de-vente/' },
  { label: 'Conditions d’utilisation', to: '/conditions-utilisation/' },
  { label: 'Confidentialité et cookies', to: '/politique-de-confidentialite/' },
  { label: 'Remboursement', to: '/politique-de-remboursement/' },
]

/** Prefilled WhatsApp message of the site-wide button (chrome.md › chrome-whatsapp): the customer's words. */
export const WHATSAPP_MESSAGE = 'Bonjour, j’ai une question.'

/**
 * WhatsApp link (wa.me) from facts.support.whatsapp; `null` until the owner gives the number. The kit's
 * WhatsApp button and bubble then show their pending look (data-pending="support.whatsapp"), never a dead link.
 */
export const WHATSAPP_HREF: string | null = whatsappHref()

/** The site-wide WhatsApp link, with the prefilled message. `null` until the number exists. */
export const WHATSAPP_CHAT_HREF: string | null = whatsappHref(WHATSAPP_MESSAGE)

/** Attributes of every WhatsApp link (it opens a new tab; the accessible name says so). */
export const WHATSAPP_LINK_PROPS = { target: '_blank', rel: 'noopener noreferrer' } as const

/** Accessible name of a WhatsApp link (GLOSSARY §2). */
export const WHATSAPP_LABEL = 'Écrire sur WhatsApp (nouvel onglet)'

/**
 * Props of a kit WhatsAppButton: the link with its new-tab attributes and accessible name, or the kit's pending
 * look (not a link, data-pending="support.whatsapp") while the number is missing.
 */
export function whatsappButtonProps(href: string | null = WHATSAPP_CHAT_HREF, label = 'Écrire sur WhatsApp', ariaLabel?: string) {
  return href
    ? { ...WHATSAPP_LINK_PROPS, href, 'aria-label': ariaLabel ?? `${label} (nouvel onglet)`, label }
    : { href: null, label }
}

// The consent banner's words (CONSENT_TEXTS) live in src/components/site/consent-texts.ts, so they load with the
// banner and not with every page (QA HC-08).

/** Router path of the privacy page's cookie section: the banner's « Voir le détail des cookies ». */
export const COOKIES_POLICY_PATH = '/politique-de-confidentialite/#cookies'

/** Support e-mail (owner fact support.email), `null` until given. */
export const SUPPORT_EMAIL: string | null = FACTS.support.email

/** mailto: link to the support address; undefined until the address exists (an <a> without href is not a link). */
export const SUPPORT_EMAIL_HREF: string | undefined = mailtoHref(FACTS.support.email) ?? undefined

/** href for a route rendered as a plain <a> (not a router Link): prefixed with the deploy base path. */
export function routeHref(path: string) {
  return import.meta.env.BASE_URL.replace(/\/$/, '') + path
}

/** The nav item for `to` is the current page (sub-pages count: /abonnements/12-mois/ is under Formules). */
export function isCurrent(pathname: string, to: string) {
  return to === '/' ? pathname === '/' : pathname.startsWith(to)
}

// ── Titles and descriptions (copy meta.md › chrome-meta) ────────────────────────────────────────────────────────

export type PageMeta = {
  /** Page name passed to pageTitle(); none on the home page. */
  page?: string
  /** A title written in full, used as is instead of pageTitle(page) (the home page, copy meta.md T18-tech-04). */
  title?: string
  /** Meta description: under 160 characters, no owner fact. */
  description: string
  /** robots noindex (checkout, 404). */
  noindex?: boolean
}

/**
 * Route → title and description, for every route except the plan pages (/abonnements/:slug), whose title and
 * description live in src/pages/product/data.ts (build-a). SiteLayout applies them on every navigation.
 */
export const PAGE_META: Record<string, PageMeta> = {
  '/': {
    // The lockup first (IDENTITY §1.3), then what the offer is; pageTitle() with no argument stays the lockup alone.
    title: `${BRAND_LOCKUP}\u00a0: direct, sport, films et séries`,
    description: `${BRAND}, abonnement TV (IPTV) : le direct, le sport, les films et les séries sur votre télé, votre box ou votre téléphone, avec un guide à chaque étape.`,
  },
  '/abonnements/': {
    page: 'Formules et prix',
    description: `Comparez les durées de l’abonnement TV ${BRAND}. Chaque formule affiche son prix total, et ce que toutes contiennent est listé une fois, ligne par ligne.`,
  },
  '/revendeur/': {
    page: 'Programme revendeur',
    description: `Revendez des abonnements ${BRAND} : fonctionnement par crédits, pack de départ, règles de revente et réponses aux questions des revendeurs.`,
  },
  '/applications/': {
    page: 'Applications et installation',
    // The first wording promises the app's name and its download link: it waits for one of the two app facts.
    description: anyInScope(['apps.own', 'apps.thirdParty'])
      ? 'Quelle application IPTV installer sur votre appareil, et où la télécharger ? Le bon lien et un guide d’installation pas à pas, appareil par appareil.'
      : 'Comment installer l’application IPTV sur votre télé, votre box ou votre téléphone, et où saisir vos accès : un guide pas à pas, appareil par appareil.',
  },
  '/aide/': {
    page: 'Aide et questions fréquentes',
    description: `Commande, paiement, activation, appareils, applications, dépannage : les réponses aux questions fréquentes sur ${BRAND}, classées par thème.`,
  },
  '/contact/': {
    page: 'Contact',
    description: `Écrivez à l’équipe ${BRAND} sur WhatsApp, par e-mail ou avec le formulaire : une question avant de commander, un écran qui bloque, un souci de paiement.`,
  },
  '/commande/': {
    page: 'Commande',
    description: `Vérifiez votre formule, indiquez vos coordonnées et finalisez votre commande ${BRAND}, sans compte à créer ni mot de passe.`,
    noindex: true,
  },
  '/mentions-legales/': {
    page: 'Mentions légales',
    description: `Qui publie le site ${BRAND}, qui l’héberge, à qui appartiennent ses contenus et quel médiateur de la consommation saisir en cas de litige.`,
  },
  '/conditions-generales-de-vente/': {
    page: 'Conditions générales de vente',
    description: `Ce que vous achetez avec un abonnement ${BRAND} : prix, commande, paiement, activation, rétractation, remboursement, durée, fin de l’abonnement et support.`,
  },
  '/conditions-utilisation/': {
    page: 'Conditions d’utilisation',
    description: `Les règles d’utilisation du site et du service ${BRAND} : accès personnels, usages autorisés, revente, contenus, applications tierces et responsabilités.`,
  },
  '/politique-de-confidentialite/': {
    page: 'Politique de confidentialité',
    description: `Les données que ${BRAND} collecte, pourquoi, qui les reçoit, combien de temps elles sont gardées, comment elles sont protégées, vos droits et les cookies.`,
  },
  '/politique-de-remboursement/': {
    page: 'Politique de remboursement',
    description: `Quand un abonnement ${BRAND} est remboursé, comment le demander, sous quel délai, et le lien avec votre droit de rétractation de 14 jours.`,
  },
}

/** The 404 page (unknown paths and unknown plan slugs). */
export const NOT_FOUND_META: PageMeta = {
  page: 'Page introuvable',
  description: `Cette page n’est pas au programme. Retrouvez l’accueil, les formules ou l’aide de ${BRAND}.`,
  noindex: true,
}

/** Plan pages: /abonnements/3-mois/ … and the renewal page (slugs from facts.ts, for the route list and links). */
export const PLAN_PATHS: string[] = [...FACTS.plans.list.map((p) => planPath(p)), renewalPath()]
