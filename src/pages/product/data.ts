import { scoped } from '@/components/brand'
import type { CartItem } from '@/components/site/chrome-context'
import {
  FACTS,
  planFactKey,
  planName,
  renewalName,
  type Plan,
  type PlanId,
  type RenewalOption,
  type ScreenOption,
} from '@/lib/facts'
import { BRAND } from '@/lib/site'

// The plan pages (/abonnements/3-mois/ … /24-mois/) and the renewal page (/abonnements/renouvellement/) share one
// template. Durations, slugs and prices come from FACTS (src/lib/facts.ts); this file only adds the words of each
// page (copy produit.md and renouvellement.md) and the title and description build-b uses for the page meta.

type ProductBase = {
  /** Route slug under /abonnements/. */
  slug: string
  /** Page name passed to pageTitle() (copy chrome-meta). */
  title: string
  /** Meta description (copy chrome-meta): never an owner fact. */
  description: string
}

/** product-description head of one plan: the H2 around its keyword, then the lead. */
export type PlanPitch = { before: string; keyword: string; after: string; lead: string }

export type PlanProduct = ProductBase & {
  kind: 'plan'
  /** The plan as FACTS holds it (id, months, slug, price, referencePrice). */
  plan: Plan
  /** « Formule 12 mois »: buy box, breadcrumb, related cards, cart line (GLOSSARY §1). */
  name: string
  pitch: PlanPitch
}

export type RenewalProduct = ProductBase & { kind: 'renewal' }

export type Product = PlanProduct | RenewalProduct

const NB = '\u00a0'

/** Words that change from one plan to the next (produit.md › product-description and chrome-meta). */
const PLAN_COPY: Record<PlanId, { description: string; pitch: PlanPitch }> = {
  p3: {
    description: `Formule ${BRAND} de 3${NB}mois${NB}: la télé par internet (IPTV) en direct et à la demande, pour prendre vos repères. Prix total affiché, aide sur WhatsApp.`,
    pitch: {
      before: 'Trois mois pour ',
      keyword: 'prendre vos repères',
      after: '.',
      lead: `La formule courte, pour commencer${NB}: vous installez l’application, vous trouvez vos chaînes, puis vous choisissez la suite en connaissance de cause.`,
    },
  },
  p6: {
    description: `Formule ${BRAND} de 6${NB}mois${NB}: la télé par internet (IPTV) en direct et à la demande, pour voir venir. Prix total affiché, aide sur WhatsApp.`,
    pitch: {
      before: 'Six mois pour ',
      keyword: 'voir venir',
      after: '.',
      lead: `Une durée intermédiaire${NB}: une échéance tous les six mois, sans partir tout de suite sur une année entière.`,
    },
  },
  p12: {
    description: `Formule ${BRAND} de 12${NB}mois${NB}: une année de télé par internet (IPTV), en direct et à la demande. Prix total affiché, aide à l’installation sur WhatsApp.`,
    pitch: {
      before: 'Une année entière ',
      keyword: 'devant vous',
      after: '.',
      lead: `Une seule échéance dans l’année${NB}: vous installez l’application une fois, puis vous regardez au fil des mois, sans date à surveiller.`,
    },
  },
  p24: {
    description: `Formule ${BRAND} de 24${NB}mois${NB}: deux ans de télé par internet (IPTV), en direct et à la demande, une seule échéance. Prix total affiché, aide sur WhatsApp.`,
    pitch: {
      before: 'Deux ans pour ',
      keyword: 'ne plus y penser',
      after: '.',
      lead: `La durée longue, pour les foyers qui connaissent déjà le service${NB}: une commande, puis deux ans avant la prochaine échéance.`,
    },
  },
}

function planProduct(plan: Plan): PlanProduct {
  const name = planName(plan.months)
  return {
    kind: 'plan',
    slug: plan.slug,
    plan,
    name,
    title: name,
    description: PLAN_COPY[plan.id].description,
    pitch: PLAN_COPY[plan.id].pitch,
  }
}

const RENEWAL: RenewalProduct = {
  kind: 'renewal',
  slug: FACTS.plans.renewal.slug,
  title: 'Renouvellement',
  description: `Prolongez votre abonnement ${BRAND}${NB}: choisissez la durée, indiquez votre identifiant à la commande, nous prolongeons le même accès.`,
}

/** Every product page, plans first (shortest first, as plans.list orders them), then the renewal page. */
export const PRODUCT_LIST: Product[] = [...FACTS.plans.list.map(planProduct), RENEWAL]

/**
 * Product pages by slug (build-b reads `title` and `description` for the page meta). The map has no prototype: a
 * slug comes from the address bar, and « constructor » or « __proto__ » must not find an Object.prototype member.
 */
