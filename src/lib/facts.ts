// Owner facts for the Jalon site: types, labels and helpers. Owner of this file: copy (T08, T19).
//
// The values live in ./facts.data.ts (`FACTS`), the one file the owner fills in; this file re-exports it, so every
// page imports from '@/lib/facts'. Every business fact the pages show is there: plans and prices, delivery, support,
// content, company and legal details. Until the owner answers, a fact is `null`. Never put a template value there,
// and never let a page invent a fallback for a null fact.
//
// Two display modes (APPROVAL §2c, read by the brand kit from VITE_PENDING):
// - review: every missing fact renders « À compléter » (the kit's <Pending what fact />, or pendingText() from
//   src/components/brand/identity.ts where JSX cannot go: title, meta, aria-label, cart line names);
// - launch: a missing required fact keeps that marker; a missing optional fact leaves no trace (its row, sentence,
//   card, entry or section follows the `↳ launch` instruction of the copy docs, .team/copy/README.md §10).
// Which facts are required: REQUIRED_FACTS at the end of this file, and CONDITIONAL_FACTS, required only with some
// answers (the hand-off addresses of the chosen checkout.mode, the fields of each cookies.tools entry: APPROVAL §2e).
// `npm run launch-check` (scripts/launch-check.mjs) lists the required facts still missing and fails while one is,
// or while an answer asks for a part the site does not have yet (UNSUPPORTED_ANSWERS).
//
// Keys follow .team/structure/FACTS-NEEDED.md: support.hours → FACTS.support.hours. Fields of a key
// (proof.rating.value, plans.renewal.identifier…) and the keys added during T08 are explained, with their value
// shapes and where each one is used, in .team/copy/FACTS.md. The copy docs write a fact as {fact:path|words}.
//
// Structural defaults (APPROVAL §2.5): the plan lineup (3, 6, 12 and 24 months), the featured plan (12 months) and
// the renewal page are not owner facts yet. `plans.confirmed` stays false until the owner confirms them; every
// price, screen count and feature stays null.
//
// A « no » from the owner is written `false` where the type allows it (no trial, no own app, no programme guide…).
// present() treats false, '' and [] like null, which is what a `condition: <key> != null` line in the copy docs means.
//
// Free-text values (support.hours, delivery.delay, catchup.days, trial.terms.duration…) are printed as typed: the
// pages cannot typeset them. Type them in French typography, with U+00A0 ('\u00a0' in a string) between a number
// and its unit (« 9 h », « 30 minutes », « 7 jours », « 24 heures ») and before ; : ! ? (GLOSSARY §9).
//
// This file and facts.data.ts use only erasable TypeScript syntax and relative imports with their extension, so
// plain Node (type stripping) can import them: scripts/launch-check.mjs does. Keep it that way: no enum, no
// namespace, no '@/…' import here (the brand kit imports this file, so nothing here may import the kit either).

import { FACTS } from './facts.data.ts'

export { FACTS }

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────

/** Plan ids, as in FACTS-NEEDED (`plans.<id>.price`). Add an id here if the owner sells another duration. */
export type PlanId = 'p3' | 'p6' | 'p12' | 'p24'

export type Plan = {
  id: PlanId
  /** Duration in months (structural default until plans.confirmed). */
  months: number
  /** Product slug under /abonnements/ (« 12-mois »), derived from the months. */
  slug: string
  /** plans.<id>.price: total price for the whole duration, in euros, tax as pricing.vat says. */
  price: number | null
  /** plans.<id>.referencePrice: only a real reference price (the lowest price of the 30 days before a reduction). */
  referencePrice: number | null
}

/** A multi-screen option: number of screens and the total price per plan for that count (plans.screens.options). */
export type ScreenOption = { screens: number; prices: Partial<Record<PlanId, number>> }

/** A renewable duration and its total price (plans.renewal.durations). */
export type RenewalOption = { months: number; price: number | null }

/** Device families (GLOSSARY §3), in display order. */
export type DeviceFamily = 'tv' | 'box' | 'android' | 'apple' | 'ordinateur' | 'recepteur' | 'console'

export type QualityLevel = 'SD' | 'HD' | 'Full HD' | '4K'

/** What a customer can receive to watch (delivery.credentialTypes). */
export type CredentialKind = 'playlist' | 'codes' | 'portal' | 'appLogin'

export type DeliveryChannel = 'e-mail' | 'WhatsApp' | 'SMS'

/** How an order is placed and paid (checkout.mode); the sentence for each mode is in .team/copy/pages/commande.md. */
export type CheckoutMode = 'hostedPage' | 'paymentLinks' | 'message' | 'externalShop'

/**
 * What a hand-off address is given for (checkout.paymentLinks, checkout.shopLinks): a plan of the lineup (its id),
 * the renewals, the reseller entry pack.
 */
export type HandoffItem = PlanId | 'renewal' | 'resellerPack'

/**
 * A hand-off address (https://…), or one address per variant when the variants have prices of their own: per
 * duration in months for the renewals (`{ 3: 'https://…', 12: 'https://…' }`), per screen count for a plan sold
 * with screen options (`{ 1: 'https://…', 2: 'https://…' }`). Any address may hold HANDOFF_PLACEHOLDERS.
 */
export type HandoffAddress = string | Readonly<Partial<Record<number, string>>>

/** One hand-off address per item (checkout.paymentLinks, checkout.shopLinks). */
export type HandoffLinks = Partial<Record<HandoffItem, HandoffAddress>>

/** The order line a hand-off address is looked up for: the variant that may have an address of its own. */
export type HandoffLine = {
  /** Duration in months: picks a renewal address given per duration, and fills {months}. */
  months?: number | null
  /** Screen count of a plan line sold with screen options: picks a plan address given per screen count. */
  screens?: number | null
}

/** The order handoffFor() fills an address for: one line of /commande/, its amount and its buyer. */
export type HandoffOrder = HandoffLine & {
  /** The order reference (orderReference()): {ref}. */
  ref: string
  /** Amount to pay, in euros: {amount}, written with a dot and two decimals (69.9 → « 69.90 »). */
  amount?: number | null
  /** The buyer's e-mail: {email}. */
  email?: string | null
}

export type PaymentMethod = {
  /** As the customer knows it (« Carte bancaire »). */
  name: string
  /** card: rows about refused cards apply (/aide/ #paiement-refuse). */
  kind: 'card' | 'other'
  /** Fee, discount or payment instructions tied to this method, if any. */
  note: string | null
}

export type CheckoutFieldId =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'country'
  | 'device'
  | 'deviceModel'
  | 'macAddress'
  | 'address'

export type CheckoutField = { id: CheckoutFieldId; required: boolean }

/** A download for the owner's own app on one platform. Dates are written « 9 octobre 2026 ». */
export type AppLink = {
  platform: DeviceFamily
  storeUrl: string | null
  fileUrl: string | null
  version: string | null
  date: string | null
}

/** A third-party player the owner recommends (apps.thirdParty.<family>). */
export type ThirdPartyApp = {
  /** As its store shows it. */
  name: string
  storeUrl: string | null
  fileUrl: string | null
  version: string | null
  date: string | null
  /** The player charges its own licence, paid to its publisher (never sold by us, APPROVAL §2.10). */
  paidLicence: boolean
}

export type OwnApp = {
  name: string
  platforms: DeviceFamily[]
  /** Three main features, 2 to 4 words each (home-app strip). */
  features: string[] | null
  /** Capabilities that product-included shows only when confirmed (true). */
  capabilities: { profiles: boolean | null; parentalCode: boolean | null; resume: boolean | null }
  /** How the app is updated (apps-notes). */
  updates: string | null
  /** What the app keeps when the customer changes device (apps-notes). */
  sync: string | null
  links: AppLink[] | null
}

/** A testimonial, reproduced as written, with the author's consent. */
export type Review = {
  quote: string
  /** First name and initial. */
  name: string
  /** City or country. */
  place: string
  /** Month and year (« octobre 2026 »). */
  date: string
  rating: number | null
  topic: string | null
}

export type Processor = { name: string; role: string; country: string }

/** A tool that sets cookies or other trackers (cookies.tools). launch-check needs all four fields of each entry. */
export type CookieTool = {
  /** As visitors know it; also its key in the consent store, so two tools never share a name. */
  name: string
  /** What it is for, as a clause that follows « pour » or « Sert à » (« compter les visites et les pages vues »). */
  purpose: string
  /** How long its cookies last (« 13 mois »). */
  duration: string
  /** true: it runs only with the visitor's consent (consentTools(), the banner); false: the site cannot work without it. */
  consent: boolean
}
export type RefundStep = { period: string; share: string }
export type CreditCost = { months: number; credits: number }
export type NamedLink = { name: string; url: string }
export type SocialAccount = { network: string; url: string }

