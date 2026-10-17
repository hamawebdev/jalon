// The order hand-off of /commande/ (APPROVAL §2e, QA LT-01; copy commande.md › checkout-consent and
// checkout-confirmation). In the modes paymentLinks, externalShop and hostedPage a valid submit first sends the
// order, with its reference, to the form service (contact.formEndpoint), then takes the buyer to the hand-off
// address of the order's line (facts.ts handoffFor()). Logic only, no component.
//
// One order is one line: the buy buttons replace the cart with the line they sell (chrome orderPlan), and a payment
// link, a shop page or a payment page is made for one item. A cart that holds several lines is not handed over:
// the form asks to keep one (CheckoutForm), and its submit leads to the pending-mode state, where nothing is sent.
// Nothing here can know whether the buyer then pays, and nothing says so.
import { PACK_LINE_ID, cartTotal, type CartItem } from '@/components/site/chrome-context'
import { FACTS, answered, handoffFor, hasHandoff, type CheckoutMode, type HandoffItem, type HandoffLine } from '@/lib/facts'

/** The modes that hand an order over to an address: a payment link, the shop, a payment page. */
export type LinkMode = Exclude<CheckoutMode, 'message'>

/** checkout.mode when it is a link mode, else null (the message mode, or no mode yet: today). */
export function linkMode(mode: CheckoutMode | null = FACTS.checkout.mode): LinkMode | null {
  return mode === 'hostedPage' || mode === 'paymentLinks' || mode === 'externalShop' ? mode : null
}

/**
 * What a cart line is handed over as (copy commande.md › checkout-consent): a plan line as its plan (found by its
 * months) with its screen count, a renewal line as « renewal » with its months, the pack as « resellerPack ». A trial
 * line, or a plan the lineup does not hold, has no hand-off.
 */
export function handoffTarget(line: CartItem): { item: HandoffItem; line: HandoffLine } | null {
  if (line.id === PACK_LINE_ID) return { item: 'resellerPack', line: {} }
  if (line.kind === 'trial') return null
  if (line.kind === 'renew') return line.months == null ? null : { item: 'renewal', line: { months: line.months } }
  const plan = FACTS.plans.list.find((p) => p.months === line.months)
  return plan ? { item: plan.id, line: { months: plan.months, screens: line.screens ?? null } } : null
}

/**
 * The address this cart is handed over to, for this reference and buyer e-mail, its markers filled: only for a
 * cart of one line, in a link mode, with the form service set (the order must reach the owner before the buyer is
 * sent to pay). null: no hand-off for this cart.
 */
export function handoffAddress(items: readonly CartItem[], ref: string, email?: string | null): string | null {
  if (linkMode() == null || !FACTS.contact.formEndpoint || items.length !== 1) return null
  const target = handoffTarget(items[0])
  if (!target) return null
  return handoffFor(target.item, { ...target.line, ref, amount: cartTotal(items), email: email ?? null })
}

/** Fills an address only to see that it can be filled: never shown, never sent. */
const PROBE_REF = 'PROBE'

/**
 * The submit hands this cart over: it reads « Payer ma commande » (« Continuer vers le paiement » for the shop)
 * only then. Stricter than hasHandoff() alone: the address must also be fillable for this line (an {amount} needs
 * the price) and the form service must be set.
 */
export function handsOff(items: readonly CartItem[]): boolean {
  return handoffAddress(items, PROBE_REF) != null
}

/**
 * Review markers for a one-line cart in a link mode that cannot be handed over (copy commande.md: the pending-mode
 * sentence may carry them): the hand-off address of the mode when it is not given at all, the form service when it
 * is not set. Both are required facts in that mode, so launch mode keeps their markers too, and launch-check lists
 * them. An address that is given but cannot serve the line gets no marker: launch-check names what is wrong with it.
 */
export function handoffGaps(items: readonly CartItem[]): { what: string; fact: string }[] {
  const mode = linkMode()
  if (mode == null || items.length !== 1) return []
  const target = handoffTarget(items[0])
  if (!target) return []
  const checkout = FACTS.checkout
  const gaps: { what: string; fact: string }[] = []
  if (!hasHandoff(target.item, target.line)) {
    if (mode === 'paymentLinks') {
      if (!answered(checkout.paymentLinks?.[target.item])) gaps.push({ what: 'lien de paiement', fact: `checkout.paymentLinks.${target.item}` })
    } else if (mode === 'externalShop') {
      if (!answered(checkout.shopUrl) && !answered(checkout.shopLinks?.[target.item])) gaps.push({ what: 'adresse de la boutique', fact: 'checkout.shopUrl' })
    } else if (!answered(checkout.hostedUrl)) {
      gaps.push({ what: 'adresse de la page de paiement', fact: 'checkout.hostedUrl' })
    }
  }
  if (!FACTS.contact.formEndpoint) gaps.push({ what: 'envoi du formulaire', fact: 'contact.formEndpoint' })
  return gaps
}

/** How long the form service may take to answer before the send counts as failed (no navigation then). */
export const SEND_TIMEOUT_MS = 15000

/** A 2xx answer that still says the message was not taken: some services answer 200 with success: false. */
function refused(answer: unknown): boolean {
  if (answer == null || typeof answer !== 'object') return false
  const a = answer as Record<string, unknown>
  return a.ok === false || a.success === false || a.success === 'false' || (typeof a.error === 'string' && a.error !== '')
}

/**
 * Sends the order details to the form service, as the contact forms do (POST, form data, Accept: application/json).
 * true only on a 2xx answer that does not say otherwise; false on an error status, a refusal, a network failure or
 * no answer within SEND_TIMEOUT_MS. A false never means the order is lost for sure: the buyer is then offered
 * WhatsApp with the same reference.
 */
export async function sendOrder(endpoint: string, body: FormData, timeout = SEND_TIMEOUT_MS): Promise<boolean> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(endpoint, { method: 'POST', body, headers: { Accept: 'application/json' }, signal: controller.signal })
    if (!res.ok) return false
    if (!(res.headers.get('content-type') ?? '').includes('json')) return true
    const answer: unknown = await res.json().catch(() => null)
    return !refused(answer)
  } catch {
    return false
  } finally {
    window.clearTimeout(timer)
  }
}
