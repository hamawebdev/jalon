// Home section: « Ce Qui Distingue Notre Service Atlas Pro ONTV ! » (6 pillars). Owner: social. Anchor: HOME_ANCHORS.pillars
// Brief pp. 32–33: a bento grid of 6 cards in 2 rows × 3. On large screens the rows use a 4-column grid with one wide
// card each (2 + 1 + 1, then 1 + 1 + 2); on tablets 2 columns; on phones one.
import type { ReactNode } from 'react'
import { BadgeCheck, Crown, Globe, Headphones, Smartphone, Sparkles, Zap } from 'lucide-react'
import { Card, IconTile, Reveal, Section, SectionHeader, WhatsAppButton } from '@/components/kit'
import { useFormat, useT } from '@/i18n/context'
import { HOME_ANCHORS } from '@/i18n/routes'
import { FACTS, type AppId } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { contactMessage } from '@/lib/whatsapp'
import { appLabel } from '../social/apps'

/** The official apps pillar 2 names, in the brief's order. */
const PILLAR_APPS: AppId[] = ['ontv', 'max', 'ibo', 'x9']

function Pillar({
  icon,
  title,
  body,
  className,
  tone = 'white',
  delay,
  children,
}: {
  icon: ReactNode
  title: string
  body: ReactNode
  className?: string
  tone?: 'white' | 'violet'
  delay?: number
  children?: ReactNode
}) {
  const violet = tone === 'violet'
  return (
    <Reveal className={cn('h-full', className)} delay={delay}>
      <Card
        className={cn(
          'group relative flex h-full flex-col gap-5 overflow-hidden',
          violet && 'border-transparent bg-gradient-to-br from-primary to-primary-deep text-white hover:border-transparent',
        )}
      >
        <IconTile
          tone={violet ? 'white' : 'primary'}
          className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
        >
          {icon}
        </IconTile>
        <div className="flex flex-col gap-2.5">
          <h3 className={cn('text-xl font-bold leading-snug break-words hyphens-auto', violet && 'text-white')}>{title}</h3>
          <p className={cn('text-[15px] leading-relaxed break-words hyphens-auto', violet ? 'text-white/85' : 'text-slate')}>{body}</p>
        </div>
        {children}
      </Card>
    </Reveal>
  )
}

/** A large figure at the bottom of a card (the same figure is in the card text: hidden from screen readers). */
function Stat({ children, tone = 'primary' }: { children: ReactNode; tone?: 'primary' | 'status' }) {
  return (
    <p
      aria-hidden
      className={cn(
        'mt-auto font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-4xl xl:text-[2.75rem]',
        tone === 'status' ? 'text-status' : 'text-primary',
      )}
    >
      {children}
    </p>
  )
}

export function Pillars() {
  const t = useT().social.pillars
  const { num } = useFormat()
  const { counts, whatsapp } = FACTS
  const apps = PILLAR_APPS.map((id, i) => appLabel(id, i > 0)).join(', ')
  const uptime = num(counts.uptime)
  const zapping = num(counts.zappingSeconds)
  const minutes = num(counts.supportMinutes)

  return (
    <Section id={HOME_ANCHORS.pillars}>
      <SectionHeader badge={t.badge} title={t.title} subtitle={t.subtitle} />
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* Row 1 */}
        <Pillar
          className="md:col-span-2"
          tone="violet"
          icon={<Crown />}
          title={t.distributor.title}
          body={t.distributor.body}
        >
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-white/10 blur-2xl" />
          <Crown
            aria-hidden
            strokeWidth={1.25}
            className="pointer-events-none absolute -bottom-6 -right-4 size-40 text-white/10 transition-transform duration-500 group-hover:-rotate-6 sm:size-48"
          />
          <p className="relative mt-auto inline-flex w-fit max-w-full items-center gap-2 rounded-2xl bg-white/15 py-1.5 pl-1.5 pr-4 text-sm font-semibold leading-snug text-white">
            <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-primary">
              <BadgeCheck aria-hidden className="size-4" />
            </span>
            <span className="min-w-0">
              {FACTS.brand.seller} · {t.distributor.seal}
            </span>
          </p>
        </Pillar>
        <Pillar delay={80} icon={<Smartphone />} title={t.screens.title} body={t.screens.body(apps)}>
          <ul className="mt-auto flex flex-wrap gap-1.5" aria-hidden>
            {t.screens.devices.map((device) => (
              <li key={device} className="rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-ink/80">
                {device}
              </li>
            ))}
          </ul>
        </Pillar>
        <Pillar delay={160} icon={<Sparkles />} title={t.quality.title} body={t.quality.body}>
          <ol className="mt-auto flex flex-col gap-1.5" aria-hidden>
            {t.quality.ladder.map((step, i) => (
              <li
                key={step}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-semibold',
                  i === 0 && 'w-1/2 bg-mist text-slate',
                  i === 1 && 'w-3/4 bg-primary-soft text-primary',
                  i === 2 && 'w-full bg-primary text-white',
                )}
              >
                {step}
              </li>
            ))}
          </ol>
        </Pillar>

        {/* Row 2 */}
        <Pillar icon={<Globe />} title={t.infra.title} body={t.infra.body(uptime)}>
          {/* Server network status (the brief's status green): a small live indicator in the top-right corner. */}
          <span aria-hidden className="absolute right-6 top-6 flex gap-1.5 rounded-full bg-status-soft px-2.5 py-2 sm:right-8 sm:top-8">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="relative flex size-2">
                <span
                  className="absolute inline-flex size-full rounded-full bg-status opacity-60 motion-safe:animate-ping"
                  style={{ animationDelay: `${i * 350}ms`, animationDuration: '2.4s' }}
                />
                <span className="relative inline-flex size-2 rounded-full bg-status" />
              </span>
            ))}
          </span>
          <Stat tone="status">{t.infra.stat(uptime)}</Stat>
        </Pillar>
        <Pillar delay={80} icon={<Zap />} title={t.zapping.title(zapping)} body={t.zapping.body}>
          <Stat>{t.zapping.stat(zapping)}</Stat>
        </Pillar>
        <Pillar
          delay={160}
          className="md:col-span-2"
          icon={<Headphones />}
          title={t.support.title}
          body={t.support.body(whatsapp.display ?? '', minutes)}
        >
          <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
            <Stat>{t.support.stat(minutes)}</Stat>
            <WhatsAppButton message={contactMessage()}>{t.support.cta}</WhatsAppButton>
          </div>
        </Pillar>
      </div>
    </Section>
  )
}
