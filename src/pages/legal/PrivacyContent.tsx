import { Suspense, lazy } from 'react'
import { ButtonA, FactScope, TextA } from '@/components/brand'
import { CHECKOUT_FIELD_LABEL, FACTS, formatList, mailtoHref, present } from '@/lib/facts'
import { BRAND } from '@/lib/site'
import { defaultFieldsText } from '../checkout/default-fields'
import { linkMode } from '../checkout/handoff'
import { deliveryChannelText } from '../theme/facts-text'
import { Fact } from '../theme/facts-ui'
import { DocLayout, H2, IdentityList, P, Table, UL, Value } from './shared'

/** A cell opens on a capital letter, whatever the list starts with. */
const capitalized = (text: string | null) => (text ? text.charAt(0).toUpperCase() + text.slice(1) : text)

/** The checkout fields as running text (checkout.fields). */
function checkoutFieldsText() {
  const f = FACTS.checkout.fields
  return present(f) ? capitalized(formatList(f.map((x) => CHECKOUT_FIELD_LABEL[x.id]))) : null
}

/** The processors that receive personal data (privacy.processors.list). */
function processorsText() {
  const l = FACTS.privacy.processors.list
  return present(l) ? l.map((p) => `${p.name} (${p.role}, ${p.country})`).join(', ') : null
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * #cookies once cookies.tools lists a tool: the table of tools, each with « Votre choix » from the consent store,
 * and « Gérer mes cookies » (CookieTools). Loaded on demand, only then, so with no tool (today) the legal pages carry
 * none of the consent code (QA HC-08).
 */
const COOKIE_TOOLS = present(FACTS.cookies.tools) ? { tools: FACTS.cookies.tools, Table: lazy(() => import('./CookieTools')) } : null

// /politique-de-confidentialite/ (copy confidentialite.md, INVENTORY §4.14): who is responsible, what is used
// and why, who receives it, how long it is kept, how it is protected, your rights, cookies (#cookies: no tool
// today, so no consent banner, APPROVAL §2.7; with a consent tool, the banner and « Gérer mes cookies », §2e) and
// the date of this version.
export function PrivacyContent() {
  const p = FACTS.privacy
  const dpo = p.dpoContact
  const r = p.retention
  return (
    <DocLayout
      title="Politique de confidentialité"
      lead={<p>Les données que nous utilisons, pourquoi, pendant combien de temps, et comment exercer vos droits.</p>}
    >
      <H2 id="responsable">Qui est responsable de vos données</H2>
      <P>Le responsable du traitement est l’entreprise qui exploite {BRAND}&nbsp;:</P>
      <IdentityList
        label="Responsable du traitement"
        rows={[
          { title: 'Dénomination sociale', value: <Value value={FACTS.company.legalName} what="dénomination sociale" fact="company.legalName" /> },
          { title: 'Adresse', value: <Value value={FACTS.company.address} what="adresse du siège social" fact="company.address" /> },
          { title: 'Contact pour vos données', value: <Value value={dpo} what="contact pour les données personnelles" fact="privacy.dpoContact" /> },
        ]}
      />

      <H2 id="donnees-utilisees">Ce que nous utilisons, et pourquoi</H2>
      <P>Nous n’utilisons vos données que pour les raisons ci-dessous. Pour chacune, la loi demande une base légale&nbsp;: nous l’indiquons.</P>
      <Table
        caption="Données utilisées, par finalité"
        head={['Pourquoi', 'Quelles données', 'Base légale']}
        rows={[
          [
            'Traiter votre commande et vous envoyer vos accès',
            <span key="data">
              {/* Until the owner lists the order fields, the published site names the ones the order form asks for by
                  default, read from the form's own list so the two cannot differ. */}
              <FactScope facts="checkout.fields" fallback={<>{capitalized(defaultFieldsText())} indiqués à la commande,</>}>
                <Fact value={checkoutFieldsText()} what="données demandées à la commande" fact="checkout.fields" tail="," />
              </FactScope>{' '}
              le statut de votre paiement et les accès créés pour vous, envoyés par{' '}
              <Fact value={deliveryChannelText()} what="canal d’envoi" fact="delivery.channel" />
            </span>,
            'Contrat',
          ],
          [
            'Faire fonctionner le service quand vous regardez',
            <Fact key="data" value={p.serviceData} what="données techniques du service" fact="privacy.serviceData" />,
            'Contrat',
          ],
          [
            'Répondre à vos messages (formulaire, e-mail, WhatsApp)',
            // « sujet » is collected only once the form has its « Sujet » select (support.topics, GLOSSARY §6).
            `Nom, e-mail, téléphone si vous le donnez, ${present(FACTS.support.topics) ? 'sujet, ' : ''}référence de commande si vous la donnez, votre message et les photos d’écran que vous nous envoyez`,
            'Intérêt légitime (vous répondre), ou contrat si vous êtes client',
          ],
          [
            'Traiter une rétractation, un remboursement ou une réclamation',
            'Vos coordonnées, votre commande, votre demande et nos échanges',
            'Obligation légale et contrat',
          ],
          ['Tenir notre comptabilité', 'Détail de la commande, montant, date, moyen de paiement utilisé', 'Obligation légale'],
          [
            'Afficher le site et le protéger',
            'Adresse IP, date et heure, page demandée, type de navigateur, transmis automatiquement à notre hébergeur',
            'Intérêt légitime (un site qui fonctionne et reste sûr)',
          ],
        ]}
      />
      <P>
        Contrat&nbsp;: sans ces données, nous ne pouvons pas vous livrer ni vous aider. Obligation légale&nbsp;: la loi nous impose de les
        traiter. Intérêt légitime&nbsp;: un besoin raisonnable de notre part, auquel vous pouvez vous opposer.
      </P>
      <P>
        Sans les informations demandées à la commande, nous ne pouvons pas activer vos accès.{' '}
        {linkMode() ? (
          <>
            Elles nous parviennent avec votre commande par un service d’envoi, comme les messages du formulaire de contact. Ce service est
            nommé plus bas parmi nos prestataires.
          </>
        ) : (
          <>Les messages du formulaire de contact passent par un service d’envoi, nommé plus bas parmi nos prestataires.</>
        )}
      </P>

      <H2 id="destinataires">Qui reçoit vos données</H2>
      <P>Nous ne transmettons vos données qu’aux destinataires suivants, et seulement ce dont chacun a besoin&nbsp;:</P>
      <UL>
        <li>
          <strong className="font-semibold text-ink">L’équipe {BRAND}</strong>&nbsp;: pour traiter vos commandes et répondre à vos demandes.
        </li>
        <li>
          <strong className="font-semibold text-ink">Notre hébergeur</strong>&nbsp;:{' '}
          <Fact value={FACTS.host.name} what="nom de l’hébergeur" fact="host.name" tail="," /> qui fait fonctionner ce site.
        </li>
        <FactScope facts="payment.provider">
          <li>
            <strong className="font-semibold text-ink">Notre prestataire de paiement</strong>&nbsp;:{' '}
            <Fact value={FACTS.payment.provider} what="prestataire de paiement" fact="payment.provider" tail="," /> qui traite votre paiement.
          </li>
        </FactScope>
        <li>
          <strong className="font-semibold text-ink">Nos autres prestataires</strong>&nbsp;:{' '}
          <Fact value={processorsText()} what="prestataires qui reçoivent vos données" fact="privacy.processors.list" tail="." />
        </li>
        <li>
          <strong className="font-semibold text-ink">Les autorités</strong>&nbsp;: seulement quand la loi nous y oblige.
        </li>
      </UL>
      <P>Quand vous nous écrivez sur WhatsApp, vos messages passent aussi par ce service, qui applique ses propres règles de confidentialité.</P>
      <P>
        Transferts hors de l’Union européenne&nbsp;:{' '}
        <Fact value={p.processors.transfers} what="transferts hors de l’Union européenne" fact="privacy.processors.transfers" tail="." />
      </P>

      <H2 id="conservation">Combien de temps nous les gardons</H2>
      <Table
        caption="Durées de conservation"
        head={['Données', 'Durée']}
        rows={[
          ['Commandes et envoi des accès', <Value key="d" value={r.orders} what="durée de conservation des commandes" fact="privacy.retention.orders" />],
          ['Données techniques du service', <Value key="d" value={r.service} what="durée de conservation des données du service" fact="privacy.retention.service" />],
          ['Messages et échanges avec l’équipe', <Value key="d" value={r.messages} what="durée de conservation des messages" fact="privacy.retention.messages" />],
          ['Pièces comptables', <Value key="d" value={r.accounting} what="durée de conservation des pièces comptables" fact="privacy.retention.accounting" />],
          ['Journaux techniques du site', <Value key="d" value={r.logs} what="durée de conservation des journaux du site" fact="privacy.retention.logs" />],
        ]}
      />
      <P>Passé ces durées, nous supprimons vos données ou nous les rendons anonymes.</P>

      {/* The whole section rests on the measures the owner and the host confirm: no generic claim stands in for them,
          so it waits for the fact, with its entry in the table of contents (built from the headings on the page). */}
      <FactScope facts="privacy.security">
        <H2 id="securite">Comment nous les protégeons</H2>
        <P>
          Mesures de sécurité en place chez nous et chez notre hébergeur{' '}
          <Fact value={FACTS.host.name} what="nom de l’hébergeur" fact="host.name" lead="(" tail={')\u00a0:'} />{' '}
          <Fact value={present(p.security) ? formatList(p.security) : null} what="mesures de sécurité en place" fact="privacy.security" tail="." />
        </P>
        <P>Si un incident touche vos données et présente un risque élevé pour vous, nous vous prévenons sans attendre, comme le prévoit le RGPD.</P>
      </FactScope>

      <H2 id="droits">Vos droits</H2>
      <P>Vous avez les droits suivants, dans les conditions prévues par le RGPD et la loi Informatique et Libertés&nbsp;:</P>
      <UL>
        <li>accéder à vos données et en obtenir une copie&nbsp;;</li>
        <li>les faire corriger si elles sont inexactes&nbsp;;</li>
        <li>les faire effacer&nbsp;;</li>
        <li>en limiter l’utilisation&nbsp;;</li>
        <li>vous opposer à leur utilisation fondée sur notre intérêt légitime&nbsp;;</li>
        <li>récupérer les données que vous nous avez fournies, dans un format courant (portabilité)&nbsp;;</li>
        <li>donner des instructions sur ce que deviennent vos données après votre décès.</li>
      </UL>
      <P>
        Pour exercer un droit, écrivez à <Fact value={dpo} what="contact pour les données personnelles" fact="privacy.dpoContact" tail="." /> Nous
        vous répondons dans un délai d’un mois. Pour une demande complexe, ce délai peut être prolongé de deux mois&nbsp;: nous vous le disons
        alors. En cas de doute raisonnable sur votre identité, nous pouvons vous demander de la confirmer.
      </P>
      <P>
        Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (Commission nationale de
        l’informatique et des libertés), sur{' '}
        <TextA href="https://www.cnil.fr/" target="_blank" rel="noopener noreferrer" aria-label="cnil.fr (nouvel onglet)">
          cnil.fr
        </TextA>
        .
      </P>
      <P>
        Si vous nous donnez votre numéro de téléphone, sachez que vous pouvez vous inscrire sans frais sur la liste d’opposition au démarchage
        téléphonique, sur{' '}
        <TextA href="https://www.bloctel.gouv.fr/" target="_blank" rel="noopener noreferrer" aria-label="bloctel.gouv.fr (nouvel onglet)">
          bloctel.gouv.fr
        </TextA>
        .
      </P>
      {dpo && EMAIL.test(dpo) && (
        <div className="mt-6">
          <ButtonA href={mailtoHref(dpo) ?? undefined} variant="secondary" size="md" iconStart="ti-mail">
            Exercer mes droits
          </ButtonA>
        </div>
      )}

      <H2 id="cookies">Cookies et traceurs</H2>
      {COOKIE_TOOLS ? (
        <Suspense fallback={null}>
          <COOKIE_TOOLS.Table tools={COOKIE_TOOLS.tools} />
        </Suspense>
      ) : (
        <>
          <P>
            Ce site n’utilise aucun cookie ni traceur soumis à votre accord&nbsp;: pas de mesure d’audience, pas de publicité, pas de bouton de
            réseau social, pas de vidéo ni de carte intégrée. C’est pour cela qu’aucun bandeau ne vous demande votre accord.
          </P>
          <P>
            Il ne garde aucune information dans votre navigateur&nbsp;: votre panier n’existe que tant que la page reste ouverte. Les polices de
            caractères et les images viennent de notre hébergeur, avec le reste du site.
          </P>
        </>
      )}
      <P>
        Quand vous quittez ce site, pour payer ou pour nous écrire sur WhatsApp par exemple, le site que vous ouvrez applique sa propre
        politique de cookies.
      </P>
      {/* A promise for the day a tool comes: said only while none is listed (build-b T29, QA LT-17). Once one is, the
          section itself says how to change one's mind, with « Gérer mes cookies ». */}
      {!COOKIE_TOOLS && (
        <P>
          Si nous ajoutons un jour un outil de ce type, nous vous demanderons votre accord avant qu’il ne fonctionne, avec un bouton
          «&nbsp;Refuser&nbsp;» aussi visible que le bouton «&nbsp;Accepter&nbsp;». Vous pourrez changer d’avis à tout moment depuis cette section.
        </P>
      )}

      <p className="mt-12 border-t border-hairline pt-6 font-sans text-meta font-medium text-ink-muted">
        <FactScope facts="legal.lastUpdated.privacy" fallback="Nous mettons cette page à jour quand nos pratiques changent.">
          Dernière mise à jour&nbsp;:{' '}
          <Fact value={FACTS.legal.lastUpdated.privacy} what="date de cette version" fact="legal.lastUpdated.privacy" tail="." /> Nous mettons
          cette page à jour quand nos pratiques changent&nbsp;; cette date indique la version en vigueur.
        </FactScope>
      </p>
    </DocLayout>
  )
}
