// Italian copy, Scarica page: official app suite and apps & players hub by system.
// Translation of ../fr/downloads.ts (owner of the source: downloads). Same keys, same shapes.
import type { Dict } from '../types.ts'

export const downloads: Dict['downloads'] = {
  suite: {
    badge: 'APPLICAZIONE UFFICIALE',
    title: {
      ontv: 'ATLAS PRO ONTV',
      and: '&',
      max: 'MAX',
      maxVersion: (version: string) => `V${version}`,
    },
    description:
      "Goditi un'esperienza fluida su tutti i tuoi dispositivi con la nostra suite di applicazioni ufficiali, compatibile con smartphone, tablet, TV e computer.",
    versions: {
      label: 'Edizioni ufficiali e secondarie Atlas Pro',
      mainTitle: 'Edizioni Ufficiali Principali (Ultime Versioni)',
      secondaryTitle: 'Edizioni Secondarie Disponibili',
      version: (version: string) => `Versione ${version}`,
      alsoVersion: (version: string) => `versione ${version}`,
      short: (version: string) => `v${version}`,
      status: {
        latest: 'Ultima versione ufficiale',
        new: 'Nuova versione',
        previous: 'Versione precedente',
      },
    },
    noteLabel: 'Nota sulla compatibilità:',
    note: "L'applicazione ufficiale Atlas Pro è disponibile sui dispositivi Android, sui televisori Google TV recenti e su tutti i TV Box Android (Formuler, Xiaomi, Mecool, ecc. — per prestazioni ottimali si consiglia una versione recente di Android). Sono disponibili anche versioni ufficiali dedicate per i computer Windows, macOS e Linux.",
    keyPoints: ['Zapping ultra-rapido', 'Interfaccia intuitiva', 'EPG integrata'],
    compatLabel: 'Dispositivi compatibili',
    compat: ['Smart TV', 'Android & TV Box', 'Fire Stick', 'iOS', 'Windows / macOS / Linux', 'Multi-schermo'],
    cta: 'Vai ai download',
    media: {
      label: "Anteprima dell'interfaccia delle applicazioni ufficiali Atlas Pro",
      tabs: ['In diretta', 'Film', 'Serie', 'Replay'],
      epg: 'EPG',
      now: 'Ora',
      next: 'A seguire',
    },
  },

  hub: {
    badge: 'DOWNLOAD · APPLICAZIONI & PLAYER',
    title: 'Scarica Atlas Pro ONTV: Hub Completo di Applicazioni & Player per Sistema',
    subtitle:
      'Scegli il tuo sistema: Android, iOS & Apple oppure PC Windows & Mac. Su Android, Google TV, TV Box, Fire TV Stick e PC, le nostre applicazioni ufficiali Atlas Pro ONTV sono gratuite al 100%.',
    navLabel: 'Scegli il tuo sistema',
    count: (n: number) => (n > 1 ? `${n} applicazioni` : `${n} applicazione`),
    groups: {
      android: {
        nav: 'Android',
        title: 'Android · Fire Stick · Google TV · Android Box',
        intro:
          "Atlas Pro ONTV APK e tutta la suite ufficiale: inserisci il Codice Downloader nell'applicazione Downloader della tua Fire TV Stick, Google TV o Box Android, oppure scarica direttamente il file APK. Poi attiva il tuo Codice Atlas Pro.",
        officialTitle: 'Applicazioni ufficiali Atlas Pro (Gratis)',
        partnersTitle: 'Player partner su Android & Fire Stick',
      },
      apple: {
        nav: 'iOS & Apple',
        title: 'iOS & Apple (iPhone · iPad · Apple TV)',
        intro:
          "L'applicazione ufficiale Atlas Pro non è disponibile su iOS: scarica uno dei nostri player partner dall'App Store e inviaci il suo indirizzo MAC + Device Key su WhatsApp. Il nostro team può attivare direttamente l'applicazione e caricare contemporaneamente il tuo abbonamento Atlas Pro!",
      },
      computers: {
        nav: 'PC Windows & Mac',
        title: 'PC Windows & Mac (macOS) & Linux',
        intro:
          "Scarica direttamente le nostre versioni ufficiali dedicate Atlas Pro per PC Windows (.EXE), macOS o Linux, avvia l'applicazione e accedi con il tuo Codice Atlas Pro (o con le tue credenziali).",
        officialTitle: 'Applicazioni ufficiali Atlas Pro (Gratis)',
        partnersTitle: 'Player partner (PC Windows)',
      },
    },
    playersPrice: (price: string, days: number) => `Player a Pagamento (~${price} / anno · ${days} giorni di prova gratuita)`,
    card: {
      free: 'Gratis',
      codeLabel: 'Codice Downloader',
      copy: 'Copia',
      copied: 'Copiato!',
      copyAria: (code: string) => `Copia il Codice Downloader ${code}`,
      download: (name: string) => `Scarica ${name} ora`,
      activationLabel: 'Attivazione:',
      activation: { code: 'Codice Atlas Pro', login: 'Nome utente + password' },
      or: 'oppure',
      systems: {
        android: 'Android / Google TV / Fire Stick',
        androidOnly: 'Android',
        ios: 'iOS / App Store',
        windows: 'PC Windows',
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
    title: 'Bloccato a un passaggio? Configuriamo il tuo dispositivo insieme a te.',
    subtitle:
      'Invia un messaggio al nostro team di assistenza su WhatsApp: ti guideremo passo dopo passo oppure attiveremo direttamente da remoto il tuo abbonamento Atlas Pro e il tuo player.',
    whatsapp: 'Ricevi assistenza su WhatsApp',
    guides: 'Vedi le guide di installazione',
    shopLead: 'Non sei ancora abbonato?',
    shop: 'Scegli il mio piano nel Negozio',
  },
}
