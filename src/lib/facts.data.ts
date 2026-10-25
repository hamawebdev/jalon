// Atlas Pro — the client's facts. Source: the client's brief (docs/, 2026-10). This is the one file that holds
// business facts: prices, counts, versions, codes, links, contact details. Pages read them from here and never type
// a number or a link of their own.
//
//   null   not given by the client yet. The site shows « À compléter » in review mode (dev server, client preview)
//          and leaves the item out in launch mode (production build). `npm run launch-check` lists what is missing.
//
// Never type a value the client has not given. Types and the list of required facts live in facts.ts.

import type { Facts } from './facts.ts'

export const FACTS: Facts = {
  brand: {
    name: 'Atlas Pro',
    product: 'Atlas Pro ONTV',
    seller: 'AtlasProTVOfficial',
    domain: 'atlasprotvofficial.com',
  },

  whatsapp: {
    // International format without + or spaces, as wa.me wants it.
    number: '33751299176',
    display: '+33 7 51 29 91 76',
  },

  contact: {
    // The brief names e-mail and Telegram as support channels but gives no address or channel link.
    email: null,
    telegram: null,
  },

  // The brief: no card payment on the site; payment is arranged on WhatsApp.
  payment: {
    methods: ['paypal', 'sepa'],
  },

  plans: [
    { id: 'premium', screens: 1, months: 12, price: 40, monthly: 3.33 },
    { id: 'duo', screens: 2, months: 12, price: 70, monthly: 2.91 },
    { id: 'famille', screens: 3, months: 12, price: 85, monthly: 2.36 },
  ],
  featuredPlan: 'duo',

  counts: {
    channels: 13558,
    films: 24198,
    series: 6278,
    episodes: 181185,
    // « +30 000 titres » in the brief (VOD card of the first « Points forts » and the reseller cards)
    vodTitles: 30000,
    replayChannels: 197,
    replayDays: 7,
    sportsChannels: 200,
    customers: 50000,
    uptime: 99.99,
    rating: 4.9,
    recommendSupport: 99,
    supportMinutes: 15,
    zappingSeconds: 0.4,
    installMinutes: 5,
    yearsActive: 8,
    founded: 2018,
    // Paid partner players (IBO Player, Hot Player, …): about this much a year, after a free trial of N days.
    playerPricePerYear: 8,
    playerTrialDays: 7,
    // VOD category counts (« Grille de 8 catégories »)
    vodCategories: {
      action: 1500,
      comedy: 1200,
      drama: 1800,
      scifi: 800,
      horror: 600,
      romance: 900,
      animation: 500,
      documentary: 700,
    },
  },

  // The official Atlas Pro apps. Downloader codes and download links as the brief gives them (Télécharger hub,
  // the later of the brief's two app lists).
  apps: {
    ontv: {
      name: 'Atlas Pro ONTV',
      version: '4.0.2',
      downloaderCode: '822648',
      url: 'https://atlaspro.io/download/64/android-smartphones-tablettes-box-andoid-firestick-android-tv/2269/atlaspro-ontv-4-0.apk',
      activation: ['code'],
      status: 'latest',
    },
    max: {
      name: 'Atlas Pro Max',
      version: '7',
      downloaderCode: '6881653',
      url: 'https://atlaspro.io/download/64/android-smartphones-tablettes-box-andoid-firestick-android-tv/2273/atlas-pro-max-7.apk',
      activation: ['code', 'login'],
      status: 'latest',
    },
    ibo: {
      name: 'Atlas Pro IBO',
      version: '4.3',
      downloaderCode: '4201733',
      url: 'https://atlaspro.io/download/64/android-smartphones-tablettes-box-andoid-firestick-android-tv/2294/atlas-pro-ibo.apk',
      activation: ['code'],
      status: 'new',
    },
    x9: {
      name: 'Atlas Pro 9X',
      version: null,
      downloaderCode: '4858164',
      url: 'https://atlaspro.io/download/64/android-smartphones-tablettes-box-andoid-firestick-android-tv/2319/atlaspro-9x-new.apk',
      activation: ['login', 'code'],
      status: 'new',
    },
    prime: {
      name: 'Atlas Pro Prime',
      version: null,
      downloaderCode: '361975',
      url: 'https://atlaspro.io/download/64/android-smartphones-tablettes-box-andoid-firestick-android-tv/2229/atlaspro-prime.apk',
      activation: ['code'],
      status: 'previous',
    },
  },
  // Older official version the brief lists as « version précédente », with no download.
  previousVersions: ['Atlas Pro 3.0', 'Atlas Pro Prime'],

  // Desktop builds of the official app (links as the brief gives them).
  desktop: {
    windows: 'https://t.co/L9I5yBcJ0R',
    mac: 'https://t.co/GMqOeThczr',
    linux: 'https://t.co/hZg2dWylix',
  },

  // Partner players (paid, about playerPricePerYear € a year after a trial) and their links.
  players: {
    iboPlayer: {
      name: 'IBO Player',
      ios: 'https://apps.apple.com/fr/app/ibo-player/id1547652240',
      windows: 'https://iboplayer.com/app_downloads/ibo_installer.exe',
    },
    hotPlayer: {
      name: 'Hot Player',
      ios: 'https://apps.apple.com/us/app/hot-player/id6695762404',
      windows: 'https://apps.microsoft.com/detail/9PL1L6TVQ60K?hl=en-us&gl=US&ocid=pdpshare',
    },
    iboSmarter: {
      name: 'IBO Player Smarter',
      ios: 'https://apps.apple.com/us/app/ibo-player-smarter/id6759312758',
      windows: 'https://apps.microsoft.com/detail/9NFGGZ3TLVPM?hl=en-us&gl=US&ocid=pdpshare',
    },
  },
  // Downloader codes of partner players (Fire TV / Android / Nvidia Shield guides).
  playerDownloaderCodes: {
    bobPlayer: '815778',
    hotPlayer: '305800',
    iboPlayerPro: '481220',
  },

  // Reseller panels: sizes only. The brief says never to show a reseller price.
  resellerPanels: [10, 20, 30],
  resellerFeaturedPanel: 20,

  // Customer reviews. The quotes are copy (src/i18n). A review goes live once the client sends the customer's
  // WhatsApp screenshot: put the image in public/reviews/ and its path here ('/reviews/thomas.webp').
  reviews: [
    { id: 'thomas', name: 'Thomas R.', city: 'Lyon', country: 'fr', year: 2026, screenshot: null },
    { id: 'sophie', name: 'Sophie B.', city: 'Québec', country: 'ca', year: 2026, screenshot: null },
    { id: 'karim', name: 'Karim D.', city: 'Namur', country: 'be', year: 2026, screenshot: null },
    { id: 'marc', name: 'Marc L.', city: 'Bordeaux', country: 'fr', year: 2026, screenshot: null },
    { id: 'lucas', name: 'Lucas M.', city: 'Toulouse', country: 'fr', year: 2026, screenshot: null },
    { id: 'nadia', name: 'Nadia K.', city: 'Genève', country: 'ch', year: 2026, screenshot: null },
  ],

  // The publisher of the site, for the legal notice. The brief gives none of it.
  legal: {
    companyName: null,
    legalForm: null,
    address: null,
    registration: null,
    publisher: null,
    host: null,
  },
}
