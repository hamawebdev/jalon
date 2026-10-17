import type { ReactNode } from 'react'
import { FactScope, Kw, Pending, Section, SectionHead, TextA } from '@/components/brand'
import { FACTS, type DeviceFamily } from '@/lib/facts'
import { Fact } from '../theme/facts-ui'
import { DeviceGuide } from './Guides.parts'
import { FAMILY_APP_PENDING, FAMILY_ICON, appShown, familyTags, guideAppName, shownFamilies } from './families'

// /applications/ › apps-guides (#guides): one canonical set of setup guides, one per device family, the first
// open. In each step the app slot takes the owner's own app where it exists, otherwise the recommended player;
// both wait for the owner. An owner-specific step (guides.devices) is added at the end of its guide.
// On the published site, while the app of a family is not named, its step uses the fact-free wording of
// applications.md (« l’application que nous vous conseillons », and how to ask for its name).

/** The app slot of a step, in « », or its marker. */
function App({ family, tail }: { family: DeviceFamily; tail?: string }) {
  return <Fact value={guideAppName(family)} what={FAMILY_APP_PENDING[family]} fact={`apps.thirdParty.${family}`} tail={tail} />
}

/** A step that names the family's app, or its fact-free wording while the page cannot name it (appShown()). */
function appStep(family: DeviceFamily, named: ReactNode, plain: string): ReactNode {
  return appShown(family) ? named : plain
}

/** Tags read from devices.supported.<family>, a marker while unknown. */
function supportedTags(family: DeviceFamily, what: string): ReactNode[] {
  return familyTags(family) ?? [<Pending key="p" what={what} fact={`devices.supported.${family}`} />]
}

type Guide = { family: DeviceFamily; title: string; tags: ReactNode[]; steps: ReactNode[]; tip: ReactNode }

function guides(): Guide[] {
  return [
    {
      family: 'tv',
      title: 'Télé connectée',
      tags: supportedTags('tv', 'marques et systèmes de télé compatibles'),
      steps: [
        'Connectez la télé à internet et installez ses mises à jour.',
        appStep(
          'tv',
          <>
            Sur l’écran d’accueil, ouvrez la boutique de la télé et cherchez <App family="tv" tail="." />
          </>,
          'Sur l’écran d’accueil, ouvrez la boutique de la télé et cherchez l’application que nous vous conseillons. Pour la connaître, écrivez-nous avec le modèle de votre appareil.',
        ),
        'Installez l’application, puis ouvrez-la.',
        <>
          Saisissez <TextA href="#acces">vos accès</TextA>, lien de liste ou codes, exactement comme vous les avez reçus.
        </>,
        'Lancez une chaîne pour vérifier l’image et le son.',
      ],
      tip: (
        <>
          L’application n’apparaît pas dans la boutique&nbsp;? Votre télé est peut-être trop ancienne pour elle&nbsp;: une clé ou
          une box TV prend le relais, voyez le <TextA href="#guide-box">guide clé ou box TV</TextA>.
        </>
      ),
    },
    {
      family: 'box',
      title: 'Clé ou box TV',
      tags: ['Clé HDMI', 'Box Android'],
      steps: [
        'Branchez la clé ou la box sur une prise HDMI de la télé, puis sur le secteur.',
        'Suivez la mise en route à l’écran et connectez l’appareil à internet.',
        appStep(
          'box',
          <>
            Dans sa boutique, installez <App family="box" tail="." />
          </>,
          'Dans sa boutique, installez l’application que nous vous conseillons. Pour la connaître, écrivez-nous avec le modèle de votre appareil.',
        ),
        'Ouvrez l’application et saisissez vos accès.',
        'Lancez une chaîne pour vérifier que tout fonctionne.',
      ],
      tip: 'Si l’application conseillée s’installe par un fichier plutôt que par la boutique, la clé vous demande d’autoriser cette source dans ses réglages. Un doute à cette étape ? Écrivez-nous, on vous guide.',
    },
    {
      family: 'android',
      title: 'Téléphone et tablette Android',
      tags: ['Téléphone', 'Tablette'],
      steps: [
        'Sur votre téléphone ou votre tablette, allez dans la boutique d’applications.',
        appStep(
          'android',
          <>
            Cherchez et installez <App family="android" tail="." />
          </>,
          'Cherchez et installez l’application que nous vous conseillons. Pour la connaître, écrivez-nous avec le modèle de votre appareil.',
        ),
        'Ouvrez-la et saisissez vos accès.',
        'Lancez une chaîne pour vérifier l’image et le son.',
      ],
      tip: 'Regardez de préférence en Wi-Fi : la vidéo consomme vite les données d’un forfait mobile.',
    },
    {
      family: 'apple',
      title: 'iPhone, iPad et Apple TV',
      tags: ['iPhone', 'iPad', 'Apple TV'],
      steps: [
        'Sur votre appareil, allez dans la boutique d’applications d’Apple.',
        appStep(
          'apple',
          <>
            Cherchez et installez <App family="apple" tail="." />
          </>,
          'Cherchez et installez l’application que nous vous conseillons. Pour la connaître, écrivez-nous avec le modèle de votre appareil.',
        ),
        'Ouvrez-la, choisissez d’ajouter une liste ou des codes, puis saisissez vos accès.',
        'Lancez une chaîne pour vérifier l’image et le son.',
      ],
      tip: 'Sur Apple TV, si vous avez le choix, saisissez les codes d’accès plutôt que le lien de liste : ils sont plus courts à taper avec la télécommande.',
    },
    {
      family: 'ordinateur',
      title: 'Ordinateur',
      tags: supportedTags('ordinateur', 'systèmes d’ordinateur compatibles'),
      steps: [
        appStep(
          'ordinateur',
          <>
            Téléchargez <App family="ordinateur" /> avec le lien de la partie <TextA href="#ordinateur">Ordinateur</TextA>.
          </>,
          'Demandez-nous quelle application installer\u00a0: écrivez-nous avec le système de votre ordinateur.',
        ),
        'Installez-la, puis ouvrez-la.',
        'Ajoutez votre lien de liste, ou vos codes si l’application les demande.',
        'Lancez une chaîne, puis passez en plein écran.',
      ],
      tip: 'Pour regarder sur la télé, reliez l’ordinateur à la télé avec un câble HDMI.',
    },
    {
      family: 'recepteur',
      title: 'Récepteur et box à portail',
      tags: ['Récepteur satellite', 'Démodulateur', 'Box à portail'],
      steps: [
        'Notez l’adresse MAC de l’appareil : elle figure sur une étiquette ou dans ses réglages.',
        <>
          <FactScope facts="checkout.macAddress" fallback="Transmettez-nous cette adresse.">
            Transmettez-nous cette adresse&nbsp;:{' '}
            <Fact value={FACTS.checkout.macAddress} what="où nous transmettre l’adresse MAC" fact="checkout.macAddress" tail="." />
          </FactScope>{' '}
          Nous la relions à votre abonnement et vous envoyons l’adresse du portail.
        </>,
        'Dans les réglages de l’appareil, saisissez l’adresse du portail.',
        'Redémarrez l’appareil : la liste des chaînes se charge.',
      ],
      tip: 'Chaque modèle a ses menus, et certains récepteurs utilisent un lien de liste plutôt qu’un portail. Envoyez-nous la marque et le modèle sur WhatsApp : on vous indique les étapes exactes.',
    },
    {
      family: 'console',
      title: 'Console de jeu',
      tags: supportedTags('console', 'consoles compatibles'),
      steps: [
        'Depuis le menu de la console, allez dans sa boutique d’applications.',
        appStep(
          'console',
          <>
            Cherchez et installez <App family="console" tail="." />
          </>,
          'Cherchez et installez l’application que nous vous conseillons. Pour la connaître, écrivez-nous avec le modèle de votre console.',
        ),
        'Ouvrez-la et saisissez vos accès avec la manette.',
        'Lancez une chaîne pour vérifier l’image.',
      ],
      tip: 'Le choix d’applications change d’une console à l’autre : demandez-nous conseil avant d’installer.',
    },
  ]
}

