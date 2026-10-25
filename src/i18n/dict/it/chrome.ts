// Italian copy: header, nav, language switcher, trust banner, footer, floating buttons, 404, shared labels.
// Translation of ../fr/chrome.ts (owner of the source: chrome). Same keys, same shapes.
import type { Dict } from '../types.ts'

export const chrome: Dict['chrome'] = {
  pending: 'Da completare',
  skipToContent: 'Vai al contenuto',

  banner: {
    label: 'INFORMAZIONE UFFICIALE',
    full: (domain: string) =>
      `Portale di attivazione autorizzato e distributore certificato Atlas Pro su ${domain} — Servizio sicuro al 100% con garanzia ufficiale: Soddisfatto o Rimborsato`,
    medium: (domain: string) => `Distributore certificato Atlas Pro su ${domain} — Soddisfatto o Rimborsato`,
    short: 'Distributore certificato · Soddisfatto o Rimborsato',
  },

  nav: {
    label: 'Navigazione principale',
    home: 'Home',
    boutique: 'Negozio',
    revendeur: 'Rivenditore',
    telecharger: 'Scarica',
    contact: 'Contatti',
  },

  header: {
    homeLink: 'Atlas Pro — home',
    whatsapp: 'Attivazione & Rinnovo',
    whatsappShort: 'WhatsApp',
    menuOpen: 'Apri il menu',
    menuClose: 'Chiudi il menu',
    menuTitle: 'Menu',
    menuLanguages: 'Lingua',
    menuWhatsapp: 'Attiva o rinnova',
  },

  language: {
    button: (name: string) => `Lingua: ${name}`,
    menu: 'Scegli la lingua',
  },

  footer: {
    tagline: 'Distributore Ufficiale Autorizzato Atlas Pro ONTV · Assistenza & Attivazione 7 giorni su 7 in Francia e in Europa.',
    homeLink: 'AtlasProTVOfficial — home',
    sectionsTitle: 'Navigazione',
    sections: {
      hero: 'Home',
      why: 'Perché Atlas Pro',
      apps: 'Applicazioni APK',
      pricing: 'Prezzi & Piani',
      install: 'Guide di Installazione',
      reviews: 'Recensioni Clienti',
      faq: 'FAQ',
    },
    pagesTitle: 'Pagine',
    supportTitle: 'Supporto & Informazioni',
    support: 'Supporto WhatsApp 7 giorni su 7',
    renewal: 'Rinnovo Codice Atlas Pro',
    legalTitle: 'Informazioni legali',
    mentions: 'Note Legali',
    confidentialite: 'Informativa sulla Privacy',
    conditions: 'Condizioni Generali & Garanzia Soddisfatto o Rimborsato',
    paymentTitle: 'Pagamento su WhatsApp',
    payment: { paypal: 'PayPal', sepa: 'Bonifico bancario (SEPA)' },
    copyright: (year: number, seller: string) => `© ${year} ${seller} · Distributore Ufficiale Autorizzato Atlas Pro ONTV`,
    watermark: 'ATLAS PRO ONTV',
  },

  floating: {
    whatsapp: 'Scrivi al supporto su WhatsApp',
    top: 'Torna in cima alla pagina',
  },

  notFound: {
    badge: 'ERRORE 404',
    title: 'Pagina non trovata',
    text: "L'indirizzo potrebbe essere cambiato, oppure la pagina non esiste più. Torna alla home o scopri i nostri piani Atlas Pro nel negozio.",
    home: 'Torna alla home',
    shop: 'Vai al negozio',
    help: 'Hai una domanda? Il nostro supporto ti risponde 7 giorni su 7 su WhatsApp.',
    helpLink: 'Scrivi su WhatsApp',
  },
}
