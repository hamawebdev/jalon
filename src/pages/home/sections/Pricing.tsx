// Home section: « Choisissez votre forfait Atlas Pro ONTV »: 3 pricing cards + reassurance band + trust bar. Owner: pricing. Anchor: HOME_ANCHORS.pricing
// Brief pp. 19–22 (cards, trust & payment bar right under them, reassurance band) and p. 43 (the Boutique
// mini-configurator « directly in the same page, under the plans »).
import { Section, SectionHeader } from '@/components/kit'
import { OrderConfigurator, PlanCards, ReassuranceBand, TrustBar } from '@/features/pricing'
import { useT } from '@/i18n/context'
import { HOME_ANCHORS } from '@/i18n/routes'

export function Pricing() {
  const t = useT()
  const p = t.pricing.plans
  return (
    <Section id={HOME_ANCHORS.pricing} bg="mist">
      <SectionHeader badge={p.badge} title={p.title} highlight={p.highlight} subtitle={p.subtitle} />
      <PlanCards />
      <TrustBar className="mt-10 lg:mt-14" />
      <ReassuranceBand className="mt-6" />
      <OrderConfigurator headingLevel="h3" boutiqueLink className="mt-14 sm:mt-20" />
    </Section>
  )
}
