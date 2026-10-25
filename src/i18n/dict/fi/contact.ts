// Finnish copy, Contact page. Owner: tr-fi. Source: ../fr/contact.ts (same keys, same shapes).
import type { Dict } from '../types.ts'

export const contact: Dict['contact'] = {
  badge: '✦ YHTEYS & TUKI MA–SU',
  title: 'Ota yhteyttä viralliseen Atlas Pro\u00a0-jälleenmyyjääsi',
  subtitle:
    'Kysymys ennen tilausta, aktivoitava tai uusittava koodi, apua asennukseen: tiimimme vastaa sinulle ranskaksi 7 päivänä viikossa.',

  whatsapp: {
    badge: 'Ensisijainen kanava',
    title: 'WhatsApp',
    text: 'Tilaus, aktivointi, Atlas Pro\u00a0-koodin uusiminen ja tekninen tuki: kaikki hoituu täällä suoraan tiimimme kanssa.',
    response: (minutes: number) => `Vastaus < ${minutes} min`,
    days: 'Ma–su',
    french: 'Ranskaksi',
    button: 'Kirjoita WhatsAppissa',
    tip: 'Nopeuta asiointia kertomalla laitteesi ja uusimisen yhteydessä nykyinen koodisi tai käyttäjätunnuksesi.',
  },

  email: {
    title: 'Sähköposti',
    text: 'Yksityiskohtaisiin kysymyksiin ja tilauksesi seurantaan.',
    pending: 'tuen sähköpostiosoite',
  },

  telegram: {
    title: 'Telegram',
    text: 'Tekninen tuki ja virallisten sovellusten uudet versiot.',
    pending: 'Telegram-linkki',
    open: 'Avaa Telegram',
  },

  help: {
    title: 'Löydä vastauksesi yhdellä klikkauksella',
    install: {
      title: 'Asennusoppaat',
      text: 'Smart TV, Fire TV Stick, Android, iPhone, PC: ohjeet laite kerrallaan.',
    },
    faq: {
      title: 'Usein kysytyt kysymykset',
      text: 'Tilaus, aktivointi, yhteensopivuus, uusiminen: vastaukset yleisimpiin kysymyksiin.',
    },
    reseller: {
      title: 'Ryhdy jälleenmyyjäksi',
      text: 'Haluatko myydä Atlas Prota eteenpäin? Tutustu koodipaneeleihimme.',
    },
  },
}
