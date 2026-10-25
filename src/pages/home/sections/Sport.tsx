// Home section: « Atlas Pro ON TV & Le Sport en Direct ». Owner: story. Anchor: HOME_ANCHORS.sport
// Brief pp. 16–17: two columns, the text on the left, a square violet card with a football in the middle on the
// right; white pills with indigo icons. Live sport is Full HD 1080p / H.265 — never 4K.
import { CarFront } from 'lucide-react'
import { Chip, Reveal, Section, SectionHeader } from '@/components/kit'
import { useT } from '@/i18n/context'
import { HOME_ANCHORS } from '@/i18n/routes'
import { BasketballIcon, FootballIcon, TennisIcon } from '../story/icons'
import { useStoryNumbers } from '../story/numbers'

export function Sport() {
  const s = useT().story.sport
  const n = useStoryNumbers()
  const pills = [
    { key: 'football', icon: <FootballIcon />, label: s.pills.football },
    { key: 'basketball', icon: <BasketballIcon />, label: s.pills.basketball },
    { key: 'tennis', icon: <TennisIcon />, label: s.pills.tennis },
    { key: 'cars', icon: <CarFront />, label: s.pills.cars },
  ]

  return (
    <Section id={HOME_ANCHORS.sport} bg="mist">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeader as="h3" align="left" title={s.title} className="mb-5 sm:mb-6 [&>h3]:sm:text-4xl [&>h3]:lg:text-[2.75rem] [&>h3]:lg:leading-tight" />
          <p className="text-base leading-relaxed text-slate sm:text-lg">{s.text(n.sportsChannels)}</p>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {pills.map((p) => (
              <li key={p.key}>
                <Chip icon={p.icon} className="min-h-11 px-4 py-2 text-[15px] font-semibold [&_svg]:size-5">
                  {p.label}
                </Chip>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div
            aria-hidden
            className="relative mx-auto aspect-square w-full max-w-[460px] overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-deep shadow-glow"
          >
            {/* Pitch lines */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full text-white/15" fill="none" stroke="currentColor" strokeWidth="0.6">
              <rect x="8" y="8" width="84" height="84" rx="3" />
              <path d="M8 50h84" />
              <circle cx="50" cy="50" r="14" />
              <rect x="30" y="8" width="40" height="14" />
              <rect x="30" y="78" width="40" height="14" />
            </svg>
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-32 place-items-center rounded-full bg-white text-primary shadow-glow sm:size-40">
                <FootballIcon className="size-20 sm:size-24" strokeWidth={1.6} />
              </span>
            </span>
            <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink uppercase shadow-pill">
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-alert motion-safe:animate-ping" />
                <span className="relative size-2 rounded-full bg-alert" />
              </span>
              {s.visual.live}
            </span>
            <span className="absolute top-5 right-5 hidden rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur sm:inline-flex">
              {s.visual.channels(n.sportsChannels)}
            </span>
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-ink/40 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white backdrop-blur">
              {s.visual.quality}
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
