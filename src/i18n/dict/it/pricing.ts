// Italian copy, home how-to-buy, pricing cards, reassurance band; Negozio page with the order configurator.
// Translation of ../fr/pricing.ts (owner of the source: pricing). Same keys, same shapes.
// Badges are written in normal case: the Badge component puts them in capitals.
import type { Dict } from '../types.ts'

/** « 1, 2 o 3 » */
const orList = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} o ${items[items.length - 1]}`

export const pricing: Dict['pricing'] = {
  howTo: {
    badge: '🛒 Come funziona',
    title: 'Come acquistare il tuo abbonamento Atlas Pro ONTV',
    highlight: 'abbonamento',
    subtitle: (minutes: string) =>
      `Dal tuo ordine al primo programma in meno di ${minutes} minuti. Ecco come attivare il tuo abbonamento Atlas Pro in tutta semplicità.`,
    step: (n: string) => `Passaggio ${n}`,
    steps: {
      choose: {
        title: 'Scegli la tua offerta',
        text: (screens: string[], months: string) =>
          `Seleziona il piano di abbonamento Atlas Pro più adatto a te: ${orList(screens)} schermi per ${months} mesi.`,
        time: '1 minuto',
      },
      pay: {
        title: (pct: string) => `Pagamento sicuro al ${pct}`,
        text: 'Paga in tutta tranquillità con PayPal o Bonifico Bancario (SEPA). Le tue transazioni sono crittografate end-to-end per la tua sicurezza.',
        time: '2 minuti',
      },
      receive: {
        title: 'Ricevi subito i tuoi codici',
        text: 'Le tue credenziali e il tuo Codice Atlas Pro arrivano immediatamente su WhatsApp e via e-mail (in meno di 30 secondi). Nessuna attesa.',
        time: '< 30 secondi',
      },
      install: {
        title: 'Installa e guarda!',
        text: (channels: string) =>
          `Scarica l'applicazione Atlas Pro ONTV (oppure l'APK di Atlas Pro ONTV, Atlas Pro Max e IBO), inserisci i tuoi codici e goditi subito oltre ${channels} canali in diretta.`,
        time: 'Immediato',
      },
    },
    timeLabel: 'Durata',
  },

  plans: {
    badge: '🏷️ Prezzi & abbonamenti',
    title: 'Scegli il tuo piano Atlas Pro ONTV',
    highlight: 'piano',
    subtitle:
      "Diciamocelo chiaramente: esistono decine di servizi IPTV, ma pochi mantengono davvero le loro promesse. Atlas Pro ONTV è una di queste eccezioni. Provalo senza rischi: garanzia soddisfatto o rimborsato se non fa per te.",
    names: {
      premium: 'Premium 1 Écran',
      duo: 'Duo 2 Écrans',
      famille: 'Famille 3 Écrans',
    },
    popular: 'Il più scelto',
    limited: '🔥 Offerta limitata',
    per: (months: string) => `/ ${months} mesi`,
    perMonth: (price: string) => `Pari a ${price} / mese`,
    cta: 'Abbonati ora',
    featuresLabel: (plan: string) => `Incluso nel piano ${plan}`,
    features: {
      codesOne: (months: string) => `1 codice di attivazione ufficiale (Codice Atlas Pro) per ${months} mesi`,
      codesMany: (count: string) => `${count} codici di attivazione ufficiali (Codice Atlas Pro) per ${count} schermi`,
      quality: 'Qualità 4K (VOD), FHD, HD e SD',
      antiFreeze: 'Sistema Anti-Interruzione (Anti-Freeze) incluso',
      replay: (days: string) => `Replay ${days} Giorni + Guida TV Completa (EPG)`,
      support: (pct: string) => `Supporto clienti ${pct} in francese`,
      supportVip: (pct: string) => `Supporto VIP ${pct} in francese`,
      links: 'Link personalizzati a scelta: formato Xtream Codes o M3U',
      assistance: "Assistenza all'installazione e supporto post-vendita",
      warranty: 'Garanzia e attivazione ufficiale',
      apps: (apps: string) => `Accesso a tutte le applicazioni (${apps})`,
    },
    boutiqueLink: 'Ordina in 3 clic nel Negozio',
  },

  trust: {
    label: 'Garanzie e metodi di pagamento',
    secure: (pct: string) => `Pagamento sicuro al ${pct}`,
    instant: 'Attivazione immediata',
    protected: (pct: string) => `Accesso protetto & garantito al ${pct}`,
    payment: 'Pagamento:',
    methods: {
      paypal: 'PayPal',
      sepa: 'Bonifico bancario / SEPA',
    },
  },

  reassurance: {
    label: 'I nostri impegni',
    renewal: {
      title: 'Rinnovo Facile',
      text: 'Prolunga il tuo Codice Atlas Pro in un clic su WhatsApp, senza reinstallare le applicazioni né perdere i tuoi preferiti.',
      cta: 'Rinnova su WhatsApp',
    },
    activation: {
      title: 'Attivazione Rapida',
      text: 'Codice Atlas Pro ufficiale, credenziali Xtream e link M3U inviati immediatamente su WhatsApp e via e-mail appena confermato il pagamento.',
    },
    guarantee: {
      title: 'Garanzia & Assistenza Continua (Soddisfatto o Rimborsato)',
      text: (months: string) =>
        `Supporto personalizzato e garanzia totale di continuità per tutti i ${months} mesi del tuo abbonamento.`,
    },
  },

  configurator: {
    badge: '🛍️ Negozio Express · Ordine in 3 clic',
    title: 'Configura il tuo Abbonamento Atlas Pro ONTV in 10 Secondi',
    subtitle:
      'Seleziona il tuo dispositivo, il numero di codici desiderato e il metodo di pagamento per ricevere subito i tuoi accessi su WhatsApp.',
    stepA: { letter: 'A', title: 'Qual è il tuo dispositivo?' },
    stepB: { letter: 'B', title: 'Quanti codici Atlas Pro desideri?' },
    stepC: { letter: 'C', title: 'Il tuo metodo di pagamento preferito' },
    step: (letter: string) => `Passaggio ${letter}`,
    devices: {
      androidBox: 'TV Box Android',
      samsung: 'Smart TV Samsung',
      lg: 'Smart TV LG',
      firestick: 'Fire TV Stick',
      googleTv: 'Android TV / Google TV',
      apple: 'iPhone / iPad / Apple TV',
      pc: 'PC Windows / Mac',
      formuler: 'Formuler / MAG',
    },
    codes: (count: number) => (count === 1 ? '1 Codice Atlas Pro' : `${count} Codici Atlas Pro`),
    codesDetail: (plan: string, months: string) => `${plan} · ${months} Mesi`,
    price: (price: string) => `Prezzo: ${price}`,
    popular: 'Popolare',
    payments: {
      sepa: 'Bonifico Bancario (SEPA)',
      paypal: 'PayPal',
    },
    summary: 'Il tuo ordine',
    summaryDevice: 'Dispositivo',
    summaryOffer: 'Offerta',
    summaryPayment: 'Pagamento',
    notChosen: 'Da scegliere',
    total: 'Totale',
    totalFor: (months: string) => `per ${months} mesi`,
    cta: (price: string) => `Ordina Ora su WhatsApp (${price})`,
    needDevice: 'Scegli prima il tuo dispositivo (Passaggio A).',
    needPayment: 'Scegli il tuo metodo di pagamento (Passaggio C).',
    ready: 'Il tuo ordine parte su WhatsApp già scritto: devi solo inviarlo.',
    boutiqueLink: 'Apri il Negozio',
  },

  boutique: {
    badge: 'Distributore Ufficiale Autorizzato Atlas Pro ONTV',
    title: 'Negozio Atlas Pro ONTV',
    intro:
      'Ordina il tuo abbonamento Atlas Pro in 3 clic: il tuo dispositivo, il numero di codici e il metodo di pagamento. Il tuo ordine parte direttamente su WhatsApp e il tuo Codice Atlas Pro ufficiale ti viene inviato appena confermato il pagamento, con PayPal o Bonifico Bancario (SEPA).',
  },
}
