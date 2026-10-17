import { Carte, Kw, Price, Reveal, Section, TextLink, cardClass, type Zone } from '@/components/brand'
import { formatEuro, planFactKey, planName, planPath, type Plan } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { type PlanProduct, baseScreenOption, planWithScreens, relatedPlans } from './data'
import { NB } from './facts-text'

const COPY = {
  titleStart: 'Les autres ',
  titleKeyword: 'durées',
  unit: 'prix total',
  details: 'Voir le détail de la formule',
}

/**
 * One other duration: its name, its total price and one link to its plan page, which covers the whole card (the
 * link's own text is the keyboard stop; its name adds the duration). Nothing is added to the order from here: a
 * household buys one duration, on that plan's page. A card at every width, as the kit draws a card that is one
 * link (2px lift, the lift shadow and a deeper hairline on hover; the focus ring follows the card): compact on
 * phones (no Carte, 20px corners), with the Carte from md (panel corners).
 */
function RelatedItem({ plan, index }: { plan: Plan; index: number }) {
  const name = planName(plan.months)
  // With multi-screen options, a related row shows the price of the included screen count.
  const option = baseScreenOption()
  const price = planWithScreens(plan, option).price
  return (
    <li
      className={cn(
        'relative flex flex-col rounded-card border border-z-line bg-z-card p-5 md:rounded-panel md:p-card',
        cardClass.interactive,
        // The link covers the card, so the one focus ring is drawn on the card (the link's own is not doubled).
        'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-(--z-focus)',
      )}
    >
      <div aria-hidden="true" className="mb-5 max-md:hidden">
        <Reveal index={index}>
          <Carte size="sm" months={String(plan.months)} plan={name} variant="plan" />
        </Reveal>
      </div>
      <h3 className="font-display text-title text-z-fg">{name}</h3>
      <Price
        value={formatEuro(price)}
        pending={{ what: 'prix', fact: option ? 'plans.screens.options' : planFactKey(plan.id, 'price') }}
        unit={COPY.unit}
        size="md"
        className="mt-2 md:mt-3"
      />
      <p className="mt-3 font-sans text-small font-semibold md:mt-auto md:pt-5">
        <TextLink
          to={planPath(plan)}
          aria-label={`${COPY.details} ${plan.months}${NB}mois`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-0"
        >
          {COPY.details}
          {/* inline-block: the link's underline stops before the arrow */}
          <i className="ti ti-arrow-right ml-1.5 inline-block align-[-0.15em] text-[1.125em]" aria-hidden="true" />
        </TextLink>
      </p>
    </li>
  )
}

/**
 * product-related: the other durations of the plan list, shortest first (computed, never a hand-kept list; the
 * renewal is not one of them), each a card that links to its own page: stacked 16px apart on phones, a row of
 * three from md. The head is the heading alone (no rule drawn beside it).
 */
export function Related({ product, zone = 'paper' }: { product: PlanProduct; zone?: Zone }) {
  const plans = relatedPlans(product.plan)
  if (plans.length === 0) return null
  return (
    <Section zone={zone} dataSection="product-related">
      <h2 className="font-display text-display-md text-z-fg">
        {COPY.titleStart}
        <Kw>{COPY.titleKeyword}</Kw>
      </h2>
      <ul className="m-0 mt-head grid list-none gap-4 p-0 md:grid-cols-3 md:gap-grid">
        {plans.map((p, i) => (
          <RelatedItem key={p.id} plan={p} index={i} />
        ))}
      </ul>
    </Section>
  )
}
