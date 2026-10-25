// Home section: « VOD Atlas Pro ONTV (Films & Séries) » with 8 categories. Owner: story. Anchor: HOME_ANCHORS.vod
// Brief pp. 16–17: two columns, a dark violet square card with a cinema icon on the left, the text and the grid of
// 8 categories (white cards, violet numbers) on the right. 4K applies to VOD only. Platforms: alluded to, never named.
import { Check, Clapperboard } from 'lucide-react'
import { Pending, Reveal, Section, SectionHeader } from '@/components/kit'
import { useFormat, useT } from '@/i18n/context'
import { HOME_ANCHORS } from '@/i18n/routes'
import { FACTS } from '@/lib/facts'
import { useStoryNumbers } from '../story/numbers'

const CATEGORY_ORDER = ['action', 'comedy', 'drama', 'scifi', 'horror', 'romance', 'animation', 'documentary'] as const

export function Vod() {
  const t = useT().story
  const v = t.vod
  const { num } = useFormat()
  const n = useStoryNumbers()

  const checks = [
    n.versions ? v.checks.quality(t.apps.ontv(n.versions.ontv)) : null,
    v.checks.subtitles,
    v.checks.daily,
    v.checks.compat,
  ]

  return (
    <Section id={HOME_ANCHORS.vod}>
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal delay={120} className="order-2 lg:order-1">
          <div
            aria-hidden
            className="relative mx-auto flex aspect-square w-full max-w-[440px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-ink via-ink to-primary-deep p-6 text-white shadow-glow sm:p-8"
          >
            <span className="absolute -right-20 -bottom-20 size-72 rounded-full bg-primary/40 blur-3xl" />
            {/* Film strip */}
            <span className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 -rotate-6 gap-2 opacity-20">
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} className="aspect-[2/3] w-16 shrink-0 rounded-md border-2 border-white" />
              ))}
            </span>
            <span className="relative self-start rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wide">{v.visual.quality}</span>
            <span className="relative grid place-items-center">
              <span className="grid size-28 place-items-center rounded-3xl bg-primary shadow-glow sm:size-32">
                <Clapperboard className="size-14 sm:size-16" strokeWidth={1.6} />
              </span>
            </span>
            <span className="relative">
              <span className="block font-display text-2xl font-bold">{v.visual.episodes(t.fmt.lead(n.episodes))}</span>
              <span className="mt-1 block text-sm text-white/70">{v.visual.allusion}</span>
            </span>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <SectionHeader as="h3" align="left" title={v.title} className="mb-5 sm:mb-6 [&>h3]:sm:text-4xl [&>h3]:lg:text-[2.75rem] [&>h3]:lg:leading-tight" />
          <p className="text-base leading-relaxed text-slate sm:text-lg">{v.text(n.films, n.series)}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {checks.map((c, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[15px] font-medium text-ink">
                <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-status-soft text-status">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {c ?? <Pending what="apps.ontv.version" />}
              </li>
            ))}
          </ul>

          <ul aria-label={v.categoriesLabel} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {CATEGORY_ORDER.map((key) => (
              <li
                key={key}
                className="rounded-2xl border border-line bg-white px-4 py-3.5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-glow"
              >
                <span className="block font-display text-xl font-bold text-primary">{t.fmt.plus(num(FACTS.counts.vodCategories[key]))}</span>
                <span className="block text-sm font-medium break-words hyphens-auto text-slate">{v.categories[key]}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
