import { stepDiscClass } from '@/components/brand'
import { cn } from '@/lib/utils'

// Step 1 is the plan the buyer chose on its page: the buy buttons open this form directly (chrome orderPlan), so no
// cart screen stands between the two.
const STEPS = ['Formule', 'Coordonnées et paiement', 'Confirmation'] as const
const STATE_TEXT = { done: 'terminée', current: 'en cours', todo: 'à venir' } as const

/**
 * checkout-steps: the three steps of an order. Real step numbers, so the kit's 32px discs (done: blue tint, Bleu
 * repère edge and a check; current: Bleu repère with a white numeral; to come: white with a 3:1 edge). The connector
 * has round caps: Bleu repère along the path already taken, hairline-strong ahead. `current` is 1-based.
 * On phones the three steps share the width, the labels sit under the discs at 14px (at 15px « Coordonnées » touches
 * « Confirmation » on a 320px screen) and each connector stops 8px short of its two discs. From md up a step is as
 * wide as its content, which keeps its label on one line while the row has room, and the two connectors share the
 * width that is left, so they are the same length.
 * A third of the row must hold the longest word (« Coordonnées », 5.25 times the root size) with 8px of air on each
 * side. Below a 17.25rem row, which a larger text setting reaches on a phone (320px at 18px, 360px at 20px), the
 * three labels would touch: the discs stay, and one line under them names the current step (« Étape 2 sur 3 :
 * Coordonnées et paiement »). The list keeps every label for assistive technology; that line is for the eye only.
 */
export function CheckoutSteps({ current }: { current: 2 | 3 }) {
  return (
    <div className="@container w-full max-w-[640px]">
      <ol aria-label="Étapes de la commande" className="grid w-full grid-cols-3 md:flex md:items-center md:gap-4">
        {STEPS.map((label, i) => {
          const n = i + 1
          const state = n < current ? 'done' : n === current ? 'current' : 'todo'
          return (
            <li
              key={label}
              aria-current={state === 'current' ? 'step' : undefined}
              className={cn(
                'relative flex flex-col items-center gap-2.5 text-center md:flex-auto md:flex-row md:gap-3 md:text-start md:last:flex-none',
                // 15px: the middle of the 32px disc, less half of the 2px line. 24px: half a disc and the 8px of air.
                'max-md:not-first:before:absolute max-md:not-first:before:top-[15px] max-md:not-first:before:right-[calc(50%+24px)] max-md:not-first:before:left-[calc(-50%+24px)] max-md:not-first:before:h-0.5 max-md:not-first:before:rounded-full',
                'md:not-last:after:block md:not-last:after:h-0.5 md:not-last:after:min-w-6 md:not-last:after:flex-1 md:not-last:after:rounded-full',
                // `not-first` here too: a colour alone would give step 1 an empty ::before, a flex item that costs one gap.
                n <= current ? 'max-md:not-first:before:bg-nuit-700' : 'max-md:not-first:before:bg-hairline-strong',
                n < current ? 'md:after:bg-nuit-700' : 'md:after:bg-hairline-strong',
              )}
            >
              <span aria-hidden="true" className={cn('relative z-[1]', stepDiscClass.base, stepDiscClass[state])}>
                {state === 'done' ? <i className="ti ti-check text-[16px]" /> : n}
              </span>
              <span
                className={cn(
                  'font-sans text-micro md:text-meta @max-[17.25rem]:sr-only',
                  state === 'current' ? 'font-semibold text-ink' : 'font-medium text-ink-soft',
                )}
              >
                {label}
                <span className="sr-only">, {STATE_TEXT[state]}</span>
              </span>
            </li>
          )
        })}
      </ol>
      <p aria-hidden="true" className="mt-2.5 hidden text-center font-sans text-micro text-balance @max-[17.25rem]:block">
        <span className="font-medium text-ink-soft">Étape {current} sur {STEPS.length}&nbsp;: </span>
        <span className="font-semibold text-ink">{STEPS[current - 1]}</span>
      </p>
    </div>
  )
}
