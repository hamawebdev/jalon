// Home section: « Pourquoi Atlas Pro ON TV domine le marché » (6 cards). Owner: story. Anchor: HOME_ANCHORS.why
// Brief pp. 14–15 (replaces the 10 « Points forts » cards of pp. 5–9). Bento: 3 columns, the apps card two rows high.
import type { ReactNode } from 'react'
import { AppWindow, ArrowRight, Euro, Flag, Globe, Headphones, Server } from 'lucide-react'
import { Link } from 'react-router'
import { Card, Highlight, IconTile, Pending, Reveal, Section, SectionHeader } from '@/components/kit'
import { useLang, useT } from '@/i18n/context'
import { homeAnchor, HOME_ANCHORS } from '@/i18n/routes'
import { cn } from '@/lib/utils'
import { useStoryNumbers } from '../story/numbers'

function CardTitle({ children, invert }: { children: string; invert?: boolean }) {
  return (
    <h3 className={cn('mt-5 text-xl font-bold tracking-tight break-words hyphens-auto sm:text-2xl', invert && 'text-white')}>
      {invert ? children : <Highlight text={children} />}
    </h3>
  )
}

function Body({ children, invert }: { children: ReactNode; invert?: boolean }) {
  return <p className={cn('mt-3 leading-relaxed', invert ? 'text-white/80' : 'text-slate')}>{children}</p>
}

export function Why() {
  const t = useT().story
  const w = t.why
  const lang = useLang()
  const n = useStoryNumbers()

  return (
    <Section id={HOME_ANCHORS.why} bg="mist">
      <Reveal>
        <SectionHeader title={w.title} />
      </Reveal>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* 1 · Leader — wide, violet tint */}
        <Reveal className="md:col-span-2">
          <Card className="relative h-full overflow-hidden border-primary/15 bg-primary-soft">
            <span aria-hidden className="pointer-events-none absolute -right-2 -bottom-8 font-display text-[9rem] leading-none font-extrabold text-primary/10 sm:text-[12rem]">
              {w.leader.stamp}
            </span>
            <div className="relative max-w-xl">
              <div className="flex flex-wrap items-center gap-3">
                <IconTile className="bg-white">
                  <Flag />
                </IconTile>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold tracking-wide text-primary uppercase">{w.leader.region}</span>
              </div>
              <CardTitle>{w.leader.title}</CardTitle>
              <Body>{w.leader.text(n.yearsActive)}</Body>
            </div>
          </Card>
        </Reveal>

        {/* 2 · Technology */}
        <Reveal delay={80}>
          <Card className="h-full">
            <IconTile>
              <Server />
            </IconTile>
            <CardTitle>{w.tech.title}</CardTitle>
            <Body>{w.tech.text}</Body>
            <div aria-hidden className="mt-6 flex h-14 items-end gap-1.5">
              {[40, 65, 50, 85, 70, 100, 90].map((h) => (
                <span key={h} className="flex-1 rounded-md bg-gradient-to-t from-primary to-primary-soft" style={{ height: `${h}%` }} />
              ))}
            </div>
          </Card>
        </Reveal>

        {/* 3 · Apps — two rows high on desktop */}
        <Reveal className="lg:row-span-2">
          <Card className="flex h-full flex-col">
            <IconTile>
              <AppWindow />
            </IconTile>
            <CardTitle>{w.apps.title}</CardTitle>
            <Body>
              {n.versions ? w.apps.text(n.versions.ontv, n.versions.max, n.versions.ibo) : <Pending what="apps.*.version" />}
            </Body>
            {n.versions ? (
              <ul className="mt-6 flex flex-col gap-2 lg:mt-auto lg:pt-6">
                {[t.apps.ontv(n.versions.ontv), t.apps.maxFull(n.versions.max), t.apps.iboFull(n.versions.ibo)].map((app, i) => (
                  <li key={app} className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-mist px-4 py-3 text-sm font-semibold text-ink">
                    <span className="flex items-center gap-2.5">
                      <span className={cn('size-2 rounded-full', i === 0 ? 'bg-status' : 'bg-primary')} aria-hidden />
                      {app}
                    </span>
                    <span aria-hidden className="text-xs font-medium text-slate">{w.apps.tag}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </Card>
        </Reveal>

        {/* 4 · World */}
        <Reveal delay={80}>
          <Card className="h-full">
            <IconTile>
              <Globe />
            </IconTile>
            <CardTitle>{w.world.title}</CardTitle>
            <Body>{w.world.text}</Body>
          </Card>
        </Reveal>

        {/* 5 · Support & reviews */}
        <Reveal delay={160}>
          <Card className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-3">
              <IconTile>
                <Headphones />
              </IconTile>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-status-soft px-3 py-1 font-display text-sm font-bold text-ink">
                <span aria-hidden className="size-2 rounded-full bg-status" />
                {w.support.response(n.supportMinutes)}
              </span>
            </div>
            <CardTitle>{w.support.title}</CardTitle>
            <Body>{w.support.text(n.supportMinutes)}</Body>
            <Link
              to={homeAnchor('reviews', lang)}
              className="group/link mt-4 inline-flex min-h-10 items-center gap-1.5 self-start font-semibold text-primary hover:underline"
            >
              {w.support.reviews}
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </Card>
        </Reveal>

        {/* 6 · Value — wide, dark */}
        <Reveal className="md:col-span-2">
          <Card className="relative h-full overflow-hidden border-ink bg-ink sm:flex sm:items-center sm:gap-8">
            <span aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative flex-1">
              <IconTile tone="white">
                <Euro />
              </IconTile>
              <CardTitle invert>{w.value.title}</CardTitle>
              <Body invert>{w.value.text}</Body>
            </div>
            <ul aria-hidden className="relative mt-6 flex flex-wrap gap-2 sm:mt-0 sm:w-44 sm:flex-col">
              {w.value.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-center text-sm font-semibold text-white">
                  {tag}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
