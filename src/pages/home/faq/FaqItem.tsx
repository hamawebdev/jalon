// One question: a real <button aria-expanded> with a + / × toggle (Monday.com style). The answer stays in the HTML
// when closed (hidden attribute), so search engines and the prerendered page have it.
import type { ReactNode } from 'react'
import { Plus, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FaqItem({
  id,
  question,
  icon: Icon,
  open,
  onToggle,
  children,
}: {
  id: string
  question: string
  icon: LucideIcon
  open: boolean
  onToggle: () => void
  children: ReactNode
}) {
  const base = `faq-${id}`
  return (
    <li
      id={base}
      className={cn(
        'scroll-mt-28 rounded-3xl border transition-[background-color,border-color,box-shadow] duration-300',
        open ? 'border-primary/30 bg-white shadow-glow' : 'border-transparent bg-mist hover:border-primary/25 hover:bg-white',
      )}
    >
      <h3 className="text-[15px] leading-snug font-semibold sm:text-[17px]">
        <button
          type="button"
          id={`${base}-q`}
          aria-expanded={open}
          aria-controls={`${base}-a`}
          onClick={onToggle}
          className="group/faq flex w-full items-start gap-3 rounded-3xl p-4 text-left sm:gap-4 sm:p-5"
        >
          <span
            aria-hidden
            className={cn(
              'inline-flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors sm:size-10 [&_svg]:size-[18px] sm:[&_svg]:size-5',
              open ? 'bg-primary text-white' : 'bg-primary-soft text-primary',
            )}
          >
            <Icon />
          </span>
          <span className="min-w-0 flex-1 pt-1.5 sm:pt-2">{question}</span>
          <span
            aria-hidden
            className={cn(
              'mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:mt-1',
              open
                ? 'border-primary bg-primary text-white'
                : 'border-line bg-white text-ink group-hover/faq:border-primary group-hover/faq:text-primary',
            )}
          >
            <Plus className={cn('size-4 transition-transform duration-300', open && 'rotate-45')} strokeWidth={2.5} />
          </span>
        </button>
      </h3>
      <div
        id={`${base}-a`}
        hidden={!open}
        className="px-4 pb-5 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 sm:pr-16 sm:pb-6 sm:pl-[4.75rem]"
      >
        {children}
      </div>
    </li>
  )
}
