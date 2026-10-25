// Home section: « Vos Questions Fréquentes – ATLAS PRO ONTV » (the brief's questions 1–25; it has no question 12).
// Owner: faq. Anchor: HOME_ANCHORS.faq
import { useEffect, useState, type ReactNode } from 'react'
import { Pending, SectionHeader, Section } from '@/components/kit'
import { useLang, useT } from '@/i18n/context'
import type { FaqId } from '@/i18n/dict/fr/faq'
import { HOME_ANCHORS } from '@/i18n/routes'
import { LAUNCH } from '@/lib/mode'
import { FaqItem } from '../faq/FaqItem'
import { FaqJsonLd } from '../faq/FaqJsonLd'
import { HelpCard } from '../faq/HelpCard'
import { FAQ_ICONS } from '../faq/icons'
import { Answer } from '../faq/rich'
import { answerText, typo } from '../faq/text'
import { useFaqValues } from '../faq/values'

/** The brief has no question 12: its slot comes after question 11 (review mode only). */
const PENDING_AFTER: FaqId = 'screens'

export function Faq() {
  const t = useT()
  const lang = useLang()
  const v = useFaqValues()
  const [open, setOpen] = useState<ReadonlySet<FaqId>>(() => new Set<FaqId>(['order']))

  const items = t.faq.items.map((item) => ({ id: item.id, question: item.q(v), blocks: item.a(v) }))

  // A link to one question (#faq-connect) opens it.
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.replace(/^#faq-/, '')
      if (id !== window.location.hash && t.faq.items.some((item) => item.id === id)) {
        setOpen((current) => new Set(current).add(id as FaqId))
      }
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [t])

  const toggle = (id: FaqId) =>
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <Section id={HOME_ANCHORS.faq}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            align="left"
            badge={
              <>
                <span aria-hidden>✦</span>
                {t.faq.badge}
              </>
            }
            title={t.faq.title}
            highlight={t.faq.titleHighlight}
            subtitle={typo(t.faq.subtitle, lang)}
            className="mb-0 sm:mb-0"
          />
          <HelpCard className="mt-8 hidden lg:block" />
        </div>

        <div>
          <ul className="flex flex-col gap-3 sm:gap-4">
            {items.map((item) => (
              <FaqSlot key={item.id} pendingAfter={item.id === PENDING_AFTER}>
                <FaqItem
                  id={item.id}
                  question={typo(item.question, lang)}
                  icon={FAQ_ICONS[item.id]}
                  open={open.has(item.id)}
                  onToggle={() => toggle(item.id)}
                >
                  <Answer blocks={item.blocks} />
                </FaqItem>
              </FaqSlot>
            ))}
          </ul>
          <HelpCard className="mt-8 lg:hidden" />
        </div>
      </div>

      <FaqJsonLd
        entries={items.map((item) => ({ question: item.question, answer: answerText(item.blocks, t.faq.whatsapp) }))}
      />
    </Section>
  )
}

/** An item, followed by the « question 12 » marker where the brief skips it (nothing in launch mode). */
function FaqSlot({ pendingAfter, children }: { pendingAfter: boolean; children: ReactNode }) {
  if (!pendingAfter) return children
  return (
    <>
      {children}
      <PendingSlot />
    </>
  )
}

function PendingSlot() {
  if (LAUNCH) return null
  return (
    <li className="flex justify-center py-1">
      <Pending what="Question 12 de la FAQ (absente du brief)" />
    </li>
  )
}
