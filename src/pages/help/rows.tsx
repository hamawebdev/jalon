import type { ReactNode } from 'react'
import { FactScope, TextA, TextLink, inScope, scoped, switchedOn } from '@/components/brand'
import type { FactDeps } from '@/components/brand'
import { CREDENTIAL_LABEL, FACTS, endOfTerm, familiesInText, formatList, present, renewalPath, supportedFamilies, type DeviceFamily } from '@/lib/facts'
import {
  checkoutModeSentence,
  deliveryChannelText,
  liveCountText,
  paymentMethodsText,
  qualityText,
  screensText,
  vodCountText,
} from '../theme/facts-text'
import { BRAND, RESELLER_ON } from '@/lib/site'
import { linkMode } from '../checkout/handoff'
import { Email, Fact, WaLink, WaNumber } from '../theme/facts-ui'

// Questions and answers of /aide/ (copy aide.md › help-faq), grouped by topic, in the canonical wording of
// GLOSSARY §7. A row whose existence is an owner fact renders only when present() confirms it (APPROVAL §2.4).
//
// Launch mode (aide.md, « launch » lines): a row names the optional facts it cannot do without (`facts`: all of
// them; `anyOf`: one is enough) and is left out of the published site while they are missing; inside an answer, a
// sentence that states a missing optional fact is left out, or its fact-free wording is used. HELP_GROUPS holds
// what is left: a group with no row goes with its card, and the count on each card follows the rows rendered.

export type HelpRow = {
  id: string
  q: string
  a: ReactNode
  /** Optional facts the row needs, all of them (« launch a / b: omit entry »). */
  facts?: FactDeps
  /** Optional facts of which one is enough (« launch a + b: omit entry »). */
  anyOf?: FactDeps
}
export type HelpGroup = {
  /** Anchor of the group block (help-topics links to it). */
  id: string
  title: string
  /** help-topics card text. */
  text: string
  rows: HelpRow[]
}

const nb = (s: string) => s.replace(/ ([:;?!])/g, ' $1')

const trial = present(FACTS.trial.offered)
const methods = FACTS.payment.methods
const hasCard = present(methods) && methods.some((m) => m.kind === 'card')
const hasOther = present(methods) && methods.some((m) => m.kind !== 'card')
const channel = FACTS.community.channel
// An announcements channel exists: yes = on; no = off; not answered = on in review mode (its marker shows), off on the
// published site, where the answer then sends to WhatsApp.
const channelOn = switchedOn('community.channel')
const supported = FACTS.devices.supported
// The contact form asks for a subject only once the owner lists the subjects; sentences that name one follow it (GLOSSARY §6).
const hasTopics = present(FACTS.support.topics)
// A link mode hands each order over with its reference (APPROVAL §2e): two answers say so. null today and in the
// message mode, whose answers stay as they are.
const handoffMode = linkMode()

/** « Appareils compatibles : … »: the supported families in their sentence forms (GLOSSARY §3), never the heading names. */
const devicesText = familiesInText(supportedFamilies())

/**
 * A device family is on show: every family until the owner lists the supported ones (each then shows its marker),
 * and only the listed ones afterwards, as on /applications/ (shownFamilies()). A question about a family the owner
 * does not list goes with its links to that family's guide: an answered list never leaves a marker behind.
 */
const familyOn = (family: DeviceFamily) => !present(supported) || present(supported[family])
const computerOn = familyOn('ordinateur')
const consoleOn = familyOn('console')

