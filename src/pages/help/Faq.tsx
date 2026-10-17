import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Card, FaqItem, FaqList, IconTile, Section, TextLink } from '@/components/brand'
import { RESELLER_ON } from '@/lib/site'
import { cn } from '@/lib/utils'
import { JumpChip } from '../theme/chips'
import { WaLink } from '../theme/facts-ui'
import { HELP_GROUPS, type HelpGroup } from './rows'

/** Lower case, no accents, single spaces: « Télé » and « tele » match. */
function normalize(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/** Group icons of help-topics (generic pictograms). */
const GROUP_ICON: Record<string, string> = {
  'commande-et-paiement': 'ti-shopping-cart',
  'activation-et-acces': 'ti-key',
  'formules-et-renouvellement': 'ti-calendar-repeat',
  'remboursement-et-retractation': 'ti-receipt-refund',
  'contenus-et-qualite': 'ti-device-tv',
  'appareils-et-applications': 'ti-devices',
  depannage: 'ti-tool',
  assistance: 'ti-message-circle',
  'donnees-personnelles': 'ti-lock',
}

function countLabel(n: number) {
  return n === 1 ? '1 question' : `${n} questions`
}

type Topic = { key: string; href?: string; to?: string; icon: string; title: string; text: string; meta: string }

/** The topics in FAQ order; the reseller card (a link to its page, no count) sits before « Données personnelles ». */
function topics(): Topic[] {
  const cards: Topic[] = HELP_GROUPS.map((g) => ({
    key: g.id,
    href: `#${g.id}`,
    icon: GROUP_ICON[g.id],
    title: g.title,
    text: g.text,
    meta: countLabel(g.rows.length),
  }))
  // The reseller programme's own card, while the programme is on show.
  if (RESELLER_ON) {
    const at = cards.findIndex((c) => c.key === 'donnees-personnelles')
    cards.splice(at < 0 ? cards.length : at, 0, {
      key: 'revendeurs',
      to: '/revendeur/',
      icon: 'ti-building-store',
      title: 'Revendeurs',
      text: 'Crédits, packs et règles de revente, sur leur propre page.',
      meta: 'Voir la page Revendeur',
    })
  }
  return cards
}

/**
 * Columns of the card grid for `n` cards, so the last row is full or nearly: 10 = 5 × 2, 9 = 3 × 3, 8 = 4 × 2. Below
 * the widest layout the grid has two columns, and an odd last card takes the whole row.
 */
function gridCols(n: number) {
  const wide = n % 5 === 0 ? 'xl:grid-cols-5' : n % 4 === 0 || n === 7 ? 'xl:grid-cols-4' : 'lg:grid-cols-3'
  const lastAlone = n % 2 === 1 ? (wide === 'lg:grid-cols-3' ? 'md:max-lg:[&>li:last-child]:col-span-2' : 'md:max-xl:[&>li:last-child]:col-span-2') : ''
  return cn('md:grid-cols-2', wide, lastAlone)
}

/**
 * help-topics: one entry per group, in FAQ order. From md up, cards (pictogram, title, what the group covers, its
 * number of questions). On phones the same entries are a compact list of jump chips (pills, as « Votre appareil »
 * is on /applications/), so the first answers stay within about one screen of the page's top. A slim band: it is
 * the page's index, not a chapter.
 */
export function HelpTopics() {
  const cards = topics()
  return (
    <Section zone="band" dataSection="help-topics" rhythm="sm">
      <h2 className="font-display text-display-sm text-z-fg">Choisissez un thème.</h2>
      <ul className="mt-5 flex list-none flex-wrap gap-2 p-0 md:hidden">
        {cards.map((c) => (
          <li key={c.key}>
            {c.to ? (
              <JumpChip to={c.to} iconEnd="ti-arrow-right">
                {c.title}
              </JumpChip>
            ) : (
              <JumpChip href={c.href}>{c.title}</JumpChip>
            )}
          </li>
        ))}
      </ul>
      <ul className={cn('mt-8 grid list-none gap-grid p-0 max-md:hidden', gridCols(cards.length))}>
        {cards.map((c) => (
          <TopicCard key={c.key} href={c.href} to={c.to} icon={c.icon} title={c.title} text={c.text} meta={c.meta} />
        ))}
      </ul>
    </Section>
  )
}

function TopicCard({ href, to, icon, title, text, meta }: { href?: string; to?: string; icon: string; title: string; text: string; meta: string }) {
  const body = (
    <>
      <IconTile icon={icon} size={40} />
      <span className="mt-4 block font-display text-title text-z-fg">{title}</span>
      <span className="mt-1.5 block font-sans text-small text-z-soft">{text}</span>
      <span className="mt-auto flex items-center gap-1.5 pt-4 font-sans text-meta font-semibold text-nuit-700">
        {meta}
        <i className={cn('ti text-[16px]', to ? 'ti-arrow-right' : 'ti-arrow-down')} aria-hidden="true" />
      </span>
    </>
  )
  // A card that is one link: the card radius (a 40px tile sits 20px from its corner) and the kit's lift on hover.
  const cls = 'flex h-full flex-col rounded-card p-5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-z-focus lg:p-6'
  return (
    <li className="min-w-0">
      <Card interactive className="h-full p-0">
        {to ? (
          <Link to={to} className={cls}>
            {body}
          </Link>
        ) : (
          <a href={href} className={cls}>
            {body}
          </a>
        )}
      </Card>
    </li>
  )
}

/**
 * One FAQ group: the H2 (sticky from lg) on the left, the rows on the right. A hairline opens each group but the
 * first one shown, which starts the section (the ground has just changed above it: no rule needed there).
 */
function Group({ group, rows, filtering }: { group: HelpGroup; rows: HelpGroup['rows']; filtering: boolean }) {
  const { hash } = useLocation()
  return (
    <section
      id={group.id}
      aria-labelledby={`${group.id}-titre`}
      className="grid scroll-mt-[88px] gap-x-grid gap-y-5 border-t border-hairline-deep pt-8 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:pt-10"
    >
      <h2 id={`${group.id}-titre`} className="font-display text-display-sm text-z-fg lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
        {group.title}
      </h2>
      <FaqList className="lg:col-span-8">
        {rows.map((r) => (
          <div key={r.id} id={r.id} data-faq-row={r.id} className="scroll-mt-[88px]">
            <FaqItem question={r.q} defaultOpen={filtering || hash === `#${r.id}`}>
              {r.a}
            </FaqItem>
          </div>
        ))}
      </FaqList>
    </section>
  )
}

/**
 * help-faq: every group, then the reseller line between Assistance and Données personnelles. `query` filters the
 * rows in place (questions and answers), opens the matches and hides the groups left empty.
 */
export function HelpFaq({ query, onCount }: { query: string; onCount: (n: number) => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [texts, setTexts] = useState<Record<string, string> | null>(null)
  const q = normalize(query)
  const filtering = q.length > 0

  // Read each row's text once (answers stay in the DOM inside <details>), for the filter.
  useLayoutEffect(() => {
    const el = root.current
    if (!el || texts) return
    const map: Record<string, string> = {}
    el.querySelectorAll<HTMLElement>('[data-faq-row]').forEach((row) => {
      map[row.dataset.faqRow as string] = normalize(row.textContent ?? '')
    })
    setTexts(map)
  }, [texts])

  const groups = HELP_GROUPS.map((g) => ({
    group: g,
    rows: filtering && texts ? g.rows.filter((r) => (texts[r.id] ?? '').includes(q)) : g.rows,
  }))
  const total = groups.reduce((n, g) => n + g.rows.length, 0)

  useLayoutEffect(() => {
    onCount(total)
  }, [total, onCount])

  const reseller = RESELLER_ON
  return (
    <Section zone="paper" dataSection="help-faq">
      <div ref={root} className="grid gap-14 lg:gap-16">
        {groups.map(({ group, rows }) => {
          if (rows.length === 0) return null
          const node = <Group key={group.id} group={group} rows={rows} filtering={filtering} />
          if (group.id !== 'donnees-personnelles' || !reseller || filtering) return node
          return [
            <p key="revendeurs" className="max-w-[66ch] border-t border-z-line pt-8 font-sans text-copy text-z-soft">
              Questions de revendeurs&nbsp;: les crédits, les packs et les règles de revente sont expliqués sur la{' '}
              <TextLink to="/revendeur/">page Revendeur</TextLink>.
            </p>,
            node,
          ]
        })}
        {filtering && total === 0 && (
          <p className="font-sans text-copy text-z-soft">
            Aucune question ne correspond à «&nbsp;{query.trim()}&nbsp;». Essayez un autre mot, ou écrivez-nous sur <WaLink />.
          </p>
        )}
      </div>
    </Section>
  )
}
