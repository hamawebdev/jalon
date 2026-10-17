// Class recipes of the Jalon brand kit (IDENTITY.md §3–§5), in the « Jalon clair » look made rounder (T26):
// one Bleu repère action colour, pills for what is tapped, a hairline and a faint shadow for what is raised.
// Components in this folder are built from these strings; use them directly only for edge cases the components
// do not cover.
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { ButtonSize, ButtonVariant, ContainerSize, Rhythm, Zone } from './types'

/** Reset scope: markup inside starts from brand defaults (see .brand-scope in src/index.css). */
export const SCOPE = 'brand-scope'

/**
 * Roots of fixed / sticky chrome (no <Section>): reset scope + zone variables.
 * dark = toasts, any fixed Nuit element; light = buy bar, drawer, side menu, consent banner.
 */
export const fixedRootClass = {
  dark: 'brand-scope nuit-plain',
  light: 'brand-scope zone-paper bg-plate',
} as const

/** Zone class per section zone. */
export const zoneClass: Record<Zone, string> = {
  paper: 'zone-paper',
  plate: 'zone-plate',
  band: 'zone-band',
  nuit: 'zone-nuit',
}

export const containerClass: Record<ContainerSize, string> = {
  content: 'mx-auto w-full max-w-content px-gutter',
  wide: 'mx-auto w-full max-w-wide px-gutter',
  text: 'mx-auto w-full max-w-text px-gutter',
}

export const rhythmClass: Record<Rhythm, string> = {
  section: 'py-section',
  sm: 'py-section-sm',
  hero: 'py-hero',
  none: '',
}

/**
 * Type recipes (§4.3): face + scale token + zone colour. Copy as is; add layout classes around them.
 * `code` and `time` spell out their sizes so they survive cn() next to a colour class.
 */
export const typo = {
  displayXl: 'font-display text-display-xl text-z-fg',
  displayLg: 'font-display text-display-lg text-z-fg',
  displayMd: 'font-display text-display-md text-z-fg',
  displaySm: 'font-display text-display-sm text-z-fg',
  titleLg: 'font-display text-title-lg text-z-fg',
  title: 'font-display text-title text-z-fg',
  lead: 'font-sans text-lead text-z-soft max-w-[56ch]',
  copy: 'font-sans text-copy text-z-body max-w-[66ch]',
  small: 'font-sans text-small text-z-soft',
  meta: 'font-sans text-meta font-medium text-z-muted',
  micro: 'font-sans text-micro font-medium text-z-muted',
  /** Tab, payment marks: display 650 at 14px, sentence case (capitals stay on the Plaque and the Carte, which are signs). */
  badge: 'font-display text-badge',
  faq: 'font-sans text-faq text-z-fg',
  nav: 'font-sans text-base leading-none font-medium',
  /** Codes, references, URLs to type: mono 500, 15px (never below 14px). */
  code: 'font-mono text-[0.9375rem] leading-[1.45] font-medium',
  /** Times inside drawn grids and screens: mono 600, 13px. Step numbers take stepDiscClass (15px). */
  time: 'font-mono text-[0.8125rem] leading-none font-semibold',
  /** An amount inside a sentence: display 700, proportional figures. */
  money: 'money',
  priceXl: 'price-num text-price-xl',
  priceLg: 'price-num text-price-lg',
  priceMd: 'price-num text-price-md',
  priceSm: 'price-num text-price-sm',
  statLg: 'price-num text-stat-lg',
  statMd: 'price-num text-stat-md',
} as const

const bareIconNames = new Set<string>()

/**
 * The classes of a Tabler icon: "ti-lock" → "ti ti-lock shrink-0". Write the name in full, `ti-` included: the
 * site ships only the icons whose class name appears in src/ (scripts/subset-icons.mjs, `npm run icons`), and a
 * name without the prefix ("lock") is completed here but not seen by that scan, so its glyph may be missing.
 */
export function iconClass(name: string, extra?: string) {
  const full = name.startsWith('ti-')
  if (!full && import.meta.env.DEV && !bareIconNames.has(name)) {
    bareIconNames.add(name)
    console.warn(`[brand kit] icon « ${name} »: write « ti-${name} » in full, or the icon subset (npm run icons) will not include it.`)
  }
  return cn('ti', full ? name : `ti-${name}`, 'shrink-0', extra)
}

// ── The square, « le jalon » (§5.1) ─────────────────────────────────────────────────────────────

/** The keylined square (8px, square corners): yellow inside the zone keyline (1px ink on light, plain on Nuit). See <Marker>. */
export const markerClass = 'sq size-2'

// ── Buttons (§5.2) ──────────────────────────────────────────────────────────────────────────────

/**
 * Every button: a pill. `rounded-button` (PILL) is 28px, so a button of 40 to 56px is a full pill and a label that
 * wraps to two lines at 320px gives a rounded rectangle, not a lozenge. One 1.5px edge on every filled and outlined
 * variant, so a primary and a secondary side by side are exactly as tall. No shadow at rest, no lift on hover; a
 * press moves 1px down (only when motion is allowed). The focus ring follows the pill.
 * The radius is set by each variant, never here: cn() only resolves two radius classes it knows by name.
 */
