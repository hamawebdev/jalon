// German copy: header, nav, language switcher, trust banner, footer, floating buttons, 404, shared labels.
// Translation of ../fr/chrome.ts (same keys). Owner: tr-de.
import type { Dict } from '../types.ts'

export const chrome: Dict['chrome'] = {
  pending: 'Noch zu ergänzen',
  skipToContent: 'Zum Inhalt springen',

  banner: {
    label: 'OFFIZIELLE INFORMATION',
    full: (domain: string) =>
      `Zugelassenes Aktivierungsportal und zertifizierter Atlas Pro Vertriebspartner auf ${domain} — 100 % sicherer Service mit offizieller Garantie: Zufrieden oder Geld zurück`,
    medium: (domain: string) => `Zertifizierter Atlas Pro Vertriebspartner auf ${domain} — Zufrieden oder Geld zurück`,
    short: 'Zertifizierter Vertriebspartner · Geld-zurück-Garantie',
  },

  nav: {
    label: 'Hauptnavigation',
    home: 'Startseite',
    boutique: 'Shop',
    revendeur: 'Wiederverkäufer',
    telecharger: 'Download',
    contact: 'Kontakt',
  },

  header: {
    homeLink: 'Atlas Pro — Startseite',
    whatsapp: 'Aktivierung & Verlängerung',
    whatsappShort: 'WhatsApp',
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schließen',
    menuTitle: 'Menü',
    menuLanguages: 'Sprache',
    menuWhatsapp: 'Aktivieren oder verlängern',
  },

  language: {
    button: (name: string) => `Sprache: ${name}`,
    menu: 'Sprache wählen',
  },

  footer: {
    tagline:
      'Offizieller autorisierter Vertriebspartner von Atlas Pro ONTV · Support & Aktivierung 7 Tage die Woche in Frankreich & Europa.',
    homeLink: 'AtlasProTVOfficial — Startseite',
    sectionsTitle: 'Navigation',
    sections: {
      hero: 'Startseite',
      why: 'Warum Atlas Pro',
      apps: 'APK-Apps',
      pricing: 'Preise & Tarife',
      install: 'Installations\u00adanleitungen',
      reviews: 'Kundenbewertungen',
      faq: 'FAQ',
    },
    pagesTitle: 'Seiten',
    supportTitle: 'Support & Informationen',
    support: 'WhatsApp-Support 7 Tage die Woche',
    renewal: 'Verlängerung des Atlas Pro Codes',
    legalTitle: 'Rechtliches',
    mentions: 'Impressum',
    confidentialite: 'Datenschutzerklärung',
    conditions: 'AGB & Geld-zurück-Garantie',
    paymentTitle: 'Bezahlung über WhatsApp',
    payment: { paypal: 'PayPal', sepa: 'Banküberweisung (SEPA)' },
    copyright: (year: number, seller: string) =>
      `© ${year} ${seller} · Offizieller autorisierter Vertriebspartner von Atlas Pro ONTV`,
    watermark: 'ATLAS PRO ONTV',
  },

  floating: {
    whatsapp: 'Dem Support auf WhatsApp schreiben',
    top: 'Zurück zum Seitenanfang',
  },

  notFound: {
    badge: 'FEHLER 404',
    title: 'Diese Seite wurde nicht gefunden',
    text: 'Die Adresse hat sich vielleicht geändert oder die Seite existiert nicht mehr. Kehren Sie zur Startseite zurück oder entdecken Sie unsere Atlas Pro Tarife im Shop.',
    home: 'Zurück zur Startseite',
    shop: 'Zum Shop',
    help: 'Eine Frage? Unser Support antwortet Ihnen 7 Tage die Woche auf WhatsApp.',
    helpLink: 'Auf WhatsApp schreiben',
  },
}
