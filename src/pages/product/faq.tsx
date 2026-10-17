import type { ReactNode } from 'react'
import { FactScope, type FactDeps } from '@/components/brand'
import { FACTS, renewalPath } from '@/lib/facts'
import { BRAND } from '@/lib/site'
import { F, NB } from './facts-text'
import { Fact, MailText, PageLink, WaNumber, WaText } from './shared'

// The FAQ rows of the home, plan and renewal pages. Each topic has one question and one answer across the site
// (copy GLOSSARY §7), word for word as on /aide/; only a link target or a sentence tied to the page may change.
//
// Launch mode (APPROVAL §2c, the « ↳ launch » lines of the copy docs): a sentence that rests on a missing optional
// fact is left out, with the space that joins it to its neighbours (<FactScope>); a row whose question rests on
// one carries `facts` and is filtered by scoped() before the list is drawn. Review mode renders every word.

/** `facts`: the optional owner facts the whole entry needs (copy « omit entry »); read by the kit's scoped(). */
export type FaqRow = { id: string; q: string; a: ReactNode; facts?: FactDeps }

const HELP = '/aide/'
const APPS = '/applications/'

/** Topic 29: devices. */
export const FAQ_DEVICES: FaqRow = {
  id: 'appareils-compatibles',
  q: `Sur quels appareils puis-je regarder${NB}?`,
  a: (
    <>
      Appareils compatibles{NB}: <Fact value={F.devices} what="appareils compatibles" fact="devices.supported" tail="." /> Chaque famille a
      son guide sur la <PageLink to={APPS}>page Applications</PageLink>. Un doute sur le vôtre{NB}? Indiquez-nous la marque et le
      modèle de votre appareil{NB}: nous vous dirons quelle application installer et comment la régler.
    </>
  ),
}

/** Topic 9: activation delay. */
export const FAQ_DELAY: FaqRow = {
  id: 'delai-activation',
  q: `Combien de temps après le paiement puis-je regarder${NB}?`,
  a: (
    <>
      Délai entre le paiement et l’envoi de vos accès{NB}:{' '}
      <Fact value={FACTS.delivery.delay} what="délai d’activation" fact="delivery.delay" tail="." /> Ils arrivent par{' '}
      <Fact value={F.deliveryChannel} what="canal d’envoi" fact="delivery.channel" tail="." /> Rien reçu passé ce délai{NB}? Écrivez-nous
      sur <WaText />.
    </>
  ),
}

/** Topic 14: simultaneous screens. */
export const FAQ_SCREENS: FaqRow = {
  id: 'ecrans-simultanes',
  q: `Sur combien d’écrans puis-je regarder en même temps${NB}?`,
  a: (
    <>
      Écrans en même temps{NB}: <Fact value={F.screens} what="nombre d’écrans simultanés" fact="plans.screens.count" tail="." figure /> Installer
      l’application sur plusieurs appareils ne revient pas à regarder sur plusieurs écrans à la fois.
      <FactScope facts="usage.sharing">
        {' '}
        Installations et partage{NB}:{' '}
        <Fact value={FACTS.usage.sharing} what="règles d’installation et de partage" fact="usage.sharing" tail="." />
      </FactScope>{' '}
      Un doute pour votre foyer{NB}? Décrivez-nous vos écrans sur <WaText />.
    </>
  ),
}

/** Topic 2: payment methods. */
export const FAQ_PAYMENT: FaqRow = {
  id: 'moyens-de-paiement',
  q: `Comment puis-je payer${NB}?`,
  a: (
    <>
      Moyens de paiement acceptés{NB}: <Fact value={F.paymentNames} what="moyens de paiement" fact="payment.methods" tail="." /> Le prix
      affiché sur chaque formule est le prix total pour toute la durée,{' '}
      <Fact value={FACTS.pricing.vat} what="mention TVA" fact="pricing.vat" tail="." /> Une question sur le paiement{NB}? Écrivez-nous
      avant de commander.
    </>
  ),
}

/** Topic 19: trial (only with a trial, trial.offered). */
export const FAQ_TRIAL: FaqRow = {
  id: 'essai',
  q: `Puis-je essayer avant de m’abonner${NB}?`,
  a: (
    <>
      <FactScope facts={['trial.terms.duration', 'trial.terms.price']} fallback={<>Oui{NB}: un essai est proposé.</>}>
        Oui{NB}: un essai de <Fact value={FACTS.trial.terms.duration} what="durée de l’essai" fact="trial.terms.duration" tail="," />{' '}
        <Fact value={FACTS.trial.terms.price} what="prix de l’essai" fact="trial.terms.price" tail="." />
      </FactScope>
      <FactScope facts="trial.terms.how">
        {' '}
        Pour l’obtenir{NB}: <Fact value={FACTS.trial.terms.how} what="démarche" fact="trial.terms.how" tail="." />
      </FactScope>{' '}
      Il sert à vérifier que tout fonctionne sur votre appareil avant de choisir une formule.
    </>
  ),
}

