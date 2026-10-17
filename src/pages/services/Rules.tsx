import { IndexItem, IndexList, Kw, Section, SectionHead, TextLink, scoped } from '@/components/brand'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { Fact } from '../theme/facts-ui'

// /revendeur/ › reseller-rules: the resale conditions, up front (also in the CGU). Three rows today; the owner
// may add up to two more. On the published site a rule waits for its fact, and the section needs two rules: a list
// of one goes with its heading (copy README §10.4).
export function ResellerRules() {
  const rules = FACTS.reseller.rules
  const rows = scoped(
    [
      { title: 'Où revendre', value: rules.channels, what: 'canaux de revente autorisés', fact: 'reseller.rules.channels' },
      { title: 'Vos prix', value: rules.pricing, what: 'liberté de fixer vos prix', fact: 'reseller.rules.pricing' },
      { title: 'L’aide à vos clients', value: rules.support, what: 'aide à vos clients', fact: 'reseller.rules.support' },
    ],
    (row) => ({ [row.fact]: row.value }),
  )
  if (rows.length < 2) return null
  return (
    <Section zone="plate" dataSection="reseller-rules">
      <SectionHead
        eyebrow="Règles de revente"
        title={
          <>
            Les règles, <Kw>avant de vous lancer</Kw>.
          </>
        }
        lead="Elles s’appliquent à chaque vente et figurent aussi dans nos conditions d’utilisation."
      />
      {/* Two rules share the row in halves: no empty third column. */}
      <IndexList className={cn('mt-head', rows.length === 2 && 'lg:grid-cols-2')}>
        {rows.map((row) => (
          <IndexItem key={row.fact} title={row.title}>
            <Fact value={row.value} what={row.what} fact={row.fact} />
          </IndexItem>
        ))}
      </IndexList>
      <p className="mt-10">
        <TextLink to="/conditions-utilisation/" standalone className="-my-2.5 font-sans text-[0.9375rem] font-semibold">
          Lire les conditions d’utilisation
        </TextLink>
      </p>
    </Section>
  )
}
