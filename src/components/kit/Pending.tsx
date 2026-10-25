// A client fact that is still missing. Review mode: a visible « À compléter » marker (with what is missing in its
// title). Launch mode: nothing. Never write a placeholder value instead.
import { useT } from '@/i18n/context'
import { LAUNCH } from '@/lib/mode'
import { cn } from '@/lib/utils'

export function Pending({ what, className }: { what: string; className?: string }) {
  const t = useT()
  if (LAUNCH) return null
  return (
    <span
      data-pending={what}
      title={what}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-dashed border-alert/60 bg-alert-soft px-2.5 py-0.5 align-middle text-xs font-semibold text-alert',
        className,
      )}
    >
      {t.chrome.pending} · {what}
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
