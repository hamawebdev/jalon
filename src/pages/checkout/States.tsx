import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Button, ButtonA, Notice, OrderSummary, Pending, WhatsAppButton } from '@/components/brand'
import type { CartItem } from '@/components/site/chrome-context'
import { whatsappButtonProps } from '@/lib/site'
import { FACTS, whatsappHref } from '@/lib/facts'
import { checkoutModeSentence, deliveryChannelText } from '../theme/facts-text'
import { Email, Fact, WaNumber } from '../theme/facts-ui'
import { handoffGaps, type LinkMode } from './handoff'
import { summaryProps, type Draft } from './order'
import { orderMessage } from './order-text'
import { CheckoutSteps } from './Steps'

/** « Une question ? Écrivez-nous sur WhatsApp (…) ou par e-mail (…). » */
function AskLine() {
  return (
    <p className="font-sans text-small text-ink-soft">
      Une question&nbsp;? Écrivez-nous sur WhatsApp <WaNumber lead="(" tail=")" /> ou par e-mail <Email lead="(" tail=")." />
    </p>
  )
}

/** State layout: steps, the message on the left, the order summary on the right. */
function StateLayout({ step, children, items }: { step: 2 | 3; children: ReactNode; items: CartItem[] }) {
  const { lines, total } = summaryProps(items)
  const heading = useRef<HTMLDivElement>(null)
  // The page changed under the buyer's eyes: move focus to the new heading.
  useEffect(() => {
    heading.current?.querySelector('h1')?.focus()
  }, [])
  return (
    <div data-section="checkout-confirmation">
      <CheckoutSteps current={step} />
      <div className="mt-10 grid grid-cols-1 items-start gap-x-grid gap-y-10 lg:grid-cols-12">
        <div ref={heading} className="grid gap-5 lg:col-span-7 [&_h1]:outline-none">
          {children}
        </div>
        <div data-section="checkout-summary" className="lg:col-span-5">
          <OrderSummary title="Récapitulatif" lines={lines} total={total} sticky={false} className="md:p-8" />
        </div>
      </div>
    </div>
  )
}

/**
 * After a valid submit while checkout.mode is unknown (today), or in a link mode while the order cannot be handed
 * over (no hand-off address for its line, no form service, several lines): how the order will be completed. This is
 * not a confirmation: nothing is sent, recorded or charged. In a link mode the sentence carries the marker of what
 * the hand-off still needs (copy commande.md › checkout-consent).
 */
export function PendingFinalize({ items, onEdit }: { items: CartItem[]; onEdit: () => void }) {
  const gaps = handoffGaps(items)
  return (
    <StateLayout step={2} items={items}>
      <h1 tabIndex={-1} className="font-display text-display-md text-ink">
        Dernière étape&nbsp;: finaliser votre commande
      </h1>
      <p className="font-sans text-lead text-ink-soft">
        <Fact value={checkoutModeSentence()} what="comment la commande est finalisée et payée" fact="checkout.mode" />
        {gaps.map((g) => (
          <span key={g.fact}>
            {' '}
            <Pending what={g.what} fact={g.fact} />
          </span>
        ))}
      </p>
      <Notice tone="info">Votre commande n’est pas encore enregistrée et rien n’a été débité.</Notice>
      <AskLine />
      <div>
        <Button variant="secondary" size="lg" iconStart="ti-arrow-left" onClick={onEdit} className="max-sm:w-full">
          Modifier ma commande
        </Button>
      </div>
    </StateLayout>
  )
}

/** checkout.mode = message, after « Envoyer ma commande »: WhatsApp opens with the order summary. */
export function MessageReady({ items, draft, onSent }: { items: CartItem[]; draft: Draft; onSent: () => void }) {
  const href = whatsappHref(orderMessage(items, draft))
  return (
    <StateLayout step={3} items={items}>
      <h1 tabIndex={-1} className="font-display text-display-md text-ink">
        Votre message de commande est prêt.
      </h1>
      <p className="font-sans text-lead text-ink-soft">
        WhatsApp s’ouvre avec le récapitulatif de votre commande&nbsp;: il vous reste à envoyer le message. Nous vous répondons ensuite avec la
        marche à suivre pour payer.
      </p>
      <div>
        <WhatsAppButton {...whatsappButtonProps(href, 'Ouvrir WhatsApp')} size="lg" onClick={onSent} className="max-sm:w-full" />
      </div>
    </StateLayout>
  )
}