const order: HelpGroup = {
  id: 'commande-et-paiement',
  title: 'Commander et payer',
  text: inScope('invoice.delivery') ? 'Étapes de la commande, paiement, prix et facture.' : 'Étapes de la commande, paiement et prix.',
  rows: [
    {
      id: 'passer-commande',
      q: nb('Comment passer commande ?'),
      a: (
        <>
          Choisissez votre formule&nbsp;: la page de commande vous demande alors vos coordonnées.{' '}
          <Fact value={checkoutModeSentence()} what="comment la commande est finalisée et payée" fact="checkout.mode" />
          {handoffMode === 'externalShop' && (
            <>
              {' '}
              En appuyant sur «&nbsp;Continuer vers le paiement&nbsp;», vous nous transmettez votre commande avec sa référence, puis vous ouvrez notre
              boutique en ligne.
            </>
          )}
          {(handoffMode === 'hostedPage' || handoffMode === 'paymentLinks') && (
            <>
              {' '}
              En appuyant sur «&nbsp;Payer ma commande&nbsp;», vous nous transmettez votre commande avec sa référence, puis vous ouvrez la page de
              paiement.
            </>
          )}{' '}
          Dès réception du paiement, on prépare vos accès.
        </>
      ),
    },
    {
      id: 'moyens-de-paiement',
      q: nb('Comment puis-je payer ?'),
      a: (
        <>
          Moyens de paiement acceptés&nbsp;: <Fact value={paymentMethodsText()} what="moyens de paiement" fact="payment.methods" tail="." /> Le
          prix affiché sur chaque formule est le prix total pour toute la durée,{' '}
          <Fact value={FACTS.pricing.vat} what="mention TVA" fact="pricing.vat" tail="." /> Une question sur le paiement&nbsp;? Écrivez-nous
          avant de commander.
        </>
      ),
    },
    ...(present(methods) && !hasCard
      ? []
      : [
          {
            id: 'paiement-refuse',
            q: nb('Mon paiement par carte est refusé. Que faire ?'),
            a: (
              <>
                Vérifiez d’abord le numéro, la date d’expiration et le code au dos de la carte. Votre banque peut aussi demander une
                validation dans son application&nbsp;: ouvrez-la, puis réessayez. Si le refus persiste, payez autrement ou écrivez-nous sur{' '}
                <WaLink />&nbsp;: on cherche une solution avec vous.
              </>
            ),
          },
        ]),
    ...(hasOther
      ? [
          {
            id: 'autres-moyens-de-paiement',
            q: nb('Puis-je payer autrement que par carte ?'),
            a: (
              <>
                Oui. Voici les moyens acceptés, avec les frais ou remises éventuels&nbsp;:{' '}
                {methods!.map((m) => (m.note ? `${m.name} (${m.note})` : m.name)).join(', ')}. Le montant exact s’affiche toujours dans le
                récapitulatif, avant le paiement.
              </>
            ),
          },
        ]
      : []),
    {
      id: 'securite-du-paiement',
      facts: 'payment.provider',
      q: nb('Qui traite mon paiement, et quelles données conservez-vous ?'),
      a: (
        <>
          Le paiement est traité par <Fact value={FACTS.payment.provider} what="prestataire de paiement" fact="payment.provider" tail="." /> La
          liste des services qui reçoivent vos données, et ce que nous gardons, figure sur la page{' '}
          <TextLink to="/politique-de-confidentialite/#destinataires">Confidentialité</TextLink>.
        </>
      ),
    },
    {
      id: 'prix-ttc-devise',
      q: nb(inScope('pricing.currency') ? 'Les prix sont-ils TTC, et en quelle devise ?' : 'Les prix sont-ils TTC ?'),
      a: (
        <>
          Les prix affichés sont des prix totaux, <Fact value={FACTS.pricing.vat} what="mention TVA" fact="pricing.vat" tail="." />{' '}
          <FactScope facts="pricing.currency">
            Devise&nbsp;: <Fact value={FACTS.pricing.currency} what="devise" fact="pricing.currency" tail="." />{' '}
          </FactScope>
          Si votre carte est dans une autre devise, votre banque peut ajouter ses propres frais de change.
        </>
      ),
    },
    ...(present(FACTS.promo.codes)
      ? [
          {
            id: 'codes-promo',
            q: nb('Avez-vous des codes promo ?'),
            a: (
              <>
                Quand nous en proposons, le code se saisit sur la page de commande, et la réduction apparaît dans le récapitulatif avant le
                paiement. Où les trouver&nbsp;: {FACTS.promo.codes}.
              </>
            ),
          },
        ]
      : []),
    {
      id: 'facture',
      facts: 'invoice.delivery',
      q: nb('Puis-je obtenir une facture ?'),
      a: (
        <>
          Oui. Pour la recevoir&nbsp;:{' '}
          <Fact value={FACTS.invoice.delivery} what="démarche pour recevoir une facture" fact="invoice.delivery" tail="." /> Elle reprend les
          coordonnées saisies à la commande et la mention de TVA qui s’applique&nbsp;: vérifiez ces coordonnées avant de payer.
        </>
      ),
    },
  ],
}

const credentials = present(FACTS.delivery.credentialTypes) ? formatList(FACTS.delivery.credentialTypes.map((k) => CREDENTIAL_LABEL[k])) : null

