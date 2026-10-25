// Logo slot of an app card. We have no logo files and use no third-party logos: an original monogram tile.
// Official Atlas Pro apps: violet gradient tile. Partner players: white tile with an ink monogram.
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function AppMark({
  monogram,
  tone,
  badge,
  className,
}: {
  monogram: string
  tone: 'official' | 'partner'
  /** Small system icon in the corner (desktop builds). */
  badge?: ReactNode
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative inline-flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl font-display font-extrabold tracking-tight',
        monogram.length > 2 ? 'text-[15px]' : 'text-lg',
        tone === 'official'
          ? 'bg-gradient-to-br from-primary to-primary-deep text-white shadow-glow'
          : 'border border-line bg-white text-ink shadow-pill',
        className,
      )}
    >
      {tone === 'official' ? (
        <>
          <span className="absolute -right-3 -top-3 size-8 rounded-full bg-white/15" />
          <span className="absolute -bottom-4 -left-2 size-8 rounded-full bg-white/10" />
        </>
      ) : (
        <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" />
      )}
      <span className="relative">{monogram}</span>
      {badge ? (
        <span className="absolute bottom-1 right-1 inline-flex size-4 items-center justify-center rounded-md bg-white text-primary [&_svg]:size-3">
          {badge}
        </span>
      ) : null}
    </span>
  )
}
