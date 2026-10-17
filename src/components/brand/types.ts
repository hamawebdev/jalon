// Shared prop types of the Jalon brand kit (IDENTITY.md §5 and §7).
import type { MouseEvent, ReactNode } from 'react'

/**
 * Surface of a section root (IDENTITY §3.2): paper, plate (white), band (alternate), nuit (screens and the
 * footer only, §3.3).
 */
export type Zone = 'paper' | 'plate' | 'band' | 'nuit'

/** Container widths: content 1200, wide 1320, text 760. */
export type ContainerSize = 'content' | 'wide' | 'text'

/** Vertical rhythm of a section: 80 to 144, sm 48 to 72, hero 40 to 88, or none. */
export type Rhythm = 'section' | 'sm' | 'hero' | 'none'

export type ButtonVariant =
  /** The filled action, Bleu repère from the hero to the pay button (white plate on Nuit). One per view. */
  | 'primary'
  /** White with a 1.5px Bleu repère edge. */
  | 'secondary'
  | 'link'
  /**
   * @deprecated There is no yellow button any more (« Jalon clair »): this name renders the primary look. Write
   * `primary`; the name stays only so existing pages keep compiling.
   */
  | 'signal'
  /** A quiet labelled pill for chrome: « Menu », « Fermer », « Modifier » (white, 1px edge, 44px). */
  | 'quiet'
  /** White button on Nuit. */
  | 'plate'
  | 'outline-nuit'
  | 'link-nuit'
  | 'whatsapp'
  | 'icon'
  | 'icon-nuit'

export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * A Tabler icon class, written in full: "ti-lock". The site ships only the icons whose class name appears in src/
 * (the subset built by `npm run icons`), so a new icon needs that script run once; `npm run icons:check` tells.
 */
export type IconName = string

/**
 * A fact the owner has not given yet (README rule 7): `what` is rendered after « À compléter · » (short,
 * French, e.g. "prix", "horaires"); `fact` is its facts.ts key (e.g. "support.hours"), rendered as data-pending.
 */
export type PendingFact = { what: string; fact?: string }

/**
 * Icon + label pair (trust rows, guarantee rows). A `null` label is a pending owner fact: the row renders
 * <Pending> from `pending` in its place.
 */
export type IconText = { icon: IconName; label: ReactNode | null; pending?: PendingFact }

/**
 * A call to action. `to` renders a router link, `href` a plain <a> (anchors, external, the checkout), neither
 * a <button>. Both link forms keep role=link. `ariaLabel`, `target`, `rel` pass through.
 */
export type Cta = {
  label: string
  to?: string
  href?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  ariaLabel?: string
  target?: string
  rel?: string
}

/**
 * Picture-quality tier of a stamp or ladder row. A key, never shown as is: the stamp prints the tier's name
 * (`FHD` prints « Full HD », GLOSSARY §5).
 */
export type QualityTier = '4K' | 'FHD' | 'HD' | 'SD'

/**
 * Kind of a Carte d'accès: `plan` (Nuit card with the month strip), `renew` (white plate, hairline), `trial`
 * (Nuit card, no month strip). The duration always comes from `months`, never from the variant.
 */
export type CarteVariant = 'plan' | 'renew' | 'trial'

/**
 * One figure of a stat strip. `value: null` is a pending owner fact (renders <Pending> from `pending`);
 * leave `value` out for a label-only cell. `star`: the sourced rating out of 5 this figure states (4.6), drawn
 * as that many stars beside it; `true` stands for a full 5 sur 5.
 */
export type StatItem = { value?: string | null; label: string; star?: boolean | number; pending?: PendingFact }

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p'
