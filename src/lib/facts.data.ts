// Jalon — the owner's facts. This is the only file to edit to fill the site in. Owner of this file: copy (T19).
//
// How to fill it in
//   null            not answered yet: replace it with your answer
//   'texte'         text goes between quotes
//   12              a number is typed without quotes, with a dot for cents
//   true / false    yes / no
//   ['a', 'b']      a list: each item between quotes, items separated by commas
//
// ★ REQUIRED marks the facts the site cannot go live without. `npm run launch-check` lists the ones still missing,
// in the order of this file, and the site is not published while one is missing. Every other fact is optional:
// while it is null, its row, sentence or section does not appear on the published site, and nothing replaces it.
// A yes/no fact left null counts as « no ».
//
// Never type a value you are not sure of, and never keep a value from a template: leave null instead.
// Text is printed as typed. Write it as it must read, with the apostrophe ’ and, before ; : ! ? and between a
// number and its unit, a no-break space (typed \u00a0 inside the quotes: 'N\u00a0jours').
// The French words in quotation marks are the marker a missing fact shows on the site (« À compléter · … »).
// Types, labels and helpers live in facts.ts; .team/copy/FACTS.md says where each fact is used.

import type { Facts, Plan } from './facts.ts'

// ── 1. Votre offre ───────────────────────────────────────────────────────────────────────────────────────────

// ★ REQUIRED · « prix » · price: the total price of the plan for its whole duration, in euros, tax as pricing.vat
//   says (a number, no € sign).
//   optional · « prix de référence » · referencePrice: a struck « before » price, only for a real reduction (the
//   lowest price of the 30 days before it).
//   The four durations are a default. To sell other durations, change these lines and PlanId in facts.ts; `slug`
//   is the address of the plan's page (/abonnements/12-mois/).
const p3: Plan = { id: 'p3', months: 3, slug: '3-mois', price: null, referencePrice: null }
const p6: Plan = { id: 'p6', months: 6, slug: '6-mois', price: null, referencePrice: null }
const p12: Plan = { id: 'p12', months: 12, slug: '12-mois', price: null, referencePrice: null }
const p24: Plan = { id: 'p24', months: 24, slug: '24-mois', price: null, referencePrice: null }

