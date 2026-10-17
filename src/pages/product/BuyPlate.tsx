import type { ReactNode } from 'react'
import {
  CtaButton,
  OldPrice,
  PAYMENT_METHODS_FACT,
  PaymentRow,
  Pending,
  Price,
  SavingChip,
  Tab,
  cardClass,
  checkIconClass,
  iconClass,
  markerShown,
  panelInnerBottomClass,
  slotShown,
} from '@/components/brand'
import type { Cta, IconText, PendingFact } from '@/components/brand'
import { cn } from '@/lib/utils'
import { NB } from './facts-text'

type BuyPlateProps = {
  /** « Notre conseil », on the plans.featured plan only (one tab per page). */
  tab?: string | null
  /** Plan line (« Formule 12 mois », « Renouvellement »). */
  plan: ReactNode
  /** Heading level of the plan line (default h2). */
  as?: 'h2' | 'h3' | 'p'
  /** Formatted price, or `null` while the owner has not given it (renders <Pending>). */
  price: string | null
  pricePending: PendingFact
  /** Struck reference price, only a real one. */
  old?: string | null
  unit?: string | null
  /** Small line under the price block (the tax note). */
  note?: ReactNode
  perMonth?: string | null
  /** Saving chip, only with a real reference price. */
  saving?: string | null
  /** What screen readers hear for the chip instead of its figure (« Économie de 45 %. »). */
  savingSpoken?: string | null
  /** Selector between the price and the CTA (renewal durations, screens). */
  selector?: ReactNode
  /** Inclusions, one column (pending values never wrap well in two). */
  features?: ReactNode[]
  cta: Cta
  /** primary = the view's one filled button (default); secondary when the view already has it (home hero). */
  ctaVariant?: 'primary' | 'secondary'
  guarantees?: IconText[]
  /**
   * How the guarantees stand under the button, always on the card's text column: `list` (default) one per line, for
   * a buy box, whose guarantees are sentences; `row` side by side while they fit, for the short ones of the home
   * offer card (it keeps the first screen's height).
   */
  guaranteesAs?: 'list' | 'row'
  payment?: { label?: string; methods: string[] | null; pending?: PendingFact }
  /** Sticky from lg (product buy box). */
  sticky?: boolean
  className?: string
}

/**
 * The guarantees under the buy button, on the card's text column (the name, the price, the inclusions and the
 * button start on that edge too): an icon and its line, the icon on the line's first row. The label is one inline
 * run, so a pending marker wraps under its words instead of squeezing them into a narrow column beside it (the
 * kit's centred GuaranteeRow lays the words and the marker out as two flex items). Launch mode, as the kit's row:
 * an item whose label is a missing optional fact goes, icon and all; no item, no list.
 */
