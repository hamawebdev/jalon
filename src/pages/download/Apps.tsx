import type { ReactNode } from 'react'
import {
  ButtonA,
  Card,
  IconTile,
  FactScope,
  Kw,
  Pending,
  Section,
  SectionHead,
  Tag,
  TextA,
  scoped,
} from '@/components/brand'
import {
  CREDENTIAL_LABEL,
  DEVICE_FAMILY_LABEL,
  FACTS,
  formatList,
  present,
  type AppLink,
  type CredentialKind,
  type DeviceFamily,
  type ThirdPartyApp,
} from '@/lib/facts'
import { cn } from '@/lib/utils'
import { JumpChip } from '../theme/chips'
import { deliveryChannelText } from '../theme/facts-text'
import { Fact } from '../theme/facts-ui'
import {
  FAMILY_APP_PENDING,
  FAMILY_GROUP_TITLE,
  FAMILY_ICON,
  appShown,
  ownAppFor,
  shownFamilies,
  thirdPartyFor,
} from './families'

// /applications/ › apps-platform-nav, apps-directory, apps-credentials and apps-notes (copy applications.md).

/** apps-platform-nav: one jump chip (a pill) per family, anchoring to its directory group. No rule above: the hero ends on it. */
export function AppsPlatformNav() {
  return (
    <Section zone="paper" dataSection="apps-platform-nav" rhythm="none" className="pb-section-sm">
      <nav aria-label="Applications par appareil">
        <p className="eyebrow">Votre appareil</p>
        <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
          {shownFamilies().map((f) => (
            <li key={f}>
              <JumpChip href={`#${DEVICE_FAMILY_LABEL[f].anchor}`} icon={FAMILY_ICON[f]}>
                {DEVICE_FAMILY_LABEL[f].chip}
              </JumpChip>
            </li>
          ))}
        </ul>
      </nav>
    </Section>
  )
}

/** Directory text of each group (copy applications.md › apps-directory). */
function groupText(f: DeviceFamily): ReactNode {
  switch (f) {
    case 'tv':
      return 'L’application s’installe depuis la boutique de votre télé.'
    case 'box':
      return 'Une clé ou une box se branche sur la prise HDMI et apporte à la télé les applications qui lui manquent.'
    case 'android':
      return 'L’application s’installe depuis la boutique de votre téléphone ou de votre tablette.'
    case 'apple':
      return 'L’application s’installe depuis la boutique d’applications d’Apple.'
    case 'ordinateur':
      return (
        <>
          Une application de lecture à installer sur{' '}
          <Fact
            value={formatList(FACTS.devices.supported?.ordinateur)}
            what="systèmes d’ordinateur compatibles"
            fact="devices.supported.ordinateur"
            tail="."
          />
        </>
      )
    case 'recepteur':
      return 'Ces appareils se règlent dans leurs propres menus : le guide vous montre quoi saisir.'
    case 'console':
      return 'Console de jeu ou autre système : dites-nous lequel avant d’installer, on vérifie avec vous.'
  }
}

/** Guide link label of each group. */
const GUIDE_LINK: Record<DeviceFamily, string> = {
  tv: 'Voir le guide télé',
  box: 'Voir le guide clé et box',
  android: 'Voir le guide Android',
  apple: 'Voir le guide Apple',
  ordinateur: 'Voir le guide ordinateur',
  recepteur: 'Voir le guide récepteur',
  console: 'Voir le guide console',
}

/** « Version 3.2 · mise à jour le 9 octobre 2026 », with the parts the owner gave. */
function versionLine(version: string | null, date: string | null) {
  const parts = [version && `Version ${version}`, date && `mise à jour le ${date}`].filter(Boolean)
  return parts.length ? parts.join(' · ') : null
}

