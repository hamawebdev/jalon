// French copy, home: hero, why Atlas Pro, history, sport, VOD, renewal CTA. Owner: story.
// The brief's French copy is the source: use it as written. Translations in ../<lang>/story.ts must have exactly
// the same keys (TypeScript checks it). No business number, price, version, code or link here: read those from
// src/lib/facts.ts. WhatsApp messages live in src/lib/whatsapp.ts and stay French.
//
// Functions take numbers already formatted for the language (useFormat()), and versions as the facts give them.

export const story = {
  /** Shared number patterns. */
  fmt: {
    /** « 13 558+ » */
    plus: (n: string) => `${n}+`,
    /** « +24 198 » */
    lead: (n: string) => `+${n}`,
    /** « 50K+ » (the number is in thousands) */
    thousands: (n: string) => `${n}K+`,
    /** « 99,99 % » (French: narrow no-break space before %) */
    percent: (n: string) => `${n} %`,
  },

  /** App names with their version, as the brief writes them. */
  apps: {
    ontv: (v: string) => `Atlas Pro ONTV ${v}`,
    max: (v: string) => `Max v${v}`,
    ibo: (v: string) => `IBO v${v}`,
    maxFull: (v: string) => `Atlas Pro Max v${v}`,
    iboFull: (v: string) => `Atlas Pro IBO v${v}`,
  },

  // Brief pp. 13–14 (hero v2: badge, H1, subtitle, 4 stats) and pp. 4–5 (hero v1: pills, CTA, micro-guarantees).
  hero: {
    badge: '✦ LE N°1 IPTV ATLAS PRO EN 2026',
    title: 'Découvrez Atlas Pro ONTV (2026)',
    subtitle:
      "IPTV Atlas Pro s'est imposé comme le leader incontesté des services de streaming. L'abonnement Atlas Pro représente, comme toujours, la référence absolue en matière de qualité, de stabilité et d'expérience utilisateur.",
    /** Label of the use-case pill group (screen readers). */
    useCasesLabel: 'Ce qui compte pour vous',
    useCases: {
      uptime: (uptime: string) => `Infrastructure 2026 Ultra-Stable · ${uptime}`,
      sport: 'Direct & Grands Événements Sportifs Full HD · H.265',
      vod: (films: string, series: string) => `${films} Films & ${series} Séries à la Demande`,
      apps: (versions: string) => `Suite Officielle : ${versions}`,
      support: (minutes: string) => `Distributeur Officiel & Support < ${minutes} min`,
    },
    cta: 'Activer mon Code Atlas Pro Officiel',
    pricingLink: 'Voir les tarifs',
    guarantees: ['Code officiel vérifié 100%', 'Livraison WhatsApp & E-mail', 'Garantie intégrale sur toute la durée'],
    stats: {
      channels: 'Chaînes TV Mondiales',
      titles: 'Films & Séries',
      customers: 'Clients Satisfaits (Avis Atlas Pro ONTV)',
      uptime: 'Uptime Garanti',
    },
    /** The illustration on the right (decorative). */
    visual: {
      online: 'En ligne',
      live: 'En direct',
      liveQuality: 'Full HD 1080p · H.265',
      nav: ['TV en direct', 'Films', 'Séries', 'Replay'],
      vodRow: 'Films & Séries',
      servers: 'Serveurs européens',
      support: (minutes: string) => `Support < ${minutes} min`,
    },
  },

  // Brief pp. 14–15.
  why: {
    title: 'Pourquoi Atlas Pro ON TV Domine le Marché ?',
    leader: {
      title: 'Leader IPTV France & Europe',
      text: (years: string) =>
        `Reconnu depuis plus de ${years} ans, Atlas Pro ONTV est le fournisseur officiel N°1 en France et dans le monde francophone, garantissant une stabilité à toute épreuve pour votre abonnement Atlas Pro.`,
      stamp: 'N°1',
      region: 'France & Europe',
    },
    tech: {
      title: 'Technologie Avancée',
      text: 'Nos serveurs sont répartis stratégiquement à travers le monde pour garantir une latence minimale et un encodage H.265 de dernière génération pour une fluidité parfaite.',
    },
    apps: {
      title: "Écosystème d'Applications Officielles (APK & Box)",
      text: (ontv: string, max: string, ibo: string) =>
        `Profitez d'une expérience fluide sur tous vos appareils. Téléchargez facilement l'Atlas Pro ONTV APK, profitez de la puissance d'Atlas Pro Max (Version ${max}), ou utilisez Atlas Pro IBO (v${ibo}). Notre Atlas Pro ONTV ${ontv} application est optimisée pour toutes les box Android, Smart TV et PC.`,
      tag: 'APK',
    },
    world: {
      title: 'Couverture Mondiale',
      text: "L'Atlas Pro ONTV application fonctionne partout : France, Belgique, Suisse, Canada, USA, et bien plus encore. Une précision totale pour vos bouquets préférés.",
    },
    support: {
      title: 'Support 7j/7 & Avis Clients',
      text: (minutes: string) =>
        `Un problème avec Atlas Pro ne peut pas se connecter au serveur ? Notre équipe technique francophone est disponible 7/7 par WhatsApp, avec un temps de réponse de moins de ${minutes} minutes.`,
      reviews: 'Découvrez nos Atlas Pro ONTV Avis',
      response: (minutes: string) => `< ${minutes} min`,
    },
    value: {
      title: 'Économies & Rapport Qualité/Prix',
      text: "Pour le prix d'un seul abonnement Atlas Pro, accédez à un contenu équivalent à des dizaines d'abonnements séparés (Sport, Cinéma, TV mondiale). Le contenu le plus riche au meilleur prix.",
      tags: ['Sport', 'Cinéma', 'TV mondiale'],
    },
  },

  // Brief pp. 15–16.
  history: {
    title: "L'Histoire d'Atlas Pro",
    creation: {
      label: (year: string) => `CRÉATION (${year})`,
      title: "Naissance d'Atlas Pro",
      text: "L'aventure Atlas Pro ONTV a débuté avec une vision simple : offrir une alternative accessible et fiable aux services de streaming traditionnels.",
    },
    expansion: {
      label: 'EXPANSION',
      title: 'Croissance Internationale',
      /** `generation`: « 4.0 » (major.minor of the ONTV version). */
      text: (generation: string) =>
        `Développement de nos propres applications dédiées (Atlas Pro ONTV ${generation}, Atlas Pro Max, Atlas Pro IBO) pour une expérience utilisateur inégalée sur tous les écrans.`,
    },
    today: {
      label: "AUJOURD'HUI",
      title: 'Leader du Marché',
      text: 'Atlaspro ONTV est devenu la référence absolue en matière de qualité, de stabilité serveur et de richesse de contenu.',
    },
    future: {
      label: 'FUTUR',
      title: 'Innovation Continue',
      text: 'Notre équipe travaille sans relâche sur de nouvelles fonctionnalités et une optimisation constante de votre IPTV Atlas Pro.',
    },
  },

  // Brief pp. 16–17. Live sport: Full HD 1080p / H.265 only.
  sport: {
    title: 'Atlas Pro ON TV & Le Sport en Direct',
    text: (channels: string) =>
      `Pour les amateurs de sport, l'abonnement Atlas Pro est un véritable paradis. L'abonnement inclut toutes les chaînes sportives majeures et plus de ${channels} chaînes premium (TF1, France 2, M6, etc.). Grâce à nos serveurs haute performance, ne manquez aucun événement mondial.`,
    pills: { football: 'Football', basketball: 'Basketball', tennis: 'Tennis', cars: 'Voitures' },
    visual: {
      live: 'En direct',
      quality: 'Full HD 1080p · H.265',
      channels: (channels: string) => `+${channels} chaînes premium`,
    },
  },

  // Brief pp. 16–17. 4K applies to VOD only.
  vod: {
    title: 'VOD Atlas Pro ONTV (Films & Séries)',
    text: (films: string, series: string) =>
      `Le service VOD d'Atlas Pro compte plus de ${films} films et ${series} séries. Une bibliothèque abyssale mise à jour quotidiennement pour votre plus grand plaisir.`,
    checks: {
      quality: (ontv: string) => `Qualité 4K et Full HD (Optimisée pour ${ontv})`,
      subtitles: 'Sous-titres multilingues (dont le français)',
      daily: 'Mise à jour quotidienne avec les dernières nouveautés',
      compat: 'Compatible avec Atlas Pro Max et Atlas Pro IBO',
    },
    categoriesLabel: 'Catégories',
    categories: {
      action: 'Action',
      comedy: 'Comédie',
      drama: 'Drame',
      scifi: 'Sci-Fi',
      horror: 'Horreur',
      romance: 'Romance',
      animation: 'Animation',
      documentary: 'Documentaire',
    },
    visual: {
      allusion: 'Les créations originales des plus grandes plateformes mondiales',
      episodes: (episodes: string) => `${episodes} épisodes`,
      quality: '4K UHD & Full HD',
    },
  },

  // Brief pp. 17–18.
  renewal: {
    title: "Rejoignez Atlas Pro ONTV Aujourd'hui",
    text: "Découvrez le meilleur de l'IPTV avec Atlas Pro 2026. Profitez du meilleur de la télévision : sports en direct, films récents et séries exclusives.",
    subscribe: 'Abonner Maintenant (Nouveau Client)',
    renew: 'Renouvellement ici (Saisir votre Code Atlas Pro)',
  },
}
