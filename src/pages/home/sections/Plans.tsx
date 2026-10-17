import { Eyebrow, Kw, PaymentRow, Reveal, Section, TrustRow } from '@/components/brand'
import type { IconText } from '@/components/brand'
import { FACTS, present } from '@/lib/facts'
import { PlanChecklist, PlanGridCard } from '../../pricing/PlanGridCard'
import { F, NB } from '../../product/facts-text'
import { Fact } from '../../product/shared'
import { ANCHORS } from '../data'

const HEAD = {
  eyebrow: 'Formules',
  titleStart: 'Choisissez la durée, ',
  titleKeyword: 'on s’occupe du reste',
  titleEnd: '.',
  lead: 'Chaque formule affiche sa durée et son prix total. Ce que toutes contiennent est listé une fois, sous les cartes.',
  list: 'Formules par durée',
  payment: `Moyens de paiement${NB}:`,
}

/** Trust row under the grid: secure payment only with a real provider, then the activation delay. */
const TRUST: IconText[] = [
  ...(present(FACTS.payment.provider) ? [{ icon: 'ti-shield-check', label: `Paiement sécurisé par ${FACTS.payment.provider}` }] : []),
  {
    icon: 'ti-clock',
    label: (
      <>
        Activation{NB}: <Fact value={FACTS.delivery.delay} what="délai" fact="delivery.delay" />
      </>
    ),
  },
]

/**
 * home-plans (band): split head, one card per plan of the plan list (shortest first, the featured plan lifted in
 * place with the tab), then what every plan includes, listed once (« Dans chaque formule », one white panel closing
 * the grid), then the trust row, the means of payment and the tax line, without rules (T28). The card and the shared list are the plans page's own (build-b's
 * PlanGridCard and PlanChecklist), so both grids stay identical. The #abonnements anchor lands here. The grid
 * carries data-buybar-watch: the phone buy bar steps aside while the visitor compares the cards.
 */
export function HomePlans() {
  return (
    <Section zone="band" dataSection="home-plans" id={ANCHORS.plans} container="wide">
      <Reveal as="header" className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-grid">
        <div className="lg:col-span-7">
          <Eyebrow>{HEAD.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-display-md text-z-fg">
            {HEAD.titleStart}
            <Kw>{HEAD.titleKeyword}</Kw>
            {HEAD.titleEnd}
          </h2>
        </div>
        <p className="max-w-[56ch] font-sans text-lead text-z-soft lg:col-span-5 lg:max-w-[34ch] lg:justify-self-end lg:pb-1.5">
          {HEAD.lead}
        </p>
      </Reveal>

      {/* The grid of /abonnements/ (build-b's PlansGrid), class for class: below xl the rows open to 24px, so the
          advised card's tab (half above its edge) clears the card above; from xl the four cards share one row. The
          top padding keeps the tab clear of the head. */}
      <ul
        aria-label={HEAD.list}
        data-buybar-watch=""
        className="m-0 mt-head grid list-none gap-x-grid gap-y-6 p-0 pt-3 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch xl:gap-y-grid xl:pt-4"
      >
        {FACTS.plans.list.map((plan) => (
          // From md the kit's advised card keeps its neighbours' padding (its tab clears the name by itself), so the
          // names of a row stand on one line without help; the plain cards' extra top padding of the first identity
          // left them 8px lower in the 2×2 tablet grid.
          <li key={plan.id} className="grid min-w-0">
            <PlanGridCard plan={plan} />
          </li>
        ))}
      </ul>

      {/* What every plan holds, as the fifth piece of the comparison: the white panel of /abonnements/ (`boxed`), as
          far from the cards as they are from each other. No rule: the panel on the band parts it. Draws nothing
          when no line is left (launch mode). */}
      <PlanChecklist boxed className="mt-6 xl:mt-grid" />

      <div className="mt-6 grid gap-3 md:mt-8">
        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-8">
          <TrustRow items={TRUST} />
          <PaymentRow label={HEAD.payment} methods={F.paymentBadges} />
        </div>
        <p className="font-sans text-meta text-z-muted">
          Prix totaux pour toute la durée, <Fact value={FACTS.pricing.vat} what="mention TVA" fact="pricing.vat" tail="." />
        </p>
      </div>
    </Section>
  )
}