function Guarantees({ items, as }: { items: IconText[]; as: 'list' | 'row' }) {
  const shown = items.filter((it) => slotShown(it.label, it.pending?.fact))
  if (shown.length === 0) return null
  return (
    <ul
      className={cn(
        'm-0 mt-4 list-none p-0 font-sans text-micro font-medium text-z-body',
        as === 'row' ? 'flex flex-wrap gap-x-5 gap-y-2' : 'grid gap-y-2',
      )}
    >
      {shown.map((it, i) => (
        // In a list the icons and the lines stand on the columns of the inclusions above the button (a 20px tick,
        // then 10px): the 18px glyph is centred in a 20px box.
        <li key={i} className={cn('flex max-w-full', as === 'row' ? 'gap-2' : 'gap-2.5')}>
          {/* The glyph centred on the first line (14px text, a 20px line). */}
          <i className={iconClass(it.icon, cn('mt-px text-[18px] text-z-icon', as === 'list' && 'w-5 text-center'))} aria-hidden="true" />
          <span className="min-w-0">{it.label ?? <Pending what={it.pending?.what ?? 'à préciser'} fact={it.pending?.fact} />}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * Offer card (home hero) and buy box (plan and renewal pages): the kit's sign plate holding the plan, the price,
 * an optional selector, the inclusions, the CTA, the guarantees and the means of payment. Built from kit parts
 * until Recap takes a CTA variant, a note, a selector and one-column features (asked of brand); it carries
 * data-buybar-watch like Recap, so the phone buy bar hides while it is on screen. Never reveal-animated.
 * Everything inside shares one left edge, the tab included (it follows this card's padding, as in the kit's Recap).
 * Launch mode follows the kit's Recap: an empty inclusion list draws nothing, and the payment strip goes with its
 * ground when the methods are a missing optional fact (required today, so the strip keeps its marker).
 */
export function BuyPlate({
  tab,
  plan,
  as: H = 'h2',
  price,
  pricePending,
  old,
  unit,
  note,
  perMonth,
  saving,
  savingSpoken,
  selector,
  features,
  cta,
  ctaVariant = 'primary',
  guarantees,
  guaranteesAs = 'list',
  payment,
  sticky,
  className,
}: BuyPlateProps) {
  // The struck price shows only beside a known price (as in the kit's Price).
  const reference = price != null && old ? old : null
  const chip = saving ? (
    <SavingChip size="lg">
      <span aria-hidden={savingSpoken ? true : undefined}>{saving}</span>
      {savingSpoken && <span className="sr-only">{savingSpoken}</span>}
    </SavingChip>
  ) : null
  return (
    <article data-buybar-watch="" className={cn(cardClass.recap, sticky && 'lg:sticky lg:top-24', className)}>
      {tab && <Tab className="left-5 lg:left-9">{tab}</Tab>}
      <H className="border-b border-hairline pb-5 font-display text-title-lg text-z-fg">{plan}</H>
      {/* With a real reference price: the struck price and its saving chip share the line above the price (the chip
          beside what it compares to, one line less than a chip under the tax note). The price block then reads
          old price and saving, price and unit, per month, tax note. The kit's Price would draw the struck price
          alone on that line, so it is drawn here, with the hidden « Prix : » the kit pairs it with. */}
      {reference && (
        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
          <OldPrice className="text-xl leading-tight">{reference}</OldPrice>
          {chip}
        </p>
      )}
      {reference && <span className="sr-only">Prix{NB}: </span>}
      <Price value={price} pending={pricePending} unit={unit} perMonth={perMonth} size="xl" className={reference ? 'mt-2' : 'mt-5'} />
      {note != null && <p className="mt-2.5 font-sans text-micro font-medium text-z-muted">{note}</p>}
      {chip && !reference && <div className="mt-4">{chip}</div>}
      {selector != null && <div className="mt-6">{selector}</div>}
      {features && features.length > 0 && (
        <ul className="m-0 mt-6 grid list-none gap-y-2.5 p-0 font-sans text-small text-z-body">
          {features.map((f, i) => (
            <li key={i} className="flex gap-2.5">
              <i className={checkIconClass} aria-hidden="true" />
              <span className="min-w-0">{f}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="relative z-[1] mt-6">
        <CtaButton cta={cta} variant={ctaVariant} size="lg" full iconEnd="arrow" className="max-xl:px-4" />
        {guarantees && guarantees.length > 0 && <Guarantees items={guarantees} as={guaranteesAs} />}
      </div>
      {payment && ((payment.methods?.length ?? 0) > 0 || markerShown(payment.pending?.fact ?? PAYMENT_METHODS_FACT)) && (
        // Bleeds to the plate's inner edge: inside its 2px edge the strip's corners are the panel radius minus 2px.
        <div
          className={cn(
            'relative z-[1] -mx-5 mt-6 -mb-6 border-t border-hairline bg-band px-5 py-4 lg:-mx-9 lg:-mb-8 lg:px-9',
            panelInnerBottomClass,
          )}
        >
          <PaymentRow label={payment.label} methods={payment.methods} pending={payment.pending} />
        </div>
      )}
    </article>
  )
}
