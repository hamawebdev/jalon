import { cn } from '@/lib/utils'
import { markerClass } from './recipes'

const MARKER_SIZE = {
  6: 'size-1.5',
  8: 'size-2',
  10: 'size-2.5',
  14: 'size-3.5',
} as const

type MarkerProps = {
  /** Side in px (default 8, the eyebrow square). */
  size?: keyof typeof MARKER_SIZE
  className?: string
}

/**
 * The square, « le jalon »: signal yellow inside a 1px ink keyline on light, plain yellow on Nuit (zone keyline).
 * Marks what matters: list markers, a dot marker in a row, the current page. Decorative (aria-hidden).
 * Square corners whatever rounds around it: never round, never rotated, never another colour.
 */
export function Marker({ size = 8, className }: MarkerProps) {
  return <span aria-hidden="true" className={cn(markerClass, MARKER_SIZE[size], className)} />
}
