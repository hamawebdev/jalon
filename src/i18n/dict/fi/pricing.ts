// Finnish copy, home how-to-buy, pricing cards, reassurance band, Shop page configurator. Owner: tr-fi.
// Source: ../fr/pricing.ts (same keys, same shapes). Badges are written in normal case (the Badge component capitalises).
import type { Dict } from '../types.ts'

/** « 1, 2 tai 3 » */
const orList = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} tai ${items[items.length - 1]}`

export const pricing: Dict['pricing'] = {
  howTo: {
    badge: '🛒 Näin se toimii',
    title: 'Näin ostat Atlas Pro ONTV\u00a0-tilauksesi',
    highlight: '-tilauksesi',
    subtitle: (minutes: string) =>
      `Tilauksesta ensimmäiseen ohjelmaan alle ${minutes} minuutissa. Näin aktivoit Atlas Pro\u00a0-tilauksesi vaivattomasti.`,
    step: (n: string) => `Vaihe ${n}`,
    steps: {
      choose: {
        title: 'Valitse tarjouksesi',
        text: (screens: string[], months: string) =>
          `Valitse sinulle parhaiten sopiva Atlas Pro\u00a0-tilauspaketti: ${orList(screens)} näyttöä ${months} kuukaudeksi.`,
        time: '1 minuutti',
      },
      pay: {
        title: (pct: string) => `${pct} turvallinen maksu`,
        text: 'Maksa huoletta PayPalilla tai pankkisiirrolla (SEPA). Maksutapahtumasi salataan päästä päähän turvallisuutesi takaamiseksi.',
        time: '2 minuuttia',
      },
      receive: {
        title: 'Saat koodisi välittömästi',
        text: 'Tunnuksesi ja Atlas Pro\u00a0-koodisi saapuvat heti WhatsAppiin ja sähköpostiisi (alle 30 sekunnissa). Ei odottelua.',
        time: '< 30 sekuntia',
      },
      install: {
        title: 'Asenna ja katso!',
        text: (channels: string) =>
          `Lataa Atlas Pro ONTV\u00a0-sovellus (tai Atlas Pro ONTV APK, Atlas Pro Max ja IBO), syötä koodisi ja nauti heti yli ${channels} suorasta kanavasta.`,
        time: 'Välitön',
      },
    },
    timeLabel: 'Kesto',
  },

  plans: {
    badge: '🏷️ Hinnat & tilaukset',
    title: 'Valitse Atlas Pro ONTV\u00a0-pakettisi',
    highlight: '-pakettisi',
    subtitle:
      'Ollaan rehellisiä: IPTV-palveluita on kymmeniä, mutta harva pitää lupauksensa. Atlas Pro ONTV on yksi näistä poikkeuksista. Kokeile ilman riskiä – rahat takaisin, jos palvelu ei sovi sinulle.',
    names: {
      premium: 'Premium 1 Écran',
      duo: 'Duo 2 Écrans',
      famille: 'Famille 3 Écrans',
    },
    popular: 'Suosituin',
    limited: '🔥 Rajoitettu tarjous',
    per: (months: string) => `/ ${months} kk`,
    perMonth: (price: string) => `Eli ${price} / kk`,
    cta: 'Tilaa nyt',
    featuresLabel: (plan: string) => `${plan}\u00a0-paketti sisältää`,
    features: {
      codesOne: (months: string) => `1 virallinen aktivointikoodi (Code Atlas Pro) ${months} kuukaudeksi`,
      codesMany: (count: string) => `${count} virallista aktivointikoodia (Code Atlas Pro) ${count} näytölle`,
      quality: '4K-laatu (VOD), FHD, HD ja SD',
      antiFreeze: 'Katkoja estävä järjestelmä (Anti-Freeze) sisältyy',
      replay: (days: string) => `Jälkikatselu ${days} päivää + kattava ohjelmaopas (EPG)`,
      support: (pct: string) => `${pct} ranskankielinen asiakastuki`,
      supportVip: (pct: string) => `${pct} ranskankielinen VIP-tuki`,
      links: 'Henkilökohtaiset linkit valintasi mukaan: Xtream Codes- tai M3U-muoto',
      assistance: 'Asennusapu ja jälkituki',
      warranty: 'Takuu ja virallinen aktivointi',
      apps: (apps: string) => `Pääsy kaikkiin sovelluksiin (${apps})`,
    },
    boutiqueLink: 'Tilaa 3 klikkauksella kaupassa',
  },

  trust: {
    label: 'Takuut ja maksutavat',
    secure: (pct: string) => `${pct} turvallinen maksu`,
    instant: 'Välitön aktivointi',
    protected: (pct: string) => `${pct} suojattu & taattu käyttöoikeus`,
    payment: 'Maksu:',
    methods: {
      paypal: 'PayPal',
      sepa: 'Pankkisiirto / SEPA',
    },
  },

  reassurance: {
    label: 'Lupauksemme',
    renewal: {
      title: 'Helppo uusiminen',
      text: 'Jatka Atlas Pro\u00a0-koodiasi yhdellä klikkauksella WhatsAppissa – ilman sovellusten uudelleenasennusta ja suosikkeja menettämättä.',
      cta: 'Uusi WhatsAppissa',
    },
    activation: {
      title: 'Nopea aktivointi',
      text: 'Virallinen Atlas Pro\u00a0-koodi, Xtream-tunnukset ja M3U-linkki lähetetään heti WhatsAppiin ja sähköpostiin maksun vahvistuttua.',
    },
    guarantee: {
      title: 'Takuu & jatkuva tuki (rahat takaisin\u00a0-takuu)',
      text: (months: string) =>
        `Henkilökohtaista opastusta ja täysi jatkuvuustakuu koko ${months} kuukauden tilauksesi ajan.`,
    },
  },

  configurator: {
    badge: '🛍️ Pikakauppa · Tilaus 3 klikkauksella',
    title: 'Määritä Atlas Pro ONTV\u00a0-tilauksesi 10 sekunnissa',
    subtitle:
      'Valitse laitteesi, haluamasi koodien määrä ja maksutapasi, niin saat käyttöoikeutesi heti WhatsAppiin.',
    stepA: { letter: 'A', title: 'Mikä on laitteesi?' },
    stepB: { letter: 'B', title: 'Montako Atlas Pro\u00a0-koodia haluat?' },
    stepC: { letter: 'C', title: 'Valitsemasi maksutapa' },
    step: (letter: string) => `Vaihe ${letter}`,
    devices: {
      androidBox: 'Android TV\u00a0-boksi',
      samsung: 'Samsung Smart TV',
      lg: 'LG Smart TV',
      firestick: 'Fire TV Stick',
      googleTv: 'Android TV / Google TV',
      apple: 'iPhone / iPad / Apple TV',
      pc: 'Windows PC / Mac',
      formuler: 'Formuler / MAG',
    },
    codes: (count: number) => (count === 1 ? '1 Atlas Pro\u00a0-koodi' : `${count} Atlas Pro\u00a0-koodia`),
    codesDetail: (plan: string, months: string) => `${plan} · ${months} kk`,
    price: (price: string) => `Hinta: ${price}`,
    popular: 'Suosittu',
    payments: {
      sepa: 'Pankki\u00adsiirto (SEPA)',
      paypal: 'PayPal',
    },
    summary: 'Tilauksesi',
    summaryDevice: 'Laite',
    summaryOffer: 'Tarjous',
    summaryPayment: 'Maksu',
    notChosen: 'Valitse',
    total: 'Yhteensä',
    totalFor: (months: string) => `${months} kuukaudeksi`,
    cta: (price: string) => `Tilaa nyt WhatsAppissa (${price})`,
    needDevice: 'Valitse ensin laitteesi (vaihe A).',
    needPayment: 'Valitse maksutapasi (vaihe C).',
    ready: 'Tilauksesi lähtee WhatsAppiin valmiiksi kirjoitettuna: sinun tarvitsee vain lähettää se.',
    boutiqueLink: 'Avaa kauppa',
  },

  boutique: {
    badge: 'Atlas Pro ONTV:n virallinen valtuutettu jälleenmyyjä',
    title: 'Atlas Pro ONTV\u00a0-kauppa',
    intro:
      'Tilaa Atlas Pro\u00a0-tilauksesi 3 klikkauksella: laitteesi, koodien määrä ja maksutapasi. Tilauksesi lähtee suoraan WhatsAppiin, ja virallinen Atlas Pro\u00a0-koodisi lähetetään sinulle heti maksun vahvistuttua – maksu PayPalilla tai pankkisiirrolla (SEPA).',
  },
}
