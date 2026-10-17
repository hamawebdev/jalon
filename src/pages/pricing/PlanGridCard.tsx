import type { ReactNode } from 'react'
import { CheckList, Graduations, PlanCard, cardClass, scoped } from '@/components/brand'
import {
  FACTS,
  formatCount,
  formatEuro,
  perMonthLine,
  planFactKey,
  planName,
  planPath,
  present,
  savingPercent,
  type Plan,
  type ScreenOption,
} from '@/lib/facts'
import { cn } from '@/lib/utils'
import { planWithScreens } from '../product/data'
import { liveCountText, qualityText, vodCountText } from '../theme/facts-text'
import { Fact } from '../theme/facts-ui'

type ChecklistLine = { label: string; value: string | null; what: string; fact: string }

/**
 * The shared plan checklist (GLOSSARY §1): what every plan includes, whatever its duration. `screens`: the count the
 * grid's prices are for (a screens option chosen above the grid), else the included one.
 */
function checklistLines(screens: number | null): ChecklistLine[] {
  return [
    { label: 'Chaînes en direct', value: liveCountText(), what: 'nombre', fact: 'channels.live.count' },
    { label: 'Films et séries', value: vodCountText(), what: 'nombre', fact: 'vod.count' },
    { label: 'Écrans en même temps', value: formatCount(screens), what: 'nombre', fact: 'plans.screens.count' },
    { label: 'Qualité d’image', value: qualityText(), what: 'qualités', fact: 'quality.levels' },
    { label: 'Aide sur WhatsApp', value: FACTS.support.hours, what: 'horaires', fact: 'support.hours' },
    // A measured availability is shown only with a real, sourced figure (APPROVAL §2.4).
    ...(present(FACTS.proof.uptime) ? [{ label: 'Disponibilité mesurée', value: FACTS.proof.uptime, what: 'taux et période', fact: 'proof.uptime' }] : []),
  ]
}

type PlanChecklistProps = {
  /** Heading level: h2 on /abonnements/ (the plan names are h2 there), h3 under a section H2 (home-plans). */
  as?: 'h2' | 'h3'
  /**
   * The list as a white panel with the plan cards' corners: the fifth piece of the comparison (/abonnements/).
   * Default: bare, on the section's ground, the caller's classes around it.
   */
  boxed?: boolean
  /**
   * With `boxed`: one closing line inside the panel, on a paper strip clipped to its corners (the way to the device
   * check). If no checklist line is left, it stands alone as a slim row, so the way on never goes with the list.
   */
  foot?: ReactNode
  /**
   * The screen count the « Écrans en même temps » line states: the one chosen in the screens toggle above the grid
   * (/abonnements/), as the plan pages' buy box does. Default: the included count.
   */
  screens?: number | null
  className?: string
}

/**
 * « Dans chaque formule »: the shared checklist, shown once next to the plan grid instead of once per card, so the
 * cards keep what differs (duration and total price) and compare at a glance. A line whose optional fact is missing
 * is left out on the published site; with no line left the block is not drawn.
 */
export function PlanChecklist({ as: H = 'h3', boxed, foot, screens = FACTS.plans.screens.count, className }: PlanChecklistProps) {
  const lines = scoped(checklistLines(screens), (line) => ({ [line.fact]: line.value }))
  const items = lines.map((line) => (
    <>
      {line.label}&nbsp;: <Fact value={line.value} what={line.what} fact={line.fact} />
    </>
  ))
  if (boxed) {
    if (lines.length === 0) {
      return foot ? <p className={cn(cardClass.inner, 'px-5 py-4 font-sans text-small text-z-soft', className)}>{foot}</p> : null
    }
    return (
      <div data-section="plans-included" className={cn('overflow-hidden rounded-panel border border-z-line bg-z-card', className)}>
        {/* From xl the plan cards take 24px of side padding (four in a row): the panel keeps their text column. */}
        <div className="grid gap-x-grid gap-y-5 p-card lg:grid-cols-12 lg:items-start xl:px-6">
          <H className="font-display text-title-lg text-z-fg lg:col-span-3">Dans chaque formule</H>
          <CheckList className="gap-x-grid sm:grid-cols-2 lg:col-span-9 xl:grid-cols-3" items={items} />
        </div>
        {foot && <p className="border-t border-hairline bg-paper px-card py-4 font-sans text-small text-z-soft xl:px-6">{foot}</p>}
      </div>
    )
  }
  if (lines.length === 0) return null
  return (
    <div data-section="plans-included" className={cn('grid gap-x-grid gap-y-4 lg:grid-cols-12 lg:items-start', className)}>
      <H className="font-display text-title text-z-fg lg:col-span-3">Dans chaque formule</H>
      <CheckList className="gap-x-grid sm:grid-cols-2 lg:col-span-9 xl:grid-cols-3" items={items} />
    </div>
  )
}

type PlanGridCardProps = {
  plan: Plan
  /**
   * The screens option the grid's prices are for (plans-screens on /abonnements/), or none: the plan as it is. The
   * card follows the plan pages' rule (planWithScreens): the reference price, so the struck price and the saving
   * chip, belongs to the included screen count only.
   */
  screens?: ScreenOption | null
  /** Heading level: h2 on /abonnements/ (no section heading above the cards), h3 under a section H2. */
  as?: 'h2' | 'h3'
}

/**
 * One plan card (copy abonnements.md › plans-grid, same as home-plans): what differs from one plan to the next,
 * and nothing else. Name (the link to the plan's page), total price, per-month line and saving only with real
 * figures, the duration ruler and one button to the plan's page. What every plan includes is listed once, by <PlanChecklist> next to the grid.
 * The featured plan (plans.featured) carries « Notre conseil » and the grid's one filled button.
 */
export function PlanGridCard({ plan, screens = null, as = 'h3' }: PlanGridCardProps) {
  const featured = plan.id === FACTS.plans.featured
  const sold = planWithScreens(plan, screens)
  const saving = savingPercent(sold)
  const to = planPath(plan)
  return (
    <PlanCard
      as={as}
      name={planName(plan.months)}
      // The name is the link that says in words where it leads (« Formule 12 mois »); the button keeps its verb.
      nameTo={to}
      featured={featured}
      tab={featured ? 'Notre conseil' : null}
      tag={saving != null ? { label: `−${saving}\u00a0%`, tone: 'saving' } : null}
      old={saving != null ? formatEuro(sold.referencePrice) : null}
      price={formatEuro(sold.price)}
      pricePending={{ what: 'prix', fact: screens ? 'plans.screens.options' : planFactKey(plan.id, 'price') }}
      unit="prix total"
      perMonth={perMonthLine(sold)}
      duration={<Graduations ticks={24} major={6} at={Math.min(plan.months, 24)} />}
      features={[]}
      cta={{ label: 'Choisir cette formule', to, ariaLabel: `Choisir cette formule de ${plan.months} mois` }}
      // From xl four cards share a row and take 24px of side padding; the kit's tab sits at the card padding
      // (left-card), so it moves with them and stays on the text column of the name, the price and the button.
      className="h-full xl:px-6 xl:[&>span:first-child]:left-6"
    />
  )
}
