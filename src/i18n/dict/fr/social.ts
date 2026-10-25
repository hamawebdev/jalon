// French copy, home device compatibility, brand pillars, reviews. Owner: social.
// The brief's French copy is the source: use it as written. Translations in ../<lang>/social.ts must have exactly
// the same keys (TypeScript checks it). No business number, price, version, code or link here: read those from
// src/lib/facts.ts. WhatsApp messages live in src/lib/whatsapp.ts and stay French.
//
// Functions take values the component formats from FACTS (numbers already in the reader's locale, app labels such
// as « Atlas Pro ONTV 4.0.2 » or « Max v7 »): keep every value where the French puts it.

/** Values a review quote may quote (formatted from FACTS by the component). */
export interface ReviewVars {
  /** Yearly price of the entry plan, formatted (« 40 € »). */
  price: string
  /** « Atlas Pro ONTV 4.0.2 » */
  ontv: string
  /** « Atlas Pro Max v7 » */
  max: string
  /** Plan duration in months (« 12 »). */
  months: string
}

export const social = {
  // Brief pp. 23–24 (Section 9)
  compat: {
    title: 'Compatible avec Tous vos Appareils & Écrans',
    /** The part of the title the brief shows in violet. */
    highlight: 'Tous vos Appareils',
    subtitle:
      "Découvrez une compatibilité universelle et nos guides d'installation pour profiter de votre abonnement Atlas Pro ONTV sur chaque écran.",
    /** Link at the bottom of each card, to the installation hub. Not in the brief. */
    guide: "Guide d'installation",
    guideFor: (device: string) => `Guide d'installation : ${device}`,
    tv: {
      title: 'Téléviseurs',
      description: 'Configuration rapide et directe sur votre Smart TV.',
      pills: ['Samsung', 'LG', 'Sony', '+2'],
    },
    android: {
      title: 'Android',
      /** « Suite officielle » + the official apps (from FACTS) and « Lecteurs » + the players below. */
      suite: 'Suite officielle',
      players: 'Lecteurs',
      playerNames: ['IBO Player', 'Hot Player', 'IBO Player Smarter', 'Bob Player', 'TiviMate', 'Smarters Pro'],
      pills: ['Boîtier', 'Téléphone', 'Tablette'],
    },
    apple: {
      title: 'Apple',
      description: 'Tutoriel clair et configuration fluide pour les appareils Apple.',
      pills: ['iPhone', 'iPad', 'Apple TV'],
    },
    box: {
      title: 'Boîtiers',
      description: 'Installation haute performance sur tous les modèles.',
      pills: ['Magbox', 'Formuler Z7', 'Formuler Z8'],
    },
  },

  // Brief pp. 32–33 (Section 11)
  pillars: {
    badge: '✦ ATLASPROTVOFFICIAL · DISTRIBUTEUR AGRÉÉ ATLAS PRO ONTV',
    title: 'Ce Qui Distingue Notre Service Atlas Pro ONTV !',
    subtitle:
      'Des milliers de foyers en France, Belgique, Suisse et Canada nous confient leurs soirées télé. Découvrez pourquoi nos abonnés Atlas Pro nous restent fidèles année après année.',
    distributor: {
      title: "L'Exigence du Distributeur Agréé (Service Plébiscité)",
      body: "Nos abonnés saluent la transparence de notre accompagnement et la régularité exemplaire des flux Atlas Pro ONTV, soir après soir, dès la première seconde d'activation.",
      /** Seal at the bottom of the card, after the seller's name (« AtlasProTVOfficial · … »). From the badge. */
      seal: 'Distributeur Agréé Atlas Pro ONTV',
    },
    screens: {
      title: 'Compatible sur Tous Vos Écrans',
      /** apps: « Atlas Pro ONTV 4.0.2, Max v7, IBO v4.3, 9X » */
      body: (apps: string) =>
        `Que vous utilisiez nos applications officielles gratuites (${apps}) ou un lecteur partenaire (IBO Player, Bob Player, Hot Player, Smarters Pro), votre abonnement fonctionne sur Smart TV, Box Android, Firestick, Apple et PC.`,
      devices: ['Smart TV', 'Box Android', 'Firestick', 'Apple', 'PC'],
    },
    quality: {
      title: 'Image Haute Fidélité (Full HD H.265 & VOD 4K)',
      body: "Du 480p économique au Full HD 1080p haute fluidité en direct et jusqu'à l'Ultra HD 4K sur la VOD, le flux Atlas Pro s'ajuste automatiquement à votre débit Internet sans compression agressive.",
      /** The quality ladder shown on the card. 4K stays tied to the VOD. */
      ladder: ['480p', 'Full HD 1080p · Direct', 'Ultra HD 4K · VOD'],
    },
    infra: {
      title: 'Infrastructure Européenne Multi-Serveurs Anti-Freeze',
      /** uptime: « 99,99 » */
      body: (uptime: string) =>
        `Un réseau de serveurs haute disponibilité réparti en Europe, conçu pour absorber les pics d'audience lors des grands événements sportifs et garantir une stabilité de ${uptime} %.`,
      stat: (uptime: string) => `${uptime} %`,
    },
    zapping: {
      /** seconds: « 0,4 » */
      title: (seconds: string) => `Zapping Éclair (< ${seconds}s)`,
      body: "Passez d'une chaîne à l'autre en une fraction de seconde grâce à l'optimisation de nos flux Atlas Pro ONTV, sans écran noir ni temps de chargement.",
      stat: (seconds: string) => `< ${seconds} s`,
    },
    support: {
      title: 'Aide & Conciergerie Francophone 7j/7',
      /** phone: « +33 7 51 29 91 76 », minutes: « 15 » */
      body: (phone: string, minutes: string) =>
        `Un conseiller technique vous accompagne personnellement sur WhatsApp (${phone}) en moins de ${minutes} minutes, de la validation du paiement jusqu'à l'activation complète de votre écran.`,
      stat: (minutes: string) => `< ${minutes} min`,
      /** WhatsApp button on the card. Not in the brief. */
      cta: 'Écrire à un conseiller',
    },
  },

  // Brief pp. 33–35 (Section 12)
  reviews: {
    badge: '✦ TÉMOIGNAGES VÉRIFIÉS · ATLAS PRO ONTV AVIS 2026',
    title: "L'Avis de Ceux Qui Regardent Atlas Pro ONTV sur Notre Portail",
    subtitle:
      'Découvrez les retours authentiques (Atlas Pro ONTV Avis) des spectateurs qui ont choisi notre portail officiel pour activer et renouveler leur abonnement chaque année.',
    trust: {
      /** rating: « 4,9 » */
      rating: (rating: string) => `${rating} / 5`,
      ratingLabel: 'Note Globale (Avis Atlas Pro ONTV)',
      /** customers: « 50 000 » */
      customers: (customers: string) => `+${customers}`,
      customersLabel: 'Abonnés Accompagnés & Fidélisés',
      /** percent: « 99 » */
      recommend: (percent: string) => `${percent} %`,
      recommendLabel: 'Recommandent Notre Support 7j/7',
    },
    /** Screen-reader text of the 5 stars. */
    stars: 'Note : 5 sur 5',
    countries: { fr: 'France', be: 'Belgique', ch: 'Suisse', ca: 'Canada' },
    /** Each reviewer's city, as written in this language. */
    cities: { thomas: 'Lyon', sophie: 'Québec', karim: 'Namur', marc: 'Bordeaux', lucas: 'Toulouse', nadia: 'Genève' },
    /** The client line: « Thomas R. — Lyon, France · 2026 » (name in bold, then this). */
    from: (city: string, country: string, year: string) => `${city}, ${country} · ${year}`,
    screenshotAlt: (name: string) => `Capture WhatsApp de l'avis de ${name}`,
    /** Link around the screenshot: opens it full size. */
    screenshotOpen: (name: string) => `Agrandir la capture WhatsApp de l'avis de ${name}`,
    /** « À compléter » marker of a review whose screenshot the client has not sent (review mode only). */
    screenshotPending: (name: string) => `Capture WhatsApp de l'avis de ${name}`,
    items: {
      thomas: {
        badge: 'Réactivité Immédiate',
        quote: (_v: ReviewVars) =>
          "J'ai commandé mon abonnement Atlas Pro ONTV directement via leur WhatsApp. Temps de réponse incroyable : en moins de 3 minutes après mon virement, le conseiller m'avait déjà envoyé mon Code Atlas Pro et tout fonctionnait sur ma télé.",
      },
      sophie: {
        badge: 'Aide & Courtoisie',
        quote: (_v: ReviewVars) =>
          "N'étant pas très douée avec la technologie, j'avais peur de ne pas savoir comment installer Atlas Pro ONTV sur ma TV Samsung. Le support a été d'une patience remarquable : ils ont activé mon lecteur IBO Player et injecté mon abonnement à distance pas à pas. Un vrai service humain !",
      },
      karim: {
        badge: 'Stabilité & Sport Full HD',
        quote: (v: ReviewVars) =>
          `J'ai essayé plusieurs vendeurs avant de connaître ce portail officiel. Avec mon forfait Duo 2 Écrans et la nouvelle application ${v.ontv} (et ${v.max}), je regarde tous les grands matchs en Full HD H.265 sans la moindre coupure.`,
      },
      marc: {
        badge: 'Confiance & Transparence',
        quote: (v: ReviewVars) =>
          `Ce que j'apprécie ici, c'est la franchise et le sérieux. En tant que distributeur agréé Atlas Pro, ils ne demandent aucune carte bancaire sur le site, le paiement PayPal et virement SEPA est sécurisé et les tarifs sont clairs (${v.price} l'année). On se sent immédiatement en confiance.`,
      },
      lucas: {
        badge: 'Cinéma XXL & Prix Doux',
        quote: (_v: ReviewVars) =>
          "Depuis que nous sommes passés sur Atlas Pro ONTV, les soirées en famille ont vraiment changé. Le catalogue VOD est énorme (+24 000 films et +6 200 séries en 4K et FHD), on reprend nos épisodes là où on s'était arrêté, et le tarif nous fait économiser une fortune.",
      },
      nadia: {
        badge: 'Fidélité & Suivi',
        quote: (v: ReviewVars) =>
          `Deuxième année que je renouvelle mon Code Atlas Pro auprès de cette équipe. Un simple message sur leur WhatsApp et mon accès a été prolongé pour ${v.months} mois en quelques secondes, sans perdre mes favoris sur ma Box Android.`,
      },
    },
    /** The 8 pills under the reviews. Values come formatted from FACTS. */
    pills: {
      quality: 'Flux Full HD H.265 & VOD 4K',
      zapping: (seconds: string) => `Zapping < ${seconds}s`,
      servers: (uptime: string) => `Serveurs Anti-Freeze ${uptime} %`,
      price: (monthly: string) => `Dès ${monthly} / mois`,
      catalogue: (films: string, series: string) => `+${films} Films & +${series} Séries`,
      support: (minutes: string) => `Support WhatsApp < ${minutes} min`,
      apps: (ontv: string, max: string) => `Apps Officielles ${ontv} & ${max}`,
      replay: (days: string) => `Replay ${days} Jours`,
    },
  },
}