const access: HelpGroup = {
  id: 'activation-et-acces',
  title: 'Activation et accès',
  text: 'Délai d’activation, ce que vous recevez, nouvel envoi.',
  rows: [
    {
      id: 'delai-activation',
      q: nb('Combien de temps après le paiement puis-je regarder ?'),
      a: (
        <>
          Délai entre le paiement et l’envoi de vos accès&nbsp;:{' '}
          <Fact value={FACTS.delivery.delay} what="délai d’activation" fact="delivery.delay" tail="." /> Ils arrivent par{' '}
          <Fact value={deliveryChannelText()} what="canal d’envoi" fact="delivery.channel" tail="." /> Rien reçu passé ce délai&nbsp;?
          Écrivez-nous sur <WaLink />.
        </>
      ),
    },
    {
      id: 'acces-recus',
      q: nb('Qu’est-ce que je reçois après ma commande ?'),
      a: (
        <>
          <FactScope
            facts="delivery.credentialTypes"
            fallback={
              <>
                Vous recevez vos accès par <Fact value={deliveryChannelText()} what="canal d’envoi" fact="delivery.channel" tail="." />
              </>
            }
          >
            Vous recevez <Fact value={credentials} what="type d’accès" fact="delivery.credentialTypes" /> par{' '}
            <Fact value={deliveryChannelText()} what="canal d’envoi" fact="delivery.channel" tail="." />
          </FactScope>{' '}
          La page Applications explique{' '}
          <TextLink to="/applications/#acces">à quoi sert chaque élément et où le saisir</TextLink>. Gardez ce message&nbsp;: il vous resservira
          pour chaque nouvel appareil.
        </>
      ),
    },
    {
      id: 'rien-recu',
      q: nb('Je n’ai rien reçu. Que faire ?'),
      a: (
        <>
          Vérifiez l’adresse ou le numéro donnés à la commande et, pour un e-mail, le dossier «&nbsp;Indésirables&nbsp;» de votre messagerie.
          Délai habituel&nbsp;: <Fact value={FACTS.delivery.delay} what="délai d’activation" fact="delivery.delay" tail="." /> Passé ce délai,
          écrivez-nous sur <WaLink /> avec l’adresse ou le numéro utilisés pour commander
          {handoffMode ? ', et la référence de commande si vous l’avez notée' : ''}&nbsp;: on vérifie avec vous.
        </>
      ),
    },
    {
      id: 'renvoi-des-acces',
      q: nb('J’ai perdu mes accès. Pouvez-vous me les renvoyer ?'),
      a: (
        <FactScope
          facts="delivery.resend"
          fallback={
            <>
              Oui. Écrivez-nous en indiquant l’adresse e-mail ou le numéro utilisés pour la commande&nbsp;: c’est ainsi qu’on retrouve votre
              abonnement.
            </>
          }
        >
          Oui. Pour les recevoir à nouveau&nbsp;: <Fact value={FACTS.delivery.resend} what="renvoi des accès" fact="delivery.resend" tail="." />{' '}
          Indiquez l’adresse e-mail ou le numéro utilisés pour la commande&nbsp;: c’est ainsi qu’on retrouve votre abonnement.
        </FactScope>
      ),
    },
  ],
}

const plans: HelpGroup = {
  id: 'formules-et-renouvellement',
  title: 'Formules et renouvellement',
  text: inScope('usage.sharing') ? 'Durées, nombre d’écrans, fin d’abonnement, partage.' : 'Durées, nombre d’écrans, fin d’abonnement.',
  rows: [
    {
      id: 'difference-formules',
      q: nb('Qu’est-ce qui change d’une formule à l’autre ?'),
      a: (
        <>
          La durée et le prix total, d’abord.{' '}
          <FactScope facts="plans.features.differences">
            Autres différences&nbsp;:{' '}
            <Fact value={FACTS.plans.features.differences} what="différences entre les formules" fact="plans.features.differences" tail="." />{' '}
          </FactScope>
          La <TextLink to="/abonnements/">page des formules</TextLink> les présente côte à côte, ligne par ligne.
        </>
      ),
    },
    {
      id: 'ecrans-simultanes',
      q: nb('Sur combien d’écrans puis-je regarder en même temps ?'),
      a: (
        <>
          Écrans en même temps&nbsp;: <Fact value={screensText()} what="nombre d’écrans simultanés" fact="plans.screens.count" tail="." /> Installer
          l’application sur plusieurs appareils ne revient pas à regarder sur plusieurs écrans à la fois.{' '}
          <FactScope facts="usage.sharing">
            Installations et partage&nbsp;:{' '}
            <Fact value={FACTS.usage.sharing} what="règles d’installation et de partage" fact="usage.sharing" tail="." />{' '}
          </FactScope>
          Un doute pour votre foyer&nbsp;? Décrivez-nous vos écrans sur <WaLink />.
        </>
      ),
    },
    {
      id: 'changer-de-duree',
      q: nb('Puis-je changer de durée en cours d’abonnement ?'),
      a: (
        <>
          <FactScope facts="plans.upgrade">
            En cours d’abonnement&nbsp;:{' '}
            <Fact value={FACTS.plans.upgrade} what="changement de durée et temps restant" fact="plans.upgrade" tail="." />{' '}
          </FactScope>
          Écrivez-nous sur <WaLink /> en indiquant votre formule actuelle&nbsp;: on vous dit ce qui s’applique dans votre cas.
        </>
      ),
    },
    {
      id: 'fin-abonnement',
      q: nb('Que se passe-t-il à la fin de mon abonnement ?'),
      a: (
        <>
          À la fin de la durée payée&nbsp;: <Fact value={endOfTerm()} what="renouvellement automatique ou non" fact="plans.autoRenew" tail="." /> Pour
          continuer, renouvelez sur la <TextLink to={renewalPath()}>page Renouvellement</TextLink> avec votre identifiant.
        </>
      ),
    },
    {
      id: 'renouveler',
      q: nb('Comment renouveler mon abonnement ?'),
      a: (
        <>
          Sur la <TextLink to={renewalPath()}>page Renouvellement</TextLink>, choisissez la durée, puis indiquez votre identifiant à la commande.
          <FactScope facts="plans.renewal.identifier">
            {' '}
            Identifiant à indiquer&nbsp;:{' '}
            <Fact value={FACTS.plans.renewal.identifier} what="identifiant à indiquer et où le trouver" fact="plans.renewal.identifier" tail="." />
          </FactScope>
          <FactScope facts="plans.renewal.carryOver">
            {' '}
            Temps restant&nbsp;:{' '}
            <Fact value={FACTS.plans.renewal.carryOver} what="report des jours restants" fact="plans.renewal.carryOver" tail="." />
          </FactScope>
        </>
      ),
    },
    {
      id: 'partage',
      facts: 'usage.sharing',
      q: nb('Puis-je partager mon abonnement ?'),
      a: (
        <>
          Installations et partage&nbsp;: <Fact value={FACTS.usage.sharing} what="règles d’installation et de partage" fact="usage.sharing" tail="." />{' '}
          Les conditions complètes figurent dans nos <TextLink to="/conditions-utilisation/">conditions d’utilisation</TextLink>.
        </>
      ),
    },
  ],
}

