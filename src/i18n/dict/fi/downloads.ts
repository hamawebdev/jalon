// Finnish copy, Downloads page. Owner: tr-fi. Source: ../fr/downloads.ts (same keys, same shapes).
import type { Dict } from '../types.ts'

export const downloads: Dict['downloads'] = {
  suite: {
    badge: 'VIRALLINEN SOVELLUS',
    title: {
      ontv: 'ATLAS PRO ONTV',
      and: '&',
      max: 'MAX',
      maxVersion: (version: string) => `V${version}`,
    },
    description:
      'Nauti sujuvasta kokemuksesta kaikilla laitteillasi virallisen sovelluspakettimme avulla – yhteensopiva älypuhelinten, tablettien, televisioiden ja tietokoneiden kanssa.',
    versions: {
      label: 'Viralliset Atlas Pro\u00a0-pää- ja\u00a0-sivuversiot',
      mainTitle: 'Viralliset pääversiot (uusimmat versiot)',
      secondaryTitle: 'Saatavilla olevat sivuversiot',
      version: (version: string) => `Versio ${version}`,
      alsoVersion: (version: string) => `versio ${version}`,
      short: (version: string) => `v${version}`,
      status: {
        latest: 'Uusin virallinen versio',
        new: 'Uusi versio',
        previous: 'Edellinen versio',
      },
    },
    noteLabel: 'Yhteensopivuus:',
    note: 'Virallinen Atlas Pro\u00a0-sovellus on saatavilla Android-laitteille, uusille Google TV\u00a0-televisioille ja kaikille Android-pohjaisille TV-bokseille (Formuler, Xiaomi, Mecool jne. – uusi Android-versio on suositeltava parhaan suorituskyvyn takaamiseksi). Omat viralliset versiot ovat saatavilla myös Windows-, macOS- ja Linux-tietokoneille.',
    keyPoints: ['Salamannopea kanavanvaihto', 'Intuitiivinen käyttöliittymä', 'Sisäänrakennettu EPG'],
    compatLabel: 'Yhteensopivat laitteet',
    compat: ['Smart TV', 'Android & TV-boksi', 'Fire Stick', 'iOS', 'Windows / macOS / Linux', 'Usea näyttö'],
    cta: 'Katso lataukset',
    media: {
      label: 'Esikatselu virallisten Atlas Pro\u00a0-sovellusten käyttöliittymästä',
      tabs: ['Suora TV', 'Elokuvat', 'Sarjat', 'Jälkikatselu'],
      epg: 'EPG',
      now: 'Nyt',
      next: 'Seuraavaksi',
    },
  },

  hub: {
    badge: 'LATAUKSET · SOVELLUKSET & SOITTIMET',
    title: 'Lataa Atlas Pro ONTV: kaikki sovellukset & soittimet järjestelmittäin',
    subtitle:
      'Valitse järjestelmäsi: Android, iOS & Apple tai Windows PC & Mac. Androidilla, Google TV:llä, TV-bokseilla, Fire TV Stickillä ja PC:llä viralliset Atlas Pro ONTV\u00a0-sovelluksemme ovat 100 % ilmaisia.',
    navLabel: 'Valitse järjestelmäsi',
    count: (n: number) => (n > 1 ? `${n} sovellusta` : `${n} sovellus`),
    groups: {
      android: {
        nav: 'Android',
        title: 'Android · Fire Stick · Google TV · Android-boksi',
        intro:
          'Atlas Pro ONTV APK ja koko virallinen sovelluspaketti: syötä Downloader-koodi Fire TV Stickin, Google TV:n tai Android-boksin Downloader-sovellukseen tai lataa APK-tiedosto suoraan. Aktivoi sen jälkeen Atlas Pro\u00a0-koodisi.',
        officialTitle: 'Viralliset Atlas Pro\u00a0-sovellukset (ilmainen)',
        partnersTitle: 'Kumppanisoittimet Androidille & Fire Stickille',
      },
      apple: {
        nav: 'iOS & Apple',
        title: 'iOS & Apple (iPhone · iPad · Apple TV)',
        intro:
          'Virallinen Atlas Pro\u00a0-sovellus ei ole saatavilla iOS:lle: lataa jokin kumppanisoittimistamme App Storesta ja lähetä meille sen MAC-osoite + Device Key WhatsAppissa, niin tiimimme voi aktivoida sovelluksen ja lisätä Atlas Pro\u00a0-tilauksesi samalla kertaa!',
      },
      computers: {
        nav: 'Windows PC & Mac',
        title: 'Windows PC & Mac (macOS) & Linux',
        intro:
          'Lataa viralliset Atlas Pro\u00a0-versiomme Windows PC:lle (.EXE), macOS:lle tai Linuxille suoraan, käynnistä sovellus ja kirjaudu Atlas Pro\u00a0-koodillasi (tai tunnuksillasi).',
        officialTitle: 'Viralliset Atlas Pro\u00a0-sovellukset (ilmainen)',
        partnersTitle: 'Kumppanisoittimet (Windows PC)',
      },
    },
    playersPrice: (price: string, days: number) => `Maksulliset soittimet (~${price} / vuosi · ${days} päivän ilmainen kokeilu)`,
    card: {
      free: 'Ilmainen',
      codeLabel: 'Downloader-koodi',
      copy: 'Kopioi',
      copied: 'Kopioitu!',
      copyAria: (code: string) => `Kopioi Downloader-koodi ${code}`,
      download: (name: string) => `Lataa ${name} nyt`,
      activationLabel: 'Aktivointi:',
      activation: { code: 'Code Atlas Pro', login: 'Käyttäjätunnus + salasana' },
      or: 'tai',
      systems: {
        android: 'Android / Google TV / Fire Stick',
        androidOnly: 'Android',
        ios: 'iOS / App Store',
        windows: 'Windows PC',
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
    title: 'Jumissa jossain vaiheessa? Määritämme laitteesi yhdessä kanssasi.',
    subtitle:
      'Lähetä viesti tukitiimillemme WhatsAppissa: opastamme sinua vaihe vaiheelta tai aktivoimme Atlas Pro\u00a0-tilauksesi ja soittimesi suoraan etänä.',
    whatsapp: 'Hanki apua WhatsAppissa',
    guides: 'Katso asennusoppaat',
    shopLead: 'Etkö ole vielä tilaaja?',
    shop: 'Valitse pakettisi kaupasta',
  },
}
