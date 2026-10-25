// The shared layout of the three legal documents (mentions légales, confidentialité, conditions générales) and its
// text primitives. Sober: a light band with the H1, the lead and the last-updated date; then, from lg, a sticky table
// of contents beside a comfortable reading column; at the end, links to the other documents and a WhatsApp help
// card. Owner: pages.
//
// Missing client facts: a row whose value is null shows the « À compléter » marker in review mode and is left out in
// launch mode; a section made only of missing facts is left out in launch mode (section.show).
import type { ReactNode } from 'react'
import { FileText, Lock, Scale } from 'lucide-react'
import { Link } from 'react-router'
import { Badge, Container, Pending, WhatsAppButton } from '@/components/kit'
import { useLang, useT } from '@/i18n/context'
import { pathFor, type PageId } from '@/i18n/routes'
import { LAUNCH } from '@/lib/mode'
import { cn } from '@/lib/utils'
import { contactMessage } from '@/lib/whatsapp'
import type { InfoRow } from './rows'

export type LegalPageId = Extract<PageId, 'mentions' | 'confidentialite' | 'conditions'>

export interface LegalSection {
  id: string
  title: string
  content: ReactNode
  /** False: the section is left out (e.g. only missing facts in launch mode). Default true. */
  show?: boolean
}

const DOCS: { id: LegalPageId; icon: ReactNode }[] = [
  { id: 'mentions', icon: <Scale /> },
  { id: 'confidentialite', icon: <Lock /> },
  { id: 'conditions', icon: <FileText /> },
]

export function LegalPage({
  page,
  title,
  lead,
  sections,
}: {
  page: LegalPageId
  title: string
  lead: ReactNode
  sections: LegalSection[]
}) {
  const t = useT().legal.common
  const lang = useLang()
  const shown = sections.filter((s) => s.show !== false)
  const others = DOCS.filter((d) => d.id !== page)

  return (
    <>
      <header className="border-b border-line bg-mist">
        <Container className="py-12 sm:py-16">
          <div className="max-w-3xl">
            <Badge>
              <Scale aria-hidden className="size-3.5" />
              {t.badge}
            </Badge>
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl lg:leading-tight">{title}</h1>
            <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">{lead}</p>
            <p className="mt-5 text-sm font-medium text-slate">
              {t.updatedLabel} <span className="text-ink">{t.updated}</span>
            </p>
          </div>
        </Container>
      </header>

      <Container className="py-12 sm:py-16">
        <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          <aside className="hidden lg:block">
            <nav aria-label={t.toc} className="sticky top-28">
              <p className="px-3 pb-3 text-xs font-bold uppercase tracking-wide text-slate">{t.toc}</p>
              <ol className="flex flex-col gap-0.5 border-l border-line">
                {shown.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px flex gap-2 border-l-2 border-transparent py-1.5 pr-2 pl-3 text-sm leading-snug text-slate transition-colors hover:border-primary hover:text-primary"
                    >
                      <span className="tabular-nums text-slate/70">{i + 1}.</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0 max-w-[68ch]">
            {shown.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-title`}
                className="scroll-mt-28 border-t border-line pt-9 pb-9 first:border-t-0 first:pt-0 last:pb-0"
              >
                <h2 id={`${s.id}-title`} className="flex gap-3 text-xl font-bold tracking-tight sm:text-2xl">
                  <span className="tabular-nums text-primary">{i + 1}.</span>
                  <span>{s.title}</span>
                </h2>
                <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-ink/85 sm:text-base">{s.content}</div>
              </section>
            ))}

            <footer className="mt-14 flex flex-col gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate">{t.others}</p>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {others.map((d) => (
                    <li key={d.id}>
                      <Link
                        to={pathFor(d.id, lang)}
                        className="group flex h-full min-h-14 items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 font-semibold text-ink shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
                      >
                        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary [&_svg]:size-4.5">
                          {d.icon}
                        </span>
                        <span className="leading-snug">{t.docs[d.id]}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-start gap-4 rounded-3xl bg-primary-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div>
                  <p className="font-display text-lg font-bold text-ink">{t.help.title}</p>
                  <p className="mt-1 text-slate">{t.help.text}</p>
                </div>
                <WhatsAppButton message={contactMessage()}>{t.help.cta}</WhatsAppButton>
              </div>
            </footer>
          </article>
        </div>
      </Container>
    </>
  )
}

// ── Text primitives ──────────────────────────────────────────────────────────────────────────────────────────────

export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>
}

export function List({ items, ordered = false }: { items: ReactNode[]; ordered?: boolean }) {
  if (ordered) {
    return (
      <ol className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white tabular-nums">
              {i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    )
  }
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Internal link inside a legal text. */
export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
      {children}
    </Link>
  )
}

export function Callout({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-2xl border border-primary/20 bg-primary-soft/60 p-5 text-ink', className)}>{children}</div>
}

/** Label / value rows (identity of the publisher, host, pending terms). */
export function InfoRows({ rows }: { rows: InfoRow[] }) {
  const visible = rows.filter((r) => (r.value != null && r.value !== '') || !LAUNCH)
  if (!visible.length) return null
  return (
    <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
      {visible.map((r) => (
        <div key={r.label} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-4">
          <dt className="text-sm font-semibold text-slate">{r.label}</dt>
          <dd className="min-w-0 break-words text-ink">{r.value != null && r.value !== '' ? r.value : <Pending what={r.what ?? r.label} />}</dd>
        </div>
      ))}
    </dl>
  )
}
