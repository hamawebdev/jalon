// English copy, home installation hub. Translation of ../fr/install.ts (owner: tr-en).
// Inline markers ({wa}, {price}, {app:…}, **…**, `…`, [text](#anchor)) are kept exactly as in the French.
import type { InstallCopy } from '../fr/install.ts'

export const install: InstallCopy = {
  badge: '✨ Visual guides 2026 · Authorised Atlas Pro ONTV distributor',
  title: 'Atlas Pro ONTV Installation 2026: Interactive Step-by-Step Guides & APK Download',
  subtitle: (minutes) =>
    `Select the device you want to watch on, then follow the simple steps. Most of our subscribers are up and running in under ${minutes} minutes.`,
  kpis: {
    fast: { value: (minutes) => `< ${minutes} min`, label: 'Quick Installation' },
    compat: { value: '100%', label: 'Compatible with Every Screen' },
    support: { value: '7 days · 24/7', label: 'Technical Support Included' },
  },

  selector: {
    title: 'Choose your device',
    hint: 'The step-by-step guide for your device appears just below.',
    listLabel: 'Devices',
    change: 'Change device',
    current: 'Your device',
    devices: {
      smartTv: { name: 'Smart TV', detail: 'Samsung Tizen, LG webOS, Sony, Philips...' },
      firestick: { name: 'Amazon Firestick', detail: 'Fire TV Stick 4K / Max / Lite / Cube' },
      android: { name: 'Android', detail: 'Phone, Tablet, Google TV, Xiaomi / Mecool TV Box' },
      apple: { name: 'iPhone / iPad / Apple TV', detail: 'iOS, iPadOS & tvOS' },
      windows: { name: 'Windows PC', detail: 'Official app & Microsoft Store' },
      mac: { name: 'Mac', detail: 'macOS' },
      linux: { name: 'Linux', detail: 'Official app & Players' },
      mag: { name: 'MAG Box & Formuler / Dreamlink', detail: 'MyTVOnline 2 & 3' },
      shield: { name: 'Nvidia Shield', detail: 'High-Performance Android TV' },
    },
  },

  stepLabel: (n) => `Step ${n}`,

  guides: {
    smartTv: {
      kicker: 'Smart TV (Samsung Tizen & LG WebOS)',
      title: 'How to install Atlas Pro ONTV on Samsung & LG TV',
      blocks: [
        {
          kind: 'notice',
          tone: 'info',
          title: '💡 IMPORTANT NOTE (SAMSUNG & LG TV vs ANDROID TV)',
          body: [
            "The native **Atlas Pro ONTV** app is not directly available on the official Samsung (Tizen) and LG (WebOS) stores. The high-performance players compatible with these TVs (**IBO Player / IBO Player Pro**, **IBO Player Smarter**, **Hot Player**, **Bob Player**) are **independent paid apps (around ~{price} / year after a {trial}-day free trial)**. They guarantee an instant EPG guide, flawless Full HD stability (4K on VOD) and resume films and series at the exact second you stopped. Although you can activate them yourself, **we strongly recommend letting our technical team handle the full activation of the app AND load your Atlas Pro subscription at the same time**: simply send us your **MAC Address** and **Device Key** on {wa}, and our team takes care of everything from A to Z!",
            '(Note: For Sony, TCL and Xiaomi TVs running Android TV / Google TV, the official Atlas Pro app is 100% free via Downloader.)',
          ],
        },
        {
          kind: 'notice',
          tone: 'warn',
          title: '⚠️ Smarters Pro Warning on Smart TV',
          body: [
            "We advise against using the old IPTV Smarters Pro version on Samsung and LG TVs (it causes dropouts, freezes and authorisation errors unrelated to our server). **Why choose the paid players (IBO Player, IBO Player Smarter, Bob Player, Hot Player)?** They offer a **{trial}-day free trial**, flawless Full HD stability (4K on VOD), instant EPG guide loading and **resume your films and series at the exact second you stopped**.",
          ],
        },
        {
          kind: 'steps',
          title: 'Samsung & LG: installation steps',
          steps: [
            { text: 'Turn on your TV and open the official store (**Samsung Apps** or **LG Content Store**).' },
            { text: 'Search for and install **IBO Player**, **IBO Player Smarter**, **Hot Player** or **Bob Player**.' },
            { text: 'Open the app to display your **MAC Address** and **Device Key**.' },
            {
              text: 'Send a photo of your screen to our {wa}: our team activates your app and loads your **Atlas Pro ONTV subscription** remotely in under 2 minutes!',
            },
          ],
        },
      ],
    },

    firestick: {
      kicker: 'Amazon Fire TV Stick (4K, 4K Max, Lite, Cube)',
      title: 'How to install Atlas Pro ONTV on Amazon Fire TV Stick',
      blocks: [
        {
          kind: 'notice',
          tone: 'alert',
          title: '🚨 OFFICIAL WARNING ABOUT THE AMAZON FIRE TV STICK HD 2ND GENERATION (VEGA OS)',
          body: [
            'We strongly advise our customers **not to buy the Amazon Fire TV Stick HD (2nd generation)**. This recent model runs on the closed **Vega OS** system, unlike earlier versions running Android / Fire OS:',
          ],
          points: [
            { mark: 'no', text: 'The **Downloader** app is not available on this model.' },
            { mark: 'no', text: 'Installing external apps or **Atlas Pro ONTV APK** files is blocked.' },
            {
              mark: 'yes',
              text: '**Recommended solution:** Choose a **Fire TV Stick 4K, 4K Max, Lite or Cube** (running Fire OS) or an Android TV box (Xiaomi, Mecool, Formuler) that is 100% compatible with Downloader.',
            },
          ],
        },
        {
          kind: 'steps',
          title: 'Steps, Downloader codes and activation on Fire Stick',
          steps: [
            {
              title: 'Install Downloader',
              text: 'From the Fire TV home screen, go to Search (magnifying glass), type **Downloader** and install the official orange app.',
            },
            {
              title: 'Enable Developer Options',
              text: 'Go to **Settings > My Fire TV > About**, then click your Fire TV Stick name **7 times quickly** until the message “You are now a developer” appears.',
            },
            {
              title: 'Allow unknown sources',
              text: 'In **Developer Options > Install Unknown Apps**, switch the permission **ON** for **Downloader**.',
            },
            {
              title: 'Enter the Downloader Code & Activate by version',
              text: 'Open **Downloader**, enter the code of the official version you want and activate your access:',
              appCodes: true,
              list: [
                '**Paid Players (~{price}/year · {trial}-day trial)** · Bob Player ({pcode:bobPlayer}) · Hot Player ({pcode:hotPlayer}).',
              ],
            },
          ],
        },
      ],
    },

    android: {
      kicker: 'Android: Google TV, Chromecast, Sony / TCL / Philips TV, Xiaomi / Mecool TV Box, phones & tablets',
      title: 'How to install Atlas Pro ONTV on Chromecast & Android TV',
      blocks: [
        {
          kind: 'steps',
          steps: [
            {
              text: 'Open the **Google Play Store** on your Android TV, Chromecast with Google TV or Android Box, and install the **Downloader** app for free.',
            },
            {
              text: 'Allow unknown sources for **Downloader** in Settings > Security & restrictions (after clicking Build 7 times in About if developer mode is hidden).',
            },
            {
              text: 'Open **Downloader**, type the code of the free app you want (**{app:ontv}** with Code Active, **{app:max}** with Username/Password, **{app:ibo}**, or **{app:x9}** with Username/Password) or tap our [APK download buttons below](#apps) directly on your smartphone/tablet.',
              appCodes: true,
            },
          ],
        },
        {
          kind: 'notice',
          tone: 'tip',
          title: '📌 Xtream / M3U Note & Remote Assistance',
          body: [
            "You can also use your login details in **Xtream Codes** or **M3U** format on any player. If you'd rather not do it yourself, just send your app details on {wa} and our team will set everything up remotely!",
          ],
        },
      ],
    },

    apple: {
      kicker: 'Apple (iPhone, iPad & Apple TV — iOS, iPadOS & tvOS)',
      title: 'Apple (iPhone, iPad & Apple TV) — How to install Atlas Pro ONTV on iOS & tvOS',
      blocks: [
        {
          kind: 'notice',
          tone: 'info',
          title: '📌 Important Note (iOS Availability)',
          body: [
            'The official **Atlas Pro** app is **NOT available on iOS or tvOS** (it is available natively on Android, Windows PC, macOS and Linux). To watch your **Atlas Pro ONTV subscription** on iPhone, iPad or Apple TV, **you have two simple options**:',
          ],
        },
        {
          kind: 'options',
          items: [
            {
              label: 'Option 1',
              tag: 'Free',
              title: 'Free Player (Smarters Pro IPTV / IPTV Smarters Pro / Smarters Player Lite)',
              text: 'A well-known free app on the App Store. It requires a **Server URL + Username + Password** in **Xtream Codes** format (or an **M3U** link). Simply contact our team on {wa} to get your Xtream / M3U login details free of charge, download the app from the App Store, enter your details and enjoy your subscription!',
            },
            {
              label: 'Option 2',
              tag: 'Recommended',
              recommended: true,
              title: 'Recommended Paid Players (IBO Player, IBO Player Smarter, Hot Player, Bob Player)',
              text: 'Why do we strongly recommend them over Smarters Pro? For around **~{price} / year (after a {trial}-day free trial)**, they guarantee zero dropouts on iPhone/iPad/Apple TV, an ultra-fast EPG guide and **resume your films and series at the exact second you stopped**. Download the app from the App Store and send us its MAC address + Device Key on {wa}: our team can activate the app directly and load your Atlas Pro subscription at the same time!',
              playerLinks: 'ios',
            },
          ],
        },
      ],
    },

    desktop: {
      kicker: 'How to install Atlas Pro on PC, Mac and Linux',
      title: 'Windows PC, Mac (macOS) & Linux Computers — Official Installation & Players',
      blocks: [
        {
          kind: 'options',
          items: [
            {
              label: 'Option A',
              tag: 'Free',
              recommended: true,
              title: 'Free Official Atlas Pro Apps',
              text: 'Download our dedicated official versions **Atlas Pro for Windows PC (.EXE)**, **macOS** or **Linux** directly using the download buttons below, launch the app and sign in with your **Atlas Pro Code** (or your login details).',
              desktopDownloads: true,
            },
            {
              label: 'Option B',
              tag: 'Players',
              title: 'Alternative players on Microsoft Store & Mac',
              list: [
                '**Free (FREE): IPTV Smarters Pro / Expert** (updated desktop version, smooth and free with the Xtream Codes login details provided by our support team).',
                '**Paid Players (~{price} / year · {trial}-day free trial): IBO Player / IBO Player Pro**, **IBO Player Smarter**, **Hot Player**, **Vormedia Sat**. (No use of VLC or BlueStacks.)',
              ],
              playerLinks: 'windows',
            },
          ],
        },
      ],
    },

    mag: {
      kicker: 'Formuler / Dreamlink (MyTVOnline 2 & 3) & MAG Box (Infomir)',
      title: 'How to install Atlas Pro ONTV on Formuler, Dreamlink & MAG Box',
      blocks: [
        { kind: 'subheading', text: 'Formuler / Dreamlink (MyTVOnline 2 & 3)' },
        {
          kind: 'notice',
          tone: 'warn',
          title: '⚠️ Important',
          body: [
            'On Formuler and Dreamlink, you connect with your **Xtream Codes** login details (portal URL + username + password), not with a MAC address.',
          ],
        },
        {
          kind: 'steps',
          steps: [
            { text: 'Open **MyTVOnline 2 or 3**.' },
            { text: '**Menu > Connections > Add Portal**.' },
            { text: 'Name the portal (**Atlas Pro**).' },
            { text: 'Switch “**Login Required**” to **ON**.' },
            { text: 'Enter the **Portal URL**, **Username** and **Password** provided by our team on {waShort}.' },
            { text: 'Click **Connect**.' },
          ],
        },
        { kind: 'subheading', text: 'MAG Box (Infomir 254, 256, 322, 520...)' },
        {
          kind: 'steps',
          steps: [
            { text: 'Note the MAC address on the back of the box (`00:1A:79:XX:XX:XX`) and send it to our support team on {wa}.' },
            { text: 'Receive our activated **Portal URL** link.' },
            { text: 'Go to **Settings > System Settings > Servers > Portals**.' },
            { text: 'Enter “Atlas Pro” in **Portal 1 Name** and the URL in **Portal 1 URL**.' },
            { text: 'Save (**OK**) and restart.' },
          ],
        },
      ],
    },

    shield: {
      kicker: 'Nvidia Shield TV / Shield Pro',
      title: 'How to install Atlas Pro ONTV on Nvidia Shield',
      blocks: [
        {
          kind: 'steps',
          steps: [
            { text: 'Open the **Google Play Store** on your Nvidia Shield and install **Downloader** for free.' },
            {
              text: 'Allow unknown sources for Downloader in **Settings > Device Preferences > Security & restrictions**.',
            },
            {
              text: 'Enter the Downloader code of our free official suite ({app:ontv}, {app:max}, {app:ibo} or {app:x9}) or of IBO Player Pro ({pcode:iboPlayerPro}).',
              appCodes: true,
            },
            { text: 'Activate your **Atlas Pro Code** and enjoy the Full HD H.265 stream and 4K VOD.' },
          ],
        },
      ],
    },
  },

  desktop: {
    windows: 'Atlas Pro for Windows (.EXE)',
    mac: 'Atlas Pro for macOS',
    linux: 'Atlas Pro for Linux',
  },
  storeLink: {
    ios: (player) => `${player} on the App Store`,
    windows: (player) => `${player} for Windows`,
  },

  apps: {
    badge: 'Free official apps',
    title: 'Download the Atlas Pro ONTV APK: the 4 Free Official Apps & their Downloader Codes',
    subtitle:
      'For Android, Google TV, TV Box and Fire TV Stick: type the code into the Downloader app, or download the APK directly from your smartphone or tablet.',
    free: 'Free',
    status: {
      latest: 'Latest official version',
      new: 'New version',
      previous: 'Previous version',
    },
    version: (version) => `Version ${version}`,
    compatible: (versions) => `compatible ${versions}`,
    codeLabel: 'Downloader Code',
    download: (app) => `Download ${app} APK`,
    activationLabel: 'Activation method',
    activation: {
      code: 'Code Active (Atlas Pro Code)',
      login: 'Username + Password',
    },
    or: 'or',
    notes: {
      ontv: 'Activates directly with your Code Active, with no link or username to enter.',
    },
    apkFree: (app) => `${app} APK (Free)`,
    activationBy: 'Activation via',
    copy: 'Copy',
    copied: 'Copied!',
    copyAria: (app, code) => `Copy the ${app} Downloader code ${code}`,
    redundancy: {
      title: '📌 Atlas Pro Redundancy Note',
      text: 'We recommend keeping all **4 official versions** installed on your Android device or Fire TV Stick: if one of them is undergoing technical maintenance, the others take over immediately, with no interruption at all.',
    },
  },

  questions: {
    title: 'Technical installation questions',
    items: [
      {
        q: 'I entered my login details but the app shows an error (“playback error” or “Atlas Pro can’t connect to the server”). What should I do?',
        a: 'First check the **server link (Server URL)**: it must start with **http — not https**. That single letter is the most common cause of errors. Also make sure no invisible space slipped in when you copied and pasted, and that you are using the right activation method (**Code Active** on {app:ontv}, or **Username + Password** on {app:x9} and Max v{ver:max}). **Still stuck?** Send us a message on {wa}: our team will check your **Atlas Pro Code** and set up your player remotely for you.',
      },
      {
        q: 'What internet speed do I need for smooth streaming on Atlas Pro ONTV?',
        a: 'A connection of **10 to 20 Mbps** is the minimum required for smooth Full HD (H.265) streaming. We recommend a faster connection (**30 Mbps or more**) if you want to make the most of VOD content in **Ultra HD 4K** or if several screens share the same internet connection at home.',
      },
      {
        q: 'Do I need to use a VPN with my Atlas Pro subscription?',
        a: "**No, it isn't required** — our official **Atlas Pro ONTV** access includes optimised connections that avoid blocking by internet service providers (ISPs). If you do use a VPN, **be sure to choose a server located in your own country** (or a neighbouring country) to keep maximum speed and avoid any latency.",
      },
      {
        q: 'Why do I need a paid player (~{price} / year) on some devices?',
        a: 'On a **Smart TV (Samsung / LG) or an Apple device (iPhone / Apple TV)**, the paid players (**IBO Player, IBO Player Smarter, Bob Player, Hot Player** — around **~{price} / year after a {trial}-day free trial**) offer much better hardware performance, run without any freezing and remember where you left off in your films and series. On **Android, Google TV, TV Box, Fire TV Stick and PC**, however, our official **Atlas Pro ONTV (v{ver:ontv}, Max v{ver:max}, IBO v{ver:ibo}, 9X)** apps work beautifully and are **100% free**.',
      },
    ],
  },

  help: {
    title: 'Stuck on a step? We’ll set up your device with you.',
    subtitle:
      'Send a message to our support team on WhatsApp: we will guide you step by step or activate your Atlas Pro subscription and your player directly, remotely.',
    button: 'Get help on WhatsApp',
  },
}
