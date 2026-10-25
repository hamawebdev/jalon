// Finnish copy, Reseller page. Owner: tr-fi. Source: ../fr/reseller.ts (same keys, same shapes).
// Never show a reseller price: the price zone always sends to WhatsApp.
import type { Dict } from '../types.ts'

export const reseller: Dict['reseller'] = {
  hero: {
    badge: 'KUMPPANIOHJELMA & VIRALLINEN PANEELI',
    title: 'Ryhdy viralliseksi Atlas Pro ONTV\u00a0-jälleenmyyjäksi',
    description: (uptime: string) =>
      `Kasvata omaa liiketoimintaasi ja luo toistuvia tuloja Ranskan ja Euroopan kysytyimmän premium-IPTV-infrastruktuurin avulla. Liittymällä viralliseen Atlas Pro\u00a0-verkostoomme saat käyttöösi erittäin tehokkaan, intuitiivisen ja täysin itsenäisen hallintapaneelin (jälleenmyyjäpaneeli). Hallitse, aktivoi ja uusi asiakkaidesi koodit yhdellä klikkauksella kaikissa virallisissa sovelluksissamme (Android, Google TV, PC) ja kumppanisoittimissa (iOS, Smart TV) – palvelimen vakaus taattu ${uptime}.`,
    points: ['Jälleenmyyjäpaneeli toimitetaan välittömästi', 'Oma jälleenmyyjätuki 24/7', 'ILMAINEN ASIAKASTUKI & KOULUTUS'],
    seePanels: 'Katso paneelit',
  },

  panels: {
    label: 'Atlas Pro\u00a0-jälleenmyyjäpaneelit',
    title: (codes: string) => `ATLAS PRO\u00a0-PANEELI – ${codes} KOODIA`,
    featured: 'Suosittu',
    logoLabel: 'Atlas Pro ONTV',
    priceLabel: 'Jälleenmyyjähinta',
    priceText: 'Ota yhteyttä tiimiimme WhatsAppissa',
    priceNote: '(vuositilaus)',
    features: {
      codes: (codes: string) => `${codes} ATLAS PRO\u00a0-KOODIA (12 kuukauden krediitit)`,
      channels: (count: string) => `+${count} kanavaa suorana ympäri maailmaa`,
      vod: (count: string) => `+${count} elokuvaa & sarjaa VOD (4K / FHD)`,
      replay: (days: string) => `Jälkikatselu ${days} päivää, EPG & tilausvideo`,
      service: 'ILMAINEN ASIAKASTUKI & KOULUTUS',
      delivery: 'Jälleenmyyjäpaneeli toimitetaan välittömästi',
      support: 'Oma jälleenmyyjätuki 24/7',
    },
    cta: 'Pyydä tätä paneelia WhatsAppissa',
    guarantee: '100 % TYYTYVÄISYYSTAKUU',
  },

  why: {
    badge: 'ATLAS PRO\u00a0-JÄLLEENMYYJÄPANEELI',
    title: 'Paneeli, joka on suunniteltu kasvattamaan liiketoimintaasi',
    items: {
      autonomous: {
        title: 'Erittäin tehokas & itsenäinen paneeli',
        text: 'Intuitiivinen ja täysin itsenäinen hallintapaneeli (jälleenmyyjäpaneeli), joka toimitetaan välittömästi.',
      },
      oneClick: {
        title: 'Hallitse asiakkaitasi yhdellä klikkauksella',
        text: 'Hallitse, aktivoi ja uusi asiakkaidesi koodit yhdellä klikkauksella.',
      },
      apps: {
        title: 'Viralliset sovellukset & kumppanisoittimet',
        text: 'Viralliset sovelluksemme (Android, Google TV, PC) ja kumppanisoittimet (iOS, Smart TV).',
      },
      uptime: {
        title: 'Taattu palvelimen vakaus',
        text: 'Ranskan ja Euroopan kysytyin premium-IPTV-infrastruktuuri.',
      },
      support: {
        title: 'Oma jälleenmyyjätuki 24/7',
        text: 'Ilmainen asiakastuki & koulutus, jotta pääset hyvin alkuun ja voit palvella asiakkaitasi.',
      },
    },
  },

  cta: {
    title: 'Kasvata omaa liiketoimintaasi Atlas Pro ONTV:n kanssa',
    text: 'Jälleenmyyjähinta: ota yhteyttä tiimiimme WhatsAppissa (vuositilaus). Valitse paneelisi:',
    button: (codes: string) => `Paneeli ${codes} koodia`,
    guarantee: '100 % TYYTYVÄISYYSTAKUU',
  },
}
