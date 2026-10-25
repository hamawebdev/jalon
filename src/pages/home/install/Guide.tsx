// One device guide: notices, numbered steps, options. Copy from t.install.guides, facts from FACTS.
import { CircleCheck, CircleX, Download, ExternalLink, Info, Lightbulb, Siren, TriangleAlert } from 'lucide-react'
import { Fact, PillButton } from '@/components/kit'
import { useT } from '@/i18n/context'
import type { GuideOption, GuideStep, Notice, NoticeTone } from '@/i18n/dict/fr/install'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { HUB_APPS, activationText, appLabel } from './apps'
import { CopyButton } from './CopyCode'
import { CodeChip, Rich } from './Rich'

export type DesktopOs = 'windows' | 'mac' | 'linux'

const TONES: Record<NoticeTone, { box: string; icon: typeof Info; iconClass: string; title: string }> = {
  info: { box: 'border-primary/20 bg-primary-soft/60', icon: Lightbulb, iconClass: 'bg-white text-primary', title: 'text-primary' },
  tip: { box: 'border-line bg-mist', icon: Info, iconClass: 'bg-white text-primary', title: 'text-ink' },
  warn: { box: 'border-gold/50 bg-gold-soft', icon: TriangleAlert, iconClass: 'bg-white text-ink', title: 'text-ink' },
  alert: { box: 'border-alert/40 bg-alert-soft', icon: Siren, iconClass: 'bg-alert text-white', title: 'text-alert' },
}

