import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { WHATSAPP_HREF } from '@/lib/site'
import { cn } from '@/lib/utils'
import { joinWords, pendingText } from './identity'
import { WHATSAPP_FACT, buttonIconSize, buttonVariants, iconClass, whatsappPendingClass } from './recipes'
import { markerShown } from './scope'
import type { ButtonSize, ButtonVariant, Cta, IconName } from './types'

type ButtonLookProps = {
  /**
   * primary (Bleu repère, the one filled action of a view), secondary (white, Bleu repère edge), quiet (labelled
   * chrome pill), link, whatsapp, icon (44px circle); on Nuit: plate, outline-nuit, link-nuit, icon-nuit.
   * `signal` is deprecated and renders primary: there is no yellow button.
   */
  variant?: ButtonVariant
  size?: ButtonSize
  /** Leading Tabler icon (one icon per button at most). */
  iconStart?: IconName
  /** Trailing Tabler icon; 'arrow' = ti-arrow-right that nudges on hover (buy actions). */
  iconEnd?: IconName | 'arrow'
  full?: boolean
  /** Keeps the label, swaps the icon for a spinner, sets aria-busy and blocks clicks. */
  loading?: boolean
  className?: string
  children?: ReactNode
}

/** Text actions have no side padding to give back. */
const NO_PAD = new Set<ButtonVariant>(['link', 'link-nuit'])

function Inner({ iconStart, iconEnd, loading, size = 'md', variant = 'primary', children }: ButtonLookProps) {
  const sz = buttonIconSize[size]
  // Optical centring: a pill carries 4px less padding on its icon side, so label and icon read as centred.
  const pad = !NO_PAD.has(variant) && children != null
  const startCls = cn(sz, pad && '-ml-1')
  const endCls = cn(sz, pad && '-mr-1')
  const spinner = <i className={iconClass('ti-loader-2', cn(endCls, 'motion-safe:animate-spin'))} aria-hidden="true" />
  const start = iconStart ? (loading && !iconEnd ? <i className={iconClass('ti-loader-2', cn(startCls, 'motion-safe:animate-spin'))} aria-hidden="true" /> : <i className={iconClass(iconStart, startCls)} aria-hidden="true" />) : null
  const end = iconEnd
    ? loading
      ? spinner
      : iconEnd === 'arrow'
        ? (
            <i
              className={iconClass('ti-arrow-right', cn(endCls, 'transition-transform duration-180 ease-calm motion-safe:group-hover/btn:translate-x-0.5'))}
              aria-hidden="true"
            />
          )
        : <i className={iconClass(iconEnd, endCls)} aria-hidden="true" />
    : null
  return (
    <>
      {start}
      {children != null && <span>{children}</span>}
      {end}
      {loading && !iconStart && !iconEnd && spinner}
    </>
  )
}

function look({ variant = 'primary', size = 'md', full, className }: ButtonLookProps) {
  return cn(buttonVariants({ variant, size, full: !!full }), className)
}

type ButtonProps = ButtonLookProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

/** <button>. Default type="button"; pass type="submit" for forms. */
export function Button({ variant, size, iconStart, iconEnd, full, loading, className, children, type, disabled, onClick, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      type={type ?? 'button'}
      disabled={disabled}
      aria-busy={loading || undefined}
      onClick={loading ? (e) => e.preventDefault() : onClick}
      className={look({ variant, size, full, className })}
    >
      <Inner iconStart={iconStart} iconEnd={iconEnd} loading={loading} size={size} variant={variant}>
        {children}
      </Inner>
    </button>
  )
}

type ButtonLinkProps = ButtonLookProps & Omit<LinkProps, 'className' | 'children'> & { disabled?: boolean }

/** react-router <Link> styled as a button. `disabled` renders aria-disabled and blocks navigation. */
export function ButtonLink({ variant, size, iconStart, iconEnd, full, loading, className, children, disabled, onClick, ...rest }: ButtonLinkProps) {
  const blocked = disabled || loading
  return (
    <Link
      {...rest}
      aria-disabled={blocked || undefined}
      aria-busy={loading || undefined}
      tabIndex={disabled ? -1 : rest.tabIndex}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => (blocked ? e.preventDefault() : onClick?.(e))}
      className={look({ variant, size, full, className })}
    >
      <Inner iconStart={iconStart} iconEnd={iconEnd} loading={loading} size={size} variant={variant}>
        {children}
      </Inner>
    </Link>
  )
}

type ButtonAProps = ButtonLookProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & { disabled?: boolean }

