// French copy, legal pages: mentions légales, confidentialité, conditions générales. Owner: pages.
// The brief's French copy is the source: use it as written. Translations in ../<lang>/legal.ts must have exactly
// the same keys (TypeScript checks it). No business number, price, version, code or link here: read those from
// src/lib/facts.ts. WhatsApp messages live in src/lib/whatsapp.ts and stay French.
//
// The brief gives no legal text. These pages describe the business as the brief describes it (orders and support on
// WhatsApp, payment by PayPal or SEPA transfer, no payment, account or form on the site) and invent nothing: every
// term the client has not given (identity of the publisher, host, refund window, governing law…) is a « pending »
// row: « À compléter » in review mode, left out in launch mode.
export const legal = {
  common: {
    badge: 'Informations légales',
    updatedLabel: 'Dernière mise à jour :',
    /** Fixed date of this version of the three documents. Change it when the text changes. */
    updated: '25 octobre 2026',
    toc: 'Sommaire',
    others: 'Autres documents',
    docs: {
      mentions: 'Mentions légales',
      confidentialite: 'Politique de confidentialité',
      conditions: 'Conditions Générales & Garantie Satisfait ou Remboursé',
    },
    help: {
      title: 'Une question sur ces informations ?',
      text: 'Notre équipe vous répond sur WhatsApp 7j/7, en français.',
      cta: 'Nous écrire sur WhatsApp',
    },
    contact: {
      whatsapp: 'WhatsApp',
      email: 'E-mail',
    },
    /** What each missing client fact is (shown in the « À compléter » marker). */
    pending: {
      companyName: 'raison sociale de l’éditeur',
      legalForm: 'forme juridique (et capital social, s’il y a lieu)',
      address: 'adresse du siège',
      registration: 'immatriculation (RCS / SIREN, n° de TVA intracommunautaire)',
      publisher: 'nom du directeur de la publication',
      host: 'hébergeur du site (nom, adresse, téléphone)',
      email: 'adresse e-mail du support',
    },
  },

  mentions: {
    title: 'Mentions légales',
    lead: (domain: string) =>
      `Informations sur l’éditeur et l’hébergeur du site ${domain}, publiées en application de l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN).`,
    publisher: {
      title: 'Éditeur du site',
      intro: (seller: string, domain: string) =>
        `Le site ${domain} est édité par ${seller}, distributeur officiel agréé Atlas Pro ONTV.`,
      rows: {
        tradeName: 'Nom commercial',
        domain: 'Adresse du site',
        activity: 'Activité',
        companyName: 'Raison sociale',
        legalForm: 'Forme juridique',
        address: 'Siège',
        registration: 'Immatriculation',
      },
      activity:
        'Distribution et activation de codes d’abonnement Atlas Pro, assistance à l’installation et support client.',
    },
    director: {
      title: 'Directeur de la publication',
      label: 'Directeur de la publication',
    },
    contact: {
      title: 'Contact',
      intro: 'Pour toute question sur le site ou sur votre abonnement :',
    },
    host: {
      title: 'Hébergement',
      label: 'Hébergeur',
    },
    ip: {
      title: 'Propriété intellectuelle',
      paragraphs: [
        'La structure du site, ses textes, ses illustrations et ses éléments graphiques sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou représentation, totale ou partielle, sans l’autorisation écrite préalable de l’éditeur est interdite.',
        'Les marques, noms et logos des applications et des lecteurs cités sur le site appartiennent à leurs titulaires respectifs. Ils ne sont mentionnés que pour indiquer la compatibilité du service.',
      ],
    },
    links: {
      title: 'Liens vers des services tiers',
      paragraphs: [
        'Le site renvoie vers des services tiers : WhatsApp pour les commandes et l’assistance, ainsi que les pages de téléchargement des applications officielles et des lecteurs partenaires. Ces services sont soumis à leurs propres conditions ; l’éditeur n’est responsable ni de leur contenu ni de leur disponibilité.',
      ],
    },
    accuracy: {
      title: 'Exactitude des informations',
      paragraphs: [
        'L’éditeur veille à l’exactitude des informations publiées (formules, nombre de chaînes et de contenus, versions des applications, guides d’installation). Ces informations peuvent évoluer : en cas de doute, notre équipe vous confirme les éléments à jour sur WhatsApp.',
      ],
    },
    data: {
      title: 'Données personnelles',
      before: 'Le traitement de vos données personnelles est décrit dans notre ',
      link: 'Politique de confidentialité',
      after: '.',
    },
  },

  privacy: {
    title: 'Politique de confidentialité',
    lead: (seller: string, domain: string) =>
      `Quelles données sont traitées lorsque vous consultez ${domain} ou commandez un abonnement Atlas Pro auprès de ${seller}, pourquoi, et comment exercer vos droits.`,
    summary: {
      title: 'En bref',
      items: [
        'Aucun compte client, aucun formulaire et aucun paiement sur le site.',
        'Aucun cookie, aucun traceur publicitaire ni outil de mesure d’audience.',
        'Vos commandes passent par une conversation WhatsApp que vous ouvrez vous-même.',
        'Vos données servent à traiter votre commande, à vous livrer vos codes et à vous assister.',
      ],
    },
    controller: {
      title: 'Responsable du traitement',
      before: (seller: string) =>
        `Le responsable du traitement est ${seller}, éditeur du site. Son identité complète figure dans les `,
      link: 'mentions légales',
      after: '.',
    },
    notCollected: {
      title: 'Ce que le site ne collecte pas',
      items: [
        'Pas de compte client ni d’espace personnel.',
        'Pas de formulaire : rien de ce que vous lisez ou choisissez sur le site ne nous est transmis.',
        'Pas de paiement sur le site : aucune donnée de carte bancaire n’y est demandée ni enregistrée.',
        'Pas de cookie, pas de traceur publicitaire, pas d’outil de mesure d’audience.',
        'Les polices de caractères sont hébergées avec le site : votre navigateur ne contacte aucun service tiers pour afficher les pages.',
      ],
    },
    browsing: {
      title: 'Consultation du site',
      paragraphs: [
        'Comme tout serveur web, l’hébergeur du site peut enregistrer des données techniques de connexion (adresse IP, date et heure, page demandée, type de navigateur) pour assurer la sécurité et le bon fonctionnement du site. Base légale : notre intérêt légitime à protéger le site.',
      ],
    },
    whatsapp: {
      title: 'Commande et assistance sur WhatsApp',
      intro: [
        'Les boutons de commande, d’activation, de renouvellement et d’aide ouvrent WhatsApp avec un message pré-rempli. Rien ne nous est transmis tant que vous n’avez pas envoyé ce message.',
        'Lorsque vous nous écrivez, nous traitons les informations que vous nous communiquez dans la conversation :',
      ],
      items: [
        'votre numéro WhatsApp et le nom de votre profil ;',
        'la formule choisie, votre appareil et le mode de paiement choisi ;',
        'votre adresse e-mail, pour l’envoi de votre Code Atlas Pro et de vos identifiants ;',
        'votre code ou identifiant actuel lors d’un renouvellement ;',
        'les informations utiles à l’assistance (appareil, application, message d’erreur, captures d’écran que vous choisissez d’envoyer).',
      ],
      outro: [
        'Ces données servent à traiter votre commande, à vous livrer et activer vos codes, à vous assister et à gérer vos renouvellements. Base légale : l’exécution du contrat que vous concluez avec nous (article 6.1.b du RGPD).',
        'WhatsApp est un service tiers, soumis à ses propres conditions d’utilisation et à sa propre politique de confidentialité.',
      ],
    },
    payment: {
      title: 'Paiement',
      paragraphs: [
        'Le paiement se fait par PayPal ou par virement bancaire SEPA, selon les informations données dans la conversation WhatsApp. Aucun paiement n’a lieu sur le site.',
        'Nous recevons les informations de la transaction : nom du titulaire, montant, date et référence du paiement (et, pour un virement, les coordonnées bancaires qui figurent sur l’opération). PayPal traite vos données de paiement selon sa propre politique de confidentialité.',
        'Ces données servent à confirmer votre règlement et à respecter nos obligations comptables. Base légale : l’exécution du contrat et nos obligations légales.',
      ],
    },
    recipients: {
      title: 'Destinataires',
      team: (seller: string) =>
        `Vos données sont traitées par l’équipe de ${seller} et par les prestataires nécessaires au service : WhatsApp (messagerie), PayPal ou votre banque (paiement), l’hébergeur du site (données techniques de connexion).`,
      transfers:
        'Certains de ces prestataires peuvent traiter des données en dehors de l’Union européenne, dans le cadre des garanties prévues par le RGPD.',
    },
    retention: {
      title: 'Durées de conservation',
      intro:
        'Nous conservons vos données le temps nécessaire aux finalités décrites ci-dessus, puis nous les supprimons, sauf obligation légale de conservation.',
      rows: {
        order: { label: 'Conversation et données de commande', what: 'durée de conservation des conversations et données de commande' },
        accounting: { label: 'Paiements et pièces comptables', what: 'durée de conservation des données de paiement et pièces comptables' },
        logs: { label: 'Données techniques de connexion', what: 'durée de conservation des journaux de l’hébergeur' },
      },
    },
    rights: {
      title: 'Vos droits',
      paragraphs: [
        'Conformément au Règlement général sur la protection des données (RGPD) et à la loi « Informatique et Libertés », vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données.',
        'Pour exercer ces droits, écrivez-nous sur WhatsApp ou par e-mail (coordonnées ci-dessous). Nous vous répondons dans un délai d’un mois au plus.',
        'Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de l’autorité de protection des données de votre pays (en France, la CNIL).',
      ],
    },
    cookies: {
      title: 'Cookies',
      paragraphs: [
        'Le site ne dépose aucun cookie et n’utilise aucun traceur : aucun bandeau de consentement n’est donc nécessaire. Si cela devait changer, cette politique serait mise à jour et votre consentement demandé lorsque la loi l’exige.',
      ],
    },
    changes: {
      title: 'Modifications',
      paragraphs: [
        'Nous pouvons mettre à jour cette politique pour refléter une évolution du site ou de nos services. La date de la dernière mise à jour figure en haut de cette page.',
      ],
    },
  },

  terms: {
    title: 'Conditions Générales & Garantie Satisfait ou Remboursé',
    lead: (seller: string) =>
      `Les conditions de vente des abonnements Atlas Pro proposés par ${seller}, distributeur officiel agréé Atlas Pro ONTV, et notre garantie satisfait ou remboursé.`,
    scope: {
      title: 'Objet',
      text: (seller: string, domain: string) =>
        `Les présentes conditions générales régissent la vente des abonnements Atlas Pro par ${seller} aux clients qui commandent depuis ${domain} ou directement sur WhatsApp. Passer commande implique l’acceptation de ces conditions.`,
    },
    seller: {
      title: 'Le vendeur',
      before: (seller: string) =>
        `Le vendeur est ${seller}, distributeur officiel agréé Atlas Pro ONTV. Ses coordonnées complètes figurent dans les `,
      link: 'mentions légales',
      after: '.',
    },
    service: {
      title: 'Le service',
      offer: (v: { months: string; channels: string; films: string; series: string; replayDays: string; replayChannels: string }) =>
        `L’abonnement Atlas Pro donne accès, pendant ${v.months} mois, à l’offre Atlas Pro ONTV : +${v.channels} chaînes en direct, un catalogue de vidéo à la demande (+${v.films} films et +${v.series} séries) et le Replay ${v.replayDays} jours sur +${v.replayChannels} chaînes.`,
      codes: 'Chaque formule comprend un Code Atlas Pro par écran.',
      apps: (apps: string) =>
        `Le service s’utilise avec nos applications officielles gratuites (${apps}) ou avec un lecteur partenaire compatible (identifiants Xtream Codes ou lien M3U).`,
      players: (price: string, days: string) =>
        `Certains lecteurs partenaires, notamment sur Smart TV Samsung et LG, sont payants auprès de leur éditeur (environ ${price} par an, après un essai gratuit de ${days} jours). Ce coût n’est pas compris dans l’abonnement Atlas Pro.`,
      requirements: {
        before: 'Le service nécessite une connexion internet et un appareil compatible. Avant de commander, consultez nos ',
        install: 'guides d’installation',
        middle: ' et la page ',
        downloads: 'Télécharger',
        after: ', ou demandez conseil à notre équipe.',
      },
    },
    plans: {
      title: 'Formules et prix',
      intro: 'Les formules proposées sont les suivantes :',
      columns: { plan: 'Formule', duration: 'Durée', price: 'Prix' },
      names: { premium: 'Premium 1 Écran', duo: 'Duo 2 Écrans', famille: 'Famille 3 Écrans' },
      months: (months: string) => `${months} mois`,
      pricePending: 'prix de la formule',
      notes: [
        'Les prix sont indiqués en euros. Le prix applicable est celui affiché au moment de la commande et confirmé dans la conversation WhatsApp.',
      ],
      vat: { label: 'TVA', what: 'mention TVA (prix TTC ou « TVA non applicable »)' },
    },
    order: {
      title: 'Commande',
      steps: [
        'Choisissez votre formule et cliquez sur son bouton : WhatsApp s’ouvre avec un message pré-rempli. La Boutique vous permet aussi de préciser votre appareil et votre mode de paiement.',
        'Envoyez le message : notre équipe vous confirme la formule, le prix et les informations de paiement.',
        'La commande est définitive après validation de votre paiement.',
      ],
      shop: 'Ouvrir la Boutique',
    },
    payment: {
      title: 'Paiement',
      paragraphs: [
        'Le prix de la formule se règle par PayPal ou par virement bancaire SEPA, selon les informations transmises dans la conversation WhatsApp. Aucun paiement par carte bancaire n’a lieu sur le site.',
      ],
    },
    delivery: {
      title: 'Livraison et activation',
      paragraphs: [
        'Après validation de votre paiement, votre Code Atlas Pro officiel (ainsi que vos accès Xtream / M3U) vous est envoyé sur WhatsApp et par e-mail. Pendant nos heures d’ouverture, l’envoi est quasi instantané (généralement en moins de 3 à 15 minutes).',
        'Rien reçu ? Vérifiez vos courriers indésirables (spams), puis écrivez à notre équipe sur WhatsApp : un conseiller vous transmet immédiatement votre Code Atlas Pro en direct.',
        'Notre équipe vous accompagne pour l’installation et l’activation sur votre appareil.',
      ],
      rows: {
        hours: { label: 'Heures d’ouverture', what: 'heures d’ouverture de l’équipe (envoi des codes)' },
        start: { label: 'Début de l’abonnement', what: 'point de départ de l’abonnement (envoi ou première activation du code)' },
      },
    },
    renewal: {
      title: 'Durée et renouvellement',
      paragraphs: [
        (months: string) =>
          `L’abonnement dure ${months} mois. Il ne se renouvelle pas automatiquement : aucun prélèvement n’a lieu sans votre demande.`,
        (months: string) =>
          `Pour renouveler, contactez-nous sur WhatsApp en précisant votre code ou identifiant actuel. Dès validation de votre règlement (PayPal ou SEPA), votre abonnement est prolongé pour ${months} mois en quelques minutes. Vous conservez votre application déjà installée et vos listes de favoris, sans rien réinstaller.`,
      ],
    },
    support: {
      title: 'Assistance',
      text: (minutes: string) =>
        `Notre support client 100% en Français est disponible 7j/7 sur WhatsApp et par e-mail : aide à l’installation, téléchargement des applications, récupération de codes perdus ou diagnostic de connexion. Nous répondons en moins de ${minutes} minutes en moyenne, y compris en soirée et durant les week-ends.`,
    },
    guarantee: {
      title: 'Garantie Satisfait ou Remboursé',
      quote: 'Testez sans risque — garantie satisfait ou remboursé si cela ne vous convient pas.',
      continuity: (months: string) =>
        `Garantie & Suivi Continu : accompagnement personnalisé et garantie totale de continuité tout au long de vos ${months} mois d’abonnement.`,
      how: 'Pour faire jouer la garantie, contactez notre équipe sur WhatsApp ou par e-mail en indiquant votre code ou identifiant Atlas Pro.',
      rows: {
        window: { label: 'Délai pour la demander', what: 'délai pour demander le remboursement' },
        conditions: { label: 'Conditions', what: 'conditions de la garantie satisfait ou remboursé' },
        amount: { label: 'Montant remboursé', what: 'montant remboursé (total ou au prorata)' },
        method: { label: 'Mode et délai de remboursement', what: 'mode et délai du remboursement' },
      },
    },
    withdrawal: {
      title: 'Droit de rétractation',
      label: 'Droit de rétractation',
      what: 'droit de rétractation : délai, exercice, et cas d’un code fourni immédiatement avec votre accord',
    },
    disputes: {
      title: 'Réclamations et litiges',
      text: 'En cas de difficulté, contactez d’abord notre équipe sur WhatsApp ou par e-mail : nous recherchons avec vous une solution amiable.',
      rows: {
        mediator: { label: 'Médiateur de la consommation', what: 'médiateur de la consommation (nom et coordonnées)' },
        law: { label: 'Droit applicable et juridiction', what: 'droit applicable et juridiction compétente' },
      },
    },
    changes: {
      title: 'Modification des conditions',
      text: 'Les conditions applicables à votre commande sont celles en vigueur à la date de cette commande.',
    },
  },
}