export type Facts = {
  site: { domain: string | null }
  plans: {
    /** The owner has confirmed the lineup and the featured plan (APPROVAL §2.5). */
    confirmed: boolean
    /** plans.list: the plans sold, shortest first (sets the product slugs). */
    list: Plan[]
    /** plans.featured: the plan that carries « Notre conseil ». */
    featured: PlanId
    features: {
      /** What every plan includes, as short phrases (CGV, product description). */
      included: string[] | null
      /** Any real difference between plans besides duration and price (« aucune » if none). */
      differences: string | null
    }
    screens: {
      /** Simultaneous screens included in every plan. */
      count: number | null
      /** Multi-screen options and their prices; null or [] when there is a single offer. */
      options: ScreenOption[] | null
    }
    /** false: one-off payment, the subscription stops at its end date; true: automatic renewal. See endOfTerm(). */
    autoRenew: boolean | null
    renewal: {
      /** Structural: the renewal page /abonnements/renouvellement/. */
      slug: string
      /** The identifier a customer gives to renew, and where they find it. */
      identifier: string | null
      /** Whether the days left are added to the new duration, and any limit. */
      carryOver: string | null
      /** Renewable durations and prices; null = not given yet (renewalOptions() then shows the plan list). */
      durations: RenewalOption[] | null
    }
    /** Switching to another duration mid-term, and what happens to the time left. */
    upgrade: string | null
    /** When a subscription's duration starts counting (payment, activation, first connection). */
    start: string | null
  } & Record<PlanId, Plan>
  pricing: {
    /** « TTC », or the VAT-exemption mention. */
    vat: string | null
    /** The currency, as written in the text (« euros »). Prices are formatted in euros (formatEuro). */
    currency: string | null
  }
  checkout: {
    mode: CheckoutMode | null
    /** mode paymentLinks: the payment link of each item, or of each variant with its own price (handoffFor()). */
    paymentLinks: HandoffLinks | null
    /** mode externalShop: the shop page of each item; shopUrl, one address for everything, is the alternative. */
    shopLinks: HandoffLinks | null
    /** mode externalShop: one shop address for every item (a page of shopLinks wins for its item). */
    shopUrl: string | null
    /** mode hostedPage: the payment page's address, a template that holds {ref} or {plan} (HANDOFF_PLACEHOLDERS). */
    hostedUrl: string | null
    /** Fields asked at checkout and whether each is required. */
    fields: CheckoutField[] | null
    /** How a portal box's device (MAC) address reaches us: at checkout, or by message after the order. */
    macAddress: string | null
  }
  payment: { methods: PaymentMethod[] | null; provider: string | null }
  /** Whether promo codes exist (false: none), and where they are published. */
  promo: { codes: string | false | null }
  /** How an invoice reaches the customer, and whether it can carry a company name. */
  invoice: { delivery: string | null }
  trial: {
    offered: boolean | null
    terms: {
      duration: string | null
      /** « gratuit » or an amount, as the owner writes it. */
      price: string | null
      /** How to get it, as a clause (« écrivez-nous sur WhatsApp »). */
      how: string | null
      limits: string | null
      /** request: CTA to WhatsApp or e-mail; cart: the /abonnements/essai/ page (not built now, APPROVAL §2.3). */
      mode: 'request' | 'cart' | null
    }
  }
  channels: { live: { count: number | null }; regions: string[] | null }
  content: { categories: string[] | null; licensing: string | null }
  vod: {
    count: number | null
    updates: string | null
    genres: { name: string; count: number | null }[] | null
    /** Audio languages and subtitles on the on-demand titles. */
    languages: string | null
  }
  sport: { disciplines: string[] | null }
  quality: { levels: QualityLevel[] | null }
  /** Catch-up window and the channels it covers; false: no catch-up. */
  catchup: { days: string | false | null }
  /** How far ahead the programme guide shows (« N jours »); false: no programme guide. */
  epg: { available: string | false | null }
  /** « incluse, N stations » or « non incluse ». */
  radio: { available: string | null }
  /** Recommended connection speed per quality level. */
  internet: { minSpeed: string | null }
  delivery: {
    /** Time from payment to activation (typical and maximum), and any hours of manual processing. */
    delay: string | null
    channel: DeliveryChannel[] | null
    credentialTypes: CredentialKind[] | null
    /** How lost access details are re-sent or reset, as a clause. */
    resend: string | null
  }
  devices: {
    /** Supported families, each with the models, brands or systems to show as tags; a missing family is not supported. */
    supported: Partial<Record<DeviceFamily, string[]>> | null
  }
  apps: {
    own: OwnApp | false | null
    /** Recommended third-party players per family. */
    thirdParty: Partial<Record<DeviceFamily, ThirdPartyApp[]>> | null
  }
  /** Owner-specific setup step per family (server address format, app setting). */
  guides: { devices: Partial<Record<DeviceFamily, string>> | null }
  usage: { sharing: string | null; abroad: string | null }
  support: {
    /** Days and hours, French style (« tous les jours, de N h à N h »), never « 9:00 ». */
    hours: string | null
    /** WhatsApp number, international format (+ and the country code). */
    whatsapp: string | null
    email: string | null
    phone: string | null
    /** Typical response time; per channel if they differ. */
    responseTime: string | null
    /** Languages support answers in, as a clause after « en ». */
    languages: string | null
    /**
     * Contact-form subjects. The form's « Sujet » select and every sentence that names a subject (help page, privacy
     * table) render only when present(): no empty select, no marker in their place.
     */
    topics: string[] | null
    /** Named agents (optional; brings back a removed section, with their consent). */
    team: { name: string; role: string }[] | null
  }
  contact: { formEndpoint: string | null }
  community: { channel: NamedLink | false | null }
  account: { portal: string | null }
  social: { accounts: SocialAccount[] | null }
  reseller: {
    offered: boolean | null
    entryPack: { credits: number | null; price: number | null; includes: string[] | null; condition: string | null }
    creditCosts: CreditCost[] | null
    creditExpiry: string | null
    trialAccounts: string | null
    panel: string[] | null
    rules: { channels: string | null; pricing: string | null; support: string | null }
    contact: string | null
  }
  proof: {
    rating: { value: number; count: number; source: string; url: string } | null
    customers: { value: number; asOf: string } | null
    countries: number | null
    reviews: { items: Review[]; source: string } | null
    /** Measured availability with its period (« N % sur N mois »). */
    uptime: string | null
    /** Percentage of customers who recommend the service, and the survey behind it. */
    recommendRate: { value: number; survey: string } | null
    /** Founding year and real milestones (optional; brings back a removed section). */
    history: string | null
  }
  media: {
    appScreens: { src: string; alt: string }[] | null
    /**
     * The demo video of the home page. `tool`: the name, exactly as in cookies.tools, of the tool its player comes from
     * (the video host); the player then mounts only through the consent gate (QA HC-03). null or left out: a video
     * file served with the site, nothing to ask about.
     */
    demoVideo: { url: string; poster: string; title: string; tool?: string | null } | null
  }
  company: {
    legalName: string | null
    form: string | null
    capital: string | null
    address: string | null
    rcs: string | null
    siret: string | null
    /** The intra-EU VAT number, or the exemption mention. */
    vatNumber: string | null
    phone: string | null
    email: string | null
    /** Publication director. */
    director: string | null
  }
  host: { name: string | null; address: string | null; phone: string | null }
  consumer: { mediator: { name: string | null; website: string | null; address: string | null } }
  /** Date of the version in force of each legal document (« 10 octobre 2026 »). */
  legal: { lastUpdated: { cgv: string | null; cgu: string | null; privacy: string | null; refund: string | null } }
  privacy: {
    /** E-mail (the privacy page then shows a mailto button) or postal address; a DPO if one is appointed. */
    dpoContact: string | null
    processors: { list: Processor[] | null; transfers: string | null }
    retention: {
      orders: string | null
      service: string | null
      messages: string | null
      accounting: string | null
      logs: string | null
    }
    /** Measures actually in place, as the owner and the host confirm them. */
    security: string[] | null
    /** What the TV service itself records when customers watch (logs, IP addresses, device identifiers). */
    serviceData: string | null
  }
  /**
   * Analytics, advertising or embedded-media tools; null or [] = none, so no consent banner (APPROVAL §2.7). A tool
   * with consent: true brings the consent banner and the privacy page's « Gérer mes cookies » (APPROVAL §2e).
   */
  cookies: { tools: CookieTool[] | null }
  refund: {
    terms: {
      /** One sentence (FAQ, CGV, checkout). */
      summary: string | null
      /** The cases in which a refund applies (refund page). */
      cases: string | null
      /** The refund delay and how the money comes back. */
      payback: string | null
    }
    /** Refund share by elapsed time, only if the owner refunds that way. */
    schedule: RefundStep[] | null
  }
  /** What happens if the customer does not ask for an immediate start (legal read pending). */
  withdrawal: { terms: string | null }
  /** Where the online « Résilier mon abonnement » feature lives, and what happens when a customer stops early. */
  cancellation: { path: string | null; terms: string | null }
  shop: { physicalDevices: boolean | null }
}

// ── Labels shared by both builds (GLOSSARY §3–5) ─────────────────────────────────────────────────────────────

/** Device families in display order. */
export const DEVICE_FAMILIES: readonly DeviceFamily[] = ['tv', 'box', 'android', 'apple', 'ordinateur', 'recepteur', 'console']

/**
 * Family name (headings, select options), chip label, sentence form, /applications/ group anchor and guide anchor.
 * `name` is a heading: never put it inside a sentence. `inText` is the form for running text (« Fonctionne sur
 * les télés connectées… », « Appareils compatibles : les télés connectées… »): lowercase, plural, with its article
 * and without a comma, so a list of families stays readable. Use familiesInText() to build that list.
 */
export const DEVICE_FAMILY_LABEL: Record<
  DeviceFamily,
  { name: string; chip: string; inText: string; anchor: string; guide: string }
> = {
  tv: { name: 'Télé connectée', chip: 'Télé connectée', inText: 'les télés connectées', anchor: 'tv', guide: 'guide-tv' },
  box: { name: 'Clé ou box TV', chip: 'Clé ou box TV', inText: 'les clés et box TV', anchor: 'box', guide: 'guide-box' },
  android: {
    name: 'Téléphone et tablette Android',
    chip: 'Android',
    inText: 'les téléphones et tablettes Android',
    anchor: 'android',
    guide: 'guide-android',
  },
  apple: { name: 'iPhone, iPad et Apple TV', chip: 'Apple', inText: 'les appareils Apple', anchor: 'apple', guide: 'guide-apple' },
  ordinateur: { name: 'Ordinateur', chip: 'Ordinateur', inText: 'les ordinateurs', anchor: 'ordinateur', guide: 'guide-ordinateur' },
  recepteur: {
    name: 'Récepteur et box à portail',
    chip: 'Récepteur',
    inText: 'les récepteurs et box à portail',
    anchor: 'recepteur',
    guide: 'guide-recepteur',
  },
  console: { name: 'Console de jeu', chip: 'Console et autres', inText: 'les consoles de jeu', anchor: 'autres', guide: 'guide-console' },
}

