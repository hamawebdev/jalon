// English <title>, meta description and social/structured-data wording of every page. Translation of ../fr/meta.ts
// (owner: tr-en). Titles ≤ ~60 characters, descriptions ~140–160, English search phrasing (Atlas Pro subscription,
// Atlas Pro ONTV APK download…).
import type { Dict } from '../types.ts'

export const meta: Dict['meta'] = {
  siteName: 'AtlasProTVOfficial',
  ogImageAlt: 'Atlas Pro ONTV 2026 · Atlas Pro IPTV subscription from AtlasProTVOfficial, official authorised distributor',
  organizationDescription: 'No. 1 Official Authorised Atlas Pro Distributor in France & Europe.',
  productName: 'Atlas Pro ONTV Subscription',
  productDescription:
    '12-month Atlas Pro ONTV IPTV subscription for 1, 2 or 3 screens: live channels in Full HD, films and series on demand, replay, on Android, Smart TV, Fire TV Stick, iPhone and PC.',
  planNames: { premium: 'Premium', duo: 'Duo', famille: 'Famille' },
  offerName: (plan: string, screens: number, months: number) =>
    `${plan} · ${screens} screen${screens > 1 ? 's' : ''} · ${months} months`,
  pages: {
    home: {
      name: 'Home',
      title: 'Atlas Pro ONTV (2026) · Atlas Pro IPTV Subscription',
      description: (v) =>
        `Discover Atlas Pro ONTV 2026, the Atlas Pro on TV IPTV: +${v.channels} channels in Full HD, +${v.films} films and +${v.series} series. Atlas Pro subscription activated on WhatsApp.`,
    },
    boutique: {
      name: 'Shop',
      title: 'Shop · 12-Month Atlas Pro ONTV Subscription',
      description: (v) =>
        `Order your Atlas Pro ONTV subscription in 3 clicks: 1, 2 or 3 screens for 12 months, from ${v.priceFrom}. Pay by PayPal or SEPA transfer, codes sent on WhatsApp.`,
    },
    revendeur: {
      name: 'Reseller',
      title: 'Become an Atlas Pro ONTV Reseller · Official Panel',
      description: (v) =>
        `Become an Atlas Pro reseller: panels of ${v.panels} 12-month codes, instant delivery, free training and dedicated 24/7 support. Prices on WhatsApp.`,
    },
    telecharger: {
      name: 'Download',
      title: 'Atlas Pro ONTV APK Download · Official Apps',
      description: (v) =>
        `Download ${v.ontv} (APK), ${v.max} and ${v.ibo} with their Downloader codes, plus the players for iPhone, Smart TV, Windows and Mac.`,
    },
    contact: {
      name: 'Contact',
      title: 'Contact Atlas Pro · WhatsApp Support 7 Days a Week',
      description: (v) =>
        `A question about your Atlas Pro subscription or installing Atlas Pro ONTV? Our support team answers on WhatsApp at ${v.whatsapp}, 7 days a week.`,
    },
    mentions: {
      name: 'Legal notice',
      title: 'Legal Notice · AtlasProTVOfficial',
      description: (v) =>
        `Legal notice for ${v.domain}: publisher, hosting and intellectual property. AtlasProTVOfficial, official authorised Atlas Pro distributor.`,
    },
    confidentialite: {
      name: 'Privacy policy',
      title: 'Privacy Policy · AtlasProTVOfficial',
      description: () =>
        `How AtlasProTVOfficial handles the information you share to order and activate your Atlas Pro subscription on WhatsApp, and what your rights are.`,
    },
    conditions: {
      name: 'Terms & conditions',
      title: 'Terms & Conditions & Guarantee · Atlas Pro ONTV',
      description: () =>
        `Terms and conditions of the Atlas Pro ONTV subscription: ordering and activation on WhatsApp, payment by PayPal or SEPA transfer, money-back guarantee.`,
    },
    notFound: {
      name: 'Page not found',
      title: 'Page Not Found · Atlas Pro ONTV',
      description: () =>
        `This page does not exist or has moved. Find the Atlas Pro ONTV subscription, the apps and the installation guides from the home page.`,
    },
  },
}
