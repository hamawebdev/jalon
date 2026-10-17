import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Stars, PaymentBadge } from './Labels'
import { Pending } from './Pending'
import { PAYMENT_METHODS_FACT, guaranteeRowClass, iconClass, infoRowClass, trustItemClass, trustRowClass } from './recipes'
import { slotShown } from './scope'
import type { IconName, IconText, PendingFact, StatItem } from './types'

const PRICE_SIZE = {
  xl: { num: 'text-price-xl', unit: 'text-base', old: 'text-[clamp(1.125rem,1.032rem+0.381vw,1.375rem)]' },
  lg: { num: 'text-price-lg', unit: 'text-meta', old: 'text-lg' },
  md: { num: 'text-price-md', unit: 'text-meta', old: 'text-base' },
  sm: { num: 'text-price-sm', unit: 'text-micro', old: 'text-micro' },
} as const

/** Default marker of a missing price. Pass `pending` with the facts key, e.g. { what: 'prix', fact: 'plans.p12.price' }. */
const PRICE_PENDING: PendingFact = { what: 'prix' }

/**
 * Struck reference price (only a real one, and only beside a known price), read by screen readers as
 * « Prix de référence : … ». Pair it with <PriceLabel /> in the current price, read « Prix : … ».
 */
export function OldPrice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <s className={cn('price-old', className)}>
      <span className="sr-only">Prix de référence&nbsp;: </span>
      {children}
    </s>
  )
}

/** Hidden label of the current price, only where a struck reference price shows beside it (« Prix : … »). */
export function PriceLabel() {
  return <span className="sr-only">Prix&nbsp;: </span>
}

type PriceProps = {
  /**
   * Struck reference price, only with a real reference price (owner fact). Read as « Prix de référence : … »;
   * the current price is then read « Prix : … ».
   */
  old?: string | null
  /**
   * The price exactly as written ("59 €"). `null` = not given yet: renders <Pending> and hides `old` and `perMonth`.
   * Launch mode: when that price is an optional fact (`pending.fact`), the whole block renders nothing, unit included.
   */
  value: string | null
  /** Unit beside the price ("TTC", "/12 mois"). */
  unit?: string | null
  /**
   * The unit on its own line under the figure instead of beside it. For prices compared side by side (plan
   * cards): the block then takes the same lines whatever the length of the amount, where a longer amount would
   * push a unit set beside it onto the next line in one card and not in its neighbours.
   */
  unitBelow?: boolean
  /** Per-month line ("soit 4,92 € par mois"), on the next line, in body ink: never larger or louder than the amount paid. */
  perMonth?: string | null
  /**
   * Shown after the reference price, on its line (the plan card's saving chip): only with a reference price on
   * screen, so it never stands without the figure it is measured against.
   */
  oldAside?: ReactNode
  /** What a missing price is (default « prix »), with its facts.ts key. */
  pending?: PendingFact
  size?: keyof typeof PRICE_SIZE
  /** Old price left of the price on one line instead of above it. */
  inline?: boolean
  className?: string
}

/**
 * The one price block: reference price above, the figure (display 700, ink, proportional, one size for the whole
 * amount, euro sign included) with its unit on the same baseline 8px away (or on the next line: `unitBelow`), then
 * the per-month line.
 */
export function Price({ old, value, unit, unitBelow, perMonth, oldAside, pending = PRICE_PENDING, size = 'lg', inline, className }: PriceProps) {
  // Launch mode, an optional price not given: no figure, so no unit and no wrapper either (never a lone « TTC »).
  if (!slotShown(value, pending.fact)) return null
  const s = PRICE_SIZE[size]
  const known = value != null
  const oldPrice = known && old ? <OldPrice className={cn('block w-fit', s.old, 'leading-tight')}>{old}</OldPrice> : null
  const aside = oldPrice && oldAside != null ? oldAside : null
  // Above the figure, the reference price and its aside share one line (centred on each other), 6px over the figure.
  const oldEl =
    aside && !inline ? (
      <div className="mb-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {oldPrice}
        {aside}
      </div>
    ) : (
      oldPrice
    )
  return (
    <div className={cn('font-sans', className)}>
      {!inline && oldEl}
      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        {inline && oldEl}
        {inline && aside}
        {known ? (
          <span className={cn('price-num', s.num)}>
            {oldPrice && <PriceLabel />}
            {value}
          </span>
        ) : (
          <Pending variant="block" what={pending.what} fact={pending.fact} />
        )}
        {unit && <span className={cn('font-sans font-medium text-z-muted', s.unit, unitBelow && 'basis-full')}>{unit}</span>}
      </p>
      {known && perMonth && <p className="mt-1.5 font-display text-small font-semibold text-z-body">{perMonth}</p>}
    </div>
  )
}

/** Default marker of missing payment methods. */
const METHODS_PENDING: PendingFact = { what: 'moyens de paiement', fact: PAYMENT_METHODS_FACT }

type PaymentRowProps = {
  /** The section's own label ("Paiement :"). */
  label?: string
  /** Only the methods the owner accepts (facts). `null` (or an empty list) = not given yet: renders <Pending>. */
  methods: string[] | null
  pending?: PendingFact
  align?: 'start' | 'center'
  className?: string
}

