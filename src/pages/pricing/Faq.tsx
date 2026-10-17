import { FactScope, FaqItem, FaqList, Kw, Section, SectionHead, TextLink } from '@/components/brand'
import { FACTS, endOfTerm, present, renewalPath } from '@/lib/facts'
import { deliveryChannelText, paymentMethodsText, screensText } from '../theme/facts-text'
import { Fact, WaLink } from '../theme/facts-ui'

// /abonnements/ › plans-faq: the buying questions, in the canonical wording of /aide/ (GLOSSARY §7). The trial
// row shows only once the owner offers a trial (APPROVAL §2.4). On the published site a sentence that states an
// optional fact not given yet is left out (abonnements.md, « launch » lines).
export function PlansFaq() {
  const trial = FACTS.trial.terms
  return (
    <Section zone="paper" dataSection="plans-faq" containerClassName="grid gap-x-grid gap-y-10 lg:grid-cols-12">
      <SectionHead
        className="lg:col-span-4"
        sticky
        title={
          <>
            Prix, paiement, <Kw>activation</Kw>
          </>
        }
      >
        <p className="mt-6">
          <TextLink to="/aide/" standalone className="-my-2.5 font-sans text-[0.9375rem] font-semibold">
            Voir toutes les questions
          </TextLink>
        </p>
      </SectionHead>
      <FaqList className="lg:col-span-8">
        <FaqItem question={'Qu’est-ce qui change d’une formule à l’autre\u00a0?'} defaultOpen>
          La durée et le prix total, d’abord.{' '}
          <FactScope facts="plans.features.differences">
            Autres différences&nbsp;:{' '}
            <Fact value={FACTS.plans.features.differences} what="différences entre les formules" fact="plans.features.differences" tail="." />{' '}
          </FactScope>
          Ce que toutes les formules contiennent est listé une fois, sous les cartes.
        </FaqItem>
        <FaqItem question={'Comment puis-je payer ?'}>
          Moyens de paiement acceptés&nbsp;: <Fact value={paymentMethodsText()} what="moyens de paiement" fact="payment.methods" tail="." /> Le prix
          affiché sur chaque formule est le prix total pour toute la durée,{' '}
          <Fact value={FACTS.pricing.vat} what="mention TVA" fact="pricing.vat" tail="." />
          <FactScope facts="pricing.currency">
            {' '}
            Devise&nbsp;: <Fact value={FACTS.pricing.currency} what="devise" fact="pricing.currency" tail="." />
          </FactScope>
        </FaqItem>
        <FaqItem question={'Combien de temps après le paiement puis-je regarder ?'}>
          Délai entre le paiement et l’envoi de vos accès&nbsp;:{' '}
          <Fact value={FACTS.delivery.delay} what="délai d’activation" fact="delivery.delay" tail="." /> Ils arrivent par{' '}
          <Fact value={deliveryChannelText()} what="canal d’envoi" fact="delivery.channel" tail="." /> Rien reçu passé ce délai&nbsp;?
          Écrivez-nous sur <WaLink />.
        </FaqItem>
        <FaqItem question={'Sur combien d’écrans puis-je regarder en même temps ?'}>
          Écrans en même temps&nbsp;: <Fact value={screensText()} what="nombre d’écrans simultanés" fact="plans.screens.count" tail="." /> Installer
          l’application sur plusieurs appareils ne revient pas à regarder sur plusieurs écrans à la fois.{' '}
          <FactScope facts="usage.sharing">
            Installations et partage&nbsp;:{' '}
            <Fact value={FACTS.usage.sharing} what="règles d’installation et de partage" fact="usage.sharing" tail="." />{' '}
          </FactScope>
          Un doute pour votre foyer&nbsp;? Décrivez-nous vos écrans sur <WaLink />.
        </FaqItem>
        <FaqItem question={'Que se passe-t-il à la fin de mon abonnement ?'}>
          À la fin de la durée payée&nbsp;: <Fact value={endOfTerm()} what="renouvellement automatique ou non" fact="plans.autoRenew" tail="." />{' '}
          Pour continuer, renouvelez sur la <TextLink to={renewalPath()}>page Renouvellement</TextLink> avec votre identifiant.
        </FaqItem>
        <FaqItem question={'Puis-je demander un remboursement ?'}>
          Si le service ne fonctionne pas sur votre appareil et que nous ne trouvons pas de solution ensemble, nous appliquons
          notre <TextLink to="/politique-de-remboursement/">politique de remboursement</TextLink>&nbsp;:{' '}
          <Fact value={FACTS.refund.terms.summary} what="conditions de remboursement" fact="refund.terms.summary" tail="." />
        </FaqItem>
        {present(FACTS.trial.offered) && (
          <FaqItem question={'Puis-je essayer avant de m’abonner ?'}>
            <FactScope facts={['trial.terms.duration', 'trial.terms.price']} fallback={<>Oui&nbsp;: un essai est proposé.</>}>
              Oui&nbsp;: un essai de <Fact value={trial.duration} what="durée de l’essai" fact="trial.terms.duration" tail="," />{' '}
              <Fact value={trial.price} what="prix de l’essai" fact="trial.terms.price" tail="." />
            </FactScope>{' '}
            <FactScope facts="trial.terms.how">
              Pour l’obtenir&nbsp;: <Fact value={trial.how} what="démarche" fact="trial.terms.how" tail="." />{' '}
            </FactScope>
            Il sert à vérifier que tout fonctionne sur votre appareil avant de choisir une formule.
          </FaqItem>
        )}
      </FaqList>
    </Section>
  )
}
