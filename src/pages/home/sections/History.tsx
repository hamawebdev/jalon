// Home section: « L'Histoire d'Atlas Pro » timeline (4 cards). Owner: story. Anchor: HOME_ANCHORS.history
// Brief pp. 15–16. Horizontal timeline on desktop, vertical on phones; « Aujourd'hui » stands out, « Futur » is open.
import { Flag, Rocket, Sparkles, Trophy } from 'lucide-react'
import { Highlight, Pending, Reveal, Section, SectionHeader } from '@/components/kit'
import { useT } from '@/i18n/context'
import { HOME_ANCHORS } from '@/i18n/routes'
import { cn } from '@/lib/utils'
import { useStoryNumbers } from '../story/numbers'

export function History() {
  const h = useT().story.history
  const n = useStoryNumbers()

  const steps = [
    { key: 'creation', icon: <Flag />, label: h.creation.label(n.founded), title: h.creation.title, text: h.creation.text },
    {
      key: 'expansion',
      icon: <Rocket />,
      label: h.expansion.label,
      title: h.expansion.title,
      text: n.versions ? h.expansion.text(n.versions.ontvGeneration) : <Pending what="apps.ontv.version" />,
    },
    { key: 'today', icon: <Trophy />, label: h.today.label, title: h.today.title, text: h.today.text, featured: true },
    { key: 'future', icon: <Sparkles />, label: h.future.label, title: h.future.title, text: h.future.text, open: true },
  ]

  return (
    <Section id={HOME_ANCHORS.history}>
      <Reveal>
        <SectionHeader title={h.title} />
      </Reveal>

      <ol className="relative grid gap-6 lg:grid-cols-4 lg:gap-5">
        {/* The line: down the left on phones, across the top on desktop */}
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-5 w-0.5 rounded-full bg-gradient-to-b from-primary via-primary/40 to-primary-soft lg:top-5 lg:right-8 lg:bottom-auto lg:left-8 lg:h-0.5 lg:w-auto lg:bg-gradient-to-r"
        />
        {steps.map((step, i) => (
          <li key={step.key} className="relative pl-16 lg:pt-16 lg:pl-0">
            <Reveal delay={i * 100} className="h-full">
              <span
                aria-hidden
                className={cn(
                  'absolute top-0 left-0 grid size-10 place-items-center rounded-full font-display text-sm font-bold ring-8 ring-canvas lg:left-3',
                  step.open ? 'border-2 border-dashed border-primary bg-canvas text-primary' : 'bg-primary text-white',
                )}
              >
                {i + 1}
              </span>
              <article
                className={cn(
                  'flex h-full flex-col rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-0.5 sm:p-7',
                  step.featured
                    ? 'border-transparent bg-gradient-to-br from-primary to-primary-deep text-white shadow-glow'
                    : step.open
                      ? 'border-dashed border-primary/40 bg-canvas hover:shadow-glow'
                      : 'border-line bg-canvas shadow-card hover:border-primary/30 hover:shadow-glow',
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-bold tracking-wide',
                      step.featured ? 'bg-white/15 text-white' : 'bg-primary-soft text-primary',
                    )}
                  >
                    {step.label}
                  </span>
                  <span aria-hidden className={cn('[&_svg]:size-5', step.featured ? 'text-white/80' : 'text-primary')}>
                    {step.icon}
                  </span>
                </div>
                <h3 className={cn('mt-5 text-xl font-bold tracking-tight', step.featured && 'text-white')}>
                  {step.featured ? step.title : <Highlight text={step.title} />}
                </h3>
                <p className={cn('mt-3 leading-relaxed', step.featured ? 'text-white/85' : 'text-slate')}>{step.text}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
