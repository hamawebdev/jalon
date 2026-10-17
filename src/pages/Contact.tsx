import { FactScope, Kw, Section, TextLink, cardClass } from '@/components/brand'
import { FACTS } from '@/lib/facts'
import { BRAND } from '@/lib/site'
import { cn } from '@/lib/utils'
import { ContactChannels } from './contact/Channels'
import { ContactFormBand } from './theme/bands'
import { Fact } from './theme/facts-ui'
import { ContactHero } from './theme/heroes'

// /contact/ — Contact (copy contact.md, INVENTORY §4.9): the promise of a human answer, every way to reach the
// team, the written form, and one line on who runs the service.
export default function Contact() {
  const s = FACTS.support
  return (
    <div className="overflow-x-clip bg-paper">
      <ContactHero
        lead={
          <p>
            Une question avant de commander, un écran qui bloque, un souci de paiement&nbsp;: l’équipe vous répond{' '}
            <Fact value={s.hours} what="horaires du support" fact="support.hours" tail="." />
            <FactScope facts="support.responseTime">
              {' '}
              Réponse habituelle&nbsp;: <Fact value={s.responseTime} what="délai de réponse" fact="support.responseTime" tail="." />
            </FactScope>
          </p>
        }
      />
      <ContactChannels />
      <ContactFormBand
        heading={
          <>
            Par écrit, <Kw>à votre rythme</Kw>.
          </>
        }
      />
      {/* One closing line on a slim card (16px corners), no rule: who runs the service, and the way to the legal notice. */}
      <Section zone="paper" dataSection="contact-company" rhythm="none" className="pb-section">
        <p className={cn(cardClass.inner, 'px-5 py-4 font-sans text-small text-z-soft md:px-6')}>
          Le service {BRAND} est proposé par{' '}
          <Fact value={FACTS.company.legalName} what="dénomination sociale" fact="company.legalName" tail="," />{' '}
          <Fact value={FACTS.company.address} what="adresse du siège social" fact="company.address" tail="." />{' '}
          {/* The link keeps its words together: on a narrow line it takes the next one whole. */}
          <TextLink to="/mentions-legales/" className="font-semibold whitespace-nowrap">
            Voir les mentions légales
          </TextLink>
        </p>
      </Section>
    </div>
  )
}
