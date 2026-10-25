// German copy, Download page: official app suite and apps & players hub by system. Translation of
// ../fr/downloads.ts (same keys). Owner: tr-de.
import type { Dict } from '../types.ts'

export const downloads: Dict['downloads'] = {
  suite: {
    badge: 'OFFIZIELLE APP',
    title: {
      ontv: 'ATLAS PRO ONTV',
      and: '&',
      max: 'MAX',
      maxVersion: (version: string) => `V${version}`,
    },
    description:
      'Genießen Sie ein flüssiges Erlebnis auf all Ihren Geräten – mit unserer Suite offizieller Apps für Smartphones, Tablets, Fernseher und Computer.',
    versions: {
      label: 'Offizielle und weitere Atlas Pro Editionen',
      mainTitle: 'Offizielle Haupteditionen (neueste Versionen)',
      secondaryTitle: 'Weitere verfügbare Editionen',
      version: (version: string) => `Version ${version}`,
      alsoVersion: (version: string) => `Version ${version}`,
      short: (version: string) => `v${version}`,
      status: {
        latest: 'Neueste offizielle Version',
        new: 'Neue Version',
        previous: 'Vorherige Version',
      },
    },
    noteLabel: 'Hinweis zur Kompatibilität:',
    note: 'Die offizielle Atlas Pro App ist für Android-Geräte, aktuelle Google-TV-Fernseher und alle Android-TV-Boxen verfügbar (Formuler, Xiaomi, Mecool usw. – für optimale Leistung wird eine aktuelle Android-Version empfohlen). Außerdem gibt es eigene offizielle Versionen für Computer mit Windows, macOS und Linux.',
    keyPoints: ['Ultraschnelles Zapping', 'Intuitive Oberfläche', 'Integrierter EPG'],
    compatLabel: 'Kompatible Geräte',
    compat: ['Smart TV', 'Android & TV-Box', 'Fire Stick', 'iOS', 'Windows / macOS / Linux', 'Multi-Screen'],
    cta: 'Zu den Downloads',
    media: {
      label: 'Vorschau der Oberfläche der offiziellen Atlas Pro Apps',
      tabs: ['Live-TV', 'Filme', 'Serien', 'Replay'],
      epg: 'EPG',
      now: 'Jetzt',
      next: 'Danach',
    },
  },

  hub: {
    badge: 'DOWNLOAD · APPS & PLAYER',
    title: 'Atlas Pro ONTV herunterladen: Der komplette Hub für Apps & Player nach System',
    subtitle:
      'Wählen Sie Ihr System: Android, iOS & Apple oder Windows-PC & Mac. Auf Android, Google TV, TV-Box, Fire TV Stick und PC sind unsere offiziellen Atlas Pro ONTV Apps zu 100 % kostenlos.',
    navLabel: 'Ihr System wählen',
    count: (n: number) => (n === 1 ? `${n} App` : `${n} Apps`),
    groups: {
      android: {
        nav: 'Android',
        title: 'Android · Fire Stick · Google TV · Android-Box',
        intro:
          'Atlas Pro ONTV APK und die gesamte offizielle Suite: Geben Sie den Downloader-Code in der App Downloader auf Ihrem Fire TV Stick, Google TV oder Ihrer Android-Box ein oder laden Sie die APK-Datei direkt herunter. Aktivieren Sie anschließend Ihren Atlas Pro Code.',
        officialTitle: 'Offizielle Atlas Pro Apps (kostenlos)',
        partnersTitle: 'Partner-Player für Android & Fire Stick',
      },
      apple: {
        nav: 'iOS & Apple',
        title: 'iOS & Apple (iPhone · iPad · Apple TV)',
        intro:
          'Die offizielle Atlas Pro App ist nicht für iOS verfügbar: Laden Sie einen unserer Partner-Player aus dem App Store herunter und senden Sie uns dessen MAC Address + Device Key per WhatsApp – unser Team kann die App direkt aktivieren und gleichzeitig Ihr Atlas Pro Abo einspielen!',
      },
      computers: {
        nav: 'Windows-PC & Mac',
        title: 'Windows-PC & Mac (macOS) & Linux',
        intro:
          'Laden Sie unsere eigenen offiziellen Atlas Pro Versionen für Windows-PC (.EXE), macOS oder Linux direkt herunter, starten Sie die App und melden Sie sich mit Ihrem Atlas Pro Code (oder Ihren Zugangsdaten) an.',
        officialTitle: 'Offizielle Atlas Pro Apps (kostenlos)',
        partnersTitle: 'Partner-Player (Windows-PC)',
      },
    },
    playersPrice: (price: string, days: number) =>
      `Kostenpflichtige Player (~${price} / Jahr · ${days} Tage kostenlos testen)`,
    card: {
      free: 'Kostenlos',
      codeLabel: 'Downloader-Code',
      copy: 'Kopieren',
      copied: 'Kopiert!',
      copyAria: (code: string) => `Downloader-Code ${code} kopieren`,
      download: (name: string) => `${name} jetzt herunterladen`,
      activationLabel: 'Aktivierung:',
      activation: { code: 'Atlas Pro Code', login: 'Benutzername + Passwort' },
      or: 'oder',
      systems: {
        android: 'Android / Google TV / Fire Stick',
        androidOnly: 'Android',
        ios: 'iOS / App Store',
        windows: 'Windows-PC',
        mac: 'macOS',
        linux: 'Linux',
      },
      buttonSystems: { ios: 'iOS', windows: 'Windows', mac: 'macOS', linux: 'Linux' },
      withSystem: (name: string, system: string) => `${name} (${system})`,
      windowsRequirement: 'Windows x64 (10+)',
    },
    partnerNames: { iboPlayerPro: 'IBO Player Pro', hotPlayer: 'Hot Player', bobPlayer: 'Bob Player' },
  },

  help: {
    title: 'Bei einem Schritt hängen geblieben? Wir richten Ihr Gerät gemeinsam mit Ihnen ein.',
    subtitle:
      'Schreiben Sie unserem Support-Team auf WhatsApp: Wir begleiten Sie Schritt für Schritt oder aktivieren Ihr Atlas Pro Abo und Ihren Player direkt aus der Ferne.',
    whatsapp: 'Hilfe auf WhatsApp erhalten',
    guides: 'Zu den Installationsanleitungen',
    shopLead: 'Noch kein Abonnent?',
    shop: 'Meinen Tarif im Shop wählen',
  },
}
