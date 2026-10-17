import type { ReactNode, Ref } from 'react'
import { cn } from '@/lib/utils'
import { CtaButton } from './Button'
import { SavingChip, Tab } from './Labels'
import { Pending } from './Pending'
import { GuaranteeRow, InfoRow, OldPrice, PaymentRow, Price, PriceLabel } from './Price'
import { PAYMENT_METHODS_FACT, cardClass, checkIconClass, panelInnerBottomClass } from './recipes'
import { slotShown } from './scope'
import { ChannelMosaic } from './Screens'
import type { Cta, IconName, IconText, PendingFact } from './types'

type RecapProps = {
  /** Tab text (« Notre conseil »), only if the content has one. */
  tab?: string | null
  plan: string
  /** Reference price, only if real (owner fact). */
  old?: string | null
  /** Plan price (facts). `null` = not given yet: renders <Pending> (pass `pricePending` with the facts key). */
  price: string | null
  pricePending?: PendingFact
  unit?: string | null
  perMonth?: string | null
  /** Saving chip text (−45 %), only with a real reference price. */
  saving?: string | null
  /** Info row text, only for a real dated offer. */
  info?: string | null
  infoIcon?: IconName
  /** Two-column feature checks; an item may hold <Pending>. In launch mode pass only the items that render (scoped()). */
  features: ReactNode[]
  /** The purchase action: the one filled (primary) button of the view. */
  cta: Cta
  /** Guarantee row within 16px of the CTA (the section's own reassurance items). */
  guarantees?: IconText[]
  /**
   * Payment footer strip. `methods: null` renders <Pending> (payment methods are an owner fact); in launch mode,
   * while they are a missing optional fact, the whole strip goes.
   */
  payment?: { label?: string; methods: string[] | null; pending?: PendingFact } | null
  /** Sticky from lg (product buy box). */
  sticky?: boolean
  /** A small Nuit screen strip on the top edge below lg (home offer card). */
  mosaicStrip?: boolean
  /** Heading level of the plan name (default h2). */
  as?: 'h2' | 'h3' | 'p'
  /** Optional ref. Not needed for the BuyBar: the Recap marks itself with data-buybar-watch. */
  ref?: Ref<HTMLElement>
  className?: string
}

/**
 * Offer card (home hero) and buy box (product): white, the firm 2px Bleu repère edge and the float shadow, holding
 * the price, the saving chip if real, the features, the primary CTA, reassurance and the means of payment. Never
 * reveal-animate it.
 * Launch mode: a missing optional fact takes its own slot out (price block, guarantee items, payment strip); the
 * features are the page's (filter them with scoped() before passing them).
 */
