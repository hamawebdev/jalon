import type { ReactNode } from 'react'
import { ButtonA, IconTile, Kw, Reveal, Section, SectionHead, iconClass, scoped, type Zone } from '@/components/brand'
import { FACTS, mailtoHref, present } from '@/lib/facts'
import { BRAND } from '@/lib/site'
import { NB } from '../../product/facts-text'
import { Fact, PendingAction, WhatsAppAction } from '../../product/shared'
import { ANCHORS, tileOnCard } from '../data'

const HEAD = {
  titleStart: `Une question${NB}? `,
  titleKeyword: 'On vous répond',
  titleEnd: '.',
}

/** « e-mail » stays whole: in a narrow button the label broke after its hyphen (« e- / mail »). */
const MAIL_ACTION = (
  <>
    Écrire un <span className="whitespace-nowrap">e-mail</span>
  </>
)

type Channel = { key: string; icon: string; title: string; text: string; detail: ReactNode; action: ReactNode }

function channels(): Channel[] {
  const email = FACTS.support.email
  const mailto = mailtoHref(email)
  const community = FACTS.community.channel
  const list: Channel[] = [
    {
      key: 'whatsapp',
      icon: 'ti-brand-whatsapp',
      title: 'WhatsApp',
      text: 'Une question avant de commander, ou de l’aide pendant l’installation.',
      detail: <Fact value={FACTS.support.whatsapp} what="numéro WhatsApp" fact="support.whatsapp" />,
      action: <WhatsAppAction label="Écrire sur WhatsApp" />,
    },
    {
      key: 'email',
      icon: 'ti-mail',
      title: 'E-mail',
      text: 'Pour une demande détaillée, avec captures d’écran ou pièces jointes.',
      detail: <Fact value={email} what="adresse e-mail du support" fact="support.email" />,
      action: mailto ? (
        <ButtonA href={mailto} variant="secondary" size="md" iconStart="ti-mail" aria-label={`Écrire un e-mail à l’équipe ${BRAND}`}>
          {MAIL_ACTION}
        </ButtonA>
      ) : (
        <PendingAction label={MAIL_ACTION} fact="support.email" icon="ti-mail" />
      ),
    },
  ]
  if (present(community)) {
    list.push({
      key: 'community',
      icon: 'ti-speakerphone',
      title: 'Annonces',
      text: 'Nouveautés, maintenances et interruptions, annoncées par l’équipe.',
      detail: community.name,
      action: (
        <ButtonA href={community.url} target="_blank" rel="noopener noreferrer" variant="secondary" size="md">
          Suivre les annonces
        </ButtonA>
      ),
    })
  }
  return list
}

/**
 * The desk's hours, set as a small sign under the heading (both owner facts). Launch mode keeps a row while its
 * fact shows: the hours are a required fact and stay, even alone.
 */
const HOURS = scoped(
  [
    { icon: 'ti-clock', label: 'Horaires', value: FACTS.support.hours, what: 'horaires du support', fact: 'support.hours' },
    {
      icon: 'ti-message-circle',
      label: 'Réponse habituelle',
      value: FACTS.support.responseTime,
      what: 'délai de réponse',
      fact: 'support.responseTime',
    },
  ],
  (row) => ({ [row.fact]: row.value }),
)

/**
 * home-support-channels: the ways to reach a person. The heading and the desk's hours on the left; on the right one
 * card per channel (what it is for, its address, its action), 16px apart on phones and the grid gap from md. A card
 * reads tile, then title, sentence and address on one left edge, then the action under them (the card's full width
 * on phones), so a long pending label never squeezes the text into a narrow column. The tile is centred on the
 * title's first line, not on the card. No ticket desk and no agent names. Carries the #contact anchor.
 * T28: the ruled directory rows (an ink rule on top, tiles centred on the row) became cards of the kit (Inspo:
 * brand's study, contact cards after alloy-com and the faq/with-cta archetype; bento tiles of canvasapp-com).
 */
export function HomeSupport({ zone = 'plate' }: { zone?: Zone }) {
  const list = channels()
  return (
    <Section
      zone={zone}
      dataSection="home-support-channels"
      id={ANCHORS.contact}
      containerClassName="grid gap-y-head lg:grid-cols-12 lg:gap-x-grid"
    >
      <div className="lg:col-span-5 lg:pr-6 xl:pr-12">
        <SectionHead
          title={
            <>
              {HEAD.titleStart}
              <Kw>{HEAD.titleKeyword}</Kw>
              {HEAD.titleEnd}
            </>
          }
        />
        {/* The hours line of the copy (« Horaires : … Réponse habituelle : … »), one label per row, each led by its
            icon on the first line (no rules: the rows are short and the cards beside them carry the edges). */}
        <dl className="m-0 mt-8 grid gap-5">
          {HOURS.map((h) => (
            <div key={h.label} className="grid grid-cols-[20px_minmax(0,1fr)] gap-x-3 gap-y-1">
              <i className={iconClass(h.icon, 'mt-px text-[20px] text-z-icon')} aria-hidden="true" />
              <dt className="font-sans text-meta font-semibold text-z-muted">
                {h.label}
                {NB}:
              </dt>
              <dd className="col-start-2 m-0 font-sans text-copy font-semibold text-z-fg">
                <Fact value={h.value} what={h.what} fact={h.fact} tail="." />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="m-0 grid list-none content-start gap-4 p-0 md:gap-grid lg:col-span-7 lg:col-start-6">
        {list.map((c, i) => (
          <Reveal
            as="li"
            key={c.key}
            index={i}
            className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-4 gap-y-5 rounded-card border border-z-line bg-z-card p-5 md:gap-x-5 md:p-card"
          >
            <IconTile icon={c.icon} size={48} className={tileOnCard(zone)} />
            {/* pt-2: the title's first line is centred on the 48px tile. */}
            <div className="min-w-0 pt-2">
              <h3 className="font-display text-title-lg text-z-fg">{c.title}</h3>
              <p className="mt-1.5 max-w-[48ch] font-sans text-small text-z-soft">{c.text}</p>
              <p className="mt-3 font-sans text-copy font-semibold text-z-fg">{c.detail}</p>
            </div>
            <div className="col-span-2 md:col-span-1 md:col-start-2 [&>*]:w-full md:[&>*]:w-auto">{c.action}</div>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
