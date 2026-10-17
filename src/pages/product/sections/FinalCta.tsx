import type { MouseEvent, ReactNode } from 'react'
import { ButtonA, Kw, Pending, PlatePanel, Reveal, Section, type Zone } from '@/components/brand'
import { formatEuro, planFactKey, renewalName, type Plan } from '@/lib/facts'
import { routeHref } from '@/lib/site'
import type { PlanProduct } from '../data'
import { DurationRuler } from '../DurationRuler'
import { NB } from '../facts-text'

type FinalCtaProps = {
  dataSection: string
  title: [string, string, string]
  text: string
  /** A line above the action (the pending price), if any. */
  above?: ReactNode
  action: ReactNode
  /** What the ruler's square stands on, in words (« Formule 12 mois »). */
  caption: string
  /** The duration the ruler marks: this plan, or the duration chosen on the renewal page. */
  months: number
  /** The durations printed under the ruler (default: the plan list). */
  durations?: number[]
  /** Ground (default band); the page picks another when the band above is on band. */
  zone?: Zone
}

/**
 * The closing call of the plan and renewal pages: one sign plate on the band ground (never Nuit, IDENTITY §7.5),
 * composed as the home closing plate. Left: the heading, its line and the button (this view's one filled button;
 * the plate carries data-buybar-watch, so the phone buy bar steps aside while it is on screen). Right: the duration
 * ruler on a paper block, the square on this page's duration and its name above: tone, not a rule, parts the two.
 */
function FinalCta({ dataSection, title, text, above, action, caption, months, durations, zone = 'band' }: FinalCtaProps) {
  return (
    <Section zone={zone} dataSection={dataSection}>
      <PlatePanel data-buybar-watch="" className="grid gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-x-grid">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="font-display text-display-sm text-z-fg md:text-display-md">
              {title[0]}
              <Kw>{title[1]}</Kw>
              {title[2]}
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="mt-5 max-w-[46ch] font-sans text-lead text-z-soft">{text}</p>
          </Reveal>
          <div className="mt-9 grid justify-items-start gap-4">
            {above}
            {action}
          </div>
        </div>

        {/* A paper block inside the white plate, as on the home page: 12px corners (a block inside a panel whose
            padding is wider than its radius); on the tint the ruler's ticks take the deeper hairline. */}
        <div className="rounded-control bg-z-card p-5 [--z-line:var(--color-hairline-deep)] md:p-8 lg:col-span-5">
          <p className="font-sans text-small font-semibold text-z-accent">{caption}</p>
          <DurationRuler at={months} durations={durations} className="mt-6" />
        </div>
      </PlatePanel>
    </Section>
  )
}

/**
 * product-final-cta: « Commander ma formule » with the price once it exists (the chosen screens option's, if any);
 * while the price is pending it sits on its own line above the button (no marker inside a button).
 */
export function PlanFinalCta({
  product,
  sold,
  priceFact,
  onBuy,
  zone,
}: {
  product: PlanProduct
  /** The plan as sold with the chosen screens option. */
  sold: Plan
  /** data-pending key of that price when it is not the plan's own (plans.screens.options). */
  priceFact?: string | null
  onBuy: (e: MouseEvent<HTMLElement>) => void
  zone?: Zone
}) {
  const price = formatEuro(sold.price)
  const label = 'Commander ma formule'
  return (
    <FinalCta
      zone={zone}
      dataSection="product-final-cta"
      title={['Commandez, puis ', 'installez-vous', '.']}
      text="Après le paiement, on vous guide jusqu’à la première image."
      above={price ? null : <Pending variant="block" what="prix" fact={priceFact ?? planFactKey(product.plan.id, 'price')} />}
      action={
        <ButtonA href={routeHref('/commande/')} onClick={onBuy} variant="primary" size="lg" iconEnd="arrow" full className="sm:w-auto">
          {price ? `${label} · ${price}` : label}
        </ButtonA>
      }
      caption={product.name}
      months={product.plan.months}
    />
  )
}

/**
 * renewal-final-cta: back to the duration selector (#duree), which takes the focus; the ruler marks the duration
 * chosen there.
 */
export function RenewalFinalCta({
  onChoose,
  months,
  durations,
}: {
  onChoose: (e: MouseEvent<HTMLElement>) => void
  months: number
  durations: number[]
}) {
  return (
    <FinalCta
      dataSection="renewal-final-cta"
      title={['Gardez votre ', 'accès', '.']}
      text={`Choisissez la durée et préparez votre identifiant${NB}: nous nous occupons de la prolongation.`}
      action={
        <ButtonA href="#duree" onClick={onChoose} variant="primary" size="lg" iconEnd="arrow" full className="sm:w-auto">
          Choisir ma durée
        </ButtonA>
      }
      caption={renewalName(months)}
      months={months}
      durations={durations}
    />
  )
}
