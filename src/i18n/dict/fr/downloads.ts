// French copy, Télécharger page: official app suite and apps & players hub by system. Owner: downloads.
// The brief's French copy is the source: use it as written. Translations in ../<lang>/downloads.ts must have exactly
// the same keys (TypeScript checks it). No business number, price, version, code or link here: read those from
// src/lib/facts.ts. WhatsApp messages live in src/lib/whatsapp.ts and stay French.
export const downloads = {
  // Brief pp. 9–11, « Suite Applicative Officielle Atlas Pro »: the page's hero.
  suite: {
    badge: 'APPLICATION OFFICIELLE',
    // H1 « ATLAS PRO ONTV 4.0.2 & MAX V7 »: app names in ink, version numbers in violet (versions from FACTS).
    title: {
      ontv: 'ATLAS PRO ONTV',
      and: '&',
      max: 'MAX',
      maxVersion: (version: string) => `V${version}`,
    },
    description:
      "Profitez d'une expérience fluide sur tous vos appareils via notre suite d'applications officielles, compatible smartphones, tablettes, TV et ordinateurs.",
    versions: {
      label: 'Éditions officielles et secondaires Atlas Pro',
      mainTitle: 'Éditions Officielles Principales (Dernières Versions)',
      secondaryTitle: 'Éditions Secondaires Disponibles',
      version: (version: string) => `Version ${version}`,
      alsoVersion: (version: string) => `version ${version}`,
      short: (version: string) => `v${version}`,
      status: {
        latest: 'Dernière version officielle',
        new: 'Nouvelle version',
        previous: 'Version précédente',
      },
    },
    noteLabel: 'Note de compatibilité :',
    note: "L'application officielle Atlas Pro est disponible sur les appareils Android, les téléviseurs Google TV récents et l'ensemble des boîtiers TV Box sous Android (Formuler, Xiaomi, Mecool, etc. — une version Android récente est recommandée pour des performances optimales). Des versions officielles dédiées sont également disponibles pour les ordinateurs sous Windows, macOS et Linux.",
    keyPoints: ['Zapping ultra-rapide', 'Interface intuitive', 'EPG intégré'],
    compatLabel: 'Appareils compatibles',
    compat: ['Smart TV', 'Android & Box TV', 'Fire Stick', 'iOS', 'Windows / macOS / Linux', 'Multi-écrans'],
    // Not in the brief: jump link to the hub below.
    cta: 'Voir les téléchargements',
    // The media card is an illustration of an app screen (no video exists).
    media: {
      label: "Aperçu de l'interface des applications officielles Atlas Pro",
      tabs: ['En direct', 'Films', 'Séries', 'Replay'],
      epg: 'EPG',
      now: 'Maintenant',
      next: 'Ensuite',
    },
  },

  // Brief pp. 41–44, « Télécharger » — Hub Complet des Applications & Lecteurs par Système.
  hub: {
    badge: 'TÉLÉCHARGEMENT · APPLICATIONS & LECTEURS',
    title: 'Télécharger Atlas Pro ONTV : Hub Complet des Applications & Lecteurs par Système',
    // Written from the brief's Arabic spec (a hub clearly split by system) and FAQ « lecteur payant » (p. 32).
    subtitle:
      'Choisissez votre système : Android, iOS & Apple ou Windows PC & Mac. Sur Android, Google TV, TV Box, Fire TV Stick et PC, nos applications officielles Atlas Pro ONTV sont 100% gratuites.',
    navLabel: 'Choisir votre système',
    count: (n: number) => (n > 1 ? `${n} applications` : `${n} application`),
    groups: {
      android: {
        nav: 'Android',
        title: 'Android · Fire Stick · Google TV · Android Box',
        // Written from the brief's install guides (pp. 28–29): Downloader code or direct APK.
        intro:
          "Atlas Pro ONTV APK et toute la suite officielle : entrez le Code Downloader dans l'application Downloader de votre Fire TV Stick, Google TV ou Box Android, ou téléchargez directement le fichier APK. Activez ensuite votre Code Atlas Pro.",
        officialTitle: 'Applications officielles Atlas Pro (Gratuit)',
        partnersTitle: 'Lecteurs partenaires sur Android & Fire Stick',
      },
      apple: {
        nav: 'iOS & Apple',
        title: 'iOS & Apple (iPhone · iPad · Apple TV)',
        // The brief (p. 9, Arabic): the official Atlas Pro app is not available on iOS. Then FAQ « Option 2 » (p. 39).
        intro:
          "L'application officielle Atlas Pro n'est pas disponible sur iOS : téléchargez l'un de nos lecteurs partenaires sur l'App Store et envoyez-nous son adresse MAC + Device Key sur WhatsApp : notre équipe peut activer directement l'application et injecter votre abonnement Atlas Pro en même temps !",
      },
      computers: {
        nav: 'Windows PC & Mac',
        title: 'Windows PC & Mac (macOS) & Linux',
        // Brief p. 30, « Option A ».
        intro:
          "Téléchargez directement nos versions officielles dédiées Atlas Pro pour Windows PC (.EXE), macOS ou Linux, lancez l'application et connectez-vous avec votre Code Atlas Pro (ou vos identifiants).",
        officialTitle: 'Applications officielles Atlas Pro (Gratuit)',
        partnersTitle: 'Lecteurs partenaires (Windows PC)',
      },
    },
    // Brief p. 28: « Lecteurs Payants (~8 €/an · 7j d'essai) ».
    playersPrice: (price: string, days: number) => `Lecteurs Payants (~${price} / an · ${days} jours d'essai gratuit)`,
    card: {
      free: 'Gratuit',
      codeLabel: 'Code Downloader',
      copy: 'Copier',
      copied: 'Copié !',
      copyAria: (code: string) => `Copier le Code Downloader ${code}`,
      download: (name: string) => `Télécharger ${name} maintenant`,
      activationLabel: 'Activation :',
      activation: { code: 'Code Atlas Pro', login: 'Identifiant + mot de passe' },
      or: 'ou',
      systems: {
        android: 'Android / Google TV / Fire Stick',
        androidOnly: 'Android',
        ios: 'iOS / App Store',
        windows: 'Windows PC',
        mac: 'macOS',
        linux: 'Linux',
      },
      // Short system names in the button (« Télécharger IBO Player (iOS) maintenant »).
      buttonSystems: { ios: 'iOS', windows: 'Windows', mac: 'macOS', linux: 'Linux' },
      withSystem: (name: string, system: string) => `${name} (${system})`,
      // Brief p. 43, IBO Player (Windows PC) card.
      windowsRequirement: 'Windows x64 (10+)',
    },
    // Partner players whose only download is a Downloader code (brief pp. 28 and 31). Product names.
    partnerNames: { iboPlayerPro: 'IBO Player Pro', hotPlayer: 'Hot Player', bobPlayer: 'Bob Player' },
  },

  // Closing help block. Title, subtitle and button: the brief's « Bannière d'Assistance Directe WhatsApp » (p. 32).
  help: {
    title: 'Bloqué à une étape ? Nous configurons votre appareil avec vous.',
    subtitle:
      'Envoyez un message à notre équipe d\'assistance sur WhatsApp : nous vous accompagnerons pas à pas ou activerons directement votre abonnement Atlas Pro et votre lecteur à distance.',
    whatsapp: "Obtenir de l'aide sur WhatsApp",
    // Not in the brief: links to the home installation hub and the Boutique.
    guides: "Voir les guides d'installation",
    shopLead: 'Pas encore abonné ?',
    shop: 'Choisir mon forfait dans la Boutique',
  },
}
