// Finnish copy, home device compatibility, brand pillars, reviews. Owner: tr-fi.
// Source: ../fr/social.ts (same keys, same shapes). Values arrive formatted for fi.
import type { Dict } from '../types.ts'
import type { ReviewVars } from '../fr/social.ts'

export const social: Dict['social'] = {
  compat: {
    title: 'Yhteensopiva kaikkien laitteidesi & näyttöjesi kanssa',
    highlight: 'kaikkien laitteidesi',
    subtitle:
      'Tutustu universaaliin yhteensopivuuteen ja asennusoppaisiimme – nauti Atlas Pro ONTV\u00a0-tilauksestasi jokaisella näytöllä.',
    guide: 'Asennusopas',
    guideFor: (device: string) => `Asennusopas: ${device}`,
    tv: {
      title: 'Televisiot',
      description: 'Nopea ja suoraviivainen käyttöönotto Smart TV:ssäsi.',
      pills: ['Samsung', 'LG', 'Sony', '+2'],
    },
    android: {
      title: 'Android',
      suite: 'Virallinen sovelluspaketti',
      players: 'Soittimet',
      playerNames: ['IBO Player', 'Hot Player', 'IBO Player Smarter', 'Bob Player', 'TiviMate', 'Smarters Pro'],
      pills: ['Boksi', 'Puhelin', 'Tabletti'],
    },
    apple: {
      title: 'Apple',
      description: 'Selkeä opas ja sujuva käyttöönotto Apple-laitteilla.',
      pills: ['iPhone', 'iPad', 'Apple TV'],
    },
    box: {
      title: 'Boksit',
      description: 'Suorituskykyinen asennus kaikkiin malleihin.',
      pills: ['Magbox', 'Formuler Z7', 'Formuler Z8'],
    },
  },

  pillars: {
    badge: '✦ ATLASPROTVOFFICIAL · VALTUUTETTU ATLAS PRO ONTV\u00a0-JÄLLEENMYYJÄ',
    title: 'Tämä erottaa Atlas Pro ONTV\u00a0-palvelumme muista!',
    subtitle:
      'Tuhannet kodit Ranskassa, Belgiassa, Sveitsissä ja Kanadassa luottavat meihin TV-iltojensa suhteen. Katso, miksi Atlas Pro\u00a0-tilaajamme pysyvät uskollisina vuodesta toiseen.',
    distributor: {
      title: 'Valtuutetun jälleenmyyjän vaatimustaso (kiitetty palvelu)',
      body: 'Tilaajamme kiittävät avointa palveluamme ja Atlas Pro ONTV\u00a0-lähetysten esimerkillistä tasaisuutta ilta illan jälkeen, aivan ensimmäisestä aktivointisekunnista alkaen.',
      seal: 'Valtuutettu Atlas Pro ONTV\u00a0-jälleenmyyjä',
    },
    screens: {
      title: 'Toimii kaikilla näytöilläsi',
      body: (apps: string) =>
        `Käytitpä ilmaisia virallisia sovelluksiamme (${apps}) tai kumppanisoitinta (IBO Player, Bob Player, Hot Player, Smarters Pro), tilauksesi toimii Smart TV:ssä, Android-boksissa, Firestickissä, Apple-laitteissa ja PC:llä.`,
      devices: ['Smart TV', 'Android-boksi', 'Firestick', 'Apple', 'PC'],
    },
    quality: {
      title: 'Huipputarkka kuva (Full HD H.265 & 4K VOD)',
      body: 'Säästävästä 480p:stä sujuvaan Full HD 1080p\u00a0-suoralähetykseen ja aina Ultra HD 4K\u00a0-laatuun VOD-sisällöissä: Atlas Pro\u00a0-lähetys mukautuu automaattisesti nettiyhteytesi nopeuteen ilman rajua pakkausta.',
      ladder: ['480p', 'Full HD 1080p · suora', 'Ultra HD 4K · VOD'],
    },
    infra: {
      title: 'Jumiton monipalvelin\u00adinfra\u00adstruktuuri Euroopassa',
      body: (uptime: string) =>
        `Ympäri Eurooppaa hajautettu korkean käytettävyyden palvelinverkko, joka on suunniteltu kestämään urheilun suurtapahtumien katsojapiikit ja takaamaan ${uptime} %:n vakauden.`,
      stat: (uptime: string) => `${uptime} %`,
    },
    zapping: {
      title: (seconds: string) => `Salamannopea kanavanvaihto (< ${seconds} s)`,
      body: 'Vaihda kanavalta toiselle sekunnin murto-osassa optimoitujen Atlas Pro ONTV\u00a0-lähetystemme ansiosta – ilman mustaa ruutua tai latausaikoja.',
      stat: (seconds: string) => `< ${seconds} s`,
    },
    support: {
      title: 'Henkilökohtainen tuki ranskaksi 7 päivänä viikossa',
      body: (phone: string, minutes: string) =>
        `Tekninen neuvoja auttaa sinua henkilökohtaisesti WhatsAppissa (${phone}) alle ${minutes} minuutissa – maksun vahvistamisesta näyttösi täydelliseen aktivointiin asti.`,
      stat: (minutes: string) => `< ${minutes} min`,
      cta: 'Kirjoita neuvojalle',
    },
  },

  reviews: {
    badge: '✦ VARMENNETUT KOKEMUKSET · ATLAS PRO ONTV\u00a0-ARVIOT 2026',
    title: 'Mitä Atlas Pro ONTV:n katsojat sanovat portaalistamme',
    subtitle:
      'Lue aitoja kokemuksia (Atlas Pro ONTV\u00a0-arviot) katsojilta, jotka ovat valinneet virallisen portaalimme tilauksensa aktivointiin ja vuosittaiseen uusimiseen.',
    trust: {
      rating: (rating: string) => `${rating} / 5`,
      ratingLabel: 'Kokonaisarvosana (Atlas Pro ONTV\u00a0-arviot)',
      customers: (customers: string) => `+${customers}`,
      customersLabel: 'Palveltua & uskollista tilaajaa',
      recommend: (percent: string) => `${percent} %`,
      recommendLabel: 'Suosittelee tukeamme (ma–su)',
    },
    stars: 'Arvosana: 5/5',
    countries: { fr: 'Ranska', be: 'Belgia', ch: 'Sveitsi', ca: 'Kanada' },
    cities: { thomas: 'Lyon', sophie: 'Québec', karim: 'Namur', marc: 'Bordeaux', lucas: 'Toulouse', nadia: 'Geneve' },
    from: (city: string, country: string, year: string) => `${city}, ${country} · ${year}`,
    screenshotAlt: (name: string) => `WhatsApp-kuvakaappaus käyttäjän ${name} arviosta`,
    screenshotOpen: (name: string) => `Suurenna WhatsApp-kuvakaappaus käyttäjän ${name} arviosta`,
    screenshotPending: (name: string) => `WhatsApp-kuvakaappaus käyttäjän ${name} arviosta`,
    items: {
      thomas: {
        badge: 'Välitön reagointi',
        quote: (_v: ReviewVars) =>
          'Tilasin Atlas Pro ONTV\u00a0-tilaukseni suoraan heidän WhatsAppistaan. Uskomattoman nopea vastaus: alle 3 minuuttia tilisiirtoni jälkeen neuvoja oli jo lähettänyt Atlas Pro\u00a0-koodini, ja kaikki toimi televisiossani.',
      },
      sophie: {
        badge: 'Apua & ystävällisyyttä',
        quote: (_v: ReviewVars) =>
          'En ole kovin taitava teknologian kanssa, joten pelkäsin, etten osaisi asentaa Atlas Pro ONTV:tä Samsung-televisiooni. Tuki oli huomattavan kärsivällinen: he aktivoivat IBO Player\u00a0-soittimeni ja lisäsivät tilaukseni etänä vaihe vaiheelta. Todella inhimillistä palvelua!',
      },
      karim: {
        badge: 'Vakautta & urheilua Full HD:nä',
        quote: (v: ReviewVars) =>
          `Kokeilin useita myyjiä ennen kuin löysin tämän virallisen portaalin. Duo 2 Écrans\u00a0-paketilla ja uudella ${v.ontv}\u00a0-sovelluksella (sekä ${v.max}) katson kaikki isot ottelut Full HD H.265\u00a0-laadulla ilman ainuttakaan katkosta.`,
      },
      marc: {
        badge: 'Luottamusta & avoimuutta',
        quote: (v: ReviewVars) =>
          `Arvostan täällä suoruutta ja asiallisuutta. Valtuutettuna Atlas Pro\u00a0-jälleenmyyjänä he eivät pyydä sivustolla mitään pankkikorttia, PayPal- ja SEPA-tilisiirtomaksut ovat turvallisia ja hinnat selkeät (${v.price} vuodessa). Luottamus syntyy heti.`,
      },
      lucas: {
        badge: 'XXL-elokuvatarjonta & edullinen hinta',
        quote: (_v: ReviewVars) =>
          'Siitä lähtien kun siirryimme Atlas Pro ONTV:hen, perheen yhteiset illat ovat todella muuttuneet. VOD-kirjasto on valtava (+24 000 elokuvaa ja +6 200 sarjaa 4K- ja FHD-laadulla), jaksoja voi jatkaa siitä mihin jäi, ja hinta säästää meiltä omaisuuden.',
      },
      nadia: {
        badge: 'Uskollisuutta & jatkuvaa tukea',
        quote: (v: ReviewVars) =>
          `Uusin Atlas Pro\u00a0-koodini tämän tiimin kautta jo toista vuotta. Yksi viesti heidän WhatsAppiinsa, ja käyttöoikeuteni jatkettiin ${v.months} kuukaudella muutamassa sekunnissa – Android-boksini suosikit säilyivät tallessa.`,
      },
    },
    pills: {
      quality: 'Full HD H.265\u00a0-lähetykset & 4K VOD',
      zapping: (seconds: string) => `Kanavanvaihto < ${seconds} s`,
      servers: (uptime: string) => `Jumittomat palvelimet ${uptime} %`,
      price: (monthly: string) => `Alkaen ${monthly} / kk`,
      catalogue: (films: string, series: string) => `+${films} elokuvaa & +${series} sarjaa`,
      support: (minutes: string) => `WhatsApp-tuki < ${minutes} min`,
      apps: (ontv: string, max: string) => `Viralliset sovellukset ${ontv} & ${max}`,
      replay: (days: string) => `Jälkikatselu ${days} päivää`,
    },
  },
}