const BUTTON_BASE =
  'group/btn inline-flex items-center justify-center gap-2 text-center font-sans font-semibold ' +
  '[text-wrap:balance] border-[1.5px] select-none no-underline cursor-pointer ' +
  'transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-calm ' +
  'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-z-focus ' +
  'disabled:cursor-not-allowed aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none'

const PILL = 'rounded-button'
const PRESS = 'motion-safe:active:translate-y-px'
const LIGHT_DISABLED =
  'disabled:bg-band-deep disabled:text-ink-muted disabled:border-band-deep disabled:shadow-none disabled:translate-y-0 ' +
  'aria-disabled:bg-band-deep aria-disabled:text-ink-muted aria-disabled:border-band-deep aria-disabled:shadow-none aria-disabled:translate-y-0'
const NUIT_DISABLED =
  'disabled:bg-nuit-raised disabled:text-on-nuit-muted disabled:border-nuit-line disabled:shadow-none disabled:translate-y-0 ' +
  'aria-disabled:bg-nuit-raised aria-disabled:text-on-nuit-muted aria-disabled:border-nuit-line aria-disabled:shadow-none aria-disabled:translate-y-0'
/** Text action: an underlined link in a 44px box. It stays underlined text, never a pill. */
const LINK =
  'min-h-11 rounded-tag border-0 px-0 py-3 text-base underline decoration-1 underline-offset-4 hover:decoration-2 ' +
  'disabled:text-ink-muted aria-disabled:text-ink-muted aria-disabled:no-underline'
/** The Nuit disabled set, applied only when a light-ground variant sits on Nuit (primary, secondary, whatsapp). */
const NUIT_DISABLED_IN_ZONE =
  'nuit:disabled:bg-nuit-raised nuit:disabled:text-on-nuit-muted nuit:disabled:border-nuit-line ' +
  'nuit:aria-disabled:bg-nuit-raised nuit:aria-disabled:text-on-nuit-muted nuit:aria-disabled:border-nuit-line'

/**
 * The filled action, one colour from the hero to the pay button: Bleu repère with a white label (9.99:1), hover
 * nuit-800 with the lift shadow, pressed nuit-900. On Nuit it takes the white plate look with an ink label, so
 * Bleu repère never sits on Nuit (it would be 1.7:1). One filled button per view.
 */
const PRIMARY =
  PILL +
  ' bg-nuit-700 text-plate border-nuit-700 hover:bg-nuit-800 hover:border-nuit-800 not-disabled:hover:shadow-lift ' +
  'active:bg-nuit-900 active:border-nuit-900 active:shadow-none ' +
  'nuit:bg-plate nuit:text-ink nuit:border-plate nuit:hover:bg-paper nuit:hover:border-paper nuit:hover:shadow-none nuit:active:bg-band nuit:active:border-band ' +
  PRESS +
  ' ' +
  LIGHT_DISABLED +
  ' ' +
  NUIT_DISABLED_IN_ZONE
/** The second button: white, a 1.5px Bleu repère edge (9.99:1 on a card, 8.62:1 on the page), ink label. On Nuit: the outline look. */
const SECONDARY =
  PILL +
  ' bg-plate text-ink border-nuit-700 hover:bg-nuit-100 active:bg-band ' +
  'nuit:bg-transparent nuit:text-on-nuit nuit:border-nuit-outline nuit:hover:bg-on-nuit/8 nuit:active:bg-on-nuit/12 ' +
  PRESS +
  ' ' +
  LIGHT_DISABLED +
  ' ' +
  NUIT_DISABLED_IN_ZONE
/** A quiet labelled pill for chrome (« Menu », « Fermer », « Modifier »): white, 1px edge at 3:1 or more, 44px tall at every size. */
const QUIET =
  PILL +
  ' min-h-11 border px-3.5 bg-plate text-ink border-hairline-strong hover:border-nuit-700 hover:bg-nuit-100 active:bg-band ' +
  'nuit:bg-transparent nuit:text-on-nuit nuit:border-nuit-outline nuit:hover:bg-on-nuit/8 nuit:active:bg-on-nuit/12 ' +
  LIGHT_DISABLED +
  ' ' +
  NUIT_DISABLED_IN_ZONE
const PLATE =
  PILL + ' bg-plate text-ink border-plate hover:bg-paper hover:border-paper active:bg-band active:border-band ' + PRESS + ' ' + NUIT_DISABLED
const OUTLINE_NUIT = PILL + ' bg-transparent text-on-nuit border-nuit-outline hover:bg-on-nuit/8 active:bg-on-nuit/12 ' + PRESS + ' ' + NUIT_DISABLED
const LINK_NUIT = LINK + ' text-signal-300 hover:text-on-nuit'
/** Icon button: a 44px circle with a 20px glyph. */
const ICON_SHAPE = 'size-11 min-h-0 rounded-full border p-0 text-[20px]'
const ICON_NUIT = ICON_SHAPE + ' bg-transparent text-on-nuit border-nuit-line hover:bg-nuit-raised hover:border-nuit-outline active:bg-on-nuit/12'

