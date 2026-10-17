// Plain-text forms of owner facts for running text (no JSX): each returns null while the fact is missing, so the
// caller renders <Pending> (or <Fact>) in its place. Formatting comes from src/lib/facts.ts helpers.
import { FACTS, formatCount, formatList, type CheckoutMode } from '@/lib/facts'

/** The mode sentence of copy commande.md for checkout.mode (help, CGV, checkout). */
export const CHECKOUT_MODE_SENTENCE: Record<CheckoutMode, string> = {
  hostedPage: 'Vous payez en ligne, sur la page sécurisée de notre prestataire de paiement.',
  paymentLinks: 'Vous payez en ligne, avec le lien de paiement de votre formule.',
  message: 'Vous envoyez votre commande sur WhatsApp, puis nous vous répondons avec la marche à suivre pour payer.',
  externalShop: 'Vous finalisez votre commande et la payez sur notre boutique en ligne.',
}

export function checkoutModeSentence(): string | null {
  const mode = FACTS.checkout.mode
  return mode ? CHECKOUT_MODE_SENTENCE[mode] : null
}

/** « Carte bancaire et virement » (payment.methods names). */
export function paymentMethodsText(): string | null {
  return formatList(FACTS.payment.methods?.map((m) => m.name))
}

/** « e-mail et WhatsApp » (delivery.channel). */
export function deliveryChannelText(): string | null {
  return formatList(FACTS.delivery.channel)
}

/** « SD, HD et 4K » (quality.levels). */
export function qualityText(): string | null {
  return formatList(FACTS.quality.levels)
}

/** Live channel count, « 12 000 ». */
export function liveCountText(): string | null {
  return formatCount(FACTS.channels.live.count)
}

/** On-demand title count. */
export function vodCountText(): string | null {
  return formatCount(FACTS.vod.count)
}

/** Simultaneous screens in every plan. */
export function screensText(): string | null {
  return formatCount(FACTS.plans.screens.count)
}

/** A missing slot value: null, undefined, '' or a boolean (React renders nothing for `cond && <x />` when cond fails). */
export function isMissing(value: unknown) {
  return value == null || value === '' || typeof value === 'boolean'
}