/** Quality ladder names (home-channels, product-quality). */
export const QUALITY_LABEL: Record<QualityLevel, string> = {
  '4K': 'Ultra haute définition',
  'Full HD': 'Haute définition intégrale, 1080p',
  HD: 'Haute définition, 720p',
  SD: 'Définition standard',
}

/** Noun phrases for « Vous recevez {…} par {…} » (home-how-it-works, /aide/, /applications/). */
export const CREDENTIAL_LABEL: Record<CredentialKind, string> = {
  playlist: 'un lien de liste',
  codes: 'des codes d’accès',
  portal: 'une adresse de portail pour votre box',
  appLogin: 'un identifiant pour notre application',
}

/** Checkout fields as named in running text (privacy-data). */
export const CHECKOUT_FIELD_LABEL: Record<CheckoutFieldId, string> = {
  firstName: 'prénom',
  lastName: 'nom',
  email: 'adresse e-mail',
  phone: 'téléphone ou WhatsApp',
  country: 'pays de résidence',
  device: 'type d’appareil',
  deviceModel: 'marque et modèle de l’appareil',
  macAddress: 'adresse MAC de la box',
  address: 'adresse postale',
}

// ── Helpers: they format or compute from facts, and never invent a value ─────────────────────────────────────

const NBSP = ' '

/**
 * Supplied and not a « no »: null, undefined, false, '' and [] are absent. This is the `condition: <key> != null`
 * of the copy docs: a section or row that rests on a fact renders only when present(fact).
 */
export function present<T>(value: T | null | undefined | false): value is T {
  if (value == null || value === false) return false
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'string') return value.trim() !== ''
  return true
}

/** An amount in French euros with `digits` decimals, its spaces as U+00A0 (never U+202F). */
function euros(amount: number, digits: 0 | 2): string {
  const text = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount)
  return text.replace(/[\u202f\u00a0 ]/g, NBSP)
}

/** French amount in euros, as the owner gives it: 59 → « 59 € », 12.5 → « 12,50 € » (U+00A0, never U+202F). null → null. */
export function formatEuro(amount: number | null | undefined): string | null {
  if (amount == null || !Number.isFinite(amount)) return null
  return euros(amount, Number.isInteger(amount) ? 0 : 2)
}

/**
 * French amount in euros that always keeps its cents: 5 → « 5,00 € », 12.82 → « 12,82 € ». For an amount the site
 * computes (a price per month): it sits in a row of amounts with cents, and must not lose its own when it falls on a
 * whole euro (QA LT-12). null → null.
 */
export function formatEuroCents(amount: number | null | undefined): string | null {
  if (amount == null || !Number.isFinite(amount)) return null
  return euros(amount, 2)
}

/** French count: 12000 → « 12 000 » (U+00A0 between thousands). null → null. */
export function formatCount(n: number | null | undefined): string | null {
  if (n == null || !Number.isFinite(n)) return null
  return new Intl.NumberFormat('fr-FR').format(n).replace(/[   ]/g, NBSP)
}

/**
 * French list: ['SD', 'HD', '4K'] → « SD, HD et 4K ». null or [] → null.
 * When an item carries its own comma or semicolon (an owner phrase such as « le direct, en HD »), the items are
 * separated by « ; » instead, so the reader still sees where each one ends: « le direct, en HD ; les films ». A
 * decimal comma (« 12,50 € ») does not count.
 */
export function formatList(items: readonly string[] | null | undefined): string | null {
  if (!items || items.length === 0) return null
  if (items.length === 1) return items[0]
  if (items.some((item) => /,\s|;/.test(item))) return items.join(`${NBSP}; `)
  return `${items.slice(0, -1).join(', ')} et ${items[items.length - 1]}`
}

/**
 * The form of « de » to write before an owner-written name or phrase (QA LT-13): « d’ » before a vowel (« d’Adyen »,
 * « d’Exemple Services », « d’une semaine »), « de » and its space otherwise (« de Stripe », « de 24 heures »), and
 * while the value is missing, so the marker that follows reads « de [À compléter] ».
 *   in JSX:    À l’attention {deBefore(name)}<Fact value={name} … />
 *   in a text: withDe(name)
 * The spelling cannot tell every case, so the rule stays on the safe side: never before h (« de Hachette », though
 * « d’Hermès »), before y only when a consonant follows (« d’Yves », « de YouTube »), never before a figure
 * (« de 1 mois »), « onze » or « oui ». A name that starts with « Le » or « Les » is not contracted (« du », « des »).
 * Where a sentence can name the thing first, prefer that: « de notre prestataire, {name} » needs no elision.
 */
export function deBefore(text: string | null | undefined): string {
  const t = (text ?? '').trim()
  if (/^(onze|onzième|oui)\b/iu.test(t)) return 'de '
  if (/^[aeiouàâäéèêëîïôöùûüœæ]/iu.test(t) || /^y[^aeiouàâäéèêëîïôöùûüy\s]/iu.test(t)) return 'd’'
  return 'de '
}

/** « de » and an owner-written name, as French writes it: withDe('Adyen') → « d’Adyen », withDe('Stripe') → « de Stripe ». */
export function withDe(text: string): string {
  return `${deBefore(text)}${text.trim()}`
}

/** Device families the owner supports, in display order; null while devices.supported is not given. */
export function supportedFamilies(): DeviceFamily[] | null {
  const supported = FACTS.devices.supported
  if (!present(supported)) return null
  return DEVICE_FAMILIES.filter((family) => present(supported[family]))
}

/**
 * Device families inside a sentence, in display order, with their sentence forms (DEVICE_FAMILY_LABEL.inText):
 * ['tv', 'box', 'ordinateur'] → « les télés connectées, les clés et box TV et les ordinateurs ». null or [] → null.
 * For « Fonctionne sur … », « … s’installe sur … » and « Appareils compatibles : … »; headings, chips and select
 * options keep `name` and `chip`.
 */
export function familiesInText(families: readonly DeviceFamily[] | null | undefined): string | null {
  if (!families) return null
  return formatList(DEVICE_FAMILIES.filter((family) => families.includes(family)).map((family) => DEVICE_FAMILY_LABEL[family].inText))
}

/** The plan with this id. */
export function planById(id: PlanId): Plan {
  return FACTS.plans[id]
}

/** The plan that carries « Notre conseil » (plans.featured). */
export function featuredPlan(): Plan {
  return FACTS.plans[FACTS.plans.featured]
}

/** Product page of a plan: « /abonnements/12-mois/ ». */
export function planPath(plan: Pick<Plan, 'slug'>): string {
  return `/abonnements/${plan.slug}/`
}

/** The renewal page: « /abonnements/renouvellement/ ». */
export function renewalPath(): string {
  return `/abonnements/${FACTS.plans.renewal.slug}/`
}

/** Plan name on cards, product pages, cart and checkout lines and the CGV: « Formule 12 mois ». */
export function planName(months: number): string {
  return `Formule ${months}${NBSP}mois`
}

/** Renewal line name: « Renouvellement 12 mois ». */
export function renewalName(months: number): string {
  return `Renouvellement ${months}${NBSP}mois`
}

/** data-pending key of a plan fact: planFactKey('p12', 'price') → « plans.p12.price ». */
export function planFactKey(id: PlanId, field: 'price' | 'referencePrice'): string {
  return `plans.${id}.${field}`
}

/** Price per month, rounded to the cent (the number; perMonthLine() writes it): null while the price is null. */
export function perMonth(plan: Pick<Plan, 'price' | 'months'>): number | null {
  if (plan.price == null || plan.months <= 0) return null
  return Math.round((plan.price / plan.months) * 100) / 100
}

/**
 * The per-month line under a total price: « soit 4,92 € par mois ». The amount always keeps its cents, also when it
 * falls on a whole euro (119,90 € over 24 months: « soit 5,00 € par mois »), so every plan of a row reads the same
 * way (QA LT-12). null while the price is null.
 */
export function perMonthLine(plan: Pick<Plan, 'price' | 'months'>): string | null {
  const monthly = formatEuroCents(perMonth(plan))
  return monthly ? `soit ${monthly} par mois` : null
}

/** Saving in %, only with a real reference price above the price; null otherwise. */
export function savingPercent(plan: Pick<Plan, 'price' | 'referencePrice'>): number | null {
  const { price, referencePrice } = plan
  if (price == null || referencePrice == null || referencePrice <= price || referencePrice <= 0) return null
  return Math.round((1 - price / referencePrice) * 100)
}

/** The plan with the lowest total price, for « Dès … pour … mois » (home-cta); null while any price is null. */
export function fromPlan(): Plan | null {
  const plans = FACTS.plans.list
  if (plans.length === 0 || plans.some((p) => p.price == null)) return null
  return plans.reduce((low, p) => ((p.price as number) < (low.price as number) ? p : low))
}

/**
 * Durations offered on the renewal page: plans.renewal.durations once the owner gives them; until then the
 * durations and prices of the plan list (PLANS §3.5). Prices stay null while they are null.
 */
export function renewalOptions(facts: Facts = FACTS): RenewalOption[] {
  return facts.plans.renewal.durations ?? facts.plans.list.map((p) => ({ months: p.months, price: p.price }))
}

/**
 * What happens at the end of the paid duration, as a lowercase clause after a colon
 * (« À la fin de la durée payée : … »); null while plans.autoRenew is null.
 */
export function endOfTerm(): string | null {
  const auto = FACTS.plans.autoRenew
  if (auto == null) return null
  return auto
    ? 'l’abonnement se renouvelle automatiquement pour la même durée'
    : 'l’abonnement s’arrête de lui-même, sans prélèvement automatique'
}

/** WhatsApp link (wa.me) with an optional prefilled message; null while the number is null. */
export function whatsappHref(message?: string, number: string | null = FACTS.support.whatsapp): string | null {
  if (!number) return null
  const digits = number.replace(/\D/g, '')
  if (!digits) return null
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}

/** mailto: link; null while the address is null. */
export function mailtoHref(address: string | null | undefined): string | null {
  return address ? `mailto:${address}` : null
}

