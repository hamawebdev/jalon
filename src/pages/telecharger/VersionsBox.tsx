// « Encadré des Versions » (brief pp. 10–11): the two main editions first, then the secondary ones, each tagged
// « Nouvelle version » or « Version précédente ». Every name and version comes from FACTS.
import { useT } from '@/i18n/context'
import { FACTS, type App } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { versionFamily } from './versions'


function Tag({ status }: { status: App['status'] }) {
  const t = useT().downloads.suite.versions.status
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        status === 'latest' && 'bg-status-soft text-status',
        status === 'new' && 'bg-primary-soft text-primary',
        status === 'previous' && 'bg-mist text-slate',
      )}
    >
      {t[status]}
    </span>
  )
}

export function VersionsBox() {
  const t = useT().downloads.suite.versions
  const { ontv, max, ibo, x9 } = FACTS.apps
  const ontvVersions = [ontv.version ? t.version(ontv.version) : null, ...(ontv.compatibleVersions ?? []).map(t.alsoVersion)]
    .filter(Boolean)
    .join(' – ')

  const main = [
    {
      key: 'ontv',
      name: ontv.version ? `${ontv.name} ${versionFamily(ontv.version)}` : ontv.name,
      detail: ontvVersions,
      status: ontv.status,
    },
    { key: 'max', name: max.name, detail: max.version ? t.version(max.version) : '', status: max.status },
  ]
  const secondary = [
    ...[ibo, x9].map((app) => ({
      key: app.name,
      name: app.version ? `${app.name} ${t.short(app.version)}` : app.name,
      status: app.status,
    })),
    ...FACTS.previousVersions.map((name) => ({ key: name, name, status: 'previous' as const })),
  ]

  return (
    <div aria-label={t.label} role="group" className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <p className="text-xs font-bold uppercase tracking-wider text-primary">{t.mainTitle}</p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {main.map((row) => (
          <li key={row.key} className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            <span aria-hidden className="text-primary">
              ✦
            </span>
            <span className="font-display font-bold text-ink">{row.name}</span>
            {row.detail ? <span className="text-sm font-medium text-slate">— {row.detail}</span> : null}
            <Tag status={row.status} />
          </li>
        ))}
      </ul>
      <div className="my-4 h-px bg-line" />
      <p className="text-xs font-bold uppercase tracking-wider text-slate">{t.secondaryTitle}</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {secondary.map((row) => (
          <li key={row.key} className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span aria-hidden className="text-xs text-primary">
              ▹
            </span>
            <span className="font-semibold text-ink">{row.name}</span>
            <Tag status={row.status} />
          </li>
        ))}
      </ul>
    </div>
  )
}
