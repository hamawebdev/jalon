// Page hero = « Suite Applicative Officielle Atlas Pro » (brief pp. 9–11): 50 / 50 split on a #F6F7FB section.
// Left: eyebrow pill, H1 (the page's only h1), description, versions box, compatibility note, 3 key points,
// white compatibility pills. Right: the violet media card.
import { Bot, CalendarDays, Flame, Laptop, MonitorSmartphone, MousePointerClick, Pin, Smartphone, Tv, Zap } from 'lucide-react'
import { Badge, Chip, Container, PillButton } from '@/components/kit'
import { useT } from '@/i18n/context'
import { FACTS } from '@/lib/facts'
import { MediaCard } from './MediaCard'
import { VersionsBox } from './VersionsBox'

const KEY_POINT_ICONS = [Zap, MousePointerClick, CalendarDays]
const COMPAT_ICONS = [Tv, Bot, Flame, Smartphone, Laptop, MonitorSmartphone]

export function SuiteHero({ hubId }: { hubId: string }) {
  const t = useT().downloads.suite
  const { ontv, max } = FACTS.apps
  return (
    <section id="suite-applicative" className="overflow-x-clip bg-mist pb-16 pt-10 sm:pb-24 sm:pt-16">
      <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
        <div className="flex min-w-0 flex-col items-start gap-6">
          <Badge>{t.badge}</Badge>
          <h1 className="text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem]">
            {t.title.ontv} <span className="text-primary">{ontv.version}</span> {t.title.and} {t.title.max}{' '}
            <span className="text-primary">{max.version ? t.title.maxVersion(max.version) : null}</span>
          </h1>
          <p className="max-w-xl text-base text-slate sm:text-lg">{t.description}</p>

          <div className="w-full">
            <VersionsBox />
          </div>

          <p className="flex gap-2.5 rounded-2xl bg-white/70 p-4 text-sm leading-relaxed text-slate ring-1 ring-line">
            <Pin aria-hidden className="mt-0.5 size-4 shrink-0 rotate-45 text-primary" />
            <span>
              <strong className="font-semibold text-ink">{t.noteLabel}</strong> {t.note}
            </span>
          </p>

          <ul className="flex flex-col gap-3">
            {t.keyPoints.map((point, i) => {
              const Icon = KEY_POINT_ICONS[i] ?? Zap
              return (
                <li key={point} className="flex items-center gap-3 font-medium text-ink">
                  <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon aria-hidden className="size-[18px]" />
                  </span>
                  {point}
                </li>
              )
            })}
          </ul>

          <div>
            <ul className="flex flex-wrap gap-2.5" aria-label={t.compatLabel}>
              {t.compat.map((label, i) => {
                const Icon = COMPAT_ICONS[i] ?? Tv
                return (
                  <li key={label}>
                    <Chip icon={<Icon aria-hidden />} className="py-2">
                      {label}
                    </Chip>
                  </li>
                )
              })}
            </ul>
          </div>

          <PillButton href={`#${hubId}`} size="lg" className="mt-1">
            {t.cta}
          </PillButton>
        </div>

        <div className="min-w-0 pb-4 lg:sticky lg:top-28 lg:pl-4 lg:pt-16">
          <MediaCard />
        </div>
      </Container>
    </section>
  )
}
