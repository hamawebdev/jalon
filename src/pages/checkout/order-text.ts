// The order as text (copy commande.md › checkout-confirmation): the prefilled WhatsApp message (the customer's
// words) and the order details the form service receives before a hand-off (what the owner reads). Both list the
// same values: one per field the form showed and the buyer filled, in the form's order.
import { cartTotal, formatEuro, type CartItem } from '@/components/site/chrome-context'
import { FACTS, present } from '@/lib/facts'
import { pendingText } from '@/lib/site'
import { checkoutFields, countries, deviceOptions, type FieldId } from './fields'
import type { LinkMode } from './handoff'
import type { Draft } from './order'

const NB = ' '

/** The values of one order, as the buyer gave them; '' for a field the form did not show or the buyer left empty. */
function orderValues(items: readonly CartItem[], draft: Draft) {
  // Only the fields of this order's form: a value typed for another cart (a renewal identifier) stays out.
  const shown = new Set(checkoutFields(items.some((i) => i.kind === 'renew')).map((d) => d.id))
  const v = (id: FieldId) => (shown.has(id) ? (draft.values[id] ?? '').trim() : '')
  const option = deviceOptions().find((o) => o.value === v('device'))
  const model = v('device_model')
  // The payment choice is a field of the form only while the owner lists the methods.
  const method = present(FACTS.payment.methods) && FACTS.payment.methods.some((m) => m.name === draft.method) ? draft.method : ''
  return {
    lines: items.map((i) => i.name).join(', '),
    // A total that cannot be stated: the literal of the missing price (a required fact keeps it), or no total at
    // all when that price is an optional fact on the published site (pendingText() is then empty).
    total: formatEuro(cartTotal(items)) ?? pendingText('prix', items.find((i) => i.price == null)?.priceFact),
    renewalId: v('renewal_id'),
    name: [v('first_name'), v('last_name')].filter(Boolean).join(' '),
    email: v('email'),
    phone: v('phone'),
    country: countries().find((c) => c.code === v('country'))?.name ?? v('country'),
    device: option && option.value !== 'autre' ? (model ? `${option.label} (${model})` : option.label) : model || (option?.label ?? ''),
    mac: v('mac_address'),
    address: [v('address_1'), v('address_2'), [v('postcode'), v('city')].filter(Boolean).join(' ')].filter(Boolean).join(', '),
    method,
    notes: draft.notes.trim(),
  }
}

/** The buyer's e-mail, as the order sends it ('' when the form did not ask for it): {email} of a hand-off address. */
export function orderEmail(items: readonly CartItem[], draft: Draft): string {
  return orderValues(items, draft).email
}

/**
 * The prefilled order message (the customer's words): the order line, then one « Libellé : valeur » line per field
 * the form showed and the buyer filled, in the form's order. A renewal names the subscription to extend first; the
 * free-text note comes last, so nothing it says reads as another field. No full stop after a value: the owner
 * copies an identifier, an address or a MAC address as it stands. `ref`: the order reference of a link mode whose
 * send failed, as the second line.
 */
export function orderMessage(items: readonly CartItem[], draft: Draft, ref?: string): string {
  const o = orderValues(items, draft)
  const line = (label: string, value: string | undefined) => (value ? `${label}${NB}: ${value}` : '')
  return [
    `Bonjour, je souhaite commander${NB}: ${o.lines}.`,
    line('Référence', ref),
    line('Identifiant de mon abonnement actuel', o.renewalId),
    line('Total', o.total),
    line('Nom', o.name),
    line('E-mail', o.email),
    line('Téléphone', o.phone),
    line('Pays', o.country),
    line('Appareil', o.device),
    line('Adresse MAC', o.mac),
    line('Adresse', o.address),
    line('Moyen de paiement', o.method),
    line('Précision', o.notes),
  ]
    .filter(Boolean)
    .join('\n')
}

/** How the order is paid, in the order details (« Paiement : … »). */
const PAYMENT_WORDS: Record<LinkMode, string> = {
  paymentLinks: 'lien de paiement',
  hostedPage: 'page de paiement',
  externalShop: 'boutique en ligne',
}

/**
 * The order details sent to the form service before the hand-off: what the owner receives. The visible names are
 * copy's labels; the e-mail field keeps the name `email`, so the service can reply to it (as with the contact
 * forms). `_subject` is the subject key of the common form services (Formspree, FormSubmit, Basin); a service that
 * does not read it shows it as one more line. The two consent lines record the boxes ticked.
 */
export function orderDetails(items: readonly CartItem[], draft: Draft, ref: string, mode: LinkMode): FormData {
  const o = orderValues(items, draft)
  const data = new FormData()
  const add = (name: string, value: string) => {
    if (value) data.append(name, value)
  }
  add('_subject', `Commande ${ref}${NB}: ${o.lines}`)
  add('Référence', ref)
  add('Commande', o.lines)
  add('Total', o.total)
  add('Paiement', PAYMENT_WORDS[mode])
  add('Identifiant de l’abonnement à renouveler', o.renewalId)
  add('Nom', o.name)
  add('email', o.email)
  add('Téléphone', o.phone)
  add('Pays', o.country)
  add('Appareil', o.device)
  add('Adresse MAC', o.mac)
  add('Adresse', o.address)
  add('Moyen de paiement', o.method)
  add('Précision', o.notes)
  add('Conditions générales de vente acceptées', draft.cgv ? 'oui' : 'non')
  add('Démarrage immédiat demandé, avec perte du droit de rétractation reconnue', draft.immediate ? 'oui' : 'non')
  return data
}
