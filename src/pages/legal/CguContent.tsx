import { ButtonLink, FactScope, TextLink, WhatsAppButton } from '@/components/brand'
import { DEVICE_FAMILIES, FACTS, formatList, present } from '@/lib/facts'
import { BRAND, whatsappButtonProps } from '@/lib/site'
import { Fact } from '../theme/facts-ui'
import { DocLayout, H2, HelpCard, P, UL } from './shared'

/** The recommended third-party players, by name (apps.thirdParty), in a sentence. */
function thirdPartyText() {
  const t = FACTS.apps.thirdParty
  if (!present(t)) return null
  const names = DEVICE_FAMILIES.flatMap((f) => t[f]?.map((a) => `« ${a.name} »`) ?? [])
  return formatList([...new Set(names)])
}

// /conditions-utilisation/ (copy cgu.md, INVENTORY §4.13): the rules for using the site and the service, eight
// sections and the closing help card. Clauses in notes-legal.md §6 wait for a lawyer's read.
export function CguContent() {
  return (
    <DocLayout
      title="Conditions générales d’utilisation"
      lead={<p>Les règles pour utiliser ce site et le service {BRAND}, en mots simples. Elles complètent nos conditions générales de vente.</p>}
      version={{ date: FACTS.legal.lastUpdated.cgu, fact: 'legal.lastUpdated.cgu' }}
    >
      <H2 id="objet">À quoi servent ces conditions</H2>
      <P>
        Elles s’appliquent à toute personne qui visite ce site ou utilise le service {BRAND}, exploité par{' '}
        <Fact value={FACTS.company.legalName} what="dénomination sociale" fact="company.legalName" tail="." /> L’achat d’un abonnement suit nos{' '}
        <TextLink to="/conditions-generales-de-vente/">conditions générales de vente</TextLink>, et l’usage de vos données, notre{' '}
        <TextLink to="/politique-de-confidentialite/">politique de confidentialité</TextLink>.
      </P>

      <H2 id="vos-acces">Vos accès et vos codes</H2>
      <P>
        Après votre commande, vous recevez des accès pour regarder le service.
        <FactScope facts="usage.sharing">
          {' '}
          Ce que vous pouvez en faire, notamment le nombre d’écrans et le partage&nbsp;:{' '}
          <Fact value={FACTS.usage.sharing} what="règles d’installation et de partage" fact="usage.sharing" tail="." />
        </FactScope>
      </P>
      <P>
        Prenez soin de vos codes&nbsp;: toute personne qui les connaît peut s’en servir. Si vous pensez que quelqu’un d’autre les a vus,
        écrivez-nous.
        <FactScope facts="delivery.resend">
          {' '}
          Pour obtenir de nouveaux codes&nbsp;: <Fact value={FACTS.delivery.resend} what="renvoi des accès" fact="delivery.resend" tail="." />
        </FactScope>
      </P>

      <H2 id="usages-interdits">Ce qui n’est pas permis</H2>
      <P>En utilisant ce site ou le service, vous vous engagez à ne pas&nbsp;:</P>
      <UL>
        <li>copier ou enregistrer les programmes pour les partager ou les rediffuser&nbsp;;</li>
        <li>montrer les programmes dans un lieu public ou contre paiement&nbsp;;</li>
        <li>
          <FactScope facts="reseller.rules.channels" fallback={<>revendre ou céder vos accès sans notre accord écrit&nbsp;;</>}>
            revendre ou céder vos accès en dehors des règles prévues&nbsp;:{' '}
            <Fact value={FACTS.reseller.rules.channels} what="canaux de revente autorisés" fact="reseller.rules.channels" tail={'\u00a0;'} />
          </FactScope>
        </li>
        <li>chercher à contourner les protections du service ou à perturber son fonctionnement&nbsp;;</li>
        <li>utiliser nos formulaires pour envoyer des messages automatisés, trompeurs ou illicites.</li>
      </UL>
      <P>
        En cas de manquement grave à ces règles, nous pouvons suspendre vos accès. Sauf urgence, nous vous prévenons avant et vous pouvez nous
        donner votre point de vue.
      </P>

      <H2 id="contenus">Les programmes et le site</H2>
      <P>
        Les chaînes, les films, les séries et les autres programmes appartiennent à leurs ayants droit.
        <FactScope facts="content.licensing">
          {' '}
          <Fact value={FACTS.content.licensing} what="base sur laquelle les chaînes et les programmes sont distribués" fact="content.licensing" />
        </FactScope>
      </P>
      <P>
        Les textes, le logo et les illustrations de ce site appartiennent à{' '}
        <Fact value={FACTS.company.legalName} what="dénomination sociale" fact="company.legalName" tail="." /> Le détail est dans nos{' '}
        <TextLink to="/mentions-legales/#propriete-intellectuelle">mentions légales</TextLink>.
      </P>

      <H2 id="applications-tiers">Applications et sites d’autres éditeurs</H2>
      <P>
        <FactScope facts="apps.thirdParty" fallback="Pour regarder, vous pouvez utiliser une application d’un autre éditeur.">
          Pour regarder, vous pouvez utiliser une application d’un autre éditeur&nbsp;:{' '}
          <Fact value={thirdPartyText()} what="applications conseillées" fact="apps.thirdParty" tail="." />
        </FactScope>{' '}
        Chacune a ses propres conditions, et certaines demandent une licence payante&nbsp;: ce coût n’est pas compris dans votre abonnement.
      </P>
      <P>
        Les liens vers d’autres sites (paiement, messagerie, magasins d’applications) vous font quitter ce site. Ces sites appliquent leurs
        propres règles, et nous ne les contrôlons pas.
      </P>

      <H2 id="responsabilites">Responsabilités</H2>
      <P>
        Nous faisons le nécessaire pour que le site et le service fonctionnent correctement. Nous ne sommes pas responsables d’un problème qui
        vient de votre connexion, de votre appareil ou d’une application d’un autre éditeur. Cette limite ne s’applique ni à nos propres
        manquements, ni aux garanties légales dont vous bénéficiez.
      </P>

      <H2 id="modifications">Quand ces conditions changent</H2>
      <P>
        Nous pouvons modifier ces conditions, par exemple quand le service évolue ou que la loi change.
        {/* The sentence points at the version line of the header: it waits for the same date. */}
        <FactScope facts="legal.lastUpdated.cgu"> La date en haut de page indique la version en vigueur.</FactScope> Si un changement touche
        votre abonnement en cours, nous vous prévenons avant qu’il s’applique.
      </P>

      <H2 id="droit-applicable">Droit applicable et litiges</H2>
      <P>
        Le droit français s’applique à ces conditions. En cas de désaccord, écrivez-nous d’abord. Vous pouvez ensuite saisir sans frais le
        médiateur de la consommation, ou le tribunal compétent&nbsp;: tout est détaillé dans nos{' '}
        <TextLink to="/conditions-generales-de-vente/#litiges">conditions générales de vente</TextLink>.
      </P>

      <HelpCard
        id="nous-ecrire"
        heading={'Un point n’est pas clair\u00a0?'}
        actions={
          <>
            <ButtonLink to="/contact/" variant="secondary" size="md" iconEnd="arrow">
              Poser une question
            </ButtonLink>
            <WhatsAppButton {...whatsappButtonProps()} size="md" />
          </>
        }
      >
        Écrivez-nous&nbsp;: on vous explique, sans jargon.
      </HelpCard>
    </DocLayout>
  )
}
