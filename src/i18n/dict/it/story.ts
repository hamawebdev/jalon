// Italian copy, home: hero, why Atlas Pro, history, sport, VOD, renewal CTA.
// Translation of ../fr/story.ts (owner of the source: story). Same keys, same shapes.
// Live sport: Full HD 1080p / H.265 only; 4K applies to VOD only.
import type { Dict } from '../types.ts'

export const story: Dict['story'] = {
  fmt: {
    plus: (n: string) => `${n}+`,
    lead: (n: string) => `+${n}`,
    thousands: (n: string) => `${n}K+`,
    /** « 99,99% » (Italian: no space before %) */
    percent: (n: string) => `${n}%`,
  },

  apps: {
    ontv: (v: string) => `Atlas Pro ONTV ${v}`,
    max: (v: string) => `Max v${v}`,
    ibo: (v: string) => `IBO v${v}`,
    maxFull: (v: string) => `Atlas Pro Max v${v}`,
    iboFull: (v: string) => `Atlas Pro IBO v${v}`,
  },

  hero: {
    badge: "✦ L'IPTV N°1: ATLAS PRO NEL 2026",
    title: 'Scopri Atlas Pro ONTV (2026)',
    subtitle:
      "IPTV Atlas Pro si è affermato come il leader indiscusso dei servizi di streaming. L'abbonamento Atlas Pro rappresenta, come sempre, il riferimento assoluto in termini di qualità, stabilità ed esperienza utente.",
    useCasesLabel: 'Ciò che conta per te',
    useCases: {
      uptime: (uptime: string) => `Infrastruttura 2026 Ultra-Stabile · ${uptime}`,
      sport: 'Diretta & Grandi Eventi Sportivi Full HD · H.265',
      vod: (films: string, series: string) => `${films} Film & ${series} Serie On Demand`,
      apps: (versions: string) => `Suite Ufficiale: ${versions}`,
      support: (minutes: string) => `Distributore Ufficiale & Supporto < ${minutes} min`,
    },
    cta: 'Attiva il mio Codice Atlas Pro Ufficiale',
    pricingLink: 'Vedi i prezzi',
    guarantees: ['Codice ufficiale verificato al 100%', 'Consegna via WhatsApp & E-mail', 'Garanzia completa per tutta la durata'],
    stats: {
      channels: 'Canali TV da Tutto il Mondo',
      titles: 'Film & Serie',
      customers: 'Clienti Soddisfatti (Recensioni Atlas Pro ONTV)',
      uptime: 'Uptime Garantito',
    },
    visual: {
      online: 'Online',
      live: 'In diretta',
      liveQuality: 'Full HD 1080p · H.265',
      nav: ['TV in diretta', 'Film', 'Serie', 'Replay'],
      vodRow: 'Film & Serie',
      servers: 'Server europei',
      support: (minutes: string) => `Supporto < ${minutes} min`,
    },
  },

  why: {
    title: 'Perché Atlas Pro ON TV Domina il Mercato?',
    leader: {
      title: 'Leader IPTV in Francia & in Europa',
      text: (years: string) =>
        `Riconosciuto da oltre ${years} anni, Atlas Pro ONTV è il fornitore ufficiale N°1 in Francia e nel mondo francofono, e garantisce una stabilità a prova di tutto per il tuo abbonamento Atlas Pro.`,
      stamp: 'N°1',
      region: 'Francia & Europa',
    },
    tech: {
      title: 'Tecnologia Avanzata',
      text: "I nostri server sono distribuiti strategicamente in tutto il mondo per garantire una latenza minima e una codifica H.265 di ultima generazione, per una fluidità perfetta.",
    },
    apps: {
      title: 'Ecosistema di Applicazioni Ufficiali (APK & Box)',
      text: (ontv: string, max: string, ibo: string) =>
        `Goditi un'esperienza fluida su tutti i tuoi dispositivi. Scarica facilmente l'APK di Atlas Pro ONTV, sfrutta la potenza di Atlas Pro Max (Versione ${max}) oppure usa Atlas Pro IBO (v${ibo}). La nostra applicazione Atlas Pro ONTV ${ontv} è ottimizzata per tutti i box Android, le Smart TV e i PC.`,
      tag: 'APK',
    },
    world: {
      title: 'Copertura Mondiale',
      text: "L'applicazione Atlas Pro ONTV funziona ovunque: Francia, Belgio, Svizzera, Canada, USA e molto altro ancora. Una precisione totale per i tuoi pacchetti preferiti.",
    },
    support: {
      title: 'Supporto 7/7 & Recensioni Clienti',
      text: (minutes: string) =>
        `Atlas Pro non riesce a connettersi al server? Il nostro team tecnico francofono è disponibile 7 giorni su 7 su WhatsApp, con un tempo di risposta inferiore a ${minutes} minuti.`,
      reviews: 'Scopri le Recensioni Atlas Pro ONTV',
      response: (minutes: string) => `< ${minutes} min`,
    },
    value: {
      title: 'Risparmio & Rapporto Qualità/Prezzo',
      text: "Al prezzo di un solo abbonamento Atlas Pro, accedi a contenuti equivalenti a decine di abbonamenti separati (Sport, Cinema, TV mondiale). I contenuti più ricchi al miglior prezzo.",
      tags: ['Sport', 'Cinema', 'TV mondiale'],
    },
  },

  history: {
    title: 'La Storia di Atlas Pro',
    creation: {
      label: (year: string) => `FONDAZIONE (${year})`,
      title: 'La Nascita di Atlas Pro',
      text: "L'avventura di Atlas Pro ONTV è iniziata con una visione semplice: offrire un'alternativa accessibile e affidabile ai servizi di streaming tradizionali.",
    },
    expansion: {
      label: 'ESPANSIONE',
      title: 'Crescita Internazionale',
      text: (generation: string) =>
        `Sviluppo di applicazioni proprietarie dedicate (Atlas Pro ONTV ${generation}, Atlas Pro Max, Atlas Pro IBO) per un'esperienza utente senza pari su tutti gli schermi.`,
    },
    today: {
      label: 'OGGI',
      title: 'Leader del Mercato',
      text: 'Atlaspro ONTV è diventato il riferimento assoluto in termini di qualità, stabilità dei server e ricchezza di contenuti.',
    },
    future: {
      label: 'FUTURO',
      title: 'Innovazione Continua',
      text: 'Il nostro team lavora senza sosta a nuove funzionalità e a un’ottimizzazione costante della tua IPTV Atlas Pro.',
    },
  },

  sport: {
    title: 'Atlas Pro ON TV & lo Sport in Diretta',
    text: (channels: string) =>
      `Per gli appassionati di sport, l'abbonamento Atlas Pro è un vero paradiso. L'abbonamento include tutti i principali canali sportivi e oltre ${channels} canali premium (TF1, France 2, M6, ecc.). Grazie ai nostri server ad alte prestazioni, non perderai nessun evento mondiale.`,
    pills: { football: 'Calcio', basketball: 'Basket', tennis: 'Tennis', cars: 'Motori' },
    visual: {
      live: 'In diretta',
      quality: 'Full HD 1080p · H.265',
      channels: (channels: string) => `+${channels} canali premium`,
    },
  },

  vod: {
    title: 'VOD Atlas Pro ONTV (Film & Serie)',
    text: (films: string, series: string) =>
      `Il servizio VOD di Atlas Pro conta oltre ${films} film e ${series} serie. Una libreria sconfinata, aggiornata ogni giorno per il tuo massimo divertimento.`,
    checks: {
      quality: (ontv: string) => `Qualità 4K e Full HD (Ottimizzata per ${ontv})`,
      subtitles: 'Sottotitoli multilingue (incluso il francese)',
      daily: 'Aggiornamento quotidiano con le ultime novità',
      compat: 'Compatibile con Atlas Pro Max e Atlas Pro IBO',
    },
    categoriesLabel: 'Categorie',
    categories: {
      action: 'Azione',
      comedy: 'Commedia',
      drama: 'Drammatico',
      scifi: 'Fantascienza',
      horror: 'Horror',
      romance: 'Romantico',
      animation: 'Animazione',
      documentary: 'Documentario',
    },
    visual: {
      allusion: 'Le produzioni originali delle più grandi piattaforme mondiali',
      episodes: (episodes: string) => `${episodes} episodi`,
      quality: '4K UHD & Full HD',
    },
  },

  renewal: {
    title: 'Unisciti ad Atlas Pro ONTV Oggi',
    text: "Scopri il meglio dell'IPTV con Atlas Pro 2026. Goditi il meglio della televisione: sport in diretta, film recenti e serie esclusive.",
    subscribe: 'Abbonati Ora (Nuovo Cliente)',
    renew: 'Rinnova qui (Inserisci il tuo Codice Atlas Pro)',
  },
}