export const FACTS: Facts = {
  plans: {
    // ★ REQUIRED · the durations above and the plan that carries « Notre conseil » (featured) are defaults.
    //   Write true once both are right: the advice must be the plan you really advise.
    confirmed: false,
    list: [p3, p6, p12, p24],
    featured: 'p12',
    p3,
    p6,
    p12,
    p24,
    features: {
      // ★ REQUIRED · « contenu des formules » · what every plan includes, as short phrases: ['…', '…']
      included: null,
      // optional · « différences entre les formules » · any real difference besides duration and price, as a
      //   clause ('aucune' if there is none)
      differences: null,
    },
    screens: {
      // ★ REQUIRED · « nombre d’écrans simultanés » · screens that can watch at the same time, in every plan (a number)
      count: null,
      // optional · multi-screen options and their total price per plan:
      //   [{ screens: N, prices: { p3: N, p6: N, p12: N, p24: N } }]. null: one single offer.
      options: null,
    },
    // ★ REQUIRED · « renouvellement automatique ou non » · false: one-off payment, the subscription stops at its
    //   end date; true: it renews automatically
    autoRenew: null,
    renewal: {
      slug: 'renouvellement', // address of the renewal page: leave as it is
      // optional · « identifiant à indiquer et où le trouver » · the identifier a customer gives to renew, and
      //   where they find it (a noun phrase)
      identifier: null,
      // optional · « report des jours restants » · whether the days left are added to the new duration (a clause)
      carryOver: null,
      // optional · « durées et prix de renouvellement » · only if renewals differ from the plans:
      //   [{ months: N, price: N }]. null: the renewal page offers the plan durations at the plan prices.
      durations: null,
    },
    // optional · « changement de durée et temps restant » · switching duration mid-term, and the time left (a clause)
    upgrade: null,
    // optional · « début de l’abonnement » · when the duration starts counting: payment, activation or first
    //   connection (a clause)
    start: null,
  },
  pricing: {
    // ★ REQUIRED · « mention TVA » · 'TTC', or your VAT-exemption mention
    vat: null,
    // optional · « devise » · the currency as written in a sentence. Prices themselves always print in euros.
    currency: null,
  },
  devices: {
    // ★ REQUIRED · « appareils compatibles » · the device families you support, each with the brands, models or
    //   systems to show: { tv: ['…'], box: ['…'], android: ['…'], apple: ['…'], ordinateur: ['…'],
    //   recepteur: ['…'], console: ['…'] }. Leave out a family you do not support.
    supported: null,
  },

  // ── 2. Commande et paiement ────────────────────────────────────────────────────────────────────────────────

  checkout: {
    // ★ REQUIRED · « comment la commande est finalisée et payée » · one of:
    //   'hostedPage' (payment page of a provider) · 'paymentLinks' (one payment link per plan) ·
    //   'message' (order sent on WhatsApp, payment arranged after) · 'externalShop' (an outside shop)
    //   With every mode but 'message', the order button first sends you the order with an order reference (to the
    //   address of contact.formEndpoint). The buyer then sees that reference, with a button to copy it, and opens
    //   the payment address of your mode (just below) with « Ouvrir la page de paiement » (« Ouvrir la boutique »
    //   for a shop). Nothing opens by itself.
    mode: null,
    // ★ REQUIRED with mode 'paymentLinks' · « liens de paiement » · the payment link of each thing you sell, as your
    //   payment provider gives it (it starts with https://):
    //     { p3: 'https://…', p6: 'https://…', p12: 'https://…', p24: 'https://…', renewal: 'https://…' }
    //   p3 … p24 are the plans above, renewal is for renewals. To sell the reseller pack online too, add
    //   resellerPack: 'https://…'; without it, resellers ask for the pack with the form of their page.
    //   A link has one price. If renewals or screen counts have prices of their own, give one link per duration
    //   (renewal: { 3: 'https://…', 6: 'https://…' }, in months) or per screen count (p12: { 1: 'https://…',
    //   2: 'https://…' }), or one address with {amount} in it (see the markers under hostedUrl).
    paymentLinks: null,
    // ★ REQUIRED with mode 'externalShop' · « adresse de la boutique » · the address of your shop ('https://…'),
    //   or leave it null and give the page of each thing you sell in shopLinks, with the names of paymentLinks
    //   ({ p3: 'https://…', …, renewal: 'https://…' }). A page in shopLinks is used for its item even with shopUrl.
    shopUrl: null,
    shopLinks: null,
    // ★ REQUIRED with mode 'hostedPage' · « adresse de la page de paiement » · the address of the payment page of
    //   your provider or your own, with markers that the site replaces for each order:
    //     {plan}    what is bought: p3, p6, p12, p24, renewal or resellerPack
    //     {months}  its duration in months (12), empty for the reseller pack
    //     {amount}  the amount to pay, in euros, with a dot (69.90)
    //     {ref}     the order reference, as it reaches you with the order (K7RX-9AHW)
    //     {email}   the buyer’s e-mail address
    //   It must hold {ref} or {plan}: 'https://paiement.exemple.fr/payer?article={plan}&montant={amount}&ref={ref}'
    //   The same markers work in a payment link or a shop address, where your provider reads them (put {ref} where
    //   it keeps a reference, and each payment shows its order). After a refused or cancelled payment, your
    //   provider can send the buyer back to https://<your domain>/commande/?paiement=refuse (or ?paiement=annule).
    hostedUrl: null,
    // optional · « données demandées à la commande » · the fields of the order form and whether each is required:
    //   [{ id: 'email', required: true }]; ids: firstName, lastName, email, phone, country, device, deviceModel,
    //   macAddress, address. null: names, e-mail, phone and country required, device optional.
    fields: null,
    // optional · « où nous transmettre l’adresse MAC » · how a box's MAC address reaches you (a clause)
    macAddress: null,
  },
  payment: {
    // ★ REQUIRED · « moyens de paiement » · [{ name: '…', kind: 'card', note: null }]; kind is 'card' or 'other';
    //   note: a fee, a discount or the payment instructions of that method, or null
    methods: null,
    // optional · « prestataire de paiement » · your payment provider, as customers know its name
    provider: null,
  },
  delivery: {
    // ★ REQUIRED · « délai d’activation » · time from payment to the access details (typical and maximum), with
    //   any hours of manual processing (a noun phrase)
    delay: null,
    // ★ REQUIRED · « canal d’envoi » · how the access details are sent: ['e-mail'], ['WhatsApp'], ['SMS'] or several
    channel: null,
    // optional · « type d’accès » · what the customer receives: 'playlist', 'codes', 'portal', 'appLogin' (a list)
    credentialTypes: null,
    // optional · « renvoi des accès » · how lost access details are sent again (a clause)
    resend: null,
  },

  // ── 3. Contact ─────────────────────────────────────────────────────────────────────────────────────────────

  support: {
    // ★ REQUIRED · « numéro WhatsApp » · international format, starting with + and the country code
    whatsapp: null,
    // ★ REQUIRED · « adresse e-mail du support »
    email: null,
    // ★ REQUIRED · « horaires du support » · days and hours, French style ('tous les jours, de N\u00a0h à N\u00a0h')
    hours: null,
    // optional · « délai de réponse » · typical response time ('moins de N\u00a0heures'); per channel if they differ
    responseTime: null,
    // optional · « numéro de téléphone » · only if you take calls
    phone: null,
    // optional · « langues du support » · a clause after « en » ('français et en …')
    languages: null,
    // optional · « sujets du formulaire » · subjects offered by the contact form: ['…', '…']
    topics: null,
    // optional · named agents, with their consent: [{ name: '…', role: '…' }]
    team: null,
  },
  contact: {
    // ★ REQUIRED · « envoi du formulaire » · the address of the form service that receives the messages of the three
    //   forms and, with every checkout.mode but 'message', the orders: as the service gives it, starting with
    //   https:// ('https://…'). An address without https:// does not work, nor does an e-mail address; a service on
    //   your own domain is written in full too (https://<your domain>/…).
    formEndpoint: null,
  },

  // ── 4. Votre entreprise et votre site ──────────────────────────────────────────────────────────────────────

  site: {
    // ★ REQUIRED · « nom de domaine » · without https:// ('exemple.fr')
    domain: null,
  },
  company: {
    // ★ REQUIRED · « dénomination sociale » · legal name, or your own name for a sole trader
    legalName: null,
    // ★ REQUIRED · « forme juridique » · SAS, SARL, EI, micro-entreprise…
    form: null,
    // ★ REQUIRED for a company · « capital social » · leave null for a sole trader
    capital: null,
    // ★ REQUIRED · « adresse du siège social »
    address: null,
    // ★ REQUIRED · « ville et numéro d’immatriculation » · 'RCS <ville> <numéro>', or the register that applies to you
    rcs: null,
    // ★ REQUIRED · « numéro SIREN ou SIRET »
    siret: null,
    // ★ REQUIRED · « numéro de TVA ou mention d’exonération »
    vatNumber: null,
    // ★ REQUIRED · « numéro de téléphone » · not a premium-rate number
    phone: null,
    // ★ REQUIRED · « adresse e-mail » · the company's address (legal notice, terms of sale, withdrawal form)
    email: null,
    // ★ REQUIRED · « nom de la personne responsable de la publication »
    director: null,
  },
  host: {
    // ★ REQUIRED · « nom de l’hébergeur »
    name: null,
    // ★ REQUIRED · « adresse de l’hébergeur »
    address: null,
    // ★ REQUIRED · « téléphone de l’hébergeur »
    phone: null,
  },

  // ── 5. Droits des clients ──────────────────────────────────────────────────────────────────────────────────

  withdrawal: {
    // ★ REQUIRED · « règle sans démarrage immédiat » · what happens if the customer does not ask for an immediate
    //   start, as a clause (your lawyer confirms it)
    terms: null,
  },
  refund: {
    terms: {
      // ★ REQUIRED · « conditions de remboursement » · one sentence
      summary: null,
      // ★ REQUIRED · « cas de remboursement » · the cases in which you refund
      cases: null,
      // ★ REQUIRED · « délai et moyen de remboursement »
      payback: null,
    },
    // optional · refund share by elapsed time, only if you refund that way: [{ period: '…', share: '…' }]
    schedule: null,
  },
  cancellation: {
    // ★ REQUIRED · « emplacement du bouton de résiliation » · where « Résilier mon abonnement » leads: a page of
    //   the site ('/contact/') or a short phrase. The law asks for it when contracts are concluded online.
    path: null,
    // ★ REQUIRED · « conditions de résiliation » · what happens when a customer stops before the end: one or two
    //   sentences
    terms: null,
  },
  consumer: {
    mediator: {
      // ★ REQUIRED · « nom du médiateur » · the consumer mediation service you have joined
      name: null,
      // ★ REQUIRED · « site du médiateur »
      website: null,
      // ★ REQUIRED · « adresse du médiateur »
      address: null,
    },
  },

  // ── 6. Données personnelles ────────────────────────────────────────────────────────────────────────────────

  privacy: {
    // ★ REQUIRED · « contact pour les données personnelles » · an e-mail or a postal address
    dpoContact: null,
    processors: {
      // ★ REQUIRED · « prestataires qui reçoivent vos données » · payment, e-mail, form service, messaging:
      //   [{ name: '…', role: '…', country: '…' }]
      list: null,
      // ★ REQUIRED · « transferts hors de l’Union européenne » · any transfer and its safeguard ('aucun' if none)
      transfers: null,
    },
    // ★ REQUIRED · « données techniques du service » · what the TV service records when a customer watches
    //   (connection logs, IP addresses, device identifiers…), as a noun phrase
    serviceData: null,
    retention: {
      // ★ REQUIRED · « durée de conservation » of each kind of data, one line each
      orders: null,
      service: null,
      messages: null,
      accounting: null,
      logs: null,
    },
    // optional · « mesures de sécurité en place » · only the measures you and your host confirm: ['…', '…']
    security: null,
  },

  // ── Optional: everything below can stay null ───────────────────────────────────────────────────────────────

  // Legal pages · « date de cette version » · the date each page takes effect ('N <mois> <année>')
  legal: { lastUpdated: { cgv: null, cgu: null, privacy: null, refund: null } },
  // « base sur laquelle les chaînes et les programmes sont distribués » (licensing): one sentence that stands alone.
  // categories · « thèmes des chaînes »: ['…', '…'], themes only, never a channel name.
  content: { categories: null, licensing: null },
  // live.count · « nombre de chaînes » (a number). regions · « pays et langues couverts »: ['…', '…']
  channels: { live: { count: null }, regions: null },
  // count · films and series (a number). updates · « rythme des ajouts ». genres · [{ name: '…', count: null }].
  // languages · « langues proposées » (audio and subtitles)
  vod: { count: null, updates: null, genres: null, languages: null },
  // « disciplines couvertes »: ['…', '…'], disciplines only, never a league, a club or a competition
  sport: { disciplines: null },
  // « qualités d’image »: a list among 'SD', 'HD', 'Full HD', '4K'
  quality: { levels: null },
  // « durée et chaînes concernées » · the catch-up window; false: no catch-up
  catchup: { days: null },
  // « nombre de jours » the programme guide shows ahead; false: no programme guide
  epg: { available: null },
  // « radio incluse ou non »
  radio: { available: null },
  // « débit conseillé » · recommended connection speed per quality level
  internet: { minSpeed: null },
  // sharing · « règles d’installation et de partage ». abroad · « conditions d’usage à l’étranger »
  usage: { sharing: null, abroad: null },
  // own · your own app, if you have one: { name, platforms, features, capabilities, updates, sync, links }
  //   (shape: OwnApp in facts.ts); false: none.
  // thirdParty · « applications conseillées » per device family:
  //   { tv: [{ name: '…', storeUrl: '…', fileUrl: null, version: null, date: null, paidLicence: false }] }
  apps: { own: null, thirdParty: null },
  // an extra setup step per device family (server address format, app setting): { tv: '…' }
  guides: { devices: null },
  // « où trouver les codes » promo; false: no promo codes
  promo: { codes: null },
  // « démarche pour recevoir une facture »
  invoice: { delivery: null },
  // offered · true or false. terms · duration « durée de l’essai », in figures as it follows « un essai de »
  //   ('24\u00a0heures', '7\u00a0jours'), price « prix de l’essai » ('gratuit' or an amount), how « démarche »,
  //   limits « limites de l’essai », mode: 'request' (on WhatsApp or by e-mail) or 'cart'. The trial shows once
  //   offered is true and mode is given. 'cart' needs a trial page (/abonnements/essai/) that is not built yet:
  //   until the team builds it, the trial bands offer the request buttons, as with 'request'.
  trial: { offered: null, terms: { duration: null, price: null, how: null, limits: null, mode: null } },
  // « canal d’annonces » · an announcement channel: { name: '…', url: '…' }; false: none
  community: { channel: null },
  // « adresse de l’espace client » · the URL of a customer portal you run
  account: { portal: null },
  // social profiles for the footer: [{ network: '…', url: '…' }]
  social: { accounts: null },
  // offered · true or false: the reseller page and every link to it show only with true. The other lines are the
  //   terms of the programme (pack, credits per duration, test accounts, panel functions, rules, contact).
  reseller: {
    offered: null,
    entryPack: { credits: null, price: null, includes: null, condition: null },
    creditCosts: null,
    creditExpiry: null,
    trialAccounts: null,
    panel: null,
    rules: { channels: null, pricing: null, support: null },
    contact: null,
  },
  // Proof, only with a source: rating { value, count, source, url } · customers { value, asOf } · countries (a
  //   number) · reviews { items, source }, with the authors' consent · uptime « taux et période » ·
  //   recommendRate { value, survey } · history (founding year and real milestones)
  proof: {
    rating: null,
    customers: null,
    countries: null,
    reviews: null,
    uptime: null,
    recommendRate: null,
    history: null,
  },
  // appScreens · real screenshots of your app: [{ src: '…', alt: '…' }].
  // demoVideo · { url, poster, title, tool } · url: a video file served with the site (.mp4, .webm or .ogg, in
  //   public/), or the address of the embeddable player of a video host (YouTube, Vimeo…). A host's player sets its
  //   own cookies: write in tool the name of that host's tool exactly as in cookies.tools below, and list it there
  //   with consent: true; the player then shows only with the visitor's agreement (`npm run launch-check` asks for
  //   tool with a player's address). poster: an image of the site itself (in public/), not one from the video host,
  //   since it shows before any choice.
  media: { appScreens: null, demoVideo: null },
  // analytics, advertising or embedded-media tools that set cookies:
  //   [{ name: '…', purpose: '…', duration: '…', consent: true }], one per tool, each with its four lines:
  //   name as visitors know it (two tools never share one) · purpose « à quoi il sert », a clause that follows
  //   « pour » ('compter les visites et les pages vues') · duration of its cookies ('13\u00a0mois') ·
  //   consent: true when it needs the visitor’s agreement (nearly every tool), false only if the site cannot work
  //   without it. A tool with consent: true brings the consent banner (« Tout refuser », « Tout accepter »,
  //   « Personnaliser ») and the « Gérer mes cookies » button of the privacy page. Listing a tool here does not
  //   install it: the team adds it to the site, behind that banner. null: no tool, so no banner.
  cookies: { tools: null },
  // leave null, or write false: the site sells subscriptions only. It has no device page, no delivery and no clause
  //   for the sale of goods in its terms of sale, so `npm run launch-check` stops on true until that part is built.
  shop: { physicalDevices: null },
}
