// The hero illustration: a stylised Atlas Pro ONTV screen on a violet card. Decorative (aria-hidden): every claim it
// shows is in the text. Each use-case pill of the hero lights up its part of the picture.
import { Headphones, Server, Tv } from 'lucide-react'
import { useT } from '@/i18n/context'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { useStoryNumbers } from './numbers'
import type { UseCase } from './useCases'

const POSTERS = [
  'from-primary-soft to-primary',
  'from-gold to-alert',
  'from-status to-primary',
  'from-primary to-ink',
]

export function HeroVisual({ active }: { active: ReadonlySet<UseCase> }) {
  const t = useT().story.hero.visual
  const n = useStoryNumbers()
  // Parts of the screen dim when their pill is off; the floating cards leave.
  const layer = (id: UseCase) =>
    cn('transition-all duration-500', active.has(id) ? 'opacity-100' : 'opacity-40 saturate-50')
  const float = (id: UseCase) =>
    cn('transition-all duration-500', active.has(id) ? 'opacity-100 scale-100' : 'pointer-events-none scale-90 opacity-0')

  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[600px] px-2 py-6 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-deep p-4 shadow-glow sm:p-6">
        <span className="absolute -top-20 -right-16 size-56 rounded-full bg-white/10" />
        <span className="absolute -bottom-24 -left-10 size-48 rounded-full bg-white/5" />

        {/* The screen */}
        <div className="relative rounded-2xl bg-ink p-3 ring-1 ring-white/10 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-primary text-white">
                <Tv className="size-3.5" />
              </span>
              <span className="truncate font-display text-xs font-semibold text-white sm:text-sm">{FACTS.brand.product}</span>
              {n.versions ? (
                <span className={cn('hidden rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/80 sm:inline', layer('apps'))}>
                  {n.versions.ontv}
                </span>
              ) : null}
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-status/15 px-2 py-0.5 text-[10px] font-semibold text-status sm:text-xs">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 rounded-full bg-status motion-safe:animate-ping" />
                <span className="relative size-1.5 rounded-full bg-status" />
              </span>
              {t.online}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-[auto_1fr] gap-3">
            <ul className={cn('flex flex-col gap-1 text-[10px] font-medium text-white/60 sm:text-xs', layer('apps'))}>
              {t.nav.map((item, i) => (
                <li key={item} className={cn('rounded-lg px-2 py-1.5 whitespace-nowrap', i === 0 && 'bg-white/10 text-white')}>
                  {item}
                </li>
              ))}
            </ul>

            <div className="min-w-0">
              {/* Live sport tile: a pitch in Full HD */}
              <div className={cn('relative aspect-[16/9] overflow-hidden rounded-xl bg-gradient-to-br from-status to-primary-deep', layer('sport'))}>
                <svg viewBox="0 0 160 90" className="absolute inset-0 size-full text-white/35" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="8" y="8" width="144" height="74" rx="2" />
                  <path d="M80 8v74" />
                  <circle cx="80" cy="45" r="12" />
                  <rect x="8" y="27" width="20" height="36" />
                  <rect x="132" y="27" width="20" height="36" />
                </svg>
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-ink uppercase">
                  <span className="size-1.5 rounded-full bg-alert" />
                  {t.live}
                </span>
                <span className="absolute bottom-2 left-2 rounded-full bg-ink/60 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                  {t.liveQuality}
                </span>
              </div>

              {/* VOD row */}
              <div className={layer('vod')}>
                <p className="mt-3 mb-1.5 text-[10px] font-semibold text-white/60 sm:text-xs">{t.vodRow}</p>
                <div className="grid grid-cols-4 gap-2">
                  {POSTERS.map((gradient) => (
                    <span key={gradient} className={cn('aspect-[2/3] rounded-lg bg-gradient-to-b', gradient)} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="mx-auto mt-3 block h-1.5 w-24 rounded-full bg-white/30" />
      </div>

      {/* Floating cards */}
      <div
        className={cn(
          'absolute top-0 left-0 flex items-center gap-2.5 rounded-2xl border border-line bg-white px-3 py-2 shadow-card sm:-left-2',
          float('uptime'),
        )}
      >
        <span className="grid size-8 place-items-center rounded-xl bg-status-soft text-status">
          <Server className="size-4" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[11px] text-slate">{t.servers}</span>
          <span className="font-display text-sm font-bold text-ink">{n.uptime}</span>
        </span>
      </div>
      <div
        className={cn(
          'absolute right-0 bottom-0 flex items-center gap-2.5 rounded-2xl border border-line bg-white px-3 py-2 shadow-card sm:-right-2',
          float('support'),
        )}
      >
        <span className="grid size-8 place-items-center rounded-xl bg-primary-soft text-primary">
          <Headphones className="size-4" />
        </span>
        <span className="font-display text-sm font-bold text-ink">{t.support(n.supportMinutes)}</span>
      </div>
    </div>
  )
}
