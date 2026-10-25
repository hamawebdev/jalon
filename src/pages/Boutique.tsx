// Boutique: pricing cards, the 1-click order configurator (« BOUTIQUE EXPRESS · COMMANDE EN 3 CLICS »), reassurance band. Owner: pricing.
// The configurator comes first (it is the page's purpose), then the detail of the plans, the trust bar and the
// reassurance band.
import { Badge, Container, Highlight, Section, SectionHeader } from '@/components/kit'
import { PageMeta } from '@/components/site/PageMeta'
import { OrderConfigurator, PlanCards, ReassuranceBand, TrustBar } from '@/features/pricing'
import { useT } from '@/i18n/context'

export default function Boutique() {
  const t = useT()
  const b = t.pricing.boutique
  const p = t.pricing.plans
  return (
    <>
      <PageMeta page="boutique" />
      <section className="bg-mist pb-16 pt-10 sm:pb-24 sm:pt-16">
        <Container>
          <header className="mx-auto mb-10 flex max-w-3xl flex-col items-center gap-4 text-center sm:mb-12">
            <Badge>{b.badge}</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <Highlight text={b.title} />
            </h1>
            <p className="text-base text-slate sm:text-lg">{b.intro}</p>
          </header>
          <OrderConfigurator headingLevel="h2" />
          <TrustBar className="mt-6" />
        </Container>
      </section>
      <Section>
        <SectionHeader badge={p.badge} title={p.title} highlight={p.highlight} subtitle={p.subtitle} />
        <PlanCards />
        <ReassuranceBand className="mt-12 lg:mt-16" />
      </Section>
    </>
  )
}
