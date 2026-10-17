import { ButtonA, ButtonLink, FactScope, Kw, Plaque, PlatePanel, Reveal, Section, WhatsAppButton, anyInScope, inScope } from '@/components/brand'
import { FACTS, mailtoHref, present, whatsappHref } from '@/lib/facts'
import { whatsappButtonProps } from '@/lib/site'
import { productBySlug } from '../product/data'
import { Fact } from '../theme/facts-ui'

const TRIAL_SLUG = 'essai'

// /abonnements/ › plans-trial: only when the owner offers a trial (APPROVAL §2.4). A light sign plate, never a
// dark or saturated band. On request: WhatsApp and e-mail. Through the cart: « Commander mon essai » once the trial
// page /abonnements/essai/ exists (not built, APPROVAL §2.3); until then the band asks for the trial as on request,
// like the home band. On the published site the band also waits for trial.terms.mode, which decides its button, and
// each term is said only once the owner has given it.
export function PlansTrial() {
  if (!present(FACTS.trial.offered) || !inScope('trial.terms.mode')) return null
  const terms = FACTS.trial.terms
  const cartPage = terms.mode === 'cart' && productBySlug(TRIAL_SLUG) ? `/abonnements/${TRIAL_SLUG}/` : null
  const mail = mailtoHref(FACTS.support.email)
  const wa = whatsappHref('Bonjour, je souhaite demander un essai.')
  return (
    <Section zone="paper" dataSection="plans-trial">
      <PlatePanel className="relative grid items-center gap-y-10 md:grid-cols-12 md:gap-x-8">
        <Reveal className="relative md:col-span-8">
          <h2 className="font-display text-display-md text-z-fg">
            Essayez d’abord, <Kw>choisissez</Kw> ensuite.
          </h2>
          {anyInScope(['trial.terms.duration', 'trial.terms.price', 'trial.terms.limits']) && (
            <p className="mt-5 font-sans text-copy text-z-soft">
              <FactScope facts="trial.terms.duration">
                Durée&nbsp;: <Fact value={terms.duration} what="durée de l’essai" fact="trial.terms.duration" tail="." />{' '}
              </FactScope>
              <FactScope facts="trial.terms.price">
                Prix&nbsp;: <Fact value={terms.price} what="prix de l’essai" fact="trial.terms.price" tail="." />{' '}
              </FactScope>
              <FactScope facts="trial.terms.limits">
                Limites&nbsp;: <Fact value={terms.limits} what="limites de l’essai" fact="trial.terms.limits" tail="." />
              </FactScope>
            </p>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {cartPage ? (
              <ButtonLink to={cartPage} variant="primary" size="md" iconEnd="arrow" full className="sm:w-auto">
                Commander mon essai
              </ButtonLink>
            ) : (
              <>
                <WhatsAppButton {...whatsappButtonProps(wa, 'Demander mon essai', 'Demander mon essai sur WhatsApp (nouvel onglet)')} size="md" full className="sm:w-auto" />
                {mail ? (
                  <ButtonA href={mail} variant="secondary" size="md" iconStart="ti-mail" full className="sm:w-auto">
                    Demander par e-mail
                  </ButtonA>
                ) : (
                  <Fact value={null} what="adresse e-mail du support" fact="support.email" />
                )}
              </>
            )}
          </div>
        </Reveal>
        <div className="hidden justify-center md:col-span-4 md:flex">
          <Plaque text="Essayer d’abord" className="md:size-36 lg:size-44" />
        </div>
      </PlatePanel>
    </Section>
  )
}
