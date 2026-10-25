// English copy, home FAQ. Translation of ../fr/faq.ts (owner: tr-en). Same items, same order, same block shapes.
import type { Dict } from '../types.ts'
import type { FaqInline, FaqItem, FaqWa } from '../fr/faq.ts'

const b = (text: string): FaqInline => ({ b: text })
const wa = (kind: FaqWa, number = false, text?: string): FaqInline => ({ wa: kind, number, text })

const items: FaqItem[] = [
  {
    id: 'order',
    q: () => 'How do I order an Atlas Pro ONTV subscription on our official portal?',
    a: (v) => [
      {
        p: [
          'Click the “Subscribe now” button in our ',
          { to: 'pricing', text: 'price list' },
          ` (Premium ${v.screens.premium} Écran at ${v.price.premium}, Duo ${v.screens.duo} Écrans at ${v.price.duo} or Famille ${v.screens.famille} Écrans at ${v.price.famille}). This opens a pre-filled conversation with our team directly on `,
          wa('activate', true),
          ' for immediate confirmation and activation.',
        ],
      },
    ],
  },
  {
    id: 'delivery',
    q: () => 'How soon will I receive my Atlas Pro Code and login details?',
    a: () => [
      {
        p: [
          'During our opening hours, your official ',
          b('Atlas Pro Code'),
          ' (along with your Xtream / M3U access) is sent on WhatsApp and by email almost instantly once payment is confirmed (usually within 3 to 15 minutes).',
        ],
      },
    ],
  },
  {
    id: 'email',
    q: () => "I haven't received the email within the expected time. Should I be worried?",
    a: () => [
      {
        p: [
          "No, don't worry. We send codes 7 days a week. If you can't find anything in your junk (spam) folder, simply message our team on ",
          wa('contact', true),
          ': an adviser will send you your Atlas Pro Code straight away.',
        ],
      },
    ],
  },
  {
    id: 'otherApps',
    q: () => 'Can I use my Atlas Pro ONTV subscription on other IPTV apps?',
    a: (v) => [
      {
        p: [
          `Yes, absolutely! As well as our ${v.appCount} free official apps (`,
          b(`Atlas Pro ONTV ${v.ontv}`),
          ', ',
          b(`Atlas Pro Max v${v.max}`),
          ', ',
          b(`Atlas Pro IBO v${v.ibo}`),
          ', ',
          b('Atlas Pro 9X'),
          '), we recommend excellent paid players such as IBO Player, IBO Player Smarter, Hot Player or Bob Player for Samsung/LG Smart TVs and Apple, or free players such as IPTV Smarters Pro (with Xtream or M3U login details).',
        ],
      },
    ],
  },
  {
    id: 'renew',
    q: () => 'How do I renew my current Atlas Pro Code?',
    a: (v) => [
      {
        p: [
          'Click the ',
          { to: 'renewal', text: '“Renew here (Enter your Atlas Pro Code)”' },
          ' button or contact us directly on ',
          wa('renewal'),
          ` with your current code or username. As soon as your payment (PayPal or SEPA) is confirmed, your subscription is extended for ${v.months} months within minutes.`,
        ],
      },
    ],
  },
  {
    id: 'keepFavorites',
    q: () => 'Can I renew and keep my favourites and my current app?',
    a: () => [
      {
        p: ['Yes! You keep the app you have already installed and your favourites lists, with no need to reinstall anything.'],
      },
    ],
  },
  {
    id: 'download',
    q: (v) => `How do I download the official Atlas Pro ONTV ${v.ontv} APK and Atlas Pro Max v${v.max}?`,
    a: () => [
      {
        p: [
          'Go to our ',
          { to: 'install', text: '“Installation Guides & Download”' },
          ' section just above: click the violet APK download button for the version you want, or enter its official Downloader Code in the Downloader app on your TV/Box/Firestick.',
        ],
      },
    ],
  },
  {
    id: 'activation',
    q: (v) =>
      `What is the difference in activation between Atlas Pro ONTV ${v.ontv}, Atlas Pro Max v${v.max}, IBO v${v.ibo} and 9X?`,
    a: (v) => [
      {
        ul: [
          [b(`Atlas Pro ONTV ${v.ontvLine} (v${v.ontv}):`), ' Activates only with your Code Active (Atlas Pro Code).'],
          [
            b(`Atlas Pro Max (Version ${v.max}):`),
            ' Activates either with your Code Active OR with Username + Password.',
          ],
          [b(`Atlas Pro IBO (Version ${v.ibo}):`), ' Activates with your Code Active.'],
          [b('Atlas Pro 9X:'), ' Activates with Username + Password.'],
        ],
      },
      {
        note: [
          b('Please note:'),
          ' do not buy the Fire TV Stick HD 2nd generation running the closed Vega OS system, as it blocks the Downloader app.',
        ],
      },
    ],
  },
  {
    id: 'replace',
    q: () => 'What replaces Atlas Pro ON TV in 2026?',
    a: (v) => [
      {
        p: [
          `Nothing replaces the original: in 2026, Atlas Pro ONTV reinvented itself with its own next-generation official suite (Atlas Pro ONTV v${v.ontv}, Atlas Pro Max v${v.max}, Atlas Pro IBO v${v.ibo} and Atlas Pro 9X), powered by a new anti-dropout European server architecture with ${v.uptime}% uptime.`,
        ],
      },
    ],
  },
  {
    id: 'countries',
    q: () => 'Does the Atlas Pro ONTV subscription work in France, Belgium, Switzerland, Canada and abroad?',
    a: () => [
      {
        p: [
          'Yes, our service works anywhere in the world as long as you have a stable internet connection (France, Belgium, Switzerland, Canada, Europe, the USA, North Africa, etc.), with no VPN needed.',
        ],
      },
    ],
  },
  {
    id: 'screens',
    q: () => 'Can I use my subscription on several screens at the same time?',
    a: (v) => [
      {
        p: [
          `The Premium plan (${v.price.premium}) includes ${v.screens.premium} active screen. If you want to watch on several screens at once as a family, go straight for our `,
          { to: 'pricing', text: `Duo ${v.screens.duo} Écrans Plan` },
          ` (${v.price.duo} / ${v.months} months) or our `,
          { to: 'pricing', text: `Famille ${v.screens.famille} Écrans Plan` },
          ` (${v.price.famille} / ${v.months} months), which give you ${v.screens.duo} or ${v.screens.famille} independent official codes!`,
        ],
      },
    ],
  },
  {
    id: 'oldTv',
    q: () => 'I have an older TV (not a Smart TV). What solution do you offer?',
    a: () => [
      {
        p: [
          "Simply plug a certified Android TV Box (Xiaomi Mi Box, Mecool, Formuler) or an Amazon Fire TV Stick 4K / 4K Max (running Fire OS) into your TV's HDMI port to turn it into an ultra-fast Smart TV compatible with all our free apps.",
        ],
      },
    ],
  },
  {
    id: 'trust',
    q: () => 'Why trust our official portal as an authorised distributor?',
    a: (v) => [
      {
        p: [
          `We are the leading authorised portal in France and Europe, with more than ${v.customers} happy customers, 100% official codes guaranteed for ${v.months} months, no bank card charges on the website (secure payment via PayPal or SEPA), a money-back guarantee and human technical support that replies in under ${v.supportMinutes} minutes on `,
          wa('contact'),
          '.',
        ],
      },
    ],
  },
  {
    id: 'samsungLg',
    q: (v) => `Why is the app on my Samsung or LG TV paid (~${v.playerPrice}), and how do I activate it?`,
    a: (v) => [
      {
        p: [
          `As the official Atlas Pro app is not available on the closed Samsung and LG stores, you need to use a partner player (IBO Player, IBO Player Smarter, Hot Player, Bob Player), which costs around ${v.playerPrice} / year (after a ${v.trialDays}-day free trial). These players offer flawless stability, an instant EPG and resume VOD playback at the exact second you stopped.`,
        ],
      },
      {
        p: [
          'To make life easier, our team can activate the player for you and load your Atlas Pro subscription into it at the same time: just send us your MAC address and Device Key on ',
          wa('help', true),
          '!',
        ],
      },
    ],
  },
  {
    id: 'content',
    q: () => 'What content and channels are included in the Atlas Pro 2026 subscription?',
    a: (v) => [
      {
        p: [
          `Your subscription includes +${v.channels} live channels (France, Europe, International, including +${v.sportsChannels} premium sports channels in Full HD H.265), +${v.films} films and +${v.series} series (${v.episodes} episodes) in 4K and Full HD, updated daily, plus ${v.replayDays}-day Replay on +${v.replayChannels} channels.`,
        ],
      },
    ],
  },
  {
    id: 'connect',
    q: () =>
      'How do I fix “Atlas Pro can’t connect to the server”, “Atlas Pro ON TV playback error” or “Why is Atlas Pro TV not working”?',
    a: (v) => [
      {
        cards: [
          [
            b('Case No. 1 — On the official Atlas Pro app (Android / TV Box):'),
            ' The messages “Atlas Pro can’t connect to the server” or “playback error” usually appear when you are using an old version of the app, after a temporary bug, or because of incompatibility with an Android system that is too old (our apps are optimised for Google TV televisions, smartphones and TV boxes running a recent Android version). ',
            b('Solution:'),
            ` Try re-entering your details, clear the app's cache in your device settings and then sign in again, or install the latest official update (Atlas Pro ONTV ${v.ontv} or Atlas Pro Max v${v.max}).`,
          ],
          [
            b('Case No. 2 — “Playlist not working” message on IBO Player, Hot Player, Bob Player or IBO Smarter:'),
            ' On these players, this error most often means that the shared server link (URL) needs updating. All you need to do is change the link or refresh the server data. ',
            b('Immediate solution:'),
            ' Simply contact our support team on ',
            wa('contact', true),
            '; our technicians will refresh your link and restore your playlist remotely in seconds!',
          ],
        ],
      },
    ],
  },
  {
    id: 'apple',
    q: () => 'How does Atlas Pro work on iPhone, iPad or Apple TV (Free vs Paid)?',
    a: (v) => [
      {
        p: [
          'As the native Atlas Pro app (and Atlas Pro Prime) is not available on iOS/tvOS, you have 2 options on the App Store:',
        ],
      },
      {
        ol: [
          [
            b('Free:'),
            ' Download Smarters Pro IPTV (Smarters Player Lite) and ask our team on ',
            wa('help'),
            ' for your Xtream (URL + Username + Password) or M3U login details.',
          ],
          [
            b(`Recommended paid option (~${v.playerPrice} / year):`),
            ' Download IBO Player, Hot Player, IBO Player Smarter or Bob Player for maximum smoothness and VOD resume playback.',
          ],
        ],
      },
    ],
  },
  {
    id: 'smarters',
    q: () => 'INFO for LG & SAMSUNG users: the Smarters app shows the error “Failed to authorize”. What should I do?',
    a: () => [
      {
        p: [
          'The old edition of Smarters on Samsung and LG TVs regularly runs into bugs (“Failed to authorize”) unrelated to our servers. Download the latest Smarters Pro update from your store, or switch to IBO Player / Hot Player / Bob Player with help from our team on ',
          wa('help', true),
          ' for lasting stability.',
        ],
      },
    ],
  },
  {
    id: 'serverLink',
    q: () => "The server link or my code doesn't work when I enter my details. Why?",
    a: () => [
      {
        p: [
          'First make sure the URL starts with ',
          { code: 'http://' },
          ' (without an “s”). To guarantee maximum security and stability in France and Europe, we regularly update our private server connections. Simply contact our support team on ',
          wa('help', true),
          ' to receive your updated settings instantly, or let our team set up your screen.',
        ],
      },
    ],
  },
  {
    id: 'enterCode',
    q: () => 'How do I enter the Atlas Pro code and where do I find my Atlas Pro username?',
    a: (v) => [
      {
        p: [
          'You receive your Atlas Pro Code and your Atlas Pro username directly on WhatsApp and by email as soon as your order is confirmed on our official portal.',
        ],
      },
      {
        p: [
          b('How do I enter the Atlas Pro code?'),
          ` Simply open the Atlas Pro ONTV ${v.ontv} app (or IBO v${v.ibo}), type your code into the dedicated field (“Code Active”) and confirm. On Atlas Pro Max v${v.max} or Atlas Pro 9X, you can sign in directly with your username and password.`,
        ],
      },
    ],
  },
  {
    id: 'changeCode',
    q: () => 'How do I change the code on Atlas Pro ONTV?',
    a: () => [
      {
        p: [
          'To change the code on Atlas Pro ONTV (for example with a new subscription or a change of plan), go to the app’s home screen and click ',
          b('Log out / Switch user'),
          ', or go to your Android device settings (',
          b('Apps > Atlas Pro ONTV > Clear data and cache'),
          '). Then relaunch the app and enter your new Atlas Pro Code.',
        ],
      },
    ],
  },
  {
    id: 'installTv',
    q: () => 'How do I install Atlas Pro on my TV (Samsung, LG, TCL, Sony), and how do I put Atlas Pro on a TV?',
    a: (v) => [
      {
        p: [
          'Wondering how to put Atlas Pro on your TV or how to install Atlas Pro on a TV? The method depends on your TV brand:',
        ],
      },
      {
        ul: [
          [
            b('How to install Atlas Pro on a TCL, Sony, Philips or Xiaomi TV (Android TV / Google TV):'),
            ' Install the free Downloader app from the Google Play Store, then enter ',
            { to: 'apps', text: 'our Downloader code' },
            ` to download the Atlas Pro ONTV ${v.ontv} APK for free.`,
          ],
          [
            b('How to install Atlas Pro on a Samsung TV and how to install Atlas Pro ONTV on an LG TV:'),
            " Open your TV's official store, install IBO Player, Hot Player, Bob Player or IBO Smarter Player, then send your MAC address and Device Key to our team on ",
            wa('help', true),
            ', who will activate your screen remotely in 2 minutes.',
          ],
        ],
      },
    ],
  },
  {
    id: 'fireTv',
    q: () => 'How do I install Atlas Pro on Fire TV, and how do I install Atlas Pro ONTV on Chromecast and iPad?',
    a: (v) => [
      {
        ul: [
          [
            b('How to install Atlas Pro on Fire TV and how to install Atlas Pro ONTV on Chromecast:'),
            ' Download the Downloader app on your Amazon Fire TV Stick (4K, Max, Lite) or your Chromecast with Google TV, allow unknown sources, and enter ',
            { to: 'apps', text: 'the download code' },
            ` of our free suite (Atlas Pro ONTV ${v.ontv}, Max v${v.max}, IBO v${v.ibo} or 9X).`,
          ],
          [
            b('How to install Atlas Pro on iPad and iPhone:'),
            ' Go to the App Store, download a free player (Smarters Pro IPTV) or a high-performance player (IBO Player, Hot Player, Bob Player) and contact our ',
            wa('help', false, 'WhatsApp support'),
            ' to receive your Xtream / M3U login details or activate your device.',
          ],
        ],
      },
    ],
  },
  {
    id: 'cast',
    q: () => 'How do I cast Atlas Pro ONTV to my TV?',
    a: () => [
      {
        p: [
          'To cast Atlas Pro ONTV from your smartphone or tablet to your TV, make sure both devices are connected to the same Wi-Fi network, then use the Cast / Screen mirroring feature (Chromecast or AirPlay). However, for optimal smoothness with no latency (Full HD H.265 for live TV, 4K for VOD), we recommend installing the app directly on your Smart TV, Fire TV Stick, Chromecast with Google TV or Android Box.',
        ],
      },
    ],
  },
]

export const faq: Dict['faq'] = {
  badge: 'HELP, SUPPORT & OFFICIAL FAQ',
  title: 'Frequently Asked Questions – ATLAS PRO ONTV',
  titleHighlight: 'ATLAS PRO ONTV',
  subtitle:
    'Everything you need to know before, during and after ordering your Atlas Pro ONTV subscription on our official portal.',
  help: {
    title: "Can't find your answer?",
    text: (minutes: string) =>
      `Our human technical support team replies in under ${minutes} minutes on WhatsApp, 7 days a week.`,
    button: 'Message WhatsApp support',
  },
  whatsapp: 'WhatsApp',
  items,
}
