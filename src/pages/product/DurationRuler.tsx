import { Graduations, typo } from '@/components/brand'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'

/**
 * The durations on sale as a ruler (the brand's graduations): one tick per month over 24 months (or the longest
 * duration, if the owner sells a longer one), the durations as its scale, the square on `at`. Shared by the home
 * closing plate and the final calls of the plan and renewal pages. Decorative: the page says the same in words, so
 * the figures are pseudo-content and the whole ruler is hidden from assistive technology.
 */
export function DurationRuler({
  at,
  durations = FACTS.plans.list.map((p) => p.months),
  className,
}: {
  /** The duration that carries the square (months). */
  at: number
  /** The durations printed under the ruler, in months. */
  durations?: number[]
  className?: string
}) {
  const span = Math.max(24, ...durations)
  return (
    <div aria-hidden="true" className={className}>
      <Graduations ticks={span} major={6} at={at} className="h-9" />
      <div className="relative mt-2 h-4">
        {durations.map((m) => (
          <span
            key={m}
            data-label={m}
            className={cn(
              typo.time,
              'absolute top-0 text-z-muted before:content-[attr(data-label)]',
              m === span ? '-translate-x-full' : '-translate-x-1/2',
              m === at && 'text-z-fg',
            )}
            style={{ left: `${(m / span) * 100}%` }}
          />
        ))}
      </div>
      <span data-label="mois" className={cn(typo.time, 'mt-2 block text-right text-z-muted before:content-[attr(data-label)]')} />
    </div>
  )
}
