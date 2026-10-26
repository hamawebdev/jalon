// German copy, home how-to-buy, pricing cards, reassurance band; Shop page with the order configurator.
// Translation of ../fr/pricing.ts (same keys). Owner: tr-de. Plan names stay the client's product names.
// Badges are written in normal case: the Badge component puts them in capitals.
import type { Dict } from '../types.ts'

/** « 1, 2 oder 3 » */
const orList = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} oder ${items[items.length - 1]}`

export const pricing: Dict['pricing'] = {
  howTo: {
    badge: '🛒 So funktioniert es',
    title: 'So kaufen Sie Ihr Atlas Pro ONTV Abo',
    highlight: 'Abo',
    subtitle: (minutes: string) =>
      `Von Ihrer Bestellung bis zu Ihrem ersten Programm in weniger als ${minutes} Minuten. So aktivieren Sie Ihr Atlas Pro Abo ganz einfach.`,
    step: (n: string) => `Schritt ${n}`,
    steps: {
      choose: {
        title: 'Wählen Sie Ihr Angebot',
        text: (screens: string[], months: string) =>
          `Wählen Sie den Atlas Pro Tarif, der am besten zu Ihnen passt: ${orList(screens)} Bildschirme für ${months} Monate.`,
        time: '1 Minute',
      },
      pay: {
        title: (pct: string) => `${pct} sichere Zahlung`,
        text: 'Bezahlen Sie ganz entspannt per PayPal oder Banküberweisung (SEPA). Zu Ihrer Sicherheit sind Ihre Transaktionen Ende-zu-Ende-verschlüsselt.',
        time: '2 Minuten',
      },
      receive: {
        title: 'Erhalten Sie Ihre Codes sofort',
        text: 'Ihre Zugangsdaten und Ihr Atlas Pro Code kommen sofort per WhatsApp und E-Mail (in weniger als 30 Sekunden). Keine Wartezeit.',
        time: '< 30 Sekunden',
      },
      install: {
        title: 'Installieren und loslegen!',
        text: (channels: string) =>
          `Laden Sie die Atlas Pro ONTV App herunter (oder die Atlas Pro ONTV APK, Atlas Pro Max und IBO), geben Sie Ihre Codes ein und genießen Sie sofort mehr als ${channels} Live-Sender.`,
        time: 'Sofort',
      },
    },
    timeLabel: 'Dauer',
  },

  plans: {
    badge: '🏷️ Preise & Abos',
    title: 'Wählen Sie Ihren Atlas Pro ONTV Tarif',
    highlight: 'Tarif',
    subtitle:
      'Machen wir uns nichts vor: Es gibt Dutzende IPTV-Dienste, aber nur wenige halten, was sie versprechen. Atlas Pro ONTV gehört zu diesen Ausnahmen. Testen Sie ohne Risiko — Geld-zurück-Garantie, wenn es Ihnen nicht zusagt.',
    names: {
      premium: 'Premium 1 Écran',
      duo: 'Duo 2 Écrans',
      famille: 'Famille 3 Écrans',
    },
    popular: 'Am beliebtesten',
    limited: '🔥 Begrenztes Angebot',
    per: (months: string) => `/ ${months} Monate`,
    perMonth: (price: string) => `Entspricht ${price} / Monat`,
    cta: 'Jetzt abonnieren',
    featuresLabel: (plan: string) => `Im Tarif ${plan} enthalten`,
    features: {
      codesOne: (months: string) => `1 offizieller Aktivierungscode (Atlas Pro Code) für ${months} Monate`,
      codesMany: (count: string) => `${count} offizielle Aktivierungscodes (Atlas Pro Code) für ${count} Bildschirme`,
      quality: '4K-, FHD-, HD- und SD-Qualität',
      antiFreeze: 'Anti-Aussetzer-System (Anti-Freeze) inklusive',
      replay: (days: string) => `${days} Tage Replay + vollständiger TV-Guide (EPG)`,
      support: (pct: string) => `Kundensupport ${pct} auf Französisch`,
      supportVip: (pct: string) => `VIP-Support ${pct} auf Französisch`,
      links: 'Individuelle Links nach Wahl: Format Xtream Codes oder M3U',
      assistance: 'Installationshilfe und Kundendienst',
      warranty: 'Garantie und offizielle Aktivierung',
      apps: (apps: string) => `Zugang zu allen Apps (${apps})`,
    },
    boutiqueLink: 'Mit 3 Klicks im Shop bestellen',
  },

  trust: {
    label: 'Garantien und Zahlungsarten',
    secure: (pct: string) => `${pct} sichere Zahlung`,
    instant: 'Sofortige Aktivierung',
    protected: (pct: string) => `${pct} geschützter & garantierter Zugang`,
    payment: 'Zahlung:',
    methods: {
      paypal: 'PayPal',
      sepa: 'Banküberweisung / SEPA',
    },
  },

  reassurance: {
    label: 'Unsere Versprechen',
    renewal: {
      title: 'Einfache Verlängerung',
      text: 'Verlängern Sie Ihren Atlas Pro Code mit einem Klick auf WhatsApp – ohne Ihre Apps neu zu installieren oder Ihre Favoriten zu verlieren.',
      cta: 'Auf WhatsApp verlängern',
    },
    activation: {
      title: 'Schnelle Aktivierung',
      text: 'Offizieller Atlas Pro Code, Xtream-Zugangsdaten und M3U-Link – nach Bestätigung sofort per WhatsApp und E-Mail verschickt.',
    },
    guarantee: {
      title: 'Garantie & laufende Betreuung (Geld-zurück-Garantie)',
      text: (months: string) =>
        `Persönliche Begleitung und volle Garantie der Dienstkontinuität während der gesamten ${months} Monate Ihres Abonnements.`,
    },
  },

  configurator: {
    badge: '🛍️ Express-Shop · Bestellung mit 3 Klicks',
    title: 'Konfigurieren Sie Ihr Atlas Pro ONTV Abo in 10 Sekunden',
    subtitle:
      'Wählen Sie Ihr Gerät, die gewünschte Anzahl an Codes und Ihre Zahlungsart – und erhalten Sie Ihre Zugangsdaten sofort per WhatsApp.',
    stepA: { letter: 'A', title: 'Welches Gerät nutzen Sie?' },
    stepB: { letter: 'B', title: 'Wie viele Atlas Pro Codes möchten Sie?' },
    stepC: { letter: 'C', title: 'Ihre bevorzugte Zahlungsart' },
    step: (letter: string) => `Schritt ${letter}`,
    devices: {
      androidBox: 'Android-TV-Box',
      samsung: 'Samsung Smart TV',
      lg: 'LG Smart TV',
      firestick: 'Fire TV Stick',
      googleTv: 'Android TV / Google TV',
      apple: 'iPhone / iPad / Apple TV',
      pc: 'Windows-PC / Mac',
      formuler: 'Formuler / MAG',
    },
    codes: (count: number) => (count === 1 ? '1 Atlas Pro Code' : `${count} Atlas Pro Codes`),
    codesDetail: (plan: string, months: string) => `${plan} · ${months} Monate`,
    price: (price: string) => `Preis: ${price}`,
    popular: 'Beliebt',
    payments: {
      sepa: 'Bank\u00adüber\u00adweisung (SEPA)',
      paypal: 'PayPal',
    },
    summary: 'Ihre Bestellung',
    summaryDevice: 'Gerät',
    summaryOffer: 'Angebot',
    summaryPayment: 'Zahlung',
    notChosen: 'Noch offen',
    total: 'Gesamt',
    totalFor: (months: string) => `für ${months} Monate`,
    cta: (price: string) => `Jetzt auf WhatsApp bestellen (${price})`,
    needDevice: 'Wählen Sie zuerst Ihr Gerät (Schritt A).',
    needPayment: 'Wählen Sie Ihre Zahlungsart (Schritt C).',
    ready: 'Ihre Bestellung geht fertig formuliert an WhatsApp – Sie müssen sie nur noch absenden.',
    boutiqueLink: 'Zum Shop',
  },

  boutique: {
    badge: 'Offizieller autorisierter Atlas Pro ONTV Vertriebspartner',
    title: 'Atlas Pro ONTV Shop',
    intro:
      'Bestellen Sie Ihr Atlas Pro Abo mit 3 Klicks: Ihr Gerät, die Anzahl der Codes und Ihre Zahlungsart. Ihre Bestellung geht direkt an WhatsApp, und Ihr offizieller Atlas Pro Code wird Ihnen nach Bestätigung zugeschickt – Zahlung per PayPal oder Banküberweisung (SEPA).',
  },
}
