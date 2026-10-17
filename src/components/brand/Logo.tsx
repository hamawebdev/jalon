import { cn } from '@/lib/utils'
import { BRAND, BRAND_DESCRIPTOR } from './identity'
import { J_PATH, LETTERS_PATH, MARK, WORDMARK } from './logo-paths'

/**
 * Letters and the square's edge per tone. The square is two rects: the edge (17 units) and the yellow core
 * inset by the keyline. On light the edge is the ink keyline; on Nuit it is yellow too, so the square is plain.
 * `auto` follows the zone: z-fg letters and a z-mark edge (ink on light, yellow on Nuit).
 */
const TONE = {
  auto: { letters: 'var(--z-fg)', edge: 'var(--z-mark)' },
  light: { letters: 'var(--color-ink)', edge: 'var(--color-ink)' },
  nuit: { letters: 'var(--color-on-nuit)', edge: 'var(--color-signal-500)' },
} as const

/** Wordmark height per size, as --wm-h: header 32px (h-8), footer 36px (h-9). */
const SIZE = {
  header: '[--wm-h:2rem]',
  footer: '[--wm-h:2.25rem]',
} as const

const round = (n: number) => Math.round(n * 100) / 100

type WordmarkProps = {
  /** Default auto (zone-aware). Force light or nuit when the zone variables are not set. */
  tone?: keyof typeof TONE
  /** header 32px tall, footer 36px tall (minimum on screen: 24px). */
  size?: keyof typeof SIZE
  /**
   * The lockup « Jalon · abonnement TV » where people meet the brand cold (§2.6): `true` adds the descriptor in
   * the text face (micro, 600, zone muted), baseline-aligned 10px after the wordmark in the header size and on
   * its own line under it in the footer size. A string replaces the descriptor text. With a descriptor, size the
   * lockup with `size` (or `[--wm-h:…]`), not with an h-* class. The header shows the lockup from 360px up and
   * the wordmark alone below (§2.6); the stacked form is the footer's only.
   */
  descriptor?: boolean | string
  className?: string
}

function WordmarkSvg({ tone, className }: { tone: keyof typeof TONE; className?: string }) {
  const c = TONE[tone]
  const t = WORDMARK.tittle
  const k = t.keyline
  return (
    <svg role="img" aria-label={BRAND} viewBox={WORDMARK.viewBox} className={cn('block h-(--wm-h) w-auto shrink-0', className)}>
      <path d={LETTERS_PATH} fill={c.letters} />
      <rect x={t.x} y={t.y} width={t.size} height={t.size} fill={c.edge} />
      <rect x={round(t.x + k)} y={round(t.y + k)} width={t.size - 2 * k} height={t.size - 2 * k} fill="var(--color-signal-500)" />
    </svg>
  )
}

/**
 * The Jalon wordmark (inline SVG outlines, never live text): the drawn j, « alon » and the square tittle
 * « le jalon ». Two shapes only: the letters in the zone foreground and the square (yellow, ink keyline on light).
 * role="img", accessible name « Jalon ». Clear space: one tittle side all round.
 */
export function Wordmark({ tone = 'auto', size = 'header', descriptor, className }: WordmarkProps) {
  if (!descriptor) {
    return <WordmarkSvg tone={tone} className={cn(SIZE[size], className)} />
  }
  const text = typeof descriptor === 'string' ? descriptor : BRAND_DESCRIPTOR
  const label = <span className="font-sans text-micro font-semibold whitespace-nowrap text-z-muted">{text}</span>
  if (size === 'footer') {
    return (
      <span className={cn('inline-flex flex-col items-start gap-2', SIZE[size], className)}>
        <WordmarkSvg tone={tone} />
        {label}
      </span>
    )
  }
  // Inline layout: the SVG's bottom edge is its baseline, so lowering it by the share of its height that lies
  // below the letters' baseline, (92.07 − 71.9) / 92.07 = 0.2191 (logo-paths WORDMARK), puts the drawn baseline
  // exactly on the descriptor's text baseline. Literal class: Tailwind only sees complete class names.
  return (
    <span className={cn('inline-block leading-none whitespace-nowrap', SIZE[size], className)}>
      <WordmarkSvg tone={tone} className="inline-block align-[calc(var(--wm-h)*-0.2191)]" />
      <span className="ml-2.5">{label}</span>
    </span>
  )
}

/** Keyline of the mark's square in mark units (same share of the side as the wordmark's: 3/17). */
const MARK_KEYLINE = round((MARK.tittle.size * WORDMARK.tittle.keyline) / WORDMARK.tittle.size)
/** The mark's glyph box: from the j's terminal to the square's right edge, from the square's top to the hook. */
const MARK_CROP = '31.25 9.38 34.37 78.12'

/**
 * The drawn j and its square, for in-UI use (app mock-ups, small house marks): the j takes currentColor, the
 * square is yellow with the zone keyline (ink on light, plain on Nuit). Decorative. The app icon with its ink
 * plaque lives in public/ (favicon, touch icons); it is never a monogram.
 */
export function LogoMark({ className }: { className?: string }) {
  const t = MARK.tittle
  return (
    <svg aria-hidden="true" viewBox={MARK_CROP} className={cn('block h-6 w-auto shrink-0', className)}>
      <path d={J_PATH} fill="currentColor" />
      <rect x={t.x} y={t.y} width={t.size} height={t.size} fill="var(--z-mark)" />
      <rect
        x={round(t.x + MARK_KEYLINE)}
        y={round(t.y + MARK_KEYLINE)}
        width={round(t.size - 2 * MARK_KEYLINE)}
        height={round(t.size - 2 * MARK_KEYLINE)}
        fill="var(--color-signal-500)"
      />
    </svg>
  )
}
