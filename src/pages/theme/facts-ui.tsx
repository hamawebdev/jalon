import type { ReactNode } from 'react'
import {
  ButtonA,
  Pending,
  TextA,
  buttonIconSize,
  buttonVariants,
  iconClass,
  markerShown,
  whatsappPendingClass,
  type ButtonSize,
  type IconName,
} from '@/components/brand'
import { FACTS, mailtoHref } from '@/lib/facts'
import { BRAND, WHATSAPP_CHAT_HREF, WHATSAPP_LINK_PROPS } from '@/lib/site'
import { cn } from '@/lib/utils'
import { isMissing } from './facts-text'

// Small renderers for owner facts inside running text (copy notation {fact:path|words}): the value when the owner
// has given it, the kit's <Pending> otherwise. Never a fallback value.
//
// Launch mode (APPROVAL §2c, HANDOFF §14): a missing optional fact shows no marker, so these render nothing at all
// then, glued punctuation and unit included. The words around the slot are the caller's: it scopes its row or its
// sentence with <FactScope>, inScope() or scoped(), so nothing is left dangling.

type GlueProps = {
  /**
   * An opening bracket written right before the slot (« ( »). While the fact is pending it is glued to the marker, so
   * it never ends a line on its own with the marker below.
   */
  lead?: string
  /**
   * Punctuation that follows the slot (« . », « , », « ) », or « : » after a no-break space). While the fact is
   * pending it is glued to the marker, so a marker that wraps never leaves the full stop alone at the start of the
   * next line.
   */
  tail?: string
}

/**
 * An inline marker with the punctuation that touches it. A marker is one box in the line, and a browser may break
 * the line on either side of such a box whatever the neighbouring character, a no-break space included: written as
 * plain text, a « . » or a « ) » after it can start the next line and a « ( » before it can end the one above. Here
 * they share one box with the marker, which may still wrap inside: `lead` stays on its first line, `tail` on its last.
 */
function Marker({ what, fact, lead, tail }: GlueProps & { what: string; fact: string }) {
  if (!markerShown(fact)) return null
  if (!lead && !tail) return <Pending what={what} fact={fact} />
  if (!lead) {
    return (
      <span className="inline-flex max-w-full items-end">
        <Pending what={what} fact={fact} className="min-w-0" />
        {tail}
      </span>
    )
  }
  // With a lead, the bracket and the marker share their first baseline; the tail keeps the bottom, as above.
  return (
    <span className="inline-flex max-w-full items-baseline">
      {lead}
      <Pending what={what} fact={fact} className="min-w-0" />
      {tail && <span className="self-end">{tail}</span>}
    </span>
  )
}

type FactProps = GlueProps & {
  /** The formatted value, or null while the fact is missing. */
  value: ReactNode | null | undefined
  /** Words shown after « À compléter · ». */
  what: string
  /** facts.ts key (data-pending). */
  fact: string
  block?: boolean
  /**
   * A unit word after the value (« crédits », « chaînes »), joined by a no-break space (U+00A0) as copy writes it,
   * so a count never ends a line without its unit. Glued to the marker like `tail` while the fact is pending.
   */
  unit?: string
}

/**
 * The punctuation after a value. A text the owner typed with its own closing mark (« … à la commande. ») keeps that
 * one: the slot's full stop is not printed a second time.
 */
function closing(value: ReactNode, after: string | undefined) {
  if (!after || typeof value !== 'string') return after
  return after.startsWith('.') && /[.!?…]\s*$/.test(value) ? after.slice(1) : after
}

/** A fact slot: the value, or <Pending what fact />, with the punctuation that touches it (`lead`, `tail`). */
export function Fact({ value, what, fact, block, unit, lead, tail }: FactProps) {
  const after = unit ? `\u00a0${unit}${tail ?? ''}` : tail
  if (isMissing(value)) {
    if (!markerShown(fact)) return null
    if (!block) return <Marker what={what} fact={fact} lead={lead} tail={after} />
    return (
      <>
        {lead}
        <Pending what={what} fact={fact} variant="block" className={after ? 'min-w-0' : undefined} />
        {after}
      </>
    )
  }
  return (
    <>
      {lead}
      {value}
      {closing(value, after)}
    </>
  )
}

