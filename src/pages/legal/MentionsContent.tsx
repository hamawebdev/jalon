import { FactScope, TextLink, linkStandaloneClass } from '@/components/brand'
import { FACTS, mailtoHref, needsShareCapital, telHref } from '@/lib/facts'
import { BRAND } from '@/lib/site'
import { Fact } from '../theme/facts-ui'
import { DocLayout, H2, IdentityList, P, Value } from './shared'

/** A link that is the whole value of an identity row: the kit's link in a 44px tap box that keeps the row's height. */
const rowLink = `${linkStandaloneClass} -my-2`

// /mentions-legales/ (copy mentions-legales.md, INVENTORY §4.11): who publishes the site, who hosts it, who owns
// its content, the data contact and the consumer mediator. Every value is an owner fact.
export function MentionsContent() {
  const c = FACTS.company
  const host = FACTS.host
  const m = FACTS.consumer.mediator
  // « Capital social » only for a company; until the legal form is known, every row shows its marker. The same
  // test decides whether `npm run launch-check` asks for company.capital, so the page and the check agree.
  const showCapital = needsShareCapital(c.form)
  return (
    <DocLayout title="Mentions légales" lead={<p>Qui publie ce site, qui l’héberge et comment nous joindre.</p>}>
      <H2 id="editeur">Qui édite ce site</H2>
      <P>
        Ce site et le service {BRAND} sont exploités par l’entreprise ci-dessous. Dans nos pages légales, «&nbsp;nous&nbsp;» désigne cette
        entreprise.
      </P>
      <IdentityList
        label="Identité de l’éditeur"
        rows={[
          { title: 'Dénomination sociale', value: <Value value={c.legalName} what="dénomination sociale" fact="company.legalName" /> },
          { title: 'Forme juridique', value: <Value value={c.form} what="forme juridique" fact="company.form" /> },
          ...(showCapital ? [{ title: 'Capital social', value: <Value value={c.capital} what="capital social" fact="company.capital" /> }] : []),
          { title: 'Siège social', value: <Value value={c.address} what="adresse du siège social" fact="company.address" /> },
          { title: 'Immatriculation', value: <Value value={c.rcs} what="ville et numéro d’immatriculation" fact="company.rcs" /> },
          { title: 'SIREN ou SIRET', value: <Value value={c.siret} what="numéro SIREN ou SIRET" fact="company.siret" /> },
          {
            title: 'TVA intracommunautaire',
            value: <Value value={c.vatNumber} what="numéro de TVA ou mention d’exonération" fact="company.vatNumber" />,
          },
          {
            title: 'Téléphone',
            value: <Value value={c.phone && <a href={telHref(c.phone) ?? undefined} className={rowLink}>{c.phone}</a>} what="numéro de téléphone" fact="company.phone" />,
          },
          {
            title: 'E-mail',
            value: <Value value={c.email && <a href={mailtoHref(c.email) ?? undefined} className={rowLink}>{c.email}</a>} what="adresse e-mail" fact="company.email" />,
          },
        ]}
      />

      <H2 id="publication">Direction de la publication</H2>
      <P>
        Directeur ou directrice de la publication&nbsp;:{' '}
        <Fact value={c.director} what="nom de la personne responsable de la publication" fact="company.director" />
      </P>

      <H2 id="hebergement">Hébergement</H2>
      <P>Ce site est hébergé par&nbsp;:</P>
      <IdentityList
        label="Hébergeur du site"
        rows={[
          { title: 'Hébergeur', value: <Value value={host.name} what="nom de l’hébergeur" fact="host.name" /> },
          { title: 'Adresse', value: <Value value={host.address} what="adresse de l’hébergeur" fact="host.address" /> },
          { title: 'Téléphone', value: <Value value={host.phone} what="téléphone de l’hébergeur" fact="host.phone" /> },
        ]}
      />

      <H2 id="propriete-intellectuelle">Propriété intellectuelle</H2>
      <P>
        Les textes, le logo, les illustrations et la mise en page de ce site appartiennent à{' '}
        <Fact value={c.legalName} what="dénomination sociale" fact="company.legalName" tail="," /> qui exploite le nom {BRAND}. Sauf exception
        prévue par la loi, comme une courte citation, vous ne pouvez pas les reproduire ni les réutiliser sans notre accord écrit.
      </P>
      <P>
        Les programmes accessibles avec un abonnement appartiennent à leurs ayants droit.
        <FactScope facts="content.licensing">
          {' '}
          <Fact value={FACTS.content.licensing} what="base sur laquelle les chaînes et les programmes sont distribués" fact="content.licensing" />
        </FactScope>
      </P>

      <H2 id="vos-donnees">Vos données personnelles</H2>
      <P>
        Notre politique de confidentialité explique quelles données nous utilisons, pourquoi, combien de temps nous les gardons et comment
        exercer vos droits. Pour toute question sur vos données&nbsp;:{' '}
        <Fact value={FACTS.privacy.dpoContact} what="contact pour les données personnelles" fact="privacy.dpoContact" tail="." />
      </P>
      <P>
        Ce site ne dépose aucun cookie ni traceur soumis à votre accord, ni pour mesurer l’audience ni pour la publicité.{' '}
        <TextLink to="/politique-de-confidentialite/#cookies">Le détail est dans la section Cookies</TextLink>.
      </P>
      <P>
        <TextLink to="/politique-de-confidentialite/" standalone className="-my-2.5 font-semibold">
          Voir la politique de confidentialité
        </TextLink>
      </P>

      <H2 id="mediation">Médiation de la consommation</H2>
      <P>
        En cas de désaccord, adressez-nous d’abord une réclamation écrite. Si nous ne trouvons pas de solution ensemble, vous pouvez saisir
        sans frais le médiateur de la consommation ci-dessous, dans l’année qui suit votre réclamation (articles L612-1 et L612-2 du Code de la
        consommation).
      </P>
      <IdentityList
        label="Médiateur de la consommation"
        rows={[
          { title: 'Médiateur', value: <Value value={m.name} what="nom du médiateur" fact="consumer.mediator.name" /> },
          {
            title: 'Site',
            value: (
              <Value
                value={m.website && <a href={m.website} target="_blank" rel="noopener noreferrer" className={rowLink}>{m.website}</a>}
                what="site du médiateur"
                fact="consumer.mediator.website"
              />
            ),
          },
          { title: 'Adresse', value: <Value value={m.address} what="adresse du médiateur" fact="consumer.mediator.address" /> },
        ]}
      />
    </DocLayout>
  )
}