/** tel: link; null while the number is null. */
export function telHref(phone: string | null | undefined): string | null {
  if (!phone) return null
  const dial = phone.replace(/[^\d+]/g, '')
  return dial ? `tel:${dial}` : null
}

// ── Order hand-off (APPROVAL §2e, QA LT-01) ──────────────────────────────────────────────────────────────────
//
// In the modes paymentLinks, externalShop and hostedPage, the submit of /commande/ first sends the order and its
// reference to the form service (contact.formEndpoint), then shows the reference and the button that opens the
// hand-off address of that order: the payment link of the line, the shop, or the payment page. Nothing opens by
// itself (lead, APPROVAL §2e HC-04). These helpers find that address, fill it and check it. None of them can know
// whether a payment went through, and nothing here says so.

/** The placeholders a hand-off address may hold; handoffFor() fills them, URL-encoded. */
export const HANDOFF_PLACEHOLDERS = ['plan', 'months', 'amount', 'ref', 'email'] as const

export type HandoffPlaceholder = (typeof HANDOFF_PLACEHOLDERS)[number]

/** The payment page needs one of these, to know the order or what is bought (APPROVAL §2e). */
const HOSTED_NEEDS: readonly HandoffPlaceholder[] = ['ref', 'plan']

const PLACEHOLDER = /\{([^{}]*)\}/g

function isPlaceholder(name: string): name is HandoffPlaceholder {
  return (HANDOFF_PLACEHOLDERS as readonly string[]).includes(name)
}

/** The address with each known placeholder replaced by its value, URL-encoded (encodeURIComponent). */
function fillPlaceholders(template: string, values: Readonly<Record<HandoffPlaceholder, string>>): string {
  return template.replace(PLACEHOLDER, (match, name: string) => (isPlaceholder(name) ? encodeURIComponent(values[name]) : match))
}

/** An absolute https address on a public-looking host (« paiement.exemple.fr », not « paiement »), with no space. */
function isHttpsUrl(text: string): boolean {
  if (/\s/.test(text)) return false
  try {
    const url = new URL(text)
    return url.protocol === 'https:' && /^[^.]+(\.[^.]+)+$/.test(url.hostname)
  } catch {
    return false
  }
}

/** Values that show whether a template still reads as an address once it is filled. */
const SAMPLE_VALUES: Readonly<Record<HandoffPlaceholder, string>> = {
  plan: 'p12',
  months: '12',
  amount: '69.90',
  ref: 'K7RX-9AHW',
  email: 'nom@exemple.fr',
}

/**
 * What is wrong with a hand-off address, as a French clause for launch-check (« l’adresse doit commencer par
 * https:// »), or null when the site can use it: a text that starts with https://, whose placeholders are all
 * HANDOFF_PLACEHOLDERS and that still reads as an address once they are filled. `needs`: one of these placeholders
 * must be there (the payment page: {ref} or {plan}).
 */
