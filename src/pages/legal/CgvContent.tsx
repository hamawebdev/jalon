import { FactScope, TextA, TextLink, inScope, linkStandaloneClass } from '@/components/brand'
import {
  FACTS,
  deBefore,
  endOfTerm,
  familiesInText,
  formatEuro,
  formatList,
  mailtoHref,
  planFactKey,
  planName,
  planPath,
  present,
  renewalPath,
  supportedFamilies,
  telHref,
} from '@/lib/facts'
import { BRAND, WHATSAPP_CHAT_HREF, WHATSAPP_LINK_PROPS } from '@/lib/site'
import { linkMode } from '../checkout/handoff'
import { checkoutModeSentence, deliveryChannelText, screensText } from '../theme/facts-text'
import { Fact } from '../theme/facts-ui'
import { DOC_MEASURE, DocLayout, H2, H3, IdentityList, P, Steps, Value } from './shared'

/** A link that is the whole value of an identity row: the kit's link in a 44px tap box that keeps the row's height. */
const link = `${linkStandaloneClass} -my-2`

/**
 * First sentence of the payment clause, by checkout.mode (copy cgv.md › cgv-payment, APPROVAL §2e): today's sentence
 * while the mode is unknown, the sentence of the mode once the owner names one.
 */
function paymentSentence(): string {
  const mode = FACTS.checkout.mode
  if (mode === 'hostedPage' || mode === 'paymentLinks') {
    return 'Vous payez votre commande en ligne, juste après l’avoir envoyée\u00a0: le site vous en donne la référence, puis vous ouvrez la page de paiement.'
  }
  if (mode === 'externalShop') {
    return 'Vous payez votre commande sur notre boutique en ligne, juste après l’avoir envoyée\u00a0: le site vous en donne la référence, puis vous ouvrez la boutique.'
  }
  if (mode === 'message') return 'Vous nous envoyez votre commande sur WhatsApp\u00a0; nous vous répondons avec la marche à suivre pour la payer.'
  return 'Vous payez votre commande au moment de la passer.'
}

/** « Appareils compatibles : … »: the supported families in their sentence forms (GLOSSARY §3), never the heading names. */
function devicesText() {
  return familiesInText(supportedFamilies())
}

/** « 3 mois : 30 € » rows of the renewal durations, once the owner gives them. */
function renewalDurationsText() {
  const d = FACTS.plans.renewal.durations
  if (!present(d)) return null
  return d.map((o) => `${o.months} mois${o.price != null ? ` : ${formatEuro(o.price)}` : ''}`).join(', ')
}