/** One app entry: name, tag, version line, platforms, licence note, store and file buttons. */
function AppEntry({
  name,
  own,
  platforms,
  link,
  paidLicence,
}: {
  name: string
  own?: boolean
  platforms: string | null
  link: Pick<AppLink, 'storeUrl' | 'fileUrl' | 'version' | 'date'> | null
  paidLicence?: boolean
}) {
  const version = link ? versionLine(link.version, link.date) : null
  return (
    <li className="rounded-control bg-z-raised p-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="font-display text-title text-z-fg">{name}</h3>
        {own && <Tag>Notre application</Tag>}
      </div>
      {version && <p className="mt-1 font-sans text-meta font-medium text-z-muted">{version}</p>}
      {platforms && <p className="mt-1 font-sans text-meta font-medium text-z-muted">Pour {platforms}</p>}
      {paidLicence && (
        <p className="mt-2 font-sans text-small text-z-soft">
          Licence payante, réglée à son éditeur&nbsp;: elle n’est pas comprise dans votre abonnement.
        </p>
      )}
      {link && (link.storeUrl || link.fileUrl) && (
        <div className="mt-4 flex flex-wrap gap-3">
          {link.storeUrl && (
            <ButtonA href={link.storeUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ouvrir ${name} dans la boutique (nouvel onglet)`} variant="secondary" size="sm" iconStart="ti-external-link">
              Ouvrir la boutique
            </ButtonA>
          )}
          {link.fileUrl && (
            <ButtonA href={link.fileUrl} aria-label={`Télécharger ${name}${platforms ? ` pour ${platforms}` : ''}`} variant="secondary" size="sm" iconStart="ti-download">
              Télécharger le fichier
            </ButtonA>
          )}
        </div>
      )}
    </li>
  )
}

/** The group has an apps line: the receivers' models (a required fact), or an app the page can name or mark. */
function hasAppsLine(family: DeviceFamily) {
  return family === 'recepteur' || appShown(family)
}

/** The apps of one family: the owner's own app first, then the recommended players; a marker until named. */
function GroupApps({ family }: { family: DeviceFamily }) {
  if (family === 'recepteur') {
    const models = formatList(FACTS.devices.supported?.recepteur)
    return (
      <p className="font-sans text-small text-z-soft">
        <Fact value={models} what={FAMILY_APP_PENDING.recepteur} fact="devices.supported.recepteur" block />
      </p>
    )
  }
  const own = ownAppFor(family)
  const third: ThirdPartyApp[] = thirdPartyFor(family)
  if (!own && third.length === 0) {
    return <Pending variant="block" what={FAMILY_APP_PENDING[family]} fact={`apps.thirdParty.${family}`} />
  }
  return (
    <ul className="grid list-none gap-2 p-0">
      {own && (
        <AppEntry
          name={own.name}
          own
          platforms={DEVICE_FAMILY_LABEL[family].name}
          link={own.links?.find((l) => l.platform === family) ?? null}
        />
      )}
      {third.map((a) => (
        <AppEntry key={a.name} name={a.name} platforms={DEVICE_FAMILY_LABEL[family].name} link={a} paidLicence={a.paidLicence} />
      ))}
    </ul>
  )
}

/**
 * apps-directory: one white panel that holds every supported family, in GLOSSARY order, as cells divided by
 * hairlines (two columns from md; an odd last family takes the whole row, so no cell stays empty). A cell: the
 * family's tile, name and line, then the app to install on a paper block (12px corners inside the panel), then the
 * link to its guide on the text column. On the published site a group whose app is not named yet has no apps block.
 */
export function AppsDirectory() {
  const families = shownFamilies()
  return (
    <Section zone="band" dataSection="apps-directory">
      {/* The 1px gaps of the grid show the list's own fill: the hairlines between the cells. */}
      <ul className="m-0 grid list-none gap-px overflow-hidden rounded-panel border border-z-line bg-hairline p-0 md:grid-cols-2">
        {families.map((f) => (
          <li
            key={f}
            id={DEVICE_FAMILY_LABEL[f].anchor}
            className="scroll-mt-[88px] bg-z-card p-5 pb-3 md:p-7 md:pb-4 md:last:odd:col-span-2 lg:p-8 lg:pb-5"
          >
            {/* The guide link sits at the foot of the cell (its 44px box adds 10px under the text), on one line across a row. */}
            <section aria-labelledby={`groupe-${f}`} className="grid h-full grid-cols-[44px_minmax(0,1fr)] gap-x-4">
              <IconTile icon={FAMILY_ICON[f]} size={44} />
              <div className="flex min-w-0 flex-col">
                <h2 id={`groupe-${f}`} className="font-display text-title-lg text-z-fg">
                  {FAMILY_GROUP_TITLE[f]}
                </h2>
                <p className="mt-1.5 max-w-[46ch] font-sans text-small text-z-soft">{groupText(f)}</p>
                {hasAppsLine(f) && (
                  <div className="mt-4 max-w-[30rem]">
                    <GroupApps family={f} />
                  </div>
                )}
                <p className="mt-auto pt-3">
                  <TextA href={`#${DEVICE_FAMILY_LABEL[f].guide}`} standalone className="font-sans text-[0.9375rem] font-semibold">
                    {GUIDE_LINK[f]}
                  </TextA>
                </p>
              </div>
            </section>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/** The three credential kinds of apps-credentials (GLOSSARY §4); appLogin comes with the owner's own app. */
const CREDENTIAL_CARDS: { kind: CredentialKind; icon: string; title: string; text: string; for: string }[] = [
  {
    kind: 'playlist',
    icon: 'ti-link',
    title: 'Un lien de liste',
    text: 'Une seule adresse web, qui charge toutes vos chaînes. Les applications l’appellent souvent « lien M3U ».',
    for: 'Applications qui demandent une liste',
  },
  {
    kind: 'codes',
    icon: 'ti-key',
    title: 'Vos codes d’accès',
    text: 'L’adresse du serveur, un identifiant et un mot de passe, à recopier tels quels.',
    for: 'Applications qui se connectent par codes',
  },
  {
    kind: 'portal',
    icon: 'ti-router',
    title: 'L’adresse de votre box',
    text: 'Nous relions la box à votre abonnement par son adresse MAC, puis vous saisissez l’adresse de portail reçue.',
    for: 'Box à portail et certains récepteurs',
  },
]

/** apps-credentials (#acces): what the customer receives and where it goes. */
export function AppsCredentials() {
  const kinds = FACTS.delivery.credentialTypes
  const cards = present(kinds) ? CREDENTIAL_CARDS.filter((c) => kinds.includes(c.kind)) : CREDENTIAL_CARDS
  const sent = present(kinds) ? formatList(kinds.map((k) => CREDENTIAL_LABEL[k])) : null
  return (
    <Section zone="paper" id="acces" dataSection="apps-credentials">
      <SectionHead
        eyebrow="Vos accès"
        title={
          <>
            Ce que vous recevez, et où le <Kw>saisir</Kw>.
          </>
        }
        lead={
          <>
            Vos accès arrivent par <Fact value={deliveryChannelText()} what="canal d’envoi" fact="delivery.channel" tail="." />{' '}
            <FactScope facts="delivery.credentialTypes" fallback="Selon l’application, vous utiliserez l’un de ces éléments.">
              Selon l’application, vous utiliserez l’un de ces éléments&nbsp;; nous vous envoyons{' '}
              <Fact value={sent} what="type d’accès" fact="delivery.credentialTypes" tail="." />
            </FactScope>
          </>
        }
      />
      {/* Two rows shared by the cards of a line (subgrid): what it is, then where it goes on a paper strip clipped
          to the card's corners, so the strips start on one line whatever the length of their text. */}
      <ul className={cn('mt-head grid list-none gap-grid p-0', cards.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3')}>
        {cards.map((c) => (
          <Card key={c.kind} as="li" radius="panel" className="grid min-w-0 overflow-hidden p-0 md:row-span-2 md:grid-rows-subgrid md:gap-y-0">
            <div className="p-card">
              <IconTile icon={c.icon} size={44} />
              <h3 className="mt-5 font-display text-title text-z-fg">{c.title}</h3>
              <p className="mt-2 font-sans text-small text-z-soft">{c.text}</p>
            </div>
            <p className="flex items-start gap-2 border-t border-hairline bg-z-raised px-card py-4 font-sans text-meta font-medium text-z-soft">
              <i className="ti ti-corner-down-right mt-0.5 shrink-0 text-[16px] text-z-icon" aria-hidden="true" />
              {c.for}
            </p>
          </Card>
        ))}
      </ul>
      <p className="mt-8 max-w-[60ch] font-sans text-copy text-z-soft">
        Gardez le message qui contient vos accès&nbsp;: il vous resservira pour chaque nouvel appareil.
      </p>
    </Section>
  )
}

/**
 * apps-notes: only with the owner's own app; each point waits for its field. On the published site a point whose
 * fact is missing is left out, and the block needs two points (a list of one goes with the line that introduces it).
 */
export function AppsNotes() {
  const own = FACTS.apps.own
  if (!present(own)) return null
  const points = scoped<{ icon: string; title: string; text: ReactNode; facts?: string }>([
    {
      icon: 'ti-refresh',
      title: 'Mises à jour',
      facts: 'apps.own.updates',
      text: (
        <>
          Gardez l’application à jour&nbsp;: <Fact value={own.updates} what="mode de mise à jour" fact="apps.own.updates" tail="." />
        </>
      ),
    },
    {
      icon: 'ti-download',
      title: 'Où les télécharger',
      text: 'Avec les liens de cette page, qui mènent à la boutique de votre appareil ou à notre fichier d’installation.',
    },
    {
      icon: 'ti-devices',
      title: 'Sur plusieurs appareils',
      facts: 'apps.own.sync',
      text: (
        <>
          Ce que l’application garde quand vous changez d’appareil&nbsp;:{' '}
          <Fact value={own.sync} what="ce qui est conservé d’un appareil à l’autre" fact="apps.own.sync" tail="." />
        </>
      ),
    },
    {
      icon: 'ti-wifi',
      title: 'Connexion conseillée',
      facts: 'internet.minSpeed',
      text: (
        <>
          Pour une image fluide&nbsp;: <Fact value={FACTS.internet.minSpeed} what="débit conseillé" fact="internet.minSpeed" tail="." />
        </>
      ),
    },
  ])
  if (points.length < 2) return null
  return (
    <Section zone="paper" dataSection="apps-notes" continues containerClassName="grid gap-y-8 lg:grid-cols-12 lg:gap-x-grid">
      <p className="max-w-[56ch] border-t border-hairline-deep pt-6 font-sans text-lead text-z-soft lg:col-span-5 lg:pr-8">
        Quelques repères sur «&nbsp;{own.name}&nbsp;» avant de l’installer.
      </p>
      <ul className="m-0 grid list-none gap-x-grid gap-y-8 p-0 sm:grid-cols-2 lg:col-span-7">
        {points.map((p) => (
          <li key={p.title} className="ledger">
            <IconTile icon={p.icon} size={40} />
            <h3 className="mt-4 font-display text-title text-z-fg">{p.title}</h3>
            <p className="mt-2 font-sans text-small text-z-body">{p.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