export const buttonVariants = cva(BUTTON_BASE, {
  variants: {
    // size first so the link/icon variants below can override its padding and height. Each size sets its
    // line-height after its font-size (cn drops a line-height that comes before a font-size).
    // Side padding is at least half the height, so a label clears the pill's curve.
    // sm is 40px tall with a mouse and 44px under a finger (pointer: coarse), the smallest comfortable tap target.
    size: {
      sm: 'min-h-10 px-[18px] py-2 text-[0.9375rem] leading-[1.2] pointer-coarse:min-h-11',
      md: 'min-h-12 px-6 py-3 text-base leading-[1.2]',
      lg: 'min-h-14 px-7 py-3.5 text-[1.0625rem] leading-[1.2]',
    },
    variant: {
      primary: PRIMARY,
      secondary: SECONDARY,
      link:
        LINK +
        ' text-nuit-700 hover:text-ink nuit:text-signal-300 nuit:hover:text-on-nuit nuit:disabled:text-on-nuit-muted nuit:aria-disabled:text-on-nuit-muted',
      // Deprecated name: there is no yellow button any more. It renders the primary look; write `primary`.
      signal: PRIMARY,
      quiet: QUIET,
      plate: PLATE,
      'outline-nuit': OUTLINE_NUIT,
      'link-nuit': LINK_NUIT,
      whatsapp:
        PILL +
        ' bg-whatsapp text-nuit border-whatsapp hover:bg-whatsapp-hover hover:border-whatsapp-hover active:bg-whatsapp-hover active:border-whatsapp-hover ' +
        PRESS +
        ' ' +
        LIGHT_DISABLED +
        ' ' +
        NUIT_DISABLED_IN_ZONE,
      icon:
        ICON_SHAPE +
        ' bg-plate text-ink border-hairline hover:bg-nuit-100 hover:border-hairline-strong active:bg-band ' +
        'nuit:bg-transparent nuit:text-on-nuit nuit:border-nuit-line nuit:hover:bg-nuit-raised nuit:hover:border-nuit-outline nuit:active:bg-on-nuit/12 ' +
        LIGHT_DISABLED,
      'icon-nuit': ICON_NUIT,
    },
    full: { true: 'w-full', false: '' },
  },
  compoundVariants: [
    // A full-width pill centres its label, so its side padding only bounds a label that fills it. On a narrow screen
    // for the text size (max-xs) it drops to 16px: the label's widest word then fits a 320 px screen at 24 px text.
    // The 28px corners still clear a label that wraps to two lines.
    {
      full: true,
      size: ['md', 'lg'],
      variant: ['primary', 'secondary', 'signal', 'quiet', 'plate', 'outline-nuit', 'whatsapp'],
      class: 'max-xs:px-4',
    },
  ],
  defaultVariants: { size: 'md', variant: 'primary', full: false },
})

/** Class string of a button (for edge cases: <label>, <summary>, third-party triggers …). */
export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra?: string) {
  return cn(buttonVariants({ variant, size }), extra)
}

/** Icon size per button size (18 / 20 / 20 px), 8px from the label. */
export const buttonIconSize: Record<ButtonSize, string> = {
  sm: 'text-[18px]',
  md: 'text-[20px]',
  lg: 'text-[20px]',
}

// ── Links (§5.2) ────────────────────────────────────────────────────────────────────────────────

/** Inline text link: Bleu repère, 1px underline at offset 3, hover ink with 2px; signal-300 on Nuit. Always underlined. */
export const linkClass =
  'text-nuit-700 underline decoration-1 underline-offset-3 transition-colors duration-150 ease-calm hover:text-ink hover:decoration-2 active:text-ink ' +
  'nuit:text-signal-300 nuit:hover:text-on-nuit nuit:active:text-on-nuit'

/**
 * The tap box of a link that stands on its own line: 44px tall, its text centred, size and look unchanged.
 * Add it to linkClass (see linkStandaloneClass, <TextLink standalone>), never to a link inside a sentence.
 */
export const tapTargetClass = 'inline-flex min-h-11 items-center'

/**
 * Stand-alone text link (« Voir toutes les questions », the way out of an empty state, a card's only link):
 * linkClass in a 44px tap box. The box is real, so two of them stacked never share a tap area; it adds about
 * 10px of air above and below a single line of text (take it off the margin around, or add -my-2.5 to the link).
 */
export const linkStandaloneClass = `${linkClass} ${tapTargetClass} rounded-tag`

/** Footer and nav links: no underline at rest. */
export const navLinkClass = 'hover:underline underline-offset-4'

// ── Chrome (header, drawer, side menu) ──────────────────────────────────────────────────────────

