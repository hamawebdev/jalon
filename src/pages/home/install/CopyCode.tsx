// A Downloader code with a copy button. The clipboard is touched only in the click handler.
import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useT } from '@/i18n/context'
import { cn } from '@/lib/utils'

export function CopyButton({
  code,
  label,
  compact = false,
  className,
}: {
  code: string
  label: string
  /** Icon only on phones. */
  compact?: boolean
  className?: string
}) {
  const t = useT().install.apps
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      // Older browsers or a denied permission: select nothing, the code stays readable on screen.
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <>
    <button
      type="button"
      onClick={onCopy}
      aria-label={label}
      className={cn(
        'inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-colors',
        copied
          ? 'border-status/40 bg-status-soft text-ink'
          : 'border-primary/25 bg-white text-primary hover:border-primary hover:bg-primary-soft',
        className,
      )}
    >
      {copied ? <Check aria-hidden className="size-4 text-status" /> : <Copy aria-hidden className="size-4" />}
      <span aria-hidden className={compact ? 'max-sm:sr-only' : undefined}>
        {copied ? t.copied : t.copy}
      </span>
    </button>
    <span role="status" className="sr-only">
      {copied ? t.copied : ''}
    </span>
    </>
  )
}

/** Big code box of the app cards. */
export function CodeBox({ code, label, copyLabel }: { code: string; label: string; copyLabel: string }) {
  return (
    <div className="@container flex flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-2xl border border-dashed border-primary/30 bg-primary-soft/60 py-3 pr-3 pl-4">
      <div>
        <p className="text-[11px] font-bold tracking-wider text-slate uppercase">{label}</p>
        <p className="font-mono text-2xl leading-tight font-bold tracking-[0.1em] text-primary @[18rem]:text-[1.65rem] @[18rem]:tracking-[0.12em] @[22rem]:text-3xl">
          {code}
        </p>
      </div>
      <CopyButton code={code} label={copyLabel} />
    </div>
  )
}
