// Finnish copy, home FAQ. Owner: tr-fi. Source: ../fr/faq.ts (same ids, same order, same block structure).
// WhatsApp links take a Finnish link text (« WhatsAppissa ») so the printed number follows a correctly inflected word.
import type { Dict } from '../types.ts'
import type { FaqInline, FaqItem, FaqWa } from '../fr/faq.ts'

const b = (text: string): FaqInline => ({ b: text })
const wa = (kind: FaqWa, number = false, text?: string): FaqInline => ({ wa: kind, number, text })

const items: FaqItem[] = [
  {
    id: 'order',
    q: () => 'Kuinka tilaan Atlas Pro ONTV\u00a0-tilauksen virallisesta portaalistamme?',
    a: (v) => [
      {
        p: [
          'Napsauta ”Tilaa nyt”\u00a0-painiketta ',
          { to: 'pricing', text: 'hinnastossamme' },
          ` (Premium ${v.screens.premium} Écran hintaan ${v.price.premium}, Duo ${v.screens.duo} Écrans hintaan ${v.price.duo} tai Famille ${v.screens.famille} Écrans hintaan ${v.price.famille}). Painike avaa suoraan valmiiksi täytetyn keskustelun tiimimme kanssa `,
          wa('activate', true, 'WhatsAppissa'),
          ', jossa tilauksesi vahvistetaan ja aktivoidaan välittömästi.',
        ],
      },
    ],
  },
  {
    id: 'delivery',
    q: () => 'Kuinka nopeasti saan Atlas Pro\u00a0-koodini ja tunnukseni?',
    a: () => [
      {
        p: [
          'Aukioloaikoinamme virallinen ',
          b('Atlas Pro\u00a0-koodisi'),
          ' (sekä Xtream- / M3U-tunnuksesi) lähetetään WhatsAppissa ja sähköpostilla lähes välittömästi maksun vahvistamisen jälkeen (yleensä 3–15 minuutissa).',
        ],
      },
    ],
  },
  {
    id: 'email',
    q: () => 'En saanut sähköpostia luvatussa ajassa – pitäisikö minun huolestua?',
    a: () => [
      {
        p: [
          'Ei, voit olla huoletta. Lähetämme koodeja 7 päivänä viikossa. Jos et löydä viestiä roskapostikansiostakaan, kirjoita tiimillemme ',
          wa('contact', true, 'WhatsAppissa'),
          ': neuvoja toimittaa Atlas Pro\u00a0-koodisi sinulle heti suoraan.',
        ],
      },
    ],
  },
  {
    id: 'otherApps',
    q: () => 'Voinko käyttää Atlas Pro ONTV\u00a0-tilaustani muissa IPTV-sovelluksissa?',
    a: (v) => [
      {
        p: [
          `Kyllä, ehdottomasti! ${v.appCount} ilmaisen virallisen sovelluksemme (`,
          b(`Atlas Pro ONTV ${v.ontv}`),
          ', ',
          b(`Atlas Pro Max v${v.max}`),
          ', ',
          b(`Atlas Pro IBO v${v.ibo}`),
          ', ',
          b('Atlas Pro 9X'),
          ') lisäksi suosittelemme erinomaisia maksullisia soittimia, kuten IBO Player, IBO Player Smarter, Hot Player tai Bob Player, Samsungin/LG:n Smart TV\u00a0-laitteille ja Apple-laitteille, sekä ilmaisia soittimia, kuten IPTV Smarters Pro (Xtream- tai M3U-tunnuksilla).',
        ],
      },
    ],
  },
  {
    id: 'renew',
    q: () => 'Kuinka uusin nykyisen Atlas Pro\u00a0-koodini?',
    a: (v) => [
      {
        p: [
          'Napsauta painiketta ',
          { to: 'renewal', text: '”Uusi täällä (syötä Atlas Pro\u00a0-koodisi)”' },
          ' tai ota meihin yhteyttä suoraan ',
          wa('renewal', false, 'WhatsAppissa'),
          ` ja kerro nykyinen koodisi tai käyttäjätunnuksesi. Kun maksusi (PayPal tai SEPA) on vahvistettu, tilaustasi jatketaan ${v.months} kuukaudella muutamassa minuutissa.`,
        ],
      },
    ],
  },
  {
    id: 'keepFavorites',
    q: () => 'Voinko uusia tilauksen niin, että suosikkini ja nykyinen sovellukseni säilyvät?',
    a: () => [
      {
        p: ['Kyllä! Jo asennettu sovelluksesi ja suosikkilistasi säilyvät, eikä mitään tarvitse asentaa uudelleen.'],
      },
    ],
  },
  {
    id: 'download',
    q: (v) => `Kuinka lataan virallisen Atlas Pro ONTV ${v.ontv} APK\u00a0-sovelluksen ja Atlas Pro Max v${v.max}\u00a0-sovelluksen?`,
    a: () => [
      {
        p: [
          'Siirry yllä olevaan osioon ',
          { to: 'install', text: '”Asennusoppaat & lataukset”' },
          ': napsauta haluamasi version violettia APK-latauspainiketta tai syötä sen virallinen Downloader-koodi TV:n/boksin/Firestickin Downloader-sovellukseen.',
        ],
      },
    ],
  },
  {
    id: 'activation',
    q: (v) =>
      `Mitä eroa on Atlas Pro ONTV ${v.ontv}:n, Atlas Pro Max v${v.max}:n, IBO v${v.ibo}:n ja 9X:n aktivoinnissa?`,
    a: (v) => [
      {
        ul: [
          [b(`Atlas Pro ONTV ${v.ontvLine} (v${v.ontv}):`), ' Aktivoidaan ainoastaan Code Activella (Atlas Pro\u00a0-koodi).'],
          [
            b(`Atlas Pro Max (versio ${v.max}):`),
            ' Aktivoidaan joko Code Activella TAI käyttäjätunnuksella (Username) + salasanalla (Password).',
          ],
          [b(`Atlas Pro IBO (versio ${v.ibo}):`), ' Aktivoidaan Code Activella.'],
          [b('Atlas Pro 9X:'), ' Aktivoidaan käyttäjätunnuksella (Username) + salasanalla (Password).'],
        ],
      },
      {
        note: [
          b('Huomio:'),
          ' älä osta Fire TV Stick HD:n 2. sukupolven mallia, joka käyttää suljettua Vega OS\u00a0-järjestelmää, sillä se estää Downloader-sovelluksen.',
        ],
      },
    ],
  },
  {
    id: 'replace',
    q: () => 'Mikä korvaa Atlas Pro ON TV:n vuonna 2026?',
    a: (v) => [
      {
        p: [
          `Mikään ei korvaa alkuperäistä: vuonna 2026 Atlas Pro ONTV on uudistanut itsensä omalla uuden sukupolven virallisella sovelluspaketillaan (Atlas Pro ONTV v${v.ontv}, Atlas Pro Max v${v.max}, Atlas Pro IBO v${v.ibo} ja Atlas Pro 9X), jota pyörittää uusi eurooppalainen, katkoja ehkäisevä palvelinarkkitehtuuri ${v.uptime} %:n käytettävyydellä.`,
        ],
      },
    ],
  },
  {
    id: 'countries',
    q: () => 'Toimiiko Atlas Pro ONTV\u00a0-tilaus Ranskassa, Belgiassa, Sveitsissä, Kanadassa ja ulkomailla?',
    a: () => [
      {
        p: [
          'Kyllä, palvelumme toimii kaikkialla maailmassa, kunhan käytössäsi on vakaa nettiyhteys (Ranska, Belgia, Sveitsi, Kanada, Eurooppa, Yhdysvallat, Pohjois-Afrikka jne.), eikä VPN:ää tarvita.',
        ],
      },
    ],
  },
  {
    id: 'screens',
    q: () => 'Voinko käyttää tilaustani useilla näytöillä samanaikaisesti?',
    a: (v) => [
      {
        p: [
          `Premium-paketti (${v.price.premium}) sisältää ${v.screens.premium} aktiivisen näytön. Jos haluat katsella ohjelmia perheen kesken useilla näytöillä yhtä aikaa, valitse suoraan `,
          { to: 'pricing', text: `Duo ${v.screens.duo} Écrans\u00a0-pakettimme` },
          ` (${v.price.duo} / ${v.months} kk) tai `,
          { to: 'pricing', text: `Famille ${v.screens.famille} Écrans\u00a0-pakettimme` },
          ` (${v.price.famille} / ${v.months} kk), joilla saat ${v.screens.duo} tai ${v.screens.famille} toisistaan riippumatonta virallista koodia!`,
        ],
      },
    ],
  },
  {
    id: 'oldTv',
    q: () => 'Minulla on vanha televisio (ei Smart TV). Mitä ratkaisua suosittelette?',
    a: () => [
      {
        p: [
          'Liitä television HDMI-porttiin sertifioitu Android TV\u00a0-boksi (Xiaomi Mi Box, Mecool, Formuler) tai Amazon Fire TV Stick 4K / 4K Max (Fire OS), niin televisiostasi tulee salamannopea Smart TV, joka on yhteensopiva kaikkien ilmaisten sovellustemme kanssa.',
        ],
      },
    ],
  },
  {
    id: 'trust',
    q: () => 'Miksi luottaa viralliseen portaaliimme valtuutettuna jälleenmyyjänä?',
    a: (v) => [
      {
        p: [
          `Olemme Ranskan ja Euroopan johtava valtuutettu portaali: yli ${v.customers} tyytyväistä asiakasta, 100 % virallisia koodeja ${v.months} kuukauden takuulla, ei korttiveloituksia sivustolla (turvallinen maksu PayPalilla tai SEPA-tilisiirrolla), tyytyväisyystakuu tai rahat takaisin sekä inhimillinen tekninen tuki, joka vastaa alle ${v.supportMinutes} minuutissa `,
          wa('contact', false, 'WhatsAppissa'),
          '.',
        ],
      },
    ],
  },
  {
    id: 'samsungLg',
    q: (v) => `Miksi Samsung- tai LG-televisioni sovellus on maksullinen (~${v.playerPrice}) ja kuinka aktivoin sen?`,
    a: (v) => [
      {
        p: [
          `Koska virallista Atlas Pro\u00a0-sovellusta ei ole Samsungin ja LG:n suljetuissa sovelluskaupoissa, on käytettävä kumppanisoitinta (IBO Player, IBO Player Smarter, Hot Player, Bob Player), joka maksaa noin ${v.playerPrice} / vuosi (${v.trialDays} päivän ilmaisen kokeilun jälkeen). Nämä soittimet tarjoavat moitteettoman vakauden, välittömän EPG-oppaan ja VOD-sisällön jatkamisen täsmälleen siitä sekunnista, mihin jäit.`,
        ],
      },
      {
        p: [
          'Helpottaaksemme elämääsi tiimimme voi aktivoida soittimen puolestasi ja lisätä siihen samalla Atlas Pro\u00a0-tilauksesi: lähetä meille vain MAC-osoitteesi ja Device Key ',
          wa('help', true, 'WhatsAppissa'),
          '!',
        ],
      },
    ],
  },
  {
    id: 'content',
    q: () => 'Mitä sisältöjä ja kanavia Atlas Pro 2026\u00a0-tilaukseen sisältyy?',
    a: (v) => [
      {
        p: [
          `Tilaukseesi sisältyy +${v.channels} suoraa kanavaa (Ranska, Eurooppa, kansainväliset, joista +${v.sportsChannels} premium-urheilukanavaa Full HD H.265\u00a0-laadulla), +${v.films} elokuvaa ja +${v.series} sarjaa (${v.episodes} jaksoa) 4K- ja Full HD\u00a0-laadulla päivittäin päivittyvänä sekä jälkikatselu ${v.replayDays} päivän ajalta +${v.replayChannels} kanavalla.`,
        ],
      },
    ],
  },
  {
    id: 'connect',
    q: () =>
      'Kuinka korjaan ongelman ”Atlas Pro ei saa yhteyttä palvelimeen”, ”Atlas Pro ON TV toistovirhe” tai ”Miksi Atlas Pro TV ei enää toimi”?',
    a: (v) => [
      {
        cards: [
          [
            b('Tapaus 1 – Virallinen Atlas Pro\u00a0-sovellus (Android / TV-boksi):'),
            ' Viestit ”Atlas Pro ei saa yhteyttä palvelimeen” tai ”toistovirhe” näkyvät yleensä, kun käytössä on sovelluksen vanha versio, kyseessä on tilapäinen bugi tai liian vanha Android-järjestelmä ei ole yhteensopiva (sovelluksemme on optimoitu Google TV\u00a0-televisioille, älypuhelimille ja TV-bokseille, joissa on uusi Android-versio). ',
            b('Ratkaisu:'),
            ` Syötä tietosi uudelleen, tyhjennä sovelluksen välimuisti laitteesi asetuksista ja kirjaudu uudelleen sisään tai asenna uusin virallinen päivitys (Atlas Pro ONTV ${v.ontv} tai Atlas Pro Max v${v.max}).`,
          ],
          [
            b('Tapaus 2 – Viesti ”Soittolista ei toimi” IBO Playerissa, Hot Playerissa, Bob Playerissa tai IBO Smarterissa:'),
            ' Näissä soittimissa virhe tarkoittaa useimmiten, että jaettu palvelinlinkki (URL) on päivitettävä. Riittää, että muokkaat linkkiä tai päivität palvelimen tiedot. ',
            b('Välitön ratkaisu:'),
            ' Ota yhteyttä tukitiimiimme ',
            wa('contact', true, 'WhatsAppissa'),
            ' – teknikkomme päivittävät linkkisi ja palauttavat soittolistasi etänä muutamassa sekunnissa!',
          ],
        ],
      },
    ],
  },
  {
    id: 'apple',
    q: () => 'Kuinka Atlas Pro toimii iPhonella, iPadilla tai Apple TV:llä (ilmainen vs. maksullinen)?',
    a: (v) => [
      {
        p: [
          'Koska natiivi Atlas Pro\u00a0-sovellus (ja Atlas Pro Prime) ei ole saatavilla iOS:lle/tvOS:lle, App Storessa on kaksi vaihtoehtoa:',
        ],
      },
      {
        ol: [
          [
            b('Ilmainen:'),
            ' Lataa Smarters Pro IPTV (Smarters Player Lite) ja pyydä tiimiltämme ',
            wa('help', false, 'WhatsAppissa'),
            ' Xtream-tunnuksesi (URL + Username + Password) tai M3U-linkkisi.',
          ],
          [
            b(`Suositeltu maksullinen (~${v.playerPrice} / vuosi):`),
            ' Lataa IBO Player, Hot Player, IBO Player Smarter tai Bob Player, niin saat parhaan mahdollisen sujuvuuden ja VOD-sisällön jatkamisen siitä, mihin jäit.',
          ],
        ],
      },
    ],
  },
  {
    id: 'smarters',
    q: () =>
      'TIEDOTE LG- & SAMSUNG-KÄYTTÄJILLE: Smarters-sovellus näyttää virheen ”Failed to authorize”. Mitä teen?',
    a: () => [
      {
        p: [
          'Smartersin vanhassa versiossa Samsung- ja LG-televisioille esiintyy säännöllisesti palvelimistamme riippumattomia bugeja (”Failed to authorize”). Lataa uusin Smarters Pro\u00a0-päivitys sovelluskaupastasi tai siirry IBO Playeriin / Hot Playeriin / Bob Playeriin tiimimme avulla ',
          wa('help', true, 'WhatsAppissa'),
          ', niin vakaus on pysyvästi kunnossa.',
        ],
      },
    ],
  },
  {
    id: 'serverLink',
    q: () => 'Palvelinlinkki tai koodini ei toimi, kun syötän tietoni. Miksi?',
    a: () => [
      {
        p: [
          'Varmista ensin, että URL alkaa ',
          { code: 'http://' },
          ' (ilman s-kirjainta). Taataksemme mahdollisimman hyvän tietoturvan ja vakauden Ranskassa ja Euroopassa päivitämme yksityisiä palvelinyhteyksiämme säännöllisesti. Ota yhteyttä tukeemme ',
          wa('help', true, 'WhatsAppissa'),
          ', niin saat päivitetyt asetuksesi heti tai tiimimme voi määrittää näyttösi puolestasi.',
        ],
      },
    ],
  },
  {
    id: 'enterCode',
    q: () => 'Kuinka syötän Atlas Pro\u00a0-koodin ja mistä löydän Atlas Pro\u00a0-käyttäjätunnukseni?',
    a: (v) => [
      {
        p: [
          'Saat Atlas Pro\u00a0-koodisi ja Atlas Pro\u00a0-käyttäjätunnuksesi suoraan WhatsAppissa ja sähköpostilla heti, kun tilauksesi on vahvistettu virallisessa portaalissamme.',
        ],
      },
      {
        p: [
          b('Kuinka syötän Atlas Pro\u00a0-koodin?'),
          ` Avaa Atlas Pro ONTV ${v.ontv}\u00a0-sovellus (tai IBO v${v.ibo}), kirjoita koodisi sille varattuun kenttään (”Code Active”) ja vahvista. Atlas Pro Max v${v.max}- tai Atlas Pro 9X\u00a0-versioissa voit kirjautua suoraan käyttäjätunnuksellasi (Username) ja salasanallasi (Password).`,
        ],
      },
    ],
  },
  {
    id: 'changeCode',
    q: () => 'Kuinka vaihdan koodin Atlas Pro ONTV:ssä?',
    a: () => [
      {
        p: [
          'Kun haluat vaihtaa koodin Atlas Pro ONTV:ssä (esimerkiksi uuden tilauksen tai paketin vaihdon yhteydessä), siirry sovelluksen aloitusnäyttöön ja valitse ',
          b('Kirjaudu ulos / Vaihda käyttäjää'),
          ' tai avaa Android-laitteesi asetukset (',
          b('Sovellukset > Atlas Pro ONTV > Tyhjennä tiedot ja välimuisti'),
          '). Käynnistä sovellus sitten uudelleen ja syötä uusi Atlas Pro\u00a0-koodisi.',
        ],
      },
    ],
  },
  {
    id: 'installTv',
    q: () => 'Kuinka asennan Atlas Pron televisioon (Samsung, LG, TCL, Sony) ja kuinka saan Atlas Pron TV:hen?',
    a: (v) => [
      {
        p: [
          'Mietitkö, kuinka saat Atlas Pron televisioosi tai kuinka asennat Atlas Pron TV:hen? Tapa riippuu television merkistä:',
        ],
      },
      {
        ul: [
          [
            b('Atlas Pron asennus TCL-, Sony-, Philips- tai Xiaomi-televisioon (Android TV / Google TV):'),
            ' Asenna ilmainen Downloader-sovellus Google Play Kaupasta ja syötä ',
            { to: 'apps', text: 'Downloader-koodimme' },
            `, niin voit ladata Atlas Pro ONTV ${v.ontv} APK:n ilmaiseksi.`,
          ],
          [
            b('Atlas Pron asennus Samsung-televisioon ja Atlas Pro ONTV:n asennus LG-televisioon:'),
            ' Avaa television virallinen sovelluskauppa, asenna IBO Player, Hot Player, Bob Player tai IBO Smarter Player ja lähetä MAC-osoitteesi ja Device Key tiimillemme ',
            wa('help', true, 'WhatsAppissa'),
            ', niin se aktivoi näyttösi etänä 2 minuutissa.',
          ],
        ],
      },
    ],
  },
  {
    id: 'fireTv',
    q: () => 'Kuinka asennan Atlas Pron Fire TV:hen ja Atlas Pro ONTV:n Chromecastiin ja iPadiin?',
    a: (v) => [
      {
        ul: [
          [
            b('Atlas Pron asennus Fire TV:hen ja Atlas Pro ONTV:n asennus Chromecastiin:'),
            ' Lataa Downloader-sovellus Amazon Fire TV Stickiin (4K, Max, Lite) tai Chromecast with Google TV:hen, salli tuntemattomat lähteet ja syötä ilmaisen sovelluspakettimme ',
            { to: 'apps', text: 'latauskoodi' },
            ` (Atlas Pro ONTV ${v.ontv}, Max v${v.max}, IBO v${v.ibo} tai 9X).`,
          ],
          [
            b('Atlas Pron asennus iPadiin ja iPhoneen:'),
            ' Siirry App Storeen, lataa ilmainen soitin (Smarters Pro IPTV) tai tehokas soitin (IBO Player, Hot Player, Bob Player) ja ota yhteyttä ',
            wa('help', false, 'WhatsApp-tukeemme'),
            ', niin saat Xtream- / M3U-tunnuksesi tai laitteesi aktivoidaan.',
          ],
        ],
      },
    ],
  },
  {
    id: 'cast',
    q: () => 'Kuinka suoratoistan (castaan) Atlas Pro ONTV:n televisiooni?',
    a: () => [
      {
        p: [
          'Kun haluat suoratoistaa Atlas Pro ONTV:n älypuhelimesta tai tabletista televisioon, varmista, että molemmat laitteet ovat samassa Wi-Fi-verkossa, ja käytä sitten suoratoisto- / näytön jakotoimintoa (Chromecast tai AirPlay). Parhaan sujuvuuden Full HD H.265\u00a0- ja 4K-laadulla ilman viivettä saat kuitenkin asentamalla sovelluksen suoraan Smart TV:hen, Fire TV Stickiin, Chromecast with Google TV:hen tai Android-boksiin.',
        ],
      },
    ],
  },
]

export const faq: Dict['faq'] = {
  badge: 'APUA, TUKI & VIRALLINEN UKK',
  title: 'Usein kysytyt kysymykset – ATLAS PRO ONTV',
  titleHighlight: 'ATLAS PRO ONTV',
  subtitle:
    'Kaikki, mitä sinun tarvitsee tietää ennen Atlas Pro ONTV\u00a0-tilauksesi tekemistä virallisessa portaalissamme, sen aikana ja sen jälkeen.',
  help: {
    title: 'Etkö löydä vastausta?',
    text: (minutes: string) =>
      `Inhimillinen tekninen tukemme vastaa sinulle alle ${minutes} minuutissa WhatsAppissa 7 päivänä viikossa.`,
    button: 'Kirjoita WhatsApp-tukeen',
  },
  whatsapp: 'WhatsApp',
  items,
}