export const PRODUCTS: Record<string, Product> = Object.create(null)
for (const product of PRODUCT_LIST) PRODUCTS[product.slug] = product

/** The product page of a slug, or undefined for any other string: only the map's own entries count. */
export function productBySlug(slug: string | undefined): Product | undefined {
  return slug != null && Object.hasOwn(PRODUCTS, slug) ? PRODUCTS[slug] : undefined
}

/** The other durations for product-related: every plan except this one, shortest first (the renewal is not listed). */
export function relatedPlans(plan: Plan): Plan[] {
  return FACTS.plans.list.filter((p) => p.id !== plan.id).sort((a, b) => a.months - b.months)
}

/** Is this the plan that carries « Notre conseil » (plans.featured)? */
export function isFeatured(plan: Plan): boolean {
  return plan.id === FACTS.plans.featured
}

/**
 * Multi-screen options (plans.screens.options), or null while the offer has a single screen count. Launch mode: an
 * option given without its price for every plan is an unfinished answer and leaves no trace (the key is optional,
 * so its price would show no marker); if that leaves fewer than two, there is no selector and the plan's own
 * price stands.
 */
export function screenOptions(): ScreenOption[] | null {
  const options = FACTS.plans.screens.options
  if (!options || options.length === 0) return null
  const priced = scoped(options, (o) => FACTS.plans.list.every((p) => o.prices[p.id] != null))
  return priced.length === options.length || priced.length >= 2 ? priced : null
}

/** The option a page starts on, and the one the related cards add: the included screen count, else the first. */
export function baseScreenOption(): ScreenOption | null {
  const options = screenOptions()
  if (!options) return null
  return options.find((o) => o.screens === FACTS.plans.screens.count) ?? options[0]
}

/**
 * The plan as sold with a screens option: the total price for that count. The reference price belongs to the
 * included count only, so a saving is never computed against another count's price.
 */
export function planWithScreens(plan: Plan, option: ScreenOption | null): Plan {
  if (!option) return plan
  const base = option.screens === FACTS.plans.screens.count
  return { ...plan, price: option.prices[plan.id] ?? null, referencePrice: base ? plan.referencePrice : null }
}

/** « 1 écran », « 2 écrans » (no-break space between the number and its word). */
export function screensLabel(screens: number): string {
  return `${screens}${NB}${screens > 1 ? 'écrans' : 'écran'}`
}

/**
 * Cart line of a plan (chrome.md › chrome-cart): the price stays null until the owner gives it. With a screens
 * option, the name adds « · 2 écrans », the id carries the count, so two counts stay two lines, and `screens`
 * carries it for the order hand-off: a payment link or shop page given per screen count is found by it, as a
 * renewal's is by its months (APPROVAL §2e, QA HC-01).
 */
export function planCartLine(plan: Plan, option: ScreenOption | null = null): Omit<CartItem, 'qty'> {
  const sold = planWithScreens(plan, option)
  return {
    id: option ? `${plan.slug}-${option.screens}-ecrans` : plan.slug,
    name: option ? `${planName(plan.months)} · ${screensLabel(option.screens)}` : planName(plan.months),
    price: sold.price,
    months: plan.months,
    ...(option ? { screens: option.screens } : {}),
    kind: 'plan',
    priceFact: option ? 'plans.screens.options' : planFactKey(plan.id, 'price'),
  }
}

/** A renewable duration with the facts key of its price (data-pending while it is null). */
export type RenewalChoice = RenewalOption & { priceFact: string }

/** The plan list as renewal choices: the same durations at the same prices (PLANS §3.5). */
function planChoices(): RenewalChoice[] {
  return FACTS.plans.list.map((p) => ({ months: p.months, price: p.price, priceFact: planFactKey(p.id, 'price') }))
}

/**
 * Durations of the renewal selector: plans.renewal.durations once the owner gives them, until then the plan list
 * and its prices (PLANS §3.5). Launch mode: a renewal duration given without its price leaves no trace (the key
 * is optional, so the price would show no marker); if none is left, the plan list stands in.
 */
export function renewalChoices(): RenewalChoice[] {
  const own = FACTS.plans.renewal.durations
  if (!own) return planChoices()
  const choices = scoped(
    own.map((o) => ({ ...o, priceFact: 'plans.renewal.durations' })),
    (c) => ({ [c.priceFact]: c.price }),
  )
  return choices.length > 0 ? choices : planChoices()
}

/** Cart line of a renewal: its id and name carry the chosen duration (« renouvellement-6-mois »). */
export function renewalCartLine(choice: RenewalChoice): Omit<CartItem, 'qty'> {
  return {
    id: `${FACTS.plans.renewal.slug}-${choice.months}-mois`,
    name: renewalName(choice.months),
    price: choice.price,
    months: choice.months,
    kind: 'renew',
    priceFact: choice.priceFact,
  }
}
