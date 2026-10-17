import { cn } from '@/lib/utils'
import { iconClass } from './recipes'

/** Programme blocks per row, as [start, end] fractions of the time span. Abstract shapes, never a schedule. */
const ROWS: readonly (readonly [number, number])[][] = [
  [[0, 0.3], [0.3, 0.64], [0.64, 1]],
  [[0, 0.18], [0.18, 0.56], [0.56, 0.82], [0.82, 1]],
  [[0, 0.46], [0.46, 0.72], [0.72, 1]],
  [[0, 0.26], [0.26, 0.5], [0.5, 1]],
  [[0, 0.36], [0.36, 0.66], [0.66, 1]],
  [[0, 0.22], [0.22, 0.48], [0.48, 0.78], [0.78, 1]],
]

/** Widths of the two title bars inside a block (cycled), as a share of the block. */
const BARS = [
  ['w-[72%]', 'w-[44%]'],
  ['w-[58%]', 'w-[36%]'],
  ['w-[80%]', 'w-[50%]'],
] as const

/** Generic channel pictograms (never channel names or logos). */
const GUIDE_ICONS = ['ti-news', 'ti-ball-football', 'ti-movie', 'ti-mood-kid', 'ti-music', 'ti-world'] as const

/** Decorative ruler times (half-hours). They are shapes in a drawing, never a schedule claim. */
const GUIDE_TIMES = ['20:00', '20:30', '21:00', '21:30'] as const

type GuideGridProps = {
  /** Channel rows (2–6, default 5). */
  rows?: number
  /** The row whose programme under the now-line is on air (signal yellow), 0-based (default 1). */
  selected?: number
  /** Position of the now-line along the time span, 0–1 (default 0.42). */
  now?: number
  /** Up to 6 generic Tabler pictograms for the channel column. */
  icons?: readonly string[]
  className?: string
}

/**
 * Guide grid, the hero's TV-native visual: a channel pictogram column, programme blocks (nuit-800; the one on
 * air in signal yellow with nuit bars), a mono time ruler and the yellow now-line with its square head on the
 * ruler. A Nuit screen with viewfinder corners. Static and aria-hidden; the times are decoration.
 */
export function GuideGrid({ rows = 5, selected = 1, now = 0.42, icons = GUIDE_ICONS, className }: GuideGridProps) {
  const n = Math.min(Math.max(Math.round(rows), 2), ROWS.length)
  const at = Math.min(Math.max(now, 0.05), 0.95)
  const pct = `${at * 100}%`
  return (
    <div aria-hidden="true" className={cn('pointer-events-none nuit-plain frame-corners rounded-panel p-5 shadow-float sm:p-6', className)}>
      <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-2 sm:grid-cols-[2.75rem_minmax(0,1fr)] sm:gap-x-3">
        {/* channel column: a spacer for the ruler, then one pictogram tile per row */}
        <div className="grid grid-rows-[1.75rem] auto-rows-[2.25rem] gap-y-1.5 sm:auto-rows-[2.75rem]">
          <span />
          {Array.from({ length: n }, (_, r) => (
            <span key={r} className="grid place-items-center rounded-micro bg-nuit-900">
              <i className={iconClass(icons[r % icons.length], 'text-[18px] text-on-nuit/50 sm:text-[20px]')} />
            </span>
          ))}
        </div>

        {/* programme area: ruler, rows, and the now-line across them */}
        <div className="relative grid grid-rows-[1.75rem] auto-rows-[2.25rem] gap-y-1.5 sm:auto-rows-[2.75rem]">
          <div className="relative">
            {GUIDE_TIMES.map((t, i) => (
              <span key={t} className="absolute top-0 bottom-1.5 flex flex-col justify-between" style={{ left: `${(i / GUIDE_TIMES.length) * 100}%` }}>
                <span data-label={t} className="font-mono text-[0.8125rem] leading-none font-semibold text-on-nuit-muted before:content-[attr(data-label)]" />
                <span className="h-1.5 w-px bg-on-nuit-muted/60" />
              </span>
            ))}
          </div>
          {ROWS.slice(0, n).map((blocks, r) => (
            <div key={r} className="relative">
              {blocks.map(([a, b], k) => {
                const onAir = r === selected && a <= at && at < b
                const bars = BARS[(r + k) % BARS.length]
                return (
                  <span
                    key={k}
                    className={cn('absolute inset-y-0 flex flex-col justify-center gap-1.5 rounded-micro px-2.5', onAir ? 'bg-signal-500' : 'bg-nuit-800')}
                    style={{ left: `${a * 100}%`, width: `calc(${(b - a) * 100}% - 3px)` }}
                  >
                    <span className={cn('h-1.5 rounded-full', bars[0], onAir ? 'bg-nuit/80' : 'bg-on-nuit/35')} />
                    <span className={cn('h-1 rounded-full', bars[1], onAir ? 'bg-nuit/45' : 'bg-on-nuit/18')} />
                  </span>
                )
              })}
            </div>
          ))}
          {/* the now-line: its square head sits on the ruler */}
          <span className="absolute top-[1.125rem] bottom-0 w-0.5 -translate-x-1/2 bg-signal-500" style={{ left: pct }} />
          <span className="absolute top-[0.8125rem] size-2.5 -translate-x-1/2 bg-signal-500" style={{ left: pct }} />
        </div>
      </div>
    </div>
  )
}
