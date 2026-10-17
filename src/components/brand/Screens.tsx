import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { LogoMark } from './Logo'
import { QualityStamp } from './Labels'
import { useInView } from './motion'
import { MOSAIC_FILLS, MOSAIC_ICONS, iconClass } from './recipes'
import type { QualityTier } from './types'

type DeviceFrameProps = {
  kind?: 'tv' | 'phone' | 'tablet'
  /** Screen content (ChannelMosaic, GuideGrid rows, an abstract chat …). The screen is a Nuit root. */
  children?: ReactNode
  className?: string
  screenClassName?: string
}

/**
 * Screen of a device frame: a Nuit root (zone variables for its content) and its own stacking context, so
 * nothing inside paints over a neighbouring device. A 1px nuit-line ring drawn above the content separates it
 * from the bezel (ink and Nuit are 1.13:1).
 */
const SCREEN =
  'nuit-plain relative isolate size-full overflow-hidden ' +
  "after:pointer-events-none after:absolute after:inset-0 after:z-[2] after:rounded-[inherit] after:ring-1 after:ring-inset after:ring-nuit-line after:content-['']"
/** Bezel on Nuit: nuit-800 with a nuit-line ring (an ink bezel would vanish on Nuit). */
const ON_NUIT = 'nuit:bg-nuit-800 nuit:ring-1 nuit:ring-nuit-line'

/**
 * Decorative device frame: ink bezel (nuit-800 on Nuit) around a Nuit screen. A device keeps its own corners: a
 * television is drawn as a television, whatever the radius of the cards around it; each screen's radius is its
 * bezel's minus the bezel width.
 */
export function DeviceFrame({ kind = 'tv', children, className, screenClassName }: DeviceFrameProps) {
  if (kind === 'phone') {
    return (
      <div aria-hidden="true" className={cn('pointer-events-none relative aspect-[9/19.5] rounded-[32px] bg-ink p-2 shadow-float', ON_NUIT, className)}>
        <div className={cn(SCREEN, 'rounded-[24px]', screenClassName)}>{children}</div>
        <span className="absolute top-2.5 left-1/2 z-[1] h-[18px] w-[30%] -translate-x-1/2 rounded-full bg-ink nuit:bg-nuit-800" />
      </div>
    )
  }
  if (kind === 'tablet') {
    return (
      <div aria-hidden="true" className={cn('pointer-events-none relative aspect-[4/3] rounded-[20px] bg-ink p-2.5 shadow-float', ON_NUIT, className)}>
        <div className={cn(SCREEN, 'rounded-[12px]', screenClassName)}>{children}</div>
      </div>
    )
  }
  return (
    <div aria-hidden="true" className={cn('tv pointer-events-none relative aspect-video rounded-[6px] bg-ink p-2.5 shadow-float', ON_NUIT, className)}>
      <div className={cn(SCREEN, 'rounded-[2px]', screenClassName)}>{children}</div>
      <span className="absolute top-full left-1/2 h-1.5 w-[28%] -translate-x-1/2 rounded-b-[4px] bg-nuit-800" />
    </div>
  )
}

type ChannelMosaicProps = {
  cols?: number
  rows?: number
  /** 1-based selected tile (signal yellow); 0 for none. */
  selected?: number
  /** Up to 6 generic Tabler pictograms at 30% (default: football, movie, news, kid, world, music). Never channel names or logos. */
  icons?: readonly string[]
  /** Progress bar fill, 0–1. */
  progress?: number
  /** On-screen display: status square and progress bar. */
  osd?: boolean
  /**
   * Text of the small white stamp in the OSD's top-right corner (e.g. "4K"). Picture quality is an owner fact,
   * so there is no stamp unless the page passes one the owner has confirmed. `null` (the fact is not given) draws
   * no stamp, in both modes: a drawn screen never holds a marker.
   */
  stamp?: string | null
  /** Moves the selection every 2.4s (opt-in; motion-safe only, paused off-screen). */
  step?: boolean
  /** Fill the parent (inside a screen). false = tiles keep 16:10 (strips on cards). */
  fill?: boolean
  className?: string
}

