// The hub's cards (brief pp. 41–44).
//   Android cards: logo slot + name, then the « Code Downloader » box, then the violet download pill.
//   iOS and computer cards: logo slot + name + violet download pill only (no Downloader code: strict rule).
import type { ReactNode } from 'react'
import { ArrowDownToLine } from 'lucide-react'
import { Card, Fact, PillButton } from '@/components/kit'
import { useT } from '@/i18n/context'
import type { App } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { AppMark } from './AppMark'
import { CodeBox } from './CodeBox'

/** Violet pill that wraps on narrow cards instead of cutting the label. External links open in a new tab. */
function DownloadPill({ href, children }: { href: string; children: ReactNode }) {
  return (
    <PillButton
      href={href}
      icon={<ArrowDownToLine />}
      arrow={false}
      className="h-auto min-h-11 w-full whitespace-normal py-2.5 text-center leading-snug [&>span.truncate]:overflow-visible [&>span.truncate]:whitespace-normal"
    >
      {children}
    </PillButton>
  )
}

function StatusTag({ status }: { status: App['status'] }) {
  const t = useT().downloads.suite.versions.status
  const tones = {
    latest: 'bg-status-soft text-status',
    new: 'bg-primary-soft text-primary',
    previous: 'bg-mist text-slate',
  }
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', tones[status])}>
      {t[status]}
    </span>
  )
}

function CardHead({
  mark,
  title,
  systems,
  children,
}: {
  mark: ReactNode
  title: string
  systems: string
  children?: ReactNode
}) {
  return (
    <div className="flex items-start gap-4">
      {mark}
      <div className="min-w-0 flex-1">
        <h4 className="text-lg font-bold leading-snug">{title}</h4>
        <p className="mt-0.5 text-sm text-slate">{systems}</p>
        {children}
      </div>
    </div>
  )
}

export function AndroidAppCard({
  app,
  monogram,
  title,
  systems,
  versionLine,
}: {
  app: App
  monogram: string
  /** « Atlas Pro ONTV v4.0 » */
  title: string
  systems: string
  /** « Version 4.0.2 », when the title shows only the family. */
  versionLine?: string
}) {
  const t = useT().downloads.hub.card
  return (
    <Card as="article" className="flex h-full flex-col gap-5 p-6 sm:p-7">
      <CardHead mark={<AppMark monogram={monogram} tone="official" />} title={title} systems={systems}>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <StatusTag status={app.status} />
          {versionLine ? <span className="text-xs font-semibold text-ink">{versionLine}</span> : null}
          <span className="rounded-full border border-line px-2.5 py-0.5 text-xs font-semibold text-slate">{t.free}</span>
        </div>
      </CardHead>
      <p className="text-sm text-slate">
        <span className="font-semibold text-ink">{t.activationLabel}</span>{' '}
        {app.activation.map((a) => t.activation[a]).join(` ${t.or} `)}
      </p>
      <div className="mt-auto flex flex-col gap-3">
        <Fact value={app.downloaderCode} what={`Code Downloader ${app.name}`}>
          {(code) => <CodeBox code={code} />}
        </Fact>
        <Fact value={app.url} what={`Lien de téléchargement ${app.name}`}>
          {(url) => <DownloadPill href={url}>{t.download(app.name)}</DownloadPill>}
        </Fact>
      </div>
    </Card>
  )
}

/** iOS / computer card: logo slot + name + download pill. */
export function StoreCard({
  monogram,
  tone,
  markBadge,
  name,
  systems,
  caption,
  buttonName,
  url,
}: {
  monogram: string
  tone: 'official' | 'partner'
  markBadge?: ReactNode
  /** Product name shown on the card. */
  name: string
  systems: string
  caption?: string
  /** Name in the button: « IBO Player (iOS) ». */
  buttonName: string
  url: string | null
}) {
  const t = useT().downloads.hub.card
  return (
    <Card as="article" className="flex h-full flex-col gap-5 p-6 sm:p-7">
      <CardHead mark={<AppMark monogram={monogram} tone={tone} badge={markBadge} />} title={name} systems={systems}>
        {caption ? <p className="mt-1 text-xs font-medium text-slate">{caption}</p> : null}
      </CardHead>
      <div className="mt-auto">
        <Fact value={url} what={`Lien de téléchargement ${buttonName}`}>
          {(href) => <DownloadPill href={href}>{t.download(buttonName)}</DownloadPill>}
        </Fact>
      </div>
    </Card>
  )
}

/** Partner players installed on Android with a Downloader code only (no direct link in the brief). */
export function PartnerCodesCard({
  title,
  priceNote,
  players,
}: {
  title: string
  priceNote: string
  players: { key: string; name: string; monogram: string; code: string }[]
}) {
  return (
    <Card as="article" className="p-6 sm:p-7" hover={false}>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="text-sm font-medium text-slate">{priceNote}</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {players.map((p) => (
          <li key={p.key} className="flex flex-col gap-3 rounded-2xl border border-line bg-mist/60 p-4">
            <div className="flex items-center gap-3">
              <AppMark monogram={p.monogram} tone="partner" className="size-11 rounded-xl text-sm" />
              <span className="font-display font-semibold text-ink">{p.name}</span>
            </div>
            <CodeBox code={p.code} compact className="bg-white" />
          </li>
        ))}
      </ul>
    </Card>
  )
}
