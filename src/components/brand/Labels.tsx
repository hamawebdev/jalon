import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import {
  cartCountClass,
  chipIconClass,
  chipVariants,
  iconClass,
  initials,
  neutralTagClass,
  paymentBadgeClass,
  qualityStampClass,
  savingChipVariants,
  statusDotClass,
  tabClass,
  tileClass,
} from './recipes'
import type { IconName, QualityTier } from './types'

type TabProps = {
  children: ReactNode
  className?: string
}

/**
 * Tab straddling the top edge of its (relative) card, on the card's text column: « Notre conseil », once per page.
 * It states an opinion, never a statistic. A label, not a control: yellow inside a 1px ink keyline, 8px corners,
 * sentence case, a small ink square before the text. Its left edge follows the card padding (`left-card`); a
 * parent with another padding passes its own (`className="left-5 lg:left-9"`).
 */
export function Tab({ children, className }: TabProps) {
  return <span className={cn(tabClass, className)}>{children}</span>
}

/**
 * Exact saving (−45 %, true minus U+2212), only with a real reference price (owner fact). Light: ink plate with
 * a signal-300 figure; Nuit: signal-300 plate with a nuit figure. lg on the offer card, buy box and featured plan.
 */
export function SavingChip({ children, size = 'md', className }: { children: ReactNode; size?: 'md' | 'lg'; className?: string }) {
  return <span className={cn(savingChipVariants({ size }), className)}>{children}</span>
}

type TagProps = {
  children: ReactNode
  tone?: 'neutral' | 'saving'
  /** Saving tone only: lg (32px, 16px text) on the featured plan; md (28px) elsewhere. Neutral tags have one size. */
  size?: 'md' | 'lg'
  className?: string
}

/** Plan tag: neutral (a short descriptive label) or saving (the saving chip, only with a real reference price). */
export function Tag({ children, tone = 'neutral', size = 'md', className }: TagProps) {
  if (tone === 'saving')
    return (
      <SavingChip size={size} className={className}>
        {children}
      </SavingChip>
    )
  return <span className={cn(neutralTagClass, className)}>{children}</span>
}

type ChipProps = {
  children: ReactNode
  icon?: IconName
  size?: 'md' | 'sm'
  /**
   * Chosen state of a filter or choice chip: blue tint, Bleu repère edge and a check before the label (never
   * colour alone). As a button, also pass aria-pressed (or role="radio" with aria-checked).
   */
  selected?: boolean
  /** Root element (default span; 'button' for a filter chip: pass type, onClick, aria-pressed). */
  as?: ElementType
  className?: string
} & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>

/**
 * Chip. The shape says whether it can be tapped: a static label (themes, apps, model tags; the default span) has
 * 8px corners; a chip rendered as a button or a link is a pill, 36px drawn inside a 44px hit area. Zone-aware.
 * Extra props (id, data-*, onClick, aria-*) go on the root.
 */
export function Chip({ children, icon, size = 'md', selected, as: Tag = 'span', className, ...rest }: ChipProps) {
  const interactive = Tag === 'button' || Tag === 'a' || rest.onClick != null
  return (
    <Tag {...rest} className={cn(chipVariants({ size, interactive, selected: !!selected }), className)}>
      {interactive && selected ? (
        <i className={iconClass('ti-check', 'text-[16px] text-nuit-700 nuit:text-current')} aria-hidden="true" />
      ) : (
        icon && <i className={iconClass(icon, chipIconClass)} aria-hidden="true" />
      )}
      {children}
    </Tag>
  )
}

/** Payment method as a monochrome text mark (a white 28px tag, display 650). Never a raster logo strip. Methods are owner facts. */
export function PaymentBadge({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn(paymentBadgeClass, className)}>{children}</span>
}

/** What each tier's stamp prints: the tier's name as the copy writes it (GLOSSARY §5: « Full HD », never the short form). */
const TIER_LABEL: Record<QualityTier, string> = { '4K': '4K', FHD: 'Full HD', HD: 'HD', SD: 'SD' }

/** Quality stamp 4K / Full HD / HD / SD: ink keyline; the top tier (4K) is filled. Which tiers exist is an owner fact. */
export function QualityStamp({ tier, className }: { tier: QualityTier; className?: string }) {
  const label = TIER_LABEL[tier]
  return (
    <span className={cn(qualityStampClass.base, label.length > 2 && qualityStampClass.long, tier === '4K' && qualityStampClass.top, className)}>
      {label}
    </span>
  )
}

const STAR_SIZE = { 14: 'text-[14px]', 15: 'text-[15px]', 16: 'text-[16px]' } as const

