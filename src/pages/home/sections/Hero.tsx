// Home section: hero with eyebrow pill, H1, subtitle, use-case pills, CTA, micro-guarantees, stats. Owner: story. Anchor: HOME_ANCHORS.hero
// Brief: v2 (pp. 13–14) gives the badge, H1, subtitle and the 4 stats; v1 (pp. 4–5) the pills, CTA and guarantees.
import { useState } from 'react'
import { Activity, Clapperboard, Star, Tv } from 'lucide-react'
import { Link } from 'react-router'
import { Card, IconTile, PillButton, Reveal, Section, SectionHeader, WhatsAppButton } from '@/components/kit'
import { useLang, useT } from '@/i18n/context'
import { homeAnchor, HOME_ANCHORS } from '@/i18n/routes'
import { activateMessage } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'
import { HeroVisual } from '../story/HeroVisual'
import { useStoryNumbers, WRAP_PILL } from '../story/numbers'
import { INITIAL_USE_CASES, type UseCase } from '../story/useCases'
import { UseCasePills } from '../story/UseCasePills'

export function Hero() {
  const t = useT().story
  const lang = useLang()
  const n = useStoryNumbers()
  const [active, setActive] = useState<ReadonlySet<UseCase>>(() => new Set(INITIAL_USE_CASES))
  const toggle = (id: UseCase) =>
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const stats = [
    { key: 'channels', icon: <Tv />, value: t.fmt.plus(n.channels), label: t.hero.stats.channels },
    { key: 'titles', icon: <Clapperboard />, value: t.fmt.plus(n.films), label: t.hero.stats.titles },
    { key: 'customers', icon: <Star />, value: t.fmt.thousands(n.customersK), label: t.hero.stats.customers, to: homeAnchor('reviews', lang) },
    { key: 'uptime', icon: <Activity />, value: n.uptime, label: t.hero.stats.uptime, live: true },
  ]

  return (
    <Section
      id={HOME_ANCHORS.hero}
      className="relative overflow-hidden bg-[radial-gradient(70%_60%_at_85%_0%,var(--color-primary-soft),transparent_70%)] pt-10 sm:pt-16"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <Reveal>
          <SectionHeader as="h1" align="left" badge={t.hero.badge} title={t.hero.title} subtitle={t.hero.subtitle} className="mb-8 sm:mb-8" />
          <UseCasePills active={active} onToggle={toggle} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton message={activateMessage()} variant="primary" size="lg" className={WRAP_PILL}>
              {t.hero.cta}
            </WhatsAppButton>
            <PillButton to={homeAnchor('pricing', lang)} variant="ghost" size="lg" arrow>
              {t.hero.pricingLink}
            </PillButton>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-slate">
            {t.hero.guarantees.map((g) => (
              <li key={g} className="inline-flex items-center gap-1.5">
                <span aria-hidden className="text-primary">
                  ✦
                </span>
                {g}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <HeroVisual active={active} />
        </Reveal>
      </div>

      <ul className="mt-14 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-4 lg:grid-cols-4">
        {stats.map((s, i) => {
          const body = (
            <>
              <IconTile className="size-10 rounded-xl [&_svg]:size-5">{s.icon}</IconTile>
              <span className="mt-4 flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-4xl">
                {s.value}
                {s.live ? (
                  <span aria-hidden className="relative flex size-2.5">
                    <span className="absolute inset-0 rounded-full bg-status motion-safe:animate-ping" />
                    <span className="relative size-2.5 rounded-full bg-status" />
                  </span>
                ) : null}
              </span>
              <span className="mt-1 text-sm leading-snug text-slate">{s.label}</span>
            </>
          )
          return (
            <li key={s.key}>
              <Reveal delay={i * 80} className="h-full">
                {s.to ? (
                  <Card as={Link} to={s.to} className={cn('flex h-full flex-col p-5 sm:p-6')}>
                    {body}
                  </Card>
                ) : (
                  <Card className="flex h-full flex-col p-5 sm:p-6">{body}</Card>
                )}
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