const trialRows: HelpRow[] = trial
  ? [
      {
        id: 'essai',
        q: nb('Puis-je essayer avant de m’abonner ?'),
        a: (
          <>
            <FactScope facts={['trial.terms.duration', 'trial.terms.price']} fallback={<>Oui&nbsp;: un essai est proposé.</>}>
              Oui&nbsp;: un essai de <Fact value={FACTS.trial.terms.duration} what="durée de l’essai" fact="trial.terms.duration" tail="," />{' '}
              <Fact value={FACTS.trial.terms.price} what="prix de l’essai" fact="trial.terms.price" tail="." />
            </FactScope>{' '}
            <FactScope facts="trial.terms.how">
              Pour l’obtenir&nbsp;: <Fact value={FACTS.trial.terms.how} what="démarche" fact="trial.terms.how" tail="." />{' '}
            </FactScope>
            Il sert à vérifier que tout fonctionne sur votre appareil avant de choisir une formule.
          </>
        ),
      },
      {
        id: 'limites-essai',
        facts: 'trial.terms.limits',
        q: nb('L’essai a-t-il des limites ?'),
        a: (
          <>
            Limites&nbsp;: <Fact value={FACTS.trial.terms.limits} what="limites de l’essai" fact="trial.terms.limits" tail="." /> Si vous avez déjà
            profité d’un essai, écrivez-nous&nbsp;: on vous aide à choisir la formule qui vous convient.
          </>
        ),
      },
    ]
  : []

const refund: HelpGroup = {
  id: 'remboursement-et-retractation',
  title: trial ? 'Essai et remboursement' : 'Remboursement et rétractation',
  text: trial ? 'Essai, conditions de remboursement, droit de rétractation.' : 'Conditions de remboursement et droit de rétractation.',
  rows: [
    ...trialRows,
    {
      id: 'remboursement',
      q: nb('Puis-je demander un remboursement ?'),
      a: (
        <>
          Si le service ne fonctionne pas sur votre appareil et que nous ne trouvons pas de solution ensemble, nous appliquons notre politique de
          remboursement&nbsp;:{' '}
          <Fact value={FACTS.refund.terms.summary} what="conditions de remboursement" fact="refund.terms.summary" tail="." /> Tout est précisé
          dans notre <TextLink to="/politique-de-remboursement/">politique de remboursement</TextLink>.
        </>
      ),
    },
    {
      id: 'retractation',
      q: nb('Ai-je un droit de rétractation ?'),
      a: (
        <>
          Pour un achat en ligne, la loi vous donne 14&nbsp;jours pour vous rétracter. Pour que votre abonnement démarre dès son activation, une
          case à la commande vous demande de le demander expressément et de reconnaître que vous perdez ce droit dès que vos accès sont activés.
          Sans cette demande&nbsp;: <Fact value={FACTS.withdrawal.terms} what="règle sans démarrage immédiat" fact="withdrawal.terms" tail="." />{' '}
          Nos <TextLink to="/conditions-generales-de-vente/#retractation">conditions générales de vente</TextLink> en donnent le détail.
        </>
      ),
    },
  ],
}

const catchup = FACTS.catchup.days
const epg = FACTS.epg.available

