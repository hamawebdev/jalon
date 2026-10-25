// The 4 technical questions under the hub (disclosure buttons; answers stay in the HTML with `hidden`).
import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useT } from '@/i18n/context'
import { cn } from '@/lib/utils'
import { Rich } from './Rich'

export function TechQuestions() {
  const t = useT().install.questions
  const base = useId()
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mt-16 sm:mt-24">
      <h3 className="mb-6 text-center text-2xl font-bold tracking-tight sm:mb-8 sm:text-3xl">{t.title}</h3>
      <div className="mx-auto max-w-4xl space-y-3">
        {t.items.map((item, i) => {
          const expanded = open === i
          const button = `${base}-q${i}`
          const panel = `${base}-a${i}`
          return (
            <div
              key={i}
              className={cn(
                'rounded-3xl border bg-white transition-shadow duration-200',
                expanded ? 'border-primary/30 shadow-glow' : 'border-line shadow-pill',
              )}
            >
              <h4 className="text-base font-semibold sm:text-[17px]">
                <button
                  id={button}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panel}
                  onClick={() => setOpen(expanded ? null : i)}
                  className="flex w-full items-start gap-3 rounded-3xl px-5 py-4 text-left leading-snug sm:px-6 sm:py-5"
                >
                  <span className="mt-0.5 font-display text-sm font-bold text-primary">{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1 text-ink">
                    <Rich text={item.q} />
                  </span>
                  <span
                    className={cn(
                      'inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-200',
                      expanded ? 'rotate-180 bg-primary text-white' : 'bg-primary-soft text-primary',
                    )}
                  >
                    <ChevronDown aria-hidden className="size-4" />
                  </span>
                </button>
              </h4>
              <div
                id={panel}
                role="region"
                aria-labelledby={button}
                hidden={!expanded}
                className="px-5 pb-5 sm:pr-16 sm:pb-6 sm:pl-[3.75rem]"
              >
                <p className="text-[15px] leading-relaxed text-ink/85 sm:text-base">
                  <Rich text={item.a} />
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
