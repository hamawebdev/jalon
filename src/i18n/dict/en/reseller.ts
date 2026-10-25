// English copy, Reseller page. Translation of ../fr/reseller.ts (owner: tr-en).
// Never show a reseller price: the price zone always sends to WhatsApp.
import type { Dict } from '../types.ts'

export const reseller: Dict['reseller'] = {
  hero: {
    badge: 'PARTNER PROGRAMME & OFFICIAL PANEL',
    title: 'Become an Official Atlas Pro ONTV Reseller',
    description: (uptime: string) =>
      `Grow your own business and generate recurring revenue with the most sought-after premium IPTV infrastructure in France and Europe. By joining our official Atlas Pro network, you get access to an ultra-powerful, intuitive and fully self-service administration panel (Reseller Panel). Manage, activate and renew your customers' codes in one click across all our official apps (Android, Google TV, PC) and partner players (iOS, Smart TV), with server stability guaranteed at ${uptime}.`,
    points: ['Instant delivery of your Reseller Panel', 'Dedicated Reseller Support 24/7', 'FREE AFTER-SALES SERVICE & TRAINING'],
    seePanels: 'See the panels',
  },

  panels: {
    label: 'Atlas Pro reseller panels',
    title: (codes: string) => `ATLAS PRO PANEL — ${codes} CODES`,
    featured: 'Popular',
    logoLabel: 'Atlas Pro ONTV',
    priceLabel: 'Reseller Price',
    priceText: 'Contact our team on WhatsApp',
    priceNote: '(annual subscription)',
    features: {
      codes: (codes: string) => `${codes} ATLAS PRO CODES (12-month credits)`,
      channels: (count: string) => `+${count} Live Channels Worldwide`,
      vod: (count: string) => `+${count} VOD Films & Series (4K / FHD)`,
      replay: (days: string) => `${days}-Day Replay, EPG & Video on Demand`,
      service: 'FREE AFTER-SALES SERVICE & TRAINING',
      delivery: 'Instant delivery of your Reseller Panel',
      support: 'Dedicated Reseller Support 24/7',
    },
    cta: 'Request this Panel on WhatsApp',
    guarantee: '100% SATISFACTION GUARANTEE',
  },

  why: {
    badge: 'ATLAS PRO RESELLER PANEL',
    title: 'A panel designed to grow your business',
    items: {
      autonomous: {
        title: 'Ultra-powerful, self-service panel',
        text: 'An intuitive, fully self-service administration panel (Reseller Panel), delivered instantly.',
      },
      oneClick: {
        title: 'Manage your customers in one click',
        text: "Manage, activate and renew your customers' codes in one click.",
      },
      apps: {
        title: 'Official apps & partner players',
        text: 'Our official apps (Android, Google TV, PC) and partner players (iOS, Smart TV).',
      },
      uptime: {
        title: 'Guaranteed server stability',
        text: 'The most sought-after premium IPTV infrastructure in France and Europe.',
      },
      support: {
        title: 'Dedicated Reseller Support 24/7',
        text: 'Free after-sales service & training to help you get started and support your customers.',
      },
    },
  },

  cta: {
    title: 'Grow your own business with Atlas Pro ONTV',
    text: 'Reseller Price: Contact our team on WhatsApp (annual subscription). Choose your panel:',
    button: (codes: string) => `${codes}-Code Panel`,
    guarantee: '100% SATISFACTION GUARANTEE',
  },
}
