// Italian copy, home device compatibility, brand pillars, reviews.
// Translation of ../fr/social.ts (owner of the source: social). Same keys, same shapes.
import type { Dict } from '../types.ts'
import type { ReviewVars } from '../fr/social.ts'

export const social: Dict['social'] = {
  compat: {
    title: 'Compatibile con Tutti i tuoi Dispositivi & Schermi',
    highlight: 'Tutti i tuoi Dispositivi',
    subtitle:
      "Scopri una compatibilità universale e le nostre guide di installazione per goderti il tuo abbonamento Atlas Pro ONTV su ogni schermo.",
    guide: 'Guida di installazione',
    guideFor: (device: string) => `Guida di installazione: ${device}`,
    tv: {
      title: 'Televisori',
      description: 'Configurazione rapida e immediata sulla tua Smart TV.',
      pills: ['Samsung', 'LG', 'Sony', '+2'],
    },
    android: {
      title: 'Android',
      suite: 'Suite ufficiale',
      players: 'Player',
      playerNames: ['IBO Player', 'Hot Player', 'IBO Player Smarter', 'Bob Player', 'TiviMate', 'Smarters Pro'],
      pills: ['Box', 'Smartphone', 'Tablet'],
    },
    apple: {
      title: 'Apple',
      description: 'Tutorial chiaro e configurazione fluida per i dispositivi Apple.',
      pills: ['iPhone', 'iPad', 'Apple TV'],
    },
    box: {
      title: 'Decoder & Box',
      description: 'Installazione ad alte prestazioni su tutti i modelli.',
      pills: ['Magbox', 'Formuler Z7', 'Formuler Z8'],
    },
  },

  pillars: {
    badge: '✦ ATLASPROTVOFFICIAL · DISTRIBUTORE AUTORIZZATO ATLAS PRO ONTV',
    title: 'Ciò Che Distingue il Nostro Servizio Atlas Pro ONTV!',
    subtitle:
      'Migliaia di famiglie in Francia, Belgio, Svizzera e Canada ci affidano le loro serate davanti alla TV. Scopri perché i nostri abbonati Atlas Pro ci restano fedeli anno dopo anno.',
    distributor: {
      title: "L'Eccellenza del Distributore Autorizzato (Servizio Acclamato)",
      body: "I nostri abbonati apprezzano la trasparenza della nostra assistenza e la regolarità esemplare dei flussi Atlas Pro ONTV, sera dopo sera, fin dal primo secondo di attivazione.",
      seal: 'Distributore Autorizzato Atlas Pro ONTV',
    },
    screens: {
      title: 'Compatibile con Tutti i Tuoi Schermi',
      body: (apps: string) =>
        `Che tu usi le nostre applicazioni ufficiali gratuite (${apps}) o un player partner (IBO Player, Bob Player, Hot Player, Smarters Pro), il tuo abbonamento funziona su Smart TV, Box Android, Firestick, Apple e PC.`,
      devices: ['Smart TV', 'Box Android', 'Firestick', 'Apple', 'PC'],
    },
    quality: {
      title: 'Immagine ad Alta Fedeltà (Full HD H.265 & VOD 4K)',
      body: "Dal 480p a basso consumo al Full HD 1080p ad alta fluidità in diretta, fino all'Ultra HD 4K sulla VOD: il flusso Atlas Pro si adatta automaticamente alla tua connessione Internet, senza compressione aggressiva.",
      ladder: ['480p', 'Full HD 1080p · Diretta', 'Ultra HD 4K · VOD'],
    },
    infra: {
      title: 'Infrastruttura Europea Multi-Server Anti-Freeze',
      body: (uptime: string) =>
        `Una rete di server ad alta disponibilità distribuita in Europa, progettata per assorbire i picchi di ascolto durante i grandi eventi sportivi e garantire una stabilità del ${uptime}%.`,
      stat: (uptime: string) => `${uptime}%`,
    },
    zapping: {
      title: (seconds: string) => `Zapping Lampo (< ${seconds}s)`,
      body: "Passa da un canale all'altro in una frazione di secondo grazie all'ottimizzazione dei nostri flussi Atlas Pro ONTV, senza schermo nero né tempi di caricamento.",
      stat: (seconds: string) => `< ${seconds} s`,
    },
    support: {
      title: 'Assistenza & Concierge Francofono 7/7',
      body: (phone: string, minutes: string) =>
        `Un consulente tecnico ti segue personalmente su WhatsApp (${phone}) in meno di ${minutes} minuti, dalla conferma del pagamento fino all'attivazione completa del tuo schermo.`,
      stat: (minutes: string) => `< ${minutes} min`,
      cta: 'Scrivi a un consulente',
    },
  },

  reviews: {
    badge: '✦ TESTIMONIANZE VERIFICATE · RECENSIONI ATLAS PRO ONTV 2026',
    title: 'La Parola a Chi Guarda Atlas Pro ONTV con il Nostro Portale',
    subtitle:
      'Scopri i pareri autentici (Recensioni Atlas Pro ONTV) degli spettatori che hanno scelto il nostro portale ufficiale per attivare e rinnovare il loro abbonamento ogni anno.',
    trust: {
      rating: (rating: string) => `${rating} / 5`,
      ratingLabel: 'Valutazione Complessiva (Recensioni Atlas Pro ONTV)',
      customers: (customers: string) => `+${customers}`,
      customersLabel: 'Abbonati Seguiti & Fidelizzati',
      recommend: (percent: string) => `${percent}%`,
      recommendLabel: 'Consigliano il Nostro Supporto 7/7',
    },
    stars: 'Valutazione: 5 su 5',
    countries: { fr: 'Francia', be: 'Belgio', ch: 'Svizzera', ca: 'Canada' },
    cities: { thomas: 'Lione', sophie: 'Québec', karim: 'Namur', marc: 'Bordeaux', lucas: 'Tolosa', nadia: 'Ginevra' },
    from: (city: string, country: string, year: string) => `${city}, ${country} · ${year}`,
    screenshotAlt: (name: string) => `Screenshot WhatsApp della recensione di ${name}`,
    screenshotOpen: (name: string) => `Ingrandisci lo screenshot WhatsApp della recensione di ${name}`,
    screenshotPending: (name: string) => `Screenshot WhatsApp della recensione di ${name}`,
    items: {
      thomas: {
        badge: 'Reattività Immediata',
        quote: (_v: ReviewVars) =>
          "Ho ordinato il mio abbonamento Atlas Pro ONTV direttamente sul loro WhatsApp. Tempo di risposta incredibile: meno di 3 minuti dopo il mio bonifico, il consulente mi aveva già inviato il mio Codice Atlas Pro e tutto funzionava sulla mia TV.",
      },
      sophie: {
        badge: 'Aiuto & Cortesia',
        quote: (_v: ReviewVars) =>
          "Non essendo molto pratica di tecnologia, temevo di non sapere come installare Atlas Pro ONTV sulla mia TV Samsung. Il supporto è stato di una pazienza straordinaria: hanno attivato il mio IBO Player e caricato il mio abbonamento da remoto, passo dopo passo. Un vero servizio umano!",
      },
      karim: {
        badge: 'Stabilità & Sport Full HD',
        quote: (v: ReviewVars) =>
          `Ho provato diversi venditori prima di conoscere questo portale ufficiale. Con il mio piano Duo 2 Écrans e la nuova applicazione ${v.ontv} (e ${v.max}), guardo tutte le grandi partite in Full HD H.265 senza la minima interruzione.`,
      },
      marc: {
        badge: 'Fiducia & Trasparenza',
        quote: (v: ReviewVars) =>
          `Quello che apprezzo qui è la franchezza e la serietà. Come distributore autorizzato Atlas Pro, non chiedono nessuna carta di credito sul sito, il pagamento con PayPal e bonifico SEPA è sicuro e i prezzi sono chiari (${v.price} all'anno). Ci si sente subito in buone mani.`,
      },
      lucas: {
        badge: 'Cinema XXL & Prezzo Leggero',
        quote: (_v: ReviewVars) =>
          "Da quando siamo passati ad Atlas Pro ONTV, le serate in famiglia sono davvero cambiate. Il catalogo VOD è enorme (+24.000 film e +6.200 serie in 4K e FHD), riprendiamo gli episodi da dove li avevamo lasciati e il prezzo ci fa risparmiare una fortuna.",
      },
      nadia: {
        badge: 'Fedeltà & Assistenza Continua',
        quote: (v: ReviewVars) =>
          `È il secondo anno che rinnovo il mio Codice Atlas Pro con questo team. Un semplice messaggio sul loro WhatsApp e il mio accesso è stato prolungato di ${v.months} mesi in pochi secondi, senza perdere i miei preferiti sul mio Box Android.`,
      },
    },
    pills: {
      quality: 'Flussi Full HD H.265 & VOD 4K',
      zapping: (seconds: string) => `Zapping < ${seconds}s`,
      servers: (uptime: string) => `Server Anti-Freeze ${uptime}%`,
      price: (monthly: string) => `Da ${monthly} / mese`,
      catalogue: (films: string, series: string) => `+${films} Film & +${series} Serie`,
      support: (minutes: string) => `Supporto WhatsApp < ${minutes} min`,
      apps: (ontv: string, max: string) => `App Ufficiali ${ontv} & ${max}`,
      replay: (days: string) => `Replay ${days} Giorni`,
    },
  },
}
