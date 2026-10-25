// Types of the client's facts, the list of facts the launch needs, and small read helpers.
// Values live in facts.data.ts. This file uses erasable TypeScript only: scripts/launch-check.mjs imports it with Node.

import { FACTS } from './facts.data.ts'

export type PlanId = 'premium' | 'duo' | 'famille'
export type PaymentMethod = 'paypal' | 'sepa'
export type AppId = 'ontv' | 'max' | 'ibo' | 'x9' | 'prime'
export type Activation = 'code' | 'login'
export type ReviewId = 'thomas' | 'sophie' | 'karim' | 'marc' | 'lucas' | 'nadia'

export interface Plan {
  id: PlanId
  screens: number
  months: number
  /** Total price for the whole duration, in euros. */
  price: number | null
  /** The monthly equivalent the brief prints (« Soit 3,33 € / mois »). */
  monthly: number | null
}

export interface App {
  name: string
  version: string | null
  downloaderCode: string | null
  url: string | null
  activation: Activation[]
  status: 'latest' | 'new' | 'previous'
}

export interface Player {
  name: string
  ios: string | null
  windows: string | null
}

export interface Review {
  id: ReviewId
  name: string
  city: string
  country: 'fr' | 'be' | 'ch' | 'ca'
  year: number
  /** Path of the customer's WhatsApp screenshot under public/, or null until the client sends it. */
  screenshot: string | null
}

export interface Facts {
  brand: { name: string; product: string; seller: string; domain: string | null }
  whatsapp: { number: string | null; display: string | null }
  contact: { email: string | null; telegram: string | null }
  payment: { methods: PaymentMethod[] | null }
  plans: Plan[]
  featuredPlan: PlanId
  counts: {
    channels: number
    films: number
    series: number
    episodes: number
    vodTitles: number
    replayChannels: number
    replayDays: number
    sportsChannels: number
    customers: number
    uptime: number
    rating: number
    recommendSupport: number
    supportMinutes: number
    zappingSeconds: number
    installMinutes: number
    yearsActive: number
    founded: number
    playerPricePerYear: number
    playerTrialDays: number
    vodCategories: Record<
      'action' | 'comedy' | 'drama' | 'scifi' | 'horror' | 'romance' | 'animation' | 'documentary',
      number
    >
  }
  apps: Record<AppId, App>
  previousVersions: string[]
  desktop: { windows: string | null; mac: string | null; linux: string | null }
  players: Record<'iboPlayer' | 'hotPlayer' | 'iboSmarter', Player>
  playerDownloaderCodes: Record<'bobPlayer' | 'hotPlayer' | 'iboPlayerPro', string>
  resellerPanels: number[]
  resellerFeaturedPanel: number
  reviews: Review[]
  legal: {
    companyName: string | null
    legalForm: string | null
    address: string | null
    registration: string | null
    publisher: string | null
    host: string | null
  }
}

export { FACTS }

export const PLANS: Plan[] = FACTS.plans
export function plan(id: PlanId): Plan {
  const found = FACTS.plans.find((p) => p.id === id)
  if (!found) throw new Error(`Unknown plan ${id}`)
  return found
}

/** A fact the launch cannot do without, with where it is in facts.data.ts. */
export interface FactCheck {
  path: string
  label: string
  missing: (facts: Facts) => boolean
}

const isMissing = (value: unknown) =>
  value == null || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0)

/** Facts every purchase path and every page needs. The launch check fails while one is missing. */
export const REQUIRED_FACTS: FactCheck[] = [
  { path: 'brand.domain', label: 'Domain of the site', missing: (f) => isMissing(f.brand.domain) },
  { path: 'whatsapp.number', label: 'WhatsApp number (orders and support)', missing: (f) => isMissing(f.whatsapp.number) },
  { path: 'whatsapp.display', label: 'WhatsApp number as printed', missing: (f) => isMissing(f.whatsapp.display) },
  { path: 'payment.methods', label: 'Payment methods', missing: (f) => isMissing(f.payment.methods) },
  ...(['premium', 'duo', 'famille'] as const).map((id) => ({
    path: `plans.${id}.price`,
    label: `Price of the ${id} plan`,
    missing: (f: Facts) => isMissing(f.plans.find((p) => p.id === id)?.price),
  })),
  ...(['ontv', 'max', 'ibo', 'x9'] as const).map((id) => ({
    path: `apps.${id}.downloaderCode`,
    label: `Downloader code of ${id}`,
    missing: (f: Facts) => isMissing(f.apps[id].downloaderCode),
  })),
]

/** Facts the site can launch without: their item is left out in launch mode and shows « À compléter » in review. */
export const OPTIONAL_FACTS: FactCheck[] = [
  { path: 'contact.email', label: 'Support e-mail address', missing: (f) => isMissing(f.contact.email) },
  { path: 'contact.telegram', label: 'Telegram channel (new releases) link', missing: (f) => isMissing(f.contact.telegram) },
  ...(['companyName', 'legalForm', 'address', 'registration', 'publisher', 'host'] as const).map((key) => ({
    path: `legal.${key}`,
    label: `Legal notice: ${key}`,
    missing: (f: Facts) => isMissing(f.legal[key]),
  })),
  ...FACTS.reviews.map((review) => ({
    path: `reviews.${review.id}.screenshot`,
    label: `WhatsApp screenshot of the review by ${review.name}`,
    missing: (f: Facts) => isMissing(f.reviews.find((r) => r.id === review.id)?.screenshot),
  })),
]

export function missingRequired(facts: Facts = FACTS): FactCheck[] {
  return REQUIRED_FACTS.filter((check) => check.missing(facts))
}
export function missingOptional(facts: Facts = FACTS): FactCheck[] {
  return OPTIONAL_FACTS.filter((check) => check.missing(facts))
}