function iconSlots(count: number, n: number) {
  return Array.from({ length: Math.min(n, 6) }, (_, k) => Math.floor(((k + 0.5) * count) / Math.min(n, 6)))
}

/**
 * The « this is television » motif: a quiet grid of Nuit channel tiles with one yellow selection. Same API as before.
 * The selection is the picture's one yellow piece (IDENTITY §5.4): the OSD around it has none (the progress fill in
 * on-nuit-muted, a stamp in the white plate look).
 */
export function ChannelMosaic({
  cols = 6,
  rows = 4,
  selected = 9,
  icons = MOSAIC_ICONS,
  progress = 0.62,
  osd = true,
  stamp,
  step = false,
  fill = true,
  className,
}: ChannelMosaicProps) {
  const count = cols * rows
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const [sel, setSel] = useState(selected)

  useEffect(() => {
    if (!step || !inView || selected <= 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setSel((s) => (s % count) + 1), 2400)
    return () => window.clearInterval(t)
  }, [step, inView, count, selected])

  const slots = iconSlots(count, icons.length)
  return (
    <div ref={ref} aria-hidden="true" className={cn('pointer-events-none relative', fill && 'size-full', className)}>
      <div
        className={cn('grid gap-[3px] p-[3px]', fill && 'size-full')}
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: fill ? `repeat(${rows}, minmax(0, 1fr))` : undefined,
        }}
      >
        {Array.from({ length: count }, (_, i) => {
          const on = i + 1 === sel
          const icon = slots.indexOf(i)
          return (
            <span
              key={i}
              className={cn(
                // Drawn screen content keeps the device's scale: tiles this small take 3px corners, not a token.
                'grid place-items-center rounded-[3px] transition-colors duration-200 ease-calm',
                !fill && 'aspect-[16/10]',
                on ? 'z-[1] bg-signal-500 outline-2 outline-signal-300' : MOSAIC_FILLS[i % MOSAIC_FILLS.length],
              )}
            >
              {icon >= 0 && !on && <i className={iconClass(icons[icon], 'text-[clamp(10px,1.4vw,18px)] text-on-nuit/30')} />}
            </span>
          )
        })}
      </div>
      {osd && (
        <>
          <span className="absolute top-2 left-2 size-2 bg-ok ring-1 ring-nuit" />
          {stamp && (
            <span
              data-label={stamp}
              className="absolute top-2 right-2 rounded-[3px] bg-plate px-1 py-0.5 font-display text-[9px] leading-none font-bold text-ink before:content-[attr(data-label)]"
            />
          )}
          {/* on-nuit-muted reads on the track over every tile (3.95:1 or more); nuit-600 would vanish there (1.1 to 1.5:1). */}
          <span className="absolute inset-x-2 bottom-2 h-[3px] overflow-hidden bg-nuit-line">
            <span className="block h-full bg-on-nuit-muted" style={{ width: `${Math.round(Math.min(Math.max(progress, 0), 1) * 100)}%` }} />
          </span>
        </>
      )}
    </div>
  )
}

/** Test-card bars, left to right. */
const MIRE_BARS = ['bg-on-nuit', 'bg-on-nuit-muted', 'bg-signal-500', 'bg-nuit-600', 'bg-nuit-700', 'bg-nuit-800', 'bg-nuit-900'] as const

/**
 * The Mire (404 visual): a TV frame showing seven test-card bars with the yellow square in the centre. No text;
 * the page carries the line (« Cette page n’est pas au programme. »).
 */
