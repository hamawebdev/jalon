import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { Section } from '@/components/brand'
import { useChrome, type CartItem } from '@/components/site/chrome-context'
import { setPageTitle } from '@/components/site/page-meta'
import { FACTS, isOrderReference, orderReference, type CheckoutMode } from '@/lib/facts'
import { CheckoutForm, type SendFailure } from './checkout/CheckoutForm'
import { EmptyCart } from './checkout/EmptyCart'
import { handoffAddress, handsOff, linkMode, sendOrder, type LinkMode } from './checkout/handoff'
import { EMPTY_DRAFT, type Draft } from './checkout/order'
import { orderDetails, orderEmail } from './checkout/order-text'
import { HandoffStarted, MessageReady, PaymentNotice, PendingFinalize, type PaymentResult } from './checkout/States'

type Stage = 'form' | 'pending' | 'message' | 'handoff'

/** An order handed over: what was ordered, its reference, the address it opens and the mode. */
type HandedOver = { items: CartItem[]; reference: string; href: string; mode: LinkMode }

/** Where the history entry of /commande/ keeps a handed-over order (react-router stores it in history.state). */
const KEPT = 'handedOver'

/** A cart line as Checkout wrote it into the history entry. */
function isCartLine(line: unknown): line is CartItem {
  if (line == null || typeof line !== 'object') return false
  const l = line as Record<string, unknown>
  return typeof l.id === 'string' && typeof l.name === 'string' && (l.price === null || typeof l.price === 'number') && typeof l.qty === 'number'
}

/**
 * The handed-over order this history entry keeps, or null. Back from the payment page, or a reload, finds it when the
 * browser did not keep the page itself (APPROVAL §2e, HC-04: the state comes back with its reference). Read field by
 * field: an entry written by another version of the page may hold anything.
 */
