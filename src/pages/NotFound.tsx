import { useLocation } from 'react-router'
import { ButtonLink, Kw, Mire, NuitPanel, Reveal, Section, TextLink } from '@/components/brand'

// 404 (copy 404.md): one message in a contained Nuit panel (the kit's screen panel: rounded, corner marks) on the
// paper page, centred: the Mire test card, the line, one button and two text links. The page stays light around it,
// so the panel does not run into the Nuit footer. No rule, and no yellow but the drawing's square and the h1 stroke.
// Old template paths land here too (no redirects, APPROVAL §2.1). Also rendered by Product.tsx for an unknown plan
// slug: then the plans page is the main way back.
export default function NotFound() {
  const { pathname } = useLocation()
  const plan = pathname.startsWith('/abonnements/')
  const link = 'font-sans text-[0.9375rem] font-semibold'
  return (
    <Section zone="paper" dataSection="notfound" rhythm="hero">
      <NuitPanel className="flex flex-col items-center text-center lg:py-14">
        <div aria-hidden="true" className="pointer-events-none relative grid w-full place-items-center">
          <Mire className="relative max-w-[260px] md:max-w-[340px] lg:max-w-[380px]" />
        </div>

        <div className="relative mt-10 flex max-w-[640px] flex-col items-center md:mt-12">
          <Reveal>
            <h1 className="font-display text-display-md text-z-fg">
              Cette page n’est&nbsp;pas <Kw>au programme</Kw>.
            </h1>
          </Reveal>
          <Reveal index={1}>
            <p className="mx-auto mt-5 max-w-[48ch] font-sans text-lead text-z-soft">
              {plan ? (
                'Cette formule ne fait pas partie de nos offres. Toutes les durées proposées sont sur la page des formules.'
              ) : (
                <>
                  Le lien est peut-être ancien ou incomplet. Reprenez depuis l’accueil, ou{' '}
                  <TextLink to="/contact/">dites-nous ce que vous cherchiez</TextLink>.
                </>
              )}
            </p>
          </Reveal>

          {/* One button, then the two other ways out as text links in 44px boxes. */}
          <div className="mt-8 flex w-full flex-col items-center gap-x-7 gap-y-2 sm:w-auto sm:flex-row md:mt-9">
            {plan ? (
              <>
                <ButtonLink to="/abonnements/" variant="plate" size="md" iconEnd="arrow" full className="max-sm:mb-2 sm:w-auto">
                  Voir les formules
                </ButtonLink>
                <TextLink to="/" standalone className={link}>
                  Aller à l’accueil
                </TextLink>
              </>
            ) : (
              <>
                <ButtonLink to="/" variant="plate" size="md" iconEnd="arrow" full className="max-sm:mb-2 sm:w-auto">
                  Aller à l’accueil
                </ButtonLink>
                <TextLink to="/abonnements/" standalone className={link}>
                  Voir les formules
                </TextLink>
              </>
            )}
            <TextLink to="/aide/" standalone className={link}>
              Trouver de l’aide
            </TextLink>
          </div>
        </div>
      </NuitPanel>
    </Section>
  )
}
