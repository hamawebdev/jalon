// Finnish copy, home installation hub. Owner: tr-fi. Source: ../fr/install.ts (same keys, same shapes).
// Inline markers (**bold**, `mono`, {wa}, {waShort}, {price}, {trial}, {app:id}, {ver:id}, {pcode:key}, [text](#anchor))
// are kept exactly. {wa} prints « WhatsApp (+33 …) », so it never takes a Finnish case ending: it stands alone.
import type { InstallCopy } from '../fr/install.ts'

export const install: InstallCopy = {
  badge: '✨ Visuaaliset oppaat 2026 · Valtuutettu Atlas Pro ONTV\u00a0-jälleenmyyjä',
  title: 'Atlas Pro ONTV\u00a0-asennus 2026: interaktiiviset vaiheittaiset oppaat & APK-lataus',
  subtitle: (minutes) =>
    `Valitse laite, jolla haluat katsella ohjelmiasi, ja seuraa yksinkertaisia vaiheita. Useimmat tilaajistamme pääsevät katsomaan alle ${minutes} minuutissa.`,
  kpis: {
    fast: { value: (minutes) => `< ${minutes} min`, label: 'Nopea asennus' },
    compat: { value: '100 %', label: 'Toimii kaikilla näytöillä' },
    support: { value: 'Ma–su · 24/7', label: 'Tekninen tuki sisältyy' },
  },

  selector: {
    title: 'Valitse laitteesi',
    hint: 'Laitteesi vaiheittainen opas näkyy heti alla.',
    listLabel: 'Laitteet',
    change: 'Vaihda laitetta',
    current: 'Laitteesi',
    devices: {
      smartTv: { name: 'Smart TV', detail: 'Samsung Tizen, LG webOS, Sony, Philips...' },
      firestick: { name: 'Amazon Firestick', detail: 'Fire TV Stick 4K / Max / Lite / Cube' },
      android: { name: 'Android', detail: 'Puhelin, tabletti, Google TV, TV Box Xiaomi / Mecool' },
      apple: { name: 'iPhone / iPad / Apple TV', detail: 'iOS, iPadOS & tvOS' },
      windows: { name: 'Windows PC', detail: 'Virallinen sovellus & Microsoft Store' },
      mac: { name: 'Mac', detail: 'macOS' },
      linux: { name: 'Linux', detail: 'Virallinen sovellus & soittimet' },
      mag: { name: 'MAG Box & Formuler / Dreamlink', detail: 'MyTVOnline 2 & 3' },
      shield: { name: 'Nvidia Shield', detail: 'Tehokas Android TV' },
    },
  },

  stepLabel: (n) => `Vaihe ${n}`,

  guides: {
    smartTv: {
      kicker: 'Smart TV (Samsung Tizen & LG WebOS)',
      title: 'Kuinka asentaa Atlas Pro ONTV Samsung- & LG-televisioon',
      blocks: [
        {
          kind: 'notice',
          tone: 'info',
          title: '💡 TÄRKEÄ HUOMAUTUS (SAMSUNG- & LG-TV vs. ANDROID TV)',
          body: [
            'Natiivia **Atlas Pro ONTV**\u00a0-sovellusta ei ole suoraan saatavilla Samsungin (Tizen) ja LG:n (WebOS) virallisissa sovelluskaupoissa. Näille televisioille sopivat tehokkaat soittimet (**IBO Player / IBO Player Pro**, **IBO Player Smarter**, **Hot Player**, **Bob Player**) ovat **itsenäisiä maksullisia sovelluksia (noin ~{price} / vuosi {trial} päivän ilmaisen kokeilun jälkeen)**. Ne takaavat välittömän EPG-ohjelmaoppaan, moitteettoman Full HD\u00a0-vakauden (VOD 4K-laadulla) ja elokuvien ja sarjojen jatkamisen täsmälleen siitä sekunnista, mihin jäit. Voit aktivoida ne itsekin, mutta **suosittelemme lämpimästi, että annat teknisen tiimimme hoitaa sekä sovelluksen täydellisen aktivoinnin ETTÄ Atlas Pro\u00a0-tilauksesi lisäämisen samalla kertaa**: lähetä meille vain **MAC Address** ja **Device Key** – {wa} – niin tiimimme hoitaa kaiken alusta loppuun!',
            '(Huom.: Android TV:tä / Google TV:tä käyttävissä Sony-, TCL- ja Xiaomi-televisioissa virallinen Atlas Pro\u00a0-sovellus on 100 % ilmainen Downloaderin kautta.)',
          ],
        },
        {
          kind: 'notice',
          tone: 'warn',
          title: '⚠️ Varoitus: Smarters Pro Smart TV:ssä',
          body: [
            'Emme suosittele vanhan IPTV Smarters Pro\u00a0-version käyttöä Samsung- ja LG-televisioissa (se aiheuttaa palvelimestamme riippumattomia katkoja, jumiutumisia ja valtuutusvirheitä). **Miksi suosia maksullisia soittimia (IBO Player, IBO Player Smarter, Bob Player, Hot Player)?** Niissä on **{trial} päivän ilmainen kokeilu**, moitteeton Full HD\u00a0-vakaus (VOD 4K-laadulla), välittömästi latautuva EPG-ohjelmaopas ja **elokuvien ja sarjojen jatkaminen täsmälleen siitä sekunnista, mihin jäit**.',
          ],
        },
        {
          kind: 'steps',
          title: 'Samsung & LG: asennusvaiheet',
          steps: [
            { text: 'Käynnistä televisio ja avaa virallinen sovelluskauppa (**Samsung Apps** tai **LG Content Store**).' },
            { text: 'Hae ja asenna **IBO Player**, **IBO Player Smarter**, **Hot Player** tai **Bob Player**.' },
            { text: 'Avaa sovellus, niin näet laitteesi **MAC Address**- ja **Device Key**\u00a0-tiedot.' },
            {
              text: 'Lähetä kuva näytöstä meille – {wa} – niin tiimimme aktivoi sovelluksesi ja lisää **Atlas Pro ONTV\u00a0-tilauksesi** etänä alle 2 minuutissa!',
            },
          ],
        },
      ],
    },

    firestick: {
      kicker: 'Amazon Fire TV Stick (4K, 4K Max, Lite, Cube)',
      title: 'Kuinka asentaa Atlas Pro ONTV Amazon Fire TV Stickiin',
      blocks: [
        {
          kind: 'notice',
          tone: 'alert',
          title: '🚨 VIRALLINEN VAROITUS: AMAZON FIRE TV STICK HD, 2. SUKUPOLVI (VEGA OS)',
          body: [
            'Suosittelemme asiakkaillemme painokkaasti, että **Amazon Fire TV Stick HD (2. sukupolvi)\u00a0-mallia ei hankita**. Tämä uusi malli käyttää suljettua **Vega OS**\u00a0-järjestelmää, toisin kuin aiemmat Android / Fire OS\u00a0-versiot:',
          ],
          points: [
            { mark: 'no', text: '**Downloader**-sovellus ei ole saatavilla tälle mallille.' },
            { mark: 'no', text: 'Ulkoisten sovellusten tai **Atlas Pro ONTV APK**\u00a0-tiedostojen asentaminen on estetty.' },
            {
              mark: 'yes',
              text: '**Suositeltu ratkaisu:** Valitse **Fire TV Stick 4K, 4K Max, Lite tai Cube** (Fire OS) tai Android TV\u00a0-boksi (Xiaomi, Mecool, Formuler), joka on 100 % yhteensopiva Downloaderin kanssa.',
            },
          ],
        },
        {
          kind: 'steps',
          title: 'Vaiheet, Downloader-koodit ja aktivointi Fire Stickillä',
          steps: [
            {
              title: 'Asenna Downloader',
              text: 'Valitse Fire TV:n aloitusnäytöltä haku (suurennuslasi), kirjoita **Downloader** ja asenna virallinen oranssi sovellus.',
            },
            {
              title: 'Ota kehittäjäasetukset käyttöön',
              text: 'Siirry kohtaan **Settings > My Fire TV > About** ja napsauta Fire TV Stickisi nimeä **7 kertaa nopeasti**, kunnes näet viestin ”You are now a developer” (”Olet nyt kehittäjä”).',
            },
            {
              title: 'Salli tuntemattomat lähteet',
              text: 'Kohdassa **Developer Options > Install unknown apps** kytke lupa **ON**-asentoon **Downloaderille**.',
            },
            {
              title: 'Syötä Downloader-koodi & aktivoi version mukaan',
              text: 'Avaa **Downloader**, syötä haluamasi virallisen version koodi ja aktivoi käyttöoikeutesi:',
              appCodes: true,
              list: [
                '**Maksulliset soittimet (~{price}/vuosi · {trial} pv kokeilu)** · Bob Player ({pcode:bobPlayer}) · Hot Player ({pcode:hotPlayer}).',
              ],
            },
          ],
        },
      ],
    },

    android: {
      kicker: 'Android: Google TV, Chromecast, Sony- / TCL- / Philips-TV, TV Box Xiaomi / Mecool, puhelimet & tabletit',
      title: 'Kuinka asentaa Atlas Pro ONTV Chromecastiin & Android TV:hen',
      blocks: [
        {
          kind: 'steps',
          steps: [
            {
              text: 'Avaa **Google Play Kauppa** Android TV:ssä, Chromecast with Google TV:ssä tai Android-boksissa ja asenna ilmainen **Downloader**-sovellus.',
            },
            {
              text: 'Salli tuntemattomat lähteet **Downloaderille** kohdassa Asetukset > Suojaus ja rajoitukset (jos kehittäjätila on piilossa, napsauta ensin 7 kertaa Koontiversio-kohtaa Tietoja-valikossa).',
            },
            {
              text: 'Avaa **Downloader** ja kirjoita haluamasi ilmaisen sovelluksen koodi (**{app:ontv}** Code Activella, **{app:max}** käyttäjätunnuksella ja salasanalla (Username/Password), **{app:ibo}** tai **{app:x9}** käyttäjätunnuksella ja salasanalla) – tai napauta puhelimella/tabletilla suoraan [alla olevia APK-latauspainikkeitamme](#apps).',
              appCodes: true,
            },
          ],
        },
        {
          kind: 'notice',
          tone: 'tip',
          title: '📌 Huomio: Xtream / M3U & etätuki',
          body: [
            'Voit käyttää tunnuksiasi myös **Xtream Codes**- tai **M3U**-muodossa missä tahansa soittimessa. Jos et halua tehdä asetuksia itse, lähetä sovelluksesi tiedot meille – {wa} – niin tiimimme määrittää kaiken etänä!',
          ],
        },
      ],
    },

    apple: {
      kicker: 'Apple (iPhone, iPad & Apple TV – iOS, iPadOS & tvOS)',
      title: 'Apple (iPhone, iPad & Apple TV) – Kuinka asentaa Atlas Pro ONTV iOS:ään & tvOS:ään',
      blocks: [
        {
          kind: 'notice',
          tone: 'info',
          title: '📌 Tärkeä huomautus (saatavuus iOS:llä)',
          body: [
            'Virallinen **Atlas Pro**\u00a0-sovellus **EI ole saatavilla iOS:lle eikä tvOS:lle** (se on saatavilla natiivisti Androidille, Windows PC:lle, macOS:lle ja Linuxille). Voit katsella **Atlas Pro ONTV\u00a0-tilaustasi** iPhonella, iPadilla tai Apple TV:llä **kahdella helpolla tavalla**:',
          ],
        },
        {
          kind: 'options',
          items: [
            {
              label: 'Vaihtoehto 1',
              tag: 'Ilmainen',
              title: 'Ilmainen soitin (Smarters Pro IPTV / IPTV Smarters Pro / Smarters Player Lite)',
              text: 'Tunnettu ilmainen sovellus App Storessa. Se vaatii **palvelinlinkin (Server URL) + käyttäjätunnuksen (Username) + salasanan (Password)** **Xtream Codes**\u00a0-muodossa (tai **M3U**-linkin). Pyydä tiimiltämme Xtream- / M3U-tunnuksesi maksutta – {wa} – lataa sovellus App Storesta, syötä tietosi ja nauti tilauksestasi!',
            },
            {
              label: 'Vaihtoehto 2',
              tag: 'Suositeltu',
              recommended: true,
              title: 'Suositellut maksulliset soittimet (IBO Player, IBO Player Smarter, Hot Player, Bob Player)',
              text: 'Miksi suosittelemme niitä lämpimästi Smarters Pron sijaan? Noin **~{price} / vuosi ({trial} päivän ilmaisen kokeilun jälkeen)**\u00a0-hintaan ne takaavat katkottoman katselun iPhonella/iPadilla/Apple TV:llä, salamannopean EPG-ohjelmaoppaan ja **elokuvien ja sarjojen jatkamisen täsmälleen siitä sekunnista, mihin jäit**. Lataa sovellus App Storesta ja lähetä meille sen MAC-osoite + Device Key – {wa} – niin tiimimme voi aktivoida sovelluksen ja lisätä Atlas Pro\u00a0-tilauksesi samalla kertaa!',
              playerLinks: 'ios',
            },
          ],
        },
      ],
    },

    desktop: {
      kicker: 'Kuinka asentaa Atlas Pro PC:lle, Macille ja Linuxille',
      title: 'Windows PC, Mac (macOS) & Linux – virallinen asennus & soittimet',
      blocks: [
        {
          kind: 'options',
          items: [
            {
              label: 'Vaihtoehto A',
              tag: 'Ilmainen',
              recommended: true,
              title: 'Ilmaiset viralliset Atlas Pro\u00a0-sovellukset',
              text: 'Lataa viralliset versiomme **Atlas Pro Windows PC:lle (.EXE)**, **macOS:lle** tai **Linuxille** suoraan alla olevista latauspainikkeista, käynnistä sovellus ja kirjaudu **Atlas Pro\u00a0-koodillasi** (tai tunnuksillasi).',
              desktopDownloads: true,
            },
            {
              label: 'Vaihtoehto B',
              tag: 'Soittimet',
              title: 'Vaihtoehtoiset soittimet Microsoft Storessa & Macilla',
              list: [
                '**Ilmainen (FREE): IPTV Smarters Pro / Expert** (päivitetty tietokoneversio, sujuva ja ilmainen tukemme toimittamilla Xtream Codes\u00a0-tunnuksilla).',
                '**Maksulliset soittimet (~{price} / vuosi · {trial} päivän ilmainen kokeilu): IBO Player / IBO Player Pro**, **IBO Player Smarter**, **Hot Player**, **Vormedia Sat**. (Ei VLC:tä eikä BlueStacksia.)',
              ],
              playerLinks: 'windows',
            },
          ],
        },
      ],
    },

    mag: {
      kicker: 'Formuler / Dreamlink (MyTVOnline 2 & 3) & MAG Box (Infomir)',
      title: 'Kuinka asentaa Atlas Pro ONTV Formuleriin, Dreamlinkiin & MAG Boxiin',
      blocks: [
        { kind: 'subheading', text: 'Formuler / Dreamlink (MyTVOnline 2 & 3)' },
        {
          kind: 'notice',
          tone: 'warn',
          title: '⚠️ Tärkeää',
          body: [
            'Formulerissa ja Dreamlinkissä yhteys muodostetaan **Xtream Codes**\u00a0-tunnuksilla (portaalin URL + käyttäjätunnus + salasana), ei MAC-osoitteella.',
          ],
        },
        {
          kind: 'steps',
          steps: [
            { text: 'Avaa **MyTVOnline 2 tai 3**.' },
            { text: '**Menu > Connections > Add Portal** (Lisää portaali).' },
            { text: 'Nimeä portaali (**Atlas Pro**).' },
            { text: 'Kytke ”**Login Required**” **ON**-asentoon.' },
            { text: 'Syötä tiimimme toimittamat **portaalin URL**, **käyttäjätunnus** ja **salasana** ({waShort}).' },
            { text: 'Valitse **Connect**.' },
          ],
        },
        { kind: 'subheading', text: 'MAG Box (Infomir 254, 256, 322, 520...)' },
        {
          kind: 'steps',
          steps: [
            { text: 'Katso MAC-osoite boksin pohjasta (`00:1A:79:XX:XX:XX`) ja lähetä se tuellemme – {wa}.' },
            { text: 'Saat meiltä aktivoidun **Portal URL**\u00a0-linkin.' },
            { text: 'Siirry kohtaan **Settings > System Settings > Servers > Portals**.' },
            { text: 'Kirjoita ”Atlas Pro” kenttään **Portal 1 Name** ja URL kenttään **Portal 1 URL**.' },
            { text: 'Tallenna (**OK**) ja käynnistä uudelleen.' },
          ],
        },
      ],
    },

    shield: {
      kicker: 'Nvidia Shield TV / Shield Pro',
      title: 'Kuinka asentaa Atlas Pro ONTV Nvidia Shieldiin',
      blocks: [
        {
          kind: 'steps',
          steps: [
            { text: 'Avaa **Google Play Kauppa** Nvidia Shieldissä ja asenna ilmainen **Downloader**.' },
            {
              text: 'Salli tuntemattomat lähteet Downloaderille kohdassa **Asetukset > Laitteen asetukset > Suojaus ja rajoitukset**.',
            },
            {
              text: 'Syötä ilmaisen virallisen sovelluspakettimme Downloader-koodi ({app:ontv}, {app:max}, {app:ibo} tai {app:x9}) tai IBO Player Pron koodi ({pcode:iboPlayerPro}).',
              appCodes: true,
            },
            { text: 'Aktivoi **Atlas Pro\u00a0-koodisi** ja nauti Full HD H.265\u00a0-lähetyksistä ja 4K VOD\u00a0-sisällöstä.' },
          ],
        },
      ],
    },
  },

  desktop: {
    windows: 'Atlas Pro Windowsille (.EXE)',
    mac: 'Atlas Pro macOS:lle',
    linux: 'Atlas Pro Linuxille',
  },
  storeLink: {
    ios: (player) => `${player} App Storessa`,
    windows: (player) => `${player} Windowsille`,
  },

  apps: {
    badge: 'Ilmaiset viralliset sovellukset',
    title: 'Lataa Atlas Pro ONTV APK: 4 ilmaista virallista sovellusta & niiden Downloader-koodit',
    subtitle:
      'Androidille, Google TV:lle, TV-bokseille ja Fire TV Stickille: kirjoita koodi Downloader-sovellukseen tai lataa APK suoraan puhelimellasi tai tabletillasi.',
    free: 'Ilmainen',
    status: {
      latest: 'Uusin virallinen versio',
      new: 'Uusi versio',
      previous: 'Edellinen versio',
    },
    version: (version) => `Versio ${version}`,
    compatible: (versions) => `yhteensopiva: ${versions}`,
    codeLabel: 'Downloader-koodi',
    download: (app) => `Lataa ${app} APK`,
    activationLabel: 'Aktivointitapa',
    activation: {
      code: 'Code Active (Code Atlas Pro)',
      login: 'Käyttäjätunnus + salasana',
    },
    or: 'tai',
    notes: {
      ontv: 'Aktivoituu suoraan Code Activella – linkkiä tai käyttäjätunnusta ei tarvitse syöttää.',
    },
    apkFree: (app) => `${app} APK (ilmainen)`,
    activationBy: 'Aktivointi:',
    copy: 'Kopioi',
    copied: 'Kopioitu!',
    copyAria: (app, code) => `Kopioi sovelluksen ${app} Downloader-koodi ${code}`,
    redundancy: {
      title: '📌 Atlas Pro\u00a0-varmuusvinkki',
      text: 'Suosittelemme pitämään kaikki **4 virallista versiota** asennettuina Android-laitteessasi tai Fire TV Stickissäsi: jos yksi niistä on teknisessä huollossa, muut versiot jatkavat välittömästi ilman minkäänlaista katkosta.',
    },
  },

  questions: {
    title: 'Teknisiä kysymyksiä asennuksesta',
    items: [
      {
        q: 'Syötin tunnukseni, mutta sovellus näyttää virheen (”toistovirhe” tai ”Atlas Pro ei saa yhteyttä palvelimeen”). Mitä teen?',
        a: 'Tarkista ensin **palvelinlinkki (Server URL)**: sen on ehdottomasti alettava **http – ei https**. Tämä yksi kirjain on yleisin virheen syy. Varmista myös, ettei kopioinnin yhteydessä ole tullut mukaan näkymätöntä välilyöntiä ja että käytät oikeaa aktivointitapaa (**Code Active** sovelluksessa {app:ontv} tai **käyttäjätunnus + salasana** sovelluksissa {app:x9} ja Max v{ver:max}). **Edelleen jumissa?** Lähetä meille viesti – {wa} – niin tiimimme tarkistaa **Atlas Pro\u00a0-koodisi** ja määrittää soittimesi puolestasi etänä.',
      },
      {
        q: 'Kuinka nopea nettiyhteys tarvitaan sujuvaan katseluun Atlas Pro ONTV:ssä?',
        a: '**10–20 Mbps** on vähimmäisvaatimus sujuvaan Full HD (H.265)\u00a0-suoratoistoon. Suosittelemme nopeampaa yhteyttä (**30 Mbps tai enemmän**), jos haluat nauttia täysin **Ultra HD 4K**\u00a0-VOD-sisällöistä tai jos kotonasi käytetään useita näyttöjä samanaikaisesti samalla nettiyhteydellä.',
      },
      {
        q: 'Tarvitsenko VPN:n Atlas Pro\u00a0-tilaukseni kanssa?',
        a: '**Ei, se ei ole pakollista** – virallisissa **Atlas Pro ONTV**\u00a0-yhteyksissämme on optimoidut reitit, jotka välttävät internetoperaattorien estot. Jos kuitenkin käytät VPN:ää, **valitse ehdottomasti palvelin omasta maastasi** (tai naapurimaasta), jotta nopeus pysyy maksimissa ja viiveeltä vältytään.',
      },
      {
        q: 'Miksi tarvitsen joillakin laitteilla maksullisen soittimen (~{price} / vuosi)?',
        a: '**Smart TV:ssä (Samsung / LG) tai Apple-laitteessa (iPhone / Apple TV)** maksulliset soittimet (**IBO Player, IBO Player Smarter, Bob Player, Hot Player** – noin **~{price} / vuosi {trial} päivän ilmaisen kokeilun jälkeen**) tarjoavat huomattavasti paremman laitteistosuorituskyvyn, toimivat täysin ilman jumeja ja muistavat, mihin elokuvissa ja sarjoissa jäit. **Androidilla, Google TV:llä, TV-bokseilla, Fire TV Stickillä ja PC:llä** viralliset **Atlas Pro ONTV (v{ver:ontv}, Max v{ver:max}, IBO v{ver:ibo}, 9X)**\u00a0-sovelluksemme taas toimivat loistavasti ja ovat **100 % ilmaisia**.',
      },
    ],
  },

  help: {
    title: 'Jumissa jossain vaiheessa? Määritämme laitteesi yhdessä kanssasi.',
    subtitle:
      'Lähetä viesti tukitiimillemme WhatsAppissa: opastamme sinua vaihe vaiheelta tai aktivoimme Atlas Pro\u00a0-tilauksesi ja soittimesi suoraan etänä.',
    button: 'Hanki apua WhatsAppissa',
  },
}
