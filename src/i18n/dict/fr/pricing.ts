// French copy, home how-to-buy, pricing cards, reassurance band; Boutique page with the order configurator. Owner: pricing.
// The brief's French copy is the source: use it as written. Translations in ../<lang>/pricing.ts must have exactly
// the same keys (TypeScript checks it). No business number, price, version, code or link here: read those from
// src/lib/facts.ts. WhatsApp messages live in src/lib/whatsapp.ts and stay French.
//
// Badges are written in normal case: the Badge component puts them in capitals.

/** « 1, 2 ou 3 » */
const orList = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} ou ${items[items.length - 1]}`

export const pricing = {
  // Brief pp. 17–19: « Comment acheter votre abonnement Atlas Pro ONTV » (4 timeline steps).
  howTo: {
    badge: '🛒 Comment ça marche',
    title: 'Comment acheter votre abonnement Atlas Pro ONTV',
    // Shown in violet with the brand name (« abonnement Atlas Pro ONTV »); kept separate so the line can wrap.
    highlight: 'abonnement',
    subtitle: (minutes: string) =>
      `De votre commande à votre premier programme en moins de ${minutes} minutes. Voici comment activer votre abonnement Atlas Pro en toute simplicité.`,
    step: (n: string) => `Étape ${n}`,
    steps: {
      choose: {
        title: 'Choisissez votre offre',
        // Lead's decision: every plan is 12 months (the brief's « 3, 6 ou 12 mois » is out of date).
        text: (screens: string[], months: string) =>
          `Sélectionnez la formule de votre abonnement Atlas Pro qui vous convient le mieux : ${orList(screens)} écrans pour ${months} mois.`,
        time: '1 minute',
      },
      pay: {
        title: (pct: string) => `Paiement ${pct} sécurisé`,
        text: 'Payez en toute tranquillité via PayPal ou Virement Bancaire (SEPA). Vos transactions sont cryptées de bout en bout pour votre sécurité.',
        time: '2 minutes',
      },
      receive: {
        title: 'Recevez vos codes instantanément',
        text: 'Vos identifiants et votre Code Atlas Pro arrivent immédiatement par WhatsApp et e-mail (en moins de 30 secondes). Aucune attente.',
        time: '< 30 secondes',
      },
      install: {
        title: 'Installez et regardez !',
        text: (channels: string) =>
          `Téléchargez l'Atlas Pro ONTV application (ou via l'Atlas Pro ONTV APK, Atlas Pro Max et IBO), entrez vos codes et profitez immédiatement de plus de ${channels} chaînes en direct.`,
        time: 'Instantané',
      },
    },
    timeLabel: 'Durée',
  },

  // Brief pp. 19–22: « Choisissez votre forfait Atlas Pro ONTV » (3 cards).
  plans: {
    badge: '🏷️ Tarifs & abonnements',
    title: 'Choisissez votre forfait Atlas Pro ONTV',
    // Shown in violet with the brand name (« forfait Atlas Pro ONTV »).
    highlight: 'forfait',
    subtitle:
      'Ne nous voilons pas la face : il existe des dizaines de services IPTV, mais rares sont ceux qui tiennent leurs promesses. Atlas Pro ONTV fait partie de ces exceptions. Testez sans risque — garantie satisfait ou remboursé si cela ne vous convient pas.',
    names: {
      premium: 'Premium 1 Écran',
      duo: 'Duo 2 Écrans',
      famille: 'Famille 3 Écrans',
    },
    popular: 'Le plus populaire',
    limited: '🔥 Offre limitée',
    /** « 40€ / 12 mois »: the part after the price. */
    per: (months: string) => `/ ${months} mois`,
    perMonth: (price: string) => `Soit ${price} / mois`,
    cta: "S'abonner maintenant",
    featuresLabel: (plan: string) => `Inclus dans le forfait ${plan}`,
    features: {
      codesOne: (months: string) => `1 code d'activation officiel (Code Atlas Pro) pour ${months} mois`,
      codesMany: (count: string) => `${count} codes d'activation officiels (Code Atlas Pro) pour ${count} écrans`,
      // 4K is the VOD library only (client rule): « (VOD) » says so.
      quality: 'Qualité 4K (VOD), FHD, HD et SD',
      antiFreeze: 'Système Anti-Coupure (Anti-Freeze) inclus',
      replay: (days: string) => `Replay ${days} Jours + Guide TV Complet (EPG)`,
      support: (pct: string) => `Support client ${pct} en Français`,
      supportVip: (pct: string) => `Support VIP ${pct} en Français`,
      links: 'Liens personnalisés au choix : Format Xtream Codes ou M3U',
      assistance: "Assistance à l'installation et support après-vente",
      warranty: 'Garantie et activation officielle',
      apps: (apps: string) => `Accès à toutes les applications (${apps})`,
    },
    boutiqueLink: 'Commander en 3 clics dans la Boutique',
  },

  // Brief p. 22: « Barre de Confiance & Paiement », right under the 3 cards. PayPal and SEPA only: no card marks.
  trust: {
    label: 'Garanties et moyens de paiement',
    secure: (pct: string) => `Paiement ${pct} sécurisé`,
    instant: 'Activation instantanée',
    protected: (pct: string) => `Accès ${pct} protégé & garanti`,
    payment: 'Paiement :',
    methods: {
      paypal: 'PayPal',
      sepa: 'Virement bancaire / SEPA',
    },
  },

  // Brief p. 22: « Bandeau de Réassurance Post-Tarifs ».
  reassurance: {
    label: 'Nos engagements',
    renewal: {
      title: 'Renouvellement Facile',
      text: 'Prolongez votre Code Atlas Pro en un clic sur WhatsApp sans réinstaller vos applications ni perdre vos favoris.',
      cta: 'Renouveler sur WhatsApp',
    },
    activation: {
      title: 'Activation Rapide',
      text: 'Code Atlas Pro officiel, identifiants Xtream et lien M3U envoyés instantanément sur WhatsApp et par e-mail dès validation.',
    },
    guarantee: {
      title: 'Garantie & Suivi Continu (Satisfait ou Remboursé)',
      text: (months: string) =>
        `Accompagnement personnalisé et garantie totale de continuité tout au long de vos ${months} mois d'abonnement.`,
    },
  },

  // Brief pp. 43–45: « Mini-Configurateur Boutique ».
  configurator: {
    badge: '🛍️ Boutique Express · Commande en 3 clics',
    title: 'Configurez votre Abonnement Atlas Pro ONTV en 10 Secondes',
    subtitle:
      'Sélectionnez votre appareil, le nombre de codes souhaité et votre moyen de paiement pour recevoir vos accès immédiatement sur WhatsApp.',
    stepA: { letter: 'A', title: 'Quel est votre appareil ?' },
    stepB: { letter: 'B', title: 'Combien de codes Atlas Pro souhaitez-vous ?' },
    stepC: { letter: 'C', title: 'Votre mode de paiement préféré' },
    step: (letter: string) => `Étape ${letter}`,
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
    codes: (count: number) => (count === 1 ? '1 Code Atlas Pro' : `${count} Codes Atlas Pro`),
    codesDetail: (plan: string, months: string) => `${plan} · ${months} Mois`,
    price: (price: string) => `Prix : ${price}`,
    popular: 'Populaire',
    payments: {
      sepa: 'Virement Bancaire (SEPA)',
      paypal: 'PayPal',
    },
    summary: 'Votre commande',
    summaryDevice: 'Appareil',
    summaryOffer: 'Offre',
    summaryPayment: 'Paiement',
    notChosen: 'À choisir',
    total: 'Total',
    totalFor: (months: string) => `pour ${months} mois`,
    cta: (price: string) => `Commander Maintenant sur WhatsApp (${price})`,
    needDevice: "Choisissez d'abord votre appareil (Étape A).",
    needPayment: 'Choisissez votre mode de paiement (Étape C).',
    ready: "Votre commande part sur WhatsApp, déjà rédigée : il ne reste qu'à l'envoyer.",
    boutiqueLink: 'Ouvrir la Boutique',
  },

  // Boutique page (/boutique/).
  boutique: {
    badge: 'Distributeur Officiel Agréé Atlas Pro ONTV',
    title: 'Boutique Atlas Pro ONTV',
    intro:
      'Commandez votre abonnement Atlas Pro en 3 clics : votre appareil, le nombre de codes et votre moyen de paiement. Votre commande part directement sur WhatsApp et votre Code Atlas Pro officiel vous est envoyé dès validation, par PayPal ou Virement Bancaire (SEPA).',
  },
}
