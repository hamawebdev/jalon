// English copy, Contact page. Translation of ../fr/contact.ts (owner: tr-en).
import type { Dict } from '../types.ts'

export const contact: Dict['contact'] = {
  badge: '✦ CONTACT & SUPPORT 7 DAYS A WEEK',
  title: 'Contact your official Atlas Pro distributor',
  subtitle:
    'A question before you order, a code to activate or renew, help with installation: our team answers you in French, 7 days a week.',

  whatsapp: {
    badge: 'Priority channel',
    title: 'WhatsApp',
    text: 'Orders, activation, renewal of your Atlas Pro Code and technical support: everything is handled here, directly with our team.',
    response: (minutes: number) => `Reply < ${minutes} min`,
    days: '7 days a week',
    french: 'In French',
    button: 'Message us on WhatsApp',
    tip: 'To speed things up, tell us your device and, for a renewal, your current code or username.',
  },

  email: {
    title: 'Email',
    text: 'For detailed requests and follow-up on your subscription.',
    pending: 'support email address',
  },

  telegram: {
    title: 'Telegram',
    text: 'Technical support and new versions of the official apps.',
    pending: 'Telegram link',
    open: 'Open Telegram',
  },

  help: {
    title: 'Find your answer in one click',
    install: {
      title: 'Installation Guides',
      text: 'Smart TV, Fire TV Stick, Android, iPhone, PC: step-by-step instructions for every device.',
    },
    faq: {
      title: 'Frequently Asked Questions',
      text: 'Ordering, activation, compatibility, renewal: answers to the most common questions.',
    },
    reseller: {
      title: 'Become a Reseller',
      text: 'Want to resell Atlas Pro? Discover our code panels.',
    },
  },
}