/** Topic 36: abroad. */
export const FAQ_ABROAD: FaqRow = {
  id: 'etranger',
  facts: 'usage.abroad',
  q: `Puis-je regarder depuis l’étranger${NB}?`,
  a: (
    <>
      À l’étranger{NB}: <Fact value={FACTS.usage.abroad} what="conditions d’usage à l’étranger" fact="usage.abroad" tail="." /> Sur
      place, la qualité dépend de la connexion{NB}: un Wi-Fi d’hôtel partagé peut la limiter. Un doute avant de partir{NB}?
      Demandez-nous sur <WaText />.
    </>
  ),
}

/** Topic 17: renewal. */
export const FAQ_RENEW: FaqRow = {
  id: 'renouveler',
  q: `Comment renouveler mon abonnement${NB}?`,
  a: (
    <>
      Sur la <PageLink to={renewalPath()}>page Renouvellement</PageLink>, choisissez la durée, puis indiquez votre identifiant à
      la commande.
      <FactScope facts="plans.renewal.identifier">
        {' '}
        Identifiant à indiquer{NB}:{' '}
        <Fact
          value={FACTS.plans.renewal.identifier}
          what="identifiant à indiquer et où le trouver"
          fact="plans.renewal.identifier"
          tail="."
        />
      </FactScope>
      <FactScope facts="plans.renewal.carryOver">
        {' '}
        Temps restant{NB}:{' '}
        <Fact value={FACTS.plans.renewal.carryOver} what="report des jours restants" fact="plans.renewal.carryOver" tail="." />
      </FactScope>
    </>
  ),
}

/** Topic 42: contact. */
export const FAQ_CONTACT: FaqRow = {
  id: 'joindre-equipe',
  q: `Comment joindre l’équipe ${BRAND}${NB}?`,
  a: (
    <>
      Écrivez-nous sur <WaText /> au <WaNumber /> ou par e-mail à <MailText tail="." /> Horaires{NB}:{' '}
      <Fact value={FACTS.support.hours} what="horaires du support" fact="support.hours" tail="." />
      <FactScope facts="support.responseTime">
        {' '}
        Réponse habituelle{NB}: <Fact value={FACTS.support.responseTime} what="délai de réponse" fact="support.responseTime" tail="." />
      </FactScope>
    </>
  ),
}

/** Topic 25: picture quality. */
export const FAQ_QUALITY: FaqRow = {
  id: 'qualite-image',
  facts: 'quality.levels',
  q: `En quelle qualité d’image puis-je regarder${NB}?`,
  a: (
    <>
      Selon les programmes, l’image est proposée en <Fact value={F.qualities} what="qualités d’image" fact="quality.levels" tail="." />
      <FactScope facts="internet.minSpeed">
        {' '}
        Débit conseillé{NB}: <Fact value={FACTS.internet.minSpeed} what="débit conseillé" fact="internet.minSpeed" tail="." />
      </FactScope>{' '}
      Si l’image saccade, voyez <PageLink to={`${HELP}#image-saccadee`}>nos conseils de dépannage</PageLink>.
    </>
  ),
}

/** Topic 15: changing duration mid-term. */
export const FAQ_CHANGE: FaqRow = {
  id: 'changer-de-duree',
  q: `Puis-je changer de durée en cours d’abonnement${NB}?`,
  a: (
    <>
      <FactScope facts="plans.upgrade">
        En cours d’abonnement{NB}:{' '}
        <Fact value={FACTS.plans.upgrade} what="changement de durée et temps restant" fact="plans.upgrade" tail="." />{' '}
      </FactScope>
      Écrivez-nous sur <WaText /> en indiquant votre formule actuelle{NB}: on vous dit ce qui s’applique dans votre cas.
    </>
  ),
}

/** Topic 16: end of the subscription; the last sentence depends on the page. */
export function faqEnd(next: ReactNode): FaqRow {
  return {
    id: 'fin-abonnement',
    q: `Que se passe-t-il à la fin de mon abonnement${NB}?`,
    a: (
      <>
        À la fin de la durée payée{NB}: <Fact value={F.endOfTerm} what="renouvellement automatique ou non" fact="plans.autoRenew" tail="." />{' '}
        {next}
      </>
    ),
  }
}
