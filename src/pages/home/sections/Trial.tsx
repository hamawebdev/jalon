import { ButtonLink, FactScope, Kw, PlatePanel, Section, WhatsAppButton, anyInScope, type Zone } from '@/components/brand'
import { FACTS, whatsappHref } from '@/lib/facts'
import { BRAND, WHATSAPP_LINK_PROPS } from '@/lib/site'
import { productBySlug } from '../../product/data'
import { NB } from '../../product/facts-text'
import { Fact } from '../../product/shared'
import { homeTrialShown } from '../bands'

const COPY = {
  titleStart: 'Essayez ',
  titleKeyword: 'avant de vous abonner',
  titleEnd: '.',
  request: 'Demander mon essai',
  requestAria: 'Demander mon essai sur WhatsApp (nouvel onglet)',
  /** The customer's own words, prefilled in WhatsApp. */
  message: `Bonjour, je voudrais essayer ${BRAND}. Mon appareil${NB}: `,
  order: 'Commander mon essai',
}

const TRIAL_SLUG = 'essai'

/** The three terms of the body line; each sentence goes with its fact in launch mode. */
const TERMS = ['trial.terms.duration', 'trial.terms.price', 'trial.terms.limits']

/**
 * home-trial: a slim sign plate with the trial terms and one action, only when the owner offers a trial
 * (trial.offered, and its mode in launch mode: ../bands.ts). Never a saturated full-width band (IDENTITY §5.4).
 * Hidden today.
 */
export function HomeTrial({ zone = 'paper' }: { zone?: Zone }) {
  const { terms } = FACTS.trial
  if (!homeTrialShown()) return null
  // A trial sold through the cart needs its page (/abonnements/essai/, not built: APPROVAL §2.3).
  const cartPage = terms.mode === 'cart' && productBySlug(TRIAL_SLUG) ? `/abonnements/${TRIAL_SLUG}/` : null
  return (
    <Section zone={zone} dataSection="home-trial" rhythm="sm">
      <PlatePanel size="small" className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10 md:px-8 md:py-7">
        <div>
          <h2 className="font-display text-display-sm text-z-fg">
            {COPY.titleStart}
            <Kw>{COPY.titleKeyword}</Kw>
            {COPY.titleEnd}
          </h2>
          {anyInScope(TERMS) && (
            <p className="mt-3 font-sans text-copy text-z-soft">
              <FactScope facts="trial.terms.duration">
                Durée{NB}: <Fact value={terms.duration} what="durée de l’essai" fact="trial.terms.duration" tail="." />{' '}
              </FactScope>
              <FactScope facts="trial.terms.price">
                Prix{NB}: <Fact value={terms.price} what="prix de l’essai" fact="trial.terms.price" tail="." />{' '}
              </FactScope>
              <FactScope facts="trial.terms.limits">
                Limites{NB}: <Fact value={terms.limits} what="limites de l’essai" fact="trial.terms.limits" tail="." />
              </FactScope>
            </p>
          )}
        </div>
        {cartPage ? (
          <ButtonLink to={cartPage} variant="primary" size="lg" iconEnd="arrow">
            {COPY.order}
          </ButtonLink>
        ) : (
          <WhatsAppButton
            label={COPY.request}
            href={whatsappHref(COPY.message)}
            aria-label={COPY.requestAria}
            {...WHATSAPP_LINK_PROPS}
            size="lg"
          />
        )}
      </PlatePanel>
    </Section>
  )
}
