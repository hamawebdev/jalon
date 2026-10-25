// « Code Downloader : [ XXXXXX ] » box with a copy button. Only Android cards carry it (brief p. 41, strict rule).
import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useT } from '@/i18n/context'
import { cn } from '@/lib/utils'

export function CodeBox({ code, compact = false, className }: { code: string; compact?: boolean; className?: string }) {
  const t = useT().downloads.hub.card
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-dashed border-primary/35 bg-primary-soft/60',
        compact ? 'px-3 py-2' : 'px-4 py-3',
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{t.codeLabel}</p>
        <p className={cn('font-mono font-bold tracking-[0.18em] text-ink tabular-nums', compact ? 'text-lg' : 'text-2xl')}>
          {code}
        </p>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={t.copyAria(code)}
        className={cn(
          'inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-colors',
          copied
            ? 'border-status bg-status-soft text-status'
            : 'border-primary/30 bg-white text-primary hover:border-primary hover:bg-primary-soft',
        )}
      >
        {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
        <span aria-live="polite">{copied ? t.copied : t.copy}</span>
      </button>
    </div>
  )
}