/** #signaler-probleme: the last row of « Chaînes et qualité d’image », or of « Dépannage » when that group is not shown. */
const REPORT_ROW = 'signaler-probleme'

const content: HelpGroup = {
  id: 'contenus-et-qualite',
  title: 'Chaînes et qualité d’image',
  // The first wording names the channels, the catalogue and the programmes to watch again: it needs all three.
  text: inScope(['channels.live.count', 'vod.count', 'catchup.days'])
    ? 'Chaînes en direct, catalogue à la demande, programmes à revoir.'
    : 'Vos questions sur les programmes, et comment signaler un souci.',
  rows: [
    {
      id: 'chaines',
      anyOf: ['channels.live.count', 'channels.regions', 'content.categories'],
      q: nb('Quelles chaînes sont incluses ?'),
      a: (
        <>
          <FactScope facts="channels.live.count">
            L’abonnement comprend <Fact value={liveCountText()} what="nombre" fact="channels.live.count" unit="chaînes" /> en direct.{' '}
          </FactScope>
          <FactScope facts="channels.regions">
            Pays et langues&nbsp;:{' '}
            <Fact value={formatList(FACTS.channels.regions)} what="pays et langues couverts" fact="channels.regions" tail="." />{' '}
          </FactScope>
          <FactScope facts="content.categories">
            Thèmes&nbsp;: <Fact value={formatList(FACTS.content.categories)} what="thèmes des chaînes" fact="content.categories" tail="." />{' '}
          </FactScope>
          Une chaîne précise en tête&nbsp;? Demandez-nous sur <WaLink /> avant de commander.
        </>
      ),
    },
    {
      id: 'catalogue',
      anyOf: ['vod.count', 'vod.updates'],
      q: nb('Que contient le catalogue à la demande ?'),
      a: (
        <>
          <FactScope facts="vod.count" fallback="Le catalogue réunit des films et des séries, à regarder quand vous le souhaitez.">
            Le catalogue compte <Fact value={vodCountText()} what="nombre" fact="vod.count" unit="films" /> et séries, à regarder quand vous le
            souhaitez.
          </FactScope>
          <FactScope facts="vod.updates">
            {' '}
            Nouveautés&nbsp;: <Fact value={FACTS.vod.updates} what="rythme des ajouts" fact="vod.updates" tail="." />
          </FactScope>
        </>
      ),
    },
    {
      id: 'qualite-image',
      facts: 'quality.levels',
      q: nb('En quelle qualité d’image puis-je regarder ?'),
      a: (
        <>
          Selon les programmes, l’image est proposée en <Fact value={qualityText()} what="qualités d’image" fact="quality.levels" tail="." />{' '}
          <FactScope facts="internet.minSpeed">
            Débit conseillé&nbsp;: <Fact value={FACTS.internet.minSpeed} what="débit conseillé" fact="internet.minSpeed" tail="." />{' '}
          </FactScope>
          Si l’image saccade, voyez <TextA href="#image-saccadee">nos conseils de dépannage</TextA>.
        </>
      ),
    },
    {
      id: 'revoir-guide-radio',
      anyOf: ['catchup.days', 'epg.available', 'radio.available'],
      q: nb('Puis-je revoir un programme, consulter le guide ou écouter la radio ?'),
      a: (
        <>
          {/* Review mode words a « no » (« non proposés. »); on the published site a « no » leaves its sentence out. */}
          <FactScope facts="catchup.days">
            Programmes à revoir&nbsp;:{' '}
            {catchup === false ? 'non proposés.' : <Fact value={catchup} what="durée et chaînes concernées" fact="catchup.days" tail="." />}{' '}
          </FactScope>
          {epg === false ? null : (
            <FactScope facts="epg.available">
              Guide des programmes&nbsp;: <Fact value={epg} what="nombre de jours" fact="epg.available" /> à l’avance.{' '}
            </FactScope>
          )}
          <FactScope facts="radio.available">
            Radio&nbsp;: <Fact value={FACTS.radio.available} what="radio incluse ou non" fact="radio.available" tail="." />{' '}
          </FactScope>
          Ces fonctions dépendent aussi de l’application que vous utilisez.
        </>
      ),
    },
    {
      id: REPORT_ROW,
      q: nb('Une chaîne ou un titre ne fonctionne pas. Comment le signaler ?'),
      a: (
        <>
          Écrivez-nous sur <WaLink /> avec le nom de la chaîne ou du titre, l’heure du problème et, si vous le pouvez, une photo de l’écran. Vous
          pouvez aussi passer par le <TextLink to="/contact/">formulaire de contact</TextLink>
          {hasTopics ? ', en choisissant le sujet qui correspond' : null}. On vérifie, puis on vous répond.
        </>
      ),
    },
    ...(present(FACTS.vod.languages)
      ? [
          {
            id: 'langues-sous-titres',
            q: nb('Puis-je changer de langue ou afficher des sous-titres ?'),
            a: (
              <>
                Langues et sous-titres&nbsp;: {FACTS.vod.languages}. Quand un titre en propose plusieurs, le choix se fait pendant la lecture,
                dans le menu de l’application.
              </>
            ),
          },
        ]
      : []),
  ],
}

