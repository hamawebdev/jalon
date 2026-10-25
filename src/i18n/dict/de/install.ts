// German copy, home installation hub. Translation of ../fr/install.ts (same keys, same blocks and steps).
// Owner: tr-de. Inline markers (**bold**, `code`, {wa}, {waShort}, {price}, {trial}, {app:…}, {ver:…}, {pcode:…},
// [text](#anchor)) are kept exactly as in the French.
import type { InstallCopy } from '../fr/install.ts'

export const install: InstallCopy = {
  badge: '✨ Visuelle Anleitungen 2026 · Autorisierter Atlas Pro ONTV Vertriebspartner',
  title: 'Atlas Pro ONTV installieren 2026: Interaktive Schritt-für-Schritt-Anleitungen & APK-Download',
  subtitle: (minutes) =>
    `Wählen Sie das Gerät, auf dem Sie Ihre Programme sehen möchten, und folgen Sie dann den einfachen Schritten. Die meisten unserer Abonnenten sind in weniger als ${minutes} Minuten startklar.`,
  kpis: {
    fast: { value: (minutes) => `< ${minutes} Min.`, label: 'Schnelle Installation' },
    compat: { value: '100 %', label: 'Kompatibel mit allen Bildschirmen' },
    support: { value: '7 Tage · 24/7', label: 'Technischer Support inklusive' },
  },

  selector: {
    title: 'Wählen Sie Ihr Gerät',
    hint: 'Die Schritt-für-Schritt-Anleitung für Ihr Gerät erscheint direkt darunter.',
    listLabel: 'Geräte',
    change: 'Gerät wechseln',
    current: 'Ihr Gerät',
    devices: {
      smartTv: { name: 'Smart TV', detail: 'Samsung Tizen, LG webOS, Sony, Philips …' },
      firestick: { name: 'Amazon Firestick', detail: 'Fire TV Stick 4K / Max / Lite / Cube' },
      android: { name: 'Android', detail: 'Smartphone, Tablet, Google TV, TV-Box Xiaomi / Mecool' },
      apple: { name: 'iPhone / iPad / Apple TV', detail: 'iOS, iPadOS & tvOS' },
      windows: { name: 'Windows-PC', detail: 'Offizielle App & Microsoft Store' },
      mac: { name: 'Mac', detail: 'macOS' },
      linux: { name: 'Linux', detail: 'Offizielle App & Player' },
      mag: { name: 'MAG Box & Formuler / Dreamlink', detail: 'MyTVOnline 2 & 3' },
      shield: { name: 'Nvidia Shield', detail: 'Hochleistungs-Android-TV' },
    },
  },

  stepLabel: (n) => `Schritt ${n}`,

  guides: {
    smartTv: {
      kicker: 'Smart TV (Samsung Tizen & LG WebOS)',
      title: 'So installieren Sie Atlas Pro ONTV auf Samsung & LG TV',
      blocks: [
        {
          kind: 'notice',
          tone: 'info',
          title: '💡 WICHTIGER HINWEIS (SAMSUNG & LG TV vs. ANDROID TV)',
          body: [
            'Die native App **Atlas Pro ONTV** ist in den offiziellen Stores von Samsung (Tizen) und LG (WebOS) nicht direkt verfügbar. Die kompatiblen Hochleistungs-Player für diese Fernseher (**IBO Player / IBO Player Pro**, **IBO Player Smarter**, **Hot Player**, **Bob Player**) sind **unabhängige, kostenpflichtige Apps (~{price} / Jahr nach {trial} Tagen kostenloser Testphase)**. Sie bieten einen sofort geladenen EPG, einwandfreie Stabilität in Full HD (4K bei VOD) und setzen Filme und Serien genau an der Sekunde fort, an der Sie aufgehört haben. Sie können sie zwar selbst aktivieren, **wir empfehlen Ihnen jedoch dringend, unserem Technikteam die vollständige Aktivierung der App UND gleichzeitig das Einspielen Ihres Atlas Pro Abos zu überlassen**: Senden Sie uns einfach Ihre **MAC Address** und Ihren **Device Key** per {wa} – unser Team kümmert sich um alles, von A bis Z!',
            '(Hinweis: Für Sony-, TCL- und Xiaomi-Fernseher mit Android TV / Google TV ist die offizielle Atlas Pro App über Downloader zu 100 % kostenlos.)',
          ],
        },
        {
          kind: 'notice',
          tone: 'warn',
          title: '⚠️ Warnung zu Smarters Pro auf Smart TVs',
          body: [
            'Wir raten von der alten Version von IPTV Smarters Pro auf Samsung und LG TVs ab (sie verursacht Aussetzer, Hänger und Autorisierungsfehler, die nichts mit unserem Server zu tun haben). **Warum sollten Sie die kostenpflichtigen Player (IBO Player, IBO Player Smarter, Bob Player, Hot Player) bevorzugen?** Sie bieten **{trial} Tage kostenlose Testphase**, einwandfreie Stabilität in Full HD (4K bei VOD), einen sofort geladenen EPG und **setzen Ihre Filme und Serien genau an der Sekunde fort, an der Sie aufgehört haben**.',
          ],
        },
        {
          kind: 'steps',
          title: 'Samsung & LG: Installationsschritte',
          steps: [
            { text: 'Schalten Sie Ihren Fernseher ein und öffnen Sie den offiziellen Store (**Samsung Apps** oder **LG Content Store**).' },
            { text: 'Suchen und installieren Sie **IBO Player**, **IBO Player Smarter**, **Hot Player** oder **Bob Player**.' },
            { text: 'Öffnen Sie die App, um Ihre **MAC Address** und Ihren **Device Key** anzuzeigen.' },
            {
              text: 'Senden Sie ein Foto Ihres Bildschirms an unseren {wa}: Unser Team aktiviert Ihre App und spielt Ihr **Atlas Pro ONTV Abo** in weniger als 2 Minuten aus der Ferne ein!',
            },
          ],
        },
      ],
    },

    firestick: {
      kicker: 'Amazon Fire TV Stick (4K, 4K Max, Lite, Cube)',
      title: 'So installieren Sie Atlas Pro ONTV auf dem Amazon Fire TV Stick',
      blocks: [
        {
          kind: 'notice',
          tone: 'alert',
          title: '🚨 OFFIZIELLE WARNUNG ZUM AMAZON FIRE TV STICK HD DER 2. GENERATION (VEGA OS)',
          body: [
            'Wir empfehlen unseren Kunden dringend, **das Modell Amazon Fire TV Stick HD (2. Generation) nicht zu kaufen**. Dieses neue Modell läuft mit dem geschlossenen System **Vega OS** – anders als die Vorgängerversionen mit Android / Fire OS:',
          ],
          points: [
            { mark: 'no', text: 'Die App **Downloader** ist auf diesem Modell nicht verfügbar.' },
            { mark: 'no', text: 'Die Installation externer Apps oder von **Atlas Pro ONTV APK**-Dateien ist gesperrt.' },
            {
              mark: 'yes',
              text: '**Empfohlene Lösung:** Wählen Sie einen **Fire TV Stick 4K, 4K Max, Lite oder Cube** (mit Fire OS) oder eine Android-TV-Box (Xiaomi, Mecool, Formuler), die zu 100 % mit Downloader kompatibel ist.',
            },
          ],
        },
        {
          kind: 'steps',
          title: 'Schritte, Downloader-Codes und Aktivierung auf dem Fire Stick',
          steps: [
            {
              title: 'Downloader installieren',
              text: 'Gehen Sie auf dem Fire-TV-Startbildschirm zu Suchen (Lupe), tippen Sie **Downloader** ein und installieren Sie die offizielle orangefarbene App.',
            },
            {
              title: 'Entwickleroptionen aktivieren',
              text: 'Gehen Sie zu **Einstellungen > Mein Fire TV > Info** und klicken Sie dann **7-mal schnell hintereinander** auf den Namen Ihres Fire TV Sticks, bis die Meldung „Sie sind jetzt Entwickler“ erscheint.',
            },
            {
              title: 'Unbekannte Quellen zulassen',
              text: 'Stellen Sie unter **Entwickleroptionen > Unbekannte Apps installieren** die Berechtigung für **Downloader** auf **AN**.',
            },
            {
              title: 'Downloader-Code eingeben & je nach Version aktivieren',
              text: 'Öffnen Sie **Downloader**, geben Sie den Code der gewünschten offiziellen Version ein und aktivieren Sie Ihren Zugang:',
              appCodes: true,
              list: [
                '**Kostenpflichtige Player (~{price}/Jahr · {trial} Tage Testphase)** · Bob Player ({pcode:bobPlayer}) · Hot Player ({pcode:hotPlayer}).',
              ],
            },
          ],
        },
      ],
    },

    android: {
      kicker: 'Android: Google TV, Chromecast, Sony- / TCL- / Philips-TV, TV-Box Xiaomi / Mecool, Smartphones & Tablets',
      title: 'So installieren Sie Atlas Pro ONTV auf Chromecast & Android TV',
      blocks: [
        {
          kind: 'steps',
          steps: [
            {
              text: 'Öffnen Sie den **Google Play Store** auf Ihrem Android TV, Chromecast mit Google TV oder Ihrer Android-Box und installieren Sie kostenlos die App **Downloader**.',
            },
            {
              text: 'Erlauben Sie unbekannte Quellen für **Downloader** unter Einstellungen > Sicherheit & Einschränkungen (tippen Sie vorher unter Info 7-mal auf Build-Nummer, falls der Entwicklermodus ausgeblendet ist).',
            },
            {
              text: 'Öffnen Sie **Downloader** und geben Sie den Code der gewünschten kostenlosen App ein (**{app:ontv}** per Code Active, **{app:max}** per Username/Password, **{app:ibo}** oder **{app:x9}** per Username/Password) – oder tippen Sie auf dem Smartphone/Tablet direkt auf unsere [APK-Download-Buttons weiter unten](#apps).',
              appCodes: true,
            },
          ],
        },
        {
          kind: 'notice',
          tone: 'tip',
          title: '📌 Hinweis zu Xtream / M3U & Fernhilfe',
          body: [
            'Sie können Ihre Zugangsdaten auch im Format **Xtream Codes** oder **M3U** in jedem beliebigen Player verwenden. Wenn Sie die Einrichtung nicht selbst vornehmen möchten, senden Sie einfach die Daten Ihrer App per {wa} – unser Team richtet alles aus der Ferne ein!',
          ],
        },
      ],
    },

    apple: {
      kicker: 'Apple (iPhone, iPad & Apple TV — iOS, iPadOS & tvOS)',
      title: 'Apple (iPhone, iPad & Apple TV) — So installieren Sie Atlas Pro ONTV auf iOS & tvOS',
      blocks: [
        {
          kind: 'notice',
          tone: 'info',
          title: '📌 Wichtiger Hinweis (Verfügbarkeit auf iOS)',
          body: [
            'Die offizielle **Atlas Pro** App ist **NICHT für iOS oder tvOS verfügbar** (nativ gibt es sie für Android, Windows-PC, macOS und Linux). Um Ihr **Atlas Pro ONTV Abo** auf iPhone, iPad oder Apple TV zu sehen, **stehen Ihnen zwei einfache Wege offen**:',
          ],
        },
        {
          kind: 'options',
          items: [
            {
              label: 'Option 1',
              tag: 'Kostenlos',
              title: 'Kostenloser Player (Smarters Pro IPTV / IPTV Smarters Pro / Smarters Player Lite)',
              text: 'Eine sehr bekannte kostenlose App im App Store. Sie benötigt einen **Server-Link (Server URL) + Benutzernamen (Username) + Passwort (Password)** im Format **Xtream Codes** (oder einen **M3U**-Link). Kontaktieren Sie einfach unser Team per {wa}, um Ihre Xtream- / M3U-Zugangsdaten kostenlos zu erhalten, laden Sie die App aus dem App Store, geben Sie Ihre Daten ein und genießen Sie Ihr Abo!',
            },
            {
              label: 'Option 2',
              tag: 'Empfohlen',
              recommended: true,
              title: 'Empfohlene kostenpflichtige Player (IBO Player, IBO Player Smarter, Hot Player, Bob Player)',
              text: 'Warum empfehlen wir sie gegenüber Smarters Pro so nachdrücklich? Für **~{price} / Jahr (nach {trial} Tagen kostenloser Testphase)** garantieren sie null Aussetzer auf iPhone/iPad/Apple TV, einen ultraschnellen EPG und **setzen Ihre Filme und Serien genau an der Sekunde fort, an der Sie aufgehört haben**. Laden Sie die App aus dem App Store und senden Sie uns ihre MAC-Adresse + Device Key per {wa}: Unser Team kann die App direkt aktivieren und gleichzeitig Ihr Atlas Pro Abo einspielen!',
              playerLinks: 'ios',
            },
          ],
        },
      ],
    },

    desktop: {
      kicker: 'So installieren Sie Atlas Pro auf PC, Mac und Linux',
      title: 'Computer mit Windows, Mac (macOS) & Linux — Offizielle Installation & Player',
      blocks: [
        {
          kind: 'options',
          items: [
            {
              label: 'Option A',
              tag: 'Kostenlos',
              recommended: true,
              title: 'Kostenlose offizielle Atlas Pro Apps',
              text: 'Laden Sie unsere eigenen offiziellen Versionen **Atlas Pro für Windows-PC (.EXE)**, **macOS** oder **Linux** über die Download-Buttons unten direkt herunter, starten Sie die App und melden Sie sich mit Ihrem **Atlas Pro Code** (oder Ihren Zugangsdaten) an.',
              desktopDownloads: true,
            },
            {
              label: 'Option B',
              tag: 'Player',
              title: 'Alternative Player im Microsoft Store & für Mac',
              list: [
                '**Kostenlos (FREE): IPTV Smarters Pro / Expert** (aktualisierte Computerversion, flüssig und kostenlos – mit den Xtream-Codes-Zugangsdaten, die Sie von unserem Support erhalten).',
                '**Kostenpflichtige Player (~{price} / Jahr · {trial} Tage kostenlose Testphase): IBO Player / IBO Player Pro**, **IBO Player Smarter**, **Hot Player**, **Vormedia Sat**. (Keine Nutzung von VLC oder BlueStacks.)',
              ],
              playerLinks: 'windows',
            },
          ],
        },
      ],
    },

    mag: {
      kicker: 'Formuler / Dreamlink (MyTVOnline 2 & 3) & MAG Box (Infomir)',
      title: 'So installieren Sie Atlas Pro ONTV auf Formuler, Dreamlink & MAG Box',
      blocks: [
        { kind: 'subheading', text: 'Formuler / Dreamlink (MyTVOnline 2 & 3)' },
        {
          kind: 'notice',
          tone: 'warn',
          title: '⚠️ Wichtig',
          body: [
            'Auf Formuler und Dreamlink erfolgt die Verbindung mit Ihren **Xtream Codes**-Zugangsdaten (Portal-URL + Benutzername + Passwort) und nicht über die MAC-Adresse.',
          ],
        },
        {
          kind: 'steps',
          steps: [
            { text: '**MyTVOnline 2 oder 3** öffnen.' },
            { text: '**Menu > Connections > Add Portal** (Portal hinzufügen).' },
            { text: 'Dem Portal einen Namen geben (**Atlas Pro**).' },
            { text: '„**Login Required**“ auf **ON** stellen.' },
            { text: '**Portal-URL**, **Benutzername** und **Passwort** eingeben, die Sie von unserem Team per {waShort} erhalten haben.' },
            { text: 'Auf **Connect** klicken.' },
          ],
        },
        { kind: 'subheading', text: 'MAG Box (Infomir 254, 256, 322, 520 …)' },
        {
          kind: 'steps',
          steps: [
            { text: 'Die MAC-Adresse auf der Rückseite der Box ablesen (`00:1A:79:XX:XX:XX`) und an unseren Support senden: {wa}.' },
            { text: 'Unseren aktivierten **Portal URL**-Link erhalten.' },
            { text: 'Zu **Settings > System Settings > Servers > Portals** gehen.' },
            { text: '„Atlas Pro“ unter **Portal 1 Name** und die URL unter **Portal 1 URL** eingeben.' },
            { text: 'Speichern (**OK**) und neu starten.' },
          ],
        },
      ],
    },

    shield: {
      kicker: 'Nvidia Shield TV / Shield Pro',
      title: 'So installieren Sie Atlas Pro ONTV auf Nvidia Shield',
      blocks: [
        {
          kind: 'steps',
          steps: [
            { text: 'Den **Google Play Store** auf Ihrem Nvidia Shield öffnen und **Downloader** kostenlos installieren.' },
            {
              text: 'Unbekannte Quellen für Downloader unter **Einstellungen > Geräteeinstellungen > Sicherheit & Einschränkungen** zulassen.',
            },
            {
              text: 'Den Downloader-Code unserer kostenlosen offiziellen Suite ({app:ontv}, {app:max}, {app:ibo} oder {app:x9}) oder von IBO Player Pro ({pcode:iboPlayerPro}) eingeben.',
              appCodes: true,
            },
            { text: 'Ihren **Atlas Pro Code** aktivieren und den Full HD H.265 Stream sowie VOD in 4K genießen.' },
          ],
        },
      ],
    },
  },

  desktop: {
    windows: 'Atlas Pro für Windows (.EXE)',
    mac: 'Atlas Pro für macOS',
    linux: 'Atlas Pro für Linux',
  },
  storeLink: {
    ios: (player) => `${player} im App Store`,
    windows: (player) => `${player} für Windows`,
  },

  apps: {
    badge: 'Kostenlose offizielle Apps',
    title: 'Atlas Pro ONTV APK herunterladen: die 4 kostenlosen offiziellen Apps & ihre Downloader-Codes',
    subtitle:
      'Für Android, Google TV, TV-Box und Fire TV Stick: Geben Sie den Code in der App Downloader ein oder laden Sie die APK direkt auf Ihr Smartphone oder Tablet herunter.',
    free: 'Kostenlos',
    status: {
      latest: 'Neueste offizielle Version',
      new: 'Neue Version',
      previous: 'Vorherige Version',
    },
    version: (version) => `Version ${version}`,
    compatible: (versions) => `kompatibel mit ${versions}`,
    codeLabel: 'Downloader-Code',
    download: (app) => `${app} APK herunterladen`,
    activationLabel: 'Aktivierungsart',
    activation: {
      code: 'Code Active (Atlas Pro Code)',
      login: 'Benutzername + Passwort',
    },
    or: 'oder',
    notes: {
      ontv: 'Wird direkt mit Ihrem Code Active aktiviert – ohne Link oder Benutzernamen eingeben zu müssen.',
    },
    apkFree: (app) => `${app} APK (kostenlos)`,
    activationBy: 'Aktivierung per',
    copy: 'Kopieren',
    copied: 'Kopiert!',
    copyAria: (app, code) => `Downloader-Code ${code} von ${app} kopieren`,
    redundancy: {
      title: '📌 Redundanz-Hinweis zu Atlas Pro',
      text: 'Wir empfehlen Ihnen, **alle 4 offiziellen Versionen** auf Ihrem Android-Gerät oder Fire TV Stick installiert zu lassen: Wird eine davon technisch gewartet, übernehmen die anderen Versionen sofort – ganz ohne Unterbrechung.',
    },
  },

  questions: {
    title: 'Technische Fragen zur Installation',
    items: [
      {
        q: 'Ich habe meine Zugangsdaten eingegeben, aber die App zeigt einen Fehler an („Wiedergabefehler“ oder „Atlas Pro kann keine Verbindung zum Server herstellen“). Was tun?',
        a: 'Prüfen Sie zuerst den **Server-Link (Server URL)**: Er muss unbedingt mit **http beginnen – nicht mit https**. Dieser eine Buchstabe ist die häufigste Fehlerursache. Achten Sie außerdem darauf, dass sich beim Kopieren und Einfügen kein unsichtbares Leerzeichen eingeschlichen hat und dass Sie die richtige Aktivierungsart verwenden (**Code Active** bei {app:ontv} bzw. **Benutzername + Passwort** bei {app:x9} und Max v{ver:max}). **Kommen Sie immer noch nicht weiter?** Schreiben Sie uns per {wa}: Unser Team prüft Ihren **Atlas Pro Code** und richtet Ihren Player aus der Ferne für Sie ein.',
      },
      {
        q: 'Welche Internetgeschwindigkeit ist für eine flüssige Wiedergabe mit Atlas Pro ONTV nötig?',
        a: 'Eine Verbindung mit **10 bis 20 Mbit/s** ist das Minimum für flüssiges Streaming in Full HD (H.265). Wir empfehlen eine höhere Bandbreite (**30 Mbit/s und mehr**), wenn Sie VOD-Inhalte in **Ultra HD 4K** voll auskosten möchten oder wenn zu Hause mehrere Bildschirme gleichzeitig dieselbe Internetverbindung nutzen.',
      },
      {
        q: 'Brauche ich für mein Atlas Pro Abo ein VPN?',
        a: '**Nein, das ist nicht nötig** – unsere offiziellen **Atlas Pro ONTV** Zugänge nutzen optimierte Verbindungen, die Sperren durch Internetanbieter umgehen. Wenn Sie dennoch ein VPN verwenden, **wählen Sie unbedingt einen Server in Ihrem eigenen Land** (oder in einem Nachbarland), um die maximale Geschwindigkeit zu behalten und Latenz zu vermeiden.',
      },
      {
        q: 'Warum brauche ich auf manchen Geräten einen kostenpflichtigen Player (~{price} / Jahr)?',
        a: 'Auf einem **Smart TV (Samsung / LG) oder einem Apple-Gerät (iPhone / Apple TV)** bieten die kostenpflichtigen Player (**IBO Player, IBO Player Smarter, Bob Player, Hot Player** – ca. **{price} / Jahr nach {trial} Tagen kostenloser Testphase**) eine deutlich bessere Hardware-Leistung, laufen ohne jeden Hänger und merken sich, wo Sie Ihre Filme und Serien fortsetzen. Auf **Android, Google TV, TV-Box, Fire TV Stick und PC** dagegen funktionieren unsere offiziellen Apps **Atlas Pro ONTV (v{ver:ontv}, Max v{ver:max}, IBO v{ver:ibo}, 9X)** hervorragend und sind **zu 100 % kostenlos**.',
      },
    ],
  },

  help: {
    title: 'Bei einem Schritt hängen geblieben? Wir richten Ihr Gerät gemeinsam mit Ihnen ein.',
    subtitle:
      'Schreiben Sie unserem Support-Team auf WhatsApp: Wir begleiten Sie Schritt für Schritt oder aktivieren Ihr Atlas Pro Abo und Ihren Player direkt aus der Ferne.',
    button: 'Hilfe auf WhatsApp erhalten',
  },
}