function keptHandoff(state: unknown): HandedOver | null {
  const kept: unknown = state != null && typeof state === 'object' ? (state as Record<string, unknown>)[KEPT] : null
  if (kept == null || typeof kept !== 'object') return null
  const { items, reference, href, mode } = kept as Record<string, unknown>
  const link = typeof mode === 'string' ? linkMode(mode as CheckoutMode) : null
  if (!link || typeof reference !== 'string' || !isOrderReference(reference)) return null
  if (typeof href !== 'string' || !/^https:\/\//i.test(href)) return null
  if (!Array.isArray(items) || items.length === 0 || !items.every(isCartLine)) return null
  return { items, reference, href, mode: link }
}

const RESULTS: PaymentResult[] = ['refuse', 'annule', 'inconnu']

/** The cart lines, as the order a reference belongs to. */
const orderKey = (items: readonly CartItem[]) => items.map((i) => `${i.id}×${i.qty}`).join('|')

// /commande/ (copy commande.md, INVENTORY §4.10): the empty cart, the form, then the state the submit leads to.
// No yellow anywhere here. Nothing claims a payment. While checkout.mode is unknown (today) the last step explains
// how the order will be completed; with the « message » mode the order goes out on WhatsApp; in a link mode
// (paymentLinks, externalShop, hostedPage: APPROVAL §2e) the order and its reference first go to the form service,
// then the hand-off state gives the reference and the button to the hand-off address (nothing opens by itself), and
// a failed send stays on the form with WhatsApp as the way out.
// The confirmed and payment-awaited states need the payment provider's verified answer and are not built yet
// (APPROVAL §2.3, §2.6).
export default function Checkout() {
  const { cartItems, clearCart } = useChrome()
  const location = useLocation()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  // A hand-off this history entry keeps (Back from the payment page, a reload) opens on its state again.
  const [handedOver, setHandedOver] = useState<HandedOver | null>(() => keptHandoff(location.state))
  const [stage, setStage] = useState<Stage>(() => (handedOver ? 'handoff' : 'form'))
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT)
  const [sentItems, setSentItems] = useState<CartItem[]>([])
  // One reference per order, kept while the buyer retries the same order (the same cart lines).
  const [order, setOrder] = useState<{ key: string; reference: string } | null>(null)
  const [sending, setSending] = useState(false)
  const [failure, setFailure] = useState<SendFailure | null>(null)
  const mounted = useRef(true)
  // A send in flight (a second submit in the same frame finds it), and the failed sends so far (each one announced).
  const busy = useRef(false)
  const failures = useRef(0)
  const raw = params.get('paiement')
  const result = RESULTS.find((r) => r === raw) ?? null
  const empty = cartItems.length === 0 && stage !== 'message' && stage !== 'handoff'
  const handoff = handsOff(cartItems) ? linkMode() : null
  // A failed send is shown while the cart is still the order it was for.
  const shownFailure = failure && order && failure.reference === order.reference && order.key === orderKey(cartItems) ? failure : null

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  // Title per state (meta.md › chrome-meta): the layout sets « Commande », the state refines it.
  useEffect(() => {
    if (stage === 'message') setPageTitle('Commande à envoyer')
    else if (stage === 'handoff') setPageTitle('Commande à payer')
    else if (empty) setPageTitle(result ? 'Paiement non abouti' : 'Panier vide')
    else if (stage === 'pending') setPageTitle('Commande à finaliser')
    else if (result) setPageTitle('Paiement non abouti')
    else setPageTitle('Commande')
  }, [stage, empty, result])

  const submit = async (d: Draft) => {
    if (busy.current) return
    setDraft(d)
    if (FACTS.checkout.mode === 'message') {
      setSentItems(cartItems)
      setStage('message')
      window.scrollTo(0, 0)
      return
    }
    // No hand-off for this cart (no mode yet: today; no address for its line, no form service, several lines):
    // the pending-mode state, where nothing is sent.
    const toPending = () => {
      setStage('pending')
      window.scrollTo(0, 0)
    }
    const mode = linkMode()
    const endpoint = FACTS.contact.formEndpoint
    if (!mode || !endpoint || !handsOff(cartItems)) return toPending()
    const key = orderKey(cartItems)
    const reference = order?.key === key ? order.reference : orderReference()
    const href = handoffAddress(cartItems, reference, orderEmail(cartItems, d))
    if (!href) return toPending()
    setOrder({ key, reference })
    setFailure(null)
    setSending(true)
    busy.current = true
    const ok = await sendOrder(endpoint, orderDetails(cartItems, d, reference, mode))
    busy.current = false
    if (!mounted.current) return
    setSending(false)
    if (!ok) {
      failures.current += 1
      setFailure({ reference, attempt: failures.current })
      return
    }
    // The order reached the owner: the hand-off state, where the buyer opens the address (HandoffStarted). The cart
    // is done with. The state is also written into this history entry, so Back from the payment page or a reload
    // shows it again, with its reference, even when the browser has not kept the page.
    const handed: HandedOver = { items: cartItems, reference, href, mode }
    setHandedOver(handed)
    setOrder(null)
    setStage('handoff')
    clearCart()
    navigate({ pathname: location.pathname, search: location.search, hash: location.hash }, { replace: true, state: { [KEPT]: handed } })
    window.scrollTo(0, 0)
  }

  const retry = () => {
    params.delete('paiement')
    setParams(params, { replace: true })
  }

  return (
    <Section zone="paper" dataSection="checkout" rhythm={empty ? 'section' : 'none'} className={empty ? undefined : 'pt-section-sm pb-hero'}>
      {stage === 'message' ? (
        <MessageReady items={sentItems} draft={draft} onSent={clearCart} />
      ) : stage === 'handoff' && handedOver ? (
        <HandoffStarted items={handedOver.items} reference={handedOver.reference} href={handedOver.href} mode={handedOver.mode} />
      ) : empty ? (
        <>
          {/* A return from the payment page reloads the site, so the in-memory cart is empty: the notice still
              says what happened, without a retry button. */}
          {result && (
            <div className="mx-auto max-w-[560px]">
              <PaymentNotice result={result} />
            </div>
          )}
          <div data-section="checkout-empty">
            <EmptyCart />
          </div>
        </>
      ) : stage === 'pending' ? (
        <PendingFinalize items={cartItems} onEdit={() => setStage('form')} />
      ) : (
        <>
          {result && <PaymentNotice result={result} onRetry={retry} />}
          <CheckoutForm
            items={cartItems}
            draft={draft}
            onSubmit={(d) => void submit(d)}
            handoff={handoff}
            sending={sending}
            failure={shownFailure}
          />
        </>
      )}
    </Section>
  )
}
