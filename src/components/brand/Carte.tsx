import { cn } from '@/lib/utils'
import { Wordmark } from './Logo'
import type { CarteVariant } from './types'
import { Graduations } from './Wayfinding'

type CarteProps = {
  /**
   * Duration numeral from the plan data ("12"). Any duration works: the month strip places the marker.
   * `null` = the duration is not given yet (a trial whose length the owner has not said): the card keeps the
   * wordmark and « ACCÈS » and prints no numeral, no unit and no strip, in both modes. A drawn card never holds
   * a marker: the page shows it beside the card (<Pending>), or scopes the card (<FactScope>).
   */
  months: string | null
  /** Plan name from the plan data. Not printed on the card (the page names the plan); kept for the API. */
  plan: string
  /** Word after the numeral (default « mois »; e.g. « h » or « jours » for a trial). */
  unit?: string
  /**
   * plan (default): Nuit card with the month strip; renew: white plate with a hairline and ink type;
   * trial: Nuit card without the strip. Pass the kind from the plan data, never parse ids.
   */
  variant?: CarteVariant
  /** lg = product hero (ratio 1.586), sm = related card (16:10), thumb = 56 × 44 (cart and checkout lines). */
  size?: 'lg' | 'sm' | 'thumb'
  /**
   * Accessible image name, only where the visual stands for the product (product hero: the plan name).
   * Renders role="img" aria-label; without it the card is aria-hidden.
   */
  label?: string
  className?: string
}

/** Ground and type per kind: Nuit (a screen-like card) or the white plate with a hairline. */
const GROUND: Record<CarteVariant, string> = {
  plan: 'nuit-plain',
  trial: 'nuit-plain',
  renew: 'bg-plate border border-hairline',
}

/**
 * Carte d'accès: the access card that stands for a plan. It carries the wordmark, the label « ACCÈS », the
 * duration numeral (display 700) with its unit and a strip of month ticks with the yellow marker at the
 * duration. Every word is pseudo-content (no new text node). Never « PASS », no fake box, no mosaic, no stamp.
 */
export function Carte({ months, unit = 'mois', variant = 'plan', size = 'lg', label, className }: CarteProps) {
  const kind: CarteVariant = variant in GROUND ? variant : 'plan'
  const light = kind === 'renew'
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const }
  const fg = light ? 'text-ink' : 'text-on-nuit'
  const m = months == null ? Number.NaN : Number.parseInt(months, 10)
  const strip = kind !== 'trial' && Number.isFinite(m) && m > 0

  if (size === 'thumb') {
    return (
      <span
        {...a11y}
        className={cn('pointer-events-none relative grid h-11 w-14 shrink-0 place-items-center rounded-control', GROUND[kind], className)}
      >
        <span className="sq absolute top-1.5 left-1.5 size-1.5" />
        {months != null && (
          <span data-label={months} className={cn('font-display text-xl leading-none font-bold before:content-[attr(data-label)]', fg)} />
        )}
      </span>
    )
  }

  const lg = size === 'lg'
  return (
    <div {...a11y} className={cn('pointer-events-none @container relative w-full', lg && 'max-w-[420px]', className)}>
      <div
        className={cn(
          // Corners by size: a card on its own takes the card radius; inside a card (related plan) the 16px step.
          'relative flex flex-col overflow-hidden shadow-lift',
          lg ? 'aspect-[1.586] rounded-card p-[6.5cqi]' : 'aspect-[16/10] rounded-inner p-[6cqi]',
          GROUND[kind],
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <Wordmark tone={light ? 'light' : 'nuit'} className={lg ? 'h-[9cqi]' : 'h-[11cqi]'} />
          <span
            data-label="ACCÈS"
            className={cn(
              'font-display font-bold tracking-[0.14em] before:content-[attr(data-label)]',
              lg ? 'text-[4.2cqi]' : 'text-[5.5cqi]',
              // leading after the size: cn drops a line-height that comes before a font-size
              'leading-none',
              light ? 'text-ink-muted' : 'text-on-nuit-muted',
            )}
          />
        </div>
        {months != null && (
          <div className="mt-auto flex items-baseline gap-[2cqi]">
            <span
              data-label={months}
              className={cn('font-display font-bold tracking-[-0.03em] before:content-[attr(data-label)]', lg ? 'text-[27cqi]' : 'text-[30cqi]', 'leading-[0.85]', fg)}
            />
            <span data-label={unit} className={cn('font-display font-semibold before:content-[attr(data-label)]', lg ? 'text-[7.5cqi]' : 'text-[9cqi]', fg)} />
          </div>
        )}
        {strip && (
          <Graduations
            ticks={Math.max(24, Math.ceil(m / 12) * 12)}
            major={6}
            at={m}
            className={cn('mt-[3.5cqi] shrink-0', lg ? 'h-[7cqi]' : 'h-[8cqi]')}
          />
        )}
      </div>
    </div>
  )
}