const GUIDE_ID: Record<DeviceFamily, string> = {
  tv: 'guide-tv',
  box: 'guide-box',
  android: 'guide-android',
  apple: 'guide-apple',
  ordinateur: 'guide-ordinateur',
  recepteur: 'guide-recepteur',
  console: 'guide-console',
}

export function AppsGuides() {
  const shown = new Set(shownFamilies())
  const extra = FACTS.guides.devices
  const list = guides().filter((g) => shown.has(g.family))
  // grid-cols-1 below lg: one column that never grows past the page (an auto column took the widest guide row's
  // min-content, so with a large font at 320px the whole section, head included, ran 44px off the screen).
  return (
    <Section zone="paper" id="guides" dataSection="apps-guides" continues containerClassName="grid grid-cols-1 gap-x-grid gap-y-10 lg:grid-cols-12">
      <SectionHead
        className="lg:col-span-5"
        sticky
        eyebrow="Installation"
        title={
          <>
            Pas à pas, <Kw>appareil</Kw> par appareil.
          </>
        }
        lead={
          <>
            Avant de commencer, gardez vos accès sous la main et vérifiez votre connexion.{' '}
            <FactScope facts="internet.minSpeed">
              Débit conseillé&nbsp;: <Fact value={FACTS.internet.minSpeed} what="débit conseillé" fact="internet.minSpeed" tail="." />{' '}
            </FactScope>
            Ouvrez ensuite le guide de votre appareil et suivez les étapes dans l’ordre.
          </>
        }
      />
      <div className="grid content-start gap-4 lg:col-span-7">
        {list.map((g, i) => (
          <DeviceGuide
            key={g.family}
            id={GUIDE_ID[g.family]}
            icon={FAMILY_ICON[g.family]}
            title={g.title}
            tags={g.tags}
            steps={extra?.[g.family] ? [...g.steps, extra[g.family]] : g.steps}
            tip={g.tip}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </Section>
  )
}
