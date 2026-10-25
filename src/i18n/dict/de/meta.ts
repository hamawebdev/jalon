// German <title>, meta description and social/structured-data wording of every page. Translation of ../fr/meta.ts
// (same keys). Owner: tr-de. Titles ≤ ~60 characters, descriptions ~140–160, German search phrasing (« Atlas Pro Abo »).
import type { Dict } from '../types.ts'

export const meta: Dict['meta'] = {
  siteName: 'AtlasProTVOfficial',
  ogImageAlt:
    'Atlas Pro ONTV 2026 · Atlas Pro IPTV Abo bei AtlasProTVOfficial, offizieller autorisierter Vertriebspartner',
  organizationDescription: 'Offizieller autorisierter Atlas Pro Vertriebspartner Nr. 1 in Frankreich & Europa.',
  productName: 'Atlas Pro ONTV Abonnement',
  productDescription:
    '12-monatiges Atlas Pro ONTV IPTV-Abonnement für 1, 2 oder 3 Bildschirme: Live-Sender in Full HD, Filme und Serien als VOD, Replay – auf Android, Smart TV, Fire TV Stick, iPhone und PC.',
  planNames: { premium: 'Premium', duo: 'Duo', famille: 'Famille' },
  offerName: (plan: string, screens: number, months: number) =>
    `${plan} · ${screens} Bildschirm${screens > 1 ? 'e' : ''} · ${months} Monat${months === 1 ? '' : 'e'}`,
  pages: {
    home: {
      name: 'Startseite',
      title: 'Atlas Pro ONTV (2026) · Atlas Pro IPTV Abo',
      description: (v) =>
        `Entdecken Sie Atlas Pro ONTV 2026, das IPTV Atlas Pro on TV: +${v.channels} Sender in Full HD, +${v.films} Filme & +${v.series} Serien. Ihr Atlas Pro Abo, aktiviert per WhatsApp.`,
    },
    boutique: {
      name: 'Shop',
      title: 'Shop · Atlas Pro ONTV Abo für 12 Monate',
      description: (v) =>
        `Bestellen Sie Ihr Atlas Pro ONTV Abo mit 3 Klicks: 1, 2 oder 3 Bildschirme für 12 Monate, ab ${v.priceFrom}. Zahlung per PayPal oder SEPA, Codes per WhatsApp.`,
    },
    revendeur: {
      name: 'Wiederverkäufer',
      title: 'Atlas Pro ONTV Wiederverkäufer werden · Offizielles Panel',
      description: (v) =>
        `Atlas Pro Wiederverkäufer werden: Panel mit ${v.panels} Codes für je 12 Monate, Sofortlieferung, kostenlose Schulung, 24/7-Support. Preise per WhatsApp.`,
    },
    telecharger: {
      name: 'Download',
      title: 'Atlas Pro ONTV APK Download · Offizielle Apps',
      description: (v) =>
        `${v.ontv} (APK), ${v.max} und ${v.ibo} mit Downloader-Code herunterladen – plus die Player für iPhone, Smart TV, Windows und Mac.`,
    },
    contact: {
      name: 'Kontakt',
      title: 'Kontakt Atlas Pro · WhatsApp-Support 7 Tage die Woche',
      description: (v) =>
        `Eine Frage zu Ihrem Atlas Pro Abo oder zur Installation von Atlas Pro ONTV? Unser Support antwortet Ihnen per WhatsApp unter ${v.whatsapp}, 7 Tage die Woche.`,
    },
    mentions: {
      name: 'Impressum',
      title: 'Impressum · AtlasProTVOfficial',
      description: (v) =>
        `Impressum der Website ${v.domain}: Anbieter, Hosting und geistiges Eigentum. AtlasProTVOfficial, offizieller autorisierter Atlas Pro Vertriebspartner.`,
    },
    confidentialite: {
      name: 'Datenschutzerklärung',
      title: 'Datenschutzerklärung · AtlasProTVOfficial',
      description: () =>
        `Wie AtlasProTVOfficial die Daten verarbeitet, die Sie für Bestellung und Aktivierung Ihres Atlas Pro Abos per WhatsApp angeben, und welche Rechte Sie haben.`,
    },
    conditions: {
      name: 'AGB',
      title: 'AGB & Geld-zurück-Garantie · Atlas Pro ONTV',
      description: () =>
        `AGB des Atlas Pro ONTV Abos: Bestellung und Aktivierung über WhatsApp, Zahlung per PayPal oder SEPA-Überweisung, Geld-zurück-Garantie bei Unzufriedenheit.`,
    },
    notFound: {
      name: 'Seite nicht gefunden',
      title: 'Seite nicht gefunden · Atlas Pro ONTV',
      description: () =>
        `Diese Seite existiert nicht oder hat eine neue Adresse. Das Atlas Pro ONTV Abo, die Apps und die Installationsanleitungen finden Sie auf der Startseite.`,
    },
  },
}
