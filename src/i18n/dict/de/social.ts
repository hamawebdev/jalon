// German copy, home device compatibility, brand pillars, reviews. Translation of ../fr/social.ts (same keys).
// Owner: tr-de.
import type { Dict } from '../types.ts'
import type { ReviewVars } from '../fr/social.ts'

export const social: Dict['social'] = {
  compat: {
    title: 'Kompatibel mit all Ihren Geräten & Bildschirmen',
    highlight: 'all Ihren Geräten',
    subtitle:
      'Entdecken Sie die universelle Kompatibilität und unsere Installationsanleitungen, um Ihr Atlas Pro ONTV Abo auf jedem Bildschirm zu genießen.',
    guide: 'Installationsanleitung',
    guideFor: (device: string) => `Installationsanleitung: ${device}`,
    tv: {
      title: 'Fernseher',
      description: 'Schnelle und direkte Einrichtung auf Ihrem Smart TV.',
      pills: ['Samsung', 'LG', 'Sony', '+2'],
    },
    android: {
      title: 'Android',
      suite: 'Offizielle Suite',
      players: 'Player',
      playerNames: ['IBO Player', 'Hot Player', 'IBO Player Smarter', 'Bob Player', 'TiviMate', 'Smarters Pro'],
      pills: ['Box', 'Smartphone', 'Tablet'],
    },
    apple: {
      title: 'Apple',
      description: 'Verständliche Anleitung und reibungslose Einrichtung für Apple-Geräte.',
      pills: ['iPhone', 'iPad', 'Apple TV'],
    },
    box: {
      title: 'Set-Top-Boxen',
      description: 'Leistungsstarke Installation auf allen Modellen.',
      pills: ['Magbox', 'Formuler Z7', 'Formuler Z8'],
    },
  },

  pillars: {
    badge: '✦ ATLASPROTVOFFICIAL · AUTORISIERTER VERTRIEBSPARTNER ATLAS PRO ONTV',
    title: 'Was unseren Atlas Pro ONTV Service auszeichnet!',
    subtitle:
      'Tausende Haushalte in Frankreich, Belgien, der Schweiz und Kanada vertrauen uns ihre Fernsehabende an. Erfahren Sie, warum unsere Atlas Pro Abonnenten uns Jahr für Jahr treu bleiben.',
    distributor: {
      title: 'Der Anspruch des autorisierten Vertriebspartners (vielfach gelobter Service)',
      body: 'Unsere Abonnenten schätzen die Transparenz unserer Betreuung und die vorbildliche Konstanz der Atlas Pro ONTV Streams – Abend für Abend, ab der ersten Sekunde der Aktivierung.',
      seal: 'Autorisierter Atlas Pro ONTV Vertriebspartner',
    },
    screens: {
      title: 'Kompatibel mit all Ihren Bildschirmen',
      body: (apps: string) =>
        `Ob Sie unsere kostenlosen offiziellen Apps (${apps}) oder einen Partner-Player (IBO Player, Bob Player, Hot Player, Smarters Pro) nutzen: Ihr Abo funktioniert auf Smart TV, Android-Box, Firestick, Apple und PC.`,
      devices: ['Smart TV', 'Android-Box', 'Firestick', 'Apple', 'PC'],
    },
    quality: {
      title: 'High-Fidelity-Bild (Full HD H.265 & 4K-VOD)',
      body: 'Vom datensparenden 480p über flüssiges Full HD 1080p im Live-Programm bis hin zu Ultra HD 4K bei VOD: Der Atlas Pro Stream passt sich automatisch an Ihre Internetgeschwindigkeit an – ohne aggressive Kompression.',
      ladder: ['480p', 'Full HD 1080p · Live', 'Ultra HD 4K · VOD'],
    },
    infra: {
      title: 'Europäische Multi-Server-Infrastruktur mit Anti-Freeze',
      body: (uptime: string) =>
        `Ein hochverfügbares Servernetz in ganz Europa, ausgelegt, um Zuschauerspitzen bei großen Sportereignissen aufzufangen und eine Stabilität von ${uptime} % zu garantieren.`,
      stat: (uptime: string) => `${uptime} %`,
    },
    zapping: {
      title: (seconds: string) => `Blitzschnelles Zapping (< ${seconds} s)`,
      body: 'Dank unserer optimierten Atlas Pro ONTV Streams wechseln Sie in Sekundenbruchteilen von Sender zu Sender – ohne schwarzen Bildschirm und ohne Ladezeit.',
      stat: (seconds: string) => `< ${seconds} s`,
    },
    support: {
      title: 'Französischsprachiger Concierge-Support 7 Tage die Woche',
      body: (phone: string, minutes: string) =>
        `Ein technischer Berater betreut Sie persönlich auf WhatsApp (${phone}) und meldet sich in weniger als ${minutes} Minuten – von der Bestätigung der Zahlung bis zur vollständigen Aktivierung Ihres Bildschirms.`,
      stat: (minutes: string) => `< ${minutes} Min.`,
      cta: 'Einem Berater schreiben',
    },
  },

  reviews: {
    badge: '✦ VERIFIZIERTE ERFAHRUNGSBERICHTE · ATLAS PRO ONTV ERFAHRUNGEN 2026',
    title: 'Das sagen Zuschauer, die Atlas Pro ONTV über unser Portal sehen',
    subtitle:
      'Lesen Sie die echten Erfahrungsberichte (Atlas Pro ONTV Erfahrungen) der Zuschauer, die ihr Abo jedes Jahr über unser offizielles Portal aktivieren und verlängern.',
    trust: {
      rating: (rating: string) => `${rating} / 5`,
      ratingLabel: 'Gesamtbewertung (Atlas Pro ONTV Erfahrungen)',
      customers: (customers: string) => `+${customers}`,
      customersLabel: 'Betreute & treue Abonnenten',
      recommend: (percent: string) => `${percent} %`,
      recommendLabel: 'Empfehlen unseren Support (7 Tage/Woche)',
    },
    stars: 'Bewertung: 5 von 5',
    countries: { fr: 'Frankreich', be: 'Belgien', ch: 'Schweiz', ca: 'Kanada' },
    cities: { thomas: 'Lyon', sophie: 'Québec', karim: 'Namur', marc: 'Bordeaux', lucas: 'Toulouse', nadia: 'Genf' },
    from: (city: string, country: string, year: string) => `${city}, ${country} · ${year}`,
    screenshotAlt: (name: string) => `WhatsApp-Screenshot der Bewertung von ${name}`,
    screenshotOpen: (name: string) => `WhatsApp-Screenshot der Bewertung von ${name} vergrößern`,
    screenshotPending: (name: string) => `WhatsApp-Screenshot der Bewertung von ${name}`,
    items: {
      thomas: {
        badge: 'Sofortige Reaktion',
        quote: (_v: ReviewVars) =>
          'Ich habe mein Atlas Pro ONTV Abo direkt über WhatsApp bestellt. Unglaubliche Reaktionszeit: Keine 3 Minuten nach meiner Überweisung hatte mir der Berater schon meinen Atlas Pro Code geschickt, und alles lief auf meinem Fernseher.',
      },
      sophie: {
        badge: 'Hilfe & Freundlichkeit',
        quote: (_v: ReviewVars) =>
          'Da ich technisch nicht besonders begabt bin, hatte ich Angst, nicht zu wissen, wie man Atlas Pro ONTV auf meinem Samsung-Fernseher installiert. Der Support war bemerkenswert geduldig: Man hat meinen IBO Player aktiviert und mein Abo Schritt für Schritt aus der Ferne eingerichtet. Ein wirklich menschlicher Service!',
      },
      karim: {
        badge: 'Stabilität & Sport in Full HD',
        quote: (v: ReviewVars) =>
          `Ich habe mehrere Anbieter ausprobiert, bevor ich dieses offizielle Portal kennengelernt habe. Mit meinem Tarif Duo 2 Écrans und der neuen App ${v.ontv} (und ${v.max}) sehe ich alle großen Spiele in Full HD H.265 ohne die kleinste Unterbrechung.`,
      },
      marc: {
        badge: 'Vertrauen & Transparenz',
        quote: (v: ReviewVars) =>
          `Was ich hier schätze, sind Offenheit und Seriosität. Als autorisierter Atlas Pro Vertriebspartner verlangen sie auf der Website keine Kreditkarte, die Zahlung per PayPal und SEPA-Überweisung ist sicher und die Preise sind klar (${v.price} pro Jahr). Man fühlt sich sofort gut aufgehoben.`,
      },
      lucas: {
        badge: 'XXL-Kino & faire Preise',
        quote: (_v: ReviewVars) =>
          'Seit wir auf Atlas Pro ONTV umgestiegen sind, haben sich unsere Familienabende wirklich verändert. Der VOD-Katalog ist riesig (+24.000 Filme und +6.200 Serien in 4K und FHD), wir schauen unsere Folgen genau dort weiter, wo wir aufgehört haben, und der Preis spart uns ein Vermögen.',
      },
      nadia: {
        badge: 'Treue & Betreuung',
        quote: (v: ReviewVars) =>
          `Schon das zweite Jahr verlängere ich meinen Atlas Pro Code bei diesem Team. Eine kurze Nachricht über WhatsApp, und mein Zugang war in wenigen Sekunden um ${v.months} Monate verlängert – ohne dass meine Favoriten auf meiner Android-Box verloren gingen.`,
      },
    },
    pills: {
      quality: 'Full HD H.265 Streams & 4K-VOD',
      zapping: (seconds: string) => `Zapping < ${seconds} s`,
      servers: (uptime: string) => `Anti-Freeze-Server ${uptime} %`,
      price: (monthly: string) => `Ab ${monthly} / Monat`,
      catalogue: (films: string, series: string) => `+${films} Filme & +${series} Serien`,
      support: (minutes: string) => `WhatsApp-Support < ${minutes} Min.`,
      apps: (ontv: string, max: string) => `Offizielle Apps ${ontv} & ${max}`,
      replay: (days: string) => `${days} Tage Replay`,
    },
  },
}
