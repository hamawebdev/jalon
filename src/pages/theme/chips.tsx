import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'

/**
 * A jump chip: a link that leads to a part of a page (a help topic, a device family, a guide). A pill, because it is
 * tapped: 44px tall, white with the edge of a field (hairline-strong, 3:1 or more), a Bleu repère edge on hover and
 * the one focus ring. With an icon the pill takes 4px less padding on that side, so the label looks centred.
 * One look for the three lists that use it (/aide/ themes and guides, /applications/ « Votre appareil »).
 */
export const jumpChipClass =
  'inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline-strong bg-plate px-4 font-sans text-[0.9375rem] leading-tight font-semibold text-ink ' +
  'transition-colors duration-150 ease-calm hover:border-nuit-700 hover:bg-nuit-100 active:bg-band ' +
  'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-z-focus'

type JumpChipProps = {
  /** An anchor on this page (« #guide-tv »). */
  href?: string
  /** A route, with or without an anchor (« /applications/#guide-tv »). */
  to?: string
  /** Tabler icon before the label (« ti-device-tv »), 18px. */
  icon?: string
  /** Tabler icon after the label, for a chip that leaves the page (« ti-arrow-right »), 16px. */
  iconEnd?: string
  children: ReactNode
  className?: string
}

export function JumpChip({ href, to, icon, iconEnd, children, className }: JumpChipProps) {
  const cls = cn(jumpChipClass, icon && 'pl-3', iconEnd && 'pr-3', className)
  const body = (
    <>
      {icon && <i className={cn('ti shrink-0 text-[18px] text-nuit-700', icon)} aria-hidden="true" />}
      {children}
      {iconEnd && <i className={cn('ti shrink-0 text-[16px] text-nuit-700', iconEnd)} aria-hidden="true" />}
    </>
  )
  return to ? (
    <Link to={to} className={cls}>
      {body}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {body}
    </a>
  )
}