/**
 * Sticky header bar: a full-width bar, never a floating pill. No hairline at rest; add `headerClass.scrolled` once
 * scrollY > 8 (white bar, its hairline and the lift shadow). The row keeps a 16px margin below sm, so the lockup
 * and three 44px controls still fit a 360px screen with the page's 20px gutter; its gap is 8px below lg and 24px
 * from lg (IDENTITY §2.6).
 */
export const headerClass = {
  base:
    'brand-scope zone-paper sticky top-0 z-40 border-b border-transparent transition-[background-color,border-color,box-shadow] duration-180 ease-calm',
  inner: 'mx-auto flex h-16 w-full max-w-wide items-center gap-2 px-4 sm:px-gutter lg:h-[72px] lg:gap-6',
  scrolled: 'bg-plate border-hairline shadow-lift',
} as const

/**
 * Header nav link: text face 500 16px ink in a 44px pill-shaped hit area (14px side padding). The pill reaches 14px
 * past the label on each side without moving it (negative margin), so a list with `gap-8` leaves 4px between two
 * pills. Hover: the blue tint fades in. Pair with navCurrentClass and aria-current="page".
 */
export const headerNavLinkClass =
  '-mx-3.5 inline-flex min-h-11 items-center gap-2 rounded-full px-3.5 font-sans text-base leading-none font-medium text-ink ' +
  'transition-colors duration-150 ease-calm hover:bg-nuit-100 active:bg-band'

/**
 * Current main-nav link (needs aria-current="page"): a blue-tint pill, semibold ink label (13.52:1), led by the
 * square (8px yellow in a 1px ink keyline, square corners). The square is the cue at 3:1 or more; the pill
 * (1.05:1 on paper) only frames it.
 */
export const navCurrentClass =
  'aria-[current=page]:bg-nuit-100 aria-[current=page]:font-semibold ' +
  "aria-[current=page]:before:size-2 aria-[current=page]:before:shrink-0 aria-[current=page]:before:bg-signal-500 aria-[current=page]:before:shadow-[inset_0_0_0_1px_var(--color-ink)] aria-[current=page]:before:content-['']"

/**
 * Side-menu link: display 600 24px in 56px rows, a hairline between rows only (none after the last list item);
 * pressed = blue tint; current = the 8px square before the label (aria-current="page").
 */
export const sideLinkClass =
  'flex min-h-14 items-center gap-3 border-b border-hairline font-display text-2xl leading-tight font-semibold text-ink ' +
  'transition-colors duration-150 ease-calm hover:text-nuit-700 active:bg-nuit-100 [li:last-child>&]:border-b-0 ' +
  "aria-[current=page]:text-ink aria-[current=page]:before:size-2 aria-[current=page]:before:shrink-0 aria-[current=page]:before:bg-signal-500 aria-[current=page]:before:shadow-[inset_0_0_0_1px_var(--color-ink)] aria-[current=page]:before:content-['']"

/**
 * One sheet behaviour for the cart and the menu: from the right (z 70), white, its two leading corners at the
 * panel radius, the float shadow, 200ms ease-drawer, never as wide as the screen so the curve and a strip of the
 * page stay visible. Children with their own fill are clipped to the curve. Closed: add `panelClosedClass`
 * (translate-x-full + invisible, so nothing inside is focusable). Trap focus, Esc closes, focus returns to the trigger.
 */
export const drawerClass =
  'brand-scope zone-paper bg-plate fixed inset-y-0 right-0 z-[70] flex w-[min(420px,92vw)] flex-col overflow-hidden rounded-l-panel shadow-float ' +
  'transition-[transform,visibility] duration-200 ease-drawer'
/** Mobile side menu panel: the same sheet, w-[min(88vw,360px)]. The page adds the shadow (shadow-float). */
export const sideMenuClass =
  'brand-scope zone-paper bg-plate fixed inset-y-0 right-0 z-[70] flex w-[min(88vw,360px)] flex-col overflow-hidden rounded-l-panel ' +
  'transition-[transform,visibility] duration-200 ease-drawer'
export const panelClosedClass = 'invisible translate-x-full'

/** Overlay under a drawer or side menu (z 60): Nuit at 48%, no blur, fades over 150ms. Closed: add `overlayClosedClass`. */
export const overlayClass = 'fixed inset-0 z-[60] bg-nuit/48 transition-[opacity,visibility] duration-150 ease-calm'
export const overlayClosedClass = 'invisible pointer-events-none opacity-0'

// ── Cards and panels (§5.1, §5.2) ───────────────────────────────────────────────────────────────

const NUIT_PANEL = 'panel-nuit frame-corners rounded-panel shadow-float px-5 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16'
const NUIT_PANEL_SM = 'panel-nuit rounded-panel shadow-float p-6'
/** Light panel: white, a hairline and the faint lift. Cards inside it take the paper fill. */
const SIGN_PLATE = 'rounded-panel border border-hairline bg-plate shadow-lift [--z-card:var(--color-paper)] [--z-raised:var(--color-plate)]'
/**
 * The firm edge, kept for the one selected thing of a view (the advised plan, the buy box): 2px Bleu repère
 * (9.99:1 on the card, 8.62:1 on the page) and the float shadow.
 */