/**
 * Lock + label + monochrome payment badges. Zone-aware. Launch mode: while the methods are a missing optional
 * fact the row renders nothing (lock and label included). A wrapper drawn around the row (a strip, a rule) is
 * the caller's: `inScope({ 'payment.methods': methods }) && <div className="border-t …"><PaymentRow … /></div>`.
 */
export function PaymentRow({ label, methods, pending = METHODS_PENDING, align = 'start', className }: PaymentRowProps) {
  const list = methods && methods.length > 0 ? methods : null
  if (!slotShown(list, pending.fact)) return null
  return (
    <div className={cn('flex flex-wrap items-center gap-2', align === 'center' && 'justify-center', className)}>
      <i className="ti ti-lock shrink-0 text-[18px] text-z-icon" aria-hidden="true" />
      {label && <span className="font-sans text-micro font-medium text-z-muted">{label}</span>}
      {list == null ? (
        <Pending what={pending.what} fact={pending.fact} />
      ) : (
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {list.map((m) => (
            <li key={m}>
              <PaymentBadge>{m}</PaymentBadge>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/** An item's label, or <Pending> in its place when the label is a fact not given yet. */
function ItemLabel({ item }: { item: IconText }) {
  if (item.label != null) return <>{item.label}</>
  return <Pending what={item.pending?.what ?? 'à préciser'} fact={item.pending?.fact} />
}

type RowProps = { items: IconText[]; align?: 'start' | 'center'; className?: string }

/**
 * The items of a trust or guarantee row that render in the current mode. Launch mode drops an item whose label
 * is a missing optional fact (icon and all), so the row closes up; a row left with no item renders nothing.
 */
function shownItems(items: IconText[]) {
  return items.filter((it) => slotShown(it.label, it.pending?.fact))
}

/** Trust row: icon + meta label items. Only true, owner-given items; a `null` label renders <Pending>. */
export function TrustRow({ items, align = 'start', className }: RowProps) {
  const shown = shownItems(items)
  if (shown.length === 0) return null
  return (
    <ul className={cn('m-0 list-none p-0', trustRowClass, align === 'center' && 'justify-center', className)}>
      {shown.map((it, i) => (
        <li key={i} className={trustItemClass}>
          <i className={iconClass(it.icon, 'text-[20px] text-z-icon')} aria-hidden="true" />
          <ItemLabel item={it} />
        </li>
      ))}
    </ul>
  )
}

/** Guarantee row under a buy CTA (centred, micro, zone icon colour). A `null` label renders <Pending>. */
export function GuaranteeRow({ items, className }: { items: IconText[]; className?: string }) {
  const shown = shownItems(items)
  if (shown.length === 0) return null
  return (
    <ul className={cn('m-0 list-none p-0', guaranteeRowClass, className)}>
      {shown.map((it, i) => (
        <li key={i} className="inline-flex items-center gap-1.5">
          <i className={iconClass(it.icon, 'text-[18px] text-z-icon')} aria-hidden="true" />
          <ItemLabel item={it} />
        </li>
      ))}
    </ul>
  )
}

/** Info row with a clock: raised strip, accent text. Only for a real, dated offer the owner confirms. */
export function InfoRow({ children, icon = 'ti-clock', className }: { children: ReactNode; icon?: IconName; className?: string }) {
  return (
    <p className={cn(infoRowClass, className)}>
      <i className={iconClass(icon, 'text-[20px]')} aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}

type StatStripProps = {
  /** Figures: only true, owner-given values; `value: null` renders <Pending> in the figure slot. */
  items: StatItem[]
  size?: 'lg' | 'md'
  className?: string
}

/**
 * Stat strip without cards: 2 columns on phone (odd last spans both), one row from md, hairline rules between
 * cells. Values render final (no counters), in the display face 700. Launch mode drops a cell whose figure is a
 * missing optional fact, label included; the other cells share the row, and a strip left empty renders nothing.
 */
export function StatStrip({ items: all, size = 'lg', className }: StatStripProps) {
  const items = all.filter((it) => it.value !== null || slotShown(null, it.pending?.fact))
  if (items.length === 0) return null
  return (
    <ul
      className={cn(
        'm-0 grid list-none grid-cols-2 border-y border-z-line p-0 md:flex md:justify-between',
        className,
      )}
    >
      {items.map((it, i) => (
        <li
          key={`${it.label}-${i}`}
          className={cn(
            // Labels sit on the cell's bottom edge so they align across the row even when a value wraps.
            'flex flex-col justify-between gap-2.5 border-z-line px-5 py-5 md:flex-1 md:px-4 lg:px-6',
            // phone: 2 columns, rules between cells, odd last spans both
            'max-md:even:border-l max-md:[&:nth-child(n+3)]:border-t max-md:last:odd:col-span-2',
            // tablet and desktop: one row with vertical rules
            'md:border-l md:first:border-l-0',
          )}
        >
          <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            {it.value === null ? (
              <Pending variant="block" what={it.pending?.what ?? 'chiffre'} fact={it.pending?.fact} />
            ) : (
              it.value && <span className={cn('price-num text-z-fg', size === 'lg' ? 'text-stat-lg' : 'text-stat-md')}>{it.value}</span>
            )}
            {it.star != null && it.star !== false && <Stars value={it.star === true ? undefined : it.star} />}
          </span>
          <span className="font-sans text-meta font-semibold text-z-muted">{it.label}</span>
        </li>
      ))}
    </ul>
  )
}
