import { ButtonLink, Card, FactScope, IconTile, Kw, Section, SectionHead, WhatsAppButton, inScope } from '@/components/brand'
import { DEVICE_FAMILIES, DEVICE_FAMILY_LABEL, FACTS, formatList, present, type DeviceFamily } from '@/lib/facts'
import { BRAND, whatsappButtonProps } from '@/lib/site'
import { FAMILY_ICON } from '../download/families'
import { JumpChip } from '../theme/chips'
import { Email, EmailButton, Fact, WaNumber } from '../theme/facts-ui'

/** Chip label of each family on /aide/ (GLOSSARY §3: « Console de jeu » here). */
const HELP_CHIP: Record<DeviceFamily, string> = {
  ...Object.fromEntries(DEVICE_FAMILIES.map((f) => [f, DEVICE_FAMILY_LABEL[f].chip])),
  console: 'Console de jeu',
} as Record<DeviceFamily, string>

/**
 * help-guides-link: one jump chip per device family, to its guide on /applications/. The chips are quiet pills
 * (the edge of a field), so the band keeps one button: « Voir les guides d’installation ».
 */
export function HelpGuidesLink() {
  const supported = FACTS.devices.supported
  const families = present(supported) ? DEVICE_FAMILIES.filter((f) => present(supported[f])) : DEVICE_FAMILIES
  return (
    <Section zone="band" dataSection="help-guides-link" rhythm="sm" containerClassName="grid gap-x-grid gap-y-8 lg:grid-cols-12 lg:items-end">
      <SectionHead
        className="lg:col-span-6"
        title={
          <>
            Chaque appareil a son <Kw>guide</Kw>.
          </>
        }
        lead="L’application à installer, où saisir vos accès et les réglages utiles, étape par étape."
        size="sm"
      >
        <div className="mt-7">
          <ButtonLink to="/applications/#guides" variant="secondary" size="md" iconEnd="arrow" className="max-sm:w-full">
            Voir les guides d’installation
          </ButtonLink>
        </div>
      </SectionHead>
      <ul aria-label="Guides d’installation par appareil" className="flex list-none flex-wrap gap-2 p-0 lg:col-span-6 lg:justify-end">
        {families.map((f) => (
          <li key={f}>
            <JumpChip to={`/applications/#${DEVICE_FAMILY_LABEL[f].guide}`} icon={FAMILY_ICON[f]}>
              {HELP_CHIP[f]}
            </JumpChip>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/** help-contact: the three channels, WhatsApp first; which topic goes where, hours and response time. */
export function HelpContact() {
  const s = FACTS.support
  // The form has a « Sujet » select only once the owner lists the subjects: until then the card names none (GLOSSARY §6).
  const hasTopics = present(s.topics)
  // The meta line of each card: left out on the published site until the owner gives the response time.
  const response = inScope('support.responseTime') ? (
    <p className="mt-3 font-sans text-meta font-medium text-z-muted">
      Réponse habituelle&nbsp;: <Fact value={s.responseTime} what="délai de réponse" fact="support.responseTime" />
    </p>
  ) : null
  return (
    <Section zone="paper" dataSection="help-contact">
      <SectionHead
        title={
          <>
            Écrivez à <Kw>l’équipe</Kw> {BRAND}.
          </>
        }
        lead={
          <>
            Choisissez le canal selon votre demande.{' '}
            <FactScope
              facts="support.languages"
              fallback={
                <>
                  On vous répond <Fact value={s.hours} what="horaires du support" fact="support.hours" tail="." />
                </>
              }
            >
              On vous répond <Fact value={s.hours} what="horaires du support" fact="support.hours" tail="," /> en{' '}
              <Fact value={s.languages} what="langues du support" fact="support.languages" tail="." />
            </FactScope>
          </>
        }
      />
      <ul className="mt-head grid list-none gap-grid p-0 md:grid-cols-3">
        <li className="min-w-0">
          <Card radius="panel" className="flex h-full flex-col">
            <IconTile icon="ti-brand-whatsapp" size={44} />
            <h3 className="mt-5 font-display text-title-lg text-z-fg">WhatsApp</h3>
            <p className="mt-1 font-sans text-small font-semibold text-z-fg">
              <WaNumber standalone />
            </p>
            <p className="mt-3 font-sans text-small text-z-soft">Installation, écran qui bloque&nbsp;: envoyez une photo, on regarde avec vous.</p>
            {response}
            <div className="mt-auto pt-6">
              <WhatsAppButton {...whatsappButtonProps()} size="md" full />
            </div>
          </Card>
        </li>
        <li className="min-w-0">
          <Card radius="panel" className="flex h-full flex-col">
            <IconTile icon="ti-mail" size={44} />
            <h3 className="mt-5 font-display text-title-lg text-z-fg">E-mail</h3>
            <p className="mt-1 font-sans text-small font-semibold break-anywhere text-z-fg">
              <Email standalone />
            </p>
            <p className="mt-3 font-sans text-small text-z-soft">Pour une demande écrite et détaillée sur votre commande.</p>
            {response}
            <div className="mt-auto pt-6">
              <EmailButton full />
            </div>
          </Card>
        </li>
        <li className="min-w-0">
          <Card radius="panel" className="flex h-full flex-col">
            <IconTile icon="ti-forms" size={44} />
            <h3 className="mt-5 font-display text-title-lg text-z-fg">Formulaire de contact</h3>
            <p className="mt-3 font-sans text-small text-z-soft">
              {hasTopics
                ? 'Choisissez un sujet\u00a0: votre demande arrive au bon endroit.'
                : 'Une question avant de commander, ou toute autre demande\u00a0: on vous répond à l’adresse e-mail indiquée.'}
            </p>
            {hasTopics ? (
              <p className="mt-3 font-sans text-meta font-medium text-z-muted">
                Sujets&nbsp;: <Fact value={formatList(s.topics)} what="sujets du formulaire" fact="support.topics" />
              </p>
            ) : (
              response
            )}
            <div className="mt-auto pt-6">
              <ButtonLink to="/contact/" variant="secondary" size="md" iconEnd="arrow" full>
                Ouvrir le formulaire
              </ButtonLink>
            </div>
          </Card>
        </li>
      </ul>
    </Section>
  )
}
