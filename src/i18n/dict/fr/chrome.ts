// French copy: header, nav, language switcher, trust banner, footer, floating buttons, 404, shared labels.
// Owner: chrome. Translations in ../<lang>/chrome.ts must have exactly the same keys.
// Domain, seller name and phone number come from src/lib/facts.ts and are passed in.
export const chrome = {
  /** The marker a missing client fact shows in review mode. */
  pending: 'À compléter',
  skipToContent: 'Aller au contenu',

  /** « INFORMATION OFFICIELLE » bar above the header (brief p. 4). */
  banner: {
    label: 'INFORMATION OFFICIELLE',
    /** Wide screens: the brief's sentence as written. */
    full: (domain: string) =>
      `Portail d'activation agréé et distributeur certifié Atlas Pro sur ${domain} — Service sécurisé à 100% avec garantie officielle : Satisfait ou Remboursé`,
    /** Tablets. */
    medium: (domain: string) => `Distributeur certifié Atlas Pro sur ${domain} — Satisfait ou Remboursé`,
    /** Phones. */
    short: 'Distributeur certifié · Satisfait ou Remboursé',
  },

  nav: {
    label: 'Navigation principale',
    home: 'Accueil',
    boutique: 'Boutique',
    revendeur: 'Revendeur',
    telecharger: 'Télécharger',
    contact: 'Contact',
  },

  header: {
    homeLink: 'Atlas Pro — accueil',
    /** Violet WhatsApp pill: activation or quick renewal. */
    whatsapp: 'Activation & Renouvellement',
    whatsappShort: 'WhatsApp',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    menuTitle: 'Menu',
    menuLanguages: 'Langue',
    menuWhatsapp: 'Activer ou renouveler',
  },

  language: {
    /** Button label for screen readers: « Langue : Français ». */
    button: (name: string) => `Langue : ${name}`,
    menu: 'Choisir la langue',
  },

  footer: {
    tagline: 'Distributeur Officiel Agréé Atlas Pro ONTV · Assistance & Activation 7j/7 en France & en Europe.',
    homeLink: 'AtlasProTVOfficial — accueil',
    sectionsTitle: 'Navigation',
    sections: {
      hero: 'Accueil',
      why: 'Pourquoi Atlas Pro',
      apps: 'Applications APK',
      pricing: 'Tarifs & Forfaits',
      install: "Guides d'Installation",
      reviews: 'Avis Clients',
      faq: 'FAQ',
    },
    pagesTitle: 'Pages',
    supportTitle: 'Support & Informations',
    support: 'Support WhatsApp 7j/7',
    renewal: 'Renouvellement Code Atlas Pro',
    legalTitle: 'Informations légales',
    mentions: 'Mentions Légales',
    confidentialite: 'Politique de Confidentialité',
    conditions: 'Conditions Générales & Garantie Satisfait ou Remboursé',
    paymentTitle: 'Paiement sur WhatsApp',
    payment: { paypal: 'PayPal', sepa: 'Virement bancaire (SEPA)' },
    copyright: (year: number, seller: string) => `© ${year} ${seller} · Distributeur Officiel Agréé Atlas Pro ONTV`,
    watermark: 'ATLAS PRO ONTV',
  },

  floating: {
    whatsapp: 'Écrire au support sur WhatsApp',
    top: 'Revenir en haut de la page',
  },

  notFound: {
    badge: 'ERREUR 404',
    title: 'Cette page est introuvable',
    text: "L'adresse a peut-être changé, ou la page n'existe plus. Revenez à l'accueil ou découvrez nos forfaits Atlas Pro dans la boutique.",
    home: "Retour à l'accueil",
    shop: 'Voir la boutique',
    help: 'Une question ? Notre support vous répond 7j/7 sur WhatsApp.',
    helpLink: 'Écrire sur WhatsApp',
  },
}
