import {
  FactScope,
  Kw,
  PlatePanel,
  Reveal,
  Section,
  SectionHead,
  TextLink,
  type Zone,
} from '@/components/brand'
import { FACTS } from '@/lib/facts'
import { F, NB } from '../../product/facts-text'
import { Fact, WhatsAppAction } from '../../product/shared'
import { StepPath } from '../../product/StepPath'
import { ROUTES } from '../data'

const HEAD = {
  eyebrow: 'Comment ça marche',
  titleStart: 'De la commande à la ',
  titleKeyword: 'première soirée',
  titleEnd: '.',
  guides: 'Voir les guides d’installation',
  help: `Une question, un écran qui bloque${NB}? Écrivez-nous sur WhatsApp et envoyez une photo${NB}: on regarde avec vous.`,
  whatsapp: 'Écrire sur WhatsApp',
}

/** Real steps, so real numbers (IDENTITY §5.4). Step 02 covers receiving the access details and installing. */
const STEPS = [
  { index: '01', title: 'Choisissez', text: <>Prenez la durée qui vous va, puis payez votre commande.</> },
  {
    index: '02',
    title: 'Installez',
    text: (
      <>
        Vous recevez{' '}
        {/* Launch mode, kind of access not given: « vos accès » (copy home.md › home-how-it-works). */}
        <FactScope facts="delivery.credentialTypes" fallback="vos accès">
          <Fact value={F.credentials} what="type d’accès" fact="delivery.credentialTypes" />
        </FactScope>{' '}
        par <Fact value={F.deliveryChannel} what="canal d’envoi" fact="delivery.channel" tail="," /> puis vous installez l’application.
      </>
    ),
  },
  { index: '03', title: 'Installez-vous', text: <>Saisissez vos accès, lancez une chaîne{NB}: la soirée commence.</> },
]

/** The two figures, both owner facts (no install time or compatibility rate without a source). */
const FIGURES = [
  { label: 'Délai d’activation', value: FACTS.delivery.delay, what: 'délai', fact: 'delivery.delay' },
  { label: 'Aide sur WhatsApp', value: FACTS.support.hours, what: 'horaires', fact: 'support.hours' },
]

/**
 * home-how-it-works: the path from payment to the first evening in three numbered steps, the two figures that
 * frame it (activation delay, support hours), the way to the setup guides, and the help promise on a sign plate.
 * T28: the steps are one path (StepPath: the kit's step discs joined by a rail, beside their text on phones, in a
 * row from md; the renewal page uses the same) and the two figures sit in one card with a single hairline between
 * them. Before, every step and every figure carried its own top rule: nine rules in one band.
 */
export function HomeHowItWorks({ zone = 'paper' }: { zone?: Zone }) {
  return (
    <Section zone={zone} dataSection="home-how-it-works">
      <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-grid">
        <SectionHead
          className="lg:col-span-7"
          eyebrow={HEAD.eyebrow}
          title={
            <>
              {HEAD.titleStart}
              <Kw>{HEAD.titleKeyword}</Kw>
              {HEAD.titleEnd}
            </>
          }
        />
        <dl className="m-0 grid rounded-card border border-z-line bg-z-card px-5 md:px-6 lg:col-span-5 lg:col-start-8">
          {FIGURES.map((f) => (
            <div key={f.label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5 border-z-line py-4 not-first:border-t">
              <dt className="font-sans text-meta font-semibold text-z-muted">{f.label}</dt>
              <dd className="m-0 font-display text-title text-z-fg">
                <Fact value={f.value} what={f.what} fact={f.fact} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Reveal className="mt-head">
        <StepPath steps={STEPS} />
        <p className="mt-10">
          {/* Alone on its line: a 44px tap box; the negative margin keeps the lines where they were. */}
          <TextLink to={ROUTES.apps} standalone className="-my-2.5 font-sans text-small font-semibold">
            {HEAD.guides}
          </TextLink>
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <PlatePanel size="small" className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10 md:px-8">
          <p className="max-w-[60ch] font-sans text-copy font-medium text-z-fg">{HEAD.help}</p>
          <WhatsAppAction label={HEAD.whatsapp} className="shrink-0 max-md:w-full" />
        </PlatePanel>
      </Reveal>
    </Section>
  )
}
