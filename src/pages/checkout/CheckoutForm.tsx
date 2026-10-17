import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import {
  Button,
  Checkbox,
  FormCard,
  Input,
  Notice,
  OrderSummary,
  Pending,
  RadioCard,
  Select,
  Textarea,
  TextLink,
  WhatsAppButton,
  inScope,
  noticeClass,
  slotShown,
} from '@/components/brand'
import { cn } from '@/lib/utils'
import { useChrome, type CartItem } from '@/components/site/chrome-context'
import { FACTS, present, whatsappHref } from '@/lib/facts'
import { whatsappButtonProps } from '@/lib/site'
import { checkoutModeSentence, deliveryChannelText } from '../theme/facts-text'
import { Fact, WaNumber } from '../theme/facts-ui'
import { checkoutFields, countries, deviceOptions, fieldError, type FieldDef, type FieldId, type Values } from './fields'
import { linkMode, type LinkMode } from './handoff'
import { changeLink, summaryProps, type Draft } from './order'
import { orderMessage } from './order-text'
import { CheckoutSteps } from './Steps'

/**
 * Submit label (copy commande.md › checkout-consent): « Envoyer ma commande » in the message mode; in a link mode
 * « Payer ma commande » (« Continuer vers le paiement » for the shop) only while the cart is handed over; otherwise,
 * and while checkout.mode is unknown (today), « Finaliser ma commande », which leads to the pending-mode state.
 */
function submitLabel(handoff: LinkMode | null): string {
  if (FACTS.checkout.mode === 'message') return 'Envoyer ma commande'
  if (handoff === 'externalShop') return 'Continuer vers le paiement'
  return handoff ? 'Payer ma commande' : 'Finaliser ma commande'
}

type ConsentErrors = { cgv?: string; immediate?: string }

/** A send to the form service that failed (link modes): its reference, and which attempt, so each one is announced. */
export type SendFailure = { reference: string; attempt: number }

type CheckoutFormProps = {
  items: CartItem[]
  draft: Draft
  onSubmit: (d: Draft) => void
  /** The link mode the submit hands this cart over in, or null (no hand-off: message mode, pending, several lines). */
  handoff: LinkMode | null
  /** The order is being sent to the form service: the submit keeps its label, with a spinner and aria-busy. */
  sending: boolean
  /** The last send failed: the notice above the submit, with WhatsApp and the same reference. */
  failure: SendFailure | null
}

