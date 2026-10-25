// French copy, Contact page. Owner: chrome.
// The brief has no contact page copy: this is written from its own facts and wording (support 7j/7, réponse en moins
// de 15 minutes, en français, WhatsApp / Telegram / E-mail). Translations in ../<lang>/contact.ts must have exactly
// the same keys (TypeScript checks it). No business number, price, version, code or link here: read those from
// src/lib/facts.ts. WhatsApp messages live in src/lib/whatsapp.ts and stay French.
export const contact = {
  badge: '✦ CONTACT & SUPPORT 7J/7',
  title: 'Contactez votre distributeur officiel Atlas Pro',
  subtitle:
    "Une question avant de commander, un code à activer ou à renouveler, une aide à l'installation : notre équipe vous répond en français, 7j/7.",

  whatsapp: {
    badge: 'Canal prioritaire',
    title: 'WhatsApp',
    text: "Commande, activation, renouvellement de votre Code Atlas Pro et assistance technique : tout se règle ici, directement avec notre équipe.",
    /** « Réponse < 15 min » */
    response: (minutes: number) => `Réponse < ${minutes} min`,
    days: '7j/7',
    french: 'En français',
    button: 'Écrire sur WhatsApp',
    tip: 'Pour aller plus vite, indiquez votre appareil et, pour un renouvellement, votre code ou identifiant actuel.',
  },

  email: {
    title: 'E-mail',
    text: 'Pour vos demandes détaillées et le suivi de votre abonnement.',
    pending: 'adresse e-mail du support',
  },

  telegram: {
    title: 'Telegram',
    text: 'Assistance technique et nouvelles versions des applications officielles.',
    pending: 'lien Telegram',
    open: 'Ouvrir Telegram',
  },

  help: {
    title: 'Trouvez votre réponse en un clic',
    install: {
      title: "Guides d'Installation",
      text: 'Smart TV, Fire TV Stick, Android, iPhone, PC : la marche à suivre appareil par appareil.',
    },
    faq: {
      title: 'Questions Fréquentes',
      text: 'Commande, activation, compatibilité, renouvellement : les réponses aux questions les plus posées.',
    },
    reseller: {
      title: 'Devenir Revendeur',
      text: 'Vous souhaitez revendre Atlas Pro ? Découvrez nos panels de codes.',
    },
  },
}