export function handoffProblem(address: unknown, needs: readonly HandoffPlaceholder[] = []): string | null {
  if (typeof address !== 'string') return 'l’adresse doit être écrite entre guillemets'
  const text = address.trim()
  if (text === '') return 'l’adresse est vide'
  if (!/^https:\/\//i.test(text)) return 'l’adresse doit commencer par https://'
  const names = [...text.matchAll(PLACEHOLDER)].map((match) => match[1])
  const unknown = names.find((name) => !isPlaceholder(name))
  if (unknown != null) return `{${unknown}} n’est pas un repère connu (repères : {plan}, {months}, {amount}, {ref}, {email})`
  if (/[{}]/.test(text.replace(PLACEHOLDER, ''))) return 'une accolade { ou } est seule'
  if (needs.length > 0 && !needs.some((name) => names.includes(name))) {
    return `l’adresse doit contenir ${needs.map((name) => `{${name}}`).join(' ou ')}`
  }
  if (!isHttpsUrl(fillPlaceholders(text, SAMPLE_VALUES))) return 'l’adresse n’est pas valide'
  return null
}

/**
 * What is wrong with the address of the form service (contact.formEndpoint), as a French clause for launch-check,
 * or null when the forms can send to it: an absolute https address on a dotted host, as a hand-off address (QA
 * HC-06). The forms and, in a link mode, the order page post to it from the https site: an http address is blocked
 * there (mixed content) and one without https:// is read as a page of the site itself, so every send would fail. A
 * service on the site's own domain is written in full too (https://exemple.fr/…). The site fills no marker in it.
 */
export function formEndpointProblem(address: unknown): string | null {
  if (typeof address !== 'string') return 'l’adresse doit être écrite entre guillemets'
  const text = address.trim()
  if (text === '') return 'l’adresse est vide'
  if (!/^https:\/\//i.test(text)) return 'l’adresse doit commencer par https://'
  if (/[{}]/.test(text)) return 'l’adresse ne doit pas contenir d’accolades { } (le site n’y remplace aucun repère)'
  if (!isHttpsUrl(text)) return 'l’adresse n’est pas valide'
  return null
}

/**
 * The screen options the published site sells, read as the plan pages read plans.screens.options (launch mode):
 * every option with a price for each plan, or the priced ones while two or more are left. null: one screen count.
 */
function soldScreenOptions(facts: Facts): ScreenOption[] | null {
  const options = facts.plans.screens.options
  if (!present(options)) return null
  const priced = options.filter((option) => facts.plans.list.every((plan) => option.prices?.[plan.id] != null))
  return priced.length === options.length || priced.length >= 2 ? priced : null
}

/** The key of a variant's own address: a renewal's months, a plan's screen count while screen options are sold. */
function variantKey(item: HandoffItem, line: HandoffLine, facts: Facts): number | null {
  if (item === 'renewal') return line.months ?? null
  if (item === 'resellerPack') return null
  return soldScreenOptions(facts) ? (line.screens ?? null) : null
}

/** The address of one variant: a single address serves every variant; a per-variant one, only the variants it lists. */
function pickVariant(address: unknown, key: number | null): string | null {
  if (typeof address === 'string') return address
  if (address == null || typeof address !== 'object' || key == null) return null
  const own: unknown = (address as Record<number, unknown>)[key]
  return typeof own === 'string' ? own : null
}

/**
 * The address checkout.mode hands this line over to, still a template, once it is usable (no handoffProblem()):
 * the payment link of the item (paymentLinks), its shop page or else the shop (externalShop), the payment page
 * (hostedPage). null in the message mode, while the mode is unknown, and when no usable address exists.
 */
function handoffTemplate(item: HandoffItem, line: HandoffLine, facts: Facts): string | null {
  const checkout = facts.checkout
  if (!checkout) return null
  let candidates: unknown[]
  let needs: readonly HandoffPlaceholder[] = []
  switch (checkout.mode) {
    case 'paymentLinks':
      candidates = [checkout.paymentLinks?.[item]]
      break
    case 'externalShop':
      candidates = [checkout.shopLinks?.[item], checkout.shopUrl]
      break
    case 'hostedPage':
      candidates = [checkout.hostedUrl]
      needs = HOSTED_NEEDS
      break
    default:
      return null
  }
  const key = variantKey(item, line, facts)
  for (const candidate of candidates) {
    const address = pickVariant(candidate, key)
    if (address != null && handoffProblem(address, needs) == null) return address.trim()
  }
  return null
}

/**
 * A usable hand-off address exists for this line in the chosen mode (paymentLinks, externalShop, hostedPage): the
 * submit of /commande/ may then read « Payer ma commande » (« Continuer vers le paiement » for a shop) and hand the
 * order over (APPROVAL §2e). Pass the line's months (a renewal) and its screen count (a plan sold with screen
 * options). Always false in the message mode, which hands the order over on WhatsApp, and while the mode is unknown.
 */
export function hasHandoff(item: HandoffItem, line: HandoffLine = {}, facts: Facts = FACTS): boolean {
  return handoffTemplate(item, line, facts) != null
}

/**
 * What the hand-off button opens once the order has reached the form service, or null: the line's hand-off
 * address in the chosen mode, its placeholders filled for this order and URL-encoded ({plan} the item, {months},
 * {amount} with a dot and two decimals, {ref}, {email}). null when hasHandoff() is false, without a reference, and
 * when the address holds {amount} while the amount is unknown. It is only where to pay: never a payment result.
 */
export function handoffFor(item: HandoffItem, order: HandoffOrder, facts: Facts = FACTS): string | null {
  const template = handoffTemplate(item, order, facts)
  const ref = typeof order.ref === 'string' ? order.ref.trim() : ''
  if (template == null || ref === '') return null
  const amount = typeof order.amount === 'number' && Number.isFinite(order.amount) && order.amount > 0 ? order.amount : null
  if (amount == null && template.includes('{amount}')) return null
  const url = fillPlaceholders(template, {
    plan: item,
    months: typeof order.months === 'number' && Number.isFinite(order.months) ? String(order.months) : '',
    amount: amount != null ? amount.toFixed(2) : '',
    ref,
    email: typeof order.email === 'string' ? order.email.trim() : '',
  })
  return isHttpsUrl(url) ? url : null
}

/**
 * The characters of an order reference: four figures and eight capitals that cannot be taken for another character
 * on a screen, nor misheard when read aloud in French. Left out for their shape: 0 O Q D, 1 I L, 2 Z, 5 S, 6 G, 8 B,
 * U V; for their sound: B C D G P T V (« bé », « cé », « dé »…), M N, F S, and E (heard as « deux »).
 */
const REF_ALPHABET = '3479AHJKRWXY'
const REF_PATTERN = /^[3479AHJKRWXY]{4}-[3479AHJKRWXY]{4}$/

/** `n` random bytes, from the browser's or Node's crypto. */
function randomBytes(n: number): Uint8Array {
  const bytes = new Uint8Array(n)
  const source = globalThis.crypto
  if (source && typeof source.getRandomValues === 'function') return source.getRandomValues(bytes)
  for (let i = 0; i < n; i += 1) bytes[i] = Math.floor(Math.random() * 256)
  return bytes
}

/**
 * A new order reference, short and easy to read over the phone: two groups of four characters of REF_ALPHABET,
 * « K7RX-9AHW » (12⁸, about 430 million). It ties a payment to its order: it goes to the form service with the
 * order, into the hand-off address ({ref}) and onto the hand-off step. Make one per order, and keep it while the
 * buyer retries the same order. It is random, not a counter: among 1,000 orders the chance that two share one is
 * about 0.1%, harmless since an order is also known by its name, e-mail, amount and date.
 */
export function orderReference(): string {
  const size = REF_ALPHABET.length
  const limit = 256 - (256 % size) // bytes past the last full round are dropped, so every character is as likely
  let chars = ''
  while (chars.length < 8) {
    for (const byte of randomBytes(16)) {
      if (byte < limit && chars.length < 8) chars += REF_ALPHABET[byte % size]
    }
  }
  return `${chars.slice(0, 4)}-${chars.slice(4)}`
}

/** The text is an order reference as orderReference() writes it (surrounding spaces and lower case are accepted). */
export function isOrderReference(text: string | null | undefined): boolean {
  return typeof text === 'string' && REF_PATTERN.test(text.trim().toUpperCase())
}

/**
 * The tools of cookies.tools that need the visitor's consent: the consent banner shows while there is one, and each
 * of them runs only through the consent gate (APPROVAL §2e, brand kit). A tool counts unless its consent is false:
 * in doubt, ask. [] while there is none, which is today: no banner.
 */
export function consentTools(facts: Facts = FACTS): CookieTool[] {
  const tools = facts.cookies?.tools
  return Array.isArray(tools) ? tools.filter((tool) => tool != null && tool.consent !== false) : []
}

/**
 * A video file the browser plays itself (.mp4, .webm, .ogg), as the home page reads media.demoVideo.url; any other
 * address is the player page of a video host, embedded, which sets its own cookies (QA HC-03).
 */
export function isVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?|#|$)/i.test(url)
}

// ── Launch policy (APPROVAL §2c): required and optional facts ────────────────────────────────────────────────
//
// Required = the site cannot go live without it: the « Must » facts of .team/structure/FACTS-NEEDED.md (core offer,
// prices, contact, how to order, legal identity, legally required terms), with the adjustments explained in
// .team/copy/FACTS.md (« Launch policy »). In launch mode a missing required fact keeps its marker and
// `npm run launch-check` fails; a missing optional fact is simply not rendered. Every other fact is optional.

/** One required fact, as the owner reads it in `npm run launch-check`. */
export type RequiredFact = {
  /**
   * FACTS path. `plans.<id>.price` is one fact per plan of plans.list (missingRequired() expands it); a conditional
   * fact names the answer it is about (`checkout.paymentLinks.p12`, `checkout.paymentLinks.renewal.6`, `cookies.tools.0`).
   */
  key: string
  /** Heading of the group it is answered with. */
  group: string
  /** What to provide, in French. */
  label: string
  /** Where it shows on the site, in French. */
  where: string
}

const G_OFFER = 'Votre offre'
const G_ORDER = 'Commande et paiement'
const G_CONTACT = 'Contact'
const G_COMPANY = 'Votre entreprise et votre site'
const G_RIGHTS = 'Droits des clients'
const G_PRIVACY = 'Données personnelles'
const W_LEGAL = 'mentions légales, conditions de vente'

/** The required facts, in the order the owner should answer them (the order of facts.data.ts). */
export const REQUIRED_FACTS: readonly RequiredFact[] = [
  { key: 'plans.list', group: G_OFFER, label: 'Durées vendues et formule conseillée, à confirmer', where: 'cartes des formules, fiches formule, renouvellement, conditions de vente' },
  { key: 'plans.<id>.price', group: G_OFFER, label: 'Prix total de chaque formule, en euros', where: 'cartes, fiches formule, panier, commande, conditions de vente' },
  { key: 'plans.features.included', group: G_OFFER, label: 'Ce que comprend chaque formule, en quelques mots', where: 'fiches formule, conditions de vente' },
  { key: 'plans.screens.count', group: G_OFFER, label: 'Nombre d’écrans en même temps', where: 'cartes des formules, questions, conditions de vente' },
  { key: 'plans.autoRenew', group: G_OFFER, label: 'Paiement en une fois ou renouvellement automatique', where: 'accueil, fiches formule, questions, conditions de vente' },
  { key: 'pricing.vat', group: G_OFFER, label: 'Mention de TVA : « TTC » ou votre mention d’exonération', where: 'sous les prix, panier, commande, conditions de vente' },
  { key: 'devices.supported', group: G_OFFER, label: 'Appareils compatibles, par famille, avec marques ou systèmes', where: 'accueil, page Applications, aide, commande, conditions de vente' },

  { key: 'checkout.mode', group: G_ORDER, label: 'Façon dont une commande est finalisée et payée', where: 'boutons d’achat, page de commande, aide, conditions de vente' },
  { key: 'payment.methods', group: G_ORDER, label: 'Moyens de paiement acceptés', where: 'sous les formules, commande, aide, conditions de vente, pied de page' },
  { key: 'delivery.delay', group: G_ORDER, label: 'Délai entre le paiement et l’envoi des accès', where: 'accueil, formules, questions, confirmation de commande, conditions de vente' },
  { key: 'delivery.channel', group: G_ORDER, label: 'Canal d’envoi des accès : e-mail, WhatsApp, SMS', where: 'étapes, questions, commande, conditions de vente, confidentialité' },

  { key: 'support.whatsapp', group: G_CONTACT, label: 'Numéro WhatsApp, au format international', where: 'boutons WhatsApp de tout le site, contact, pied de page' },
  { key: 'support.email', group: G_CONTACT, label: 'Adresse e-mail du support', where: 'contact, aide, pied de page, conditions de vente, remboursement' },
  { key: 'support.hours', group: G_CONTACT, label: 'Jours et horaires de réponse', where: 'accueil, formules, aide, contact, menu, pied de page' },
  { key: 'contact.formEndpoint', group: G_CONTACT, label: 'Adresse du service qui reçoit les messages des formulaires', where: 'formulaires de contact, de question et revendeur' },

  { key: 'site.domain', group: G_COMPANY, label: 'Nom de domaine du site', where: 'pied de page, adresses des pages, plan du site' },
  { key: 'company.legalName', group: G_COMPANY, label: 'Dénomination sociale, ou votre nom en entreprise individuelle', where: 'pages légales, contact, pied de page' },
  { key: 'company.form', group: G_COMPANY, label: 'Forme juridique', where: W_LEGAL },
  { key: 'company.capital', group: G_COMPANY, label: 'Capital social (sociétés seulement)', where: 'mentions légales' },
  { key: 'company.address', group: G_COMPANY, label: 'Adresse du siège', where: 'pages légales, contact' },
  { key: 'company.rcs', group: G_COMPANY, label: 'Ville et numéro d’immatriculation', where: W_LEGAL },
  { key: 'company.siret', group: G_COMPANY, label: 'Numéro SIREN ou SIRET', where: W_LEGAL },
  { key: 'company.vatNumber', group: G_COMPANY, label: 'Numéro de TVA intracommunautaire, ou mention d’exonération', where: W_LEGAL },
  { key: 'company.phone', group: G_COMPANY, label: 'Téléphone de l’entreprise, non surtaxé', where: W_LEGAL },
  { key: 'company.email', group: G_COMPANY, label: 'Adresse e-mail de l’entreprise', where: 'mentions légales, conditions de vente, formulaire de rétractation' },
  { key: 'company.director', group: G_COMPANY, label: 'Nom de la personne qui dirige la publication', where: 'mentions légales' },
  { key: 'host.name', group: G_COMPANY, label: 'Nom de l’hébergeur du site', where: 'mentions légales, confidentialité' },
  { key: 'host.address', group: G_COMPANY, label: 'Adresse de l’hébergeur', where: 'mentions légales' },
  { key: 'host.phone', group: G_COMPANY, label: 'Téléphone de l’hébergeur', where: 'mentions légales' },

  { key: 'withdrawal.terms', group: G_RIGHTS, label: 'Rétractation : ce qui se passe sans demande de démarrage immédiat', where: 'commande, conditions de vente, remboursement, aide' },
  { key: 'refund.terms.summary', group: G_RIGHTS, label: 'Conditions de remboursement, en une phrase', where: 'fiches formule, questions, commande, conditions de vente' },
  { key: 'refund.terms.cases', group: G_RIGHTS, label: 'Cas dans lesquels vous remboursez', where: 'politique de remboursement' },
  { key: 'refund.terms.payback', group: G_RIGHTS, label: 'Délai et moyen de remboursement', where: 'politique de remboursement' },
  { key: 'cancellation.path', group: G_RIGHTS, label: 'Emplacement de « Résilier mon abonnement » : une page ou un formulaire', where: 'pied de page, conditions de vente' },
  { key: 'cancellation.terms', group: G_RIGHTS, label: 'Ce qui se passe en cas d’arrêt avant la fin', where: 'conditions de vente' },
  { key: 'consumer.mediator.name', group: G_RIGHTS, label: 'Nom du médiateur de la consommation', where: W_LEGAL },
  { key: 'consumer.mediator.website', group: G_RIGHTS, label: 'Site du médiateur', where: W_LEGAL },
  { key: 'consumer.mediator.address', group: G_RIGHTS, label: 'Adresse du médiateur', where: W_LEGAL },

  { key: 'privacy.dpoContact', group: G_PRIVACY, label: 'Contact pour les demandes sur les données personnelles', where: 'confidentialité, pages légales, formulaires, aide' },
  { key: 'privacy.processors.list', group: G_PRIVACY, label: 'Prestataires qui reçoivent des données : nom, rôle, pays', where: 'confidentialité' },
  { key: 'privacy.processors.transfers', group: G_PRIVACY, label: 'Transferts hors de l’Union européenne et leur garantie, ou « aucun »', where: 'confidentialité' },
  { key: 'privacy.serviceData', group: G_PRIVACY, label: 'Données techniques enregistrées quand un client regarde', where: 'confidentialité' },
  { key: 'privacy.retention.orders', group: G_PRIVACY, label: 'Durée de conservation : commandes et envoi des accès', where: 'confidentialité' },
  { key: 'privacy.retention.service', group: G_PRIVACY, label: 'Durée de conservation : données techniques du service', where: 'confidentialité' },
  { key: 'privacy.retention.messages', group: G_PRIVACY, label: 'Durée de conservation : messages et échanges', where: 'confidentialité' },
  { key: 'privacy.retention.accounting', group: G_PRIVACY, label: 'Durée de conservation : pièces comptables', where: 'confidentialité' },
  { key: 'privacy.retention.logs', group: G_PRIVACY, label: 'Durée de conservation : journaux techniques du site', where: 'confidentialité' },
]

/**
 * The optional facts: every other owner fact. While one is missing, launch mode renders nothing in its place.
 * `plans.<id>.referencePrice` is one fact per plan. Listed so that a fact added to FACTS cannot stay unclassified
 * (unclassifiedFacts()).
 */
export const OPTIONAL_FACTS: readonly string[] = [
  'plans.<id>.referencePrice', 'plans.features.differences', 'plans.screens.options',
  'plans.renewal.identifier', 'plans.renewal.carryOver', 'plans.renewal.durations', 'plans.upgrade', 'plans.start',
  'pricing.currency', 'checkout.fields', 'checkout.macAddress', 'payment.provider', 'promo.codes', 'invoice.delivery',
  'trial.offered', 'trial.terms.duration', 'trial.terms.price', 'trial.terms.how', 'trial.terms.limits', 'trial.terms.mode',
  'channels.live.count', 'channels.regions', 'content.categories', 'content.licensing',
  'vod.count', 'vod.updates', 'vod.genres', 'vod.languages', 'sport.disciplines', 'quality.levels',
  'catchup.days', 'epg.available', 'radio.available', 'internet.minSpeed',
  'delivery.credentialTypes', 'delivery.resend', 'apps.own', 'apps.thirdParty', 'guides.devices',
  'usage.sharing', 'usage.abroad',
  'support.phone', 'support.responseTime', 'support.languages', 'support.topics', 'support.team',
  'community.channel', 'account.portal', 'social.accounts',
  'reseller.offered', 'reseller.entryPack.credits', 'reseller.entryPack.price', 'reseller.entryPack.includes',
  'reseller.entryPack.condition', 'reseller.creditCosts', 'reseller.creditExpiry', 'reseller.trialAccounts',
  'reseller.panel', 'reseller.rules.channels', 'reseller.rules.pricing', 'reseller.rules.support', 'reseller.contact',
  'proof.rating', 'proof.customers', 'proof.countries', 'proof.reviews', 'proof.uptime', 'proof.recommendRate',
  'proof.history', 'media.appScreens', 'media.demoVideo',
  'legal.lastUpdated.cgv', 'legal.lastUpdated.cgu', 'legal.lastUpdated.privacy', 'legal.lastUpdated.refund',
  'privacy.security', 'cookies.tools', 'refund.schedule', 'shop.physicalDevices',
]

/**
 * An answer that asks for a part the site does not have yet. `npm run launch-check` stops on it, as on a missing
 * required fact, until that part is built or the answer changes (QA LT-16).
 */
export type UnsupportedAnswer = {
  /** FACTS path. */
  key: string
  /** The answer, as written in facts.data.ts. */
  answer: string
  /** What the answer says, in French. */
  label: string
  /** What the site lacks for it and what to do, in French. */
  why: string
  /** True when `facts` holds this answer. */
  test: (facts: Facts) => boolean
}

/** The answers the site cannot publish yet. A part built for one of them removes its entry here. */
export const UNSUPPORTED_ANSWERS: readonly UnsupportedAnswer[] = [
  {
    key: 'shop.physicalDevices',
    answer: 'true',
    label: 'Vente et livraison d’appareils',
    why:
      'Le site vend des abonnements, pas d’appareils : il n’a ni page d’appareil ni livraison, et ses conditions de vente ' +
      'n’ont pas de clause pour la vente de biens (livraison, frais, retours, garanties). Pour publier, laissez null ou ' +
      'écrivez false. Pour vendre des appareils, demandez d’abord cette partie à l’équipe.',
    test: (facts) => facts.shop?.physicalDevices === true,
  },
]

/** The answers of `facts` that the site cannot publish yet (UNSUPPORTED_ANSWERS); launch-check fails while one is there. */
export function unsupportedAnswers(facts: Facts = FACTS): UnsupportedAnswer[] {
  return UNSUPPORTED_ANSWERS.filter((entry) => entry.test(facts))
}

/** A fact required only with some answers (CONDITIONAL_FACTS). */
export type ConditionalFact = RequiredFact & {
  /** When the answers make it required, in French (owner sheets). */
  when: string
  /** True when `facts` make it required. */
  applies: (facts: Facts) => boolean
}

const W_PAY = 'bouton « Payer ma commande » de la page de commande'
const W_SHOP = 'bouton « Continuer vers le paiement » de la page de commande'
const W_PACK = 'bouton « Commander mon pack » de la page Revendeur'
const W_COOKIES = 'bandeau des cookies, page Confidentialité'
const W_VIDEO = 'vidéo de présentation de l’accueil'

/** media.demoVideo is the player page of a video host (not a file the browser plays itself). */
function embeddedVideo(facts: Facts): boolean {
  const url: unknown = facts.media?.demoVideo?.url
  return typeof url === 'string' && url.trim() !== '' && !isVideoFile(url)
}

/**
 * Facts required only with some answers (APPROVAL §2e): the hand-off addresses of the chosen checkout.mode (QA
 * LT-01), the four fields of each cookies.tools entry (QA LT-04) and the tool of a demo video played from a video
 * host (QA HC-03). missingRequired() checks them in answer order (the hand-off right after checkout.mode, the tools
 * and the video's tool after the privacy facts), every address as https; isRequired() counts one only while it
 * applies. They are not in REQUIRED_FACTS, which lists what is required whatever the answers (the copy tools and the
 * owner sheets read it so).
 */
export const CONDITIONAL_FACTS: readonly ConditionalFact[] = [
  {
    key: 'checkout.paymentLinks',
    group: G_ORDER,
    label: 'Liens de paiement : un par formule, et pour le renouvellement',
    where: W_PAY,
    when: 'checkout.mode = paymentLinks',
    applies: (facts) => facts.checkout?.mode === 'paymentLinks',
  },
  {
    key: 'checkout.shopUrl',
    group: G_ORDER,
    label: 'Adresse de votre boutique en ligne, ou la page de chaque article (shopLinks)',
    where: W_SHOP,
    when: 'checkout.mode = externalShop',
    applies: (facts) => facts.checkout?.mode === 'externalShop',
  },
  {
    key: 'checkout.shopLinks',
    group: G_ORDER,
    label: 'Page de la boutique pour chaque formule et pour le renouvellement',
    where: W_SHOP,
    when: 'checkout.mode = externalShop, sans checkout.shopUrl',
    applies: (facts) => facts.checkout?.mode === 'externalShop' && !answered(facts.checkout?.shopUrl),
  },
  {
    key: 'checkout.hostedUrl',
    group: G_ORDER,
    label: 'Adresse de votre page de paiement, avec {ref} ou {plan}',
    where: W_PAY,
    when: 'checkout.mode = hostedPage',
    applies: (facts) => facts.checkout?.mode === 'hostedPage',
  },
  {
    key: 'cookies.tools',
    group: G_PRIVACY,
    label: 'Pour chaque outil de la liste des cookies : son nom, à quoi il sert, la durée de ses cookies, accord demandé ou non',
    where: W_COOKIES,
    when: 'au moins un outil dans cookies.tools',
    applies: (facts) => {
      const tools: unknown = facts.cookies?.tools
      return Array.isArray(tools) && tools.length > 0
    },
  },
  {
    key: 'media.demoVideo.tool',
    group: G_PRIVACY,
    label: 'Outil du lecteur de la vidéo de présentation, nommé comme dans la liste des cookies',
    where: W_VIDEO,
    when: 'media.demoVideo avec l’adresse d’un lecteur intégré (pas un fichier .mp4, .webm ou .ogg)',
    applies: embeddedVideo,
  },
]

/** One required answer, and whether `facts` give it in a form the site can use. */
type Slot = { fact: RequiredFact; ok: boolean }

/** A variant of an item on sale: the key of its own address (null: the item has one variant) and its price. */
type Variant = { key: number | null; price: number | null }

/** « la formule 12 mois », « le renouvellement », « le pack de départ revendeur ». */
function itemName(item: HandoffItem, facts: Facts): string {
  if (item === 'renewal') return 'le renouvellement'
  if (item === 'resellerPack') return 'le pack de départ revendeur'
  const plan = facts.plans.list.find((p) => p.id === item)
  return plan ? `la ${planName(plan.months).toLowerCase()}` : `« ${item} »`
}

/** « de la formule 12 mois », « du renouvellement ». */
function ofItem(item: HandoffItem, facts: Facts): string {
  const name = itemName(item, facts)
  return name.startsWith('le ') ? `du ${name.slice(3)}` : `de ${name}`
}

/**
 * The variants of an item the published site sells, each with its price: a renewal per duration (the renewal page's
 * durations, as build-a's renewal page reads them in launch mode), a plan per screen count while screen options are
 * sold, else one variant.
 */
function variantsOf(item: HandoffItem, facts: Facts): Variant[] {
  if (item === 'renewal') {
    const own = facts.plans.renewal.durations
    const priced = present(own) ? own.filter((option) => option.price != null) : []
    const list = priced.length > 0 ? priced : facts.plans.list.map((plan) => ({ months: plan.months, price: plan.price }))
    return list.map((option) => ({ key: option.months, price: option.price }))
  }
  if (item === 'resellerPack') return [{ key: null, price: facts.reseller?.entryPack?.price ?? null }]
  const plan = facts.plans.list.find((p) => p.id === item)
  if (!plan) return []
  const options = soldScreenOptions(facts)
  return options ? options.map((option) => ({ key: option.screens, price: option.prices?.[plan.id] ?? null })) : [{ key: null, price: plan.price }]
}

/** « 6 mois », « 2 écrans ». */
function variantText(item: HandoffItem, key: number): string {
  return item === 'renewal' ? `${key} mois` : `${key} ${key > 1 ? 'écrans' : 'écran'}`
}

/** « 3, 6, 12 et 24 mois », « 1, 2 et 3 écrans ». */
function variantsText(item: HandoffItem, variants: Variant[]): string {
  const keys = variants.flatMap((variant) => (variant.key == null ? [] : [String(variant.key)]))
  return `${formatList(keys) ?? ''} ${item === 'renewal' ? 'mois' : 'écrans'}`
}

/** The variants sell at more than one price, or at prices not known yet: one fixed link cannot serve them all. */
function severalPrices(variants: Variant[]): boolean {
  if (variants.length < 2) return false
  const prices = variants.map((variant) => variant.price)
  return prices.some((price) => price == null) || new Set(prices).size > 1
}

const blank = (value: unknown) => value == null || (typeof value === 'string' && value.trim() === '')

/**
 * The answers one item of checkout.paymentLinks or checkout.shopLinks calls for: one per variant when its address
 * is given per variant, else one. `required`: a missing address counts (a plan, the renewals; never the pack, which
 * resellers then ask for with the form of their page). A payment link stands for one price, so a single link for
 * variants sold at several prices must hold {amount} (a renewal link: or {months}).
 */
function itemSlots(kind: 'paymentLinks' | 'shopLinks', item: HandoffItem, value: unknown, required: boolean, facts: Facts): Slot[] {
  const path = `checkout.${kind}.${item}`
  const link = kind === 'paymentLinks'
  const base = link ? `Lien de paiement ${ofItem(item, facts)}` : `Page de la boutique pour ${itemName(item, facts)}`
  const where = !link ? W_SHOP : item === 'resellerPack' ? W_PACK : W_PAY
  const slot = (key: string, label: string, ok: boolean): Slot => ({ fact: { key, group: G_ORDER, label, where }, ok })
  const variants = variantsOf(item, facts)
  const perVariant = variants.some((variant) => variant.key != null)
  const unit = item === 'renewal' ? 'durée' : 'nombre d’écrans'
  const fixedPrice = link && perVariant && severalPrices(variants)
  if (blank(value)) {
    if (!required) return []
    const label = fixedPrice ? `Liens de paiement ${ofItem(item, facts)}, un par ${unit} : ${variantsText(item, variants)}` : base
    return [slot(path, label, false)]
  }
  if (typeof value === 'string') {
    const problem = handoffProblem(value)
    if (problem) return [slot(path, `${base}, à corriger : ${problem}`, false)]
    if (fixedPrice && !value.includes('{amount}') && !(item === 'renewal' && value.includes('{months}'))) {
      const label = `${base}, à corriger : un seul lien pour ${variantsText(item, variants)}, à des prix différents ; donnez un lien par ${unit}, ou ajoutez {amount} à l’adresse`
      return [slot(path, label, false)]
    }
    return [slot(path, base, true)]
  }
  if (typeof value !== 'object' || Array.isArray(value)) return [slot(path, `${base}, à corriger : l’adresse doit être écrite entre guillemets`, false)]
  if (!perVariant) return [slot(path, `${base}, à corriger : une seule adresse suffit ici, entre guillemets`, false)]
  const own = value as Record<string, unknown>
  const keys = variants.flatMap((variant) => (variant.key == null ? [] : [variant.key]))
  const slots: Slot[] = []
  for (const key of keys) {
    const label = item === 'renewal' ? `${base} ${variantText(item, key)}` : `${base}, ${variantText(item, key)}`
    const address = own[String(key)]
    if (blank(address)) {
      if (required) slots.push(slot(`${path}.${key}`, label, false))
      continue
    }
    const problem = handoffProblem(address)
    slots.push(slot(`${path}.${key}`, problem ? `${label}, à corriger : ${problem}` : label, problem == null))
  }
  for (const extra of Object.keys(own)) {
    if (keys.some((key) => String(key) === extra)) continue
    const none = item === 'renewal' ? 'aucune durée en vente' : 'aucun nombre d’écrans en vente'
    slots.push(slot(`${path}.${extra}`, `${base}, à corriger : ${extra} ne correspond à ${none} (${variantsText(item, variants)})`, false))
  }
  return slots
}

/** The answers of a whole checkout.paymentLinks or checkout.shopLinks: each item, then any name that is no item. */
function linksSlots(kind: 'paymentLinks' | 'shopLinks', links: unknown, items: HandoffItem[], required: (item: HandoffItem) => boolean, facts: Facts): Slot[] {
  const link = kind === 'paymentLinks'
  const where = link ? W_PAY : W_SHOP
  if (links != null && (typeof links !== 'object' || Array.isArray(links))) {
    const label = `${link ? 'Liens de paiement' : 'Pages de la boutique'}, à corriger : écrivez-les entre accolades, un article par ligne : { p3: 'https://…', renewal: 'https://…' }`
    return [{ fact: { key: `checkout.${kind}`, group: G_ORDER, label, where }, ok: false }]
  }
  const map = (links ?? {}) as Record<string, unknown>
  const slots = items.flatMap((item) => itemSlots(kind, item, map[item], required(item), facts))
  for (const name of Object.keys(map)) {
    if ((items as readonly string[]).includes(name)) continue
    const label = `${link ? 'Lien de paiement' : 'Page de la boutique'} « ${name} », à corriger : ce nom ne correspond à rien de ce que vous vendez (${items.join(', ')})`
    slots.push({ fact: { key: `checkout.${kind}.${name}`, group: G_ORDER, label, where }, ok: false })
  }
  return slots
}

/**
 * The hand-off answers the chosen checkout.mode calls for (APPROVAL §2e, QA LT-01): every plan of the lineup and the
 * renewals need a payment link (paymentLinks); the shop needs one address, or a page per item (externalShop); the
 * payment page needs its address with {ref} or {plan} (hostedPage). The message mode needs nothing more. A value
 * the site cannot use (not https, an unknown placeholder, a name that is no item) counts as missing, « à corriger ».
 */
function handoffSlots(facts: Facts): Slot[] {
  const checkout = facts.checkout
  const mode: unknown = checkout?.mode
  if (!checkout || mode == null || mode === '' || mode === 'message') return []
  const items: HandoffItem[] = [...facts.plans.list.map((plan) => plan.id), 'renewal', 'resellerPack']
  const sold = (item: HandoffItem) => item !== 'resellerPack'
  const fact = (key: string, label: string, where: string): RequiredFact => ({ key, group: G_ORDER, label, where })
  switch (mode) {
    case 'paymentLinks':
      return linksSlots('paymentLinks', checkout.paymentLinks, items, sold, facts)
    case 'externalShop': {
      const url: unknown = checkout.shopUrl
      const links: unknown = checkout.shopLinks
      if (blank(url)) {
        if (blank(links)) {
          const label = 'Adresse de votre boutique en ligne : une pour toute la boutique (shopUrl), ou la page de chaque article (shopLinks)'
          return [{ fact: fact('checkout.shopUrl', label, W_SHOP), ok: false }]
        }
        return linksSlots('shopLinks', links, items, sold, facts)
      }
      const problem = handoffProblem(url)
      const label = problem ? `Adresse de votre boutique en ligne, à corriger : ${problem}` : 'Adresse de votre boutique en ligne'
      // With the shop's address, a page of shopLinks is optional; a page given must still be usable.
      return [{ fact: fact('checkout.shopUrl', label, W_SHOP), ok: problem == null }, ...linksSlots('shopLinks', links, items, () => false, facts)]
    }
    case 'hostedPage': {
      const url: unknown = checkout.hostedUrl
      if (blank(url)) return [{ fact: fact('checkout.hostedUrl', 'Adresse de votre page de paiement, avec {ref} ou {plan}', W_PAY), ok: false }]
      const problem = handoffProblem(url, HOSTED_NEEDS)
      const label = problem ? `Adresse de votre page de paiement, à corriger : ${problem}` : 'Adresse de votre page de paiement'
      return [{ fact: fact('checkout.hostedUrl', label, W_PAY), ok: problem == null }]
    }
    default: {
      const label = 'Façon dont une commande est finalisée et payée, à corriger : choisissez hostedPage, paymentLinks, message ou externalShop'
      return [{ fact: fact('checkout.mode', label, 'boutons d’achat, page de commande, aide, conditions de vente'), ok: false }]
    }
  }
}

/**
 * The answers cookies.tools calls for (QA LT-04): one per tool listed, which needs its name (one no other tool
 * has: the consent store keeps each choice under it), what it is for, how long its cookies last, and whether it
 * asks for consent (true or false).
 */
function cookieToolSlots(facts: Facts): Slot[] {
  const tools: unknown = facts.cookies?.tools
  if (tools == null || (Array.isArray(tools) && tools.length === 0)) return []
  const fact = (key: string, label: string): RequiredFact => ({ key, group: G_PRIVACY, label, where: W_COOKIES })
  if (!Array.isArray(tools)) {
    const label = 'Outils de la liste des cookies, à corriger : écrivez la liste entre crochets : [{ name: …, purpose: …, duration: …, consent: true }]'
    return [{ fact: fact('cookies.tools', label), ok: false }]
  }
  const seen = new Set<string>()
  return tools.map((tool: unknown, index: number) => {
    const entry = (tool != null && typeof tool === 'object' ? tool : {}) as Record<string, unknown>
    const text = (field: string) => {
      const value = entry[field]
      return typeof value === 'string' ? value.trim() : ''
    }
    const name = text('name')
    const lacks: string[] = []
    if (name === '') lacks.push('son nom')
    else if (seen.has(name.toLowerCase())) lacks.push('un nom qu’aucun autre outil ne porte')
    seen.add(name.toLowerCase())
    if (text('purpose') === '') lacks.push('à quoi il sert')
    if (text('duration') === '') lacks.push('la durée de ses cookies')
    if (typeof entry.consent !== 'boolean') lacks.push('s’il demande l’accord du visiteur (consent : true ou false)')
    const who = name ? `l’outil « ${name} »` : `l’outil n° ${index + 1}`
    return { fact: fact(`cookies.tools.${index}`, `Cookies et traceurs, ${who}${lacks.length > 0 ? ` : ${formatList(lacks)}` : ''}`), ok: lacks.length === 0 }
  })
}

/**
 * The answer media.demoVideo calls for (QA HC-03): the tool its player comes from, named exactly as in cookies.tools
 * (the consent gate and the home page look it up by that name), among the tools that ask for consent. Required when
 * the address is the player of a video host, which sets cookies: a tool mounts only through the consent gate
 * (APPROVAL §2e). A tool named for a video file is checked the same way.
 */
function videoToolSlots(facts: Facts): Slot[] {
  const video: unknown = facts.media?.demoVideo
  if (video == null || typeof video !== 'object') return []
  const tool: unknown = (video as { tool?: unknown }).tool
  const fact = (label: string): RequiredFact => ({ key: 'media.demoVideo.tool', group: G_PRIVACY, label, where: W_VIDEO })
  const base = 'Outil du lecteur de la vidéo de présentation'
  if (blank(tool)) return embeddedVideo(facts) ? [{ fact: fact(`${base}, nommé comme dans la liste des cookies`), ok: false }] : []
  const fix = (problem: string): Slot[] => [{ fact: fact(`${base}, à corriger : ${problem}`), ok: false }]
  if (typeof tool !== 'string') return fix('le nom doit être écrit entre guillemets')
  if (consentTools(facts).some((t) => t.name === tool)) return [{ fact: fact(base), ok: true }]
  const tools: unknown = facts.cookies?.tools
  const listed = (Array.isArray(tools) ? tools : []).filter((t): t is CookieTool => t != null && typeof t === 'object' && typeof t.name === 'string')
  if (listed.some((t) => t.name === tool)) {
    return fix(`l’outil « ${tool} » est noté consent : false ; un lecteur vidéo extérieur demande l’accord du visiteur (consent : true)`)
  }
  const near = listed.find((t) => t.name.trim().toLowerCase() === tool.trim().toLowerCase())
  if (near) return fix(`écrivez le nom exactement comme dans la liste des cookies : « ${near.name} »`)
  return fix(`aucun outil de la liste des cookies ne s’appelle « ${tool} » ; ajoutez-le à cookies.tools, avec consent : true`)
}

/** Not owner answers of their own: the plan structure (confirmed through plans.confirmed) and its derived fields. */
const STRUCTURAL_FACTS: readonly string[] = [
  'plans.confirmed', 'plans.featured', 'plans.renewal.slug', 'plans.<id>.id', 'plans.<id>.months', 'plans.<id>.slug',
]

const REQUIRED_KEYS: readonly string[] = REQUIRED_FACTS.map((fact) => fact.key)

/** Legal forms that have a share capital (a company); a sole trader has none. */
const COMPANY_FORM = /\b(SASU?|SARL|EURL|SA|SNC|SCS|SCA|SCI|SCOP|SELARL|SELASU?)\b/
const COMPANY_WORD = /soci[ée]t[ée]/i

/** « plans.p12.price » and « plans.<id>.price » are the same per-plan fact. */
function planKey(key: string): string {
  return key.replace(/^plans\.(?:p\d+|<id>)(?=\.|$)/, 'plans.<id>')
}

/**
 * Whether a fact is required (the site cannot go live without it). `key` is a FACTS path as the pages pass it to
 * <Pending fact>: « support.hours », « plans.p12.price ». A key under a required key is required
 * (« devices.supported.tv »), and so is a key that groups required facts (« consumer.mediator », « refund.terms »).
 * A conditional fact (CONDITIONAL_FACTS) is required while `facts` make it so: « checkout.paymentLinks.p12 » with
 * checkout.mode = paymentLinks. An unknown key is not required.
 */
export function isRequired(key: string, facts: Facts = FACTS): boolean {
  const k = planKey(key)
  if (k === '') return false
  const covers = (required: string) => k === required || k.startsWith(`${required}.`) || required.startsWith(`${k}.`)
  return REQUIRED_KEYS.some(covers) || CONDITIONAL_FACTS.some((fact) => covers(fact.key) && fact.applies(facts))
}

/** The value at a FACTS path (« support.hours », « plans.p12.price »); undefined when the path leads nowhere. */
export function factAt(key: string, facts: Facts = FACTS): unknown {
  let node: unknown = facts
  for (const part of key.split('.')) {
    if (node == null || typeof node !== 'object') return undefined
    node = (node as Record<string, unknown>)[part]
  }
  return node
}

/**
 * Answered by the owner: anything but null, undefined, '', [] and {}. Unlike present(), a « no » (false) is an
 * answer: plans.autoRenew = false is the answer « one-off payment ».
 */
export function answered(value: unknown): boolean {
  if (value == null) return false
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'string') return value.trim() !== ''
  if (typeof value === 'object') return Object.keys(value).length > 0
  return true
}