export function Recap({
  tab,
  plan,
  old,
  price,
  pricePending,
  unit,
  perMonth,
  saving,
  info,
  infoIcon = 'ti-clock',
  features,
  cta,
  guarantees,
  payment,
  sticky,
  mosaicStrip,
  as: H = 'h2',
  ref,
  className,
}: RecapProps) {
  // The strip is drawn here (rule, band ground), so it goes with its row when the row has nothing to show.
  const paymentShown =
    payment != null && slotShown(payment.methods && payment.methods.length > 0 ? payment.methods : null, (payment.pending ?? { fact: PAYMENT_METHODS_FACT }).fact)
  return (
    <article ref={ref} data-buybar-watch="" className={cn(cardClass.recap, sticky && 'lg:sticky lg:top-24', className)}>
      {tab && <Tab className="left-5 lg:left-9">{tab}</Tab>}
      {mosaicStrip && (
        <div aria-hidden="true" className="nuit-plain mb-5 rounded-control p-0.5 lg:hidden">
          <ChannelMosaic rows={2} cols={6} selected={9} osd={false} fill={false} />
        </div>
      )}
      <H className="border-b border-hairline pb-5 font-display text-title-lg text-z-fg">{plan}</H>
      <Price old={old} value={price} pending={pricePending} unit={unit} perMonth={perMonth} size="xl" className="mt-5" />
      {(saving || info) && (
        <div className="mt-4">
          {saving && <SavingChip size="lg">{saving}</SavingChip>}
          {info && (
            <InfoRow icon={infoIcon} className={cn(saving && 'mt-3')}>
              {info}
            </InfoRow>
          )}
        </div>
      )}
      {features.length > 0 && (
        <ul className="m-0 mt-6 grid list-none grid-cols-2 gap-x-4 gap-y-3 p-0 font-sans text-small text-z-body">
          {features.map((f, i) => (
            <li key={i} className="flex gap-2">
              <i className={checkIconClass} aria-hidden="true" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="relative z-[1] mt-6">
        <CtaButton cta={cta} variant="primary" size="lg" full iconEnd="arrow" />
        {guarantees && guarantees.length > 0 && <GuaranteeRow items={guarantees} className="mt-3" />}
      </div>
      {payment && paymentShown && (
        // Bleeds to the card's inner edge: the card has a 2px edge, so the strip's corners are the panel radius minus 2px.
        <div className={cn('relative z-[1] -mx-5 mt-6 -mb-6 border-t border-hairline bg-band px-5 py-4 lg:-mx-9 lg:-mb-8 lg:px-9', panelInnerBottomClass)}>
          <PaymentRow label={payment.label} methods={payment.methods} pending={payment.pending} />
        </div>
      )}
    </article>
  )
}

type OrderLine = {
  thumb?: ReactNode
  name: ReactNode
  meta?: ReactNode
  old?: string | null
  /** Line amount. `null` = the plan price is not given yet: renders <Pending> (pass `pricePending` with the facts key). */
  price: string | null
  pricePending?: PendingFact
}

/** Default marker of a total that includes a price not given yet. */
const TOTAL_PENDING: PendingFact = { what: 'total' }

type OrderSummaryProps = {
  /** Optional heading from the content. */
  title?: ReactNode
  lines: OrderLine[]
  /**
   * Labels come from the content ("Sous-total", "Total"). `value: null` (a line price is pending) renders <Pending>;
   * `pending` names the price that is missing, with its facts key (the subtotal uses the total's when it has none).
   */
  subtotal?: { label: string; value: string | null; pending?: PendingFact }
  total: { label: string; value: string | null; pending?: PendingFact }
  sticky?: boolean
  /** Payment choice, consent, the primary lg submit « Payer ma commande » with ti-lock (full width), then the PaymentRow. */
  children?: ReactNode
  className?: string
}

/**
 * Order summary for checkout and cart: band panel, line items, amounts in the display face (tabular in the
 * column), then the payment block. No yellow anywhere in checkout except marker squares. Launch mode: an amount
 * that is a missing optional fact leaves its line without an amount column, and a sum that cannot be stated
 * (subtotal, total) goes with its label; a required price keeps its marker in all three places.
 */
export function OrderSummary({ title, lines, subtotal: subtotalRow, total, sticky = true, children, className }: OrderSummaryProps) {
  const totalPending = total.pending ?? TOTAL_PENDING
  const subtotalPending = subtotalRow?.pending ?? { what: 'sous-total', fact: totalPending.fact }
  const subtotal = subtotalRow && slotShown(subtotalRow.value, subtotalPending.fact) ? subtotalRow : undefined
  const totalShown = slotShown(total.value, totalPending.fact)
  // One rule between the order lines and the total. The last line already draws it (its bottom border), so the
  // total row adds its own only when a subtotal row sits between them, or when there is no line at all.
  const totalRule = subtotal != null || lines.length === 0
  return (
    <section className={cn(cardClass.orderSummary, sticky && 'lg:sticky lg:top-24', className)}>
      {/* title-lg, like the form card's heading beside it: the two column heads of a checkout share one level. */}
      {title != null && <h2 className="mb-4 font-display text-title-lg text-ink">{title}</h2>}
      <ul className="m-0 list-none p-0">
        {lines.map((l, i) => {
          const pending = l.price == null
          const amountShown = slotShown(l.price, l.pricePending?.fact)
          return (
            // Every line wraps, so no line sets the panel's width: its narrowest is its widest word or amount, never
            // the name and the amount side by side. When they do not fit side by side, the amount moves to its own
            // line under the name, right-aligned like every amount of the panel.
            // - A price stays beside the name while the name keeps a readable measure (the name block's 12rem basis,
            //   thumb included): the name wraps first, as in any order line, then the price gives way.
            // - A pending marker is far wider than a price: it gives way as soon as the name no longer fits on one
            //   line beside it (the name block's own width as its basis), and may wrap, so the name stays readable.
            // - At the narrowest (large text in a small phone) the thumb goes above the name as well.
            <li key={i} className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-hairline-deep py-3 font-sans text-small">
              <span className={cn('flex grow flex-wrap items-center gap-3', !pending && 'basis-[12rem]')}>
                {l.thumb}
                {/* flex-1 with its widest word as its minimum: it fills the room beside the thumb and moves under it
                    only when that word no longer fits there. */}
                <span className="grid flex-1">
                  <span className="font-semibold text-ink">{l.name}</span>
                  {l.meta != null && <span className="text-meta text-ink-muted">{l.meta}</span>}
                </span>
              </span>
              {amountShown &&
                (pending ? (
                  <span className="ml-auto min-w-0">
                    <Pending what={l.pricePending?.what ?? 'prix'} fact={l.pricePending?.fact} />
                  </span>
                ) : (
                  // A reference price and the price stay one amount; at the narrowest the struck one goes above.
                  <span className="ml-auto flex flex-wrap items-baseline justify-end gap-x-2 text-right tabular-nums">
                    {l.old && <OldPrice className="text-micro">{l.old}</OldPrice>}
                    <span className="font-display text-[1.0625rem] font-semibold text-ink">
                      {l.old && <PriceLabel />}
                      {l.price}
                    </span>
                  </span>
                ))}
            </li>
          )
        })}
      </ul>
      {(subtotal || totalShown) && (
        // Like the lines: a sum that does not fit beside its label goes under it, right-aligned.
        <dl className={cn('m-0 grid gap-2 font-sans tabular-nums', totalRule ? 'mt-4' : 'mt-3')}>
          {subtotal && (
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-small text-ink-soft">
              <dt>{subtotal.label}</dt>
              <dd className="m-0 ml-auto text-right">
                {subtotal.value == null ? (
                  <Pending what={subtotalPending.what} fact={subtotalPending.fact} />
                ) : (
                  <span className="font-display font-semibold">{subtotal.value}</span>
                )}
              </dd>
            </div>
          )}
          {totalShown && (
            <div className={cn('flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1', totalRule && 'border-t border-hairline-deep pt-3')}>
              <dt className="font-sans text-copy font-semibold text-ink">{total.label}</dt>
              <dd className="m-0 ml-auto text-right">
                {total.value == null ? (
                  <Pending variant="block" what={totalPending.what} fact={totalPending.fact} />
                ) : (
                  <span className="font-display text-price-md text-ink tabular-nums">{total.value}</span>
                )}
              </dd>
            </div>
          )}
        </dl>
      )}
      {/* One column pinned to the panel (grid-cols-1, not an auto track): a block wider than the panel (a long word
          in large text) overflows on its own instead of widening every block of the panel, or the panel itself. */}
      {children && <div className="mt-6 grid grid-cols-1 gap-4">{children}</div>}
    </section>
  )
}
