// A client fact that is still missing. Review mode: a visible « À compléter » marker (with what is missing in its
// title). Launch mode: nothing. Never write a placeholder value instead.
import { useLang, useT } from '@/i18n/context'
import { LAUNCH } from '@/lib/mode'
import { cn } from '@/lib/utils'

export function Pending({ what, className }: { what: string; className?: string }) {
  const t = useT()
  const lang = useLang()
  if (LAUNCH) return null
  // `what` is written for the client, in French: it is spelled out on French pages only. Elsewhere the marker shows
  // its translated label, and the detail stays in the tooltip.
  return (
    <span
      data-pending={what}
      title={what}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-dashed border-alert/60 bg-alert-soft px-2.5 py-0.5 align-middle text-xs font-semibold text-alert',
        className,
      )}
    >
      {lang === 'fr' ? `${t.chrome.pending} · ${what}` : t.chrome.pending}
    </span>
  )
}

/** Renders `children(value)` when the fact is there, the marker in review mode when it is not, nothing in launch. */
export function Fact<T>({
  value,
  what,
  children,
}: {
  value: T | null | undefined
  what: string
  children: (value: T) => React.ReactNode
}) {
  if (value == null || value === '') return <Pending what={what} />
  return <>{children(value)}</>
}