export function NoticeBox({ notice, className }: { notice: Notice; className?: string }) {
  const tone = TONES[notice.tone]
  const Icon = tone.icon
  return (
    <div
      role={notice.tone === 'alert' ? 'note' : undefined}
      className={cn('rounded-3xl border p-5 sm:p-6', notice.tone === 'alert' && 'border-2', tone.box, className)}
    >
      <div className="flex items-start gap-3">
        <span className={cn('mt-0.5 hidden size-9 shrink-0 items-center justify-center rounded-xl sm:inline-flex [&_svg]:size-5', tone.iconClass)}>
          <Icon aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className={cn('font-display text-[15px] leading-snug font-bold sm:text-base', tone.title)}>{notice.title}</p>
          <div className="mt-2 space-y-2 text-[15px] leading-relaxed text-ink/85">
            {notice.body.map((paragraph, i) => (
              <p key={i}>
                <Rich text={paragraph} />
              </p>
            ))}
          </div>
          {notice.points ? (
            <ul className="mt-3 space-y-2">
              {notice.points.map((point, i) => (
                <li
                  key={i}
                  className={cn(
                    'flex gap-2.5 rounded-2xl px-3.5 py-2.5 text-[15px] leading-relaxed',
                    point.mark === 'no' ? 'bg-white/70 text-ink' : 'bg-white text-ink ring-1 ring-status/30',
                  )}
                >
                  {point.mark === 'no' ? (
                    <CircleX aria-hidden className="mt-0.5 size-5 shrink-0 text-alert" />
                  ) : (
                    <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-status" />
                  )}
                  <span className="min-w-0">
                    <Rich text={point.text} />
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/** The four official apps with their Downloader code and activation mode (Fire TV, Android and Shield steps). */
export function AppCodeList() {
  const t = useT().install.apps
  return (
    <ul className="mt-3 grid gap-2 max-sm:-ml-14 sm:grid-cols-2">
      {HUB_APPS.map((id) => {
        const app = FACTS.apps[id]
        const label = appLabel(id)
        return (
          <li key={id} className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-3.5 shadow-pill">
            <p className="text-sm font-semibold text-ink">{t.apkFree(label)}</p>
            <div className="flex flex-wrap items-center gap-2">
              <Fact value={app.downloaderCode} what={`apps.${id}.downloaderCode`}>
                {(code) => (
                  <>
                    <span className="text-xs font-semibold text-slate max-sm:sr-only">{t.codeLabel}</span>
                    <CodeChip code={code} className="mx-0 px-2 py-0.5 text-base" />
                    <CopyButton code={code} label={t.copyAria(label, code)} compact className="ml-auto h-9 px-3 max-sm:w-9 max-sm:px-0" />
                  </>
                )}
              </Fact>
            </div>
            <p className="text-[13px] leading-snug text-slate">
              <span aria-hidden>➔ </span>
              {t.activationBy} <span className="font-semibold text-ink">{activationText(app.activation, t.activation, t.or)}</span>
            </p>
          </li>
        )
      })}
    </ul>
  )
}

function Step({ step, n }: { step: GuideStep; n: number }) {
  const t = useT().install
  return (
    <li className="group/step relative flex gap-4 pb-6 last:pb-0">
      <span aria-hidden className="absolute top-10 bottom-1 left-[19px] w-px bg-line group-last/step:hidden" />
      <span className="relative z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-[15px] font-bold text-white shadow-[0_4px_14px_rgb(80_52_255/0.3)]">
        {n}
      </span>
      <div className="min-w-0 flex-1 pt-1.5">
        <p className="text-xs font-bold tracking-wider text-primary uppercase">
          {t.stepLabel(n)}
          {step.title ? <span className="text-slate"> · {step.title}</span> : null}
        </p>
        <p className="mt-1 text-[15px] leading-relaxed text-ink/85 sm:text-base">
          <Rich text={step.text} />
        </p>
        {step.appCodes ? <AppCodeList /> : null}
        {step.list ? (
          <ul className="mt-3 space-y-2 max-sm:-ml-14">
            {step.list.map((line, i) => (
              <li key={i} className="rounded-2xl bg-mist px-3.5 py-2.5 text-[15px] leading-relaxed text-ink/85">
                <Rich text={line} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  )
}

export function Steps({ steps, title }: { steps: GuideStep[]; title?: string }) {
  return (
    <div>
      {title ? <h4 className="mb-5 text-lg font-bold">{title}</h4> : null}
      <ol className="list-none">
        {steps.map((step, i) => (
          <Step key={i} step={step} n={i + 1} />
        ))}
      </ol>
    </div>
  )
}

function DesktopDownloads({ os }: { os: DesktopOs | null }) {
  const t = useT().install
  const items: DesktopOs[] = ['windows', 'mac', 'linux']
  return (
    <div className="mt-4 flex flex-wrap gap-2.5">
      {items.map((key) => (
        <Fact key={key} value={FACTS.desktop[key]} what={`desktop.${key}`}>
          {(url) => (
            <PillButton
              href={url}
              variant={os === key || (os === null && key === 'windows') ? 'primary' : 'secondary'}
              size="md"
              arrow={false}
              icon={<Download />}
              className="max-w-full"
            >
              {t.desktop[key]}
            </PillButton>
          )}
        </Fact>
      ))}
    </div>
  )
}

function PlayerLinks({ store }: { store: 'ios' | 'windows' }) {
  const t = useT().install
  const players = Object.values(FACTS.players).filter((p) => p[store])
  if (!players.length) return null
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {players.map((player) => (
        <li key={player.name}>
          <a
            href={player[store] ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink shadow-pill transition-colors hover:border-primary/40 hover:text-primary"
          >
            {t.storeLink[store](player.name)}
            <ExternalLink aria-hidden className="size-3.5 text-primary" />
          </a>
        </li>
      ))}
    </ul>
  )
}

function OptionCard({ option, os, highlight }: { option: GuideOption; os: DesktopOs | null; highlight: boolean }) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-3xl border p-5 sm:p-6',
        highlight ? 'border-primary/30 bg-white shadow-glow' : 'border-line bg-white',
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-ink px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
          {option.label}
        </span>
        <span
          className={cn(
            'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase',
            highlight ? 'bg-primary-soft text-primary' : 'bg-status-soft text-ink',
          )}
        >
          {option.tag}
        </span>
      </div>
      <h4 className="mt-3 text-base leading-snug font-bold sm:text-lg">{option.title}</h4>
      {option.text ? (
        <p className="mt-2 text-[15px] leading-relaxed text-ink/85">
          <Rich text={option.text} />
        </p>
      ) : null}
      {option.list ? (
        <ul className="mt-3 space-y-2">
          {option.list.map((line, i) => (
            <li key={i} className="rounded-2xl bg-mist px-3.5 py-2.5 text-[15px] leading-relaxed text-ink/85">
              <Rich text={line} />
            </li>
          ))}
        </ul>
      ) : null}
      {option.desktopDownloads ? <DesktopDownloads os={os} /> : null}
      {option.playerLinks ? <PlayerLinks store={option.playerLinks} /> : null}
    </div>
  )
}

export function Options({ items, os }: { items: GuideOption[]; os: DesktopOs | null }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((option, i) => (
        <OptionCard key={i} option={option} os={os} highlight={!!option.recommended} />
      ))}
    </div>
  )
}