/**
 * The hand-off words (copy commande.md › checkout-confirmation, QA HC-04b) that differ for the payment page
 * (hostedPage, paymentLinks) and the shop (externalShop).
 */
const HANDOFF_TEXT = {
  page: {
    h1: 'Dernière étape\u00a0: payer votre commande',
    lead: 'Votre commande nous est parvenue. Gardez sa référence, puis ouvrez la page de paiement.',
    copyIt: 'Si la page de paiement vous propose un champ pour une référence ou un message, recopiez-y cette référence.',
    open: 'Ouvrir la page de paiement',
  },
  shop: {
    h1: 'Dernière étape\u00a0: payer votre commande',
    lead: 'Votre commande nous est parvenue. Gardez sa référence, puis ouvrez notre boutique en ligne.',
    copyIt: 'Si notre boutique vous propose un champ pour une référence ou un message, recopiez-y cette référence.',
    open: 'Ouvrir la boutique',
  },
} as const

/** Shown and said when the browser refuses the clipboard; the reference is then selected. */
const NO_COPY = 'La copie n’a pas fonctionné. La référence est sélectionnée\u00a0: copiez-la ou notez-la.'

/** How long « Référence copiée » stays on the button after a copy. */
const COPIED_MS = 3000

/** Puts the text on the clipboard; false when the browser refuses (no clipboard access, a page served without https). */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (!navigator.clipboard?.writeText) return false
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/** Selects the text of a node, as a drag over it would: ready to be copied by hand. Focus stays where it is. */
function selectContents(node: Node | null) {
  const selection = window.getSelection()
  if (!node || !selection) return
  const range = document.createRange()
  range.selectNodeContents(node)
  selection.removeAllRanges()
  selection.addRange(range)
}

/**
 * The order reference set apart, in mono and selectable as one word (it is read out or copied as it stands), with a
 * button that copies it (APPROVAL §2e, HC-04). After a copy the button says so for a moment, and screen readers hear
 * it from the polite status. When the browser refuses the clipboard, the reference is selected instead and one line
 * says so. Each press counts (`n`): it restarts the moment, and every other one ends the status with a no-break
 * space, so a second press is announced again although its words are the same.
 */
function OrderReference({ reference }: { reference: string }) {
  const code = useRef<HTMLSpanElement>(null)
  const presses = useRef(0)
  const [result, setResult] = useState<{ kind: 'copied' | 'selected'; n: number } | null>(null)
  useEffect(() => {
    if (result?.kind !== 'copied') return
    const timer = window.setTimeout(() => setResult(null), COPIED_MS)
    return () => window.clearTimeout(timer)
  }, [result])
  const copy = async () => {
    const n = ++presses.current
    if (await copyToClipboard(reference)) {
      setResult({ kind: 'copied', n })
      return
    }
    selectContents(code.current)
    setResult({ kind: 'selected', n })
  }
  const copied = result?.kind === 'copied'
  const said = result == null ? '' : `${copied ? 'Référence copiée.' : NO_COPY}${result.n % 2 === 0 ? '\u00a0' : ''}`
  return (
    <div
      data-part="order-reference"
      className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 rounded-inner border border-hairline bg-plate px-4 py-3"
    >
      <p className="font-sans text-copy font-semibold text-ink">
        Référence de commande&nbsp;:{' '}
        <span ref={code} data-part="order-reference-code" className="font-mono font-medium tracking-[0.04em] whitespace-nowrap select-all">
          {reference}
        </span>
      </p>
      <Button variant="secondary" size="sm" iconStart={copied ? 'ti-check' : undefined} onClick={() => void copy()} className="max-sm:w-full">
        {copied ? 'Référence copiée' : 'Copier la référence'}
      </Button>
      {result?.kind === 'selected' && <p className="basis-full font-sans text-small text-ink-body">{NO_COPY}</p>}
      <p className="sr-only" role="status" aria-live="polite">
        {said}
      </p>
    </div>
  )
}

/**
 * A link mode, once the order has reached the form service (APPROVAL §2e): the reference of the order, with a copy
 * button, and the button that opens the hand-off address in this tab. Nothing opens by itself, whatever the address
 * (lead, HC-04): the buyer opens it once the reference is noted. The address carries the reference when it holds
 * {ref}; otherwise the copy-it line asks the buyer to give it on the payment page. « nous est parvenue » says only
 * that the form service took the order: nothing here says or suggests that the order is paid. Step 2 stays current.
 * Back from the payment page, or a reload, shows this state again (Checkout keeps it in the history entry).
 */
