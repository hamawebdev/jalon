// English copy, home device compatibility, brand pillars, reviews. Translation of ../fr/social.ts (owner: tr-en).
import type { Dict } from '../types.ts'
import type { ReviewVars } from '../fr/social.ts'

export const social: Dict['social'] = {
  compat: {
    title: 'Compatible with All Your Devices & Screens',
    highlight: 'All Your Devices',
    subtitle:
      'Discover universal compatibility and our installation guides to enjoy your Atlas Pro ONTV subscription on every screen.',
    guide: 'Installation guide',
    guideFor: (device: string) => `Installation guide: ${device}`,
    tv: {
      title: 'Televisions',
      description: 'Quick, straightforward setup on your Smart TV.',
      pills: ['Samsung', 'LG', 'Sony', '+2'],
    },
    android: {
      title: 'Android',
      suite: 'Official suite',
      players: 'Players',
      playerNames: ['IBO Player', 'Hot Player', 'IBO Player Smarter', 'Bob Player', 'TiviMate', 'Smarters Pro'],
      pills: ['Box', 'Phone', 'Tablet'],
    },
    apple: {
      title: 'Apple',
      description: 'A clear tutorial and smooth setup for Apple devices.',
      pills: ['iPhone', 'iPad', 'Apple TV'],
    },
    box: {
      title: 'Set-Top Boxes',
      description: 'High-performance installation on every model.',
      pills: ['Magbox', 'Formuler Z7', 'Formuler Z8'],
    },
  },

  pillars: {
    badge: '✦ ATLASPROTVOFFICIAL · AUTHORISED ATLAS PRO ONTV DISTRIBUTOR',
    title: 'What Sets Our Atlas Pro ONTV Service Apart!',
    subtitle:
      'Thousands of households in France, Belgium, Switzerland and Canada trust us with their TV evenings. Discover why our Atlas Pro subscribers stay loyal to us year after year.',
    distributor: {
      title: 'The High Standards of an Authorised Distributor (A Service Customers Love)',
      body: 'Our subscribers praise the transparency of our support and the exemplary consistency of the Atlas Pro ONTV streams, night after night, from the very first second of activation.',
      seal: 'Authorised Atlas Pro ONTV Distributor',
    },
    screens: {
      title: 'Compatible with All Your Screens',
      body: (apps: string) =>
        `Whether you use our free official apps (${apps}) or a partner player (IBO Player, Bob Player, Hot Player, Smarters Pro), your subscription works on Smart TV, Android Box, Firestick, Apple and PC.`,
      devices: ['Smart TV', 'Android Box', 'Firestick', 'Apple', 'PC'],
    },
    quality: {
      title: 'High-Fidelity Picture (Full HD H.265 & 4K VOD)',
      body: 'From data-saving 480p to ultra-smooth live Full HD 1080p, and up to Ultra HD 4K on VOD, the Atlas Pro stream adapts automatically to your internet speed without aggressive compression.',
      ladder: ['480p', 'Full HD 1080p · Live', 'Ultra HD 4K · VOD'],
    },
    infra: {
      title: 'Multi-Server European Anti-Freeze Infrastructure',
      body: (uptime: string) =>
        `A network of high-availability servers spread across Europe, designed to absorb audience peaks during major sporting events and guarantee ${uptime}% stability.`,
      stat: (uptime: string) => `${uptime}%`,
    },
    zapping: {
      title: (seconds: string) => `Lightning-Fast Zapping (< ${seconds}s)`,
      body: 'Switch from one channel to the next in a fraction of a second thanks to our optimised Atlas Pro ONTV streams, with no black screen and no loading time.',
      stat: (seconds: string) => `< ${seconds} s`,
    },
    support: {
      title: 'French-Speaking Help & Concierge Service 7 Days a Week',
      body: (phone: string, minutes: string) =>
        `A technical adviser personally guides you on WhatsApp (${phone}) within ${minutes} minutes, from payment confirmation right through to the full activation of your screen.`,
      stat: (minutes: string) => `< ${minutes} min`,
      cta: 'Message an adviser',
    },
  },

  reviews: {
    badge: '✦ VERIFIED TESTIMONIALS · ATLAS PRO ONTV REVIEWS 2026',
    title: 'What Atlas Pro ONTV Viewers Say About Our Portal',
    subtitle:
      'Read genuine feedback (Atlas Pro ONTV Reviews) from viewers who chose our official portal to activate and renew their subscription every year.',
    trust: {
      rating: (rating: string) => `${rating} / 5`,
      ratingLabel: 'Overall Rating (Atlas Pro ONTV Reviews)',
      customers: (customers: string) => `+${customers}`,
      customersLabel: 'Subscribers Supported & Retained',
      recommend: (percent: string) => `${percent}%`,
      recommendLabel: 'Recommend Our 7-Day Support',
    },
    stars: 'Rating: 5 out of 5',
    countries: { fr: 'France', be: 'Belgium', ch: 'Switzerland', ca: 'Canada' },
    cities: { thomas: 'Lyon', sophie: 'Quebec City', karim: 'Namur', marc: 'Bordeaux', lucas: 'Toulouse', nadia: 'Geneva' },
    from: (city: string, country: string, year: string) => `${city}, ${country} · ${year}`,
    screenshotAlt: (name: string) => `WhatsApp screenshot of ${name}'s review`,
    screenshotOpen: (name: string) => `Enlarge the WhatsApp screenshot of ${name}'s review`,
    screenshotPending: (name: string) => `WhatsApp screenshot of ${name}'s review`,
    items: {
      thomas: {
        badge: 'Instant Response',
        quote: (_v: ReviewVars) =>
          'I ordered my Atlas Pro ONTV subscription directly through their WhatsApp. Incredible response time: less than 3 minutes after my transfer, the adviser had already sent me my Atlas Pro Code and everything was working on my TV.',
      },
      sophie: {
        badge: 'Help & Courtesy',
        quote: (_v: ReviewVars) =>
          "I'm not great with technology, so I was worried I wouldn't know how to install Atlas Pro ONTV on my Samsung TV. The support team was remarkably patient: they activated my IBO Player and loaded my subscription remotely, step by step. A truly human service!",
      },
      karim: {
        badge: 'Stability & Full HD Sport',
        quote: (v: ReviewVars) =>
          `I tried several sellers before I found this official portal. With my Duo 2 Écrans plan and the new ${v.ontv} app (and ${v.max}), I watch all the big matches in Full HD H.265 without a single dropout.`,
      },
      marc: {
        badge: 'Trust & Transparency',
        quote: (v: ReviewVars) =>
          `What I appreciate here is the honesty and professionalism. As an authorised Atlas Pro distributor, they never ask for a bank card on the website, payment by PayPal and SEPA transfer is secure, and the prices are clear (${v.price} a year). You feel you can trust them straight away.`,
      },
      lucas: {
        badge: 'XXL Cinema & Gentle Prices',
        quote: (_v: ReviewVars) =>
          "Since we switched to Atlas Pro ONTV, our family evenings have really changed. The VOD catalogue is huge (+24,000 films and +6,200 series in 4K and FHD), we pick our episodes up right where we left off, and the price saves us a fortune.",
      },
      nadia: {
        badge: 'Loyalty & Follow-Up',
        quote: (v: ReviewVars) =>
          `This is the second year I've renewed my Atlas Pro Code with this team. One simple message on their WhatsApp and my access was extended for ${v.months} months in a matter of seconds, without losing my favourites on my Android Box.`,
      },
    },
    pills: {
      quality: 'Full HD H.265 Streams & 4K VOD',
      zapping: (seconds: string) => `Zapping < ${seconds}s`,
      servers: (uptime: string) => `Anti-Freeze Servers ${uptime}%`,
      price: (monthly: string) => `From ${monthly} / month`,
      catalogue: (films: string, series: string) => `+${films} Films & +${series} Series`,
      support: (minutes: string) => `WhatsApp Support < ${minutes} min`,
      apps: (ontv: string, max: string) => `Official Apps ${ontv} & ${max}`,
      replay: (days: string) => `Replay ${days} Days`,
    },
  },
}
