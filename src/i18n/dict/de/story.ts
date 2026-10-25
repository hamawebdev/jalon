// German copy, home: hero, why Atlas Pro, history, sport, VOD, renewal CTA. Translation of ../fr/story.ts (same keys).
// Owner: tr-de. Live sport: Full HD 1080p / H.265 only; 4K is VOD only.
import type { Dict } from '../types.ts'

export const story: Dict['story'] = {
  fmt: {
    plus: (n: string) => `${n}+`,
    lead: (n: string) => `+${n}`,
    thousands: (n: string) => `${n}K+`,
    percent: (n: string) => `${n} %`,
  },

  apps: {
    ontv: (v: string) => `Atlas Pro ONTV ${v}`,
    max: (v: string) => `Max v${v}`,
    ibo: (v: string) => `IBO v${v}`,
    maxFull: (v: string) => `Atlas Pro Max v${v}`,
    iboFull: (v: string) => `Atlas Pro IBO v${v}`,
  },

  hero: {
    badge: '✦ DIE NR. 1 FÜR IPTV: ATLAS PRO 2026',
    title: 'Entdecken Sie Atlas Pro ONTV (2026)',
    subtitle:
      'IPTV Atlas Pro hat sich als unangefochtener Marktführer unter den Streaming-Diensten etabliert. Das Atlas Pro Abo ist wie eh und je die absolute Referenz in Sachen Qualität, Stabilität und Nutzererlebnis.',
    useCasesLabel: 'Worauf es Ihnen ankommt',
    useCases: {
      uptime: (uptime: string) => `Ultrastabile Infrastruktur 2026 · ${uptime}`,
      sport: 'Live-TV & große Sportevents in Full HD · H.265',
      vod: (films: string, series: string) => `${films} Filme & ${series} Serien auf Abruf`,
      apps: (versions: string) => `Offizielle Suite: ${versions}`,
      support: (minutes: string) => `Offizieller Vertriebspartner & Support < ${minutes} Min.`,
    },
    cta: 'Meinen offiziellen Atlas Pro Code aktivieren',
    pricingLink: 'Preise ansehen',
    guarantees: [
      '100 % verifizierter offizieller Code',
      'Zustellung per WhatsApp & E-Mail',
      'Volle Garantie über die gesamte Laufzeit',
    ],
    stats: {
      channels: 'TV-Sender weltweit',
      titles: 'Filme & Serien',
      customers: 'Zufriedene Kunden (Atlas Pro ONTV Erfahrungen)',
      uptime: 'Garantierte Uptime',
    },
    visual: {
      online: 'Online',
      live: 'Live',
      liveQuality: 'Full HD 1080p · H.265',
      nav: ['Live-TV', 'Filme', 'Serien', 'Replay'],
      vodRow: 'Filme & Serien',
      servers: 'Europäische Server',
      support: (minutes: string) => `Support < ${minutes} Min.`,
    },
  },

  why: {
    title: 'Warum dominiert Atlas Pro ON TV den Markt?',
    leader: {
      title: 'IPTV-Marktführer in Frankreich & Europa',
      text: (years: string) =>
        `Seit über ${years} Jahren anerkannt: Atlas Pro ONTV ist der offizielle Anbieter Nr. 1 in Frankreich und in der frankophonen Welt und garantiert eine unerschütterliche Stabilität für Ihr Atlas Pro Abo.`,
      stamp: 'Nr. 1',
      region: 'Frankreich & Europa',
    },
    tech: {
      title: 'Fortschrittliche Technologie',
      text: 'Unsere Server sind strategisch über die ganze Welt verteilt – für minimale Latenz und modernste H.265-Kodierung mit perfekt flüssiger Wiedergabe.',
    },
    apps: {
      title: 'Ökosystem offizieller Apps (APK & Box)',
      text: (ontv: string, max: string, ibo: string) =>
        `Genießen Sie ein flüssiges Erlebnis auf all Ihren Geräten. Laden Sie ganz einfach die Atlas Pro ONTV APK herunter, nutzen Sie die Leistung von Atlas Pro Max (Version ${max}) oder verwenden Sie Atlas Pro IBO (v${ibo}). Unsere App Atlas Pro ONTV ${ontv} ist für alle Android-Boxen, Smart TVs und PCs optimiert.`,
      tag: 'APK',
    },
    world: {
      title: 'Weltweite Abdeckung',
      text: 'Die Atlas Pro ONTV App funktioniert überall: in Frankreich, Belgien, der Schweiz, Kanada, den USA und vielen weiteren Ländern. Höchste Präzision für Ihre Lieblingspakete.',
    },
    support: {
      title: 'Support 7 Tage die Woche & Kundenbewertungen',
      text: (minutes: string) =>
        `„Atlas Pro kann keine Verbindung zum Server herstellen“? Unser französischsprachiges Technikteam ist 7 Tage die Woche per WhatsApp für Sie da – mit einer Antwortzeit von unter ${minutes} Minuten.`,
      reviews: 'Unsere Atlas Pro ONTV Erfahrungen lesen',
      response: (minutes: string) => `< ${minutes} Min.`,
    },
    value: {
      title: 'Ersparnis & Preis-Leistung',
      text: 'Zum Preis eines einzigen Atlas Pro Abos erhalten Sie Inhalte, für die Sie sonst Dutzende einzelne Abonnements bräuchten (Sport, Kino, TV aus aller Welt). Das reichhaltigste Angebot zum besten Preis.',
      tags: ['Sport', 'Kino', 'TV aus aller Welt'],
    },
  },

  history: {
    title: 'Die Geschichte von Atlas Pro',
    creation: {
      label: (year: string) => `GRÜNDUNG (${year})`,
      title: 'Die Geburt von Atlas Pro',
      text: 'Das Abenteuer Atlas Pro ONTV begann mit einer einfachen Vision: eine zugängliche und zuverlässige Alternative zu den herkömmlichen Streaming-Diensten zu bieten.',
    },
    expansion: {
      label: 'EXPANSION',
      title: 'Internationales Wachstum',
      text: (generation: string) =>
        `Entwicklung eigener, dedizierter Apps (Atlas Pro ONTV ${generation}, Atlas Pro Max, Atlas Pro IBO) für ein unvergleichliches Nutzererlebnis auf allen Bildschirmen.`,
    },
    today: {
      label: 'HEUTE',
      title: 'Marktführer',
      text: 'Atlaspro ONTV ist zur absoluten Referenz für Qualität, Serverstabilität und Vielfalt der Inhalte geworden.',
    },
    future: {
      label: 'ZUKUNFT',
      title: 'Kontinuierliche Innovation',
      text: 'Unser Team arbeitet unermüdlich an neuen Funktionen und an der ständigen Optimierung Ihres IPTV Atlas Pro.',
    },
  },

  sport: {
    title: 'Atlas Pro ON TV & Live-Sport',
    text: (channels: string) =>
      `Für Sportfans ist das Atlas Pro Abo ein wahres Paradies. Es umfasst alle großen Sportsender und mehr als ${channels} Premium-Sender (TF1, France 2, M6 usw.). Dank unserer Hochleistungsserver verpassen Sie kein Ereignis, egal wo auf der Welt.`,
    pills: { football: 'Fußball', basketball: 'Basketball', tennis: 'Tennis', cars: 'Motorsport' },
    visual: {
      live: 'Live',
      quality: 'Full HD 1080p · H.265',
      channels: (channels: string) => `+${channels} Premium-Sender`,
    },
  },

  vod: {
    title: 'Atlas Pro ONTV VOD (Filme & Serien)',
    text: (films: string, series: string) =>
      `Der VOD-Service von Atlas Pro umfasst mehr als ${films} Filme und ${series} Serien. Eine schier endlose Bibliothek, täglich aktualisiert – für Ihr ganz großes Vergnügen.`,
    checks: {
      quality: (ontv: string) => `4K- und Full-HD-Qualität (optimiert für ${ontv})`,
      subtitles: 'Mehrsprachige Untertitel (u. a. Französisch)',
      daily: 'Tägliche Aktualisierung mit den neuesten Titeln',
      compat: 'Kompatibel mit Atlas Pro Max und Atlas Pro IBO',
    },
    categoriesLabel: 'Kategorien',
    categories: {
      action: 'Action',
      comedy: 'Komödie',
      drama: 'Drama',
      scifi: 'Sci-Fi',
      horror: 'Horror',
      romance: 'Romantik',
      animation: 'Animation',
      documentary: 'Dokumentation',
    },
    visual: {
      allusion: 'Die Eigenproduktionen der größten Plattformen der Welt',
      episodes: (episodes: string) => `${episodes} Folgen`,
      quality: '4K UHD & Full HD',
    },
  },

  renewal: {
    title: 'Werden Sie noch heute Teil von Atlas Pro ONTV',
    text: 'Entdecken Sie das Beste des IPTV mit Atlas Pro 2026. Genießen Sie Fernsehen vom Feinsten: Live-Sport, aktuelle Filme und exklusive Serien.',
    subscribe: 'Jetzt abonnieren (Neukunde)',
    renew: 'Hier verlängern (Atlas Pro Code eingeben)',
  },
}
