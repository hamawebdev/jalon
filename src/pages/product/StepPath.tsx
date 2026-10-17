import type { ReactNode } from 'react'
import { stepDiscClass } from '@/components/brand'
import { cn } from '@/lib/utils'

/** A real step: its own number (« 01 »), a title and a sentence. */
export type PathStep = { index: string; title: ReactNode; text: ReactNode }

/**
 * The rail that joins a step's disc to the next one: 2px with round caps, 8px short of both discs (the order
 * form's stepper speaks the same way). Phones: down the left edge, through the list's 32px row gap. From md: along
 * the row, through the grid gap, at the discs' mid-height. A hairline, not a colour: nothing here is a progress.
 */
const RAIL = [
  'not-last:before:absolute not-last:before:rounded-full not-last:before:bg-hairline-deep',
  'max-md:not-last:before:top-10 max-md:not-last:before:-bottom-6 max-md:not-last:before:left-[15px] max-md:not-last:before:w-0.5',
  'md:not-last:before:top-[15px] md:not-last:before:left-10 md:not-last:before:-right-[calc(var(--spacing-grid)-0.5rem)] md:not-last:before:h-0.5',
].join(' ')

/**
 * Real steps as one path: the kit's 32px step discs joined by a rail, beside their text on phones and in a row of
 * three from md. Shared by the home page (« Comment ça marche ») and the renewal page (« Pour prolonger le bon
 * accès »), so a numbered sequence looks the same wherever it stands; no step carries a rule of its own.
 */
export function StepPath({ steps, className }: { steps: PathStep[]; className?: string }) {
  return (
    <ol className={cn('m-0 grid list-none gap-y-8 p-0 md:grid-cols-3 md:gap-x-grid', className)}>
      {steps.map((s) => (
        <li key={s.index} className={cn('relative grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 md:block', RAIL)}>
          <p className={cn(stepDiscClass.base, stepDiscClass.plain)}>{s.index}</p>
          {/* pt-1: on phones the title's first line is centred on the 32px disc beside it. */}
          <div className="pt-1 md:pt-5 md:pr-4">
            <h3 className="font-display text-title text-z-fg">{s.title}</h3>
            <p className="mt-2 max-w-[44ch] font-sans text-small text-z-soft">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
