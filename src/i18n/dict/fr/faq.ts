// French copy, home FAQ (the brief's questions 1–25; the brief has no question 12). Owner: faq.
// The brief's French copy is the source: use it as written. Translations in ../<lang>/faq.ts must have exactly
// the same keys (TypeScript checks it). No business number, price, version, code or link here: read those from
// src/lib/facts.ts. WhatsApp messages live in src/lib/whatsapp.ts and stay French.
//
// Each answer is a list of blocks (paragraph, list, cards, note) made of inline parts: plain text, bold text, a
// short code, a link to a home section, or a WhatsApp link. Numbers, prices and versions come in through `v`
// (FaqValues, already formatted for the language). The same data renders the page and the FAQPage JSON-LD.

/** Home sections an answer can link to (keys of HOME_ANCHORS). */
export type FaqLink = 'install' | 'apps' | 'pricing' | 'renewal'
/** Which pre-filled WhatsApp message a link opens (src/lib/whatsapp.ts). */
export type FaqWa = 'activate' | 'renewal' | 'help' | 'contact'

export type FaqInline =
  | string
  | { b: string }
  | { code: string }
  | { to: FaqLink; text: string }
  /** WhatsApp link. `number`: print « WhatsApp (+33 …) »; `text`: the link text (default « WhatsApp »). */
  | { wa: FaqWa; number?: boolean; text?: string }

export type FaqBlock =
  | { p: FaqInline[] }
  | { ul: FaqInline[][] }
  | { ol: FaqInline[][] }
  /** Diagnostic cases, shown as boxed items. */
  | { cards: FaqInline[][] }
  /** A warning under an answer. */
  | { note: FaqInline[] }

/** Facts the answers print, formatted for the reader's language. */
export interface FaqValues {
  price: { premium: string; duo: string; famille: string }
  screens: { premium: string; duo: string; famille: string }
  months: string
  /** Number of official free apps (ONTV, Max, IBO, 9X). */
  appCount: string
  /** App versions: '4.0.2', '7', '4.3'; ontvLine is the product line ('4.0'). */
  ontv: string
  ontvLine: string
  max: string
  ibo: string
  channels: string
  sportsChannels: string
  films: string
  series: string
  episodes: string
  replayChannels: string
  replayDays: string
  customers: string
  supportMinutes: string
  uptime: string
  playerPrice: string
  trialDays: string
}

export type FaqId =
  | 'order'
  | 'delivery'
  | 'email'
  | 'otherApps'
  | 'renew'
  | 'keepFavorites'
  | 'download'
  | 'activation'
  | 'replace'
  | 'countries'
  | 'screens'
  | 'oldTv'
  | 'trust'
  | 'samsungLg'
  | 'content'
  | 'connect'
  | 'apple'
  | 'smarters'
  | 'serverLink'
  | 'enterCode'
  | 'changeCode'
  | 'installTv'
  | 'fireTv'
  | 'cast'

export interface FaqItem {
  id: FaqId
  q: (v: FaqValues) => string
  a: (v: FaqValues) => FaqBlock[]
}

const b = (text: string): FaqInline => ({ b: text })
const wa = (kind: FaqWa, number = false, text?: string): FaqInline => ({ wa: kind, number, text })

