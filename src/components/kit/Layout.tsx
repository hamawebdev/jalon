// Page structure: sections, section headers, eyebrow badges, bento cards.
import { Fragment, type ComponentProps, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Centered content column, 1200px max, 16px side gutter on phones. */
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8', className)} {...props} />
}

const SECTION_BG = {
  white: 'bg-canvas',
  mist: 'bg-mist',
  ink: 'bg-ink text-white',
  primary: 'bg-gradient-to-br from-primary to-primary-deep text-white',
} as const

/** A page section. `id` is the anchor (HOME_ANCHORS in src/i18n/routes.ts on the home page). */
export function Section({
  id,
  bg = 'white',
  className,
  containerClassName,
  children,
  ...props
}: Omit<ComponentProps<'section'>, 'id'> & {
  id?: string
  bg?: keyof typeof SECTION_BG
  containerClassName?: string
}) {
  return (
    <section id={id} className={cn('py-16 sm:py-24', SECTION_BG[bg], className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

/** Eyebrow pill badge: light violet background, violet text (brief: #EFE9FF / #5034FF, rounded-full). */
export function Badge({ className, children, tone = 'primary' }: { className?: string; children: ReactNode; tone?: 'primary' | 'status' | 'gold' | 'white' }) {
  const tones = {
    primary: 'bg-primary-soft text-primary',
    status: 'bg-status-soft text-status-deep',
    gold: 'bg-gold text-ink',
    white: 'bg-white/15 text-white',
  }
  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

// Brand names the brief wants in violet in headings (« Atlas Pro ONTV / Atlas Pro » in #5034FF). Longest first.
const BRAND_PHRASES = ['Atlas Pro ONTV', 'Atlas Pro ON TV', 'Atlaspro ONTV', 'IPTV Atlas Pro', 'Atlas Pro']

/**
 * Text with brand names (and any `extra` phrases) in violet. Use it for every heading:
 * <h2><Highlight text={t.story.why.title} /></h2>
 */
export function Highlight({ text, extra = [], className }: { text: string; extra?: string[]; className?: string }) {
  const phrases = [...extra, ...BRAND_PHRASES].filter(Boolean).sort((a, b) => b.length - a.length)
  const pattern = new RegExp(`(${phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  const parts = text.split(pattern)
  const lower = phrases.map((p) => p.toLowerCase())
  // Brand names never break across lines; longer extra phrases may wrap (phones).
  const brand = BRAND_PHRASES.map((p) => p.toLowerCase())
  return (
    <>
      {parts.map((part, i) =>
        lower.includes(part.toLowerCase()) ? (
          <span key={i} className={cn(brand.includes(part.toLowerCase()) && 'whitespace-nowrap', 'text-primary', className)}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

/** Badge + heading + subtitle, centered by default. */
export function SectionHeader({
  badge,
  title,
  subtitle,
  as: Heading = 'h2',
  align = 'center',
  highlight,
  invert = false,
  className,
}: {
  badge?: ReactNode
  title: string
  subtitle?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  align?: 'center' | 'left'
  /** Extra phrase(s) of the title to show in violet, besides the brand names. */
  highlight?: string | string[]
  /** White text on a dark or violet section. */
  invert?: boolean
  className?: string
}) {
  const extra = highlight ? (Array.isArray(highlight) ? highlight : [highlight]) : []
  return (
    <div className={cn('mb-10 flex flex-col gap-4 sm:mb-14', align === 'center' ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-3xl items-start', className)}>
      {badge ? <Badge tone={invert ? 'white' : 'primary'}>{badge}</Badge> : null}
      <Heading
        className={cn(
          'font-bold tracking-tight',
          Heading === 'h1' ? 'text-4xl sm:text-5xl lg:text-6xl' : Heading === 'h2' ? 'text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-tight' : 'text-2xl sm:text-3xl',
          invert && 'text-white',
        )}
      >
        {invert ? title : <Highlight text={title} extra={extra} />}
      </Heading>
      {subtitle ? <p className={cn('text-base sm:text-lg', invert ? 'text-white/80' : 'text-slate')}>{subtitle}</p> : null}
    </div>
  )
}

/** Bento card: white, rounded-3xl, soft shadow, violet glow on hover (brief, « Bento Cards »). */
export function Card<T extends ElementType = 'div'>({
  as,
  className,
  hover = true,
  ...props
}: { as?: T; hover?: boolean; className?: string } & Omit<ComponentProps<T>, 'as' | 'className'>) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag
      className={cn(
        'rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8',
        hover && 'transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-glow',
        className,
      )}
      {...props}
    />
  )
}

/** Square icon tile on top of a card: light violet background, violet icon. */
export function IconTile({ children, className, tone = 'primary' }: { children: ReactNode; className?: string; tone?: 'primary' | 'status' | 'white' }) {
  const tones = { primary: 'bg-primary-soft text-primary', status: 'bg-status-soft text-status', white: 'bg-white/15 text-white' }
  return (
    <span className={cn('inline-flex size-12 shrink-0 items-center justify-center rounded-2xl [&_svg]:size-6', tones[tone], className)}>
      {children}
    </span>
  )
}

/** Small pill (device names, use cases, sports). */
export function Chip({ children, className, icon }: { children: ReactNode; className?: string; icon?: ReactNode }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink shadow-pill [&_svg]:size-4 [&_svg]:text-primary', className)}>
      {icon}
      {children}
    </span>
  )
}
