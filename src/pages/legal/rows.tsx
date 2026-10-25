// Rows of the legal documents: types and helpers (kept apart from LegalLayout.tsx, which only exports components).
// Owner: pages.
import type { ReactNode } from 'react'
import { useT } from '@/i18n/context'
import { FACTS } from '@/lib/facts'
import { LAUNCH } from '@/lib/mode'
import { contactMessage, waLink } from '@/lib/whatsapp'

export interface InfoRow {
  label: string
  /** null: a missing client fact (marker in review mode, row left out in launch mode). */
  value: ReactNode | null | undefined
  /** What is missing, for the marker. Default: the label. */
  what?: string
}

/** True when at least one row has a value (a section of rows is left out in launch mode otherwise). */
export function hasValue(rows: InfoRow[]): boolean {
  return rows.some((r) => r.value != null && r.value !== '')
}

/** Show a section of rows: always in review mode, only with at least one value in launch mode. */
export function showRows(rows: InfoRow[]): boolean {
  return !LAUNCH || hasValue(rows)
}

/** WhatsApp and e-mail rows, from the facts. */
export function useContactRows(): InfoRow[] {
  const t = useT().legal.common
  const email = FACTS.contact.email
  return [
    {
      label: t.contact.whatsapp,
      value: FACTS.whatsapp.display ? (
        <a
          href={waLink(contactMessage())}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="whatsapp"
          className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
        >
          {FACTS.whatsapp.display}
        </a>
      ) : null,
    },
    {
      label: t.contact.email,
      value: email ? (
        <a href={`mailto:${email}`} className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
          {email}
        </a>
      ) : null,
      what: t.pending.email,
    },
  ]
}
