// German copy, home FAQ. Translation of ../fr/faq.ts (same ids, same order, same block shapes). Owner: tr-de.
// Plan names (Premium 1 Écran, Duo 2 Écrans, Famille 3 Écrans) stay the client's product names.
import type { Dict } from '../types.ts'
import type { FaqInline, FaqItem, FaqWa } from '../fr/faq.ts'

const b = (text: string): FaqInline => ({ b: text })
const wa = (kind: FaqWa, number = false, text?: string): FaqInline => ({ wa: kind, number, text })

const items: FaqItem[] = [
  {
    id: 'order',
    q: () => 'Wie bestelle ich ein Atlas Pro ONTV Abo über unser offizielles Portal?',
    a: (v) => [
      {
        p: [
          'Klicken Sie in unserer ',
          { to: 'pricing', text: 'Preisübersicht' },
          ` auf den Button „Jetzt abonnieren“ (Premium ${v.screens.premium} Écran für ${v.price.premium}, Duo ${v.screens.duo} Écrans für ${v.price.duo} oder Famille ${v.screens.famille} Écrans für ${v.price.famille}). Dadurch öffnet sich direkt ein vorausgefüllter Chat mit unserem Team auf `,
          wa('activate', true),
          ' für eine sofortige Bestätigung und Aktivierung.',
        ],
      },
    ],
  },
  {
    id: 'delivery',
    q: () => 'Wie schnell erhalte ich meinen Atlas Pro Code und meine Zugangsdaten?',
    a: () => [
      {
        p: [
          'Während unserer Geschäftszeiten erfolgt der Versand Ihres offiziellen ',
          b('Atlas Pro Codes'),
          ' (sowie Ihrer Xtream- / M3U-Zugangsdaten) per WhatsApp und E-Mail nach Bestätigung der Zahlung nahezu sofort (in der Regel innerhalb von 3 bis 15 Minuten).',
        ],
      },
    ],
  },
  {
    id: 'email',
    q: () => 'Ich habe die E-Mail nicht in der angegebenen Zeit erhalten. Muss ich mir Sorgen machen?',
    a: () => [
      {
        p: [
          'Nein, keine Sorge. Wir versenden 7 Tage die Woche. Wenn Sie auch in Ihrem Spam-Ordner nichts finden, schreiben Sie einfach unserem Team auf ',
          wa('contact', true),
          ': Ein Berater schickt Ihnen Ihren Atlas Pro Code sofort direkt zu.',
        ],
      },
    ],
  },
  {
    id: 'otherApps',
    q: () => 'Kann ich mein Atlas Pro ONTV Abo auch mit anderen IPTV-Apps nutzen?',
    a: (v) => [
      {
        p: [
          `Ja, auf jeden Fall! Neben unseren ${v.appCount} kostenlosen offiziellen Apps (`,
          b(`Atlas Pro ONTV ${v.ontv}`),
          ', ',
          b(`Atlas Pro Max v${v.max}`),
          ', ',
          b(`Atlas Pro IBO v${v.ibo}`),
          ', ',
          b('Atlas Pro 9X'),
          ') empfehlen wir hervorragende kostenpflichtige Player wie IBO Player, IBO Player Smarter, Hot Player oder Bob Player für Samsung-/LG-Smart-TVs und Apple-Geräte oder kostenlose Player wie IPTV Smarters Pro (mit Xtream- oder M3U-Zugangsdaten).',
        ],
      },
    ],
  },
  {
    id: 'renew',
    q: () => 'Wie verlängere ich meinen aktuellen Atlas Pro Code?',
    a: (v) => [
      {
        p: [
          'Klicken Sie auf den Button ',
          { to: 'renewal', text: '„Hier verlängern (Atlas Pro Code eingeben)“' },
          ' oder kontaktieren Sie uns direkt auf ',
          wa('renewal'),
          ` und nennen Sie Ihren aktuellen Code bzw. Ihre aktuelle Kennung. Sobald Ihre Zahlung (PayPal oder SEPA) bestätigt ist, wird Ihr Abo innerhalb weniger Minuten um ${v.months} Monate verlängert.`,
        ],
      },
    ],
  },
  {
    id: 'keepFavorites',
    q: () => 'Kann ich verlängern und dabei meine Favoriten und meine aktuelle App behalten?',
    a: () => [
      {
        p: [
          'Ja! Sie behalten Ihre bereits installierte App und Ihre Favoritenlisten, ohne alles neu installieren zu müssen.',
        ],
      },
    ],
  },
  {
    id: 'download',
    q: (v) => `Wie lade ich die offizielle App Atlas Pro ONTV ${v.ontv} APK und Atlas Pro Max v${v.max} herunter?`,
    a: () => [
      {
        p: [
          'Gehen Sie zu unserem Bereich ',
          { to: 'install', text: '„Installationsanleitungen & Download“' },
          ' weiter oben: Klicken Sie direkt auf den violetten APK-Download-Button der gewünschten Version oder geben Sie ihren offiziellen Downloader-Code in der App Downloader auf Ihrem TV / Ihrer Box / Ihrem Firestick ein.',
        ],
      },
    ],
  },
  {
    id: 'activation',
    q: (v) =>
      `Worin unterscheidet sich die Aktivierung von Atlas Pro ONTV ${v.ontv}, Atlas Pro Max v${v.max}, IBO v${v.ibo} und 9X?`,
    a: (v) => [
      {
        ul: [
          [b(`Atlas Pro ONTV ${v.ontvLine} (v${v.ontv}):`), ' Wird ausschließlich mit Ihrem Code Active (Atlas Pro Code) aktiviert.'],
          [
            b(`Atlas Pro Max (Version ${v.max}):`),
            ' Wird wahlweise mit Ihrem Code Active ODER mit Benutzername (Username) + Passwort (Password) aktiviert.',
          ],
          [b(`Atlas Pro IBO (Version ${v.ibo}):`), ' Wird mit Ihrem Code Active aktiviert.'],
          [b('Atlas Pro 9X:'), ' Wird mit Benutzername (Username) + Passwort (Password) aktiviert.'],
        ],
      },
      {
        note: [
          b('Achtung:'),
          ' Kaufen Sie nicht den Fire TV Stick HD der 2. Generation mit dem geschlossenen System Vega OS – er sperrt die App Downloader.',
        ],
      },
    ],
  },
  {
    id: 'replace',
    q: () => 'Was ersetzt Atlas Pro ON TV im Jahr 2026?',
    a: (v) => [
      {
        p: [
          `Nichts ersetzt das Original: 2026 hat sich Atlas Pro ONTV mit einer eigenen offiziellen Suite der neuen Generation neu erfunden (Atlas Pro ONTV v${v.ontv}, Atlas Pro Max v${v.max}, Atlas Pro IBO v${v.ibo} und Atlas Pro 9X) – angetrieben von einer neuen europäischen Serverarchitektur gegen Aussetzer mit ${v.uptime} % Verfügbarkeit.`,
        ],
      },
    ],
  },
  {
    id: 'countries',
    q: () => 'Funktioniert das Atlas Pro ONTV Abo in Frankreich, Belgien, der Schweiz, Kanada und im Ausland?',
    a: () => [
      {
        p: [
          'Ja, unser Service funktioniert überall auf der Welt, sofern Sie eine stabile Internetverbindung haben (Frankreich, Belgien, Schweiz, Kanada, Europa, USA, Nordafrika usw.) – ganz ohne VPN.',
        ],
      },
    ],
  },
  {
    id: 'screens',
    q: () => 'Kann ich mein Abo auf mehreren Bildschirmen gleichzeitig nutzen?',
    a: (v) => [
      {
        p: [
          `Der Tarif Premium (${v.price.premium}) umfasst ${v.screens.premium} aktiven Bildschirm. Wenn Sie Ihre Programme mit der Familie auf mehreren Bildschirmen gleichzeitig sehen möchten, wählen Sie direkt unseren `,
          { to: 'pricing', text: `Tarif Duo ${v.screens.duo} Écrans` },
          ` (${v.price.duo} / ${v.months} Monate) oder unseren `,
          { to: 'pricing', text: `Tarif Famille ${v.screens.famille} Écrans` },
          ` (${v.price.famille} / ${v.months} Monate) – damit erhalten Sie ${v.screens.duo} bzw. ${v.screens.famille} unabhängige offizielle Codes!`,
        ],
      },
    ],
  },
  {
    id: 'oldTv',
    q: () => 'Ich habe einen älteren Fernseher (kein Smart TV). Welche Lösung bieten Sie an?',
    a: () => [
      {
        p: [
          'Schließen Sie einfach eine zertifizierte Android-TV-Box (Xiaomi Mi Box, Mecool, Formuler) oder einen Amazon Fire TV Stick 4K / 4K Max (mit Fire OS) an den HDMI-Anschluss Ihres Fernsehers an – so wird er zu einem ultraschnellen Smart TV, der mit all unseren kostenlosen Apps kompatibel ist.',
        ],
      },
    ],
  },
  {
    id: 'trust',
    q: () => 'Warum sollten Sie unserem offiziellen Portal als autorisiertem Vertriebspartner vertrauen?',
    a: (v) => [
      {
        p: [
          `Wir sind das maßgebliche autorisierte Portal in Frankreich und Europa – mit mehr als ${v.customers} zufriedenen Kunden, 100 % offiziellen Codes mit ${v.months} Monaten Garantie, keiner Kreditkartenabbuchung auf der Website (sichere Zahlung per PayPal oder SEPA), einer Geld-zurück-Garantie und einem menschlichen technischen Support, der in weniger als ${v.supportMinutes} Minuten antwortet, auf `,
          wa('contact'),
          '.',
        ],
      },
    ],
  },
  {
    id: 'samsungLg',
    q: (v) => `Warum ist die App auf meinem Samsung- oder LG-Fernseher kostenpflichtig (~${v.playerPrice}) und wie aktiviere ich sie?`,
    a: (v) => [
      {
        p: [
          `Da die offizielle Atlas Pro App in den geschlossenen Stores von Samsung und LG nicht verfügbar ist, benötigen Sie einen Partner-Player (IBO Player, IBO Player Smarter, Hot Player, Bob Player), der etwa ${v.playerPrice} / Jahr kostet (nach ${v.trialDays} Tagen kostenloser Testphase). Diese Player bieten einwandfreie Stabilität, einen sofort geladenen EPG und setzen VOD-Inhalte auf die Sekunde genau fort.`,
        ],
      },
      {
        p: [
          'Um es Ihnen leicht zu machen, kann unser Team diesen Player direkt für Sie aktivieren und gleichzeitig Ihr Atlas Pro Abo einspielen: Senden Sie uns einfach Ihre MAC-Adresse und Ihren Device Key auf ',
          wa('help', true),
          '!',
        ],
      },
    ],
  },
  {
    id: 'content',
    q: () => 'Welche Inhalte und Sender sind im Atlas Pro Abo 2026 enthalten?',
    a: (v) => [
      {
        p: [
          `Ihr Abo umfasst +${v.channels} Live-Sender (Frankreich, Europa, international, darunter +${v.sportsChannels} Premium-Sportsender in Full HD H.265), +${v.films} Filme und +${v.series} Serien (${v.episodes} Folgen) in 4K und Full HD mit täglicher Aktualisierung sowie ${v.replayDays} Tage Replay auf +${v.replayChannels} Sendern.`,
        ],
      },
    ],
  },
  {
    id: 'connect',
    q: () =>
      'Wie löse ich das Problem „Atlas Pro kann keine Verbindung zum Server herstellen“, „Atlas Pro ON TV Wiedergabefehler“ oder „Warum funktioniert Atlas Pro TV nicht mehr“?',
    a: (v) => [
      {
        cards: [
          [
            b('Fall Nr. 1 — In der offiziellen Atlas Pro App (Android / TV-Box):'),
            ' Die Meldungen „Atlas Pro kann keine Verbindung zum Server herstellen“ oder „Wiedergabefehler“ erscheinen meist, wenn eine alte Version der App genutzt wird, bei einem vorübergehenden Fehler oder bei einer Inkompatibilität mit einem zu alten Android-System (unsere Apps sind für Google-TV-Fernseher, Smartphones und TV-Boxen mit aktueller Android-Version optimiert). ',
            b('Lösung:'),
            ` Geben Sie Ihre Daten erneut ein, leeren Sie den Cache der App in den Einstellungen Ihres Geräts und melden Sie sich wieder an – oder installieren Sie das neueste offizielle Update (Atlas Pro ONTV ${v.ontv} oder Atlas Pro Max v${v.max}).`,
          ],
          [
            b('Fall Nr. 2 — Meldung „Die Playlist funktioniert nicht“ bei IBO Player, Hot Player, Bob Player oder IBO Smarter:'),
            ' Bei diesen Playern bedeutet dieser Fehler meistens, dass der freigegebene Server-Link (URL) aktualisiert werden muss. Dann genügt es, den Link zu ändern oder die Serverdaten zu aktualisieren. ',
            b('Sofortige Lösung:'),
            ' Kontaktieren Sie einfach unser Support-Team auf ',
            wa('contact', true),
            '; unsere Techniker aktualisieren Ihren Link und stellen Ihre Playlist in wenigen Sekunden aus der Ferne wieder her!',
          ],
        ],
      },
    ],
  },
  {
    id: 'apple',
    q: () => 'Wie funktioniert Atlas Pro auf iPhone, iPad oder Apple TV (kostenlos vs. kostenpflichtig)?',
    a: (v) => [
      {
        p: [
          'Da die native Atlas Pro App (und Atlas Pro Prime) für iOS/tvOS nicht verfügbar ist, haben Sie im App Store 2 Möglichkeiten:',
        ],
      },
      {
        ol: [
          [
            b('Kostenlos:'),
            ' Laden Sie Smarters Pro IPTV (Smarters Player Lite) herunter und fordern Sie bei unserem Team auf ',
            wa('help'),
            ' Ihre Xtream-Zugangsdaten (URL + Username + Password) oder M3U-Daten an.',
          ],
          [
            b(`Kostenpflichtig & empfohlen (~${v.playerPrice} / Jahr):`),
            ' Laden Sie IBO Player, Hot Player, IBO Player Smarter oder Bob Player herunter – für maximale Flüssigkeit und das Fortsetzen von VOD-Inhalten.',
          ],
        ],
      },
    ],
  },
  {
    id: 'smarters',
    q: () =>
      'INFO für LG- & SAMSUNG-Nutzer: Die App Smarters zeigt den Fehler „Failed to authorize“ an. Was tun?',
    a: () => [
      {
        p: [
          'Die alte Smarters-Version auf Samsung- und LG-Fernsehern hat regelmäßig Fehler („Failed to authorize“), die nichts mit unseren Servern zu tun haben. Laden Sie das neueste Smarters-Pro-Update aus Ihrem Store herunter oder wechseln Sie mit Hilfe unseres Teams auf ',
          wa('help', true),
          ' zu IBO Player / Hot Player / Bob Player – für dauerhafte Stabilität.',
        ],
      },
    ],
  },
  {
    id: 'serverLink',
    q: () => 'Der Server-Link oder mein Code funktioniert nicht, wenn ich meine Daten eingebe. Warum?',
    a: () => [
      {
        p: [
          'Stellen Sie zuerst sicher, dass die URL mit ',
          { code: 'http://' },
          ' beginnt (ohne „s“). Um in Frankreich und Europa maximale Sicherheit und Stabilität zu gewährleisten, aktualisieren wir unsere privaten Serververbindungen regelmäßig. Kontaktieren Sie einfach unseren Support auf ',
          wa('help', true),
          ', um sofort Ihre aktualisierten Einstellungen zu erhalten, oder lassen Sie unser Team Ihren Bildschirm einrichten.',
        ],
      },
    ],
  },
  {
    id: 'enterCode',
    q: () => 'Wie gebe ich den Atlas Pro Code ein und wo finde ich meine Atlas Pro Kennung?',
    a: (v) => [
      {
        p: [
          'Ihren Atlas Pro Code und Ihre Atlas Pro Kennung erhalten Sie direkt per WhatsApp und E-Mail, sobald Ihre Bestellung auf unserem offiziellen Portal bestätigt ist.',
        ],
      },
      {
        p: [
          b('Wie gebe ich den Atlas Pro Code ein?'),
          ` Öffnen Sie einfach die App Atlas Pro ONTV ${v.ontv} (oder IBO v${v.ibo}), geben Sie Ihren Code in das dafür vorgesehene Feld („Code Active“) ein und bestätigen Sie. In den Versionen Atlas Pro Max v${v.max} oder Atlas Pro 9X können Sie sich direkt mit Ihrem Benutzernamen (Username) und Ihrem Passwort anmelden.`,
        ],
      },
    ],
  },
  {
    id: 'changeCode',
    q: () => 'Wie ändere ich den Code in Atlas Pro ONTV?',
    a: () => [
      {
        p: [
          'Um den Code in Atlas Pro ONTV zu ändern (zum Beispiel bei einem neuen Abo oder einem Tarifwechsel), gehen Sie auf den Startbildschirm der App und klicken Sie auf ',
          b('Abmelden / Benutzer wechseln'),
          ' oder öffnen Sie die Einstellungen Ihres Android-Geräts (',
          b('Apps > Atlas Pro ONTV > Daten und Cache löschen'),
          '). Starten Sie die App anschließend neu und geben Sie Ihren neuen Atlas Pro Code ein.',
        ],
      },
    ],
  },
  {
    id: 'installTv',
    q: () => 'Wie installiere ich Atlas Pro auf dem Fernseher (Samsung, LG, TCL, Sony) und wie bekomme ich Atlas Pro auf den TV?',
    a: (v) => [
      {
        p: [
          'Sie fragen sich, wie Sie Atlas Pro auf den Fernseher bekommen oder wie Sie Atlas Pro auf dem TV installieren? Die Methode hängt von der Marke Ihres Fernsehers ab:',
        ],
      },
      {
        ul: [
          [
            b('Atlas Pro auf TCL-, Sony-, Philips- oder Xiaomi-Fernseher installieren (Android TV / Google TV):'),
            ' Installieren Sie die kostenlose App Downloader aus dem Google Play Store und geben Sie dann ',
            { to: 'apps', text: 'unseren Downloader-Code' },
            ` ein, um Atlas Pro ONTV ${v.ontv} APK kostenlos herunterzuladen.`,
          ],
          [
            b('Atlas Pro auf Samsung-TV und Atlas Pro ONTV auf LG-TV installieren:'),
            ' Öffnen Sie den offiziellen Store Ihres Fernsehers, installieren Sie IBO Player, Hot Player, Bob Player oder IBO Smarter Player und senden Sie dann Ihre MAC-Adresse und Ihren Device Key an unser Team auf ',
            wa('help', true),
            ' – wir aktivieren Ihren Bildschirm in 2 Minuten aus der Ferne.',
          ],
        ],
      },
    ],
  },
  {
    id: 'fireTv',
    q: () => 'Wie installiere ich Atlas Pro auf Fire TV, Atlas Pro ONTV auf Chromecast und auf dem iPad?',
    a: (v) => [
      {
        ul: [
          [
            b('Atlas Pro auf Fire TV und Atlas Pro ONTV auf Chromecast installieren:'),
            ' Laden Sie die App Downloader auf Ihren Amazon Fire TV Stick (4K, Max, Lite) oder Ihren Chromecast mit Google TV herunter, erlauben Sie unbekannte Quellen und geben Sie ',
            { to: 'apps', text: 'den Download-Code' },
            ` unserer kostenlosen Suite ein (Atlas Pro ONTV ${v.ontv}, Max v${v.max}, IBO v${v.ibo} oder 9X).`,
          ],
          [
            b('Atlas Pro auf iPad und iPhone installieren:'),
            ' Öffnen Sie den App Store, laden Sie einen kostenlosen Player (Smarters Pro IPTV) oder einen Hochleistungs-Player (IBO Player, Hot Player, Bob Player) herunter und kontaktieren Sie unseren ',
            wa('help', false, 'WhatsApp-Support'),
            ', um Ihre Xtream- / M3U-Zugangsdaten zu erhalten oder Ihr Gerät aktivieren zu lassen.',
          ],
        ],
      },
    ],
  },
  {
    id: 'cast',
    q: () => 'Wie streame ich Atlas Pro ONTV per Cast auf meinen Fernseher?',
    a: () => [
      {
        p: [
          'Um Atlas Pro ONTV von Ihrem Smartphone oder Tablet auf Ihren Fernseher zu casten, stellen Sie sicher, dass beide Geräte mit demselben WLAN verbunden sind, und nutzen Sie dann die Cast-Funktion bzw. die Bildschirmübertragung (Chromecast oder AirPlay). Für optimale Flüssigkeit ohne Verzögerung (Full HD H.265 im Live-TV, 4K bei VOD) empfehlen wir Ihnen jedoch, die App direkt auf Ihrem Smart TV, Fire TV Stick, Chromecast mit Google TV oder Ihrer Android-Box zu installieren.',
        ],
      },
    ],
  },
]

export const faq: Dict['faq'] = {
  badge: 'HILFE, SUPPORT & OFFIZIELLE FAQ',
  title: 'Ihre häufigen Fragen – ATLAS PRO ONTV',
  titleHighlight: 'ATLAS PRO ONTV',
  subtitle:
    'Alles, was Sie vor, während und nach der Bestellung Ihres Atlas Pro ONTV Abos über unser offizielles Portal wissen müssen.',
  help: {
    title: 'Sie finden Ihre Antwort nicht?',
    text: (minutes: string) =>
      `Unser menschlicher technischer Support antwortet Ihnen in weniger als ${minutes} Minuten auf WhatsApp, 7 Tage die Woche.`,
    button: 'Auf WhatsApp schreiben',
  },
  whatsapp: 'WhatsApp',
  items,
}