const FIRM_EDGE = 'border-2 border-nuit-700 shadow-float'

export const cardClass = {
  /** Base card: hairline, zone card fill, no shadow at rest. */
  base: 'rounded-card border border-z-line bg-z-card p-card',
  /** Panel-radius card (plan, related, support, app box, order review). */
  panel: 'rounded-panel border border-z-line bg-z-card p-card',
  /** Slim container (under about 72px tall: a band, a choice row): the 16px step, so it never turns into a lozenge. */
  inner: 'rounded-inner border border-z-line bg-z-card',
  /** Hover for a card that is one link: a 2px lift, the lift shadow and a deeper hairline; pressed returns to rest. */
  interactive:
    'transition-[transform,box-shadow,border-color,background-color] duration-180 ease-calm motion-safe:hover:-translate-y-0.5 hover:shadow-lift hover:border-hairline-deep ' +
    'motion-safe:active:translate-y-0 active:shadow-none',
  /** The 2px Bleu repère edge and float shadow of the advised plan and the buy box. */
  firm: FIRM_EDGE,
  /** Contained Nuit panel, only for a panel that shows a screen (app downloads). */
  nuitPanel: NUIT_PANEL,
  /** Small Nuit box. */
  nuitPanelSm: NUIT_PANEL_SM,
  /** Light panel (closing CTA, WhatsApp blocks, trial teaser, help box): one closing panel per page. */
  platePanel: `${SIGN_PLATE} px-5 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16`,
  /** Small light panel (FAQ help box). */
  platePanelSm: `${SIGN_PLATE} p-6`,
  /** Offer card / buy box: white with the firm Bleu repère edge. */
  recap: `relative rounded-panel bg-plate ${FIRM_EDGE} [--z-card:var(--color-paper)] [--z-raised:var(--color-plate)] px-5 pt-9 pb-6 lg:px-9 lg:pt-10 lg:pb-8`,
  /**
   * Order summary (checkout, cart): band panel with hairline-deep rules. No yellow in checkout. Narrow screen for
   * the text size (max-xs): 16px padding, like the form card beside it.
   */
  orderSummary: 'rounded-panel border border-hairline-deep bg-band p-card max-xs:p-4',
  /** Form card: forms always sit on a light card (plate; paper on a plate band). 16px padding on a narrow screen (max-xs). */
  form: 'rounded-panel border border-z-line bg-z-card p-card max-xs:p-4 [--field-bg:var(--z-raised)]',
} as const

/**
 * The corner of a block that bleeds to the inner edge of a firm-edged panel (the buy box's payment strip):
 * the panel radius minus its 2px edge.
 */
export const panelInnerBottomClass = 'rounded-b-[calc(var(--radius-panel)-2px)]'

/** Feature tile (icon square, 12px corners), zone-aware: nuit-100 tile with a Bleu repère glyph; on Nuit a raised tile with signal-300. */
export const tileClass =
  'grid shrink-0 place-items-center rounded-control bg-nuit-100 text-nuit-700 ' +
  'nuit:bg-nuit-raised nuit:text-signal-300 nuit:border nuit:border-nuit-line'

/** Check list item icon (20px, centred on the first line of 16px text): nuit-600 on light, signal-300 on Nuit. */
export const checkIconClass = 'ti ti-check shrink-0 text-[20px] mt-0.5 text-nuit-600 nuit:text-signal-300'

/**
 * Step number: a 32px disc, mono 600 at 15px, every state with an edge of 3:1 or more. `plain` for a list of
 * steps (white, Bleu repère edge and numeral: 7.85:1 on the band); for a stepper, `done` (blue tint, Bleu repère
 * edge, with a check), `current` (Bleu repère, white numeral) and `todo` (white, hairline-strong edge, muted).
 * Never a square (the square is the brand mark), never green, never under 28px.
 */
export const stepDiscClass = {
  base: 'grid size-8 shrink-0 place-items-center rounded-full border font-mono text-[0.9375rem] leading-none font-semibold',
  plain: 'border-nuit-700 bg-plate text-nuit-700 nuit:border-on-nuit-muted nuit:bg-transparent nuit:text-on-nuit',
  done: 'border-nuit-700 bg-nuit-100 text-nuit-700',
  current: 'border-nuit-700 bg-nuit-700 text-plate',
  todo: 'border-hairline-strong bg-plate text-ink-muted',
} as const

// ── Small labels ────────────────────────────────────────────────────────────────────────────────

/**
 * Tab « Notre conseil »: a label straddling the top edge of the advised card, its left edge on the card's text
 * column. Yellow inside a 1px ink keyline, 28px tall, 8px corners, display 650 at 14px in sentence case, a 6px ink
 * square before the text (square corners). A label, never a pill: it must not look tappable. Once per page.
 */
