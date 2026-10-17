import { cn } from '@/lib/utils'

type GraduationsProps = {
  /** Number of intervals on the ruler (default 60). For a duration rule: the months, e.g. 24. */
  ticks?: number
  /** Every n-th tick is twice as tall (default 5; 6 or 12 for months). */
  major?: number
  /** Position of the marker, in ticks from the left (default about 62 % along); null for no marker. */
  at?: number | null
  className?: string
}

/**
 * Graduations: a straight tick ruler in 1px z-line ticks, every major tick twice as tall, with one keylined yellow
 * square (square corners) on a 2px z-mark stem (ink on light, yellow on Nuit). Decoration at section edges, never behind text,
 * at most two per page; also the duration rule of a plan (ticks = months, at = the plan's months).
 * Fills its width (set it with className, like any block); 28px tall by default (h-*).
 */
export function Graduations({ ticks = 60, major = 5, at, className }: GraduationsProps) {
  const n = Math.max(1, Math.round(ticks))
  const marker = at === null ? null : Math.min(Math.max(at ?? Math.round(n * 0.62), 0), n)
  return (
    <div aria-hidden="true" className={cn('pointer-events-none relative h-7', className)}>
      <div className="absolute inset-0 flex items-end justify-between">
        {Array.from({ length: n + 1 }, (_, i) => (
          <span key={i} className={cn('w-px shrink-0 bg-z-line', i % major === 0 ? 'h-1/2' : 'h-1/4')} />
        ))}
      </div>
      {marker != null && (
        <span className="absolute inset-y-0 flex w-2.5 -translate-x-1/2 flex-col items-center" style={{ left: `calc(${(marker / n) * 100}% + ${0.5 - marker / n}px)` }}>
          <span className="sq size-2.5" />
          <span className="w-0.5 flex-1 bg-z-mark" />
        </span>
      )}
    </div>
  )
}

type PlaqueProps = {
  /** Existing strings of the same section, joined with " · " (two or three short items; extra items are dropped). */
  text: string
  className?: string
}

/**
 * Plaque: a static sign plate (one per page): ink plate, a yellow square holding an ink arrow, and two or three
 * short items in display 700 caps (a sign keeps its capitals). Words are pseudo-content (no text node); decorative. Hidden on phone. Size it
 * with size-* (default 112px, 144px from lg).
 */
export function Plaque({ text, className }: PlaqueProps) {
  const lines = text
    .split('·')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3)
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none @container relative grid size-[112px] content-between rounded-inner bg-ink p-3 shadow-lift lg:p-4 max-md:hidden lg:size-36',
        className,
      )}
    >
      <span className="grid size-[26cqi] place-items-center bg-signal-500 text-ink">
        <i className="ti ti-arrow-right text-[17cqi] leading-none" />
      </span>
      <span className="grid gap-[1.5cqi]">
        {lines.map((l) => (
          <span
            key={l}
            data-label={l}
            className="font-display text-[10.5cqi] leading-[1.1] font-bold tracking-[0.06em] text-on-nuit uppercase before:content-[attr(data-label)]"
          />
        ))}
      </span>
    </span>
  )
}