const devices: HelpGroup = {
  id: 'appareils-et-applications',
  title: 'Appareils et applications',
  text: inScope('usage.abroad') ? 'Appareils compatibles, application à installer, voyage.' : 'Appareils compatibles et application à installer.',
  rows: [
    {
      id: 'appareils-compatibles',
      q: nb('Sur quels appareils puis-je regarder ?'),
      a: (
        <>
          Appareils compatibles&nbsp;: <Fact value={devicesText} what="appareils compatibles" fact="devices.supported" tail="." /> Chaque famille
          a son guide sur la page <TextLink to="/applications/">Applications</TextLink>. Un doute sur le vôtre&nbsp;? Indiquez-nous la marque et
          le modèle de votre appareil&nbsp;: nous vous dirons quelle application installer et comment la régler.
        </>
      ),
    },
    {
      id: 'quelle-application',
      q: nb('Quelle application installer, et où la trouver ?'),
      a: (
        <FactScope
          anyOf={['apps.own', 'apps.thirdParty']}
          fallback={
            <>
              Cela dépend de votre appareil. Indiquez-nous sa marque et son modèle&nbsp;: nous vous dirons quelle application installer et
              comment la régler.
            </>
          }
        >
          Cela dépend de votre appareil. La page <TextLink to="/applications/">Applications</TextLink> indique, pour chacun, l’application que
          nous conseillons et son lien de téléchargement. Si vous hésitez, écrivez-nous&nbsp;: on vous oriente.
        </FactScope>
      ),
    },
    {
      id: 'licence-application',
      q: nb('Mon application me demande de payer une licence. Est-ce normal ?'),
      a: (
        <>
          Certaines applications de lecture, parfois appelées «&nbsp;lecteurs IPTV&nbsp;», sont éditées par d’autres sociétés et demandent leur
          propre licence. Ce paiement va à leur éditeur&nbsp;: il n’est pas compris dans votre abonnement {BRAND}, et nous ne vendons pas ces
          activations. Avant de payer, écrivez-nous&nbsp;: on vous indique l’application conseillée pour votre appareil, et si elle est payante.
        </>
      ),
    },
    ...(familyOn('box')
      ? [
    {
      id: 'tele-ancienne',
      q: nb('Ma télé est ancienne. Puis-je quand même regarder ?'),
      a: (
        <>
          Si elle a une prise HDMI, oui&nbsp;: branchez-y une clé ou une box TV, qui fera tourner l’application, et la télé servira d’écran. La
          clé est compacte et se cache derrière l’écran&nbsp;; la box, plus grande, a souvent une prise pour le câble réseau, utile si le Wi-Fi
          est faible. Dites-nous ce que vous avez déjà&nbsp;: on vous conseille un appareil parmi les{' '}
          <Fact value={formatList(supported?.box)} what="clés et box compatibles" fact="devices.supported.box" tail="." />
        </>
      ),
    },
        ]
      : []),
    ...(familyOn('recepteur')
      ? [
    {
      id: 'recepteur-box-portail',
      q: nb('J’ai un récepteur satellite ou une box à portail. Est-ce compatible ?'),
      a: (
        <>
          Cela dépend du modèle&nbsp;:{' '}
          <Fact value={formatList(supported?.recepteur)} what="récepteurs et box à portail compatibles" fact="devices.supported.recepteur" tail="." />{' '}
          Ces appareils se règlent dans leurs propres menus, souvent avec leur adresse MAC&nbsp;: le{' '}
          <TextLink to="/applications/#guide-recepteur">guide récepteur et box à portail</TextLink> vous montre quoi saisir.
        </>
      ),
    },
        ]
      : []),
    ...(computerOn || consoleOn
      ? [
    {
      id: 'console-ordinateur',
      q: nb('Puis-je regarder sur une console de jeu ou un ordinateur ?'),
      a: (
        <>
          {computerOn && (
            <>
              Ordinateurs&nbsp;:{' '}
              <Fact value={formatList(supported?.ordinateur)} what="systèmes d’ordinateur compatibles" fact="devices.supported.ordinateur" tail="." />{' '}
            </>
          )}
          {consoleOn && (
            <>
              Consoles&nbsp;: <Fact value={formatList(supported?.console)} what="consoles compatibles" fact="devices.supported.console" tail="." />{' '}
            </>
          )}
          Pour l’installation, suivez le {computerOn && <TextLink to="/applications/#guide-ordinateur">guide ordinateur</TextLink>}
          {computerOn && consoleOn && ' ou le '}
          {consoleOn && <TextLink to="/applications/#guide-console">guide console</TextLink>}.
        </>
      ),
    },
        ]
      : []),
    {
      id: 'antenne-parabole',
      q: nb('Faut-il une antenne ou une parabole ?'),
      a: (
        <>
          Non. Les programmes arrivent par votre connexion internet, comme une vidéo en ligne&nbsp;: aucune installation sur le toit.
          <FactScope facts="internet.minSpeed">
            {' '}
            Débit conseillé&nbsp;: <Fact value={FACTS.internet.minSpeed} what="débit conseillé" fact="internet.minSpeed" tail="." />
          </FactScope>
        </>
      ),
    },
    {
      id: 'etranger',
      facts: 'usage.abroad',
      q: nb('Puis-je regarder depuis l’étranger ?'),
      a: (
        <>
          À l’étranger&nbsp;: <Fact value={FACTS.usage.abroad} what="conditions d’usage à l’étranger" fact="usage.abroad" tail="." /> Sur place, la
          qualité dépend de la connexion&nbsp;: un Wi-Fi d’hôtel partagé peut la limiter. Un doute avant de partir&nbsp;? Demandez-nous sur{' '}
          <WaLink />.
        </>
      ),
    },
  ],
}

