// One customer review with its WhatsApp screenshot in a phone frame (brief p. 34: « emplacement Image / Capture
// WhatsApp sur chaque carte »). A review goes live only with its screenshot (lead decision): without one the card is
// a placeholder with an « À compléter » marker in review mode, and Reviews.tsx leaves it out in launch mode.
import type { ReactNode } from 'react'
import { Camera, Clapperboard, Gem, Handshake, RefreshCw, Star, Trophy, Zap } from 'lucide-react'
import { Card, Pending } from '@/components/kit'
import { useT } from '@/i18n/context'
import type { ReviewVars } from '@/i18n/dict/fr/social'
import type { Review, ReviewId } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { publicUrl } from './apps'

/** The brief's badge emoji, as lucide icons: ⚡ 🤝 ⚽ 💎 🎬 🔄 */
const BADGE_ICON: Record<ReviewId, ReactNode> = {
  thomas: <Zap />,
  sophie: <Handshake />,
  karim: <Trophy />,
  marc: <Gem />,
  lucas: <Clapperboard />,
  nadia: <RefreshCw />,
}

export function Stars({ label, className }: { label: string; className?: string }) {
  return (
    <span role="img" aria-label={label} className={cn('inline-flex gap-0.5 text-gold', className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} aria-hidden className="size-4 fill-current" />
      ))}
    </span>
  )
}

/** The top of a phone: dark bezel, speaker notch, the screenshot cut at the card's edge. */
function PhoneFrame({ children, dashed = false }: { children: ReactNode; dashed?: boolean }) {
  return (
    <div
      className={cn(
        'relative mx-auto h-full w-44 overflow-hidden rounded-t-[1.75rem] border-[6px] border-b-0 transition-transform duration-500 group-hover:-translate-y-1.5',
        dashed ? 'border-dashed border-primary/25 bg-white/60' : 'border-ink bg-ink shadow-glow',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'absolute left-1/2 top-1.5 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full',
          dashed ? 'bg-primary/15' : 'bg-ink ring-2 ring-ink/40',
        )}
      />
      {children}
    </div>
  )
}

export function ReviewCard({ review, vars }: { review: Review; vars: ReviewVars }) {
  const t = useT().social.reviews
  const copy = t.items[review.id]
  const live = !!review.screenshot
  const from = t.from(t.cities[review.id], t.countries[review.country], String(review.year))

  return (
    <Card
      as="article"
      hover={live}
      className={cn('group flex h-full flex-col overflow-hidden p-0 sm:p-0', !live && 'border-dashed border-primary/25 shadow-none')}
    >
      {/* Screenshot stage */}
      <div className="relative h-56 shrink-0 bg-gradient-to-b from-primary-soft to-mist px-6 pt-6 sm:h-60">
        <PhoneFrame dashed={!live}>
          {review.screenshot ? (
            <a
              href={publicUrl(review.screenshot)}
              target="_blank"
              rel="noopener"
              aria-label={t.screenshotOpen(review.name)}
              className="block size-full focus-visible:outline-offset-[-4px]"
            >
              <img
                src={publicUrl(review.screenshot)}
                alt={t.screenshotAlt(review.name)}
                loading="lazy"
                decoding="async"
                className="size-full rounded-t-[1.35rem] bg-white object-cover object-top"
              />
            </a>
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-3 px-2 pt-4 text-center">
              <Camera aria-hidden className="size-7 text-primary/40" />
              <Pending what={t.screenshotPending(review.name)} className="max-w-full whitespace-normal" />
            </div>
          )}
        </PhoneFrame>
      </div>

      {/* Review */}
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary [&_svg]:size-3.5">
            {BADGE_ICON[review.id]}
            {copy.badge}
          </span>
          {live ? <Stars label={t.stars} /> : null}
        </div>
        {live ? (
          <blockquote className="text-[15px] leading-relaxed text-ink">
            <p>« {copy.quote(vars)} »</p>
          </blockquote>
        ) : (
          <div aria-hidden className="flex flex-col gap-2 py-1">
            <span className="h-3 w-full rounded-full bg-mist" />
            <span className="h-3 w-11/12 rounded-full bg-mist" />
            <span className="h-3 w-2/3 rounded-full bg-mist" />
          </div>
        )}
        <p className={cn('mt-auto border-t border-line pt-4 text-sm', live ? 'text-slate' : 'text-slate/70')}>
          <strong className="font-semibold text-ink">{review.name}</strong> — <span className="italic">{from}</span>
        </p>
      </div>
    </Card>
  )
}