/** « WhatsApp » as an inline link to the chat once the number exists; plain words until then. */
export function WaLink({ children = 'WhatsApp' }: { children?: ReactNode }) {
  if (!WHATSAPP_CHAT_HREF) return <>{children}</>
  return (
    <TextA href={WHATSAPP_CHAT_HREF} {...WHATSAPP_LINK_PROPS} aria-label={`${typeof children === 'string' ? children : 'WhatsApp'} (nouvel onglet)`}>
      {children}
    </TextA>
  )
}

/**
 * A value that is a link on a line of its own (the number on a channel card, the address in a help card): the same
 * link in a 44px tap box that does not move the lines around it. Never for a link inside a sentence.
 */
type LoneLink = { standalone?: boolean }
const LONE = '-my-2.5'

/** The WhatsApp number as a link once it exists, its marker until then; `lead` and `tail` as on Fact. */
export function WaNumber({ lead, tail, standalone }: GlueProps & LoneLink) {
  const n = FACTS.support.whatsapp
  if (!n || !WHATSAPP_CHAT_HREF) return <Marker what="numéro WhatsApp" fact="support.whatsapp" lead={lead} tail={tail} />
  return (
    <>
      {lead}
      <TextA href={WHATSAPP_CHAT_HREF} {...WHATSAPP_LINK_PROPS} aria-label={`${n} (nouvel onglet)`} standalone={standalone} className={standalone ? LONE : undefined}>
        {n}
      </TextA>
      {tail}
    </>
  )
}

/** The support e-mail as a mailto link once it exists, its marker until then; `lead` and `tail` as on Fact. */
export function Email({ lead, tail, standalone }: GlueProps & LoneLink) {
  const e = FACTS.support.email
  if (!e) return <Marker what="adresse e-mail du support" fact="support.email" lead={lead} tail={tail} />
  return (
    <>
      {lead}
      <TextA href={mailtoHref(e) ?? undefined} standalone={standalone} className={standalone ? LONE : undefined}>
        {e}
      </TextA>
      {tail}
    </>
  )
}

type PendingButtonProps = {
  /** The button's own label, kept while the fact is missing (« Écrire un e-mail »). */
  label: string
  /** facts.ts key (data-pending). */
  fact: string
  icon?: IconName
  size?: ButtonSize
  full?: boolean
  className?: string
}

/**
 * A secondary action whose target is an owner fact not given yet: the button keeps its label and its place in the
 * kit's pending look, as the WhatsApp button and the home page have it (« Écrire un e-mail · À compléter »). Not a
 * link, so never a dead one; carries data-pending. In launch mode a button that waits for an optional fact is not
 * drawn (the caller scopes the card or the line around it).
 */
export function PendingButton({ label, fact, icon, size = 'md', full, className }: PendingButtonProps) {
  if (!markerShown(fact)) return null
  return (
    <span data-pending={fact} className={cn(buttonVariants({ variant: 'secondary', size, full: !!full }), whatsappPendingClass, className)}>
      {icon && <i className={iconClass(icon, buttonIconSize[size])} aria-hidden="true" />}
      <span>
        {label}
        <span className="font-mono text-[0.875rem] font-medium"> · À compléter</span>
      </span>
    </span>
  )
}

/**
 * « Écrire un e-mail » (copy aide.md, contact.md, remboursement.md): the mailto button once support.email exists,
 * the same button in the pending look until then. One treatment on every page that offers it.
 */
export function EmailButton({ full, className }: { full?: boolean; className?: string }) {
  const href = mailtoHref(FACTS.support.email)
  if (!href) return <PendingButton label="Écrire un e-mail" fact="support.email" icon="ti-mail" full={full} className={className} />
  return (
    <ButtonA href={href} aria-label={`Écrire un e-mail à l’équipe ${BRAND}`} variant="secondary" size="md" iconStart="ti-mail" full={full} className={className}>
      Écrire un e-mail
    </ButtonA>
  )
}