const troubleshooting: HelpGroup = {
  id: 'depannage',
  title: 'Dépannage',
  text: 'Écran noir, image qui saccade, message d’erreur.',
  rows: [
    {
      id: 'ecran-noir',
      q: nb('Rien ne s’affiche quand je lance une chaîne. Que vérifier ?'),
      a: (
        <>
          Commencez par trois vérifications&nbsp;: internet fonctionne sur un autre appareil, l’application est à jour, et vos accès sont saisis
          sans espace ni faute de frappe. Ensuite, fermez complètement l’application et redémarrez l’appareil. Toujours rien&nbsp;? Envoyez-nous
          une photo de l’écran sur <WaLink />&nbsp;: on regarde avec vous.
        </>
      ),
    },
    {
      id: 'image-saccadee',
      q: nb('L’image saccade ou se fige. Que faire ?'),
      a: (
        <>
          <FactScope facts="internet.minSpeed">
            Mesurez le débit sur l’appareil qui regarde et comparez-le au débit conseillé&nbsp;:{' '}
            <Fact value={FACTS.internet.minSpeed} what="débit conseillé" fact="internet.minSpeed" tail="." />{' '}
          </FactScope>
          Si le Wi-Fi est faible, rapprochez l’appareil de la box internet ou reliez-le par un câble réseau. Mettez aussi en pause les gros
          téléchargements sur les autres appareils du foyer. Si rien ne change, écrivez-nous en précisant la chaîne et l’heure.
        </>
      ),
    },
    {
      id: 'erreur-expire',
      q: 'L’application affiche «\u00a0expiré\u00a0» ou une erreur de connexion. Pourquoi\u00a0?',
      a: (
        <>
          Si votre abonnement a atteint sa date de fin, renouvelez-le sur la <TextLink to={renewalPath()}>page Renouvellement</TextLink>. Sinon,
          ressaisissez vos accès sans espace, en respectant les majuscules et les minuscules. Si l’erreur persiste, envoyez-nous une photo du
          message sur <WaLink />&nbsp;: on vérifie votre accès et, si besoin, on vous en renvoie.
        </>
      ),
    },
    {
      id: 'interruption',
      q: nb('Le service semble interrompu. Où trouver des nouvelles ?'),
      a: (
        // Without an announcements channel the answer is one sentence (aide.md row 41).
        channelOn ? (
          <>
            En cas d’interruption, nous publions les nouvelles sur{' '}
            <Fact
              value={
                channel ? (
                  <TextA href={channel.url} target="_blank" rel="noopener noreferrer" aria-label={`${channel.name} (nouvel onglet)`}>
                    {channel.name}
                  </TextA>
                ) : null
              }
              what="canal d’annonces"
              fact="community.channel.name"
              tail="."
            />{' '}
            Vous pouvez aussi nous écrire sur <WaLink />&nbsp;: on vous dit d’où vient le souci, du service ou de votre installation.
          </>
        ) : (
          <>
            En cas d’interruption, écrivez-nous sur <WaLink />&nbsp;: on vous dit d’où vient le souci, du service ou de votre installation.
          </>
        )
      ),
    },
  ],
}