/**
 * « Capital social » applies: the legal form is a company, or is not known yet. A sole trader (EI,
 * micro-entreprise) has no share capital, so company.capital is then neither shown nor required.
 */
export function needsShareCapital(form: string | null = FACTS.company.form): boolean {
  return form == null || form.trim() === '' || COMPANY_FORM.test(form) || COMPANY_WORD.test(form)
}

/**
 * Every required answer `facts` call for, in answer order, with whether it is given: REQUIRED_FACTS with one price
 * per plan of the lineup and no share capital for a sole trader; the hand-off of checkout.mode right after the mode;
 * one answer per cookies.tools entry after the privacy facts, then the demo video's tool (CONDITIONAL_FACTS).
 */
function requiredSlots(facts: Facts): Slot[] {
  const slots: Slot[] = []
  for (const fact of REQUIRED_FACTS) {
    if (fact.key === 'plans.list') {
      slots.push({ fact, ok: facts.plans.confirmed && facts.plans.list.length > 0 })
    } else if (fact.key === 'plans.<id>.price') {
      for (const plan of facts.plans.list) {
        const label = `Prix total de la ${planName(plan.months).toLowerCase()}, en euros`
        slots.push({ fact: { ...fact, key: planFactKey(plan.id, 'price'), label }, ok: plan.price != null })
      }
    } else if (fact.key === 'company.capital') {
      if (needsShareCapital(facts.company.form)) slots.push({ fact, ok: answered(facts.company.capital) })
    } else if (fact.key === 'contact.formEndpoint') {
      // Given but unusable (QA HC-06): « à corriger » with what is wrong, as a hand-off address.
      const value = factAt(fact.key, facts)
      const problem = answered(value) ? formEndpointProblem(value) : null
      slots.push({ fact: problem ? { ...fact, label: `${fact.label}, à corriger : ${problem}` } : fact, ok: answered(value) && problem == null })
    } else {
      slots.push({ fact, ok: answered(factAt(fact.key, facts)) })
    }
    // facts.data.ts asks for the hand-off addresses with the mode.
    if (fact.key === 'checkout.mode') slots.push(...handoffSlots(facts))
  }
  slots.push(...cookieToolSlots(facts), ...videoToolSlots(facts))
  return slots
}

