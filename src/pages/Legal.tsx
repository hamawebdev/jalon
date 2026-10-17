import type { ComponentType } from 'react'
import { Section } from '@/components/brand'
import { CguContent } from './legal/CguContent'
import { CgvContent } from './legal/CgvContent'
import { MentionsContent } from './legal/MentionsContent'
import { PrivacyContent } from './legal/PrivacyContent'
import { RefundContent } from './legal/RefundContent'

export type LegalDoc = 'mentions' | 'cgu' | 'cgv' | 'privacy' | 'refund'

const DOCS: Record<LegalDoc, ComponentType> = {
  mentions: MentionsContent,
  cgu: CguContent,
  cgv: CgvContent,
  privacy: PrivacyContent,
  refund: RefundContent,
}

// The legal documents (copy mentions-legales.md, cgv.md, cgu.md, confidentialite.md, remboursement.md): one paper
// section per document (hook legal-doc + data-doc); the layout and its table of contents live in legal/shared.tsx.
export default function Legal({ doc }: { doc: LegalDoc }) {
  const Content = DOCS[doc]
  return (
    <Section zone="paper" dataSection="legal-doc" data-doc={doc} rhythm="none" container={false}>
      <Content />
    </Section>
  )
}
