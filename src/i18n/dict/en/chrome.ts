// English copy: header, nav, language switcher, trust banner, footer, floating buttons, 404, shared labels.
// Translation of ../fr/chrome.ts (owner: tr-en). Same keys and shapes as the French source.
import type { Dict } from '../types.ts'

export const chrome: Dict['chrome'] = {
  pending: 'To be completed',
  skipToContent: 'Skip to content',

  banner: {
    label: 'OFFICIAL INFORMATION',
    full: (domain: string) =>
      `Authorised activation portal and certified Atlas Pro distributor at ${domain} — 100% secure service with an official guarantee: Satisfied or Your Money Back`,
    medium: (domain: string) => `Certified Atlas Pro distributor at ${domain} — Satisfied or Your Money Back`,
    short: 'Certified distributor · Money-back guarantee',
  },

  nav: {
    label: 'Main navigation',
    home: 'Home',
    boutique: 'Shop',
    revendeur: 'Reseller',
    telecharger: 'Download',
    contact: 'Contact',
  },

  header: {
    homeLink: 'Atlas Pro — home',
    whatsapp: 'Activation & Renewal',
    whatsappShort: 'WhatsApp',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    menuTitle: 'Menu',
    menuLanguages: 'Language',
    menuWhatsapp: 'Activate or renew',
  },

  language: {
    button: (name: string) => `Language: ${name}`,
    menu: 'Choose language',
  },

  footer: {
    tagline: 'Official Authorised Atlas Pro ONTV Distributor · Support & Activation 7 days a week in France & across Europe.',
    homeLink: 'AtlasProTVOfficial — home',
    sectionsTitle: 'Navigation',
    sections: {
      hero: 'Home',
      why: 'Why Atlas Pro',
      apps: 'APK Apps',
      pricing: 'Prices & Plans',
      install: 'Installation Guides',
      reviews: 'Customer Reviews',
      faq: 'FAQ',
    },
    pagesTitle: 'Pages',
    supportTitle: 'Support & Information',
    support: 'WhatsApp Support 7 days a week',
    renewal: 'Atlas Pro Code Renewal',
    legalTitle: 'Legal information',
    mentions: 'Legal Notice',
    confidentialite: 'Privacy Policy',
    conditions: 'Terms & Conditions & Money-Back Guarantee',
    paymentTitle: 'Payment on WhatsApp',
    payment: { paypal: 'PayPal', sepa: 'Bank transfer (SEPA)' },
    copyright: (year: number, seller: string) => `© ${year} ${seller} · Official Authorised Atlas Pro ONTV Distributor`,
    watermark: 'ATLAS PRO ONTV',
  },

  floating: {
    whatsapp: 'Message support on WhatsApp',
    top: 'Back to top of page',
  },

  notFound: {
    badge: 'ERROR 404',
    title: 'This page cannot be found',
    text: 'The address may have changed, or the page no longer exists. Head back to the home page or explore our Atlas Pro plans in the shop.',
    home: 'Back to home',
    shop: 'Visit the shop',
    help: 'A question? Our support team answers 7 days a week on WhatsApp.',
    helpLink: 'Message us on WhatsApp',
  },
}
