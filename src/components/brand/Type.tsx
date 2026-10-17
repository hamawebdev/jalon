import { Fragment, type AnchorHTMLAttributes, type ElementType, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from '@/lib/utils'
import { linkClass, linkStandaloneClass, tapTargetClass } from './recipes'

type EyebrowProps = {
  children: ReactNode
  /** Centred heads only (404, single-message panels). The square stays on the left. */
  center?: boolean
  as?: ElementType
  className?: string
}

/**
 * Short label above a heading: text face 600 at 14px, sentence case, in the zone accent (Bleu repère on light,
 * signal-300 on Nuit), after the 8px keylined square. Never capitals, never a sentence.
 */
export function Eyebrow({ children, center, as: Tag = 'p', className }: EyebrowProps) {
  return <Tag className={cn(center ? 'eyebrow-center' : 'eyebrow', className)}>{children}</Tag>
}

const HEAD_SIZE = {
  xl: 'text-display-xl',
  lg: 'text-display-lg',
  md: 'text-display-md',
  sm: 'text-display-sm',
} as const

type SectionHeadProps = {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  /** Heading level (default h2; h1 for page heroes). */
  as?: 'h1' | 'h2' | 'h3'
  /** display-xl (home H1), display-lg (page H1), display-md (section H2, default), display-sm (bands, panels). */
  size?: keyof typeof HEAD_SIZE
  /** start (default). center only for the 404 and single-message panels: no stacks of centred heads. */
  align?: 'start' | 'center'
  /** Sticky from lg (4/8 FAQ and guide heads). */
  sticky?: boolean
  id?: string
  className?: string
  /** Extra content under the lead (a button pair …). */
  children?: ReactNode
}

/** Eyebrow → 12px → heading → 16px → lead. Left-aligned by default. Wrap at most one keyword per heading in <Kw>. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  as: H = 'h2',
  size = 'md',
  align = 'start',
  sticky,
  id,
  className,
  children,
}: SectionHeadProps) {
  const center = align === 'center'
  return (
    <header
      className={cn(
        // flex column: the inline-flex eyebrow becomes a flex item, so no line-box strut adds to the 16px gap
        'flex max-w-[56rem] flex-col',
        center && 'mx-auto items-center text-center',
        sticky && 'lg:sticky lg:top-24 lg:self-start',
        className,
      )}
    >
      {eyebrow != null && <Eyebrow center={center}>{eyebrow}</Eyebrow>}
      <H id={id} className={cn('font-display text-z-fg', HEAD_SIZE[size], eyebrow != null && 'mt-3')}>
        {title}
      </H>
      {lead != null && <p className={cn('mt-4 max-w-[56ch] font-sans text-lead text-z-soft', center && 'mx-auto')}>{lead}</p>}
      {children}
    </header>
  )
}

const LEADING_FIGURE = /^([+−-]?\d[\d\s.,]*\s+)/

/** All-caps keyword, or one that starts with an all-caps word ("4K Ultra"): roman, no mark. */
function isCapsKeyword(text: string) {
  const first = text.trim().split(/\s+/)[0] ?? ''
  const isCaps = (w: string) => /\p{L}/u.test(w) && w === w.toLocaleUpperCase('fr')
  return isCaps(text) || (first.replace(/[^\p{L}]/gu, '').length > 1 && isCaps(first))
}

/**
 * The keyword of a heading. In the page's h1 it takes the one yellow marker stroke of the page, under the word
 * (.kw in index.css), and never wraps; in h2 to h6 it carries no mark, so the stroke is never repeated as
 * decoration. The text stays the zone foreground. Acronyms and all-caps keywords (4K, HD) take no mark; a leading
 * figure ("+20 ") stays outside it. At most one per heading; keep an h1 keyword short enough for a 320px screen.
 * Never set the brand name as a keyword, and never use <em> for it.
 */
export function Kw({ children, className }: { children: string; className?: string }) {
  if (isCapsKeyword(children)) {
    return <span className={cn('kw-caps', className)}>{children}</span>
  }
  const m = children.match(LEADING_FIGURE)
  if (m) {
    return (
      <Fragment>
        {m[1]}
        <span className={cn('kw', className)}>{children.slice(m[1].length)}</span>
      </Fragment>
    )
  }
  return <span className={cn('kw', className)}>{children}</span>
}

type StandaloneLink = {
  /**
   * The link stands on its own line (not inside a sentence): same look in a 44px-tall tap box. It adds about 10px
   * of air above and below one line of text; take it off the margin around, or pass className="-my-2.5".
   */
  standalone?: boolean
}

/** Text link (router): Bleu repère on light, signal-300 on Nuit. Inside a sentence by default; `standalone` on its own line. */
export function TextLink({ className, standalone, ...props }: LinkProps & StandaloneLink) {
  return <Link {...props} className={cn(standalone ? linkStandaloneClass : linkClass, typeof className === 'string' ? className : undefined)} />
}

/** Text link (plain href). Inside a sentence by default; `standalone` on its own line. */
export function TextA({ className, standalone, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & StandaloneLink) {
  return <a {...props} className={cn(standalone ? linkStandaloneClass : linkClass, className)} />
}

type Crumb = { label: string; to?: string }

/**
 * Breadcrumb: meta text (15px), 16px chevron separators, current item semibold with aria-current. Each link is a 44px-tall tap
 * box; the list takes that extra height back in its block margins, so a one-row breadcrumb is as tall as its text.
 */
export function Breadcrumb({ items, label, className }: { items: Crumb[]; label?: string; className?: string }) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="my-[calc((var(--text-meta)*var(--text-meta--line-height)-2.75rem)/2)] flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-meta font-medium text-z-muted">
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${c.label}-${i}`} className="inline-flex items-center gap-2">
              {last || !c.to ? (
                <span aria-current={last ? 'page' : undefined} className={cn(last && 'font-semibold text-z-fg')}>
                  {c.label}
                </span>
              ) : (
                <Link to={c.to} className={cn(tapTargetClass, 'rounded-tag underline-offset-4 transition-colors duration-150 ease-calm hover:text-z-fg hover:underline')}>
                  {c.label}
                </Link>
              )}
              {!last && <i className="ti ti-chevron-right text-[16px]" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
