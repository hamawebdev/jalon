import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type NowStripProps = {
  /** Where the visitor is in the journey (« choisir sa formule »). Only what the page itself states. */
  now: ReactNode
  /** The next step (« installer l’application »), if there is one. */
  next?: ReactNode
  /** Label of the current step (default « En ce moment »). */
  nowLabel?: string
  /** Label of the next step (default « Ensuite »). */
  nextLabel?: string
  as?: ElementType
  className?: string
}

/**
 * « En ce moment · Ensuite »: a slim band, like a programme guide's lower third, used as a section transition
 * instead of numbered plates. Static: never a ticker, never a fact the page does not state. The square marks
 * the current step; a z-mark line runs to the next one.
 */
export function NowStrip({ now, next, nowLabel = 'En ce moment', nextLabel = 'Ensuite', as: Tag = 'div', className }: NowStripProps) {
  return (
    <Tag
      className={cn(
        // A slim band: the 16px step, so it never turns into a lozenge.
        'flex flex-col gap-3 rounded-inner border border-z-line bg-z-card px-4 py-3.5 sm:flex-row sm:items-center sm:gap-5 sm:px-5',
        className,
      )}
    >
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="eyebrow">{nowLabel}</span>
        <span className="font-sans text-small font-semibold text-z-fg">{now}</span>
      </p>
      {next != null && (
        <>
          <span aria-hidden="true" className="hidden h-px min-w-6 flex-1 bg-z-mark sm:block sm:max-w-16" />
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-sans text-micro leading-tight font-semibold text-z-muted">{nextLabel}</span>
            <span className="font-sans text-small text-z-soft">{next}</span>
          </p>
        </>
      )}
    </Tag>
  )
}