/**
 * The required facts still missing, in the order of REQUIRED_FACTS. Per-plan facts are expanded over the plan
 * lineup (« plans.p3.price », with the plan's name in the label). The lineup itself, a structural default, counts
 * as missing until the owner confirms it (plans.confirmed). The conditional facts the answers call for come in
 * their place (CONDITIONAL_FACTS): the hand-off of the chosen checkout.mode, each cookies.tools entry, the tool of
 * a demo video played from a video host; a value the site cannot use is listed with « à corriger » and what is
 * wrong, as is a form service address that is not https (contact.formEndpoint, formEndpointProblem()). `facts` lets
 * a check read another data file.
 */
export function missingRequired(facts: Facts = FACTS): RequiredFact[] {
  return requiredSlots(facts)
    .filter((slot) => !slot.ok)
    .map((slot) => slot.fact)
}

/**
 * How many required answers `facts` call for, missing or not (launch-check prints « N of M »): one per required
 * fact, one price per plan of the lineup, no share capital for a sole trader, plus what the answers bring
 * (CONDITIONAL_FACTS): the hand-off addresses of checkout.mode, one per cookies.tools entry, the demo video's tool.
 */
export function requiredCount(facts: Facts = FACTS): number {
  return requiredSlots(facts).length
}

/** The optional facts the owner has not answered (a « no » is an answer). A per-plan fact counts once. */
export function missingOptional(facts: Facts = FACTS): string[] {
  return OPTIONAL_FACTS.filter((key) =>
    key.startsWith('plans.<id>.')
      ? facts.plans.list.every((plan) => !answered(factAt(key.replace('<id>', plan.id), facts)))
      : !answered(factAt(key, facts)),
  )
}

/**
 * FACTS paths that are neither required, conditional, optional nor structural: empty unless a fact was added to the
 * data file without being classified here. launch-check refuses to run while this list is not empty.
 */
export function unclassifiedFacts(facts: Facts = FACTS): string[] {
  const known = new Set<string>([...REQUIRED_KEYS, ...OPTIONAL_FACTS, ...STRUCTURAL_FACTS, ...CONDITIONAL_FACTS.map((fact) => fact.key)])
  const unknown: string[] = []
  const walk = (node: unknown, path: string) => {
    const key = planKey(path)
    if (known.has(key)) return
    if (node != null && typeof node === 'object' && !Array.isArray(node)) {
      for (const [name, child] of Object.entries(node)) walk(child, `${path}.${name}`)
    } else {
      unknown.push(path)
    }
  }
  for (const [name, child] of Object.entries(facts)) walk(child, name)
  return unknown
}
