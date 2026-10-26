// French copy, home installation hub (9 devices, app matrix, warnings, technical questions, help banner). Owner: install.
// The brief's French copy is the source: use it as written. Translations in ../<lang>/install.ts must have exactly
// the same keys (TypeScript checks it). No business number, price, version, code or link here: read those from
// src/lib/facts.ts. WhatsApp messages live in src/lib/whatsapp.ts and stay French.
//
// Inline markup in the guide texts (rendered by src/pages/home/install/Rich.tsx; keep the markers when translating):
//   **bold**            bold text
//   `text`              monospace (addresses, menu codes)
//   {wa}                link to WhatsApp, printed « WhatsApp (+33 7 51 29 91 76) »
//   {waShort}           link to WhatsApp, printed « WhatsApp »
//   {price}             yearly price of the paid players (« 8 € »)
//   {trial}             free trial days of the paid players (« 7 »)
//   {app:ontv}          app name + version (« Atlas Pro ONTV 4.0.2 », « Atlas Pro Max v7 »); ids: ontv max ibo x9
//   {ver:max}           an app's version alone (« 7 »)
//   {pcode:bobPlayer}   Downloader code of a paid player; keys: bobPlayer hotPlayer iboPlayerPro
//   [text](#apps)       link to a home anchor (HOME_ANCHORS key: apps, faq, …)

export type NoticeTone = 'info' | 'warn' | 'alert' | 'tip'
export type GuideId = 'smartTv' | 'firestick' | 'android' | 'apple' | 'desktop' | 'mag' | 'shield'
export type DeviceId = 'smartTv' | 'firestick' | 'android' | 'apple' | 'windows' | 'mac' | 'linux' | 'mag' | 'shield'

export interface GuideStep {
  /** Short name of the step (« Installer Downloader »), shown after « Étape N ». */
  title?: string
  text: string
  /** The official apps with their Downloader codes and activation mode, from FACTS. */
  appCodes?: boolean
  /** Lines after the app codes. */
  list?: string[]
}

export interface Notice {
  tone: NoticeTone
  title: string
  body: string[]
  /** ❌ / ✅ lines. */
  points?: { mark: 'no' | 'yes'; text: string }[]
}

export interface GuideOption {
  label: string
  tag: string
  title: string
  /** Shown as the recommended option (violet glow). */
  recommended?: boolean
  text?: string
  list?: string[]
  /** Download buttons of the official desktop apps (FACTS.desktop). */
  desktopDownloads?: boolean
  /** Links to the paid players' stores (FACTS.players). */
  playerLinks?: 'ios' | 'windows'
}

export type GuideBlock =
  | ({ kind: 'notice' } & Notice)
  | { kind: 'subheading'; text: string }
  | { kind: 'steps'; title?: string; steps: GuideStep[] }
  | { kind: 'options'; items: GuideOption[] }

export interface Guide {
  /** Eyebrow above the guide title: the devices it covers. */
  kicker: string
  /** H3 of the guide (carries the « comment installer atlas pro ontv sur … » searches). */
  title: string
  blocks: GuideBlock[]
}

export interface InstallCopy {
  badge: string
  title: string
  subtitle: (minutes: string) => string
  kpis: {
    /** « < 5 min » */
    fast: { value: (minutes: string) => string; label: string }
    compat: { value: string; label: string }
    support: { value: string; label: string }
  }
  selector: {
    title: string
    hint: string
    listLabel: string
    change: string
    current: string
    devices: Record<DeviceId, { name: string; detail: string }>
  }
  stepLabel: (n: number) => string
  guides: Record<GuideId, Guide>
  desktop: Record<'windows' | 'mac' | 'linux', string>
  storeLink: Record<'ios' | 'windows', (player: string) => string>
  apps: {
    badge: string
    title: string
    subtitle: string
    free: string
    status: Record<'latest' | 'new' | 'previous', string>
    version: (version: string) => string
    compatible: (versions: string) => string
    codeLabel: string
    download: (app: string) => string
    activationLabel: string
    activation: Record<'code' | 'login', string>
    or: string
    /** Per-app activation note under the modes. */
    notes: Partial<Record<'ontv' | 'max' | 'ibo' | 'x9', string>>
    /** Line of the Fire TV / Android / Shield step lists: « Atlas Pro ONTV 4.0.2 APK (Gratuit) ». */
    apkFree: (app: string) => string
    activationBy: string
    copy: string
    copied: string
    copyAria: (app: string, code: string) => string
    redundancy: { title: string; text: string }
  }
  questions: {
    title: string
    items: { q: string; a: string }[]
  }
  help: {
    title: string
    subtitle: string
    button: string
  }
}

