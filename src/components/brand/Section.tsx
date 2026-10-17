import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Tab } from './Labels'
import { SCOPE, cardClass, containerClass, rhythmClass, zoneClass } from './recipes'
import type { ContainerSize, Rhythm, Zone } from './types'

type SectionProps = Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'> & {
  /**
   * Exactly one zone per section root (IDENTITY §3.2): paper, plate, band, or nuit (screen-led sections and
   * the footer only, §3.3).
   */
  zone: Zone
  /** The section hook, rendered as data-section (keep the existing value). */
  dataSection: string
  /** Existing anchor id, if any (gets scroll-mt-[88px]). */
  id?: string
  /** Vertical rhythm: section 80 to 144 (default), sm 48 to 72, hero 40 to 88, none. */
  rhythm?: Rhythm
  /** Continues the ground of the section above: pt-0. */
  continues?: boolean
  /** Inner container width, or false to lay out the children yourself. Default content (1200). */
  container?: ContainerSize | false
  /** Clip overflowing decoration (graduations at the edges) on both axes with overflow: clip (sticky still works). Default true. */
  clip?: boolean
  /** Root element (default section). */
  as?: ElementType
  className?: string
  /** Classes for the inner container (grid, flex …). */
  containerClassName?: string
  children?: ReactNode
}

/**
 * Section root of a band built with the kit: zone ground + zone variables, the brand reset scope, the vertical
 * rhythm and the container. Every section starts here. Left-aligned by default.
 */
export function Section({
  zone,
  dataSection,
  id,
  rhythm = 'section',
  continues,
  container = 'content',
  clip = true,
  as: Tag = 'section',
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag
      {...rest}
      id={id}
      data-section={dataSection}
      className={cn(
        SCOPE,
        zoneClass[zone],
        'relative',
        clip && 'overflow-clip',
        rhythmClass[rhythm],
        continues && 'pt-0 border-t-0',
        id && 'scroll-mt-[88px]',
        className,
      )}
    >
      {container ? <div className={cn(containerClass[container], containerClassName)}>{children}</div> : children}
    </Tag>
  )
}

type ContainerProps = {
  size?: ContainerSize
  as?: ElementType
  className?: string
  children?: ReactNode
}

/** Centred container: `mx-auto px-gutter max-w-{content|wide|text}`. Never add the padding shorthand. */
export function Container({ size = 'content', as: Tag = 'div', className, children }: ContainerProps) {
  return <Tag className={cn(containerClass[size], className)}>{children}</Tag>
}

type PanelProps = {
  /** small: the compact box (p-6). */
  size?: 'default' | 'small'
  as?: ElementType
  className?: string
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>

/**
 * Contained Nuit panel with viewfinder corners, only for a panel that shows a screen (app downloads, a device
 * mock-up). Its children read the Nuit zone variables. CTA, WhatsApp, trial and help panels use <PlatePanel>.
 */
export function NuitPanel({ size = 'default', as: Tag = 'div', className, children, ...rest }: PanelProps) {
  return (
    <Tag {...rest} className={cn(size === 'small' ? cardClass.nuitPanelSm : cardClass.nuitPanel, className)}>
      {children}
    </Tag>
  )
}

type PlatePanelProps = PanelProps & {
  /** Tab text on the top-left edge (« Notre conseil »): once per page, only if the content has one. */
  tab?: ReactNode
}

/**
 * Light panel: white, a hairline and the faint lift shadow, panel radius, with an optional tab. For the closing
 * CTA (one per page, one filled button; a second path is a text link), WhatsApp blocks, the trial teaser and the
 * FAQ help box. Same size API as <NuitPanel>.
 */
export function PlatePanel({ size = 'default', tab, as: Tag = 'div', className, children, ...rest }: PlatePanelProps) {
  return (
    <Tag {...rest} className={cn(size === 'small' ? cardClass.platePanelSm : cardClass.platePanel, tab != null && 'relative', className)}>
      {tab != null && <Tab className={size === 'small' ? 'left-6' : 'left-5 md:left-12 lg:left-16'}>{tab}</Tab>}
      {children}
    </Tag>
  )
}
