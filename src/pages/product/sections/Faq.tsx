import { FaqItem, FaqList, Kw, Reveal, Section, SectionHead, type Zone } from '@/components/brand'
import type { FaqRow } from '../faq'

type FaqProps = {
  /** Anchor (product-quality links to #product-faq). */
  id?: string
  dataSection: string
  eyebrow?: string
  /** The heading around its keyword: [before, keyword, after]. */
  title: [string, string, string]
  /** Rows already filtered for the display mode (scoped()). */
  rows: FaqRow[]
  /** Ground (default paper); the page picks another when the band above is on paper. */
  zone?: Zone
}

/**
 * product-faq and renewal-faq: hairline rows in a text-width column (the first one open); from lg the head sits
 * sticky in a 4/8 split. Every answer stays in the DOM, so find-in-page reaches it. A list left with fewer than two
 * rows goes with its heading (copy README §10.4, rule 2).
 */
export function Faq({ id, dataSection, eyebrow, title, rows, zone = 'paper' }: FaqProps) {
  if (rows.length < 2) return null
  return (
    <Section
      zone={zone}
      dataSection={dataSection}
      id={id}
      containerClassName="max-lg:max-w-text lg:grid lg:grid-cols-12 lg:gap-x-grid"
    >
      <Reveal className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
        <SectionHead
          eyebrow={eyebrow}
          title={
            <>
              {title[0]}
              <Kw>{title[1]}</Kw>
              {title[2]}
            </>
          }
        />
      </Reveal>
      <FaqList className="mt-head max-w-text lg:col-span-8 lg:mt-0">
        {rows.map((row, i) => (
          <FaqItem key={row.id} defaultOpen={i === 0} question={row.q}>
            <p>{row.a}</p>
          </FaqItem>
        ))}
      </FaqList>
    </Section>
  )
}
