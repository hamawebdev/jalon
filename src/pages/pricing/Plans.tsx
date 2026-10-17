import { useState } from 'react'
import { PaymentRow, RadioCard, Section, Segmented, TextLink, TrustRow } from '@/components/brand'
import type { IconText } from '@/components/brand'
import { FACTS, present, type ScreenOption } from '@/lib/facts'
import { baseScreenOption, screenOptions } from '../product/data'
import { Fact } from '../theme/facts-ui'
import { PlanChecklist, PlanGridCard } from './PlanGridCard'

// /abonnements/ › plans-grid (+ plans-screens when the owner sells several screen counts): one card per plan in
// plans.list, shortest first, the featured one marked in place. The cards hold what differs (duration, total
// price); what every plan includes is listed once in the panel under them (« Dans chaque formule »), which ends on
// the way to the device check. Then one quiet line: the trust row and the payment methods, and the tax sentence.
// No rule between these blocks: the panel is the fifth piece of the comparison, the line its small print.
// Every figure comes from src/lib/facts.ts.

const SCREENS_LABEL = 'Écrans en même temps'
const screensLabel = (n: number) => (n === 1 ? '1\u00a0écran' : `${n}\u00a0écrans`)

/**
 * plans-screens: the choice that switches the prices of the grid (only with screen options). Two or three counts
 * sit in the kit's segmented track (a white thumb, never a filled one: that is the pay button's look); more would
 * crush the labels of a pill track, so they stack as choice rows. The track is band-deep here: the section is a band.
 */
function ScreensToggle({ options, value, onChange }: { options: ScreenOption[]; value: number; onChange: (screens: number) => void }) {
  return (
    <div data-section="plans-screens" className="mb-8 md:mb-10">
      {/* The group's own legend is read by assistive technology; this is the same words for the eye. */}
      <p aria-hidden="true" className="font-sans text-small font-semibold text-z-fg">
        {SCREENS_LABEL}
      </p>
      {options.length <= 3 ? (
        <Segmented
          className="mt-3 bg-band-deep"
          label={SCREENS_LABEL}
          name="plans-screens"
          value={String(value)}
          onChange={(v) => onChange(Number(v))}
          options={options.map((o) => ({ value: String(o.screens), label: screensLabel(o.screens) }))}
        />
      ) : (
        <fieldset className="m-0 mt-3 grid max-w-[360px] min-w-0 gap-2.5 border-0 p-0">
          <legend className="sr-only">{SCREENS_LABEL}</legend>
          {options.map((o) => (
            <RadioCard
              key={o.screens}
              name="plans-screens"
              value={o.screens}
              checked={value === o.screens}
              onChange={() => onChange(o.screens)}
              label={screensLabel(o.screens)}
            />
          ))}
        </fieldset>
      )}
      <p className="mt-3 font-sans text-small text-z-soft">Les prix des formules changent selon le nombre d’écrans choisi.</p>
      <p className="sr-only" aria-live="polite">
        {`Prix affichés pour ${value} ${value === 1 ? 'écran' : 'écrans'}`}
      </p>
    </div>
  )
}

export function PlansGrid() {
  const plans = FACTS.plans.list
  // The plan pages' options and starting point (product/data.ts): the priced options, the included count first.
  const options = screenOptions()
  const [screens, setScreens] = useState(() => baseScreenOption()?.screens ?? FACTS.plans.screens.count)
  const option = options?.find((o) => o.screens === screens) ?? null

  // The same pictograms as the home page's plans and the plan pages: a shield for the payment, a clock for the delay.
  const trust: IconText[] = [
    ...(present(FACTS.payment.provider)
      ? [{ icon: 'ti-shield-check', label: <>Paiement sécurisé par {FACTS.payment.provider}</> }]
      : []),
    {
      icon: 'ti-clock',
      label: (
        <>
          Activation&nbsp;: <Fact value={FACTS.delivery.delay} what="délai" fact="delivery.delay" />
        </>
      ),
    },
  ]

  return (
    <Section zone="band" dataSection="plans-grid" rhythm="sm" container="wide">
      {options && option && <ScreensToggle options={options} value={option.screens} onChange={setScreens} />}
      {/* Below xl the rows open up to 24px, so the advised card's tab (half above its edge) clears the card above. */}
      <ul aria-label="Formules par durée" className="grid gap-x-grid gap-y-6 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch xl:gap-y-grid">
        {plans.map((plan) => (
          <li key={plan.id} className="min-w-0">
            <PlanGridCard plan={plan} as="h2" screens={option} />
          </li>
        ))}
      </ul>
      {/* As far from the cards as they are from each other: one comparison, five pieces. */}
      <PlanChecklist
        as="h2"
        boxed
        // The « Écrans en même temps » line states the count the prices above are for, as the plan pages' buy box.
        screens={option ? option.screens : FACTS.plans.screens.count}
        className="mt-6 xl:mt-grid"
        foot={
          <>
            Votre appareil convient-il&nbsp;?{' '}
            {/* The link keeps its words together: on a narrow screen it takes the next line whole. */}
            <TextLink to="/applications/" className="font-semibold whitespace-nowrap">
              Vérifier mon appareil
            </TextLink>
          </>
        }
      />
      <div className="mt-6 grid gap-3 md:mt-8">
        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-8">
          <TrustRow items={trust} />
          <PaymentRow label={'Moyens de paiement\u00a0:'} methods={present(FACTS.payment.methods) ? FACTS.payment.methods.map((m) => m.name) : null} />
        </div>
        <p className="font-sans text-meta text-z-muted">
          Prix totaux pour toute la durée, <Fact value={FACTS.pricing.vat} what="mention TVA" fact="pricing.vat" tail="." />
        </p>
      </div>
    </Section>
  )
}
