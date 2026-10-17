import type { ReactNode } from 'react'
import { ButtonLink, FactScope, FormCard, IconTile, PlatePanel, Pending, Reveal, Section, TextLink, WhatsAppButton, inScope } from '@/components/brand'
import type { Zone } from '@/components/brand'
import { FACTS, whatsappHref } from '@/lib/facts'
import { WHATSAPP_CHAT_HREF, whatsappButtonProps } from '@/lib/site'
import { ContactFormCard, type ContactFormVariant } from './ContactFormCard'
import { Fact } from './facts-ui'

// Closing bands of the inner pages: the written-request form (plans, contact), the reseller contact block and
// the help panel of /applications/. Light panels only: Nuit stays for screens and the footer.

/**
 * Response-time line shared by the forms: « Réponse habituelle : … ». The whole sentence waits for its fact on the
 * published site (support.responseTime is optional).
 */
export function ResponseTime() {
  if (!inScope('support.responseTime')) return null
  return (
    <>
      Réponse habituelle&nbsp;: <Fact value={FACTS.support.responseTime} what="délai de réponse" fact="support.responseTime" tail="." />
    </>
  )
}

/** Form heading (5 columns, sticky from lg) + the form card (7 columns). */
function FormBand({
  dataSection,
  id,
  zone,
  icon,
  heading,
  lead,
  variant,
  className,
}: {
  dataSection: string
  id?: string
  zone: Zone
  icon: string
  heading: ReactNode
  lead: ReactNode
  variant: ContactFormVariant
  /** Section classes (a slimmer foot when a closing line follows on the same ground). */
  className?: string
}) {
  return (
    <Section zone={zone} id={id} dataSection={dataSection} className={className} containerClassName="grid items-start gap-x-grid gap-y-8 md:gap-y-10 lg:grid-cols-12">
      <Reveal className="lg:sticky lg:top-24 lg:col-span-5 lg:pt-2 lg:pr-8">
        <IconTile icon={icon} size={56} />
        <h2 className="mt-6 font-display text-display-sm text-z-fg md:mt-8">{heading}</h2>
        <p className="mt-4 max-w-[44ch] font-sans text-copy text-z-soft">{lead}</p>
      </Reveal>
      <FormCard className="relative md:p-8 lg:col-span-7 lg:p-10">
        <ContactFormCard idPrefix={`${dataSection}-form`} variant={variant} />
      </FormCard>
    </Section>
  )
}

/** /abonnements/ › plans-question-form. */
export function PlansQuestionBand({ heading }: { heading: ReactNode }) {
  return (
    <FormBand
      dataSection="plans-question-form"
      zone="band"
      icon="ti-message-question"
      heading={heading}
      lead={
        <>
          Posez votre question ici&nbsp;: on vous répond par e-mail. <ResponseTime />
        </>
      }
      variant="plans"
    />
  )
}

/** /contact/ › contact-form. The company line closes the page right under it, on the same ground: a slim foot. */
export function ContactFormBand({ heading }: { heading: ReactNode }) {
  return (
    <FormBand
      dataSection="contact-form"
      id="formulaire"
      zone="paper"
      className="pb-section-sm"
      icon="ti-mail-opened"
      heading={heading}
      lead={
        <>
          Décrivez votre demande&nbsp;: on vous répond à l’adresse indiquée. <ResponseTime />
        </>
      }
      variant="contact"
    />
  )
}

/**
 * /revendeur/ › reseller-contact: the light panel with the WhatsApp action, then the form. The WhatsApp button
 * uses reseller.contact when it is a phone number, support.whatsapp otherwise.
 */
export function ResellerContactBand({ heading }: { heading: ReactNode }) {
  const contact = FACTS.reseller.contact
  const resellerWa = contact && /^\+?[\d\s().-]{6,}$/.test(contact) ? whatsappHref(undefined, contact) : null
  return (
    <Section
      zone="band"
      id="contact-revendeur"
      dataSection="reseller-contact"
      containerClassName="grid items-start gap-x-grid gap-y-6 md:gap-y-8 lg:grid-cols-12"
    >
      <Reveal className="lg:sticky lg:top-24 lg:col-span-5">
        <PlatePanel size="small" className="p-6 md:p-8 lg:p-10">
          <h2 className="font-display text-display-sm text-z-fg">{heading}</h2>
          <p className="mt-4 font-sans text-copy text-z-soft">
            Dites-nous où et à qui vous comptez revendre&nbsp;: on vous répond avec les conditions du programme.
          </p>
          <FactScope facts="reseller.contact">
            <p className="mt-3 font-sans text-small text-z-soft">
              Contact revendeurs&nbsp;: {contact ?? <Pending what="contact revendeurs" fact="reseller.contact" />}
            </p>
          </FactScope>
          <WhatsAppButton {...whatsappButtonProps(resellerWa ?? WHATSAPP_CHAT_HREF)} size="lg" full className="mt-7 sm:w-auto" />
        </PlatePanel>
      </Reveal>
      <FormCard className="relative md:p-8 lg:col-span-7 lg:p-10">
        <h3 className="mb-8 font-display text-title-lg text-z-fg">Présentez-nous votre activité</h3>
        <ContactFormCard idPrefix="reseller-contact-form" variant="reseller" />
      </FormCard>
    </Section>
  )
}

/**
 * /applications/ › apps-help: the help promise on a light panel, WhatsApp and the link to /aide/; then, on a paper
 * strip clipped to the panel's corners, the way back to the plans, so the device check ends on the next step and
 * not on the menu. The strip holds the page's one filled button.
 */
export function AppsHelpBand() {
  return (
    <Section zone="paper" dataSection="apps-help" continues>
      <PlatePanel className="overflow-hidden p-0 md:p-0 lg:p-0">
        <div className="grid items-center gap-x-10 gap-y-7 px-5 py-9 md:grid-cols-[minmax(0,1fr)_auto] md:px-12 md:py-12 lg:px-16 lg:py-14">
          <div className="min-w-0">
            <IconTile icon="ti-photo-search" size={48} />
            <p className="mt-5 max-w-[48ch] font-display text-title-lg text-z-fg">
              Une question, un écran qui bloque&nbsp;? Écrivez-nous sur WhatsApp et envoyez une photo&nbsp;: on regarde avec
              vous.
            </p>
            <p className="mt-3 font-sans text-small text-z-soft">
              On vous répond <Fact value={FACTS.support.hours} what="horaires du support" fact="support.hours" tail="." />
            </p>
          </div>
          <div className="grid justify-items-start gap-2 md:justify-items-end">
            <WhatsAppButton {...whatsappButtonProps()} size="lg" className="max-sm:w-full" />
            <TextLink to="/aide/" standalone className="font-sans text-[0.9375rem] font-semibold">
              Voir toutes les questions
            </TextLink>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-hairline bg-paper px-5 py-6 sm:flex-row sm:items-center sm:justify-between md:px-12 lg:px-16">
          <p className="font-display text-title text-z-fg">Il ne reste qu’à choisir la durée.</p>
          <ButtonLink to="/abonnements/" size="lg" iconEnd="arrow" className="max-sm:w-full">
            Choisir ma formule
          </ButtonLink>
        </div>
      </PlatePanel>
    </Section>
  )
}