export const tabClass =
  'absolute left-card top-0 z-[2] -translate-y-1/2 inline-flex h-7 items-center gap-1.5 rounded-tag border border-ink bg-signal-500 px-2.5 ' +
  "font-display text-badge text-ink whitespace-nowrap before:size-1.5 before:shrink-0 before:bg-ink before:content-['']"

/** Saving chip (only with a real reference price): ink plate with a signal-300 figure; on Nuit, signal-300 plate with a nuit figure. */
export const savingChipVariants = cva(
  'inline-flex items-center rounded-tag font-display font-bold proportional-nums bg-ink text-signal-300 nuit:bg-signal-300 nuit:text-nuit',
  {
    variants: {
      size: { md: 'h-7 px-2.5 text-[0.875rem] leading-none', lg: 'h-8 px-3 text-base leading-none' },
    },
    defaultVariants: { size: 'md' },
  },
)

/** Static tag: 28px, 8px corners, a hairline. Never a pill, so it never looks tappable. */
export const neutralTagClass =
  'inline-flex h-7 items-center rounded-tag border border-z-line px-2.5 font-sans text-micro font-semibold text-z-soft'

/**
 * Chips. The shape says whether a chip can be tapped.
 * - Static (a label: themes, apps, model tags): 8px corners, a hairline.
 * - `interactive` (a filter or a choice, rendered as a button): a full pill, 36px drawn inside a 44px hit area,
 *   white with a 1px hairline-strong edge (the edge of a field, 3:1 or more). Hover: the edge turns Bleu repère.
 *   Chosen (`selected`): blue tint, a 1.5px Bleu repère edge drawn inside so nothing shifts, ink label, and a check
 *   before the label (the <Chip> component adds it): never a filled chip, which would read as a second main action,
 *   and never colour alone.
 */
export const chipVariants = cva('inline-flex items-center gap-2 border font-sans font-medium', {
  variants: {
    size: { md: 'min-h-8 px-3 py-1 text-[0.9375rem] leading-tight', sm: 'min-h-7 px-2.5 py-0.5 text-micro leading-tight' },
    interactive: {
      false: 'rounded-tag border-z-line bg-z-card text-z-soft nuit:bg-nuit-raised nuit:border-nuit-line nuit:text-on-nuit',
      true:
        'relative min-h-9 cursor-pointer select-none rounded-full border-hairline-strong bg-plate px-3.5 text-ink ' +
        "after:absolute after:inset-x-0 after:-inset-y-1 after:content-[''] " +
        'transition-[background-color,border-color,box-shadow] duration-150 ease-calm hover:border-nuit-700 active:bg-nuit-100 ' +
        'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-z-focus ' +
        'disabled:cursor-not-allowed disabled:border-band-deep disabled:bg-band-deep disabled:text-ink-muted ' +
        'nuit:bg-transparent nuit:border-nuit-outline nuit:text-on-nuit nuit:hover:border-on-nuit nuit:active:bg-on-nuit/12',
    },
    selected: { true: '', false: '' },
  },
  compoundVariants: [
    // A static chip marked selected keeps the label shape and takes the chosen colours.
    { interactive: false, selected: true, class: 'border-nuit-700 bg-nuit-100 text-ink nuit:bg-plate nuit:text-ink nuit:border-plate' },
    {
      interactive: true,
      selected: true,
      class:
        'border-nuit-700 bg-nuit-100 shadow-[inset_0_0_0_0.5px_var(--color-nuit-700)] ' +
        'nuit:bg-plate nuit:text-ink nuit:border-plate nuit:shadow-none',
    },
  ],
  defaultVariants: { size: 'md', interactive: false, selected: false },
})
export const chipIconClass = 'text-[16px] text-nuit-700 nuit:text-signal-300'

/** Payment method as a monochrome text mark: a 28px white tag at least 44px wide, display 650 at 14px. Never a raster logo strip. */
export const paymentBadgeClass =
  'inline-flex h-7 min-w-11 items-center justify-center rounded-tag border border-z-line bg-z-card px-2 font-display text-badge text-ink-body ' +
  'nuit:bg-transparent nuit:border-nuit-line nuit:text-on-nuit'

/**
 * Quality stamp: 1px ink keyline, display 700. Top tier: ink fill with a signal-300 label (Nuit: signal-500 fill,
 * nuit label). `long` sets a name longer than two characters (« Full HD ») on one line inside the same 56px box.
 */
export const qualityStampClass = {
  base:
    'grid h-10 w-14 shrink-0 place-items-center rounded-tag border border-ink font-display text-lg leading-none font-bold text-ink ' +
    'nuit:border-nuit-outline nuit:text-on-nuit',
  long: 'text-[0.875rem] leading-none whitespace-nowrap',
  top: 'bg-ink text-signal-300 border-ink nuit:bg-signal-500 nuit:text-nuit nuit:border-signal-500',
} as const

/** Status square: 8px ok square with an ok-100 halo (Nuit: nuit-800 halo). Never pulses. */
export const statusDotClass = 'inline-block size-2 shrink-0 bg-ok ring-[3px] ring-ok-100 nuit:ring-nuit-800'

