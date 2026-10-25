// Finnish copy, legal pages: legal notice, privacy policy, terms. Owner: tr-fi. Source: ../fr/legal.ts (same keys).
// French law references keep their identifiers (LCEN, Informatique et Libertés, CNIL, RCS / SIREN).
import type { Dict } from '../types.ts'

export const legal: Dict['legal'] = {
  common: {
    badge: 'Oikeudelliset tiedot',
    updatedLabel: 'Päivitetty viimeksi:',
    updated: '25. lokakuuta 2026',
    toc: 'Sisällys',
    others: 'Muut asiakirjat',
    docs: {
      mentions: 'Oikeudellinen huomautus',
      confidentialite: 'Tietosuojakäytäntö',
      conditions: 'Yleiset ehdot & rahat takaisin\u00a0-takuu',
    },
    help: {
      title: 'Kysyttävää näistä tiedoista?',
      text: 'Tiimimme vastaa sinulle WhatsAppissa 7 päivänä viikossa ranskaksi.',
      cta: 'Kirjoita meille WhatsAppissa',
    },
    contact: {
      whatsapp: 'WhatsApp',
      email: 'Sähköposti',
    },
    pending: {
      companyName: 'julkaisijan virallinen yritysnimi',
      legalForm: 'yhtiömuoto (ja tarvittaessa osakepääoma)',
      address: 'kotipaikan osoite',
      registration: 'rekisteröintitiedot (RCS / SIREN, yhteisömyynnin ALV-tunniste)',
      publisher: 'julkaisusta vastaavan henkilön nimi',
      host: 'sivuston palveluntarjoaja (nimi, osoite, puhelinnumero)',
      email: 'tuen sähköpostiosoite',
    },
  },

  mentions: {
    title: 'Oikeudellinen huomautus',
    lead: (domain: string) =>
      `Tiedot sivuston ${domain} julkaisijasta ja palveluntarjoajasta. Tiedot julkaistaan digitaalitalouden luottamusta koskevan Ranskan lain n:o 2004-575 (21.6.2004, LCEN) 6 artiklan nojalla.`,
    publisher: {
      title: 'Sivuston julkaisija',
      intro: (seller: string, domain: string) =>
        `Sivuston ${domain} julkaisija on ${seller}, Atlas Pro ONTV:n virallinen valtuutettu jälleenmyyjä.`,
      rows: {
        tradeName: 'Toiminimi',
        domain: 'Sivuston osoite',
        activity: 'Toiminta',
        companyName: 'Virallinen yritysnimi',
        legalForm: 'Yhtiömuoto',
        address: 'Kotipaikka',
        registration: 'Rekisteröinti',
      },
      activity:
        'Atlas Pro\u00a0-tilauskoodien jakelu ja aktivointi, asennusapu ja asiakastuki.',
    },
    director: {
      title: 'Julkaisusta vastaava henkilö',
      label: 'Julkaisusta vastaava henkilö',
    },
    contact: {
      title: 'Yhteystiedot',
      intro: 'Kaikissa sivustoa tai tilaustasi koskevissa kysymyksissä:',
    },
    host: {
      title: 'Ylläpito',
      label: 'Palveluntarjoaja',
    },
    ip: {
      title: 'Immateriaalioikeudet',
      paragraphs: [
        'Sivuston rakenne, tekstit, kuvitukset ja graafiset elementit on suojattu immateriaalioikeuksilla. Niiden kopiointi tai esittäminen kokonaan tai osittain ilman julkaisijan etukäteen antamaa kirjallista lupaa on kielletty.',
        'Sivustolla mainittujen sovellusten ja soittimien tavaramerkit, nimet ja logot kuuluvat niiden omistajille. Ne mainitaan ainoastaan palvelun yhteensopivuuden osoittamiseksi.',
      ],
    },
    links: {
      title: 'Linkit kolmansien osapuolten palveluihin',
      paragraphs: [
        'Sivustolta on linkkejä kolmansien osapuolten palveluihin: WhatsAppiin tilauksia ja tukea varten sekä virallisten sovellusten ja kumppanisoittimien lataussivuille. Näihin palveluihin sovelletaan niiden omia ehtoja; julkaisija ei vastaa niiden sisällöstä eikä saatavuudesta.',
      ],
    },
    accuracy: {
      title: 'Tietojen paikkansapitävyys',
      paragraphs: [
        'Julkaisija huolehtii julkaistujen tietojen paikkansapitävyydestä (paketit, kanavien ja sisältöjen määrä, sovellusten versiot, asennusoppaat). Tiedot voivat muuttua: jos olet epävarma, tiimimme vahvistaa ajantasaiset tiedot WhatsAppissa.',
      ],
    },
    data: {
      title: 'Henkilötiedot',
      before: 'Henkilötietojesi käsittely kuvataan ',
      link: 'tietosuojakäytännössämme',
      after: '.',
    },
  },

  privacy: {
    title: 'Tietosuojakäytäntö',
    lead: (seller: string, domain: string) =>
      `Mitä tietoja käsitellään, kun selaat sivustoa ${domain} tai tilaat Atlas Pro\u00a0-tilauksen myyjältä ${seller}, miksi niitä käsitellään ja miten voit käyttää oikeuksiasi.`,
    summary: {
      title: 'Lyhyesti',
      items: [
        'Sivustolla ei ole asiakastiliä, lomakkeita eikä maksuja.',
        'Ei evästeitä, mainosseurantaa eikä kävijäanalytiikkaa.',
        'Tilauksesi tehdään WhatsApp-keskustelussa, jonka avaat itse.',
        'Tietojasi käytetään tilauksesi käsittelyyn, koodiesi toimittamiseen ja sinun auttamiseesi.',
      ],
    },
    controller: {
      title: 'Rekisterinpitäjä',
      before: (seller: string) =>
        `Rekisterinpitäjä on sivuston julkaisija ${seller}. Sen täydelliset tunnistetiedot löytyvät `,
      link: 'oikeudellisesta huomautuksesta',
      after: '.',
    },
    notCollected: {
      title: 'Mitä sivusto ei kerää',
      items: [
        'Ei asiakastiliä eikä henkilökohtaista tiliä.',
        'Ei lomakkeita: mitään siitä, mitä luet tai valitset sivustolla, ei välitetä meille.',
        'Ei maksuja sivustolla: pankkikorttitietoja ei pyydetä eikä tallenneta.',
        'Ei evästeitä, ei mainosseurantaa, ei kävijäanalytiikkaa.',
        'Fontit ovat sivuston omalla palvelimella: selaimesi ei ota yhteyttä kolmansien osapuolten palveluihin sivuja näyttäessään.',
      ],
    },
    browsing: {
      title: 'Sivuston selaaminen',
      paragraphs: [
        'Kuten mikä tahansa verkkopalvelin, sivuston palveluntarjoaja voi tallentaa teknisiä yhteystietoja (IP-osoite, päivämäärä ja kellonaika, pyydetty sivu, selaimen tyyppi) sivuston turvallisuuden ja moitteettoman toiminnan varmistamiseksi. Käsittelyperuste: oikeutettu etumme suojata sivustoa.',
      ],
    },
    whatsapp: {
      title: 'Tilaus ja tuki WhatsAppissa',
      intro: [
        'Tilaus-, aktivointi-, uusimis- ja tukipainikkeet avaavat WhatsAppin valmiiksi täytetyllä viestillä. Meille ei välity mitään ennen kuin lähetät viestin.',
        'Kun kirjoitat meille, käsittelemme keskustelussa antamiasi tietoja:',
      ],
      items: [
        'WhatsApp-numerosi ja profiilisi nimi;',
        'valitsemasi paketti, laitteesi ja valitsemasi maksutapa;',
        'sähköpostiosoitteesi Atlas Pro\u00a0-koodisi ja tunnustesi lähettämistä varten;',
        'nykyinen koodisi tai käyttäjätunnuksesi uusimisen yhteydessä;',
        'tuen kannalta tarpeelliset tiedot (laite, sovellus, virheilmoitus, kuvakaappaukset, jotka päätät lähettää).',
      ],
      outro: [
        'Näitä tietoja käytetään tilauksesi käsittelyyn, koodiesi toimittamiseen ja aktivointiin, sinun auttamiseesi ja uusimisten hallintaan. Käsittelyperuste: kanssamme tekemäsi sopimuksen täytäntöönpano (yleisen tietosuoja-asetuksen 6 artiklan 1 kohdan b alakohta).',
        'WhatsApp on kolmannen osapuolen palvelu, johon sovelletaan sen omia käyttöehtoja ja tietosuojakäytäntöä.',
      ],
    },
    payment: {
      title: 'Maksu',
      paragraphs: [
        'Maksu suoritetaan PayPalilla tai SEPA-pankkisiirrolla WhatsApp-keskustelussa annettujen tietojen mukaisesti. Sivustolla ei suoriteta maksuja.',
        'Saamme tapahtuman tiedot: tilinhaltijan nimen, summan, maksun päivämäärän ja viitteen (sekä pankkisiirrossa tapahtumassa näkyvät pankkitiedot). PayPal käsittelee maksutietojasi oman tietosuojakäytäntönsä mukaisesti.',
        'Näitä tietoja käytetään maksusi vahvistamiseen ja kirjanpitovelvoitteidemme täyttämiseen. Käsittelyperuste: sopimuksen täytäntöönpano ja lakisääteiset velvoitteemme.',
      ],
    },
    recipients: {
      title: 'Vastaanottajat',
      team: (seller: string) =>
        `Tietojasi käsittelevät ${seller}\u00a0-tiimi ja palvelun kannalta välttämättömät palveluntarjoajat: WhatsApp (viestintä), PayPal tai pankkisi (maksu) sekä sivuston palveluntarjoaja (tekniset yhteystiedot).`,
      transfers:
        'Jotkin näistä palveluntarjoajista voivat käsitellä tietoja Euroopan unionin ulkopuolella yleisen tietosuoja-asetuksen edellyttämin suojatoimin.',
    },
    retention: {
      title: 'Säilytysajat',
      intro:
        'Säilytämme tietojasi niin kauan kuin edellä kuvattuja tarkoituksia varten on tarpeen, minkä jälkeen poistamme ne, ellei laki velvoita säilyttämään niitä.',
      rows: {
        order: { label: 'Keskustelu ja tilaustiedot', what: 'keskustelujen ja tilaustietojen säilytysaika' },
        accounting: { label: 'Maksut ja kirjanpitoaineisto', what: 'maksutietojen ja kirjanpitoaineiston säilytysaika' },
        logs: { label: 'Tekniset yhteystiedot', what: 'palveluntarjoajan lokitietojen säilytysaika' },
      },
    },
    rights: {
      title: 'Oikeutesi',
      paragraphs: [
        'Yleisen tietosuoja-asetuksen (GDPR) ja Ranskan tietosuojalain (Informatique et Libertés) mukaisesti sinulla on oikeus saada pääsy tietoihisi sekä oikeus tietojesi oikaisemiseen, poistamiseen, käsittelyn rajoittamiseen, käsittelyn vastustamiseen ja siirtämiseen järjestelmästä toiseen.',
        'Voit käyttää näitä oikeuksia kirjoittamalla meille WhatsAppissa tai sähköpostitse (yhteystiedot alla). Vastaamme viimeistään kuukauden kuluessa.',
        'Jos katsot, ettei oikeuksiasi kunnioiteta, voit tehdä valituksen oman maasi tietosuojaviranomaiselle (Ranskassa CNIL).',
      ],
    },
    cookies: {
      title: 'Evästeet',
      paragraphs: [
        'Sivusto ei tallenna evästeitä eikä käytä seurantatekniikoita, joten suostumusbanneria ei tarvita. Jos tämä muuttuu, tämä käytäntö päivitetään ja suostumustasi pyydetään silloin, kun laki sitä edellyttää.',
      ],
    },
    changes: {
      title: 'Muutokset',
      paragraphs: [
        'Voimme päivittää tätä käytäntöä sivuston tai palveluidemme muuttuessa. Viimeisimmän päivityksen päivämäärä näkyy tämän sivun yläosassa.',
      ],
    },
  },

  terms: {
    title: 'Yleiset ehdot & rahat takaisin\u00a0-takuu',
    lead: (seller: string) =>
      `Atlas Pro ONTV:n virallisen valtuutetun jälleenmyyjän ${seller} tarjoamien Atlas Pro\u00a0-tilausten myyntiehdot sekä tyytyväisyystakuumme.`,
    scope: {
      title: 'Soveltamisala',
      text: (seller: string, domain: string) =>
        `Näitä yleisiä ehtoja sovelletaan Atlas Pro\u00a0-tilausten myyntiin, jonka ${seller} tekee asiakkaille, jotka tilaavat sivuston ${domain} kautta tai suoraan WhatsAppissa. Tilauksen tekeminen edellyttää näiden ehtojen hyväksymistä.`,
    },
    seller: {
      title: 'Myyjä',
      before: (seller: string) =>
        `Myyjä on ${seller}, Atlas Pro ONTV:n virallinen valtuutettu jälleenmyyjä. Sen täydelliset yhteystiedot löytyvät `,
      link: 'oikeudellisesta huomautuksesta',
      after: '.',
    },
    service: {
      title: 'Palvelu',
      offer: (v: { months: string; channels: string; films: string; series: string; replayDays: string; replayChannels: string }) =>
        `Atlas Pro\u00a0-tilaus antaa ${v.months} kuukauden ajan pääsyn Atlas Pro ONTV\u00a0-tarjontaan: +${v.channels} suoraa kanavaa, tilausvideokirjasto (+${v.films} elokuvaa ja +${v.series} sarjaa) sekä ${v.replayDays} päivän jälkikatselu +${v.replayChannels} kanavalla.`,
      codes: 'Jokainen paketti sisältää yhden Atlas Pro\u00a0-koodin näyttöä kohden.',
      apps: (apps: string) =>
        `Palvelua käytetään ilmaisilla virallisilla sovelluksillamme (${apps}) tai yhteensopivalla kumppanisoittimella (Xtream Codes\u00a0-tunnukset tai M3U-linkki).`,
      players: (price: string, days: string) =>
        `Jotkin kumppanisoittimet, erityisesti Samsungin ja LG:n Smart TV\u00a0-laitteissa, ovat julkaisijansa maksullisia sovelluksia (noin ${price} vuodessa ${days} päivän ilmaisen kokeilun jälkeen). Tämä kustannus ei sisälly Atlas Pro\u00a0-tilaukseen.`,
      requirements: {
        before: 'Palvelu edellyttää nettiyhteyttä ja yhteensopivaa laitetta. Tutustu ennen tilaamista ',
        install: 'asennusoppaisiimme',
        middle: ' ja ',
        downloads: 'Lataukset-sivuun',
        after: ' tai kysy neuvoa tiimiltämme.',
      },
    },
    plans: {
      title: 'Paketit ja hinnat',
      intro: 'Tarjolla ovat seuraavat paketit:',
      columns: { plan: 'Paketti', duration: 'Kesto', price: 'Hinta' },
      names: { premium: 'Premium 1 Écran', duo: 'Duo 2 Écrans', famille: 'Famille 3 Écrans' },
      months: (months: string) => `${months} kk`,
      pricePending: 'paketin hinta',
      notes: [
        'Hinnat ilmoitetaan euroina. Sovellettava hinta on tilaushetkellä näytetty ja WhatsApp-keskustelussa vahvistettu hinta.',
      ],
      vat: { label: 'ALV', what: 'ALV-merkintä (verollinen hinta tai ”ALV ei sovelleta”)' },
    },
    order: {
      title: 'Tilaus',
      steps: [
        'Valitse paketti ja napsauta sen painiketta: WhatsApp avautuu valmiiksi täytetyllä viestillä. Kaupassa voit myös kertoa laitteesi ja maksutapasi.',
        'Lähetä viesti: tiimimme vahvistaa paketin, hinnan ja maksutiedot.',
        'Tilaus on lopullinen, kun maksusi on vahvistettu.',
      ],
      shop: 'Avaa kauppa',
    },
    payment: {
      title: 'Maksu',
      paragraphs: [
        'Paketin hinta maksetaan PayPalilla tai SEPA-pankkisiirrolla WhatsApp-keskustelussa annettujen tietojen mukaisesti. Sivustolla ei suoriteta korttimaksuja.',
      ],
    },
    delivery: {
      title: 'Toimitus ja aktivointi',
      paragraphs: [
        'Kun maksusi on vahvistettu, virallinen Atlas Pro\u00a0-koodisi (sekä Xtream- / M3U-tunnuksesi) lähetetään sinulle WhatsAppissa ja sähköpostilla. Aukioloaikoinamme lähetys on lähes välitön (yleensä 3–15 minuutissa).',
        'Etkö saanut mitään? Tarkista roskapostikansio ja kirjoita sitten tiimillemme WhatsAppissa: neuvoja toimittaa Atlas Pro\u00a0-koodisi sinulle heti suoraan.',
        'Tiimimme auttaa sinua asennuksessa ja aktivoinnissa laitteellasi.',
      ],
      rows: {
        hours: { label: 'Aukioloajat', what: 'tiimin aukioloajat (koodien lähetys)' },
        start: { label: 'Tilauksen alkaminen', what: 'tilauksen alkamisajankohta (koodin lähetys tai ensimmäinen aktivointi)' },
      },
    },
    renewal: {
      title: 'Kesto ja uusiminen',
      paragraphs: [
        (months: string) =>
          `Tilauksen kesto on ${months} kuukautta. Se ei uusiudu automaattisesti: mitään ei veloiteta ilman pyyntöäsi.`,
        (months: string) =>
          `Uusiaksesi tilauksen ota meihin yhteyttä WhatsAppissa ja kerro nykyinen koodisi tai käyttäjätunnuksesi. Kun maksusi (PayPal tai SEPA) on vahvistettu, tilaustasi jatketaan ${months} kuukaudella muutamassa minuutissa. Jo asennettu sovelluksesi ja suosikkilistasi säilyvät, eikä mitään tarvitse asentaa uudelleen.`,
      ],
    },
    support: {
      title: 'Tuki',
      text: (minutes: string) =>
        `Täysin ranskankielinen asiakastukemme palvelee 7 päivänä viikossa WhatsAppissa ja sähköpostitse: asennusapu, sovellusten lataaminen, kadonneiden koodien palauttaminen ja yhteysongelmien selvittäminen. Vastaamme keskimäärin alle ${minutes} minuutissa, myös iltaisin ja viikonloppuisin.`,
    },
    guarantee: {
      title: 'Tyytyväisyystakuu – rahat takaisin',
      quote: 'Kokeile ilman riskiä – rahat takaisin, jos palvelu ei sovi sinulle.',
      continuity: (months: string) =>
        `Takuu & jatkuva tuki: henkilökohtaista opastusta ja täysi jatkuvuustakuu koko ${months} kuukauden tilauksesi ajan.`,
      how: 'Takuun käyttämiseksi ota yhteyttä tiimiimme WhatsAppissa tai sähköpostitse ja kerro Atlas Pro\u00a0-koodisi tai\u00a0-käyttäjätunnuksesi.',
      rows: {
        window: { label: 'Määräaika pyynnölle', what: 'hyvityspyynnön määräaika' },
        conditions: { label: 'Ehdot', what: 'tyytyväisyystakuun ehdot' },
        amount: { label: 'Hyvitettävä summa', what: 'hyvitettävä summa (kokonaan tai suhteellisesti)' },
        method: { label: 'Hyvitystapa ja\u00a0-aika', what: 'hyvityksen maksutapa ja aikataulu' },
      },
    },
    withdrawal: {
      title: 'Peruuttamisoikeus',
      label: 'Peruuttamisoikeus',
      what: 'peruuttamisoikeus: määräaika, käyttäminen sekä tilanne, jossa koodi toimitetaan suostumuksellasi välittömästi',
    },
    disputes: {
      title: 'Reklamaatiot ja riidat',
      text: 'Jos kohtaat ongelmia, ota ensin yhteyttä tiimiimme WhatsAppissa tai sähköpostitse: etsimme kanssasi sovinnollisen ratkaisun.',
      rows: {
        mediator: { label: 'Kuluttajariitojen sovittelija', what: 'kuluttajariitojen sovittelija (nimi ja yhteystiedot)' },
        law: { label: 'Sovellettava laki ja tuomioistuin', what: 'sovellettava laki ja toimivaltainen tuomioistuin' },
      },
    },
    changes: {
      title: 'Ehtojen muuttaminen',
      text: 'Tilaukseesi sovelletaan tilauspäivänä voimassa olevia ehtoja.',
    },
  },
}
