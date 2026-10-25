// Finnish copy, home: hero, why Atlas Pro, history, sport, VOD, renewal CTA. Owner: tr-fi.
// Source: ../fr/story.ts (same keys, same shapes). Numbers arrive formatted for fi (useFormat()).
import type { Dict } from '../types.ts'

export const story: Dict['story'] = {
  fmt: {
    plus: (n: string) => `${n}+`,
    lead: (n: string) => `+${n}`,
    thousands: (n: string) => `${n}K+`,
    percent: (n: string) => `${n} %`,
  },

  apps: {
    ontv: (v: string) => `Atlas Pro ONTV ${v}`,
    max: (v: string) => `Max v${v}`,
    ibo: (v: string) => `IBO v${v}`,
    maxFull: (v: string) => `Atlas Pro Max v${v}`,
    iboFull: (v: string) => `Atlas Pro IBO v${v}`,
  },

  hero: {
    badge: '✦ IPTV ATLAS PRO – YKKÖNEN VUONNA 2026',
    title: 'Tutustu Atlas Pro ONTV:hen (2026)',
    subtitle:
      'IPTV Atlas Pro on vakiinnuttanut asemansa suoratoistopalveluiden kiistattomana johtajana. Atlas Pro\u00a0-tilaus on tuttuun tapaan ehdoton mittapuu laadussa, vakaudessa ja käyttökokemuksessa.',
    useCasesLabel: 'Sinulle tärkeintä',
    useCases: {
      uptime: (uptime: string) => `Erittäin vakaa infrastruktuuri 2026 · ${uptime}`,
      sport: 'Suorat lähetykset & urheilun suurtapahtumat Full HD · H.265',
      vod: (films: string, series: string) => `${films} elokuvaa & ${series} sarjaa tilauksesta`,
      apps: (versions: string) => `Virallinen sovelluspaketti: ${versions}`,
      support: (minutes: string) => `Virallinen jälleenmyyjä & tuki < ${minutes} min`,
    },
    cta: 'Aktivoi virallinen Atlas Pro\u00a0-koodisi',
    pricingLink: 'Katso hinnat',
    guarantees: ['100 % varmennettu virallinen koodi', 'Toimitus WhatsAppilla & sähköpostilla', 'Täysi takuu koko tilauskauden ajan'],
    stats: {
      channels: 'TV-kanavaa ympäri maailmaa',
      titles: 'Elokuvaa & sarjaa',
      customers: 'Tyytyväistä asiakasta (Atlas Pro ONTV\u00a0-arviot)',
      uptime: 'Taattu käytettävyys',
    },
    visual: {
      online: 'Verkossa',
      live: 'Suorana',
      liveQuality: 'Full HD 1080p · H.265',
      nav: ['Suora TV', 'Elokuvat', 'Sarjat', 'Jälkikatselu'],
      vodRow: 'Elokuvat & sarjat',
      servers: 'Eurooppalaiset palvelimet',
      support: (minutes: string) => `Tuki < ${minutes} min`,
    },
  },

  why: {
    title: 'Miksi Atlas Pro ON TV hallitsee markkinoita?',
    leader: {
      title: 'IPTV-johtaja Ranskassa & Euroopassa',
      text: (years: string) =>
        `Jo yli ${years} vuoden ajan tunnustettu Atlas Pro ONTV on Ranskan ja koko ranskankielisen maailman virallinen ykköstoimittaja, joka takaa Atlas Pro\u00a0-tilauksellesi horjumattoman vakauden.`,
      stamp: 'Nro 1',
      region: 'Ranska & Eurooppa',
    },
    tech: {
      title: 'Edistynyt teknologia',
      text: 'Palvelimemme on sijoitettu strategisesti eri puolille maailmaa: viive pysyy minimissä, ja uusimman sukupolven H.265-pakkaus takaa täydellisen sujuvan kuvan.',
    },
    apps: {
      title: 'Virallisten sovellusten ekosysteemi (APK & boksit)',
      text: (ontv: string, max: string, ibo: string) =>
        `Nauti sujuvasta kokemuksesta kaikilla laitteillasi. Lataa Atlas Pro ONTV APK vaivatta, hyödynnä Atlas Pro Maxin teho (versio ${max}) tai käytä Atlas Pro IBO:ta (v${ibo}). Atlas Pro ONTV ${ontv}\u00a0-sovelluksemme on optimoitu kaikille Android-bokseille, Smart TV:ille ja PC:ille.`,
      tag: 'APK',
    },
    world: {
      title: 'Maailmanlaajuinen kattavuus',
      text: 'Atlas Pro ONTV\u00a0-sovellus toimii kaikkialla: Ranskassa, Belgiassa, Sveitsissä, Kanadassa, Yhdysvalloissa ja monessa muussa maassa. Täydellistä tarkkuutta suosikkikanavapaketeillesi.',
    },
    support: {
      title: 'Tuki joka päivä & asiakasarviot',
      text: (minutes: string) =>
        `Ongelmia, kuten ”Atlas Pro ei saa yhteyttä palvelimeen”? Ranskankielinen tekninen tiimimme palvelee WhatsAppissa 7 päivänä viikossa, ja vastaus tulee alle ${minutes} minuutissa.`,
      reviews: 'Tutustu Atlas Pro ONTV\u00a0-arvioihin',
      response: (minutes: string) => `< ${minutes} min`,
    },
    value: {
      title: 'Säästöä & erinomainen hinta-laatusuhde',
      text: 'Yhden Atlas Pro\u00a0-tilauksen hinnalla saat sisältöä, joka vastaa kymmeniä erillisiä tilauksia (urheilu, elokuvat, maailman TV-kanavat). Runsain sisältö parhaaseen hintaan.',
      tags: ['Urheilu', 'Elokuvat', 'Maailman TV'],
    },
  },

  history: {
    title: 'Atlas Pro\u00a0-tarina',
    creation: {
      label: (year: string) => `PERUSTAMINEN (${year})`,
      title: 'Atlas Pro syntyy',
      text: 'Atlas Pro ONTV:n tarina alkoi yksinkertaisesta visiosta: tarjota helposti saatavilla oleva ja luotettava vaihtoehto perinteisille suoratoistopalveluille.',
    },
    expansion: {
      label: 'LAAJENTUMINEN',
      title: 'Kansainvälinen kasvu',
      text: (generation: string) =>
        `Kehitimme omat sovelluksemme (Atlas Pro ONTV ${generation}, Atlas Pro Max, Atlas Pro IBO) tarjotaksemme vertaansa vailla olevan käyttökokemuksen kaikilla näytöillä.`,
    },
    today: {
      label: 'TÄNÄÄN',
      title: 'Markkinajohtaja',
      text: 'Atlaspro ONTV:stä on tullut ehdoton mittapuu laadussa, palvelinten vakaudessa ja sisällön runsaudessa.',
    },
    future: {
      label: 'TULEVAISUUS',
      title: 'Jatkuvaa innovointia',
      text: 'Tiimimme kehittää väsymättä uusia ominaisuuksia ja optimoi IPTV Atlas Pro\u00a0-palveluasi jatkuvasti.',
    },
  },

  sport: {
    title: 'Atlas Pro ON TV & urheilu suorana',
    text: (channels: string) =>
      `Urheilun ystäville Atlas Pro\u00a0-tilaus on todellinen paratiisi. Tilaukseen sisältyvät kaikki merkittävät urheilukanavat ja yli ${channels} premium-kanavaa (TF1, France 2, M6 jne.). Tehokkaiden palvelimiemme ansiosta et menetä yhtäkään maailman suurtapahtumaa.`,
    pills: { football: 'Jalkapallo', basketball: 'Koripallo', tennis: 'Tennis', cars: 'Moottoriurheilu' },
    visual: {
      live: 'Suorana',
      quality: 'Full HD 1080p · H.265',
      channels: (channels: string) => `+${channels} premium-kanavaa`,
    },
  },

  vod: {
    title: 'VOD Atlas Pro ONTV (elokuvat & sarjat)',
    text: (films: string, series: string) =>
      `Atlas Pro VOD\u00a0-palvelussa on yli ${films} elokuvaa ja ${series} sarjaa. Pohjaton kirjasto, jota päivitetään joka päivä iloksesi.`,
    checks: {
      quality: (ontv: string) => `4K- ja Full HD\u00a0-laatu (optimoitu sovellukselle ${ontv})`,
      subtitles: 'Monikieliset tekstitykset (mm. ranska)',
      daily: 'Päivittyy joka päivä uusimmilla julkaisuilla',
      compat: 'Yhteensopiva Atlas Pro Maxin ja Atlas Pro IBO:n kanssa',
    },
    categoriesLabel: 'Kategoriat',
    categories: {
      action: 'Toiminta',
      comedy: 'Komedia',
      drama: 'Draama',
      scifi: 'Sci-fi',
      horror: 'Kauhu',
      romance: 'Romantiikka',
      animation: 'Animaatio',
      documentary: 'Dokumentti',
    },
    visual: {
      allusion: 'Maailman suurimpien alustojen alkuperäistuotannot',
      episodes: (episodes: string) => `${episodes} jaksoa`,
      quality: '4K UHD & Full HD',
    },
  },

  renewal: {
    title: 'Liity Atlas Pro ONTV:hen jo tänään',
    text: 'Koe IPTV:n parhaat puolet Atlas Pro 2026:n kanssa. Nauti television parhaasta tarjonnasta: suorat urheilulähetykset, uudet elokuvat ja eksklusiiviset sarjat.',
    subscribe: 'Tilaa nyt (uusi asiakas)',
    renew: 'Uusi täällä (syötä Atlas Pro\u00a0-koodisi)',
  },
}
