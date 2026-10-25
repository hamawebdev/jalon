// German copy, legal pages: Impressum, Datenschutz, AGB. Translation of ../fr/legal.ts (same keys). Owner: tr-de.
// French law references stay as they are, named in German where a usual translation exists (RGPD → DSGVO).
import type { Dict } from '../types.ts'

export const legal: Dict['legal'] = {
  common: {
    badge: 'Rechtliche Informationen',
    updatedLabel: 'Zuletzt aktualisiert:',
    updated: '25. Oktober 2026',
    toc: 'Inhalt',
    others: 'Weitere Dokumente',
    docs: {
      mentions: 'Impressum',
      confidentialite: 'Datenschutzerklärung',
      conditions: 'AGB & Geld-zurück-Garantie',
    },
    help: {
      title: 'Eine Frage zu diesen Informationen?',
      text: 'Unser Team antwortet Ihnen auf WhatsApp, 7 Tage die Woche, auf Französisch.',
      cta: 'Schreiben Sie uns auf WhatsApp',
    },
    contact: {
      whatsapp: 'WhatsApp',
      email: 'E-Mail',
    },
    pending: {
      companyName: 'Firmenname des Anbieters',
      legalForm: 'Rechtsform (und ggf. Stammkapital)',
      address: 'Anschrift des Firmensitzes',
      registration: 'Registereintrag (RCS / SIREN, USt-IdNr.)',
      publisher: 'Name des inhaltlich Verantwortlichen',
      host: 'Hosting-Anbieter der Website (Name, Anschrift, Telefon)',
      email: 'E-Mail-Adresse des Supports',
    },
  },

  mentions: {
    title: 'Impressum',
    lead: (domain: string) =>
      `Angaben zum Anbieter und zum Hosting-Anbieter der Website ${domain}, veröffentlicht gemäß Artikel 6 des französischen Gesetzes Nr. 2004-575 vom 21. Juni 2004 über das Vertrauen in die digitale Wirtschaft (LCEN).`,
    publisher: {
      title: 'Anbieter der Website',
      intro: (seller: string, domain: string) =>
        `Die Website ${domain} wird von ${seller} betrieben, offizieller autorisierter Vertriebspartner von Atlas Pro ONTV.`,
      rows: {
        tradeName: 'Handelsname',
        domain: 'Adresse der Website',
        activity: 'Tätigkeit',
        companyName: 'Firmenname',
        legalForm: 'Rechtsform',
        address: 'Sitz',
        registration: 'Registereintrag',
      },
      activity:
        'Vertrieb und Aktivierung von Atlas Pro Abonnement-Codes, Unterstützung bei der Installation und Kundensupport.',
    },
    director: {
      title: 'Verantwortlich für den Inhalt',
      label: 'Inhaltlich verantwortlich',
    },
    contact: {
      title: 'Kontakt',
      intro: 'Bei Fragen zur Website oder zu Ihrem Abonnement:',
    },
    host: {
      title: 'Hosting',
      label: 'Hosting-Anbieter',
    },
    ip: {
      title: 'Geistiges Eigentum',
      paragraphs: [
        'Der Aufbau der Website, ihre Texte, Illustrationen und grafischen Elemente sind durch das Recht des geistigen Eigentums geschützt. Jede vollständige oder teilweise Vervielfältigung oder Wiedergabe ohne vorherige schriftliche Genehmigung des Anbieters ist untersagt.',
        'Die Marken, Namen und Logos der auf der Website genannten Apps und Player gehören ihren jeweiligen Inhabern. Sie werden nur genannt, um die Kompatibilität des Dienstes anzugeben.',
      ],
    },
    links: {
      title: 'Links zu Diensten Dritter',
      paragraphs: [
        'Die Website verweist auf Dienste Dritter: WhatsApp für Bestellungen und Support sowie die Download-Seiten der offiziellen Apps und der Partner-Player. Für diese Dienste gelten deren eigene Bedingungen; der Anbieter ist weder für ihren Inhalt noch für ihre Verfügbarkeit verantwortlich.',
      ],
    },
    accuracy: {
      title: 'Richtigkeit der Informationen',
      paragraphs: [
        'Der Anbieter achtet auf die Richtigkeit der veröffentlichten Informationen (Tarife, Anzahl der Sender und Inhalte, App-Versionen, Installationsanleitungen). Diese Informationen können sich ändern: Im Zweifelsfall bestätigt Ihnen unser Team den aktuellen Stand auf WhatsApp.',
      ],
    },
    data: {
      title: 'Personenbezogene Daten',
      before: 'Die Verarbeitung Ihrer personenbezogenen Daten ist in unserer ',
      link: 'Datenschutzerklärung',
      after: ' beschrieben.',
    },
  },

  privacy: {
    title: 'Datenschutz\u00aderklärung',
    lead: (seller: string, domain: string) =>
      `Welche Daten verarbeitet werden, wenn Sie ${domain} besuchen oder bei ${seller} ein Atlas Pro Abonnement bestellen, zu welchem Zweck und wie Sie Ihre Rechte ausüben.`,
    summary: {
      title: 'Kurz gesagt',
      items: [
        'Kein Kundenkonto, kein Formular und keine Zahlung auf der Website.',
        'Keine Cookies, keine Werbe-Tracker und keine Reichweitenmessung.',
        'Ihre Bestellungen laufen über einen WhatsApp-Chat, den Sie selbst öffnen.',
        'Ihre Daten dienen dazu, Ihre Bestellung zu bearbeiten, Ihnen Ihre Codes zu liefern und Sie zu unterstützen.',
      ],
    },
    controller: {
      title: 'Verantwortlicher',
      before: (seller: string) =>
        `Verantwortlicher für die Datenverarbeitung ist ${seller}, Anbieter der Website. Die vollständigen Angaben finden Sie im `,
      link: 'Impressum',
      after: '.',
    },
    notCollected: {
      title: 'Was die Website nicht erfasst',
      items: [
        'Kein Kundenkonto und kein persönlicher Bereich.',
        'Kein Formular: Nichts von dem, was Sie auf der Website lesen oder auswählen, wird an uns übermittelt.',
        'Keine Zahlung auf der Website: Es werden dort keine Kreditkartendaten abgefragt oder gespeichert.',
        'Keine Cookies, keine Werbe-Tracker, keine Reichweitenmessung.',
        'Die Schriftarten werden zusammen mit der Website gehostet: Ihr Browser kontaktiert keinen Drittanbieter, um die Seiten anzuzeigen.',
      ],
    },
    browsing: {
      title: 'Besuch der Website',
      paragraphs: [
        'Wie jeder Webserver kann der Hosting-Anbieter der Website technische Verbindungsdaten (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp) speichern, um die Sicherheit und den ordnungsgemäßen Betrieb der Website zu gewährleisten. Rechtsgrundlage: unser berechtigtes Interesse am Schutz der Website.',
      ],
    },
    whatsapp: {
      title: 'Bestellung und Support über WhatsApp',
      intro: [
        'Die Buttons für Bestellung, Aktivierung, Verlängerung und Hilfe öffnen WhatsApp mit einer vorausgefüllten Nachricht. Es wird nichts an uns übermittelt, solange Sie diese Nachricht nicht abgeschickt haben.',
        'Wenn Sie uns schreiben, verarbeiten wir die Informationen, die Sie uns im Chat mitteilen:',
      ],
      items: [
        'Ihre WhatsApp-Nummer und Ihren Profilnamen;',
        'den gewählten Tarif, Ihr Gerät und die gewählte Zahlungsart;',
        'Ihre E-Mail-Adresse für den Versand Ihres Atlas Pro Codes und Ihrer Zugangsdaten;',
        'Ihren aktuellen Code bzw. Ihre aktuelle Kennung bei einer Verlängerung;',
        'die für den Support nützlichen Informationen (Gerät, App, Fehlermeldung, Screenshots, die Sie uns senden möchten).',
      ],
      outro: [
        'Diese Daten dienen dazu, Ihre Bestellung zu bearbeiten, Ihre Codes zu liefern und zu aktivieren, Sie zu unterstützen und Ihre Verlängerungen zu verwalten. Rechtsgrundlage: die Erfüllung des Vertrags, den Sie mit uns schließen (Art. 6 Abs. 1 lit. b DSGVO).',
        'WhatsApp ist ein Dienst eines Drittanbieters, für den dessen eigene Nutzungsbedingungen und Datenschutzrichtlinie gelten.',
      ],
    },
    payment: {
      title: 'Zahlung',
      paragraphs: [
        'Die Zahlung erfolgt per PayPal oder per SEPA-Banküberweisung gemäß den Angaben im WhatsApp-Chat. Auf der Website findet keine Zahlung statt.',
        'Wir erhalten die Transaktionsdaten: Name des Kontoinhabers, Betrag, Datum und Referenz der Zahlung (und bei einer Überweisung die Bankverbindung, die auf dem Vorgang angegeben ist). PayPal verarbeitet Ihre Zahlungsdaten gemäß seiner eigenen Datenschutzrichtlinie.',
        'Diese Daten dienen dazu, Ihre Zahlung zu bestätigen und unsere buchhalterischen Pflichten zu erfüllen. Rechtsgrundlage: die Vertragserfüllung und unsere gesetzlichen Pflichten.',
      ],
    },
    recipients: {
      title: 'Empfänger',
      team: (seller: string) =>
        `Ihre Daten werden vom Team von ${seller} sowie von den für den Dienst erforderlichen Dienstleistern verarbeitet: WhatsApp (Messaging), PayPal oder Ihre Bank (Zahlung), der Hosting-Anbieter der Website (technische Verbindungsdaten).`,
      transfers:
        'Einige dieser Dienstleister können Daten außerhalb der Europäischen Union verarbeiten, im Rahmen der in der DSGVO vorgesehenen Garantien.',
    },
    retention: {
      title: 'Speicherdauer',
      intro:
        'Wir speichern Ihre Daten so lange, wie es für die oben beschriebenen Zwecke erforderlich ist, und löschen sie anschließend, sofern keine gesetzliche Aufbewahrungspflicht besteht.',
      rows: {
        order: { label: 'Chat und Bestelldaten', what: 'Speicherdauer der Chats und Bestelldaten' },
        accounting: { label: 'Zahlungen und Buchungsbelege', what: 'Speicherdauer der Zahlungsdaten und Buchungsbelege' },
        logs: { label: 'Technische Verbindungsdaten', what: 'Speicherdauer der Logdateien des Hosting-Anbieters' },
      },
    },
    rights: {
      title: 'Ihre Rechte',
      paragraphs: [
        'Gemäß der Datenschutz-Grundverordnung (DSGVO) und dem französischen Datenschutzgesetz („Informatique et Libertés“) haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit.',
        'Um diese Rechte auszuüben, schreiben Sie uns auf WhatsApp oder per E-Mail (Kontaktdaten unten). Wir antworten Ihnen innerhalb von höchstens einem Monat.',
        'Wenn Sie der Ansicht sind, dass Ihre Rechte nicht gewahrt werden, können Sie bei der Datenschutzaufsichtsbehörde Ihres Landes Beschwerde einlegen (in Frankreich bei der CNIL).',
      ],
    },
    cookies: {
      title: 'Cookies',
      paragraphs: [
        'Die Website setzt keine Cookies und verwendet keine Tracker: Ein Cookie-Banner ist daher nicht erforderlich. Sollte sich das ändern, wird diese Erklärung aktualisiert und Ihre Einwilligung eingeholt, sofern das Gesetz dies verlangt.',
      ],
    },
    changes: {
      title: 'Änderungen',
      paragraphs: [
        'Wir können diese Erklärung aktualisieren, um Änderungen der Website oder unserer Dienste Rechnung zu tragen. Das Datum der letzten Aktualisierung steht oben auf dieser Seite.',
      ],
    },
  },

  terms: {
    title: 'AGB & Geld-zurück-Garantie',
    lead: (seller: string) =>
      `Die Verkaufsbedingungen für die Atlas Pro Abonnements von ${seller}, offizieller autorisierter Vertriebspartner von Atlas Pro ONTV, und unsere Geld-zurück-Garantie.`,
    scope: {
      title: 'Gegenstand',
      text: (seller: string, domain: string) =>
        `Diese Allgemeinen Geschäftsbedingungen regeln den Verkauf von Atlas Pro Abonnements durch ${seller} an Kunden, die über ${domain} oder direkt auf WhatsApp bestellen. Mit der Bestellung erkennen Sie diese Bedingungen an.`,
    },
    seller: {
      title: 'Der Verkäufer',
      before: (seller: string) =>
        `Verkäufer ist ${seller}, offizieller autorisierter Vertriebspartner von Atlas Pro ONTV. Die vollständigen Kontaktdaten finden Sie im `,
      link: 'Impressum',
      after: '.',
    },
    service: {
      title: 'Der Dienst',
      offer: (v: { months: string; channels: string; films: string; series: string; replayDays: string; replayChannels: string }) =>
        `Das Atlas Pro Abonnement bietet für ${v.months} Monate Zugang zum Angebot von Atlas Pro ONTV: +${v.channels} Live-Sender, ein Video-on-Demand-Katalog (+${v.films} Filme und +${v.series} Serien) und ${v.replayDays} Tage Replay auf +${v.replayChannels} Sendern.`,
      codes: 'Jeder Tarif umfasst einen Atlas Pro Code pro Bildschirm.',
      apps: (apps: string) =>
        `Der Dienst wird mit unseren kostenlosen offiziellen Apps (${apps}) oder mit einem kompatiblen Partner-Player (Xtream-Codes-Zugangsdaten oder M3U-Link) genutzt.`,
      players: (price: string, days: string) =>
        `Einige Partner-Player, insbesondere auf Samsung- und LG-Smart-TVs, sind beim jeweiligen Hersteller kostenpflichtig (etwa ${price} pro Jahr nach einer kostenlosen Testphase von ${days} Tagen). Diese Kosten sind nicht im Atlas Pro Abonnement enthalten.`,
      requirements: {
        before: 'Der Dienst setzt eine Internetverbindung und ein kompatibles Gerät voraus. Lesen Sie vor der Bestellung unsere ',
        install: 'Installationsanleitungen',
        middle: ' und die Seite ',
        downloads: 'Download',
        after: ' oder lassen Sie sich von unserem Team beraten.',
      },
    },
    plans: {
      title: 'Tarife und Preise',
      intro: 'Folgende Tarife werden angeboten:',
      columns: { plan: 'Tarif', duration: 'Laufzeit', price: 'Preis' },
      names: { premium: 'Premium 1 Écran', duo: 'Duo 2 Écrans', famille: 'Famille 3 Écrans' },
      months: (months: string) => `${months} Monate`,
      pricePending: 'Preis des Tarifs',
      notes: [
        'Die Preise sind in Euro angegeben. Maßgeblich ist der zum Zeitpunkt der Bestellung angezeigte und im WhatsApp-Chat bestätigte Preis.',
      ],
      vat: { label: 'MwSt.', what: 'Angabe zur MwSt. (Preise inkl. MwSt. oder „TVA non applicable“ – keine MwSt. ausgewiesen)' },
    },
    order: {
      title: 'Bestellung',
      steps: [
        'Wählen Sie Ihren Tarif und klicken Sie auf den zugehörigen Button: WhatsApp öffnet sich mit einer vorausgefüllten Nachricht. Im Shop können Sie außerdem Ihr Gerät und Ihre Zahlungsart angeben.',
        'Senden Sie die Nachricht: Unser Team bestätigt Ihnen Tarif, Preis und Zahlungsinformationen.',
        'Die Bestellung ist verbindlich, sobald Ihre Zahlung bestätigt ist.',
      ],
      shop: 'Zum Shop',
    },
    payment: {
      title: 'Zahlung',
      paragraphs: [
        'Der Preis des Tarifs wird per PayPal oder per SEPA-Banküberweisung gemäß den Angaben im WhatsApp-Chat bezahlt. Auf der Website findet keine Kreditkartenzahlung statt.',
      ],
    },
    delivery: {
      title: 'Lieferung und Aktivierung',
      paragraphs: [
        'Nach Bestätigung Ihrer Zahlung erhalten Sie Ihren offiziellen Atlas Pro Code (sowie Ihre Xtream- / M3U-Zugangsdaten) per WhatsApp und E-Mail. Während unserer Geschäftszeiten erfolgt der Versand nahezu sofort (in der Regel innerhalb von 3 bis 15 Minuten).',
        'Nichts erhalten? Prüfen Sie Ihren Spam-Ordner und schreiben Sie dann unserem Team auf WhatsApp: Ein Berater schickt Ihnen Ihren Atlas Pro Code sofort direkt zu.',
        'Unser Team begleitet Sie bei der Installation und Aktivierung auf Ihrem Gerät.',
      ],
      rows: {
        hours: { label: 'Geschäftszeiten', what: 'Geschäftszeiten des Teams (Versand der Codes)' },
        start: { label: 'Beginn des Abonnements', what: 'Beginn des Abonnements (Versand oder erste Aktivierung des Codes)' },
      },
    },
    renewal: {
      title: 'Laufzeit und Verlängerung',
      paragraphs: [
        (months: string) =>
          `Das Abonnement läuft ${months} Monate. Es verlängert sich nicht automatisch: Ohne Ihre Anfrage erfolgt keine Abbuchung.`,
        (months: string) =>
          `Zur Verlängerung kontaktieren Sie uns auf WhatsApp und nennen Ihren aktuellen Code bzw. Ihre aktuelle Kennung. Sobald Ihre Zahlung (PayPal oder SEPA) bestätigt ist, wird Ihr Abonnement innerhalb weniger Minuten um ${months} Monate verlängert. Sie behalten Ihre bereits installierte App und Ihre Favoritenlisten, ohne etwas neu installieren zu müssen.`,
      ],
    },
    support: {
      title: 'Support',
      text: (minutes: string) =>
        `Unser Kundensupport – zu 100 % auf Französisch – ist 7 Tage die Woche per WhatsApp und E-Mail erreichbar: Hilfe bei der Installation, Download der Apps, Wiederherstellung verlorener Codes oder Verbindungsdiagnose. Wir antworten im Durchschnitt in weniger als ${minutes} Minuten, auch abends und am Wochenende.`,
    },
    guarantee: {
      title: 'Geld-zurück-Garantie',
      quote: 'Testen Sie ohne Risiko — Geld-zurück-Garantie, wenn es Ihnen nicht zusagt.',
      continuity: (months: string) =>
        `Garantie & laufende Betreuung: persönliche Begleitung und volle Garantie der Dienstkontinuität während der gesamten ${months} Monate Ihres Abonnements.`,
      how: 'Um die Garantie in Anspruch zu nehmen, kontaktieren Sie unser Team per WhatsApp oder E-Mail und nennen Sie Ihren Atlas Pro Code bzw. Ihre Kennung.',
      rows: {
        window: { label: 'Frist für die Anfrage', what: 'Frist für die Beantragung der Erstattung' },
        conditions: { label: 'Bedingungen', what: 'Bedingungen der Geld-zurück-Garantie' },
        amount: { label: 'Erstatteter Betrag', what: 'erstatteter Betrag (vollständig oder anteilig)' },
        method: { label: 'Art und Frist der Erstattung', what: 'Art und Frist der Erstattung' },
      },
    },
    withdrawal: {
      title: 'Widerrufsrecht',
      label: 'Widerrufsrecht',
      what: 'Widerrufsrecht: Frist, Ausübung und Fall eines mit Ihrer Zustimmung sofort gelieferten Codes',
    },
    disputes: {
      title: 'Beschwerden und Streitigkeiten',
      text: 'Bei Problemen wenden Sie sich bitte zuerst per WhatsApp oder E-Mail an unser Team: Wir suchen gemeinsam mit Ihnen nach einer gütlichen Lösung.',
      rows: {
        mediator: { label: 'Verbraucher\u00adschlichtungs\u00adstelle', what: 'Verbraucherschlichtungsstelle (Name und Kontaktdaten)' },
        law: { label: 'Anwendbares Recht und Gerichtsstand', what: 'anwendbares Recht und zuständiger Gerichtsstand' },
      },
    },
    changes: {
      title: 'Änderung der Bedingungen',
      text: 'Für Ihre Bestellung gelten die Bedingungen, die am Tag der Bestellung in Kraft sind.',
    },
  },
}
