// Renders the FAQ answers (blocks of inline parts, see src/i18n/dict/fr/faq.ts) as HTML. ./text.ts renders the same
// data as plain text for the FAQPage JSON-LD, so the structured data never drifts from the page.
import { Link } from 'react-router'
import { TriangleAlert } from 'lucide-react'
import { WhatsAppIcon } from '@/components/kit'
import { useLang, useT } from '@/i18n/context'
import type { FaqBlock, FaqInline, FaqWa } from '@/i18n/dict/fr/faq'
import { homeAnchor } from '@/i18n/routes'
import { activateMessage, contactMessage, helpMessage, renewalMessage, waLink } from '@/lib/whatsapp'
import { typo, waText } from './text'

const MESSAGES: Record<FaqWa, () => string> = {
  activate: activateMessage,
  renewal: renewalMessage,
  help: helpMessage,
  contact: contactMessage,
}

function InlinePart({ part }: { part: FaqInline }) {
  const lang = useLang()
  const t = useT()
  if (typeof part === 'string') return <>{typo(part, lang)}</>
  if ('b' in part) return <strong className="font-semibold text-ink">{typo(part.b, lang)}</strong>
  if ('code' in part)
    return <code className="rounded-md bg-mist px-1.5 py-0.5 font-mono text-[0.9em] text-ink">{part.code}</code>
  if ('to' in part)
    return (
      <Link
        to={homeAnchor(part.to, lang)}
        className="font-semibold text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
      >
        {typo(part.text, lang)}
      </Link>
    )
  const { text, number } = waText(part, t.faq.whatsapp)
  return (
    <a
      href={waLink(MESSAGES[part.wa]())}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      className="font-semibold text-whatsapp-deep underline decoration-whatsapp/40 underline-offset-2 transition-colors hover:decoration-whatsapp-deep"
    >
      <WhatsAppIcon className="mr-1 inline size-[1.05em] -translate-y-px align-middle" />
      {typo(text, lang)}
      {number ? <span className="whitespace-nowrap"> ({number})</span> : null}
    </a>
  )
}

function Inlines({ parts }: { parts: FaqInline[] }) {
  return (
    <>
      {parts.map((part, i) => (
        <InlinePart key={i} part={part} />
      ))}
    </>
  )
}

export function Answer({ blocks }: { blocks: FaqBlock[] }) {
  return (
    <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-slate sm:text-base">
      {blocks.map((block, i) => {
        if ('p' in block)
          return (
            <p key={i}>
              <Inlines parts={block.p} />
            </p>
          )
        if ('ul' in block || 'ol' in block) {
          const ordered = 'ol' in block
          const rows = ordered ? block.ol : block.ul
          const List = ordered ? 'ol' : 'ul'
          return (
            <List key={i} className="flex flex-col gap-2.5">
              {rows.map((row, j) => (
                <li key={j} className="flex gap-3">
                  <span
                    aria-hidden
                    className={
                      ordered
                        ? 'mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary'
                        : 'mt-2.5 size-1.5 shrink-0 rounded-full bg-primary'
                    }
                  >
                    {ordered ? j + 1 : null}
                  </span>
                  <span className="min-w-0">
                    <Inlines parts={row} />
                  </span>
                </li>
              ))}
            </List>
          )
        }
        if ('cards' in block)
          return (
            <ul key={i} className="flex flex-col gap-3">
              {block.cards.map((row, j) => (
                <li key={j} className="rounded-2xl border border-line bg-mist/70 p-4 sm:p-5">
                  <Inlines parts={row} />
                </li>
              ))}
            </ul>
          )
        return (
          <p key={i} className="flex gap-2.5 rounded-2xl bg-alert-soft p-4 text-sm text-ink">
            <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-alert" />
            <span className="min-w-0">
              <Inlines parts={block.note} />
            </span>
          </p>
        )
      })}
    </div>
  )
}