// /conditions-generales-de-vente/ (copy cgv.md, INVENTORY §4.12): one H2 per section, the anchors other pages link
// to (#retractation, #remboursement, #duree, #litiges). Every clause in notes-legal.md §6 waits for a lawyer.
export function CgvContent() {
  const c = FACTS.company
  const s = FACTS.support
  const m = FACTS.consumer.mediator
  const cancel = FACTS.cancellation
  const vat = <Fact value={FACTS.pricing.vat} what="mention TVA" fact="pricing.vat" tail="." />
  const hostedPage = FACTS.checkout.mode === 'hostedPage'
  return (
    <DocLayout
      title="Conditions générales de vente"
      lead={
        <p>
          Ces conditions expliquent, sans jargon, ce que vous achetez, ce que nous nous engageons à faire et comment arrêter votre
          abonnement.
        </p>
      }
      version={{ date: FACTS.legal.lastUpdated.cgv, fact: 'legal.lastUpdated.cgv' }}
    >
      <H2 id="vendeur">Qui vous vend l’abonnement</H2>
      <P>
        L’abonnement {BRAND} est vendu par l’entreprise ci-dessous, appelée «&nbsp;nous&nbsp;» dans ces conditions. Elles s’appliquent à
        toute commande passée sur ce site. Vous les acceptez en cochant la case prévue avant de payer&nbsp;; la version qui s’applique est
        celle en ligne le jour de votre commande.
      </P>
      <IdentityList
        label="Identité du vendeur"
        rows={[
          { title: 'Dénomination sociale', value: <Value value={c.legalName} what="dénomination sociale" fact="company.legalName" /> },
          { title: 'Forme juridique', value: <Value value={c.form} what="forme juridique" fact="company.form" /> },
          { title: 'Siège social', value: <Value value={c.address} what="adresse du siège social" fact="company.address" /> },
          { title: 'Immatriculation', value: <Value value={c.rcs} what="ville et numéro d’immatriculation" fact="company.rcs" /> },
          { title: 'SIREN ou SIRET', value: <Value value={c.siret} what="numéro SIREN ou SIRET" fact="company.siret" /> },
          {
            title: 'TVA intracommunautaire',
            value: <Value value={c.vatNumber} what="numéro de TVA ou mention d’exonération" fact="company.vatNumber" />,
          },
          {
            title: 'Téléphone',
            value: <Value value={c.phone && <a href={telHref(c.phone) ?? undefined} className={link}>{c.phone}</a>} what="numéro de téléphone" fact="company.phone" />,
          },
          {
            title: 'E-mail',
            value: <Value value={c.email && <a href={mailtoHref(c.email) ?? undefined} className={link}>{c.email}</a>} what="adresse e-mail" fact="company.email" />,
          },
        ]}
      />

      <H2 id="offre-et-prix">Ce que vous achetez et à quel prix</H2>
      <P>
        Vous achetez un abonnement au service de télévision {BRAND}, pour la durée de la formule choisie. La fiche de chaque formule détaille
        ce qu’elle contient&nbsp;:{' '}
        <Fact value={formatList(FACTS.plans.features.included)} what="contenu des formules" fact="plans.features.included" tail="." />
      </P>
      <IdentityList
        label="Formules et prix"
        rows={FACTS.plans.list.map((p) => ({
          title: planName(p.months),
          to: planPath(p),
          value: (
            <Value value={p.price != null ? <span className="money">{formatEuro(p.price)}</span> : null} what="prix" fact={planFactKey(p.id, 'price')} />
          ),
        }))}
      />
      <P>
        Nombre d’écrans utilisables en même temps&nbsp;:{' '}
        <Fact value={screensText()} what="nombre d’écrans simultanés" fact="plans.screens.count" tail="." />
      </P>
      <P>
        <FactScope facts="pricing.currency" fallback={<>Les prix affichés sont des prix totaux, {vat}</>}>
          Les prix sont indiqués en <Fact value={FACTS.pricing.currency} what="devise" fact="pricing.currency" tail="," /> {vat}
        </FactScope>{' '}
        Vous payez le prix affiché dans le récapitulatif au moment de la commande. Nous pouvons faire évoluer nos prix, mais jamais pour une
        commande déjà passée.
      </P>
      <P>
        Pour regarder, il vous faut un appareil compatible et une connexion internet suffisante. Appareils compatibles&nbsp;:{' '}
        <Fact value={devicesText()} what="appareils compatibles" fact="devices.supported" tail="." />
        <FactScope facts="internet.minSpeed">
          {' '}
          Débit conseillé&nbsp;: <Fact value={FACTS.internet.minSpeed} what="débit conseillé" fact="internet.minSpeed" tail="." />
        </FactScope>
      </P>
      <P>
        <TextLink to="/applications/" standalone className="-my-2.5 font-semibold">
          Vérifier mon appareil
        </TextLink>
      </P>

      <H2 id="commande">Comment se passe une commande</H2>
      <Steps
        items={[
          { title: 'Vous choisissez', text: 'Votre formule et sa durée. Elle s’ajoute à votre panier.' },
          { title: 'Vous vérifiez', text: 'Formule, durée, prix total : tout est affiché avant de payer, et vous pouvez encore corriger.' },
          {
            title: 'Vous indiquez vos coordonnées',
            text: 'Seulement celles qui servent à traiter la commande et à vous envoyer vos accès.',
          },
          {
            title: 'Vous acceptez',
            text: (
              <>
                Ces conditions. Une seconde case concerne le démarrage immédiat de votre abonnement (voir{' '}
                <TextA href="#retractation">Rétractation</TextA>).
              </>
            ),
          },
          {
            title: 'Vous payez',
            text: <Fact value={checkoutModeSentence()} what="comment la commande est finalisée et payée" fact="checkout.mode" />,
          },
          {
            title: 'Nous confirmons',
            text: (
              <>
                Par <Fact value={deliveryChannelText()} what="canal d’envoi" fact="delivery.channel" tail="," /> avec le récapitulatif de
                votre commande et, si vous l’avez faite, votre demande de démarrage immédiat.
              </>
            ),
          },
        ]}
      />
      <P>
        La vente est conclue quand nous vous envoyons cette confirmation. Le contrat est conclu en français. Nous gardons une trace de votre
        commande&nbsp;: vous pouvez nous en demander une copie.
      </P>

      <H2 id="paiement">Le paiement</H2>
      <P>{paymentSentence()} Nous activons vos accès une fois le paiement reçu.</P>
      {/* Only the modes that hand the order over to a payment page or a shop give it a reference (commande.md). */}
      {linkMode() && (
        <P>
          Chaque commande reçoit une référence, qui nous permet de rattacher votre paiement à votre commande. Une commande envoyée mais pas payée
          n’est pas validée&nbsp;: rien n’est débité et nous n’activons rien.
        </P>
      )}
      <P>
        Moyens de paiement acceptés&nbsp;:{' '}
        <Fact
          value={present(FACTS.payment.methods) ? FACTS.payment.methods.map((pm) => (pm.note ? `${pm.name} (${pm.note})` : pm.name)).join(', ') : null}
          what="moyens de paiement"
          fact="payment.methods"
          tail="."
        />
      </P>
      {/* The provider's name is optional: its sentence waits for it; the card-data sentence names nobody. */}
      {(inScope('payment.provider') || hostedPage) && (
        <P>
          <FactScope facts="payment.provider">
            Le paiement passe par notre prestataire de paiement&nbsp;:{' '}
            <Fact value={FACTS.payment.provider} what="prestataire de paiement" fact="payment.provider" tail="." />{' '}
          </FactScope>
          {hostedPage && <>Vos données de carte sont saisies chez notre prestataire&nbsp;: nous ne les voyons pas et ne les gardons pas.</>}
        </P>
      )}
      <P>
        Si le paiement est refusé, rien n’est débité et la commande n’est pas validée. Vous pouvez réessayer, payer autrement ou nous écrire.
      </P>

      <H2 id="activation">L’activation de vos accès</H2>
      <P>
        Une fois le paiement reçu, nous activons vos accès. Délai d’activation&nbsp;:{' '}
        <Fact value={FACTS.delivery.delay} what="délai d’activation" fact="delivery.delay" tail="." /> Vous les recevez par{' '}
        <Fact value={deliveryChannelText()} what="canal d’envoi" fact="delivery.channel" tail="." /> Pour les installer, suivez{' '}
        <TextLink to="/applications/">nos guides par appareil</TextLink>.
      </P>
      <P>Rien reçu dans ce délai&nbsp;? Écrivez-nous&nbsp;: on regarde avec vous.</P>
      <P>
        Si nous ne vous fournissons pas vos accès, vous pouvez nous demander de le faire. Si nous ne le faisons toujours pas, vous pouvez
        mettre fin au contrat, et nous vous remboursons la totalité de la somme payée.
      </P>

      <H2 id="retractation">Votre droit de rétractation</H2>
      <P>
        Vous avez acheté à distance&nbsp;: la loi vous donne 14&nbsp;jours pour changer d’avis, sans avoir à vous justifier ni à payer de
        pénalité (article L221-18 du Code de la consommation). Ce délai court à partir du jour où le contrat est conclu, c’est-à-dire le jour
        où nous confirmons votre commande.
      </P>
      <H3>Si vous demandez un démarrage immédiat</H3>
      <P>
        Vous voulez regarder sans attendre la fin de ces 14&nbsp;jours&nbsp;? Avant de payer, une case vous permet de demander expressément
        que votre abonnement démarre dès son activation, et de reconnaître que vous perdez votre droit de rétractation dès que vos accès sont
        activés (article L221-28 du Code de la consommation). La confirmation de commande reprend cette demande.
      </P>
      <P>Tant que vos accès ne sont pas activés, vous pouvez encore vous rétracter.</P>
      <P>
        Si vous ne faites pas cette demande&nbsp;:{' '}
        <Fact value={FACTS.withdrawal.terms} what="règle sans démarrage immédiat" fact="withdrawal.terms" tail="." />
      </P>
      <H3>Comment vous rétracter</H3>
      <P>
        Avant la fin du délai, envoyez-nous le formulaire ci-dessous, ou tout autre message qui dit clairement que vous vous rétractez, par
        e-mail à <Fact value={c.email} what="adresse e-mail" fact="company.email" /> ou par courrier à{' '}
        <Fact value={c.address} what="adresse du siège social" fact="company.address" tail="." />
      </P>
      <P>
        Nous vous remboursons la totalité des sommes payées au plus tard 14&nbsp;jours après avoir reçu votre décision, avec le moyen de
        paiement utilisé pour la commande, sauf si vous acceptez expressément un autre moyen. Ce remboursement ne vous coûte rien.
      </P>
      <H3>Modèle de formulaire de rétractation</H3>
      <P>C’est le modèle prévu par le Code de la consommation. Copiez-le, remplissez-le et envoyez-le-nous.</P>
      <section
        aria-label="Modèle de formulaire de rétractation"
        className={`mt-6 grid gap-3 rounded-card border border-dashed border-hairline-strong bg-plate p-card font-sans text-copy leading-[1.7] text-ink-body ${DOC_MEASURE}`}
      >
        <p>(Veuillez compléter et renvoyer le présent formulaire uniquement si vous souhaitez vous rétracter du contrat.)</p>
        <p>
          À l’attention {deBefore(c.legalName)}<Fact value={c.legalName} what="dénomination sociale" fact="company.legalName" tail="," />{' '}
          <Fact value={c.address} what="adresse du siège social" fact="company.address" tail="," />{' '}
          <Fact value={c.email} what="adresse e-mail" fact="company.email" tail={'\u00a0:'} />
        </p>
        <p>
          Je/Nous (*) vous notifie/notifions (*) par la présente ma/notre (*) rétractation du contrat portant sur la vente du bien (*)/pour la
          prestation de services (*) ci-dessous&nbsp;:
        </p>
        <p>Commandé le (*)/reçu le (*)&nbsp;:</p>
        <p>Nom du (des) consommateur(s)&nbsp;:</p>
        <p>Adresse du (des) consommateur(s)&nbsp;:</p>
        <p>Signature du (des) consommateur(s) (uniquement en cas de notification du présent formulaire sur papier)&nbsp;:</p>
        <p>Date&nbsp;:</p>
        <p>(*) Rayez la mention inutile.</p>
      </section>

      <H2 id="remboursement">Les remboursements</H2>
      <P>
        En dehors de la rétractation, nous remboursons dans les cas prévus par notre politique de remboursement&nbsp;:{' '}
        <Fact value={FACTS.refund.terms.summary} what="conditions de remboursement" fact="refund.terms.summary" tail="." /> Elle s’ajoute à
        vos droits légaux, sans les réduire.
      </P>
      <P>
        <TextLink to="/politique-de-remboursement/" standalone className="-my-2.5 font-semibold">
          Voir la politique de remboursement
        </TextLink>
      </P>

      <H2 id="duree">Durée, renouvellement et arrêt</H2>
      <P>
        Votre abonnement dure le nombre de mois de la formule choisie.
        <FactScope facts="plans.start">
          {' '}
          Point de départ&nbsp;: <Fact value={FACTS.plans.start} what="début de l’abonnement" fact="plans.start" tail="." />
        </FactScope>
      </P>
      <P>
        À la fin de cette durée&nbsp;: <Fact value={endOfTerm()} what="renouvellement automatique ou non" fact="plans.autoRenew" tail="." />
      </P>
      <P>
        Pour continuer, renouvelez votre abonnement depuis la page Renouvellement.{' '}
        <FactScope facts="plans.renewal.durations" fallback="Les durées proposées et leur prix y figurent.">
          Durées proposées au renouvellement, avec leur prix&nbsp;:{' '}
          <Fact value={renewalDurationsText()} what="durées et prix de renouvellement" fact="plans.renewal.durations" tail="." />
        </FactScope>
        <FactScope facts="plans.renewal.carryOver">
          {' '}
          Temps restant&nbsp;: <Fact value={FACTS.plans.renewal.carryOver} what="report des jours restants" fact="plans.renewal.carryOver" tail="." />
        </FactScope>
      </P>
      <P>
        <TextLink to={renewalPath()} standalone className="-my-2.5 font-semibold">
          Renouveler mon abonnement
        </TextLink>
      </P>
      <H3>Arrêter votre abonnement</H3>
      <P>
        Vous pouvez arrêter votre abonnement en ligne, avec le bouton{' '}
        {cancel.path && cancel.path.startsWith('/') ? (
          <>
            <TextLink to={cancel.path}>«&nbsp;Résilier mon abonnement&nbsp;»</TextLink>.
          </>
        ) : (
          <>
            «&nbsp;Résilier mon abonnement&nbsp;»&nbsp;:{' '}
            <Fact value={cancel.path} what="emplacement du bouton de résiliation" fact="cancellation.path" tail="." />
          </>
        )}{' '}
        <Fact value={cancel.terms} what="conditions de résiliation" fact="cancellation.terms" /> Nous vous confirmons l’arrêt par écrit.
      </P>

      <H2 id="engagements">Nos engagements et les vôtres</H2>
      <H3>Ce que nous nous engageons à faire</H3>
      <P>
        Nous fournissons le service pendant toute la durée payée, tel que la fiche de votre formule le décrit. Comme tout contenu ou service
        numérique vendu à un particulier, il est couvert par la garantie légale de conformité du Code de la consommation&nbsp;: s’il ne
        fonctionne pas comme prévu, vous pouvez nous demander de corriger le problème&nbsp;; à défaut, vous pouvez obtenir une baisse du prix
        ou mettre fin au contrat et être remboursé.
      </P>
      <P>Si une panne de notre côté interrompt le service, nous vous prévenons et le rétablissons dès que possible.</P>
      <P>
        <FactScope facts="content.licensing" fallback="La liste des chaînes et des programmes peut changer pendant votre abonnement.">
          Les chaînes et les programmes&nbsp;:{' '}
          <Fact value={FACTS.content.licensing} what="base sur laquelle les chaînes et les programmes sont distribués" fact="content.licensing" tail="." />{' '}
          Leur liste peut changer pendant votre abonnement.
        </FactScope>{' '}
        Si un changement réduit nettement ce que vous avez acheté, nous vous prévenons à l’avance et vous pouvez mettre fin à votre abonnement,
        avec le remboursement de la période restante.
      </P>
      <P>
        Le service passe par internet. Une coupure de votre connexion, un débit insuffisant
        <FactScope facts="internet.minSpeed">
          {' '}
          (débit conseillé&nbsp;: <Fact value={FACTS.internet.minSpeed} what="débit conseillé" fact="internet.minSpeed" tail=")" />
        </FactScope>{' '}
        ou une panne de votre appareil ne relèvent pas de notre responsabilité. Cette limite ne s’applique pas à nos propres manquements.
      </P>
      <H3>Ce que vous vous engagez à faire</H3>
      <P>
        Vous utilisez le service selon nos <TextLink to="/conditions-utilisation/">conditions d’utilisation</TextLink>.
        <FactScope facts="usage.sharing">
          {' '}
          Installations et partage&nbsp;: <Fact value={FACTS.usage.sharing} what="règles d’installation et de partage" fact="usage.sharing" tail="." />
        </FactScope>
      </P>

      <H2 id="service-client">Le service client</H2>
      <P>Une question, un écran qui bloque&nbsp;? Écrivez-nous et envoyez une photo de l’écran&nbsp;: on regarde avec vous.</P>
      <IdentityList
        label="Service client"
        rows={[
          {
            title: 'E-mail',
            value: <Value value={s.email && <a href={mailtoHref(s.email) ?? undefined} className={link}>{s.email}</a>} what="adresse e-mail du support" fact="support.email" />,
          },
          {
            title: 'WhatsApp',
            value: (
              <Value
                value={s.whatsapp && WHATSAPP_CHAT_HREF && <a href={WHATSAPP_CHAT_HREF} {...WHATSAPP_LINK_PROPS} className={link}>{s.whatsapp}</a>}
                what="numéro WhatsApp"
                fact="support.whatsapp"
              />
            ),
          },
          { title: 'Horaires', value: <Value value={s.hours} what="horaires du support" fact="support.hours" /> },
          ...(inScope('support.responseTime')
            ? [{ title: 'Délai de réponse', value: <Value value={s.responseTime} what="délai de réponse" fact="support.responseTime" /> }]
            : []),
        ]}
      />
      <P>
        Pour une réclamation, écrivez-nous par e-mail&nbsp;: c’est aussi la première étape avant de saisir le médiateur (voir{' '}
        <TextA href="#litiges">Litiges</TextA>).
      </P>

      <H2 id="litiges">Litiges, médiation et droit applicable</H2>
      <P>
        Si un désaccord persiste après votre réclamation écrite, vous pouvez saisir sans frais le médiateur de la consommation, dans l’année
        qui suit cette réclamation.
      </P>
      <IdentityList
        label="Médiateur de la consommation"
        rows={[
          { title: 'Médiateur', value: <Value value={m.name} what="nom du médiateur" fact="consumer.mediator.name" /> },
          {
            title: 'Site',
            value: (
              <Value
                value={m.website && <a href={m.website} target="_blank" rel="noopener noreferrer" className={link}>{m.website}</a>}
                what="site du médiateur"
                fact="consumer.mediator.website"
              />
            ),
          },
          { title: 'Adresse', value: <Value value={m.address} what="adresse du médiateur" fact="consumer.mediator.address" /> },
        ]}
      />
      <P>
        Le droit français s’applique à ces conditions. Si vous habitez dans un autre pays, ce choix ne vous prive pas des protections
        obligatoires de votre pays. En cas de litige, vous pouvez saisir le tribunal du lieu où vous habitiez au moment de la commande, ou tout
        autre tribunal compétent selon la loi.
      </P>

      <H2 id="vos-donnees">Vos données personnelles</H2>
      <P>
        Vos coordonnées nous servent à traiter et livrer votre commande, puis à vous aider. Notre politique de confidentialité explique tout le
        reste. Pour toute question sur vos données&nbsp;:{' '}
        <Fact value={FACTS.privacy.dpoContact} what="contact pour les données personnelles" fact="privacy.dpoContact" tail="." />
      </P>
      <P>
        <TextLink to="/politique-de-confidentialite/" standalone className="-my-2.5 font-semibold">
          Voir la politique de confidentialité
        </TextLink>
      </P>
    </DocLayout>
  )
}
