// The hero's interactive use-case pills (brief p. 1 and pp. 4–5): toggles with a ✓, in the Monday.com style.
import { Check } from 'lucide-react'
import { useT } from '@/i18n/context'
import { cn } from '@/lib/utils'
import { useStoryNumbers } from './numbers'
import { USE_CASES, type UseCase } from './useCases'

export function UseCasePills({ active, onToggle }: { active: ReadonlySet<UseCase>; onToggle: (id: UseCase) => void }) {
  const t = useT().story
  const n = useStoryNumbers()
  const u = t.hero.useCases
  const labels: Record<UseCase, string> = {
    uptime: u.uptime(n.uptime),
    sport: u.sport,
    vod: u.vod(t.fmt.lead(n.films), t.fmt.lead(n.series)),
    apps: u.apps(n.suite),
    support: u.support(n.supportMinutes),
  }
  return (
    <div role="group" aria-label={t.hero.useCasesLabel} className="flex flex-wrap gap-2.5">
      {USE_CASES.filter((id) => id !== 'apps' || n.suite).map((id) => {
        const on = active.has(id)
        return (
          <button
            key={id}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(id)}
            className={cn(
              'inline-flex min-h-10 max-w-full items-center gap-2 rounded-full border py-2 pr-4 pl-2.5 text-left text-sm font-medium transition-all duration-200 active:scale-[0.98]',
              on
                ? 'border-primary/60 bg-primary-soft text-ink shadow-pill'
                : 'border-line bg-white text-slate hover:border-primary/40 hover:text-ink',
            )}
          >
            <span
              className={cn(
                'grid size-5 shrink-0 place-items-center rounded-full border transition-colors duration-200',
                on ? 'border-primary bg-primary text-white' : 'border-line bg-white text-transparent',
              )}
            >
              <Check className="size-3" strokeWidth={3.5} aria-hidden />
            </span>
            <span>{labels[id]}</span>
          </button>
        )
      })}
    </div>
  )
}
