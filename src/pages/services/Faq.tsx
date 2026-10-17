import type { ReactNode } from 'react'
import { FactScope, FaqItem, FaqList, Kw, Section, SectionHead, TextA, scoped } from '@/components/brand'
import type { FactDeps } from '@/components/brand'
import { FACTS, formatCount, formatEuro, present } from '@/lib/facts'
import { Fact } from '../theme/facts-ui'

/** « 3 mois : 1 crédit, 6 mois : 2 crédits » from reseller.creditCosts. */
function costsText() {
  const costs = FACTS.reseller.creditCosts
  if (!present(costs)) return null
  return costs
    .map((c) => `${c.months} mois : ${formatCount(c.credits)} ${c.credits > 1 ? 'crédits' : 'crédit'}`)
    .join(', ')
}

type Row = { q: string; a: ReactNode; facts?: FactDeps }

// /revendeur/ › reseller-faq: topics 46 to 51 (FAQ-TOPICS), first row open. Each slot follows a label. On the
// published site a row waits for the fact it states (revendeur.md, « launch » lines), and the section needs two
// rows: a list of one goes with its heading (copy README §10.4).
export function ResellerFaq() {
  const pack = FACTS.reseller.entryPack
  const rules = FACTS.reseller.rules
  const rows = scoped<Row>([
    {
      q: 'Comment devenir revendeur\u00a0?',
      facts: ['reseller.entryPack.credits', 'reseller.entryPack.price'],
      a: (
        <>
          Vous commencez par le pack de départ&nbsp;:{' '}
          <Fact value={formatCount(pack.credits)} what="nombre" fact="reseller.entryPack.credits" unit="crédits" /> pour{' '}
          <Fact value={formatEuro(pack.price)} what="prix du pack" fact="reseller.entryPack.price" tail="." />{' '}
          <FactScope facts="reseller.entryPack.condition">
            Conditions&nbsp;: <Fact value={pack.condition} what="conditions du pack" fact="reseller.entryPack.condition" tail="." />{' '}
          </FactScope>
          Une question avant de vous lancer&nbsp;? Écrivez-nous avec le <TextA href="#contact-revendeur">formulaire en bas de cette page</TextA>.
        </>
      ),
    },
    {
      q: 'Comment fonctionnent les crédits\u00a0?',
      facts: 'reseller.creditCosts',
      a: (
        <>
          Chaque abonnement que vous créez utilise des crédits, selon sa durée&nbsp;:{' '}
          <Fact value={costsText()} what="crédits par durée d’abonnement" fact="reseller.creditCosts" tail="." /> Le tableau plus haut
          sur cette page donne le détail.
        </>
      ),
    },
    {
      q: 'Puis-je créer des comptes de test\u00a0?',
      facts: 'reseller.trialAccounts',
      a: (
        <>
          Comptes de test&nbsp;:{' '}
          <Fact value={FACTS.reseller.trialAccounts} what="comptes de test autorisés" fact="reseller.trialAccounts" tail="." /> Un compte de
          test sert à vérifier que tout fonctionne sur l’appareil de votre client, avant qu’il achète.
        </>
      ),
    },
    {
      q: 'Où puis-je revendre\u00a0?',
      facts: 'reseller.rules.channels',
      a: (
        <>
          Canaux autorisés&nbsp;: <Fact value={rules.channels} what="canaux de revente autorisés" fact="reseller.rules.channels" tail="." />{' '}
          Avant de publier une offre sur un nouveau canal, demandez-nous&nbsp;: on vous confirme ce qui est possible.
        </>
      ),
    },
    {
      q: 'Qui aide mes clients en cas de souci\u00a0?',
      facts: 'reseller.rules.support',
      a: (
        <>
          Aide à vos clients&nbsp;: <Fact value={rules.support} what="aide à vos clients" fact="reseller.rules.support" tail="." />{' '}
          <FactScope
            facts="reseller.contact"
            fallback={
              <>
                Pour vos propres questions de revendeur, écrivez-nous avec le{' '}
                <TextA href="#contact-revendeur">formulaire en bas de cette page</TextA>.
              </>
            }
          >
            Pour vos propres questions de revendeur, écrivez-nous&nbsp;:{' '}
            <Fact value={FACTS.reseller.contact} what="contact revendeurs" fact="reseller.contact" tail="." />
          </FactScope>
        </>
      ),
    },
    {
      q: 'Mes crédits ont-ils une date limite\u00a0?',
      facts: 'reseller.creditExpiry',
      a: (
        <>
          Validité des crédits&nbsp;:{' '}
          <Fact value={FACTS.reseller.creditExpiry} what="durée de validité des crédits" fact="reseller.creditExpiry" tail="." /> En cas
          de doute sur votre solde, écrivez-nous avec votre identifiant revendeur&nbsp;: on vérifie avec vous.
        </>
      ),
    },
  ])
  if (rows.length < 2) return null
  return (
    <Section zone="paper" dataSection="reseller-faq" containerClassName="grid gap-x-grid gap-y-10 lg:grid-cols-12">
      <SectionHead
        className="lg:col-span-4"
        sticky
        eyebrow="Questions de revendeurs"
        title={
          <>
            Vos questions sur <Kw>la revente</Kw>
          </>
        }
      />
      <FaqList className="lg:col-span-8">
        {rows.map((row, i) => (
          <FaqItem key={row.q} question={row.q} defaultOpen={i === 0}>
            {row.a}
          </FaqItem>
        ))}
      </FaqList>
    </Section>
  )
}
