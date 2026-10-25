// « Bandeau de Réassurance Post-Tarifs » (brief p. 22): easy renewal (WhatsApp), fast activation, guarantee.
// Owner: pricing.
import { RefreshCw, ShieldCheck, Zap } from 'lucide-react'
import { IconTile, WhatsAppButton } from '@/components/kit'
import { useFormat, useT } from '@/i18n/context'
import { PLANS } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { renewalMessage } from '@/lib/whatsapp'

export function ReassuranceBand({ className }: { className?: string }) {
  const t = useT()
  const r = t.pricing.reassurance
  const { num } = useFormat()
  const months = num(Math.max(...PLANS.map((p) => p.months)))

  const items = [
    { key: 'renewal', icon: RefreshCw, title: r.renewal.title, text: r.renewal.text, renewal: true },
    { key: 'activation', icon: Zap, title: r.activation.title, text: r.activation.text, renewal: false },
    { key: 'guarantee', icon: ShieldCheck, title: r.guarantee.title, text: r.guarantee.text(months), renewal: false },
  ]

  return (
    <ul
      aria-label={r.label}
      className={cn(
        'grid divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white shadow-card md:grid-cols-3 md:divide-x md:divide-y-0',
        className,
      )}
    >
      {items.map(({ key, icon: Icon, title, text, renewal }) => (
        <li key={key} className="flex flex-col gap-3 p-6 sm:p-7">
          <IconTile>
            <Icon />
          </IconTile>
          <h3 className="text-lg font-bold leading-snug">{title}</h3>
          <p className="text-[15px] text-slate">{text}</p>
          {renewal ? (
            <WhatsAppButton message={renewalMessage()} variant="ghost" size="md" arrow wrap className="-ml-4 mt-auto max-w-[calc(100%+1rem)] self-start text-left">
              {r.renewal.cta}
            </WhatsAppButton>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
