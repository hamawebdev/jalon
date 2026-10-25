// Finnish copy: header, nav, language switcher, trust banner, footer, floating buttons, 404, shared labels.
// Owner: tr-fi. Source: ../fr/chrome.ts (same keys, same shapes).
import type { Dict } from '../types.ts'

export const chrome: Dict['chrome'] = {
  pending: 'Täydennettävä',
  skipToContent: 'Siirry sisältöön',

  banner: {
    label: 'VIRALLINEN TIEDOTE',
    full: (domain: string) =>
      `Valtuutettu aktivointiportaali ja sertifioitu Atlas Pro\u00a0-jälleenmyyjä osoitteessa ${domain} – 100 % turvallinen palvelu virallisella takuulla: tyytyväisyystakuu tai rahat takaisin`,
    medium: (domain: string) => `Sertifioitu Atlas Pro\u00a0-jälleenmyyjä osoitteessa ${domain} – tyytyväisyystakuu tai rahat takaisin`,
    short: 'Sertifioitu jälleenmyyjä · Rahat takaisin\u00a0-takuu',
  },

  nav: {
    label: 'Päävalikko',
    home: 'Etusivu',
    boutique: 'Kauppa',
    revendeur: 'Jälleenmyyjä',
    telecharger: 'Lataukset',
    contact: 'Yhteystiedot',
  },

  header: {
    homeLink: 'Atlas Pro – etusivu',
    whatsapp: 'Aktivointi & uusiminen',
    whatsappShort: 'WhatsApp',
    menuOpen: 'Avaa valikko',
    menuClose: 'Sulje valikko',
    menuTitle: 'Valikko',
    menuLanguages: 'Kieli',
    menuWhatsapp: 'Aktivoi tai uusi',
  },

  language: {
    button: (name: string) => `Kieli: ${name}`,
    menu: 'Valitse kieli',
  },

  footer: {
    tagline: 'Atlas Pro ONTV:n virallinen valtuutettu jälleenmyyjä · Tuki ja aktivointi 7 päivänä viikossa Ranskassa ja koko Euroopassa.',
    homeLink: 'AtlasProTVOfficial – etusivu',
    sectionsTitle: 'Navigointi',
    sections: {
      hero: 'Etusivu',
      why: 'Miksi Atlas Pro',
      apps: 'APK-sovellukset',
      pricing: 'Hinnat & paketit',
      install: 'Asennusoppaat',
      reviews: 'Asiakasarviot',
      faq: 'UKK',
    },
    pagesTitle: 'Sivut',
    supportTitle: 'Tuki & tiedot',
    support: 'WhatsApp-tuki 7 päivänä viikossa',
    renewal: 'Atlas Pro\u00a0-koodin uusiminen',
    legalTitle: 'Oikeudelliset tiedot',
    mentions: 'Oikeudellinen huomautus',
    confidentialite: 'Tietosuojakäytäntö',
    conditions: 'Yleiset ehdot & rahat takaisin\u00a0-takuu',
    paymentTitle: 'Maksu WhatsAppissa',
    payment: { paypal: 'PayPal', sepa: 'Pankkisiirto (SEPA)' },
    copyright: (year: number, seller: string) => `© ${year} ${seller} · Atlas Pro ONTV:n virallinen valtuutettu jälleenmyyjä`,
    watermark: 'ATLAS PRO ONTV',
  },

  floating: {
    whatsapp: 'Kirjoita tuelle WhatsAppissa',
    top: 'Takaisin sivun alkuun',
  },

  notFound: {
    badge: 'VIRHE 404',
    title: 'Sivua ei löydy',
    text: 'Osoite on ehkä muuttunut tai sivua ei ole enää olemassa. Palaa etusivulle tai tutustu Atlas Pro\u00a0-paketteihimme kaupassa.',
    home: 'Takaisin etusivulle',
    shop: 'Siirry kauppaan',
    help: 'Kysyttävää? Tukemme vastaa sinulle 7 päivänä viikossa WhatsAppissa.',
    helpLink: 'Kirjoita WhatsAppissa',
  },
}
