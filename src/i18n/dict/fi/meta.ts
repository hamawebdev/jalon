// Finnish <title>, meta description and structured-data wording. Owner: tr-fi. Source: ../fr/meta.ts (same keys).
// Titles ≤ ~60 characters, descriptions ~140–160, with Finnish search phrasing (« Atlas Pro tilaus », « IPTV »).
import type { Dict } from '../types.ts'

export const meta: Dict['meta'] = {
  siteName: 'AtlasProTVOfficial',
  ogImageAlt: 'Atlas Pro ONTV 2026 · IPTV Atlas Pro\u00a0-tilaus AtlasProTVOfficialilta, viralliselta valtuutetulta jälleenmyyjältä',
  organizationDescription: 'Atlas Pron virallinen valtuutettu jälleenmyyjä nro 1 Ranskassa & Euroopassa.',
  productName: 'Atlas Pro ONTV\u00a0-tilaus',
  productDescription:
    '12 kuukauden IPTV Atlas Pro ONTV\u00a0-tilaus 1, 2 tai 3 näytölle: suorat kanavat Full HD\u00a0-laadulla, elokuvat ja sarjat VOD-palvelussa, jälkikatselu – Androidilla, Smart TV:ssä, Fire TV Stickillä, iPhonella ja PC:llä.',
  planNames: { premium: 'Premium', duo: 'Duo', famille: 'Famille' },
  offerName: (plan: string, screens: number, months: number) =>
    `${plan} · ${screens} ${screens > 1 ? 'näyttöä' : 'näyttö'} · ${months} kk`,
  pages: {
    home: {
      name: 'Etusivu',
      title: 'Atlas Pro ONTV (2026) · IPTV Atlas Pro\u00a0-tilaus',
      description: (v) =>
        `Tutustu Atlas Pro ONTV 2026:een, IPTV Atlas Pro on TV: +${v.channels} kanavaa Full HD:nä, +${v.films} elokuvaa ja +${v.series} sarjaa. Atlas Pro\u00a0-tilaus aktivoidaan WhatsAppissa.`,
    },
    boutique: {
      name: 'Kauppa',
      title: 'Kauppa · Atlas Pro ONTV\u00a0-tilaus 12 kk',
      description: (v) =>
        `Tilaa Atlas Pro ONTV\u00a0-tilauksesi 3 klikkauksella: 1, 2 tai 3 näyttöä 12 kuukaudeksi alkaen ${v.priceFrom}. Maksu PayPalilla tai SEPA-siirrolla, koodit WhatsAppiin.`,
    },
    revendeur: {
      name: 'Jälleenmyyjä',
      title: 'Ryhdy Atlas Pro ONTV\u00a0-jälleenmyyjäksi · Virallinen paneeli',
      description: (v) =>
        `Ryhdy Atlas Pro\u00a0-jälleenmyyjäksi: paneeli, jossa ${v.panels} koodia 12 kuukaudeksi, välitön toimitus, ilmainen koulutus ja oma tuki 24/7. Hinnat WhatsAppissa.`,
    },
    telecharger: {
      name: 'Lataukset',
      title: 'Lataa Atlas Pro ONTV APK · Viralliset sovellukset',
      description: (v) =>
        `Lataa ${v.ontv} (APK), ${v.max} ja ${v.ibo} Downloader-koodeineen sekä soittimet iPhonelle, Smart TV:lle, Windowsille ja Macille.`,
    },
    contact: {
      name: 'Yhteystiedot',
      title: 'Atlas Pro\u00a0-yhteystiedot · WhatsApp-tuki joka päivä',
      description: (v) =>
        `Kysyttävää Atlas Pro\u00a0-tilauksestasi tai Atlas Pro ONTV:n asennuksesta? Tukemme vastaa WhatsAppissa numerossa ${v.whatsapp} 7 päivänä viikossa.`,
    },
    mentions: {
      name: 'Oikeudellinen huomautus',
      title: 'Oikeudellinen huomautus · AtlasProTVOfficial',
      description: (v) =>
        `Sivuston ${v.domain} julkaisija, ylläpito ja immateriaalioikeudet. AtlasProTVOfficial on Atlas Pron virallinen valtuutettu jälleenmyyjä.`,
    },
    confidentialite: {
      name: 'Tietosuojakäytäntö',
      title: 'Tietosuojakäytäntö · AtlasProTVOfficial',
      description: () =>
        'Miten AtlasProTVOfficial käsittelee tietoja, jotka annat tilatessasi ja aktivoidessasi Atlas Pro\u00a0-tilauksesi WhatsAppissa, ja mitkä ovat oikeutesi.',
    },
    conditions: {
      name: 'Yleiset ehdot',
      title: 'Yleiset ehdot & takuu · Atlas Pro ONTV',
      description: () =>
        'Atlas Pro ONTV\u00a0-tilauksen yleiset ehdot: tilaus ja aktivointi WhatsAppissa, maksu PayPalilla tai SEPA-pankkisiirrolla, tyytyväisyystakuu tai rahat takaisin.',
    },
    notFound: {
      name: 'Sivua ei löydy',
      title: 'Sivua ei löydy · Atlas Pro ONTV',
      description: () =>
        'Tätä sivua ei ole olemassa tai sen osoite on muuttunut. Löydät Atlas Pro ONTV\u00a0-tilauksen, sovellukset ja asennusoppaat etusivulta.',
    },
  },
}
