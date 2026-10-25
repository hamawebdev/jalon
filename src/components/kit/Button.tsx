// Fully rounded pill buttons (« rounded-full Pills ») with a moving arrow. One component for links and buttons:
//   <PillButton to={pathFor('boutique', lang)}>…</PillButton>          internal link
//   <PillButton href="https://…">…</PillButton>                         external link (new tab)
//   <WhatsAppButton message={planMessage('duo')}>…</WhatsAppButton>     every purchase / renewal / help button
//   <PillButton onClick={…}>…</PillButton>                              button
import type { ComponentProps, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'
import { waLink } from '@/lib/whatsapp'
import { WhatsAppIcon } from './icons'

export type PillVariant = 'primary' | 'secondary' | 'white' | 'outlineWhite' | 'whatsapp' | 'gold' | 'ghost'
export type PillSize = 'sm' | 'md' | 'lg'

const VARIANTS: Record<PillVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-deep shadow-[0_6px_20px_rgb(80_52_255/0.28)]',
  secondary: 'border border-primary/30 bg-white text-primary hover:border-primary hover:bg-primary-soft',
  white: 'bg-white text-primary hover:bg-primary-soft',
  outlineWhite: 'border border-white/70 text-white hover:bg-white/10',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-deep shadow-[0_6px_20px_rgb(37_211_102/0.28)]',
  gold: 'bg-gold text-ink hover:brightness-95',
  ghost: 'text-primary hover:bg-primary-soft',
}
const SIZES: Record<PillSize, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-5 text-[15px] gap-2',
  lg: 'h-13 px-7 text-base gap-2.5',
}

interface CommonProps {
  variant?: PillVariant
  size?: PillSize
  /** Leading icon. */
  icon?: ReactNode
  /** Trailing arrow that moves on hover. Default: on, except for ghost buttons. */
  arrow?: boolean
  /** Let a long label wrap onto two lines instead of being cut (phones). */
  wrap?: boolean
  className?: string
  children: ReactNode
}

type PillButtonProps = CommonProps &
  (
    | ({ to: string; href?: never } & Omit<ComponentProps<typeof Link>, 'to' | 'className' | 'children'>)
    | ({ href: string; to?: never } & Omit<ComponentProps<'a'>, 'href' | 'className' | 'children'>)
    | ({ to?: never; href?: never } & Omit<ComponentProps<'button'>, 'className' | 'children'>)
  )

export function pillClasses(variant: PillVariant = 'primary', size: PillSize = 'md', className?: string, wrap = false) {
  return cn(
    'group/pill inline-flex items-center justify-center rounded-full',
    // A wrapping pill may also shrink: in a flex row it would otherwise keep its one-line width and overflow.
    wrap ? 'h-auto min-h-11 max-w-full min-w-0 shrink whitespace-normal py-2.5 text-center leading-snug' : 'shrink-0 whitespace-nowrap',
    ' font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    className,
  )
}

function Inner({ icon, arrow, wrap, children }: Pick<CommonProps, 'icon' | 'arrow' | 'wrap' | 'children'>) {
  return (
    <>
      {icon ? <span className="inline-flex shrink-0 [&_svg]:size-[1.15em]">{icon}</span> : null}
      <span className={wrap ? undefined : 'truncate'}>{children}</span>
      {arrow ? (
        <ArrowRight
          aria-hidden
          className="size-[1.1em] shrink-0 transition-transform duration-200 group-hover/pill:translate-x-1 motion-safe:group-hover/pill:animate-none"
        />
      ) : null}
    </>
  )
}

export function PillButton(props: PillButtonProps) {
  const { variant = 'primary', size = 'md', icon, arrow, wrap = false, className, children, ...rest } = props
  const showArrow = arrow ?? variant !== 'ghost'
  // Size classes come before `className`, so a wrapping pill keeps its padding but drops the fixed height.
  const classes = pillClasses(variant, size, cn(className), wrap)
  const inner = (
    <Inner icon={icon} arrow={showArrow} wrap={wrap}>
      {children}
    </Inner>
  )
  if ('to' in rest && rest.to) {
    return (
      <Link {...(rest as ComponentProps<typeof Link>)} className={classes}>
        {inner}
      </Link>
    )
  }
  if ('href' in rest && rest.href) {
    const external = /^https?:/.test(rest.href)
    return (
      <a
        {...(rest as ComponentProps<'a'>)}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    )
  }
  return (
    <button type="button" {...(rest as ComponentProps<'button'>)} className={classes}>
      {inner}
    </button>
  )
}

/** Opens WhatsApp with a pre-filled message from src/lib/whatsapp.ts. data-cta marks it for the checks. */
export function WhatsAppButton({
  message,
  variant = 'whatsapp',
  icon,
  ...rest
}: CommonProps & { message?: string } & Omit<ComponentProps<'a'>, 'href' | 'className' | 'children'>) {
  return (
    <PillButton
      href={waLink(message)}
      variant={variant}
      icon={icon ?? <WhatsAppIcon />}
      data-cta="whatsapp"
      {...rest}
    />
  )
}
