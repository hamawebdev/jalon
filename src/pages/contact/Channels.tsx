import type { ReactNode } from 'react'
import { ButtonA, Card, IconTile, Kw, PlatePanel, Section, SectionHead, TextA, WhatsAppButton, inScope } from '@/components/brand'
import { FACTS, present, telHref } from '@/lib/facts'
import { BRAND, whatsappButtonProps } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Email, EmailButton, Fact, WaNumber } from '../theme/facts-ui'

// /contact/ › contact-channels: one card per way to reach the team (WhatsApp, e-mail, and the phone and the
// announcements channel only when the owner has them), then the WhatsApp panel for a screen that blocks, as far
// from the cards as they are from each other: one group, and the WhatsApp card's action is the panel right under it.
// The languages line is the section's lead (it waits for its fact on the published site).
// The earlier roster of named agents is gone: names only with the owner's support.team.

/**
 * Columns from xl (the phone and announcements cards are conditional): three cards share a row; two or four keep the
 * two columns (four in a row would leave about 190px for a line and wrap every button label).
 */
const COLS: Record<number, string> = { 2: '', 3: 'xl:grid-cols-3', 4: '' }

function ChannelCard({
  icon,
  title,
  value,
  hours,
  text,
  action,
}: {
  icon: string
  title: string
  value: ReactNode
  hours?: ReactNode
  text: string
  action?: ReactNode
}) {
  return (
    <li className="min-w-0">
      <Card radius="panel" className="flex h-full flex-col">
        <IconTile icon={icon} size={44} />
        <h3 className="mt-5 font-display text-title-lg text-z-fg">{title}</h3>
        <p className="mt-1 font-sans text-small font-semibold break-anywhere text-z-fg">{value}</p>
        {hours != null && <p className="mt-2 font-sans text-meta font-medium text-z-muted">{hours}</p>}
        <p className="mt-3 font-sans text-small text-z-soft">{text}</p>
        {action && <div className="mt-auto pt-6">{action}</div>}
      </Card>
    </li>
  )
}

export function ContactChannels() {
  const s = FACTS.support
  const phone = present(s.phone) ? s.phone : null
  const channel = FACTS.community.channel
  const hours = <Fact value={s.hours} what="horaires du support" fact="support.hours" />
  return (
    <Section zone="band" dataSection="contact-channels">
      <SectionHead
        title={
          <>
            Par où <Kw>nous joindre</Kw>
          </>
        }
        lead={
          inScope('support.languages') ? (
            <>
              L’équipe répond en <Fact value={s.languages} what="langues du support" fact="support.languages" tail="." />
            </>
          ) : undefined
        }
      />
      <ul className={cn('mt-head grid list-none gap-grid p-0 md:grid-cols-2', COLS[2 + (phone ? 1 : 0) + (channel ? 1 : 0)])}>
        <ChannelCard
          icon="ti-brand-whatsapp"
          title="WhatsApp"
          value={<WaNumber standalone />}
          hours={hours}
          text="Un message, et une photo de l’écran si quelque chose bloque."
        />
        <ChannelCard
          icon="ti-mail"
          title="E-mail"
          value={<Email standalone />}
          hours={
            // The line waits for its fact on the published site.
            inScope('support.responseTime') ? (
              <>
                Réponse habituelle&nbsp;: <Fact value={s.responseTime} what="délai de réponse" fact="support.responseTime" />
              </>
            ) : null
          }
          text="Pour une demande détaillée, ou avec une pièce jointe."
          action={<EmailButton full />}
        />
        {phone && (
          <ChannelCard
            icon="ti-phone"
            title="Téléphone"
            value={
              <TextA href={telHref(phone) ?? undefined} standalone className="-my-2.5">
                {phone}
              </TextA>
            }
            hours={hours}
            text="Pour en parler de vive voix."
            action={
              <ButtonA href={telHref(phone) ?? undefined} aria-label={`Appeler l’équipe ${BRAND}`} variant="secondary" size="md" iconStart="ti-phone" full>
                Appeler l’équipe
              </ButtonA>
            }
          />
        )}
        {channel && (
          <ChannelCard
            icon="ti-speakerphone"
            title="Annonces"
            value={channel.name}
            text="Pour suivre les nouveautés et l’état du service."
            action={
              <ButtonA href={channel.url} target="_blank" rel="noopener noreferrer" aria-label="Suivre les annonces (nouvel onglet)" variant="secondary" size="md" iconEnd="ti-external-link" full>
                Suivre les annonces
              </ButtonA>
            }
          />
        )}
      </ul>

      {/* The cards' own padding, so its text starts on their left edge. */}
      <PlatePanel size="small" className="mt-grid grid items-center gap-x-10 gap-y-6 p-card md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <h3 className="font-display text-display-sm text-z-fg">
            Un écran qui bloque&nbsp;? <Kw>Envoyez une photo</Kw>.
          </h3>
          <p className="mt-3 max-w-[52ch] font-sans text-copy text-z-soft">
            Sur WhatsApp, joignez une photo de l’écran à votre message. On repère l’étape en cause, puis on vous guide jusqu’à la suivante.
          </p>
        </div>
        <WhatsAppButton {...whatsappButtonProps()} size="lg" className="max-sm:w-full" />
      </PlatePanel>
    </Section>
  )
}