const items: FaqItem[] = [
  {
    id: 'order',
    q: () => 'Comment commander un abonnement Atlas Pro ONTV sur notre portail officiel ?',
    a: (v) => [
      {
        p: [
          "Cliquez sur le bouton « S'abonner maintenant » dans notre ",
          { to: 'pricing', text: 'grille tarifaire' },
          ` (Premium ${v.screens.premium} Écran à ${v.price.premium}, Duo ${v.screens.duo} Écrans à ${v.price.duo} ou Famille ${v.screens.famille} Écrans à ${v.price.famille}), ce qui ouvre directement une conversation pré-remplie avec notre équipe sur `,
          wa('activate', true),
          ' pour une validation et une activation immédiates.',
        ],
      },
    ],
  },
  {
    id: 'delivery',
    q: () => 'Dans quel délai vais-je recevoir mon Code Atlas Pro et mes identifiants ?',
    a: () => [
      {
        p: [
          "Pendant nos heures d'ouverture, l'envoi de votre ",
          b('Code Atlas Pro'),
          ' officiel (ainsi que vos accès Xtream / M3U) sur WhatsApp et par e-mail après validation du paiement est quasi instantané (généralement en moins de 3 à 15 minutes).',
        ],
      },
    ],
  },
  {
    id: 'email',
    q: () => "Je n'ai pas reçu l'e-mail dans le délai imparti, dois-je m'inquiéter ?",
    a: () => [
      {
        p: [
          'Non, rassurez-vous. Nos envois sont assurés 7j/7. Si vous ne voyez rien dans vos courriers indésirables (spams), écrivez simplement à notre équipe sur ',
          wa('contact', true),
          ' : un conseiller vous transmettra immédiatement votre Code Atlas Pro en direct.',
        ],
      },
    ],
  },
  {
    id: 'otherApps',
    q: () => "Puis-je utiliser mon abonnement Atlas Pro ONTV sur d'autres applications IPTV ?",
    a: (v) => [
      {
        p: [
          `Oui, absolument ! En plus de nos ${v.appCount} applications officielles gratuites (`,
          b(`Atlas Pro ONTV ${v.ontv}`),
          ', ',
          b(`Atlas Pro Max v${v.max}`),
          ', ',
          b(`Atlas Pro IBO v${v.ibo}`),
          ', ',
          b('Atlas Pro 9X'),
          "), nous vous recommandons d'excellents lecteurs payants tels que IBO Player, IBO Player Smarter, Hot Player ou Bob Player pour les Smart TV Samsung/LG et Apple, ou des lecteurs gratuits comme IPTV Smarters Pro (avec identifiants Xtream ou M3U).",
        ],
      },
    ],
  },
  {
    id: 'renew',
    q: () => 'Comment renouveler mon Code Atlas Pro actuel ?',
    a: (v) => [
      {
        p: [
          'Cliquez sur le bouton ',
          { to: 'renewal', text: '« Renouvellement ici (Saisir votre Code Atlas Pro) »' },
          ' ou contactez-nous directement sur ',
          wa('renewal'),
          ` en précisant votre code ou identifiant actuel. Dès validation de votre règlement (PayPal ou SEPA), votre abonnement est prolongé pour ${v.months} mois en quelques minutes.`,
        ],
      },
    ],
  },
  {
    id: 'keepFavorites',
    q: () => 'Puis-je renouveler en conservant mes favoris et mon application actuelle ?',
    a: () => [
      {
        p: [
          'Oui ! Vous conservez votre application déjà installée et vos listes de favoris sans avoir besoin de tout réinstaller.',
        ],
      },
    ],
  },
  {
    id: 'download',
    q: (v) => `Comment télécharger l'application officielle Atlas Pro ONTV ${v.ontv} APK et Atlas Pro Max v${v.max} ?`,
    a: () => [
      {
        p: [
          'Rendez-vous dans notre section ',
          { to: 'install', text: "« Guides d'Installation & Téléchargement »" },
          " juste au-dessus : cliquez directement sur le bouton violet de téléchargement APK de la version souhaitée, ou saisissez son Code Downloader officiel dans l'application Downloader sur votre TV/Box/Firestick.",
        ],
      },
    ],
  },
  {
    id: 'activation',
    q: (v) =>
      `Quelle est la différence d'activation entre Atlas Pro ONTV ${v.ontv}, Atlas Pro Max v${v.max}, IBO v${v.ibo} et 9X ?`,
    a: (v) => [
      {
        ul: [
          [b(`Atlas Pro ONTV ${v.ontvLine} (v${v.ontv}) :`), " S'active uniquement avec votre Code Active (Code Atlas Pro)."],
          [
            b(`Atlas Pro Max (Version ${v.max}) :`),
            " S'active au choix avec votre Code Active OU avec Identifiant (Username) + Mot de passe (Password).",
          ],
          [b(`Atlas Pro IBO (Version ${v.ibo}) :`), " S'active avec votre Code Active."],
          [b('Atlas Pro 9X :'), " S'active avec Identifiant (Username) + Mot de passe (Password)."],
        ],
      },
      {
        note: [
          b('Attention :'),
          " n'achetez pas le Fire TV Stick HD 2ᵉ génération sous système fermé Vega OS car il bloque l'application Downloader.",
        ],
      },
    ],
  },
  {
    id: 'replace',
    q: () => "Qu'est-ce qui remplace Atlas Pro ON TV en 2026 ?",
    a: (v) => [
      {
        p: [
          `Rien ne remplace l'original : en 2026, Atlas Pro ONTV s'est réinventé avec sa propre suite officielle nouvelle génération (Atlas Pro ONTV v${v.ontv}, Atlas Pro Max v${v.max}, Atlas Pro IBO v${v.ibo} et Atlas Pro 9X) propulsée par une nouvelle architecture serveur européenne anti-coupure à ${v.uptime} %.`,
        ],
      },
    ],
  },
  {
    id: 'countries',
    q: () =>
      "L'abonnement Atlas Pro ONTV fonctionne-t-il en France, en Belgique, en Suisse, au Canada et à l'étranger ?",
    a: () => [
      {
        p: [
          'Oui, notre service fonctionne partout dans le monde dès lors que vous disposez d\'une connexion Internet stable (France, Belgique, Suisse, Canada, Europe, USA, Afrique du Nord, etc.) sans nécessiter de VPN.',
        ],
      },
    ],
  },
  {
    id: 'screens',
    q: () => 'Puis-je utiliser mon abonnement sur plusieurs écrans en même temps ?',
    a: (v) => [
      {
        p: [
          `Le forfait Premium (${v.price.premium}) inclut ${v.screens.premium} écran actif. Si vous souhaitez regarder vos programmes sur plusieurs écrans simultanément en famille, optez directement pour notre `,
          { to: 'pricing', text: `Forfait Duo ${v.screens.duo} Écrans` },
          ` (${v.price.duo} / ${v.months} mois) ou notre `,
          { to: 'pricing', text: `Forfait Famille ${v.screens.famille} Écrans` },
          ` (${v.price.famille} / ${v.months} mois) qui vous délivrent ${v.screens.duo} ou ${v.screens.famille} codes officiels indépendants !`,
        ],
      },
    ],
  },
  {
    id: 'oldTv',
    q: () => "J'ai un téléviseur ancien (non Smart), quelle solution proposez-vous ?",
    a: () => [
      {
        p: [
          'Il vous suffit de brancher un boîtier Android TV Box certifié (Xiaomi Mi Box, Mecool, Formuler) ou une clé Amazon Fire TV Stick 4K / 4K Max (sous Fire OS) sur le port HDMI de votre téléviseur pour le transformer en Smart TV ultra-rapide compatible avec toutes nos applications gratuites.',
        ],
      },
    ],
  },
  {
    id: 'trust',
    q: () => 'Pourquoi faire confiance à notre portail officiel en tant que distributeur agréé ?',
    a: (v) => [
      {
        p: [
          `Nous sommes le portail agréé de référence en France et en Europe avec plus de ${v.customers} clients satisfaits, des codes 100% officiels garantis ${v.months} mois, aucun prélèvement par carte bancaire sur le site (paiement sécurisé PayPal ou SEPA), une garantie satisfait ou remboursé et un support technique humain qui répond en moins de ${v.supportMinutes} minutes sur `,
          wa('contact'),
          '.',
        ],
      },
    ],
  },
  {
    id: 'samsungLg',
    q: (v) => `Pourquoi l'application sur ma TV Samsung ou LG est-elle payante (~${v.playerPrice}) et comment l'activer ?`,
    a: (v) => [
      {
        p: [
          `L'application officielle Atlas Pro n'étant pas présente sur les stores fermés Samsung et LG, il faut utiliser un lecteur partenaire (IBO Player, IBO Player Smarter, Hot Player, Bob Player) qui coûte environ ${v.playerPrice} / an (après ${v.trialDays} jours d'essai gratuit). Ces lecteurs offrent une stabilité irréprochable, un EPG instantané et la reprise de lecture VOD à la seconde exacte.`,
        ],
      },
      {
        p: [
          'Pour vous simplifier la vie, notre équipe peut activer directement ce lecteur pour vous et y injecter votre abonnement Atlas Pro en même temps : envoyez-nous simplement votre adresse MAC et Device Key sur ',
          wa('help', true),
          ' !',
        ],
      },
    ],
  },
  {
    id: 'content',
    q: () => "Quels sont les contenus et chaînes inclus dans l'abonnement Atlas Pro 2026 ?",
    a: (v) => [
      {
        p: [
          `Votre abonnement inclut +${v.channels} chaînes en direct (France, Europe, International, dont +${v.sportsChannels} chaînes sportives premium en Full HD H.265), +${v.films} films et +${v.series} séries (${v.episodes} épisodes) en 4K et Full HD mis à jour quotidiennement, ainsi que le Replay sur ${v.replayDays} jours sur +${v.replayChannels} chaînes.`,
        ],
      },
    ],
  },
  {
    id: 'connect',
    q: () =>
      'Comment résoudre le problème « Atlas Pro ne peut pas se connecter au serveur », « Atlas Pro ON TV erreur de lecture » ou « Pourquoi Atlas Pro TV ne fonctionne plus » ?',
    a: (v) => [
      {
        cards: [
          [
            b("Cas N°1 — Sur l'application officielle Atlas Pro (Android / Box TV) :"),
            " Les messages « Atlas Pro ne peut pas se connecter au serveur » ou « erreur de lecture » apparaissent généralement en cas d'utilisation d'une ancienne version de l'application, d'un bug temporaire ou d'une incompatibilité avec un système Android trop ancien (nos applications étant optimisées pour les téléviseurs Google TV, smartphones et boîtiers TV Box équipés d'une version Android récente). ",
            b('Solution :'),
            ` Essayez de ressaisir vos informations, videz le cache de l'application dans les paramètres de votre appareil puis reconnectez-vous, ou installez la dernière mise à jour officielle (Atlas Pro ONTV ${v.ontv} ou Atlas Pro Max v${v.max}).`,
          ],
          [
            b('Cas N°2 — Message « La playlist ne fonctionne pas » sur IBO Player, Hot Player, Bob Player ou IBO Smarter :'),
            " Sur ces lecteurs, cette erreur indique le plus souvent que le lien serveur (URL) partagé nécessite une mise à jour. Il suffit alors de modifier le lien ou d'actualiser les données du serveur. ",
            b('Solution immédiate :'),
            ' Contactez simplement notre équipe de support sur ',
            wa('contact', true),
            ' ; nos techniciens actualiseront votre lien et rétabliront votre playlist à distance en quelques secondes !',
          ],
        ],
      },
    ],
  },
  {
    id: 'apple',
    q: () => 'Comment fonctionne Atlas Pro sur iPhone, iPad ou Apple TV (Gratuit vs Payant) ?',
    a: (v) => [
      {
        p: [
          "L'application native Atlas Pro (et Atlas Pro Prime) n'étant pas disponible sur iOS/tvOS, vous avez 2 choix sur l'App Store :",
        ],
      },
      {
        ol: [
          [
            b('Gratuit :'),
            ' Téléchargez Smarters Pro IPTV (Smarters Player Lite) et demandez à notre équipe sur ',
            wa('help'),
            ' vos accès Xtream (URL + Username + Password) ou M3U.',
          ],
          [
            b(`Payant recommandé (~${v.playerPrice} / an) :`),
            ' Téléchargez IBO Player, Hot Player, IBO Player Smarter ou Bob Player pour une fluidité maximale et la reprise de lecture VOD.',
          ],
        ],
      },
    ],
  },
  {
    id: 'smarters',
    q: () =>
      "INFO Utilisateurs LG & SAMSUNG : L'application Smarters affiche l'erreur « Failed to authorize », que faire ?",
    a: () => [
      {
        p: [
          "L'ancienne édition de Smarters sur TV Samsung et LG rencontre régulièrement des bugs (« Failed to authorize ») indépendants de nos serveurs. Téléchargez la dernière mise à jour Smarters Pro sur votre store, ou passez sur IBO Player / Hot Player / Bob Player avec l'aide de notre équipe sur ",
          wa('help', true),
          ' pour une stabilité définitive.',
        ],
      },
    ],
  },
  {
    id: 'serverLink',
    q: () => 'Le lien du serveur ou mon code ne fonctionne pas lorsque je saisis mes informations, pourquoi ?',
    a: () => [
      {
        p: [
          "Assurez-vous d'abord que l'URL commence par ",
          { code: 'http://' },
          ' (sans « s »). Afin de garantir une sécurité et une stabilité maximales en France et en Europe, nous mettons régulièrement à jour nos liaisons serveurs privées. Contactez simplement notre support sur ',
          wa('help', true),
          ' pour recevoir instantanément vos paramètres actualisés ou laisser notre équipe configurer votre écran.',
        ],
      },
    ],
  },
  {
    id: 'enterCode',
    q: () => 'Comment entrer le code Atlas Pro et où trouver mon identifiant Atlas Pro ?',
    a: (v) => [
      {
        p: [
          'Vous recevez votre Code Atlas Pro ainsi que votre identifiant Atlas Pro directement sur WhatsApp et par e-mail dès validation de votre commande sur notre portail officiel.',
        ],
      },
      {
        p: [
          b('Comment entrer le code Atlas Pro ?'),
          ` Ouvrez simplement l'application Atlas Pro ONTV ${v.ontv} (ou IBO v${v.ibo}), saisissez votre code dans le champ dédié (« Code Active ») et validez. Sur les versions Atlas Pro Max v${v.max} ou Atlas Pro 9X, vous pouvez vous connecter directement avec votre identifiant (Username) et votre mot de passe.`,
        ],
      },
    ],
  },
  {
    id: 'changeCode',
    q: () => 'Comment changer le code sur Atlas Pro ONTV ?',
    a: () => [
      {
        p: [
          "Pour savoir comment changer le code sur Atlas Pro ONTV (par exemple lors d'un nouvel abonnement ou d'un changement de forfait), rendez-vous sur l'écran d'accueil de l'application et cliquez sur ",
          b("Déconnexion / Changer d'utilisateur"),
          ', ou allez dans les paramètres de votre appareil Android (',
          b('Applications > Atlas Pro ONTV > Vider les données et le cache'),
          "). Relancez ensuite l'application et saisissez votre nouveau Code Atlas Pro.",
        ],
      },
    ],
  },
  {
    id: 'installTv',
    q: () => 'Comment installer Atlas Pro sur la TV (Samsung, LG, TCL, Sony) et comment mettre Atlas Pro sur TV ?',
    a: (v) => [
      {
        p: [
          'Vous vous demandez comment mettre Atlas Pro sur TV ou comment installer Atlas Pro sur la TV ? La méthode dépend de la marque de votre téléviseur :',
        ],
      },
      {
        ul: [
          [
            b('Comment installer Atlas Pro sur la TV TCL, Sony, Philips ou Xiaomi (Android TV / Google TV) :'),
            " Installez l'application gratuite Downloader depuis le Google Play Store, puis entrez ",
            { to: 'apps', text: 'notre code Downloader' },
            ` pour télécharger Atlas Pro ONTV ${v.ontv} APK gratuitement.`,
          ],
          [
            b('Comment installer Atlas Pro sur la TV Samsung et comment installer Atlas Pro ONTV sur la TV LG :'),
            ' Ouvrez le store officiel de votre téléviseur, installez IBO Player, Hot Player, Bob Player ou IBO Smarter Player, puis envoyez votre adresse MAC et Device Key à notre équipe sur ',
            wa('help', true),
            ' qui activera votre écran à distance en 2 minutes.',
          ],
        ],
      },
    ],
  },
  {
    id: 'fireTv',
    q: () => 'Comment installer Atlas Pro sur Fire TV, comment installer Atlas Pro ONTV sur Chromecast et sur iPad ?',
    a: (v) => [
      {
        ul: [
          [
            b('Comment installer Atlas Pro sur Fire TV et comment installer Atlas Pro ONTV sur Chromecast :'),
            " Téléchargez l'application Downloader sur votre clé Amazon Fire TV Stick (4K, Max, Lite) ou votre Chromecast Google TV, autorisez les sources inconnues, et entrez ",
            { to: 'apps', text: 'le code de téléchargement' },
            ` de notre suite gratuite (Atlas Pro ONTV ${v.ontv}, Max v${v.max}, IBO v${v.ibo} ou 9X).`,
          ],
          [
            b('Comment installer Atlas Pro sur iPad et iPhone :'),
            " Rendez-vous sur l'App Store, téléchargez un lecteur gratuit (Smarters Pro IPTV) ou un lecteur haute performance (IBO Player, Hot Player, Bob Player) et contactez notre ",
            wa('help', false, 'support WhatsApp'),
            ' pour recevoir vos identifiants Xtream / M3U ou activer votre appareil.',
          ],
        ],
      },
    ],
  },
  {
    id: 'cast',
    q: () => 'Comment caster Atlas Pro ONTV sur mon téléviseur ?',
    a: () => [
      {
        p: [
          "Pour savoir comment caster Atlas Pro ONTV depuis votre smartphone ou tablette vers votre téléviseur, assurez-vous que les deux appareils sont connectés au même réseau Wi-Fi, puis utilisez la fonction Caster / Diffusion d'écran (Chromecast ou AirPlay). Toutefois, pour une fluidité optimale en Full HD H.265 et 4K sans latence, nous vous recommandons d'installer directement l'application sur votre Smart TV, Fire TV Stick, Chromecast avec Google TV ou Box Android.",
        ],
      },
    ],
  },
]

export const faq = {
  badge: 'AIDE, SUPPORT & FAQ OFFICIELLE',
  title: 'Vos Questions Fréquentes – ATLAS PRO ONTV',
  /** The part of the title shown in violet. */
  titleHighlight: 'ATLAS PRO ONTV',
  subtitle:
    "Tout ce qu'il faut savoir avant, pendant et après la commande de votre abonnement Atlas Pro ONTV sur notre portail officiel.",
  /** Help card next to the questions. */
  help: {
    title: 'Vous ne trouvez pas votre réponse ?',
    text: (minutes: string) =>
      `Notre support technique humain vous répond en moins de ${minutes} minutes sur WhatsApp, 7j/7.`,
    button: 'Écrire au support WhatsApp',
  },
  /** Text of the WhatsApp links in the answers (« WhatsApp (+33 …) »). */
  whatsapp: 'WhatsApp',
  items,
}