export const install: InstallCopy = {
  badge: '✨ Guides visuels 2026 · Distributeur agréé Atlas Pro ONTV',
  // \u00a0 = non-breaking space before « : » (French typography; keeps the colon off the start of a line).
  title: 'Installation Atlas Pro ONTV 2026\u00a0: Guides Interactifs Pas à Pas & Téléchargement APK',
  subtitle: (minutes) =>
    `Sélectionnez l'appareil sur lequel vous souhaitez regarder vos programmes, puis suivez les étapes simples. La majorité de nos abonnés sont opérationnels en moins de ${minutes} minutes.`,
  kpis: {
    fast: { value: (minutes) => `< ${minutes} min`, label: 'Installation Rapide' },
    compat: { value: '100%', label: 'Compatible Tous Écrans' },
    support: { value: '7j/7 · 24/7', label: 'Support Technique Inclus' },
  },

  selector: {
    title: 'Choisissez votre appareil',
    hint: "Le guide pas à pas de votre appareil s'affiche plus bas, après les applications officielles.",
    listLabel: 'Appareils',
    change: "Changer d'appareil",
    current: 'Votre appareil',
    devices: {
      smartTv: { name: 'Smart TV', detail: 'Samsung Tizen, LG webOS, Sony, Philips...' },
      firestick: { name: 'Amazon Firestick', detail: 'Fire TV Stick 4K / Max / Lite / Cube' },
      android: { name: 'Android', detail: 'Téléphone, Tablette, Google TV, TV Box Xiaomi / Mecool' },
      apple: { name: 'iPhone / iPad / Apple TV', detail: 'iOS, iPadOS & tvOS' },
      windows: { name: 'Windows PC', detail: 'Application officielle & Microsoft Store' },
      mac: { name: 'Mac', detail: 'macOS' },
      linux: { name: 'Linux', detail: 'Application officielle & Lecteurs' },
      mag: { name: 'MAG Box & Formuler / Dreamlink', detail: 'MyTVOnline 2 & 3' },
      shield: { name: 'Nvidia Shield', detail: 'Android TV Haute Performance' },
    },
  },

  stepLabel: (n) => `Étape ${n}`,

  guides: {
    smartTv: {
      kicker: 'Smart TV (Samsung Tizen & LG WebOS)',
      title: 'Comment installer Atlas Pro ONTV sur TV Samsung & LG',
      blocks: [
        {
          kind: 'notice',
          tone: 'info',
          title: '💡 NOTE IMPORTANTE (TV SAMSUNG & LG vs ANDROID TV)',
          body: [
            "L'application native **Atlas Pro ONTV** n'est pas directement disponible sur les stores officiels Samsung (Tizen) et LG (WebOS). Les lecteurs haute performance compatibles sur ces téléviseurs (**IBO Player / IBO Player Pro**, **IBO Player Smarter**, **Hot Player**, **Bob Player**) sont des **applications payantes indépendantes (environ ~{price} / an après {trial} jours d'essai gratuit)**. Elles garantissent un guide EPG instantané, une stabilité 4K/FHD irréprochable et la reprise de lecture des films et séries à la seconde exacte de l'arrêt. Bien que vous puissiez les activer vous-même, **nous vous recommandons vivement de laisser notre équipe technique se charger de l'activation complète de l'application ET de l'injection de votre abonnement Atlas Pro simultanément** : envoyez-nous simplement votre **MAC Address** et votre **Device Key** sur {wa}, notre équipe s'occupe de tout de A à Z !",
            "(Note : Pour les TV Sony, TCL, Xiaomi sous Android TV / Google TV, l'application officielle Atlas Pro est 100% gratuite via Downloader).",
          ],
        },
        {
          kind: 'notice',
          tone: 'warn',
          title: '⚠️ Avertissement Smarters Pro sur Smart TV',
          body: [
            "Nous déconseillons l'utilisation de l'ancienne version IPTV Smarters Pro sur TV Samsung et LG (provoque des coupures, blocages et erreurs d'autorisation indépendants de notre serveur). **Pourquoi privilégier les lecteurs payants (IBO Player, IBO Player Smarter, Bob Player, Hot Player) ?** Ils offrent **{trial} jours d'essai gratuit**, une stabilité 4K/FHD irréprochable, un chargement instantané du guide EPG et la **reprise de lecture de vos films et séries à la seconde exacte où vous vous êtes arrêté**.",
          ],
        },
        {
          kind: 'steps',
          title: "Samsung & LG : étapes d'installation",
          steps: [
            { text: 'Allumez votre téléviseur et ouvrez le magasin officiel (**Samsung Apps** ou **LG Content Store**).' },
            { text: 'Recherchez et installez **IBO Player**, **IBO Player Smarter**, **Hot Player** ou **Bob Player**.' },
            { text: "Ouvrez l'application pour afficher votre **MAC Address** et votre **Device Key**." },
            {
              text: 'Envoyez une photo de votre écran sur notre {wa} : notre équipe active votre application et injecte votre **abonnement Atlas Pro ONTV** à distance en moins de 2 minutes !',
            },
          ],
        },
      ],
    },

    firestick: {
      kicker: 'Amazon Fire TV Stick (4K, 4K Max, Lite, Cube)',
      title: 'Comment installer Atlas Pro ONTV sur Amazon Fire TV Stick',
      blocks: [
        {
          kind: 'notice',
          tone: 'alert',
          title: "🚨 AVERTISSEMENT OFFICIEL CONCERNANT L'AMAZON FIRE TV STICK HD DE 2ᵉ GÉNÉRATION (VEGA OS)",
          body: [
            'Nous recommandons vivement à notre clientèle de **ne pas acquérir le modèle Amazon Fire TV Stick HD (2ᵉ génération)**. Ce modèle récent fonctionne sous le système fermé **Vega OS**, contrairement aux versions précédentes sous Android / Fire OS :',
          ],
          points: [
            { mark: 'no', text: "L'application **Downloader** n'est pas disponible sur ce modèle." },
            { mark: 'no', text: "L'installation d'applications externes ou de fichiers **Atlas Pro ONTV APK** est bloquée." },
            {
              mark: 'yes',
              text: '**Solution recommandée :** Privilégiez un modèle **Fire TV Stick 4K, 4K Max, Lite ou Cube** (sous Fire OS) ou un boîtier Android TV (Xiaomi, Mecool, Formuler) 100% compatible avec Downloader.',
            },
          ],
        },
        {
          kind: 'steps',
          title: 'Étapes, codes Downloader et activation sur Fire Stick',
          steps: [
            {
              title: 'Installer Downloader',
              text: "Depuis l'accueil Fire TV, allez sur Rechercher (Loupe), tapez **Downloader** et installez l'application orange officielle.",
            },
            {
              title: 'Activer les Options Développeur',
              text: 'Allez dans **Paramètres > Ma Fire TV > À propos**, puis cliquez **7 fois rapidement** sur le nom de votre Fire TV Stick jusqu\'au message « Vous êtes désormais un développeur ».',
            },
            {
              title: 'Autoriser les sources inconnues',
              text: "Dans **Options pour les développeurs > Installer des applications inconnues**, activez l'autorisation sur **ON** pour **Downloader**.",
            },
            {
              title: 'Saisir le Code Downloader & Activer selon la version',
              text: 'Ouvrez **Downloader**, entrez le code de la version officielle souhaitée et activez votre accès :',
              appCodes: true,
              list: [
                "**Lecteurs Payants (~{price}/an · {trial}j d'essai)** · Bob Player ({pcode:bobPlayer}) · Hot Player ({pcode:hotPlayer}).",
              ],
            },
          ],
        },
      ],
    },

    android: {
      kicker: 'Android : Google TV, Chromecast, TV Sony / TCL / Philips, TV Box Xiaomi / Mecool, téléphones & tablettes',
      title: 'Comment installer Atlas Pro ONTV sur Chromecast & Android TV',
      blocks: [
        {
          kind: 'steps',
          steps: [
            {
              text: 'Ouvrez le **Google Play Store** sur votre Android TV, Chromecast avec Google TV ou Box Android, et installez gratuitement l\'application **Downloader**.',
            },
            {
              text: 'Autorisez les sources inconnues pour **Downloader** dans Paramètres > Sécurité et restrictions (après avoir cliqué 7 fois sur Numéro de build dans À propos si le mode développeur est masqué).',
            },
            {
              text: 'Ouvrez **Downloader**, tapez le code de l\'application gratuite souhaitée (**{app:ontv}** par Code Active, **{app:max}** par Username/Password, **{app:ibo}**, ou **{app:x9}** par Username/Password) ou cliquez directement sur nos [boutons de téléchargement APK ci-dessus](#apps) sur smartphone/tablette.',
              appCodes: true,
            },
          ],
        },
        {
          kind: 'notice',
          tone: 'tip',
          title: '📌 Note Xtream / M3U & Assistance à distance',
          body: [
            'Vous pouvez également utiliser vos identifiants en format **Xtream Codes** ou **M3U** sur n\'importe quel lecteur. Si vous ne souhaitez pas faire la manipulation vous-même, envoyez simplement les informations de votre application sur {wa} et notre équipe configure tout à distance !',
          ],
        },
      ],
    },

    apple: {
      kicker: 'Apple (iPhone, iPad & Apple TV — iOS, iPadOS & tvOS)',
      title: 'Apple (iPhone, iPad & Apple TV) — Comment installer Atlas Pro ONTV sur iOS & tvOS',
      blocks: [
        {
          kind: 'notice',
          tone: 'info',
          title: '📌 Note Importante (Disponibilité iOS)',
          body: [
            "L'application officielle **Atlas Pro** n'est **PAS disponible sur iOS ou tvOS** (elle est disponible nativement sur Android, Windows PC, macOS et Linux). Pour regarder votre **abonnement Atlas Pro ONTV** sur iPhone, iPad ou Apple TV, **deux méthodes simples s'offrent à vous** :",
          ],
        },
        {
          kind: 'options',
          items: [
            {
              label: 'Option 1',
              tag: 'Gratuit',
              title: 'Lecteur Gratuit (Smarters Pro IPTV / IPTV Smarters Pro / Smarters Player Lite)',
              text: "Application gratuite très connue sur l'App Store. Elle nécessite un **Lien Serveur (Server URL) + Identifiant (Username) + Mot de passe (Password)** au format **Xtream Codes** (ou via un lien **M3U**). Contactez simplement notre équipe sur {wa} pour obtenir gratuitement vos accès Xtream / M3U, téléchargez l'application sur l'App Store, entrez vos informations et profitez de votre abonnement !",
            },
            {
              label: 'Option 2',
              tag: 'Recommandé',
              recommended: true,
              title: 'Lecteurs Payants Recommandés (IBO Player, IBO Player Smarter, Hot Player, Bob Player)',
              text: "Pourquoi les recommandons-nous vivement par rapport à Smarters Pro ? Pour environ **~{price} / an (après {trial} jours d'essai gratuit)**, ils garantissent zéro coupure sur iPhone/iPad/Apple TV, un guide EPG ultra-rapide et la **reprise de lecture de vos films et séries à la seconde exacte où vous vous êtes arrêté**. Téléchargez l'application sur l'App Store et envoyez-nous son adresse MAC + Device Key sur {wa} : notre équipe peut activer directement l'application et injecter votre abonnement Atlas Pro en même temps !",
              playerLinks: 'ios',
            },
          ],
        },
      ],
    },

    desktop: {
      kicker: 'Comment installer Atlas Pro sur PC, Mac et Linux',
      title: 'Ordinateurs Windows PC, Mac (macOS) & Linux — Installation Officielle & Lecteurs',
      blocks: [
        {
          kind: 'options',
          items: [
            {
              label: 'Option A',
              tag: 'Gratuit',
              recommended: true,
              title: 'Applications Officielles Gratuites Atlas Pro',
              text: 'Téléchargez directement nos versions officielles dédiées **Atlas Pro pour Windows PC (.EXE)**, **macOS**, ou **Linux** via les boutons de téléchargement ci-dessous, lancez l\'application et connectez-vous avec votre **Code Atlas Pro** (ou vos identifiants).',
              desktopDownloads: true,
            },
            {
              label: 'Option B',
              tag: 'Lecteurs',
              title: 'Lecteurs alternatifs sur Microsoft Store & Mac',
              list: [
                '**Gratuit (FREE) : IPTV Smarters Pro / Expert** (version ordinateur mise à jour, fluide et gratuite via identifiants Xtream Codes fournis par notre support).',
                "**Lecteurs Payants (~{price} / an · {trial} jours d'essai gratuit) : IBO Player / IBO Player Pro**, **IBO Player Smarter**, **Hot Player**, **Vormedia Sat**. (Aucune utilisation de VLC ou BlueStacks).",
              ],
              playerLinks: 'windows',
            },
          ],
        },
      ],
    },

    mag: {
      kicker: 'Formuler / Dreamlink (MyTVOnline 2 & 3) & MAG Box (Infomir)',
      title: 'Comment installer Atlas Pro ONTV sur Formuler, Dreamlink & MAG Box',
      blocks: [
        { kind: 'subheading', text: 'Formuler / Dreamlink (MyTVOnline 2 & 3)' },
        {
          kind: 'notice',
          tone: 'warn',
          title: '⚠️ Important',
          body: [
            'Sur Formuler et Dreamlink, la connexion se fait avec vos identifiants **Xtream Codes** (URL du portail + identifiant + mot de passe), et non par adresse MAC.',
          ],
        },
        {
          kind: 'steps',
          steps: [
            { text: 'Ouvrir **MyTVOnline 2 ou 3**.' },
            { text: '**Menu > Connexions > Ajouter un Portail** (Add Portal).' },
            { text: 'Nommer le portail (**Atlas Pro**).' },
            { text: 'Basculer « **Login Required** » sur **ON**.' },
            { text: "Entrer l'**URL du Portail**, l'**Identifiant** et le **Mot de passe** fournis par notre équipe sur {waShort}." },
            { text: 'Cliquer sur **Connect**.' },
          ],
        },
        { kind: 'subheading', text: 'MAG Box (Infomir 254, 256, 322, 520...)' },
        {
          kind: 'steps',
          steps: [
            { text: "Relever l'adresse MAC au dos du boîtier (`00:1A:79:XX:XX:XX`) et l'envoyer à notre support {wa}." },
            { text: 'Recevoir notre lien **Portal URL** activé.' },
            { text: 'Aller dans **Settings > System Settings > Servers > Portals**.' },
            { text: "Saisir « Atlas Pro » dans **Portal 1 Name** et l'URL dans **Portal 1 URL**." },
            { text: 'Sauvegarder (**OK**) et redémarrer.' },
          ],
        },
      ],
    },

    shield: {
      kicker: 'Nvidia Shield TV / Shield Pro',
      title: 'Comment installer Atlas Pro ONTV sur Nvidia Shield',
      blocks: [
        {
          kind: 'steps',
          steps: [
            { text: 'Ouvrir le **Google Play Store** sur votre Nvidia Shield et installer gratuitement **Downloader**.' },
            {
              text: "Autoriser les sources inconnues pour Downloader dans **Paramètres > Préférences de l'appareil > Sécurité et restrictions**.",
            },
            {
              text: "Entrer le code Downloader de notre suite officielle gratuite ({app:ontv}, {app:max}, {app:ibo} ou {app:x9}) ou d'IBO Player Pro ({pcode:iboPlayerPro}).",
              appCodes: true,
            },
            { text: 'Activer votre **Code Atlas Pro** et profiter du flux Full HD H.265 et VOD 4K.' },
          ],
        },
      ],
    },
  },

  desktop: {
    windows: 'Atlas Pro pour Windows (.EXE)',
    mac: 'Atlas Pro pour macOS',
    linux: 'Atlas Pro pour Linux',
  },
  storeLink: {
    ios: (player) => `${player} sur l'App Store`,
    windows: (player) => `${player} pour Windows`,
  },

  apps: {
    badge: 'Applications officielles gratuites',
    title: 'Télécharger Atlas Pro ONTV APK\u00a0: les 4 Applications Officielles Gratuites & leurs Codes Downloader',
    subtitle:
      "Pour Android, Google TV, TV Box et Fire TV Stick : tapez le code dans l'application Downloader, ou téléchargez l'APK directement depuis votre smartphone ou votre tablette.",
    free: 'Gratuit',
    status: {
      latest: 'Dernière version officielle',
      new: 'Nouvelle version',
      previous: 'Version précédente',
    },
    version: (version) => `Version ${version}`,
    compatible: (versions) => `compatible ${versions}`,
    codeLabel: 'Code Downloader',
    download: (app) => `Télécharger ${app} APK`,
    activationLabel: "Mode d'activation",
    activation: {
      code: 'Code Active (Code Atlas Pro)',
      login: 'Identifiant + Mot de passe',
    },
    or: 'ou',
    notes: {
      ontv: "S'active directement avec votre Code Active, sans lien ni nom d'utilisateur à saisir.",
    },
    apkFree: (app) => `${app} APK (Gratuit)`,
    activationBy: 'Activation par',
    copy: 'Copier',
    copied: 'Copié !',
    copyAria: (app, code) => `Copier le code Downloader ${code} de ${app}`,
    redundancy: {
      title: '📌 Note de Redondance Atlas Pro',
      text: "Nous vous conseillons de garder les **4 versions officielles** installées sur votre appareil Android ou votre Fire TV Stick : si l'une d'elles fait l'objet d'une maintenance technique, les autres versions prennent immédiatement le relais, sans aucune interruption.",
    },
  },

  questions: {
    title: "Questions techniques sur l'installation",
    items: [
      {
        q: "J'ai saisi mes identifiants mais l'application indique une erreur (« erreur de lecture » ou « Atlas Pro ne peut pas se connecter au serveur »), que faire ?",
        a: "Vérifiez tout d'abord le **lien du serveur (Server URL)** : il doit impérativement commencer par **http — et non https**. Cette simple lettre est la cause d'erreur la plus fréquente. Assurez-vous également qu'aucun espace invisible ne s'est glissé lors du copier-coller, et que vous utilisez la bonne méthode d'activation (**Code Active** sur {app:ontv}, ou **Identifiant + Mot de passe** sur {app:x9} et Max v{ver:max}). **Toujours bloqué ?** Envoyez-nous un message sur {wa} : notre équipe vérifiera votre **Code Atlas Pro** et configurera votre lecteur à distance pour vous.",
      },
      {
        q: 'Quel débit Internet est nécessaire pour une diffusion fluide sur Atlas Pro ONTV ?',
        a: 'Une connexion de **10 à 20 Mbps** est le minimum requis pour un streaming fluide en Full HD (H.265). Nous recommandons un débit supérieur (**30 Mbps et plus**) si vous souhaitez profiter pleinement des contenus VOD en **Ultra HD 4K** ou si plusieurs écrans utilisent la même connexion Internet simultanément à la maison.',
      },
      {
        q: 'Dois-je utiliser un VPN avec mon abonnement Atlas Pro ?',
        a: "**Non, ce n'est pas obligatoire** — nos accès officiels **Atlas Pro ONTV** intègrent des liaisons optimisées qui évitent les blocages des opérateurs Internet (FAI). Si vous utilisez tout de même un VPN, **choisissez impérativement un serveur situé dans votre propre pays** (ou un pays limitrophe) afin de conserver une vitesse maximale et d'éviter toute latence.",
      },
      {
        q: "Pourquoi ai-je besoin d'un lecteur payant (~{price} / an) sur certains appareils ?",
        a: "Sur une **Smart TV (Samsung / LG) ou un appareil Apple (iPhone / Apple TV)**, les lecteurs payants (**IBO Player, IBO Player Smarter, Bob Player, Hot Player** — environ **~{price} / an après {trial} jours d'essai gratuit**) offrent de bien meilleures performances matérielles, tournent sans aucun blocage et mémorisent la reprise de vos films et séries. En revanche, sur **Android, Google TV, TV Box, Fire TV Stick et PC**, nos applications officielles **Atlas Pro ONTV (v{ver:ontv}, Max v{ver:max}, IBO v{ver:ibo}, 9X)** fonctionnent à merveille et sont **100% gratuites**.",
      },
    ],
  },

  help: {
    title: 'Bloqué à une étape\u00a0? Nous configurons votre appareil avec vous.',
    subtitle:
      "Envoyez un message à notre équipe d'assistance sur WhatsApp : nous vous accompagnerons pas à pas ou activerons directement votre abonnement Atlas Pro et votre lecteur à distance.",
    button: "Obtenir de l'aide sur WhatsApp",
  },
}
