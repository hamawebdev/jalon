// French copy, Revendeur page. Owner: pages.
// The brief's French copy is the source: use it as written. Translations in ../<lang>/reseller.ts must have exactly
// the same keys (TypeScript checks it). No business number, price, version, code or link here: read those from
// src/lib/facts.ts. WhatsApp messages live in src/lib/whatsapp.ts and stay French.
//
// Brief pp. 45–47 (« Section Revendeur — Devenir Revendeur Officiel Atlas Pro ONTV - Sans Afficher les Prix »).
// Never show a reseller price: the price zone always sends to WhatsApp.
export const reseller = {
  hero: {
    badge: 'PROGRAMME PARTENAIRE & PANEL OFFICIEL',
    title: 'Devenir Revendeur Officiel Atlas Pro ONTV',
    /** The uptime, formatted (« 99,99 % »), is passed in. */
    description: (uptime: string) =>
      `Développez votre propre activité et générez des revenus récurrents grâce à l'infrastructure IPTV premium la plus demandée en France et en Europe. En rejoignant notre réseau officiel Atlas Pro, vous accédez à un panneau d'administration (Panel Revendeur) ultra-puissant, intuitif et entièrement autonome. Gérez, activez et renouvelez les codes de vos clients en un clic sur l'ensemble de nos applications officielles (Android, Google TV, PC) et lecteurs partenaires (iOS, Smart TV), avec une stabilité serveur garantie à ${uptime}.`,
    /** Short points under the description, from the card features. */
    points: ['Livraison instantanée de votre Panel Revendeur', 'Support Dédié Revendeurs 24h/24 & 7j/7', 'SERVICE APRÈS-VENTE & FORMATION GRATUITS'],
    seePanels: 'Voir les panels',
  },

  panels: {
    /** Accessible name of the list of panel cards. */
    label: 'Les panels revendeurs Atlas Pro',
    title: (codes: string) => `PANEL ATLAS PRO — ${codes} CODES`,
    featured: 'Populaire',
    logoLabel: 'Atlas Pro ONTV',
    priceLabel: 'Tarif Revendeur',
    priceText: 'Contactez notre équipe sur WhatsApp',
    priceNote: '(abonnement annuel)',
    features: {
      codes: (codes: string) => `${codes} CODES ATLAS PRO (Crédits 12 mois)`,
      channels: (count: string) => `+${count} Chaînes Mondiales en Direct`,
      vod: (count: string) => `+${count} Films & Séries VOD (4K / FHD)`,
      replay: (days: string) => `Replay ${days} Jours, EPG & Vidéo à la demande`,
      service: 'SERVICE APRÈS-VENTE & FORMATION GRATUITS',
      delivery: 'Livraison instantanée de votre Panel Revendeur',
      support: 'Support Dédié Revendeurs 24h/24 & 7j/7',
    },
    cta: 'Demander ce Panel sur WhatsApp',
    guarantee: 'GARANTIE 100 % Satisfaction',
  },

  /** « Why our panel »: the points of the brief's description, as four cards. */
  why: {
    badge: 'PANEL REVENDEUR ATLAS PRO',
    title: 'Un panel pensé pour faire grandir votre activité',
    items: {
      autonomous: {
        title: 'Panel ultra-puissant & autonome',
        text: "Un panneau d'administration (Panel Revendeur) intuitif et entièrement autonome, livré instantanément.",
      },
      oneClick: {
        title: 'Gérez vos clients en un clic',
        text: 'Gérez, activez et renouvelez les codes de vos clients en un clic.',
      },
      apps: {
        title: 'Applications officielles & lecteurs partenaires',
        text: 'Nos applications officielles (Android, Google TV, PC) et les lecteurs partenaires (iOS, Smart TV).',
      },
      uptime: {
        title: 'Stabilité serveur garantie',
        text: "L'infrastructure IPTV premium la plus demandée en France et en Europe.",
      },
      support: {
        title: 'Support Dédié Revendeurs 24h/24 & 7j/7',
        text: 'Service après-vente & formation gratuits pour bien démarrer et accompagner vos clients.',
      },
    },
  },

  cta: {
    title: 'Développez votre propre activité avec Atlas Pro ONTV',
    text: 'Tarif Revendeur : Contactez notre équipe sur WhatsApp (abonnement annuel). Choisissez votre panel :',
    button: (codes: string) => `Panel ${codes} Codes`,
    guarantee: 'GARANTIE 100 % Satisfaction',
  },
}
