// Every purchase, activation, renewal and help button opens WhatsApp with a pre-filled message. The messages are
// the client's and stay in French in every language of the site. Build every WhatsApp link with these helpers:
// never type a wa.me address or a message in a page.

import { FACTS, plan, type PaymentMethod, type PlanId } from './facts.ts'

const GREETING = `Bonjour ${FACTS.brand.seller} (${FACTS.brand.domain})`

/** wa.me link to the client's number, with the message pre-filled (or no message). */
export function waLink(message?: string): string {
  const base = `https://wa.me/${FACTS.whatsapp.number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

const PLAN_NAME: Record<PlanId, string> = {
  premium: 'Premium 1 Écran',
  duo: 'Duo 2 Écrans',
  famille: 'Famille 3 Écrans',
}

/** Brief, pricing cards: « …je souhaite activer le Forfait Premium 1 Écran 12 Mois (40€) ». */
export function planMessage(id: PlanId): string {
  const p = plan(id)
  return `${GREETING}, je souhaite activer le Forfait ${PLAN_NAME[id]} ${p.months} Mois (${p.price}€)`
}

/** Devices of the Boutique configurator, in the brief's order, with the French name the message carries. */
export const ORDER_DEVICES = {
  androidBox: 'TV Box Android',
  samsung: 'Smart TV Samsung',
  lg: 'Smart TV LG',
  firestick: 'Fire TV Stick',
  googleTv: 'Android TV / Google TV',
  apple: 'iPhone / iPad / Apple TV',
  pc: 'PC Windows / Mac',
  formuler: 'Formuler / MAG',
} as const
export type OrderDevice = keyof typeof ORDER_DEVICES

const PAYMENT_NAME: Record<PaymentMethod, string> = {
  sepa: 'Virement Bancaire',
  paypal: 'PayPal',
}

/** Brief, Boutique configurator: the order summary sent on WhatsApp. */
export function orderMessage(order: { plan: PlanId; device: OrderDevice; payment: PaymentMethod }): string {
  const p = plan(order.plan)
  const codes = p.screens === 1 ? '1 Code' : `${p.screens} Codes`
  return [
    `${GREETING}, je souhaite commander :`,
    `• Offre : ${codes} (${p.price}€) pour ${p.months} mois`,
    `• Mon appareil : ${ORDER_DEVICES[order.device]}`,
    `• Mode de paiement choisi : ${PAYMENT_NAME[order.payment]}`,
    `Merci de m'envoyer les informations pour finaliser l'activation !`,
  ].join('\n')
}

/** Brief, Revendeur cards. */
export function resellerMessage(codes: number): string {
  return `Bonjour l'équipe ${FACTS.brand.seller}, je souhaite devenir revendeur et je voudrais obtenir un Panel Atlas Pro de ${codes} Codes. Quels sont les détails pour commencer ?`
}

// The brief gives no message for the buttons below; these follow the pattern of its plan messages.

/** Renewal buttons (« Renouvellement ici (Saisir votre Code Atlas Pro) »). */
export function renewalMessage(): string {
  return `${GREETING}, je souhaite renouveler mon Code Atlas Pro pour 12 mois. Mon code ou identifiant actuel : `
}

/** Hero button « Activer mon Code Atlas Pro Officiel » and other non-plan buy buttons. */
export function activateMessage(): string {
  return `${GREETING}, je souhaite activer mon Code Atlas Pro officiel. Pouvez-vous m'indiquer les forfaits disponibles ?`
}

/** Installation help (hub banner, device guides). */
export function helpMessage(): string {
  return `${GREETING}, j'ai besoin d'aide pour installer mon abonnement Atlas Pro sur mon appareil : `
}

/** Header button, floating button, contact page. */
export function contactMessage(): string {
  return `${GREETING}, j'ai une question au sujet de mon abonnement Atlas Pro.`
}
