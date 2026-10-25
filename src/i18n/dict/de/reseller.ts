// German copy, Reseller page. Translation of ../fr/reseller.ts (same keys). Owner: tr-de.
// Never show a reseller price: the price zone always sends to WhatsApp.
import type { Dict } from '../types.ts'

export const reseller: Dict['reseller'] = {
  hero: {
    badge: 'PARTNERPROGRAMM & OFFIZIELLES PANEL',
    title: 'Offizieller Atlas Pro ONTV Wiederverkäufer werden',
    description: (uptime: string) =>
      `Bauen Sie Ihr eigenes Geschäft auf und erzielen Sie wiederkehrende Einnahmen mit der gefragtesten Premium-IPTV-Infrastruktur in Frankreich und Europa. Als Teil unseres offiziellen Atlas Pro Netzwerks erhalten Sie Zugang zu einem äußerst leistungsstarken, intuitiven und vollständig eigenständigen Verwaltungs-Panel (Wiederverkäufer-Panel). Verwalten, aktivieren und verlängern Sie die Codes Ihrer Kunden mit einem Klick in all unseren offiziellen Apps (Android, Google TV, PC) und Partner-Playern (iOS, Smart TV) – mit einer garantierten Serverstabilität von ${uptime}.`,
    points: [
      'Sofortige Bereitstellung Ihres Wiederverkäufer-Panels',
      'Dedizierter Wiederverkäufer-Support rund um die Uhr, 7 Tage die Woche',
      'KUNDENDIENST & SCHULUNG KOSTENLOS',
    ],
    seePanels: 'Panels ansehen',
  },

  panels: {
    label: 'Die Atlas Pro Wiederverkäufer-Panels',
    title: (codes: string) => `PANEL ATLAS PRO — ${codes} CODES`,
    featured: 'Beliebt',
    logoLabel: 'Atlas Pro ONTV',
    priceLabel: 'Wiederverkäuferpreis',
    priceText: 'Kontaktieren Sie unser Team auf WhatsApp',
    priceNote: '(Jahresabonnement)',
    features: {
      codes: (codes: string) => `${codes} ATLAS PRO CODES (12-Monats-Guthaben)`,
      channels: (count: string) => `+${count} Live-Sender aus aller Welt`,
      vod: (count: string) => `+${count} Filme & Serien auf Abruf (4K / FHD)`,
      replay: (days: string) => `${days} Tage Replay, EPG & Video on Demand`,
      service: 'KUNDENDIENST & SCHULUNG KOSTENLOS',
      delivery: 'Sofortige Bereitstellung Ihres Wiederverkäufer-Panels',
      support: 'Dedizierter Wiederverkäufer-Support rund um die Uhr, 7 Tage die Woche',
    },
    cta: 'Dieses Panel auf WhatsApp anfragen',
    guarantee: '100 % ZUFRIEDENHEITSGARANTIE',
  },

  why: {
    badge: 'ATLAS PRO WIEDERVERKÄUFER-PANEL',
    title: 'Ein Panel, das Ihr Geschäft wachsen lässt',
    items: {
      autonomous: {
        title: 'Leistungsstarkes, eigenständiges Panel',
        text: 'Ein intuitives, vollständig eigenständiges Verwaltungs-Panel (Wiederverkäufer-Panel), sofort bereitgestellt.',
      },
      oneClick: {
        title: 'Kunden mit einem Klick verwalten',
        text: 'Verwalten, aktivieren und verlängern Sie die Codes Ihrer Kunden mit einem Klick.',
      },
      apps: {
        title: 'Offizielle Apps & Partner-Player',
        text: 'Unsere offiziellen Apps (Android, Google TV, PC) und die Partner-Player (iOS, Smart TV).',
      },
      uptime: {
        title: 'Garantierte Serverstabilität',
        text: 'Die gefragteste Premium-IPTV-Infrastruktur in Frankreich und Europa.',
      },
      support: {
        title: 'Dedizierter Wiederverkäufer-Support rund um die Uhr',
        text: 'Kostenloser Kundendienst & Schulung für einen guten Start und die Betreuung Ihrer Kunden.',
      },
    },
  },

  cta: {
    title: 'Bauen Sie Ihr eigenes Geschäft mit Atlas Pro ONTV auf',
    text: 'Wiederverkäuferpreis: Kontaktieren Sie unser Team auf WhatsApp (Jahresabonnement). Wählen Sie Ihr Panel:',
    button: (codes: string) => `Panel ${codes} Codes`,
    guarantee: '100 % ZUFRIEDENHEITSGARANTIE',
  },
}
