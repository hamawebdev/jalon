// English copy, Download page. Translation of ../fr/downloads.ts (owner: tr-en).
import type { Dict } from '../types.ts'

export const downloads: Dict['downloads'] = {
  suite: {
    badge: 'OFFICIAL APP',
    title: {
      ontv: 'ATLAS PRO ONTV',
      and: '&',
      max: 'MAX',
      maxVersion: (version: string) => `V${version}`,
    },
    description:
      'Enjoy a seamless experience on all your devices with our suite of official apps, compatible with smartphones, tablets, TVs and computers.',
    versions: {
      label: 'Official and secondary Atlas Pro editions',
      mainTitle: 'Main Official Editions (Latest Versions)',
      secondaryTitle: 'Secondary Editions Available',
      version: (version: string) => `Version ${version}`,
      alsoVersion: (version: string) => `version ${version}`,
      short: (version: string) => `v${version}`,
      status: {
        latest: 'Latest official version',
        new: 'New version',
        previous: 'Previous version',
      },
    },
    noteLabel: 'Compatibility note:',
    note: 'The official Atlas Pro app is available on Android devices, recent Google TV televisions and all Android-based TV boxes (Formuler, Xiaomi, Mecool, etc. — a recent Android version is recommended for optimal performance). Dedicated official versions are also available for computers running Windows, macOS and Linux.',
    keyPoints: ['Ultra-fast zapping', 'Intuitive interface', 'Built-in EPG'],
    compatLabel: 'Compatible devices',
    compat: ['Smart TV', 'Android & TV Box', 'Fire Stick', 'iOS', 'Windows / macOS / Linux', 'Multi-screen'],
    cta: 'See downloads',
    media: {
      label: 'Preview of the official Atlas Pro app interface',
      tabs: ['Live', 'Films', 'Series', 'Replay'],
      epg: 'EPG',
      now: 'Now',
      next: 'Next',
    },
  },

  hub: {
    badge: 'DOWNLOAD · APPS & PLAYERS',
    title: 'Download Atlas Pro ONTV: Complete Hub of Apps & Players by System',
    subtitle:
      'Choose your system: Android, iOS & Apple or Windows PC & Mac. On Android, Google TV, TV Box, Fire TV Stick and PC, our official Atlas Pro ONTV apps are 100% free.',
    navLabel: 'Choose your system',
    count: (n: number) => (n > 1 ? `${n} apps` : `${n} app`),
    groups: {
      android: {
        nav: 'Android',
        title: 'Android · Fire Stick · Google TV · Android Box',
        intro:
          'Atlas Pro ONTV APK and the whole official suite: enter the Downloader Code in the Downloader app on your Fire TV Stick, Google TV or Android Box, or download the APK file directly. Then activate your Atlas Pro Code.',
        officialTitle: 'Official Atlas Pro apps (Free)',
        partnersTitle: 'Partner players on Android & Fire Stick',
      },
      apple: {
        nav: 'iOS & Apple',
        title: 'iOS & Apple (iPhone · iPad · Apple TV)',
        intro:
          'The official Atlas Pro app is not available on iOS: download one of our partner players from the App Store and send us its MAC address + Device Key on WhatsApp. Our team can activate the app directly and load your Atlas Pro subscription at the same time!',
      },
      computers: {
        nav: 'Windows PC & Mac',
        title: 'Windows PC & Mac (macOS) & Linux',
        intro:
          'Download our dedicated official versions of Atlas Pro for Windows PC (.EXE), macOS or Linux directly, launch the app and sign in with your Atlas Pro Code (or your login details).',
        officialTitle: 'Official Atlas Pro apps (Free)',
        partnersTitle: 'Partner players (Windows PC)',
      },
    },
    playersPrice: (price: string, days: number) => `Paid Players (~${price} / year · ${days}-day free trial)`,
    card: {
      free: 'Free',
      codeLabel: 'Downloader Code',
      copy: 'Copy',
      copied: 'Copied!',
      copyAria: (code: string) => `Copy Downloader Code ${code}`,
      download: (name: string) => `Download ${name} now`,
      activationLabel: 'Activation:',
      activation: { code: 'Atlas Pro Code', login: 'Username + password' },
      or: 'or',
      systems: {
        android: 'Android / Google TV / Fire Stick',
        androidOnly: 'Android',
        ios: 'iOS / App Store',
        windows: 'Windows PC',
        mac: 'macOS',
        linux: 'Linux',
      },
      buttonSystems: { ios: 'iOS', windows: 'Windows', mac: 'macOS', linux: 'Linux' },
      withSystem: (name: string, system: string) => `${name} (${system})`,
      windowsRequirement: 'Windows x64 (10+)',
    },
    partnerNames: { iboPlayerPro: 'IBO Player Pro', hotPlayer: 'Hot Player', bobPlayer: 'Bob Player' },
  },

  help: {
    title: 'Stuck on a step? We’ll set up your device with you.',
    subtitle:
      'Send a message to our support team on WhatsApp: we will guide you step by step or activate your Atlas Pro subscription and your player directly, remotely.',
    whatsapp: 'Get help on WhatsApp',
    guides: 'See the installation guides',
    shopLead: 'Not a subscriber yet?',
    shop: 'Choose my plan in the Shop',
  },
}