/** Cart count: a 20px signal-500 disc in a 1px ink keyline on the round cart button, display 700 tabular. */
export const cartCountClass =
  'absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full border border-ink bg-signal-500 px-1 ' +
  'font-display text-[0.75rem] leading-none font-bold text-ink tabular-nums'

// ── Rows ────────────────────────────────────────────────────────────────────────────────────────

export const trustRowClass = 'flex flex-wrap gap-x-6 gap-y-3'
export const trustItemClass = 'inline-flex items-center gap-2 font-sans text-meta font-medium text-z-body'
export const guaranteeRowClass =
  'flex flex-wrap justify-center gap-x-4 gap-y-2 font-sans text-micro font-medium text-z-body sm:gap-x-5'
export const infoRowClass =
  'flex items-center gap-2.5 rounded-control bg-z-raised px-3.5 py-2.5 font-sans text-meta font-semibold text-z-accent'

// ── Missing facts (§8.3) ────────────────────────────────────────────────────────────────────────

/**
 * <Pending>: a calm, visible marker for a fact the owner has not given yet. Kept the least polished thing on the
 * page, on purpose: tinted ground, dashed ink edge, 8px corners, hollow square (square corners), mono 14px. It
 * never takes a price or display size, never becomes a pill or a solid tag, so it can never read as a figure or a
 * finished label. The box moves to the next line as a unit and wraps inside only when it is wider than the line.
 * The hollow square sits on the first line (centred in its 19px line box), so a marker that wraps inside a narrow
 * card still reads from its square.
 */
export const pendingClass = {
  inline:
    'inline-flex max-w-full items-baseline gap-1.5 rounded-tag border border-dashed border-ink bg-signal-100 px-2 py-0.5 ' +
    'font-mono text-[0.875rem] leading-snug font-medium tracking-normal normal-case text-ink align-baseline ' +
    "before:mt-[0.4em] before:size-2 before:shrink-0 before:self-start before:border-[1.5px] before:border-current before:content-[''] " +
    'nuit:bg-transparent nuit:border-signal-300 nuit:text-signal-300',
  block: 'flex w-fit max-w-full rounded-control px-3.5 py-2.5 text-[0.875rem] leading-snug',
} as const

/** facts.ts key of the WhatsApp number (data-pending on a WhatsApp action whose link is not given yet). */
export const WHATSAPP_FACT = 'support.whatsapp'
/** facts.ts key of the accepted means of payment (the payment row's marker). */
export const PAYMENT_METHODS_FACT = 'payment.methods'
/**
 * The pending look on a WhatsApp action (button, icon circle, bubble) whose number is not given yet: the action's
 * own shape and height with the dashed edge and the pale fill; not a link, not focusable.
 */
export const whatsappPendingClass =
  'cursor-default border-dashed border-ink bg-signal-100 text-ink shadow-none hover:bg-signal-100 hover:border-ink active:bg-signal-100 active:border-ink motion-safe:active:translate-y-0 ' +
  'nuit:bg-transparent nuit:border-signal-300 nuit:text-signal-300 nuit:hover:bg-transparent nuit:hover:border-signal-300'

// ── Forms and notices ───────────────────────────────────────────────────────────────────────────

export const fieldClass = {
  field: 'grid gap-2',
  /** Always visible, above the field: 16px semibold ink. */
  label: 'font-sans text-small font-semibold text-ink',
  required: "after:ml-0.5 after:text-ink-muted after:content-['*']",
  // break-anywhere: a helper or an error may quote a long token (an address, a code such as AA:BB:CC:11:22:33)
  // that must break inside the field's column rather than widen it.
  helper: '-mt-0.5 font-sans text-meta text-ink-muted break-anywhere',
  error: '-mt-0.5 inline-flex items-start gap-1.5 font-sans text-meta font-medium text-alert break-anywhere',
  /**
   * The box: 52px, 12px corners (never a pill, never rounder: a field must not look like a button), a 1px
   * hairline-strong edge (4.58:1 against its own fill), 17px text. Focus: the edge turns Bleu repère and thickens to
   * 2px inside (no shift), plus the one focus ring; no halo. Error: the same in alert, with words under the field.
   */
  control:
    'min-h-[52px] w-full rounded-control border border-hairline-strong bg-[var(--field-bg,var(--color-plate))] px-4 py-3 font-sans text-[1.0625rem] leading-[1.4] text-ink-body ' +
    'placeholder:text-ink-muted transition-[border-color,box-shadow] duration-150 ease-calm ' +
    'hover:border-ink focus:border-nuit-700 focus:hover:border-nuit-700 focus:shadow-[inset_0_0_0_1px_var(--color-nuit-700)] ' +
    'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-nuit-700 ' +
    'aria-invalid:border-alert aria-invalid:hover:border-alert aria-invalid:focus:border-alert aria-invalid:shadow-[inset_0_0_0_1px_var(--color-alert)] ' +
    'disabled:cursor-not-allowed disabled:border-band-deep disabled:bg-band-deep disabled:text-ink-muted disabled:hover:border-band-deep',
  select: 'appearance-none pr-11',
  textarea: 'min-h-[140px] resize-y',
  check: 'brand-check',
  radio: 'brand-radio',
} as const

