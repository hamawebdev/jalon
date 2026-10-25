// Right column of the Suite Applicative (brief p. 10): a large rounded-3xl card with a violet gradient and a white
// play button in the middle. No video exists: the card holds an original, lightweight mock of an app screen.
import { Play, Zap } from 'lucide-react'
import { useT } from '@/i18n/context'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'

// Widths of the abstract programme bars (deterministic: same render on the server and in the browser).
const CHANNELS = [72, 58, 84, 46, 64]
const EPG = [
  [38, 24, 30],
  [22, 46, 20],
  [30, 28, 34],
]

export function MediaCard() {
  const t = useT().downloads.suite
  const { ontv, max } = FACTS.apps
  return (
    <div className="relative">
      <figure
        role="img"
        aria-label={t.media.label}
        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-deep p-4 shadow-glow sm:p-6"
      >
        {/* Soft light shapes */}
        <span aria-hidden className="absolute -right-16 -top-20 size-64 rounded-full bg-white/10 blur-2xl" />
        <span aria-hidden className="absolute -bottom-24 -left-10 size-64 rounded-full bg-white/10 blur-2xl" />

        <div aria-hidden className="relative rounded-2xl border border-white/20 bg-ink/25 p-3 backdrop-blur-sm sm:p-4">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-7 items-center justify-center rounded-lg bg-white font-display text-[11px] font-extrabold text-primary">
                AP
              </span>
              <span className="truncate font-display text-sm font-semibold text-white">{ontv.name}</span>
            </div>
            {ontv.version ? (
              <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                {t.versions.short(ontv.version)}
              </span>
            ) : null}
          </div>

          {/* Tabs */}
          <div className="mt-3 flex gap-1.5 overflow-hidden">
            {t.media.tabs.map((tab, i) => (
              <span
                key={tab}
                className={cn(
                  'shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold',
                  i === 0 ? 'bg-white text-primary' : 'bg-white/10 text-white/80',
                )}
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3">
            {/* Channel list */}
            <ul className="flex flex-col gap-1.5">
              {CHANNELS.map((w, i) => (
                <li
                  key={i}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors duration-500',
                    i === 1 ? 'bg-white/90' : 'bg-white/10 motion-safe:group-hover:bg-white/15',
                  )}
                >
                  <span className={cn('text-[10px] font-bold tabular-nums', i === 1 ? 'text-primary' : 'text-white/70')}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={cn('h-1.5 rounded-full', i === 1 ? 'bg-primary/60' : 'bg-white/40')}
                    style={{ width: `${w}%` }}
                  />
                </li>
              ))}
            </ul>

            {/* Player */}
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-white/25 to-white/5">
              <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/30 to-transparent" />
              <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-primary">
                <span className="size-1.5 rounded-full bg-alert motion-safe:animate-pulse" />
                {t.media.tabs[0]}
              </span>
              <span className="relative inline-flex">
                <span className="absolute inset-0 rounded-full bg-white/40 motion-safe:animate-ping" />
                <span className="relative inline-flex size-14 items-center justify-center rounded-full bg-white text-primary shadow-card transition-transform duration-300 group-hover:scale-105 sm:size-16">
                  <Play className="ml-0.5 size-6 fill-current sm:size-7" />
                </span>
              </span>
              <span className="absolute inset-x-3 bottom-2.5 h-1 overflow-hidden rounded-full bg-white/25">
                <span className="block h-full w-2/5 rounded-full bg-white" />
              </span>
            </div>
          </div>

          {/* EPG */}
          <div className="mt-3 rounded-xl bg-white/10 p-2.5">
            <div className="mb-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-white/80">
              <span className="rounded bg-white/20 px-1.5 py-0.5 text-white">{t.media.epg}</span>
              <span>{t.media.now}</span>
              <span className="text-white/50">{t.media.next}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {EPG.map((row, r) => (
                <div key={r} className="flex gap-1.5">
                  {row.map((w, c) => (
                    <span
                      key={c}
                      className={cn('h-2.5 rounded-md', r === 0 && c === 0 ? 'bg-white' : 'bg-white/25')}
                      style={{ flexGrow: w }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </figure>

      {/* Floating chips */}
      <span
        aria-hidden
        className="absolute -bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink shadow-card sm:-left-4"
      >
        <Zap className="size-4 text-primary" />
        {t.keyPoints[0]}
      </span>
      {max.version ? (
        <span
          aria-hidden
          className="absolute -top-3 right-4 inline-flex items-center rounded-full border border-line bg-white px-3 py-1.5 font-display text-sm font-bold text-primary shadow-card sm:-right-3"
        >
          {max.name} {t.versions.short(max.version)}
        </span>
      ) : null}
    </div>
  )
}
