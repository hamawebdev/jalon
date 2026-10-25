// « Barre de Confiance & Paiement » (brief p. 22), right under the pricing cards. Payment marks: only the methods of
// FACTS.payment (PayPal, SEPA bank transfer). The brief's strict rule: never a Visa / Mastercard / card mark. Owner: pricing.
import { Lock, ShieldCheck, Zap } from 'lucide-react'
import { useFormat, useT } from '@/i18n/context'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'

export function TrustBar({ className }: { className?: string }) {
  const t = useT()
  const tr = t.pricing.trust
  const { percent } = useFormat()
  const items = [
    { icon: Lock, text: tr.secure(percent(100)) },
    { icon: Zap, text: tr.instant },
    { icon: ShieldCheck, text: tr.protected(percent(100)) },
  ]
  const methods = FACTS.payment.methods ?? []

  return (
    <div
      role="group"
      aria-label={tr.label}
      className={cn(
        'flex flex-col items-center gap-4 rounded-3xl border border-line bg-white px-5 py-5 shadow-card lg:flex-row lg:justify-between lg:gap-6 lg:rounded-full lg:px-8 lg:py-4',
        className,
      )}
    >
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
        {items.map(({ icon: Icon, text }) => (
          <li key={text} className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
            <Icon aria-hidden className="size-4.5 shrink-0 text-primary" />
            {text}
          </li>
        ))}
      </ul>
      {methods.length ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm font-medium text-slate">{tr.payment}</span>
          {methods.map((method) => (
            <span
              key={method}
              className="rounded-full border border-line bg-mist px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-ink"
            >
              {tr.methods[method]}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
