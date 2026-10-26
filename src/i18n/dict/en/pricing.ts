// English copy, home how-to-buy, pricing cards, reassurance band; Shop page with the order configurator.
// Translation of ../fr/pricing.ts (owner: tr-en). Badges are written in normal case (the Badge component capitalises).
import type { Dict } from '../types.ts'

/** « 1, 2 or 3 » */
const orList = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} or ${items[items.length - 1]}`

export const pricing: Dict['pricing'] = {
  howTo: {
    badge: '🛒 How it works',
    title: 'How to buy your Atlas Pro ONTV subscription',
    highlight: 'subscription',
    subtitle: (minutes: string) =>
      `From your order to your first programme in under ${minutes} minutes. Here is how to activate your Atlas Pro subscription, quickly and simply.`,
    step: (n: string) => `Step ${n}`,
    steps: {
      choose: {
        title: 'Choose your plan',
        text: (screens: string[], months: string) =>
          `Select the Atlas Pro subscription plan that suits you best: ${orList(screens)} screens for ${months} months.`,
        time: '1 minute',
      },
      pay: {
        title: (pct: string) => `${pct} Secure Payment`,
        text: 'Pay with complete peace of mind via PayPal or Bank Transfer (SEPA). Your transactions are end-to-end encrypted for your security.',
        time: '2 minutes',
      },
      receive: {
        title: 'Receive your codes instantly',
        text: 'Your login details and your Atlas Pro Code arrive immediately by WhatsApp and email (in under 30 seconds). No waiting.',
        time: '< 30 seconds',
      },
      install: {
        title: 'Install and watch!',
        text: (channels: string) =>
          `Download the Atlas Pro ONTV app (or use the Atlas Pro ONTV APK, Atlas Pro Max and IBO), enter your codes and instantly enjoy more than ${channels} live channels.`,
        time: 'Instant',
      },
    },
    timeLabel: 'Time',
  },

  plans: {
    badge: '🏷️ Prices & subscriptions',
    title: 'Choose your Atlas Pro ONTV plan',
    highlight: 'plan',
    subtitle:
      "Let's be honest: there are dozens of IPTV services out there, but few of them keep their promises. Atlas Pro ONTV is one of those exceptions. Try it risk-free — money back if it is not right for you.",
    names: {
      premium: 'Premium 1 Écran',
      duo: 'Duo 2 Écrans',
      famille: 'Famille 3 Écrans',
    },
    popular: 'Most popular',
    limited: '🔥 Limited offer',
    per: (months: string) => `/ ${months} months`,
    perMonth: (price: string) => `Just ${price} / month`,
    cta: 'Subscribe now',
    featuresLabel: (plan: string) => `Included in the ${plan} plan`,
    features: {
      codesOne: (months: string) => `1 official activation code (Atlas Pro Code) for ${months} months`,
      codesMany: (count: string) => `${count} official activation codes (Atlas Pro Code) for ${count} screens`,
      quality: '4K, FHD, HD and SD quality',
      antiFreeze: 'Anti-Freeze System included',
      replay: (days: string) => `${days}-Day Replay + Full TV Guide (EPG)`,
      support: (pct: string) => `${pct} French-speaking customer support`,
      supportVip: (pct: string) => `${pct} French-speaking VIP support`,
      links: 'Personalised links of your choice: Xtream Codes or M3U format',
      assistance: 'Installation assistance and after-sales support',
      warranty: 'Guarantee and official activation',
      apps: (apps: string) => `Access to all apps (${apps})`,
    },
    boutiqueLink: 'Order in 3 clicks in the Shop',
  },

  trust: {
    label: 'Guarantees and payment methods',
    secure: (pct: string) => `${pct} secure payment`,
    instant: 'Instant activation',
    protected: (pct: string) => `${pct} protected & guaranteed access`,
    payment: 'Payment:',
    methods: {
      paypal: 'PayPal',
      sepa: 'Bank transfer / SEPA',
    },
  },

  reassurance: {
    label: 'Our commitments',
    renewal: {
      title: 'Easy Renewal',
      text: 'Extend your Atlas Pro Code in one click on WhatsApp without reinstalling your apps or losing your favourites.',
      cta: 'Renew on WhatsApp',
    },
    activation: {
      title: 'Fast Activation',
      text: 'Official Atlas Pro Code, Xtream login details and M3U link sent instantly on WhatsApp and by email once your payment is confirmed.',
    },
    guarantee: {
      title: 'Guarantee & Ongoing Follow-Up (Money Back if Not Satisfied)',
      text: (months: string) =>
        `Personalised support and a full continuity guarantee throughout your ${months}-month subscription.`,
    },
  },

  configurator: {
    badge: '🛍️ Express Shop · Order in 3 clicks',
    title: 'Set Up Your Atlas Pro ONTV Subscription in 10 Seconds',
    subtitle:
      'Select your device, the number of codes you want and your payment method to receive your access immediately on WhatsApp.',
    stepA: { letter: 'A', title: 'What is your device?' },
    stepB: { letter: 'B', title: 'How many Atlas Pro codes would you like?' },
    stepC: { letter: 'C', title: 'Your preferred payment method' },
    step: (letter: string) => `Step ${letter}`,
    devices: {
      androidBox: 'Android TV Box',
      samsung: 'Samsung Smart TV',
      lg: 'LG Smart TV',
      firestick: 'Fire TV Stick',
      googleTv: 'Android TV / Google TV',
      apple: 'iPhone / iPad / Apple TV',
      pc: 'Windows PC / Mac',
      formuler: 'Formuler / MAG',
    },
    codes: (count: number) => (count === 1 ? '1 Atlas Pro Code' : `${count} Atlas Pro Codes`),
    codesDetail: (plan: string, months: string) => `${plan} · ${months} Months`,
    price: (price: string) => `Price: ${price}`,
    popular: 'Popular',
    payments: {
      sepa: 'Bank Transfer (SEPA)',
      paypal: 'PayPal',
    },
    summary: 'Your order',
    summaryDevice: 'Device',
    summaryOffer: 'Plan',
    summaryPayment: 'Payment',
    notChosen: 'To choose',
    total: 'Total',
    totalFor: (months: string) => `for ${months} months`,
    cta: (price: string) => `Order Now on WhatsApp (${price})`,
    needDevice: 'Choose your device first (Step A).',
    needPayment: 'Choose your payment method (Step C).',
    ready: 'Your order goes to WhatsApp already written: all you have to do is send it.',
    boutiqueLink: 'Open the Shop',
  },

  boutique: {
    badge: 'Official Authorised Atlas Pro ONTV Distributor',
    title: 'Atlas Pro ONTV Shop',
    intro:
      'Order your Atlas Pro subscription in 3 clicks: your device, the number of codes and your payment method. Your order goes straight to WhatsApp and your official Atlas Pro Code is sent to you as soon as payment is confirmed, by PayPal or Bank Transfer (SEPA).',
  },
}