/** Plain <a href> styled as a button (external links, #anchors, downloads). */
export function ButtonA({ variant, size, iconStart, iconEnd, full, loading, className, children, disabled, onClick, ...rest }: ButtonAProps) {
  const blocked = disabled || loading
  return (
    <a
      {...rest}
      aria-disabled={blocked || undefined}
      aria-busy={loading || undefined}
      tabIndex={disabled ? -1 : rest.tabIndex}
      onClick={(e) => (blocked ? e.preventDefault() : onClick?.(e))}
      className={look({ variant, size, full, className })}
    >
      <Inner iconStart={iconStart} iconEnd={iconEnd} loading={loading} size={size} variant={variant}>
        {children}
      </Inner>
    </a>
  )
}

type CtaButtonProps = Omit<ButtonLookProps, 'children'> & { cta: Cta }

/**
 * Renders a Cta with the right element: ButtonLink when `to` is set, ButtonA when `href` is set, otherwise
 * a <button>. Used by PlanCard, Recap and BuyBar; use it for any `{ label, to | href, onClick }` object.
 */
export function CtaButton({ cta, ...look }: CtaButtonProps) {
  const { label, to, href, onClick, ariaLabel, target, rel } = cta
  if (to) {
    return (
      <ButtonLink {...look} to={to} onClick={onClick} aria-label={ariaLabel} target={target} rel={rel}>
        {label}
      </ButtonLink>
    )
  }
  if (href) {
    return (
      <ButtonA {...look} href={href} onClick={onClick} aria-label={ariaLabel} target={target} rel={rel}>
        {label}
      </ButtonA>
    )
  }
  return (
    <Button {...look} onClick={onClick} aria-label={ariaLabel}>
      {label}
    </Button>
  )
}

/** Icon-only WhatsApp circles: 44px in the phone header (size sm), 48px in the buy bars (md, lg). */
const WA_ICON_ONLY = { sm: 'size-11 min-h-0 shrink-0 p-0 text-[20px]', md: 'size-12 min-h-0 shrink-0 p-0 text-[24px]', lg: 'size-12 min-h-0 shrink-0 p-0 text-[24px]' } as const

type WhatsAppButtonProps = {
  /** The visible label (« WhatsApp » on short buttons; « Écrire sur WhatsApp » as the full name). */
  label: string
  /** sm = 44px icon circle (phone header), md = 48px (buy bars). */
  size?: ButtonSize
  /** Icon-only circle; the label stays as sr-only text. */
  iconOnly?: boolean
  /**
   * The WhatsApp link (from facts). `null` = the number is not given yet: the button keeps its place in the
   * pending look (« À compléter »), is not a link and carries data-pending="support.whatsapp". Launch mode: that
   * look stays only while the number is a required fact; otherwise the button renders nothing (a panel or a
   * sentence built around it is the page's to scope: <FactScope facts="support.whatsapp">).
   */
  href?: string | null
  full?: boolean
  className?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'>

/** WhatsApp action: WhatsApp green with a nuit glyph and label (never white). */
export function WhatsAppButton({ label, size = 'md', iconOnly, href = WHATSAPP_HREF, full, className, ...rest }: WhatsAppButtonProps) {
  if (href == null) {
    if (!markerShown(WHATSAPP_FACT)) return null
    return (
      <span
        data-pending={WHATSAPP_FACT}
        className={cn(buttonVariants({ variant: 'whatsapp', size, full: !!full }), whatsappPendingClass, iconOnly && WA_ICON_ONLY[size], className)}
      >
        <i className={iconClass('ti-brand-whatsapp', iconOnly ? undefined : cn(buttonIconSize[size], '-ml-1'))} aria-hidden="true" />
        {iconOnly ? (
          <span className="sr-only">{joinWords(label, pendingText('numéro WhatsApp', WHATSAPP_FACT))}</span>
        ) : (
          <span>
            {label}
            <span className="font-mono text-[0.875rem] font-medium"> · À compléter</span>
          </span>
        )}
      </span>
    )
  }
  if (iconOnly) {
    return (
      <a {...rest} href={href} className={cn(buttonVariants({ variant: 'whatsapp', size }), WA_ICON_ONLY[size], className)}>
        <i className="ti ti-brand-whatsapp" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </a>
    )
  }
  return (
    <ButtonA {...rest} href={href} variant="whatsapp" size={size} full={full} iconStart="ti-brand-whatsapp" className={className}>
      {label}
    </ButtonA>
  )
}
