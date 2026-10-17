import { FactScope, TextLink, WhatsAppButton } from '@/components/brand'
import { FACTS, present } from '@/lib/facts'
import { whatsappButtonProps } from '@/lib/site'
import { Email, EmailButton, Fact } from '../theme/facts-ui'
import { Callout, DocLayout, H2, HelpCard, P, Steps, Table } from './shared'

// /politique-de-remboursement/ (copy remboursement.md, INVENTORY §4.15): when we refund, the schedule only if the
// owner refunds by elapsed time, the link with the 14-day withdrawal right, how to ask, and the help card.
export function RefundContent() {
  const terms = FACTS.refund.terms
  const schedule = present(FACTS.refund.schedule) ? FACTS.refund.schedule : null
  return (
    <DocLayout
      title="Politique de remboursement"
      lead={<p>Quand nous vous remboursons, et comment le demander.</p>}
      version={{ date: FACTS.legal.lastUpdated.refund, fact: 'legal.lastUpdated.refund' }}
    >
      <H2 id="principe">Dans quels cas nous remboursons</H2>
      <P>
        Nous vous remboursons dans les cas suivants&nbsp;: <Fact value={terms.cases} what="cas de remboursement" fact="refund.terms.cases" tail="." />
      </P>
      <P>
        Si le service ne fonctionne pas sur votre appareil, écrivez-nous d’abord&nbsp;: on cherche une solution avec vous. Si nous n’en
        trouvons pas ensemble, nous appliquons ces conditions.
      </P>
      <P>
        Cette politique s’ajoute à vos droits légaux, sans les réduire&nbsp;: le droit de rétractation et la garantie légale de conformité
        s’appliquent dans tous les cas prévus par la loi.
      </P>

      {schedule && (
        <>
          <H2 id="bareme">Montant selon le temps écoulé</H2>
          <P>Le montant remboursé dépend du temps écoulé&nbsp;:</P>
          <Table caption="Barème de remboursement" head={['Temps écoulé', 'Part remboursée']} rows={schedule.map((r) => [r.period, r.share])} />
          <P>Ce barème ne réduit jamais un remboursement dû au titre du droit de rétractation.</P>
        </>
      )}

      <Callout icon="ti-info-circle" title="Vos 14 jours de rétractation" id="retractation">
        <p>
          Après une commande en ligne, vous avez 14&nbsp;jours pour vous rétracter. Nous vous remboursons alors la totalité de la somme payée,
          au plus tard 14&nbsp;jours après votre demande. Si vous avez demandé un démarrage immédiat, ce droit prend fin dès que vos accès sont
          activés. Sans cette demande&nbsp;: <Fact value={FACTS.withdrawal.terms} what="règle sans démarrage immédiat" fact="withdrawal.terms" tail="." />
        </p>
        <p className="mt-3">
          <TextLink to="/conditions-generales-de-vente/#retractation" standalone className="-my-2.5 font-semibold">
            Voir le droit de rétractation
          </TextLink>
        </p>
      </Callout>

      <H2 id="demande">Demander un remboursement</H2>
      <Steps
        items={[
          {
            title: 'Écrivez-nous',
            text: (
              <>
                À <Email tail="," /> avec la date de votre commande, la formule et ce qui ne va pas.
              </>
            ),
          },
          {
            title: 'On regarde avec vous',
            text: (
              <>
                Si le problème vient d’un réglage, on vous propose d’abord de le régler ensemble.
                <FactScope facts="support.responseTime">
                  {' '}
                  Réponse habituelle&nbsp;: <Fact value={FACTS.support.responseTime} what="délai de réponse" fact="support.responseTime" tail="." />
                </FactScope>
              </>
            ),
          },
          { title: 'Nous vous répondons par écrit', text: 'Nous vous disons si le remboursement est accordé, et de quel montant.' },
          {
            title: 'Le remboursement',
            text: <Fact value={terms.payback} what="délai et moyen de remboursement" fact="refund.terms.payback" />,
          },
        ]}
      />
      <P>
        Pour une rétractation, un simple message suffit, sans justification&nbsp;: nous vous remboursons au plus tard 14&nbsp;jours après
        l’avoir reçu, avec le moyen de paiement utilisé pour la commande.
      </P>

      <HelpCard
        id="aide-remboursement"
        heading={'Un doute sur votre situation ?'}
        actions={
          <>
            <EmailButton />
            <WhatsAppButton {...whatsappButtonProps()} size="md" />
          </>
        }
      >
        <p>Dites-nous ce qui se passe&nbsp;: on vous explique ce qui s’applique à votre commande.</p>
        <dl className="mt-4 grid gap-1.5 text-small">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <dt className="text-ink-muted">E-mail&nbsp;:</dt>
            <dd className="m-0">
              <Email standalone />
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <dt className="text-ink-muted">WhatsApp&nbsp;:</dt>
            <dd className="m-0">
              <Fact value={FACTS.support.whatsapp} what="numéro WhatsApp" fact="support.whatsapp" />
            </dd>
          </div>
        </dl>
      </HelpCard>
    </DocLayout>
  )
}
