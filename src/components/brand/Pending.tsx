import { cn } from '@/lib/utils'
import { pendingClass } from './recipes'
import { markerShown } from './scope'

type PendingProps = {
  /** What is missing, short and in French: "délai d’activation", "prix". Rendered after « À compléter · ». */
  what: string
  /**
   * The fact's key in facts ('support.hours', 'plans.p12.price'), rendered as data-pending (QA counts them). It
   * also decides launch mode: a required fact keeps its marker, an optional one renders nothing. Always pass it:
   * without a key the marker shows in both modes and data-pending falls back to `what`.
   */
  fact?: string
  /** inline (default) inside a sentence; block on its own line (price slots, tables, cards). */
  variant?: 'inline' | 'block'
  className?: string
}

/** Markers already reported on the dev server as lacking a facts key (one warning each). */
const keyless = new Set<string>()

/**
 * Visible, calm marker for a fact the owner has not given yet (README rule 7). Never styled as a real figure:
 * mono 14px on a pale ground with a dashed border, whatever its parent's size. It is read aloud as written.
 * Where JSX cannot go (title, meta, aria-label, cart line names), use pendingText() from identity.ts.
 *
 * Launch mode (APPROVAL §2c): the marker of a required fact stays; an optional fact renders nothing, not even an
 * empty element. What stood around it (a label, a unit, the sentence) is the caller's to remove: wrap the unit in
 * <FactScope>, or decide with inScope() / scoped().
 */
export function Pending({ what, fact, variant = 'inline', className }: PendingProps) {
  if (import.meta.env.DEV && fact == null && !keyless.has(what)) {
    keyless.add(what)
    console.warn(`[brand kit] <Pending what="${what}"> has no facts key: its marker stays in launch mode. Pass fact="…".`)
  }
  if (!markerShown(fact)) return null
  return (
    <span data-pending={fact ?? what} className={cn(pendingClass.inline, variant === 'block' && pendingClass.block, className)}>
      À compléter&nbsp;· {what}
    </span>
  )
}
