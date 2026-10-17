import type { ReactNode } from 'react'
import { TextLink } from '@/components/brand'
import { FACTS } from '@/lib/facts'
import { NB, endsSentence } from './facts-text'
import { Fact } from './shared'

// Commitments that more than one page states, word for word.

/** A commitment: decorative icon, title, one or two sentences. */
export type Pledge = { icon: string; title: string; text: ReactNode }

const REFUND_PAGE = '/politique-de-remboursement/'

/** The refund terms in one line, as the owner types them. */
const REFUND_SUMMARY = FACTS.refund.terms.summary

/**
 * The answer to « what if it does not work at home? »: the refund terms in one line (a required fact), which link
 * to the refund policy. Shared with the home page's « Pourquoi Jalon » band, word for word.
 */
export const REFUND_PLEDGE: Pledge = {
  icon: 'ti-receipt-refund',
  title: 'Si le service ne marche pas chez vous',
  text: (
    <>
      On cherche d’abord une solution avec vous. Sinon{NB}:{' '}
      {/* The summary is a link: a line typed with its own full stop keeps that one, the slot adds none. */}
      <Fact
        value={REFUND_SUMMARY && <TextLink to={REFUND_PAGE}>{REFUND_SUMMARY}</TextLink>}
        what="conditions de remboursement"
        fact="refund.terms.summary"
        tail={REFUND_SUMMARY && endsSentence(REFUND_SUMMARY) ? undefined : '.'}
      />
    </>
  ),
}
