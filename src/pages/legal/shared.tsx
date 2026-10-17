import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { IconTile, Pending, TextLink, inScope, stepDiscClass } from '@/components/brand'
import { cn } from '@/lib/utils'
import { isMissing } from '../theme/facts-text'
import { Fact } from '../theme/facts-ui'

// Building blocks of the legal documents (mentions légales, CGV, CGU, privacy, refund): one document layout with a
// sticky table of contents from xl, plain headings (no keyword line on legal pages), identity rows, real numbered
// steps in discs, tables in a white card that stack on phones, a callout and the closing help card. Calm and plain:
// paper, white cards, hairlines; no Nuit, no yellow, no ink rule.

/**
 * The measure of a legal document: 62 characters of the text face's « 0 » (about 85 letters a line at 18px, the
 * kit's own measure for answers), with a 1.7 line height for long reading. Paragraphs, lists, cards and tables
 * share it, so every block ends on one right edge.
 */
export const DOC_MEASURE = 'max-w-[62ch]'

// ── Document layout ────────────────────────────────────────────────────────────────────────────────

type TocItem = { id: string; label: string }

const TOC_OFFSET = 140

/**
 * H1 (display-lg), the lead and the version line; from xl a 3/9 split with a sticky table of contents built from
 * the headings marked data-toc: rows of 44px or more with 16px corners, the current one on the blue tint with a
 * Bleu repère dot (the cue besides colour). Below xl: one text column. `version` is the date this version applies
 * from (legal.lastUpdated.<doc>, an optional fact): on the published site the line « Version en vigueur depuis
 * le … » waits for the date.
 */
