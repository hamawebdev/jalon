// Revendeur: « Devenir Revendeur Officiel Atlas Pro ONTV », 3 panels without prices (brief pp. 45–47). Owner: pages.
// Never show a reseller price: every panel button opens WhatsApp with the brief's message (resellerMessage).
import type { ReactNode } from 'react'
import { Check, Gauge, Handshake, Headphones, LayoutDashboard, MonitorSmartphone, MousePointerClick, ShieldCheck } from 'lucide-react'
import { PageMeta } from '@/components/site/PageMeta'
import { Badge, Card, Container, Highlight, IconTile, PillButton, Reveal, Section, SectionHeader, WhatsAppButton } from '@/components/kit'
import { useFormat, useT } from '@/i18n/context'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { resellerMessage } from '@/lib/whatsapp'
import { PanelCard } from './revendeur/PanelCard'

const PANELS_ID = 'panels'

export default function Revendeur() {
  return (
    <>
      <PageMeta page="revendeur" />
      <Hero />
      <WhyPanel />
      <FinalCta />
    </>
  )
}

function useUptime() {
  const { percent } = useFormat()
  return percent(FACTS.counts.uptime)
}

function Hero() {
  const t = useT().reseller
  const uptime = useUptime()
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-soft/70 via-canvas to-canvas pt-14 pb-20 sm:pt-20 sm:pb-28">
      {/* Soft violet glow behind the heading */}
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[56rem] max-w-[200%] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge>
            <Handshake aria-hidden className="size-4" />
            {t.hero.badge}
          </Badge>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            <Highlight text={t.hero.title} />
          </h1>
          <p className="mt-6 text-base leading-relaxed text-slate sm:text-lg">{t.hero.description(uptime)}</p>
          <ul className="mt-7 flex flex-wrap justify-center gap-2">
            {t.hero.points.map((point) => (
              <li
                key={point}
                className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-left text-[13px] font-medium text-ink shadow-pill sm:text-sm"
              >
                <Check aria-hidden className="size-4 shrink-0 text-status" />
                {point}
              </li>
            ))}
          </ul>
          <PillButton href={`#${PANELS_ID}`} variant="secondary" className="mt-8">
            {t.hero.seePanels}
          </PillButton>
        </div>

        <ul
          id={PANELS_ID}
          aria-label={t.panels.label}
          className="mx-auto mt-16 grid max-w-md scroll-mt-4 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:gap-6"
        >
          {FACTS.resellerPanels.map((codes, i) => (
            <li key={codes} className={cn(codes === FACTS.resellerFeaturedPanel && 'lg:z-10')}>
              <Reveal delay={i * 80} className="h-full">
                <PanelCard codes={codes} featured={codes === FACTS.resellerFeaturedPanel} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function WhyPanel() {
  const t = useT().reseller.why
  const uptime = useUptime()
  const items: { key: string; icon: ReactNode; title: string; text: string }[] = [
    { key: 'autonomous', icon: <LayoutDashboard />, ...t.items.autonomous },
    { key: 'oneClick', icon: <MousePointerClick />, ...t.items.oneClick },
    { key: 'apps', icon: <MonitorSmartphone />, ...t.items.apps },
    { key: 'support', icon: <Headphones />, ...t.items.support },
  ]
  return (
    <Section bg="mist">
      <SectionHeader badge={t.badge} title={t.title} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* The stability card: the big number, on violet */}
        <Reveal className="md:col-span-2 lg:row-span-2 lg:col-span-1">
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-deep p-7 text-white shadow-glow sm:p-9">
            <div aria-hidden className="pointer-events-none absolute -right-16 -bottom-16 size-56 rounded-full bg-white/10 blur-2xl" />
            <IconTile tone="white">
              <Gauge />
            </IconTile>
            <div className="relative mt-10">
              <p className="font-display text-6xl font-extrabold tracking-tight whitespace-nowrap sm:text-7xl lg:text-5xl xl:text-6xl">{uptime}</p>
              <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{t.items.uptime.title}</h3>
              <p className="mt-2 text-white/80">{t.items.uptime.text}</p>
            </div>
          </div>
        </Reveal>
        {items.map((item, i) => (
          <Reveal key={item.key} delay={(i + 1) * 60}>
            <Card className="h-full">
              <IconTile>{item.icon}</IconTile>
              <h3 className="mt-5 text-lg font-bold leading-snug sm:text-xl">
                <Highlight text={item.title} />
              </h3>
              <p className="mt-2 text-slate">{item.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function FinalCta() {
  const t = useT().reseller.cta
  const { num } = useFormat()
  return (
    <Section bg="primary" className="relative overflow-hidden">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">{t.title}</h2>
        <p className="mt-4 text-base text-white/85 sm:text-lg">{t.text}</p>
        <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
          {FACTS.resellerPanels.map((codes) => (
            <WhatsAppButton
              key={codes}
              message={resellerMessage(codes)}
              variant={codes === FACTS.resellerFeaturedPanel ? 'gold' : 'white'}
              size="lg"
            >
              {t.button(num(codes))}
            </WhatsAppButton>
          ))}
        </div>
        <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90">
          <ShieldCheck aria-hidden className="size-4" />
          {t.guarantee}
        </p>
      </div>
    </Section>
  )
}