export function Mire({ className }: { className?: string }) {
  return (
    <DeviceFrame kind="tv" className={cn('w-full max-w-[420px]', className)}>
      <div className="flex size-full">
        {MIRE_BARS.map((b) => (
          <span key={b} className={cn('h-full flex-1', b)} />
        ))}
      </div>
      <span className="absolute top-1/2 left-1/2 aspect-square h-[24%] -translate-x-1/2 -translate-y-1/2 bg-signal-500 ring-[3px] ring-nuit" />
      <span className="absolute inset-x-0 bottom-0 flex h-[12%]">
        <span className="h-full flex-[2] bg-nuit-900" />
        <span className="h-full flex-1 bg-on-nuit" />
        <span className="h-full flex-[2] bg-nuit" />
        <span className="h-full flex-1 bg-nuit-700" />
        <span className="h-full flex-[2] bg-nuit-900" />
      </span>
    </DeviceFrame>
  )
}

/**
 * App visual: a phone in front of a TV, both showing the mosaic; the phone carries the drawn j and its square. The
 * TV's selected tile is the picture's yellow piece; the phone's play control is a white disc (the video's look).
 */
export function AppMock({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none relative aspect-[100/103] w-full', className)}>
      <DeviceFrame kind="tv" className="absolute top-0 right-0 w-[calc(100%-32px)]">
        <ChannelMosaic />
      </DeviceFrame>
      <DeviceFrame kind="phone" className="absolute bottom-0 left-0 w-[38%]">
        <div className="flex size-full flex-col gap-2 px-2 pt-7 pb-2">
          <LogoMark className="h-3.5 w-auto self-start text-on-nuit" />
          <div className="grid aspect-video w-full place-items-center rounded-micro bg-nuit-800">
            <span className="grid aspect-square w-[26%] max-w-10 place-items-center rounded-full bg-plate text-ink">
              <i className="ti ti-player-play-filled text-[clamp(10px,1.2vw,18px)]" />
            </span>
          </div>
          <div className="-mx-[3px] min-h-0 flex-1">
            <ChannelMosaic cols={3} rows={4} selected={0} osd={false} icons={[]} />
          </div>
        </div>
      </DeviceFrame>
    </div>
  )
}

/** Reception bars filled per tier (of four). */
const TIER_BARS: Record<QualityTier, number> = { '4K': 4, FHD: 3, HD: 2, SD: 1 }
const BAR_HEIGHTS = ['h-1.5', 'h-2.5', 'h-3.5', 'h-[18px]'] as const

type QualityLadderProps = {
  rows: { tier: QualityTier; name: ReactNode; text?: ReactNode }[]
  as?: 'h3' | 'h4' | 'p'
  className?: string
}

/**
 * Quality ladder: stamp, tier name and text, and four reception bars of rising height filled up to the tier
 * (ink on light; on Nuit on-nuit, the top tier signal yellow). Which tiers exist is an owner fact: pass only the
 * owner's tiers, and no row renders nothing (no empty rule).
 */
export function QualityLadder({ rows, as: H = 'h3', className }: QualityLadderProps) {
  if (rows.length === 0) return null
  return (
    <ul className={cn('m-0 list-none border-b border-z-line p-0', className)}>
      {rows.map((r) => {
        const filled = TIER_BARS[r.tier]
        return (
          <li key={r.tier} className="grid grid-cols-[56px_1fr] gap-x-4 gap-y-1 border-t border-z-line py-4">
            <QualityStamp tier={r.tier} className="row-span-3" />
            <H className="font-display text-title text-z-fg">{r.name}</H>
            {r.text != null && <p className="font-sans text-small text-z-soft">{r.text}</p>}
            <span aria-hidden="true" className="mt-2 flex h-[18px] items-end gap-[3px]">
              {BAR_HEIGHTS.map((h, i) => (
                <span
                  key={h}
                  className={cn(
                    'w-1.5',
                    h,
                    i < filled
                      ? cn('bg-ink nuit:bg-on-nuit', filled === 4 && 'nuit:bg-signal-500')
                      : 'bg-band-deep nuit:bg-nuit-line',
                  )}
                />
              ))}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