/**
 * Choice row (a radio in a card: duration, payment method): at least 64px, 16px corners, white with a
 * hairline-strong edge; hover: Bleu repère edge; chosen: a 2px Bleu repère edge drawn inside (no shift) on the
 * blue tint, with the filled radio. The focus ring surrounds the whole row. 12px side padding on a narrow screen
 * for the text size (max-xs).
 */
export const choiceRowClass =
  'flex min-h-16 cursor-pointer flex-wrap items-center gap-3 rounded-inner border border-hairline-strong bg-plate px-4 py-3.5 max-xs:px-3 ' +
  'transition-[background-color,border-color,box-shadow] duration-150 ease-calm hover:border-nuit-700 ' +
  'has-[:checked]:border-nuit-700 has-[:checked]:bg-nuit-100 has-[:checked]:shadow-[inset_0_0_0_1px_var(--color-nuit-700)] ' +
  'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-nuit-700 ' +
  'has-[:disabled]:cursor-not-allowed has-[:disabled]:border-band-deep has-[:disabled]:bg-band-deep'

/**
 * Segmented choice (two or three short options): a band-coloured pill track with 4px of padding and 44px
 * segments, so the chosen thumb is concentric with the track. Chosen: a white thumb with a 1.5px Bleu repère edge
 * (7.85:1 against the band) and the lift shadow, ink label; the others are transparent with soft labels. Never a
 * filled blue or ink thumb (it would look like the pay button), never a switch. See <Segmented>.
 */
export const segmentedClass = {
  track: 'm-0 grid w-full max-w-[360px] min-w-0 auto-cols-fr grid-flow-col rounded-full border-0 bg-band p-1',
  segment: 'relative flex min-w-0 cursor-pointer has-[:disabled]:cursor-not-allowed',
  thumb:
    'flex min-h-11 w-full min-w-0 items-center justify-center rounded-full px-3 text-center font-sans text-base leading-tight font-semibold text-ink-soft ' +
    'transition-[background-color,box-shadow,color] duration-180 ease-calm hover:text-ink peer-active:bg-nuit-100 ' +
    'peer-checked:bg-plate peer-checked:text-ink peer-checked:shadow-[inset_0_0_0_1.5px_var(--color-nuit-700),var(--shadow-lift)] ' +
    'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-z-focus ' +
    'peer-disabled:text-ink-muted peer-disabled:hover:text-ink-muted',
} as const

/**
 * Notices: a pale tint with dark text of the same hue, 16px corners (a two-line notice must not turn into a
 * lozenge), 16px text, and a 1px edge of the text colour at 30% (the blue tint alone is 1.21:1 on a white card).
 * Status is never colour alone: the <Notice> component adds the icon, the page the words.
 */
const NOTICE = 'flex gap-3 rounded-inner border px-4 py-3.5 font-sans text-small font-medium'
export const noticeClass = {
  success: `${NOTICE} border-ok/30 bg-ok-100 text-ok`,
  error: `${NOTICE} border-alert/30 bg-alert-100 text-alert`,
  info: `${NOTICE} border-nuit-700/30 bg-nuit-100 text-nuit-700`,
} as const

/** Toast (sonner): plain Nuit (zone variables, signal-300 focus ring, no texture), 16px corners, z 90 via the toaster. One at a time. */
export const toastClass =
  'brand-scope nuit-plain rounded-inner shadow-float px-4 py-3.5 font-sans text-small text-on-nuit [&_i]:text-signal-300'

// ── Imagery (§5.4) ──────────────────────────────────────────────────────────────────────────────

/** Fill cycle of channel-mosaic tiles. */
export const MOSAIC_FILLS = ['bg-nuit-800', 'bg-nuit-700', 'bg-nuit-900', 'bg-nuit-800', 'bg-nuit'] as const

/** Default mosaic glyphs (generic theme pictograms, never channel names or logos). */
export const MOSAIC_ICONS = ['ti-ball-football', 'ti-movie', 'ti-news', 'ti-mood-kid', 'ti-world', 'ti-music'] as const

/** Sport mosaic glyphs (no team or league marks). */
export const SPORT_ICONS = ['ti-ball-football', 'ti-ball-basketball', 'ti-ball-tennis', 'ti-play-football'] as const

/** Initials for a monogram, generated from an existing name ("Sarah Benali" → "SB"). */
export function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  const letters = words.length > 1 ? [words[0], words[words.length - 1]] : words
  return letters.map((w) => w.charAt(0).toLocaleUpperCase('fr')).join('')
}

/** Reveal stagger: 60 ms per item, capped at 4 items (180 ms). */
export function revealDelay(index = 0) {
  return `${Math.min(Math.max(index, 0), 3) * 60}ms`
}
