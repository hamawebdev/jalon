// Brand name forms (IDENTITY.md §1.3). src/lib/site.ts re-exports them; never hard-code the name elsewhere.
// Kit components import from here, not from '@/lib/site'.
import { markerShown } from './scope'

/** Running text, headings, buttons, legal: capital J, rest lowercase, never plural. */
export const BRAND = 'Jalon'
/** Only where the typography is all caps anyway (tabs, badges, the Carte d'accès label). */
export const BRAND_UPPER = 'JALON'
/** The category descriptor that travels with the name where people meet it cold. */
export const BRAND_DESCRIPTOR = 'abonnement TV'
/** Cold-contact lockup: home <title>, WhatsApp profile name, e-mail sender, phone header. */
export const BRAND_LOCKUP = `${BRAND} · ${BRAND_DESCRIPTOR}`
/** Card-statement descriptor for the payment provider (≤ 22 characters). */
export const BRAND_STATEMENT = 'JALON ABONNEMENT TV'

/** <title>: the lockup on the home page, « {page} · Jalon, abonnement TV » elsewhere. */
export function pageTitle(page?: string) {
  return page ? `${page} · ${BRAND}, ${BRAND_DESCRIPTOR}` : BRAND_LOCKUP
}

/**
 * Literal placeholder for a missing owner fact where JSX cannot go (title, meta, aria-label, cart line names),
 * README rule 7: pendingText("délai d’activation", "delivery.delay") → "[À compléter : délai d’activation]". The
 * literal is exactly the one the team greps for (plain space before the colon). In JSX, render <Pending> instead.
 *
 * `fact` is the facts key, as on <Pending>. Launch mode (APPROVAL §2c): a required fact still returns the
 * literal; an optional fact returns '' (the empty string, which is falsy). So never glue the result into a
 * sentence blindly: either test it (`const p = pendingText(…); p ? `${name} ${p}` : name`), join the parts with
 * joinWords(), or decide first with inScope() and use the fact-free wording. Without `fact` the literal is
 * returned in both modes.
 */
export function pendingText(what: string, fact?: string) {
  return markerShown(fact) ? `[À compléter : ${what}]` : ''
}

/**
 * Joins the parts that are not empty with one space: joinWords('Formule 12 mois', pendingText('prix', key)) is
 * « Formule 12 mois [À compléter : prix] » while the marker shows and « Formule 12 mois » once it does not.
 * For titles, aria-labels and cart line names built around pendingText().
 */
export function joinWords(...parts: (string | null | undefined | false)[]) {
  return parts.filter((part): part is string => typeof part === 'string' && part.trim() !== '').join(' ')
}
