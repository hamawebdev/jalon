// One reseller panel card (brief pp. 45–47): title, logo slot, price zone WITHOUT a price, the 7 features, the violet
// WhatsApp button with the brief's message, the micro-guarantee. Owner: pages.
import type { ReactNode } from 'react'
import { Clapperboard, Headphones, MessageCircle, MonitorSmartphone, Rewind, ShieldCheck, Sparkles, Tv, Wrench, Zap } from 'lucide-react'
import { WhatsAppButton } from '@/components/kit'
import { useFormat, useT } from '@/i18n/context'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { resellerMessage } from '@/lib/whatsapp'
import { PanelMonogram } from './PanelMonogram'

export function PanelCard({ codes, featured = false }: { codes: number; featured?: boolean }) {
  const t = useT().reseller.panels
  const { num } = useFormat()
  const c = FACTS.counts
  const n = num(codes)

  const features: { icon: ReactNode; text: string; strong?: boolean }[] = [
    { icon: <MonitorSmartphone />, text: t.features.codes(n), strong: true },
    { icon: <Tv />, text: t.features.channels(num(c.channels)) },
    { icon: <Clapperboard />, text: t.features.vod(num(c.vodTitles)) },
    { icon: <Rewind />, text: t.features.replay(num(c.replayDays)) },
    { icon: <Wrench />, text: t.features.service },
    { icon: <Zap />, text: t.features.delivery },
    { icon: <Headphones />, text: t.features.support },
  ]

  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-3xl border bg-white p-5 transition-all duration-300 sm:p-7',
        featured
          ? 'border-2 border-primary shadow-glow lg:-my-4 lg:py-11'
          : 'border-line shadow-card hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-glow',
      )}
    >
      {featured ? (
        <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gold px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-pill">
          <Sparkles aria-hidden className="size-3.5" />
          {t.featured}
        </span>
      ) : null}

      <div className="flex items-center gap-3">
        <PanelMonogram />
        <p className="text-sm font-semibold text-slate">{t.logoLabel}</p>
      </div>
      <h3 className="mt-5 text-xl font-extrabold leading-tight tracking-tight">{t.title(n)}</h3>

      <div className={cn('mt-6 rounded-2xl p-4', featured ? 'bg-primary-soft' : 'bg-mist')}>
        <p className="text-sm font-bold text-primary">{t.priceLabel}</p>
        <p className="mt-1 font-display text-base font-semibold leading-snug text-ink">{t.priceText}</p>
        <p className="text-sm text-slate">{t.priceNote}</p>
      </div>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {features.map((f) => (
          <li key={f.text} className="flex items-start gap-3 text-[15px] leading-snug">
            <span className="mt-px inline-flex size-6 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary [&_svg]:size-3.5">
              {f.icon}
            </span>
            <span className={cn(f.strong ? 'font-bold text-ink' : 'text-ink/85')}>{f.text}</span>
          </li>
        ))}
      </ul>

      <WhatsAppButton
        message={resellerMessage(codes)}
        variant="primary"
        icon={<MessageCircle />}
        className="mt-7 h-auto min-h-12 w-full px-4 py-3 text-center [&_.truncate]:overflow-visible [&_.truncate]:whitespace-normal"
      >
        {t.cta}
      </WhatsAppButton>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold text-ink">
        <ShieldCheck aria-hidden className="size-4 text-status" />
        {t.guarantee}
      </p>
    </article>
  )
}