// /commande/: the form state. The buyer's details on the left (checkout-details, checkout-notes); on the right
// the order summary with the payment step and the consents (checkout-summary, -payment, -consent). Nothing is
// charged here: what the submit does follows checkout.mode and the hand-off (APPROVAL §2e), and never claims a
// payment (APPROVAL §2.6).
export function CheckoutForm({ items, draft, onSubmit, handoff, sending, failure }: CheckoutFormProps) {
  const { setCartOpen } = useChrome()
  const renewal = items.some((i) => i.kind === 'renew')
  const defs = checkoutFields(renewal)
  const [values, setValues] = useState<Values>(draft.values)
  const [notes, setNotes] = useState(draft.notes)
  // The optional note stays folded behind its link until the buyer asks for it (or comes back with one written).
  const [notesOpen, setNotesOpen] = useState(draft.notes !== '')
  const notesAsked = useRef(false)
  const [method, setMethod] = useState(draft.method)
  const [cgv, setCgv] = useState(draft.cgv)
  const [immediate, setImmediateStart] = useState(draft.immediate)
  const [errors, setErrors] = useState<Partial<Record<FieldId, string>>>({})
  const [consentErrors, setConsentErrors] = useState<ConsentErrors>({})
  const [summary, setSummary] = useState<FieldDef[] | null>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const uid = useId()
  const fid = (id: string) => `${uid}-${id}`

  const mode = FACTS.checkout.mode
  const methods = present(FACTS.payment.methods) ? FACTS.payment.methods : null
  const provider = FACTS.payment.provider
  const { lines, total } = summaryProps(items, { change: true })
  const change = items.length > 0 ? changeLink(items[0]) : null
  const severalLines = linkMode() != null && items.length > 1
  // What the buyer has typed now: the WhatsApp message of a failed send follows the form as it stands.
  const current: Draft = { values, notes, method, cgv, immediate }

  // The buyer opened the note: the keyboard lands in it (not when the form comes back with a note already written).
  const notesId = fid('notes')
  useEffect(() => {
    if (notesOpen && notesAsked.current) document.getElementById(notesId)?.focus()
  }, [notesOpen, notesId])

  const set = (def: FieldDef, v: string) => {
    const next = { ...values, [def.id]: v }
    setValues(next)
    if (errors[def.id]) setErrors((e) => ({ ...e, [def.id]: fieldError(def, next) }))
  }
  const leave = (def: FieldDef) => {
    if (!values[def.id] && !errors[def.id]) return
    setErrors((e) => ({ ...e, [def.id]: fieldError(def, values) }))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (sending) return
    const next: Partial<Record<FieldId, string>> = {}
    for (const def of defs) {
      const err = fieldError(def, values)
      if (err) next[def.id] = err
    }
    const consent: ConsentErrors = {
      cgv: cgv ? undefined : 'Pour continuer, cochez la case des conditions générales de vente.',
      immediate: immediate ? undefined : 'Cochez cette case pour que votre abonnement puisse démarrer dès son activation.',
    }
    setErrors(next)
    setConsentErrors(consent)
    const bad = defs.filter((d) => next[d.id])
    if (bad.length || consent.cgv || consent.immediate) {
      setSummary(bad)
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setSummary(null)
    onSubmit({ values, notes, method, cgv, immediate })
  }

  const field = (def: FieldDef) => {
    const common = {
      id: fid(def.id),
      name: def.id,
      label: def.label,
      // The renewal identifier's helper says where to find it, an optional fact: without it the field keeps its
      // label and its error, and no helper line.
      helper: def.id === 'renewal_id' ? (inScope('plans.renewal.identifier') ? <RenewalHelper /> : undefined) : def.helper,
      error: errors[def.id],
      autoComplete: def.autoComplete,
      'aria-required': def.required ? ('true' as const) : undefined,
      className: def.row === 'wide' ? 'md:col-span-2' : undefined,
    }
    if (def.kind === 'select-country' || def.kind === 'select-device') {
      const options = def.kind === 'select-country' ? countries().map((c) => ({ value: c.code, label: c.name })) : deviceOptions()
      return (
        <Select key={def.id} {...common} value={values[def.id] ?? ''} onChange={(e) => set(def, e.target.value)} onBlur={() => leave(def)}>
          <option value="">{def.kind === 'select-country' ? 'Choisissez votre pays' : 'Choisissez un type d’appareil'}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      )
    }
    return (
      <Input
        key={def.id}
        {...common}
        type={def.kind === 'email' ? 'email' : def.kind === 'tel' ? 'tel' : 'text'}
        inputMode={def.kind === 'tel' ? 'tel' : undefined}
        value={values[def.id] ?? ''}
        onChange={(e) => set(def, e.target.value)}
        onBlur={() => leave(def)}
      />
    )
  }

  return (
    <form noValidate onSubmit={submit} aria-labelledby={fid('titre')}>
      <header data-section="checkout-steps" className="grid gap-5">
        <h1 id={fid('titre')} className="font-display text-display-sm text-ink">
          Passer commande
        </h1>
        <CheckoutSteps current={2} />
      </header>

      {/* Below lg the summary sits under the form: what is being ordered and its total come first, on one line,
          with the way back to the plans. From lg the summary column beside the form says it. A slim row, so the
          16px step: at the card radius one line of text would turn it into a lozenge. */}
      <div
        data-part="checkout-recap"
        className="mt-6 flex flex-wrap items-center justify-between gap-x-5 gap-y-1 rounded-inner border border-hairline bg-plate px-4 py-3 font-sans lg:hidden"
      >
        <p className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1 text-meta font-semibold text-ink">
          <span className="sr-only">Votre commande&nbsp;: </span>
          <span>{items.map((i) => i.name).join(', ')}</span>
          {slotShown(total.value, total.pending.fact) &&
            (total.value == null ? (
              <Pending what={total.pending.what} fact={total.pending.fact} />
            ) : (
              <span className="money text-[1.0625rem] text-ink">{total.value}</span>
            ))}
        </p>
        {change && (
          <TextLink to={change.to} standalone className="-my-2.5 text-meta font-semibold">
            {change.label}
          </TextLink>
        )}
      </div>

      {summary && (summary.length > 0 || consentErrors.cgv || consentErrors.immediate) && (
        // The kit's error notice (16px corners, its edge, a 20px icon on the first line). Focusable by script only.
        <div ref={summaryRef} tabIndex={-1} role="alert" className={cn(noticeClass.error, 'mt-8 font-semibold outline-none')}>
          <i className="ti ti-alert-circle mt-0.5 shrink-0 text-[20px]" aria-hidden="true" />
          <p className="min-w-0">
            <span>
              Il manque quelques informations. Vérifiez les champs signalés
              {summary.length > 0 ? ' : ' : '.'}
              {summary.map((d, i) => (
                <span key={d.id}>
                  {i > 0 && ', '}
                  <a href={`#${fid(d.id)}`} className="underline decoration-1 underline-offset-3 hover:decoration-2">
                    {d.label.replace(/ \(facultatif\)$/, '')}
                  </a>
                </span>
              ))}
              {summary.length > 0 && '.'}
            </span>
          </p>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 items-start gap-x-grid gap-y-8 lg:grid-cols-12">
        {/* 32px of padding from md, the summary beside it too: the two column heads sit on one line, and the
            half-width fields keep the room their placeholders need. */}
        <FormCard className="md:p-8 lg:col-span-7">
          <section data-section="checkout-details" aria-labelledby={fid('details')}>
            <h2 id={fid('details')} className="font-display text-title-lg text-ink">
              Vos coordonnées
            </h2>
            <p className="mt-2 font-sans text-small text-ink-soft">
              Le strict nécessaire pour activer votre abonnement et vous transmettre vos accès. Pas de compte à créer, pas de mot de passe.
            </p>
            <div className="mt-6 grid items-start gap-x-4 gap-y-5 md:grid-cols-2">{defs.map(field)}</div>
            <p className="mt-5 font-sans text-small text-ink-soft">
              Vos accès vous parviennent par <Fact value={deliveryChannelText()} what="canal d’envoi" fact="delivery.channel" tail="." />
            </p>
          </section>
          {/* No rule above: the optional note is the form's last field, behind a quiet pill until it is asked for. */}
          <section data-section="checkout-notes" className="mt-6">
            {notesOpen ? (
              <Textarea
                id={notesId}
                name="notes"
                label="Une précision pour l’équipe (facultatif)"
                placeholder="Par exemple, le moment où l’on peut vous joindre."
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            ) : (
              <Button
                variant="quiet"
                size="sm"
                iconStart="ti-plus"
                onClick={() => {
                  notesAsked.current = true
                  setNotesOpen(true)
                }}
              >
                Ajouter une précision
              </Button>
            )}
          </section>
        </FormCard>

        <div data-section="checkout-summary" className="lg:col-span-5 lg:sticky lg:top-24">
          <OrderSummary title="Récapitulatif" lines={lines} total={total} sticky={false} className="md:p-8">
            {/* The tax mention belongs to the amount: 4px under it (the panel sets 24px between its blocks). */}
            <p className="-mt-5 text-right font-sans text-meta font-medium text-ink-muted">
              <Fact value={FACTS.pricing.vat} what="mention TVA" fact="pricing.vat" />
            </p>

            <section data-section="checkout-payment" aria-labelledby={fid('paiement')} className="border-t border-hairline-deep pt-5">
              <h2 id={fid('paiement')} className="font-display text-title text-ink">
                Paiement
              </h2>
              {methods && mode && (
                <fieldset className="mt-4 grid gap-2.5">
                  <legend className="sr-only">Moyen de paiement</legend>
                  {methods.map((m) => (
                    <RadioCard
                      key={m.name}
                      name="method"
                      value={m.name}
                      checked={method === m.name}
                      onChange={() => setMethod(m.name)}
                      label={
                        <span className="grid">
                          <span>{m.name}</span>
                          {m.note && <span className="font-sans text-meta font-medium text-ink-soft">{m.note}</span>}
                        </span>
                      }
                    />
                  ))}
                </fieldset>
              )}
              {!mode && (
                <div className="mt-3 grid gap-2 font-sans text-small text-ink-body">
                  <h3 className="font-sans text-[0.9375rem] font-semibold text-ink">Comment finaliser votre commande</h3>
                  <p>
                    <Fact value={checkoutModeSentence()} what="comment la commande est finalisée et payée" fact="checkout.mode" />
                  </p>
                  <p>Rien n’est débité sur cette page.</p>
                  <p>
                    Une question&nbsp;? Écrivez-nous sur WhatsApp&nbsp;: <WaNumber tail="." />
                  </p>
                </div>
              )}
              {/* A link mode hands over one line per order (handoff.ts): with several, it asks to keep one. */}
              {severalLines && (
                <Notice tone="info" className="mt-4">
                  <p>
                    Le paiement en ligne se fait article par article. Gardez dans votre panier celui que vous voulez payer maintenant&nbsp;: vous
                    pourrez commander le suivant juste après.
                  </p>
                  <Button variant="secondary" size="sm" iconStart="ti-shopping-cart" className="mt-3" onClick={() => setCartOpen(true)}>
                    Modifier mon panier
                  </Button>
                </Notice>
              )}
            </section>

            <section data-section="checkout-consent" className="grid gap-4 border-t border-hairline-deep pt-5">
              <Checkbox
                id={fid('cgv')}
                name="cgv"
                checked={cgv}
                aria-required="true"
                onChange={(e) => {
                  setCgv(e.target.checked)
                  if (e.target.checked) setConsentErrors((c) => ({ ...c, cgv: undefined }))
                }}
                error={consentErrors.cgv}
                label={
                  <>
                    Je confirme avoir lu les{' '}
                    <TextLink to="/conditions-generales-de-vente/" target="_blank" aria-label="conditions générales de vente (nouvel onglet)">
                      conditions générales de vente
                    </TextLink>{' '}
                    et je les accepte.
                  </>
                }
              />
              <Checkbox
                id={fid('immediat')}
                name="immediate_start"
                checked={immediate}
                aria-required="true"
                onChange={(e) => {
                  setImmediateStart(e.target.checked)
                  if (e.target.checked) setConsentErrors((c) => ({ ...c, immediate: undefined }))
                }}
                error={consentErrors.immediate}
                label="Je demande que mon abonnement démarre dès son activation, avant la fin du délai de rétractation de 14 jours, et je reconnais perdre mon droit de rétractation dès que mes accès sont activés."
              />
              <p className="font-sans text-meta text-ink-soft">
                Remboursements&nbsp;: <Fact value={FACTS.refund.terms.summary} what="conditions de remboursement" fact="refund.terms.summary" tail="." />{' '}
                <TextLink to="/politique-de-remboursement/" target="_blank" aria-label="Voir la politique de remboursement (nouvel onglet)">
                  Voir la politique de remboursement
                </TextLink>
                .
              </p>
              <p className="font-sans text-meta text-ink-soft">
                Vos coordonnées servent à préparer votre commande et à vous transmettre vos accès. Tout est détaillé dans la{' '}
                <TextLink to="/politique-de-confidentialite/" target="_blank" aria-label="politique de confidentialité (nouvel onglet)">
                  politique de confidentialité
                </TextLink>
                .
              </p>
              {failure && <SendFailed key={failure.attempt} reference={failure.reference} message={orderMessage(items, current, failure.reference)} />}
              <Button type="submit" full size="lg" iconStart="ti-lock" loading={sending}>
                {submitLabel(handoff)}
              </Button>
              {handoff && (
                <>
                  <p className="font-sans text-meta text-ink-soft">
                    {handoff === 'externalShop'
                      ? 'Ce bouton nous transmet votre commande avec sa référence. Vous ouvrez ensuite notre boutique en ligne, où vous la payez.'
                      : 'Ce bouton nous transmet votre commande avec sa référence. Vous ouvrez ensuite la page de paiement.'}
                  </p>
                  {/* There from the first render of a cart that is handed over, so the sending status is announced. */}
                  <p className="sr-only" role="status" aria-live="polite">
                    {sending ? 'Envoi de votre commande…' : ''}
                  </p>
                </>
              )}
              {provider && mode === 'hostedPage' && (
                <p className="font-sans text-meta text-ink-soft">
                  Le paiement se fait sur la page sécurisée de notre prestataire, {provider}&nbsp;: vos données de carte ne passent pas par notre site.
                </p>
              )}
            </section>
          </OrderSummary>
        </div>
      </div>
    </form>
  )
}

/**
 * The order did not reach the form service (an error answer, no network, no answer in time): said plainly above the
 * submit, focus on it, nothing opens and the form stays filled (copy commande.md › checkout-consent). WhatsApp
 * carries the order already written, with the same reference as its second line. Each failure mounts a new notice
 * (its key), so it is announced again.
 */
function SendFailed({ reference, message }: { reference: string; message: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current?.focus()
  }, [])
  return (
    // The button sits under the notice box, not in it: in the summary column of a phone the box's text column
    // (164 to 256px) is narrower than the button's one line (270px), which would make it a two-line pill.
    <div ref={ref} tabIndex={-1} data-part="checkout-send-failed" data-reference={reference} className="grid gap-3 outline-none">
      <Notice tone="error" role="alert">
        <p className="font-semibold">L’envoi de votre commande n’a pas abouti</p>
        <p className="mt-1">
          Rien n’a été débité, et vous êtes toujours sur cette page. Réessayez dans un instant, ou envoyez-nous votre commande sur
          WhatsApp&nbsp;: le message est déjà rédigé.
        </p>
      </Notice>
      <div>
        <WhatsAppButton {...whatsappButtonProps(whatsappHref(message), 'Commander sur WhatsApp')} size="md" className="max-sm:w-full" />
      </div>
    </div>
  )
}

/** Helper of the renewal identifier: where the customer finds it (plans.renewal.identifier). */
function RenewalHelper() {
  return <Fact value={FACTS.plans.renewal.identifier} what="identifiant à indiquer et où le trouver" fact="plans.renewal.identifier" />
}
