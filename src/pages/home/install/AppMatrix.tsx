// #applications: the four free official apps with their Downloader code, APK download and activation mode.
import { Download, KeyRound } from 'lucide-react'
import { Badge, Fact, Highlight, PillButton, Reveal } from '@/components/kit'
import { useT } from '@/i18n/context'
import { HOME_ANCHORS } from '@/i18n/routes'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { HUB_APPS, appLabel, type HubAppId } from './apps'
import { CodeBox } from './CopyCode'
import { NoticeBox } from './Guide'

function AppCard({ id, index }: { id: HubAppId; index: number }) {
  const t = useT().install.apps
  const app = FACTS.apps[id]
  const label = appLabel(id)
  const note = t.notes[id]
  return (
    <Reveal delay={index * 70} className="h-full">
      <article className="flex h-full flex-col gap-5 rounded-3xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-glow sm:p-7">
        <header className="flex items-start gap-4">
          <span
            aria-hidden
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-deep font-display text-sm font-extrabold text-white"
          >
            {app.name.replace(/^Atlas Pro\s*/, '').slice(0, 4)}
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="text-lg leading-snug font-bold sm:text-xl">{app.name}</h4>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate">
              {app.version ? (
                <span className="font-semibold text-ink">
                  {t.version(app.version)}
                  {app.compatibleVersions?.length ? (
                    <span className="font-normal text-slate"> · {t.compatible(app.compatibleVersions.join(', '))}</span>
                  ) : null}
                </span>
              ) : null}
              <span
                className={cn(
                  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
                  app.status === 'latest' ? 'bg-primary-soft text-primary' : 'bg-gold-soft text-ink',
                )}
              >
                {t.status[app.status]}
              </span>
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center rounded-full bg-status-soft px-2.5 py-1 text-xs font-bold tracking-wide text-ink uppercase">
            {t.free}
          </span>
        </header>

        <Fact value={app.downloaderCode} what={`apps.${id}.downloaderCode`}>
          {(code) => <CodeBox code={code} label={t.codeLabel} copyLabel={t.copyAria(label, code)} />}
        </Fact>

        <div className="rounded-2xl bg-mist p-4">
          <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate uppercase">
            <KeyRound aria-hidden className="size-4 text-primary" />
            {t.activationLabel}
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-1.5">
            {app.activation.map((mode, i) => (
              <span key={mode} className="contents">
                {i > 0 ? <span className="text-xs font-bold text-slate uppercase">{t.or}</span> : null}
                <span className="inline-flex items-center rounded-full border border-line bg-white px-3 py-1 text-sm font-semibold text-ink">
                  {t.activation[mode]}
                </span>
              </span>
            ))}
          </p>
          {note ? <p className="mt-2 text-sm leading-snug text-slate">{note}</p> : null}
        </div>

        <div className="mt-auto">
          <Fact value={app.url} what={`apps.${id}.url`}>
            {(url) => (
              <PillButton href={url} size="lg" arrow={false} icon={<Download />} className="h-auto min-h-13 w-full px-5 py-3 text-[15px] leading-snug whitespace-normal [&_.truncate]:overflow-visible [&_.truncate]:text-center [&_.truncate]:whitespace-normal">
                {t.download(label)}
              </PillButton>
            )}
          </Fact>
        </div>
      </article>
    </Reveal>
  )
}

export function AppMatrix() {
  const t = useT().install.apps
  return (
    <div id={HOME_ANCHORS.apps} className="mt-16 scroll-mt-4 sm:mt-24">
      <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center gap-3 text-center sm:mb-10">
        <Badge>{t.badge}</Badge>
        <h3 className="text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
          <Highlight text={t.title} />
        </h3>
        <p className="text-base text-slate">{t.subtitle}</p>
      </div>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {HUB_APPS.map((id, i) => (
          <AppCard key={id} id={id} index={i} />
        ))}
      </div>
      <NoticeBox className="mt-6 sm:mt-8" notice={{ tone: 'tip', title: t.redundancy.title, body: [t.redundancy.text] }} />
    </div>
  )
}
