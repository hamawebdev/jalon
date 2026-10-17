import { FactScope, IndexItem, IndexList, Kw, Pending, Section, SectionHead, anyInScope, cardClass, inScope } from '@/components/brand'
import { FACTS, formatCount, present } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { Fact } from '../theme/facts-ui'
import { packShown } from './pack'

// /revendeur/ › reseller-model: how reselling works, in three real steps, then the credit-cost table (the owner's
// reseller durations, not the consumer plan list) and the test-account allowance. On the published site the table
// (with its caption) and the test-account line each wait for their fact.
export function ResellerModel() {
  const costs = FACTS.reseller.creditCosts
  const table = inScope('reseller.creditCosts')
  return (
    <Section zone="paper" dataSection="reseller-model" continues>
      <SectionHead
        eyebrow="Fonctionnement"
        title={
          <>
            La revente en <Kw>trois étapes</Kw>
          </>
        }
      />
      <IndexList className="mt-head">
        <IndexItem index="01" title="Achetez des crédits">
          Les crédits s’achètent par pack.{packShown() && ' Le pack de départ est présenté juste en dessous.'}
        </IndexItem>
        <IndexItem index="02" title="Créez les abonnements">
          Chaque abonnement créé dans votre espace revendeur utilise des crédits, selon sa durée.
        </IndexItem>
        <IndexItem index="03" title="Remettez les accès">
          Vous transmettez ses accès à chaque client, dans le respect des règles de revente.
        </IndexItem>
      </IndexList>

      {anyInScope(['reseller.creditCosts', 'reseller.trialAccounts']) && (
      <div className="mt-section-sm grid gap-x-grid gap-y-6 lg:grid-cols-12">
        {table && (
        // The table in one white card: its caption as the card's title, the column heads on the paper tint, rows
        // divided by hairlines and clipped to the corners.
        <div className="min-w-0 overflow-hidden rounded-card border border-z-line bg-z-card lg:col-span-7">
          <table className="w-full border-collapse font-sans text-small text-z-body">
            <caption className="px-5 pt-5 pb-4 text-left font-display text-title text-z-fg md:px-6">Crédits utilisés par durée d’abonnement</caption>
            <thead>
              <tr className="border-t border-z-line bg-z-raised text-left text-meta font-semibold text-z-soft">
                <th scope="col" className="py-3 pr-4 pl-5 font-semibold md:pl-6">
                  Durée de l’abonnement
                </th>
                <th scope="col" className="py-3 pr-5 font-semibold md:pr-6">
                  Crédits utilisés
                </th>
              </tr>
            </thead>
            <tbody>
              {present(costs) ? (
                costs.map((c) => (
                  <tr key={c.months} className="border-t border-z-line">
                    <td className="py-3.5 pr-4 pl-5 md:pl-6">{`${c.months} mois`}</td>
                    <td className="py-3.5 pr-5 font-display font-bold text-z-fg tabular-nums md:pr-6">{formatCount(c.credits)}</td>
                  </tr>
                ))
              ) : (
                <tr className="border-t border-z-line">
                  <td colSpan={2} className="px-5 py-4 md:px-6">
                    <Pending variant="block" what="crédits par durée d’abonnement" fact="reseller.creditCosts" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        )}
        <FactScope facts="reseller.trialAccounts">
          {/* A slim card beside the table (16px corners), or alone on the row. */}
          <p className={cn(cardClass.inner, 'px-5 py-4 font-sans text-copy text-z-soft md:px-6', table ? 'lg:col-span-5 lg:self-start' : 'lg:col-span-12')}>
            Comptes de test&nbsp;: <Fact value={FACTS.reseller.trialAccounts} what="comptes de test autorisés" fact="reseller.trialAccounts" tail="." />
          </p>
        </FactScope>
      </div>
      )}
    </Section>
  )
}