type StarsProps = {
  /**
   * The rating out of 5, exactly as sourced (4.6). Each star fills by its share: 4,6 draws four full stars and a
   * fifth filled to 60 %; 3 draws three full stars and two outlines. Leave it out only for a full 5 sur 5.
   */
  value?: number
  size?: 14 | 15 | 16
  /**
   * Accessible name when no visible rating text sits beside the stars (content string, e.g. "Note 4,8 sur 5"):
   * renders role="img" aria-label. Without it the stars are aria-hidden.
   */
  label?: string
  className?: string
}

/** Share of the icon box a star glyph spans (the Tabler star runs from 1/24 to 23/24 of its box). */
const STAR_INSET = 1 / 24

/**
 * Five stars showing a rating out of 5 (ink on light, signal-500 on Nuit): full, part-filled and outlined, so
 * the row never shows more than the rating says. Only with real, sourced reviews (owner fact). Decorative unless
 * `label` is given.
 */
export function Stars({ value = 5, size, label, className }: StarsProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const }
  // To one decimal, as ratings are written (4,6); anything that is not a number draws no filled star.
  const score = Number.isFinite(value) ? Math.round(Math.min(Math.max(value, 0), 5) * 10) / 10 : 0
  return (
    <span {...a11y} className={cn('inline-flex shrink-0 gap-0.5 text-z-star', size ? STAR_SIZE[size] : 'text-[14px] md:text-[15px]', 'leading-none', className)}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(Math.max(score - i, 0), 1)
        if (fill === 1) return <i key={i} className="ti ti-star-filled" aria-hidden="true" />
        if (fill === 0) return <i key={i} className="ti ti-star" aria-hidden="true" />
        return (
          <span key={i} className="relative inline-flex">
            <i className="ti ti-star" aria-hidden="true" />
            <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${((STAR_INSET + fill * (1 - 2 * STAR_INSET)) * 100).toFixed(1)}%` }}>
              <i className="ti ti-star-filled block" aria-hidden="true" />
            </span>
          </span>
        )
      })}
    </span>
  )
}

type RatingPillProps = {
  /** The sourced rating line (owner fact: rating, count and platform). */
  children: ReactNode
  /** The rating out of 5 the line states (4.6), passed on to the stars. Leave it out only for a full 5 sur 5. */
  value?: number
  className?: string
}

/** Rating plate: stars (decorative, the first child) + the sourced rating line. */
export function RatingPill({ children, value, className }: RatingPillProps) {
  return (
    <p
      className={cn(
        'inline-flex min-h-9 items-center gap-2.5 rounded-tag border border-hairline bg-plate py-1 pr-3.5 pl-2.5 font-sans text-meta font-semibold text-ink-soft',
        className,
      )}
    >
      <Stars size={14} value={value} />
      <span>{children}</span>
    </p>
  )
}

/** Status square: 8px ok square with a halo (availability). Never pulses. */
export function StatusDot({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn(statusDotClass, className)} />
}

/**
 * Initials in a disc, generated from an existing name; aria-hidden, no text node (pseudo-content).
 * Never the logo. 40: nuit-100 ground, Bleu repère initials. 56: ink ground, on-nuit display initials.
 * A `null` name (not given yet) leaves the disc empty.
 */
export function Monogram({ name, size = 40, className }: { name: string | null; size?: 40 | 56; className?: string }) {
  return (
    <span
      aria-hidden="true"
      data-label={name ? initials(name) : ''}
      className={cn(
        'grid shrink-0 place-items-center rounded-full before:content-[attr(data-label)]',
        size === 40
          ? 'size-10 bg-nuit-100 font-sans text-[0.875rem] leading-none font-bold text-nuit-700'
          : 'size-14 bg-ink font-display text-xl leading-none font-bold text-on-nuit nuit:bg-nuit-800 nuit:ring-1 nuit:ring-nuit-line',
        className,
      )}
    />
  )
}

/**
 * Cart count: a yellow disc with an ink keyline on its (relative) round icon button. aria-hidden: put the count in
 * the button's name instead, e.g. aria-label={`Panier (${n})`}.
 */
export function CartCount({ count, className }: { count: number; className?: string }) {
  return (
    <span aria-hidden="true" className={cn(cartCountClass, className)}>
      {count}
    </span>
  )
}

/** One icon size per tile size: 20px in 40, 22px in 44, 24px in 48, 28px in 56. */
const TILE_SIZE = {
  40: 'size-10 text-[20px]',
  44: 'size-11 text-[22px]',
  48: 'size-12 text-[24px]',
  56: 'size-14 text-[28px]',
} as const

/** Icon tile: nuit-100 square with 12px corners and a Bleu repère glyph (Nuit: raised square, signal-300 glyph). Default 40 → 44 from md. */
export function IconTile({ icon, size, className }: { icon: IconName; size?: 40 | 44 | 48 | 56; className?: string }) {
  return (
    <span aria-hidden="true" className={cn(tileClass, size ? TILE_SIZE[size] : 'size-10 text-[20px] md:size-11 md:text-[22px]', className)}>
      <i className={iconClass(icon)} />
    </span>
  )
}
