import { scoped, type QualityTier } from '@/components/brand'
import {
  CREDENTIAL_LABEL,
  FACTS,
  QUALITY_LABEL,
  endOfTerm,
  familiesInText,
  formatCount,
  formatEuro,
  formatList,
  perMonthLine,
  present,
  savingPercent,
  supportedFamilies,
  type Plan,
  type QualityLevel,
} from '@/lib/facts'

// Owner facts formatted for the home page and the plan pages (values only; the elements that show them, or
// <Pending> while they are missing, are in ./shared.tsx).

/** U+00A0, the no-break space of French typography (before : ; ! ? and between a number and its unit). */
export const NB = '\u00a0'

/** A text that already ends on its own closing mark (« … à la commande. »): the slot after it adds no full stop. */
export const endsSentence = (text: string) => /[.!?…]\s*$/.test(text)

/**
 * The kit's stars are always five full stars (brand B-01, until they can draw a partial score), so they stand only
 * beside a 5/5 rating: a 4,6/5 never shows five stars. Any other score is written, without stars.
 */
export const fullStars = (score: number) => score === 5

/** Owner facts as they read in a sentence (copy FACTS.md « Reads as »). `null` = not given yet. */
export const F = {
  liveCount: formatCount(FACTS.channels.live.count),
  vodCount: formatCount(FACTS.vod.count),
  screens: formatCount(FACTS.plans.screens.count),
  qualities: formatList(FACTS.quality.levels),
  regions: formatList(FACTS.channels.regions),
  /** The supported families in their sentence forms (« les télés connectées, les clés et box TV et les ordinateurs »). */
  devices: familiesInText(supportedFamilies()),
  deliveryChannel: formatList(FACTS.delivery.channel),
  credentials: FACTS.delivery.credentialTypes ? formatList(FACTS.delivery.credentialTypes.map((c) => CREDENTIAL_LABEL[c])) : null,
  paymentNames: FACTS.payment.methods ? formatList(FACTS.payment.methods.map((m) => m.name)) : null,
  /** Badges of the payment row; `null` renders the row's <Pending>. */
  paymentBadges: FACTS.payment.methods ? FACTS.payment.methods.map((m) => m.name) : null,
  includedList: formatList(FACTS.plans.features.included),
  endOfTerm: endOfTerm(),
  renewalDurations:
    FACTS.plans.renewal.durations && FACTS.plans.renewal.durations.every((d) => d.price != null)
      ? formatList(FACTS.plans.renewal.durations.map((d) => `${d.months}${NB}mois à ${formatEuro(d.price)}`))
      : null,
} as const

/** One inclusion of the offer card and of the buy box: a label, the fact it states and how its marker reads. */
export type Inclusion = { label: string; value: string | null; what: string; fact: string; figure: boolean }

/**
 * The first four lines of the shared plan checklist (GLOSSARY §1), as the home offer card and the buy box list
 * them. `screens`: the count to show when it is not the included one (a screens option chosen in the buy box).
 * Launch mode keeps a line only while its fact shows: « Écrans en même temps » rests on a required fact and stays,
 * even alone (copy README §10.4, rule 1).
 */
export function planInclusions(screens: number | null = FACTS.plans.screens.count): Inclusion[] {
  const rows: Inclusion[] = [
    { label: 'Chaînes en direct', value: F.liveCount, what: 'nombre', fact: 'channels.live.count', figure: true },
    { label: 'Films et séries', value: F.vodCount, what: 'nombre', fact: 'vod.count', figure: true },
    { label: 'Écrans en même temps', value: formatCount(screens), what: 'nombre', fact: 'plans.screens.count', figure: true },
    { label: 'Qualité d’image', value: F.qualities, what: 'qualités', fact: 'quality.levels', figure: false },
  ]
  return scoped(rows, (row) => ({ [row.fact]: row.value }))
}

/** Price strings of a plan for the kit's Price, PlanCard and BuyBar (`null` while the owner has not given them). */
export function planPrices(plan: Plan) {
  const price = formatEuro(plan.price)
  const saving = savingPercent(plan)
  return {
    price,
    /** Struck reference price: only a real one (FACTS), and only next to a known price. */
    old: price && saving != null ? formatEuro(plan.referencePrice) : null,
    perMonth: perMonthLine(plan),
    /** Saving chip text « −45 % », only with a real reference price. */
    saving: saving != null ? `−${saving}${NB}%` : null,
    /** What screen readers hear for the chip (copy: « Économie de 45 %. »). */
    savingSpoken: saving != null ? `Économie de ${saving}${NB}%.` : null,
  }
}

/** Ladder order, best first, and the kit's stamp for each quality level of facts.ts. */
const LADDER: { level: QualityLevel; tier: QualityTier }[] = [
  { level: '4K', tier: '4K' },
  { level: 'Full HD', tier: 'FHD' },
  { level: 'HD', tier: 'HD' },
  { level: 'SD', tier: 'SD' },
]

/** Quality ladder rows: only the tiers the owner lists (quality.levels), named as GLOSSARY §5; `null` until given. */
export function ladderRows(): { tier: QualityTier; name: string }[] | null {
  const levels = FACTS.quality.levels
  if (!levels || levels.length === 0) return null
  return LADDER.filter((l) => levels.includes(l.level)).map((l) => ({ tier: l.tier, name: QUALITY_LABEL[l.level] }))
}

/**
 * A TV beside a column of quality tiers and channel themes (home-channels, product-quality): from three tiers, the
 * column without its themes is about as tall as the TV with the themes under it, so the themes go under the TV from
 * lg and both sides end level (T30, LT-10). With fewer tiers, or no themes, they stay in the column, which is then
 * the shorter side either way.
 */
export function themesUnderArt(): boolean {
  return (ladderRows()?.length ?? 0) >= 3 && present(FACTS.content.categories)
}

/** Generic pictogram for a channel theme the owner lists (content.categories); never a channel logo. */
export function categoryIcon(theme: string): string {
  const t = theme.toLocaleLowerCase('fr')
  if (t.includes('sport')) return 'ti-ball-football'
  if (t.includes('ciné') || t.includes('film')) return 'ti-movie'
  if (t.includes('série')) return 'ti-device-tv'
  if (t.includes('info') || t.includes('actu')) return 'ti-news'
  if (t.includes('jeunesse') || t.includes('enfant')) return 'ti-mood-kid'
  if (t.includes('musique')) return 'ti-music'
  if (t.includes('documentaire') || t.includes('découverte')) return 'ti-binoculars'
  if (t.includes('international') || t.includes('monde')) return 'ti-world'
  return 'ti-device-tv'
}

/** Generic pictogram for a sport discipline the owner lists (sport.disciplines); never a league or club mark. */
export function disciplineIcon(discipline: string): string {
  const d = discipline.toLocaleLowerCase('fr')
  if (d.includes('basket')) return 'ti-ball-basketball'
  if (d.includes('tennis')) return 'ti-ball-tennis'
  if (d.includes('rugby') || d.includes('américain')) return 'ti-ball-american-football'
  if (d.includes('volley')) return 'ti-ball-volleyball'
  if (d.includes('moto') || d.includes('auto') || d.includes('mécanique') || d.includes('formule')) return 'ti-steering-wheel'
  if (d.includes('vélo') || d.includes('cyclisme')) return 'ti-bike'
  if (d.includes('golf')) return 'ti-golf'
  if (d.includes('foot')) return 'ti-ball-football'
  return 'ti-run'
}