export function DocLayout({
  title,
  lead,
  version,
  children,
}: {
  title: ReactNode
  lead?: ReactNode
  version?: { date: string | null; fact: string }
  children: ReactNode
}) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const tocId = useId()
  const [toc, setToc] = useState<TocItem[]>([])
  const [current, setCurrent] = useState<string | undefined>()

  useEffect(() => {
    const root = bodyRef.current
    if (!root) return
    const heads = Array.from(root.querySelectorAll<HTMLElement>('[data-toc]'))
    setToc(heads.map((h) => ({ id: h.id, label: (h.textContent || '').trim() })))
    let raf = 0
    const update = () => {
      raf = 0
      let cur = heads[0]?.id
      for (const h of heads) {
        if (h.getBoundingClientRect().top <= TOC_OFFSET) cur = h.id
        else break
      }
      setCurrent(cur)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // `text-copy` on the container makes the measure below resolve against the body size, so cards, tables and
  // paragraphs share one width.
  return (
    <div className="mx-auto max-w-content px-gutter font-sans text-copy">
      <div className={cn('relative mx-auto xl:max-w-none', DOC_MEASURE)}>
        <header className="relative pt-hero pb-10 md:pb-12 xl:grid xl:grid-cols-12 xl:gap-x-grid">
          <div className="relative xl:col-span-9 xl:col-start-4">
            <h1 className="font-display text-display-lg text-z-fg">{title}</h1>
            {lead ? <div className="mt-5 max-w-[52ch] font-sans text-lead text-z-soft md:mt-6">{lead}</div> : null}
            {version && inScope({ [version.fact]: version.date }) ? (
              <p className="mt-4 font-sans text-meta font-medium text-z-muted">
                Version en vigueur depuis le <Fact value={version.date} what="date de cette version" fact={version.fact} tail="." />
              </p>
            ) : null}
          </div>
        </header>

        <div className="border-t border-hairline pt-10 pb-section md:pt-12 xl:grid xl:grid-cols-12 xl:gap-x-grid">
          <aside className="hidden xl:col-span-3 xl:block">
            {toc.length > 0 ? (
              <nav aria-labelledby={tocId} className="sticky top-24 -ml-3 max-h-[calc(100svh-7rem)] overflow-y-auto pr-6 pb-2">
                <p id={tocId} className="px-3 pb-2 font-sans text-micro font-semibold text-ink-muted">
                  Sommaire
                </p>
                <ol className="m-0 grid list-none gap-0.5 p-0">
                  {toc.map((item) => {
                    const on = item.id === current
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          aria-current={on ? 'location' : undefined}
                          className={cn(
                            'flex min-h-11 items-center gap-2.5 rounded-inner px-3 py-2 font-sans text-meta leading-[1.35] font-medium',
                            'transition-colors duration-150 ease-calm hover:bg-nuit-100 hover:text-ink',
                            'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-z-focus',
                            "before:size-1.5 before:shrink-0 before:rounded-full before:content-['']",
                            on ? 'bg-nuit-100 text-ink before:bg-nuit-700' : 'text-ink-soft before:bg-transparent',
                          )}
                        >
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                </ol>
              </nav>
            ) : null}
          </aside>
          <div ref={bodyRef} className={cn('xl:col-span-9 xl:col-start-4', DOC_MEASURE)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Text primitives ──────────────────────────────────────────────────────────────────────────────

const copyClass = cn('font-sans text-copy leading-[1.7] text-ink-body', DOC_MEASURE)

export function P({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn(copyClass, 'mt-5 first:mt-0', className)}>{children}</p>
}

/** Section heading of a document (listed in the table of contents): a label heading in the display face. */
export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      data-toc=""
      className="mt-10 scroll-mt-[88px] border-t border-hairline pt-10 font-display text-title-lg text-z-fg first:mt-0 first:border-t-0 first:pt-0 md:mt-12 md:pt-12"
    >
      {children}
    </h2>
  )
}

/** A sub-heading inside a section (not in the table of contents). */
export function H3({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3 id={id} className="mt-8 scroll-mt-[88px] font-display text-title text-z-fg">
      {children}
    </h3>
  )
}

/** Bulleted list (the items carry their own « ; » and the last « . »). */
export function UL({ children }: { children: ReactNode }) {
  return <ul className={cn(copyClass, 'mt-5 grid list-disc gap-y-2.5 pl-5 marker:text-z-accent [&>li]:pl-1.5')}>{children}</ul>
}

/** An identity value: the fact when the owner gave it, its block marker otherwise. */
export function Value({ value, what, fact }: { value: ReactNode | null | undefined; what: string; fact: string }) {
  return isMissing(value) ? <Pending variant="block" what={what} fact={fact} /> : <>{value}</>
}

/**
 * Identity rows (label muted, value ink) as a description list on a plate card. A row with `to` links its label to
 * that page (the CGV plan rows: the plan name is the link, so each link names its own plan).
 */
export function IdentityList({ label, rows }: { label?: string; rows: { title: string; to?: string; value: ReactNode }[] }) {
  return (
    <dl aria-label={label} className={cn('mt-6 grid rounded-card border border-hairline bg-plate px-5 py-1.5 font-sans text-copy md:px-6', DOC_MEASURE)}>
      {rows.map((r) => (
        <div key={r.title} className="grid gap-x-6 gap-y-1 border-b border-hairline py-3.5 last:border-b-0 sm:grid-cols-[12rem_minmax(0,1fr)]">
          <dt className="text-meta font-medium text-ink-muted sm:pt-1">
            {r.to ? (
              // A 44px tap box that does not move the lines around it.
              <TextLink to={r.to} standalone className="-my-2.5">
                {r.title}
              </TextLink>
            ) : (
              r.title
            )}
          </dt>
          <dd className="m-0 min-w-0 break-words text-ink">{r.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Real numbered steps: mono numerals in 32px discs (the kit's step disc), title and text. */
export function Steps({ items }: { items: { title: string; text: ReactNode }[] }) {
  return (
    <ol className={cn('mt-6 grid list-none gap-0 p-0', DOC_MEASURE)}>
      {items.map((s, i) => (
        <li key={s.title} className="grid grid-cols-[32px_minmax(0,1fr)] items-start gap-x-4 border-t border-hairline py-4 first:border-t-0 first:pt-0 last:pb-0">
          {/* Centred on the first text line (about 30px tall). */}
          <span aria-hidden="true" className={cn(stepDiscClass.base, stepDiscClass.plain, '-mt-px')}>
            {i + 1}
          </span>
          <div className="min-w-0 font-sans text-copy leading-[1.7] text-ink-body">
            <span className="block font-semibold text-ink">{s.title}</span>
            <span className="block">{s.text}</span>
          </div>
        </li>
      ))}
    </ol>
  )
}

/**
 * A table in one white card (card radius, rows divided by hairlines and clipped to its corners). From md: a header
 * row on the paper tint, then one row per entry. On phones each entry stacks: its first cell as the title, then
 * every other cell after its column name, so no row scrolls sideways.
 */
export function Table({ caption, head, rows }: { caption?: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={cn('mt-6 overflow-hidden rounded-card border border-hairline bg-plate', DOC_MEASURE)}>
      <table className="w-full border-collapse font-sans text-small text-ink-body">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="max-md:sr-only">
          <tr className="bg-paper text-left">
            {head.map((h) => (
              <th key={h} scope="col" className="px-3 py-3 text-meta font-semibold text-ink-soft first:pl-5 last:pr-5 md:first:pl-6 md:last:pr-6">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-hairline max-md:grid max-md:gap-1.5 max-md:px-5 max-md:py-4 max-md:first:border-t-0">
              {r.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="py-3.5 pr-3 pl-6 text-left align-top font-semibold text-ink max-md:p-0">
                    {cell}
                  </th>
                ) : (
                  <td key={j} className="px-3 py-3.5 align-top last:pr-6 max-md:p-0">
                    <span className="text-meta font-medium text-ink-muted md:sr-only">{head[j]}&nbsp;: </span>
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Highlighted note inside a document (an information callout, never an alert). */
export function Callout({ icon, title, children, id }: { icon: string; title: string; children: ReactNode; id?: string }) {
  return (
    <aside id={id} aria-label={title} className={cn('mt-10 grid scroll-mt-[88px] gap-4 rounded-card border border-hairline bg-plate p-card sm:grid-cols-[auto_1fr] sm:gap-5', DOC_MEASURE)}>
      <IconTile icon={icon} />
      <div className="min-w-0">
        <p className="font-sans text-copy font-semibold text-ink">{title}</p>
        <div className="mt-2 font-sans text-copy leading-[1.7] text-ink-body">{children}</div>
      </div>
    </aside>
  )
}

/** Closing help card: its heading (in the table of contents), a line and its actions (secondary only). */
export function HelpCard({ id, heading, children, actions }: { id: string; heading: ReactNode; children: ReactNode; actions?: ReactNode }) {
  return (
    <div className={cn('mt-12 grid gap-4 rounded-panel border border-hairline bg-plate p-card sm:grid-cols-[auto_1fr] sm:gap-5 md:mt-14', DOC_MEASURE)}>
      <IconTile icon="ti-mail" />
      <div className="min-w-0">
        <h2 id={id} data-toc="" className="scroll-mt-[88px] font-display text-title-lg text-z-fg">
          {heading}
        </h2>
        <div className="mt-3 font-sans text-copy leading-[1.7] text-ink-body">{children}</div>
        {actions && <div className="mt-5 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </div>
  )
}
