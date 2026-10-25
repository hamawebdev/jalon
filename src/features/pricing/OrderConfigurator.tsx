// « Mini-Configurateur Boutique » (brief pp. 43–45): device → number of codes (= plan, live price) → payment, then
// one button that opens WhatsApp with orderMessage(). Native radio groups (fieldset + legend, arrow keys work).
// The order needs a device and a payment method: until both are chosen the button points to the missing step
// instead of opening WhatsApp, so the message always carries them. Owner: pricing.
import { useId, useRef, useState, type ChangeEvent, type ReactNode } from 'react'
import { Apple, Box, CircleAlert, Flame, Landmark, Laptop, Router, Tv, TvMinimal, Wallet, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router'
import { Badge, Highlight, PillButton, WhatsAppButton, WhatsAppIcon } from '@/components/kit'
import { useFormat, useLang, useT } from '@/i18n/context'
import { pathFor } from '@/i18n/routes'
import { FACTS, PLANS, plan as getPlan, type PaymentMethod, type PlanId } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { ORDER_DEVICES, orderMessage, type OrderDevice } from '@/lib/whatsapp'

const DEVICE_ICONS: Record<OrderDevice, LucideIcon> = {
  androidBox: Box,
  samsung: Tv,
  lg: Tv,
  firestick: Flame,
  googleTv: TvMinimal,
  apple: Apple,
  pc: Laptop,
  formuler: Router,
}
const DEVICES = Object.keys(ORDER_DEVICES) as OrderDevice[]

const PAYMENT_ICONS: Record<PaymentMethod, LucideIcon> = { sepa: Landmark, paypal: Wallet }
// The brief lists the bank transfer first.
const PAYMENT_ORDER: PaymentMethod[] = ['sepa', 'paypal']

type Missing = 'device' | 'payment'

/** A radio input visually hidden inside its label; the label shows the state (has-checked) and the focus ring. */
function Radio({
  name,
  value,
  checked,
  onChange,
  className,
  children,
}: {
  name: string
  value: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
  children: ReactNode
}) {
  return (
    <label
      className={cn(
        'group/opt relative cursor-pointer select-none border transition-all duration-200 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary',
        className,
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  )
}

function StepLegend({ letter, title, alert }: { letter: string; title: string; alert: boolean }) {
  const t = useT()
  return (
    <legend className="mb-3.5 flex w-full flex-wrap items-center gap-x-2.5 gap-y-1">
      <span
        className={cn(
          'inline-flex h-7 items-center rounded-full px-3 text-xs font-bold uppercase tracking-wide',
          alert ? 'bg-alert text-white' : 'bg-primary-soft text-primary',
        )}
      >
        {t.pricing.configurator.step(letter)}
      </span>
      <span className="font-display text-base font-semibold text-ink sm:text-lg">{title}</span>
    </legend>
  )
}

export function OrderConfigurator({
  headingLevel = 'h3',
  boutiqueLink = false,
  className,
}: {
  /** h3 inside the home pricing section (the brief's level), h2 on the Boutique page. */
  headingLevel?: 'h2' | 'h3'
  /** Show a link to the Boutique page (home page). */
  boutiqueLink?: boolean
  className?: string
}) {
  const t = useT()
  const c = t.pricing.configurator
  const lang = useLang()
  const { num, price } = useFormat()
  const uid = useId()

  const [device, setDevice] = useState<OrderDevice | null>(null)
  const [planId, setPlanId] = useState<PlanId>(FACTS.featuredPlan)
  const [payment, setPayment] = useState<PaymentMethod | null>(null)
  const [prompted, setPrompted] = useState(false)
  const deviceSet = useRef<HTMLFieldSetElement>(null)
  const paymentSet = useRef<HTMLFieldSetElement>(null)

  const selected = getPlan(planId)
  const months = num(selected.months)
  const payments = PAYMENT_ORDER.filter((m) => FACTS.payment.methods?.includes(m))
  const missing: Missing | null = !device ? 'device' : !payment ? 'payment' : null
  const total = selected.price != null ? price(selected.price) : null
  const Heading = headingLevel
  const hintId = `${uid}-hint`

  function pointToMissing() {
    setPrompted(true)
    const set = missing === 'device' ? deviceSet.current : paymentSet.current
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    set?.scrollIntoView({ block: 'center', behavior: still ? 'auto' : 'smooth' })
    set?.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true })
  }

  const summary: { label: string; value: string | null }[] = [
    { label: c.summaryDevice, value: device ? c.devices[device] : null },
    { label: c.summaryOffer, value: `${c.codes(selected.screens)} · ${t.pricing.plans.names[planId]}` },
    { label: c.summaryPayment, value: payment ? c.payments[payment] : null },
  ]

  const ctaClasses =
    'h-auto min-h-14 w-full whitespace-normal py-3 text-center leading-snug [&>span.truncate]:whitespace-normal'

  return (
    <div
      className={cn(
        'rounded-3xl border border-line bg-white p-5 shadow-card sm:p-8 lg:p-10',
        className,
      )}
    >
      <div className="mb-8 flex max-w-2xl flex-col items-start gap-3">
        <Badge>{c.badge}</Badge>
        <Heading className="text-2xl font-bold tracking-tight sm:text-3xl">
          <Highlight text={c.title} />
        </Heading>
        <p className="text-base text-slate sm:text-lg">{c.subtitle}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
        <div className="flex min-w-0 flex-col gap-8">
          {/* Étape A — device */}
          <fieldset
            ref={deviceSet}
            aria-describedby={prompted && missing === 'device' ? hintId : undefined}
            className="min-w-0"
          >
            <StepLegend letter={c.stepA.letter} title={c.stepA.title} alert={prompted && missing === 'device'} />
            <div className="flex flex-wrap gap-2.5">
              {DEVICES.map((id) => {
                const Icon = DEVICE_ICONS[id]
                return (
                  <Radio
                    key={id}
                    name={`${uid}-device`}
                    value={id}
                    checked={device === id}
                    onChange={() => setDevice(id)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border-line bg-white px-4 py-2 text-sm font-medium text-ink shadow-pill hover:border-primary/40 hover:bg-primary-soft/50 has-checked:border-primary has-checked:bg-primary has-checked:text-white has-checked:shadow-glow"
                  >
                    <Icon aria-hidden className="size-4 shrink-0 text-primary group-has-checked/opt:text-white" />
                    {c.devices[id]}
                  </Radio>
                )
              })}
            </div>
          </fieldset>

          {/* Étape B — number of codes = plan */}
          <fieldset className="min-w-0">
            <StepLegend letter={c.stepB.letter} title={c.stepB.title} alert={false} />
            <div className="grid gap-3 sm:grid-cols-3">
              {PLANS.map((p) => {
                const popular = p.id === FACTS.featuredPlan
                return (
                  <Radio
                    key={p.id}
                    name={`${uid}-plan`}
                    value={p.id}
                    checked={planId === p.id}
                    onChange={() => setPlanId(p.id)}
                    className="flex items-start gap-3 rounded-2xl border-line bg-white p-4 hover:border-primary/40 has-checked:border-primary has-checked:bg-primary-soft/60 has-checked:ring-1 has-checked:ring-primary sm:flex-col sm:gap-2"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-line bg-white group-has-checked/opt:border-primary sm:absolute sm:right-4 sm:top-4 sm:mt-0"
                    >
                      <span className="size-2.5 scale-0 rounded-full bg-primary transition-transform group-has-checked/opt:scale-100" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="font-display text-base font-semibold text-ink">{c.codes(p.screens)}</span>
                      <span className="text-sm text-slate">{c.codesDetail(t.pricing.plans.names[p.id], num(p.months))}</span>
                      <span className="mt-1.5 flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-primary">
                          {p.price != null ? c.price(price(p.price)) : null}
                        </span>
                        {popular ? (
                          <span className="rounded-full bg-gold px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink">
                            {c.popular}
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </Radio>
                )
              })}
            </div>
          </fieldset>

          {/* Étape C — payment */}
          <fieldset
            ref={paymentSet}
            aria-describedby={prompted && missing === 'payment' ? hintId : undefined}
            className="min-w-0"
          >
            <StepLegend letter={c.stepC.letter} title={c.stepC.title} alert={prompted && missing === 'payment'} />
            <div className="grid grid-cols-2 gap-3">
              {payments.map((m) => {
                const Icon = PAYMENT_ICONS[m]
                return (
                  <Radio
                    key={m}
                    name={`${uid}-payment`}
                    value={m}
                    checked={payment === m}
                    onChange={() => setPayment(m)}
                    className="flex min-h-14 items-center gap-3 rounded-2xl border-line bg-white p-3 text-sm font-semibold text-ink hover:border-primary/40 has-checked:border-primary has-checked:bg-primary-soft/60 has-checked:ring-1 has-checked:ring-primary sm:p-4 sm:text-base"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-mist text-primary group-has-checked/opt:bg-primary group-has-checked/opt:text-white">
                      <Icon aria-hidden className="size-4.5" />
                    </span>
                    <span className="min-w-0">{c.payments[m]}</span>
                  </Radio>
                )
              })}
            </div>
          </fieldset>
        </div>

        {/* Summary + order button */}
        <aside
          aria-label={c.summary}
          className="flex flex-col gap-5 self-start rounded-3xl bg-mist p-5 sm:p-6 lg:sticky lg:top-24"
        >
          <p className="font-display text-base font-semibold text-ink">{c.summary}</p>
          <dl className="flex flex-col gap-2.5 text-sm">
            {summary.map(({ label, value }) => (
              <div key={label} className="flex items-baseline justify-between gap-4">
                <dt className="shrink-0 text-slate">{label}</dt>
                <dd className={cn('text-right font-semibold', value ? 'text-ink' : 'italic text-slate/80')}>
                  {value ?? c.notChosen}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex items-end justify-between gap-4 border-t border-line pt-4">
            <span className="text-sm font-medium text-slate">{c.total}</span>
            <span className="text-right">
              <span aria-live="polite" className="block font-display text-4xl font-extrabold tracking-tight text-ink">
                {total}
              </span>
              <span className="text-xs text-slate">{c.totalFor(months)}</span>
            </span>
          </div>

          {total != null ? (
            device && payment ? (
              <WhatsAppButton
                message={orderMessage({ plan: planId, device, payment })}
                size="lg"
                className={ctaClasses}
                data-order="configurator"
              >
                {c.cta(total)}
              </WhatsAppButton>
            ) : (
              <PillButton
                onClick={pointToMissing}
                variant="primary"
                size="lg"
                icon={<WhatsAppIcon />}
                aria-describedby={hintId}
                className={ctaClasses}
              >
                {c.cta(total)}
              </PillButton>
            )
          ) : null}

          <p
            id={hintId}
            aria-live="polite"
            className={cn(
              'flex items-start gap-2 text-sm',
              missing && prompted ? 'font-semibold text-alert' : 'text-slate',
            )}
          >
            {missing ? <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" /> : null}
            {missing === 'device' ? c.needDevice : missing === 'payment' ? c.needPayment : c.ready}
          </p>

          {boutiqueLink ? (
            <Link
              to={pathFor('boutique', lang)}
              className="inline-flex min-h-10 items-center self-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              {c.boutiqueLink}
            </Link>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
