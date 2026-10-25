// English copy, home: hero, why Atlas Pro, history, sport, VOD, renewal CTA.
// Translation of ../fr/story.ts (owner: tr-en). Live sport: Full HD 1080p / H.265 only; 4K applies to VOD only.
import type { Dict } from '../types.ts'

export const story: Dict['story'] = {
  fmt: {
    plus: (n: string) => `${n}+`,
    lead: (n: string) => `+${n}`,
    thousands: (n: string) => `${n}K+`,
    /** English: no space before % (« 99.99% »). */
    percent: (n: string) => `${n}%`,
  },

  apps: {
    ontv: (v: string) => `Atlas Pro ONTV ${v}`,
    max: (v: string) => `Max v${v}`,
    ibo: (v: string) => `IBO v${v}`,
    maxFull: (v: string) => `Atlas Pro Max v${v}`,
    iboFull: (v: string) => `Atlas Pro IBO v${v}`,
  },

  hero: {
    badge: '✦ THE N°1 ATLAS PRO IPTV IN 2026',
    title: 'Discover Atlas Pro ONTV (2026)',
    subtitle:
      'IPTV Atlas Pro has established itself as the undisputed leader in streaming services. The Atlas Pro subscription remains, as ever, the absolute benchmark for quality, stability and user experience.',
    useCasesLabel: 'What matters to you',
    useCases: {
      uptime: (uptime: string) => `Ultra-Stable 2026 Infrastructure · ${uptime}`,
      sport: 'Live TV & Major Sporting Events in Full HD · H.265',
      vod: (films: string, series: string) => `${films} Films & ${series} Series on Demand`,
      apps: (versions: string) => `Official Suite: ${versions}`,
      support: (minutes: string) => `Official Distributor & Support < ${minutes} min`,
    },
    cta: 'Activate my Official Atlas Pro Code',
    pricingLink: 'See prices',
    guarantees: ['100% verified official code', 'Delivered by WhatsApp & Email', 'Full guarantee for the entire term'],
    stats: {
      channels: 'TV Channels Worldwide',
      titles: 'Films & Series',
      customers: 'Happy Customers (Atlas Pro ONTV Reviews)',
      uptime: 'Guaranteed Uptime',
    },
    visual: {
      online: 'Online',
      live: 'Live',
      liveQuality: 'Full HD 1080p · H.265',
      nav: ['Live TV', 'Films', 'Series', 'Replay'],
      vodRow: 'Films & Series',
      servers: 'European servers',
      support: (minutes: string) => `Support < ${minutes} min`,
    },
  },

  why: {
    title: 'Why Atlas Pro ON TV Leads the Market',
    leader: {
      title: 'IPTV Leader in France & Europe',
      text: (years: string) =>
        `Recognised for more than ${years} years, Atlas Pro ONTV is the N°1 official provider in France and across the French-speaking world, guaranteeing rock-solid stability for your Atlas Pro subscription.`,
      stamp: 'N°1',
      region: 'France & Europe',
    },
    tech: {
      title: 'Advanced Technology',
      text: 'Our servers are strategically located around the world to guarantee minimal latency, with latest-generation H.265 encoding for perfectly smooth playback.',
    },
    apps: {
      title: 'Official App Ecosystem (APK & Box)',
      text: (ontv: string, max: string, ibo: string) =>
        `Enjoy a seamless experience on all your devices. Download the Atlas Pro ONTV APK with ease, harness the power of Atlas Pro Max (Version ${max}), or use Atlas Pro IBO (v${ibo}). Our Atlas Pro ONTV ${ontv} app is optimised for every Android box, Smart TV and PC.`,
      tag: 'APK',
    },
    world: {
      title: 'Worldwide Coverage',
      text: 'The Atlas Pro ONTV app works everywhere: France, Belgium, Switzerland, Canada, the USA and many more. Total precision for your favourite channel packages.',
    },
    support: {
      title: '7-Day Support & Customer Reviews',
      text: (minutes: string) =>
        `Atlas Pro can't connect to the server? Our French-speaking technical team is available 7 days a week on WhatsApp, with a response time of under ${minutes} minutes.`,
      reviews: 'Read our Atlas Pro ONTV Reviews',
      response: (minutes: string) => `< ${minutes} min`,
    },
    value: {
      title: 'Savings & Value for Money',
      text: 'For the price of a single Atlas Pro subscription, get content equivalent to dozens of separate subscriptions (Sport, Cinema, World TV). The richest content at the best price.',
      tags: ['Sport', 'Cinema', 'World TV'],
    },
  },

  history: {
    title: 'The Atlas Pro Story',
    creation: {
      label: (year: string) => `FOUNDED (${year})`,
      title: 'The Birth of Atlas Pro',
      text: 'The Atlas Pro ONTV adventure began with a simple vision: to offer an accessible, reliable alternative to traditional streaming services.',
    },
    expansion: {
      label: 'EXPANSION',
      title: 'International Growth',
      text: (generation: string) =>
        `We developed our own dedicated apps (Atlas Pro ONTV ${generation}, Atlas Pro Max, Atlas Pro IBO) for an unrivalled user experience on every screen.`,
    },
    today: {
      label: 'TODAY',
      title: 'Market Leader',
      text: 'Atlaspro ONTV has become the absolute benchmark for quality, server stability and breadth of content.',
    },
    future: {
      label: 'FUTURE',
      title: 'Continuous Innovation',
      text: 'Our team works tirelessly on new features and the constant optimisation of your IPTV Atlas Pro.',
    },
  },

  sport: {
    title: 'Atlas Pro ON TV & Live Sport',
    text: (channels: string) =>
      `For sports fans, the Atlas Pro subscription is a true paradise. It includes all the major sports channels and more than ${channels} premium channels (TF1, France 2, M6, etc.). Thanks to our high-performance servers, you won't miss a single global event.`,
    pills: { football: 'Football', basketball: 'Basketball', tennis: 'Tennis', cars: 'Motorsport' },
    visual: {
      live: 'Live',
      quality: 'Full HD 1080p · H.265',
      channels: (channels: string) => `+${channels} premium channels`,
    },
  },

  vod: {
    title: 'Atlas Pro ONTV VOD (Films & Series)',
    text: (films: string, series: string) =>
      `The Atlas Pro VOD service offers more than ${films} films and ${series} series. A bottomless library, updated daily for your viewing pleasure.`,
    checks: {
      quality: (ontv: string) => `4K and Full HD quality (Optimised for ${ontv})`,
      subtitles: 'Multilingual subtitles (including French)',
      daily: 'Updated daily with the latest releases',
      compat: 'Compatible with Atlas Pro Max and Atlas Pro IBO',
    },
    categoriesLabel: 'Categories',
    categories: {
      action: 'Action',
      comedy: 'Comedy',
      drama: 'Drama',
      scifi: 'Sci-Fi',
      horror: 'Horror',
      romance: 'Romance',
      animation: 'Animation',
      documentary: 'Documentary',
    },
    visual: {
      allusion: 'Original productions from the biggest platforms in the world',
      episodes: (episodes: string) => `${episodes} episodes`,
      quality: '4K UHD & Full HD',
    },
  },

  renewal: {
    title: 'Join Atlas Pro ONTV Today',
    text: 'Discover the best of IPTV with Atlas Pro 2026. Enjoy the very best of television: live sport, the latest films and exclusive series.',
    subscribe: 'Subscribe Now (New Customer)',
    renew: 'Renew here (Enter your Atlas Pro Code)',
  },
}