export function HandoffStarted({ items, reference, href, mode }: { items: CartItem[]; reference: string; href: string; mode: LinkMode }) {
  const text = HANDOFF_TEXT[mode === 'externalShop' ? 'shop' : 'page']
  const carriesRef = href.includes(encodeURIComponent(reference))
  const after = useId()
  return (
    <StateLayout step={2} items={items}>
      <h1 tabIndex={-1} className="font-display text-display-md text-ink">
        {text.h1}
      </h1>
      <p className="font-sans text-lead text-ink-soft">{text.lead}</p>
      <div className="grid gap-3">
        <OrderReference reference={reference} />
        <p className="font-sans text-small text-ink-body">Cette référence relie votre paiement à votre commande. Si vous nous écrivez, indiquez-la.</p>
        {!carriesRef && <p className="font-sans text-small text-ink-body">{text.copyIt}</p>}
      </div>
      <div className="grid gap-3">
        <div>
          <ButtonA href={href} size="lg" iconEnd="arrow" data-part="handoff-open" className="max-sm:w-full">
            {text.open}
          </ButtonA>
        </div>
        {/* Back from the payment page shows this state again: a buyer who has paid must not read it as a second call to pay. */}
        <p className="font-sans text-small text-ink-soft">Une fois votre paiement fait, vous n’avez pas à revenir sur cette page.</p>
      </div>
      <section aria-labelledby={after} className="grid gap-2 font-sans text-small text-ink-body">
        <h2 id={after} className="font-display text-title text-ink">
          Après le paiement
        </h2>
        <p>
          Dès que votre paiement nous est confirmé, nous préparons vos accès. Délai d’activation&nbsp;:{' '}
          <Fact value={FACTS.delivery.delay} what="délai d’activation" fact="delivery.delay" tail="." /> Vos accès arrivent par{' '}
          <Fact value={deliveryChannelText()} what="canal d’envoi" fact="delivery.channel" tail="." />
        </p>
        <p>Sans paiement, rien n’est débité et votre commande n’est pas validée.</p>
      </section>
      <AskLine />
    </StateLayout>
  )
}

export type PaymentResult = 'refuse' | 'annule' | 'inconnu'

/**
 * Notice shown above the form after a return from the payment page (?paiement=refuse|annule|inconnu, set by the
 * provider's return URL once one exists). Never claims that money was taken; focus moves to it. `onRetry` is left
 * out when the cart is empty (a return from the provider reloads the page and the cart lives in memory only): the
 * notice then keeps its message and the WhatsApp contact, and the empty-cart block below offers the way back to
 * the plans.
 */
export function PaymentNotice({ result, onRetry }: { result: PaymentResult; onRetry?: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current?.focus()
  }, [result])
  const wa = <WhatsAppButton {...whatsappButtonProps()} size="md" />
  const body: Record<PaymentResult, { title: string; text: string; actions: ReactNode }> = {
    refuse: {
      title: 'Le paiement n’est pas passé',
      text: 'Rien n’a été débité. Vous pouvez réessayer, payer autrement ou nous écrire sur WhatsApp.',
      actions: (
        <>
          {onRetry && (
            <Button size="md" onClick={onRetry}>
              Réessayer mon paiement
            </Button>
          )}
          {wa}
        </>
      ),
    },
    annule: {
      title: 'Paiement annulé',
      text: 'Rien n’a été débité. Vous pouvez reprendre quand vous voulez.',
      actions: onRetry ? (
        <Button size="md" onClick={onRetry}>
          Reprendre mon paiement
        </Button>
      ) : null,
    },
    inconnu: {
      title: 'Nous n’avons pas pu confirmer votre paiement',
      text: 'Avant de payer à nouveau, regardez si un débit apparaît sur votre compte, puis écrivez-nous : on vérifie avec vous, pour éviter un double paiement.',
      actions: wa,
    },
  }
  const b = body[result]
  return (
    <div ref={ref} tabIndex={-1} className="mb-8 outline-none">
      <Notice tone="error" role="alert">
        <p className="font-semibold">{b.title}</p>
        <p className="mt-1">{b.text}</p>
        {b.actions && <div className="mt-4 flex flex-wrap gap-3">{b.actions}</div>}
      </Notice>
    </div>
  )
}
