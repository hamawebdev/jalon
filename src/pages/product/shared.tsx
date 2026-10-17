import type { ReactNode } from 'react'
import {
  Pending,
  RatingPill,
  TextA,
  TextLink,
  WHATSAPP_FACT,
  WhatsAppButton,
  buttonIconSize,
  buttonVariants,
  iconClass,
  markerShown,
  whatsappPendingClass,
} from '@/components/brand'
import { FACTS, mailtoHref } from '@/lib/facts'
import { WHATSAPP_HREF, WHATSAPP_LABEL, WHATSAPP_LINK_PROPS } from '@/lib/site'
import { cn } from '@/lib/utils'
import { NB, endsSentence, fullStars } from './facts-text'

// Inline elements shared by the home page and the plan pages: a fact, or <Pending> while the owner has not given
// it; WhatsApp, e-mail and page links inside sentences. The formatted values are in ./facts-text.ts.

/**
 * A missing fact's marker with what follows it (its unit, its punctuation): they stay together, so a « . » never
 * wraps alone onto the next line. The marker may still wrap inside; the tail then follows its last line: the
 * marker aligns its own label by last baseline here, or its first line would be the baseline it reports.
 * The marker grows from a zero basis and the row may wrap: where both fit, nothing changes (the marker shrinks and
 * wraps inside to keep the tail beside it); in a column narrower than the marker's longest piece plus the unit
 * (a 280px screen, a large text setting) the unit goes under it instead of pushing the column out sideways.
 */
function Marked({ children, tail }: { children: ReactNode; tail?: string }) {
  if (!tail) return <>{children}</>
  return (
    <span className="inline-flex max-w-full flex-wrap items-baseline-last [&>[data-pending]]:grow [&>[data-pending]]:basis-0 [&>[data-pending]]:items-baseline-last">
      {children}
      {tail}
    </span>
  )
}

/**
 * The punctuation after a value. A text the owner typed with its own closing mark keeps that one: the slot's full
 * stop is not printed a second time (the same rule as build-b's Fact, src/pages/theme/facts-ui.tsx).
 */
function closing(value: ReactNode, after: string | undefined) {
  if (!after || typeof value !== 'string') return after
  return after.startsWith('.') && endsSentence(value) ? after.slice(1) : after
}

/**
 * A fact inside running text: its value, or <Pending> (inline, or block for a slot on its own line). `unit` is the
 * word a count is given in (« chaînes »), joined to it by a no-break space as copy writes it (GLOSSARY §9), so a
 * line never ends on the number. `tail` is the punctuation right after (« . », « , »). Both stay with the marker
 * while the fact is pending. `figure` sets a count in the display face (money utility): statistics never take the
 * text face's slashed zero.
 *
 * Launch mode (APPROVAL §2c): a missing optional fact renders nothing here, unit and punctuation included. The row
 * or sentence around it is taken out by its caller (<FactScope>, scoped()), which names the same key.
 */
export function Fact({
  value,
  what,
  fact,
  block,
  unit,
  tail,
  figure,
}: {
  value: ReactNode | null | undefined
  what: string
  fact: string
  block?: boolean
  unit?: string
  tail?: string
  figure?: boolean
}) {
  const after = unit ? `${NB}${unit}${tail ?? ''}` : tail
  if (value == null || value === false || value === '') {
    if (!markerShown(fact)) return null
    return (
      <Marked tail={after}>
        <Pending what={what} fact={fact} variant={block ? 'block' : 'inline'} />
      </Marked>
    )
  }
  return (
    <>
      {figure ? <span className="money">{value}</span> : value}
      {closing(value, after)}
    </>
  )
}

/** « WhatsApp » inside a sentence: a link once the number exists (new tab), plain words until then. */
export function WaText({ children = 'WhatsApp' }: { children?: ReactNode }) {
  if (!WHATSAPP_HREF) return <>{children}</>
  return (
    <TextA href={WHATSAPP_HREF} {...WHATSAPP_LINK_PROPS}>
      {children}
      <span className="sr-only"> (nouvel onglet)</span>
    </TextA>
  )
}

/** The support e-mail address inside a sentence: a mailto link, or <Pending> until the owner gives it. */
export function MailText({ tail }: { tail?: string }) {
  const address = FACTS.support.email
  const href = mailtoHref(address)
  if (!address || !href) {
    return (
      <Marked tail={tail}>
        <Pending what="adresse e-mail du support" fact="support.email" />
      </Marked>
    )
  }
  return (
    <>
      <TextA href={href}>{address}</TextA>
      {tail}
    </>
  )
}

/** The WhatsApp number inside a sentence: a link to the chat, or <Pending> until the owner gives it. */
export function WaNumber({ tail }: { tail?: string }) {
  const number = FACTS.support.whatsapp
  if (!number) {
    return (
      <Marked tail={tail}>
        <Pending what="numéro WhatsApp" fact="support.whatsapp" />
      </Marked>
    )
  }
  return (
    <>
      <WaText>{number}</WaText>
      {tail}
    </>
  )
}

/**
 * An action whose target is an owner fact not given yet (the support e-mail…): the kit's pending look, as the
 * WhatsApp button has it. Not a link, never a dead one; carries data-pending for QA. Launch mode: nothing for an
 * optional fact (the caller scopes what surrounds it).
 */
export function PendingAction({ label, fact, icon, className }: { label: ReactNode; fact: string; icon?: string; className?: string }) {
  if (!markerShown(fact)) return null
  // Two units that wrap whole: the icon with its label, then « · À compléter ». Where they do not fit on one line
  // (a phone card) the suffix takes the second line and both lines stay centred, the icon beside its label (a
  // wrapped label block would otherwise take the full width and leave the icon alone at the left edge).
  return (
    <span
      data-pending={fact}
      className={cn(buttonVariants({ variant: 'secondary', size: 'md' }), whatsappPendingClass, 'flex-wrap gap-y-0.5', className)}
    >
      <span className="inline-flex items-center gap-2">
        {icon && <i className={iconClass(icon, cn(buttonIconSize.md, '-ml-1'))} aria-hidden="true" />}
        <span>{label}</span>
      </span>
      <span className="font-mono text-[0.875rem] font-medium">· À compléter</span>
    </span>
  )
}

/**
 * « Écrire sur WhatsApp » as a button: the kit's WhatsAppButton once the number exists; until then PendingAction
 * with the same pending look (same recipe, same data-pending key), so it wraps like the e-mail action beside it.
 */
export function WhatsAppAction({ label, className }: { label: string; className?: string }) {
  if (!WHATSAPP_HREF) return <PendingAction label={label} fact={WHATSAPP_FACT} icon="ti-brand-whatsapp" className={className} />
  return <WhatsAppButton label={label} href={WHATSAPP_HREF} aria-label={WHATSAPP_LABEL} {...WHATSAPP_LINK_PROPS} className={className} />
}

/** « page Aide », « page Applications »… inside a sentence (GLOSSARY §2: the text names the target). */
export function PageLink({ to, children }: { to: string; children: ReactNode }) {
  return <TextLink to={to}>{children}</TextLink>
}

/**
 * The kit's RatingPill for a sourced rating (proof.rating). Below 5/5 (see fullStars) the pill drops its star group,
 * its decorative first child, and keeps the written score.
 */
export function ScorePill({ score, className, children }: { score: number; className?: string; children: ReactNode }) {
  return (
    <RatingPill className={cn(!fullStars(score) && 'pl-3.5 [&>[aria-hidden]:first-child]:hidden', className)}>
      {children}
    </RatingPill>
  )
}