const support: HelpGroup = {
  id: 'assistance',
  title: 'Assistance',
  text: inScope('support.languages') ? 'Nous joindre, horaires, langues, aide à l’installation.' : 'Nous joindre, horaires, aide à l’installation.',
  rows: [
    {
      id: 'joindre-equipe',
      q: nb(`Comment joindre l’équipe ${BRAND} ?`),
      a: (
        <>
          Écrivez-nous sur WhatsApp au <WaNumber /> ou par e-mail à <Email tail="." /> Horaires&nbsp;:{' '}
          <Fact value={FACTS.support.hours} what="horaires du support" fact="support.hours" tail="." />
          <FactScope facts="support.responseTime">
            {' '}
            Réponse habituelle&nbsp;: <Fact value={FACTS.support.responseTime} what="délai de réponse" fact="support.responseTime" tail="." />
          </FactScope>
        </>
      ),
    },
    {
      id: 'quel-canal',
      q: nb('Quel canal choisir pour ma demande ?'),
      a: (
        <>
          Pour l’installation ou un écran qui bloque, écrivez-nous sur <WaLink /> avec une photo de l’écran.{' '}
          {hasTopics ? (
            <>
              Pour une demande écrite, le <TextLink to="/contact/">formulaire de contact</TextLink> vous fait choisir un sujet{' '}
              <Fact value={formatList(FACTS.support.topics)} what="sujets du formulaire" fact="support.topics" lead="(" tail=")," /> pour
              qu’elle soit bien orientée.
            </>
          ) : (
            <>
              Pour une demande écrite, utilisez le <TextLink to="/contact/">formulaire de contact</TextLink>&nbsp;: on vous répond à l’adresse
              e-mail que vous y indiquez.
            </>
          )}
          {RESELLER_ON && (
            <>
              {' '}
              Les revendeurs passent par la <TextLink to="/revendeur/">page Revendeur</TextLink>.
            </>
          )}
        </>
      ),
    },
    {
      id: 'langues-support',
      facts: 'support.languages',
      q: nb('En quelles langues pouvez-vous me répondre ?'),
      a: (
        <>
          On vous répond en <Fact value={FACTS.support.languages} what="langues du support" fact="support.languages" tail="." /> Pour une question
          technique, une photo de l’écran évite bien des explications, quelle que soit la langue.
        </>
      ),
    },
    {
      id: 'aide-installation',
      q: nb('Je ne suis pas à l’aise avec la technique. Est-ce que je vais y arriver ?'),
      a: (
        <>
          Oui. On vous guide une étape à la fois, et on ne passe à la suivante que lorsque la précédente fonctionne chez vous. Commencez par le{' '}
          <TextLink to="/applications/#guides">guide de votre appareil</TextLink>&nbsp;; si une étape bloque, écrivez-nous sur <WaLink />,{' '}
          <Fact value={FACTS.support.hours} what="horaires du support" fact="support.hours" tail="." />
        </>
      ),
    },
    ...(present(FACTS.apps.own)
      ? [
          {
            id: 'ou-telecharger',
            q: nb('Où trouver vos applications et vos contacts ?'),
            a: (
              <>
                Les liens de téléchargement de nos applications sont tous sur la page <TextLink to="/applications/">Applications</TextLink>. Pour
                nous écrire&nbsp;: WhatsApp au <WaNumber tail="," /> ou e-mail à <Email tail="." />
              </>
            ),
          },
        ]
      : []),
  ],
}

const data: HelpGroup = {
  id: 'donnees-personnelles',
  title: 'Données personnelles',
  text: 'Ce que nous faisons de vos données, et comment les supprimer.',
  rows: [
    {
      id: 'vos-donnees',
      q: nb('Que faites-vous de mes données, et comment les faire supprimer ?'),
      a: (
        <>
          Vos données servent à préparer votre commande, à vous envoyer vos accès et à répondre à vos messages. Pour les consulter, les corriger
          ou les faire supprimer, écrivez à{' '}
          <Fact value={FACTS.privacy.dpoContact} what="contact pour les données personnelles" fact="privacy.dpoContact" tail="." /> Notre{' '}
          <TextLink to="/politique-de-confidentialite/#conservation">politique de confidentialité</TextLink> indique combien de temps nous les
          gardons et explique le reste.
        </>
      ),
    },
  ],
}

/**
 * The FAQ groups of /aide/, in page order, with the rows that render. The reseller line sits between Assistance and
 * Données personnelles. On the published site « Chaînes et qualité d’image » may be left with its last row alone
 * (how to report a channel): the group then goes with its card and that row closes « Dépannage » (aide.md).
 */
function helpGroups(): HelpGroup[] {
  const groups = [order, access, plans, refund, content, devices, troubleshooting, support, data].map((g) => ({ ...g, rows: scoped(g.rows) }))
  const shown = groups.find((g) => g.id === content.id)
  const fix = groups.find((g) => g.id === troubleshooting.id)
  if (shown && fix && shown.rows.length > 0 && shown.rows.every((r) => r.id === REPORT_ROW)) {
    fix.rows = [...fix.rows, ...shown.rows]
    shown.rows = []
  }
  return groups.filter((g) => g.rows.length > 0)
}

export const HELP_GROUPS: HelpGroup[] = helpGroups()
