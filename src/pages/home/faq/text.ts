// The FAQ answers as plain text (FAQPage JSON-LD) and small text helpers shared with the HTML renderer.
import type { FaqBlock, FaqInline, FaqWa } from '@/i18n/dict/fr/faq'
import type { Lang } from '@/i18n/locales'
import { FACTS } from '@/lib/facts'

/** French spacing: no line break before « ? ! : ; % » or after « « ». */
export function typo(text: string, lang: Lang): string {
  if (lang !== 'fr') return text
  return text.replace(/ ([?!:;»%])/g, ' $1').replace(/« /g, '« ')
}

/** Text of a WhatsApp link: its label, and the printed number when the answer shows it. */
export function waText(part: Extract<FaqInline, { wa: FaqWa }>, label: string): { text: string; number: string | null } {
  return { text: part.text ?? label, number: part.number ? FACTS.whatsapp.display : null }
}

function inlineText(parts: FaqInline[], waLabel: string): string {
  return parts
    .map((part) => {
      if (typeof part === 'string') return part
      if ('b' in part) return part.b
      if ('code' in part) return part.code
      if ('to' in part) return part.text
      const { text, number } = waText(part, waLabel)
      return number ? `${text} (${number})` : text
    })
    .join('')
}

/** The answer as plain text: paragraphs and list items on their own lines. */
export function answerText(blocks: FaqBlock[], waLabel: string): string {
  return blocks
    .flatMap((block) => {
      if ('p' in block) return [inlineText(block.p, waLabel)]
      if ('note' in block) return [inlineText(block.note, waLabel)]
      if ('ol' in block) return block.ol.map((row, j) => `${j + 1}. ${inlineText(row, waLabel)}`)
      const rows = 'ul' in block ? block.ul : block.cards
      return rows.map((row) => `• ${inlineText(row, waLabel)}`)
    })
    .join('\n')
}
