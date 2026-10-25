// English copy, legal pages: legal notice, privacy policy, terms & conditions. Translation of ../fr/legal.ts
// (owner: tr-en). French law references are kept and named in English where a usual translation exists.
import type { Dict } from '../types.ts'

export const legal: Dict['legal'] = {
  common: {
    badge: 'Legal information',
    updatedLabel: 'Last updated:',
    updated: '25 October 2026',
    toc: 'Contents',
    others: 'Other documents',
    docs: {
      mentions: 'Legal notice',
      confidentialite: 'Privacy policy',
      conditions: 'Terms & Conditions & Money-Back Guarantee',
    },
    help: {
      title: 'A question about this information?',
      text: 'Our team answers on WhatsApp 7 days a week, in French.',
      cta: 'Message us on WhatsApp',
    },
    contact: {
      whatsapp: 'WhatsApp',
      email: 'Email',
    },
    pending: {
      companyName: 'registered company name of the publisher',
      legalForm: 'legal form (and share capital, if applicable)',
      address: 'registered office address',
      registration: 'registration (RCS / SIREN, EU VAT number)',
      publisher: 'name of the publication director',
      host: 'website host (name, address, telephone)',
      email: 'support email address',
    },
  },

  mentions: {
    title: 'Legal notice',
    lead: (domain: string) =>
      `Information about the publisher and host of the website ${domain}, published pursuant to Article 6 of French Law No. 2004-575 of 21 June 2004 on confidence in the digital economy (LCEN).`,
    publisher: {
      title: 'Website publisher',
      intro: (seller: string, domain: string) =>
        `The website ${domain} is published by ${seller}, an official authorised Atlas Pro ONTV distributor.`,
      rows: {
        tradeName: 'Trade name',
        domain: 'Website address',
        activity: 'Activity',
        companyName: 'Registered name',
        legalForm: 'Legal form',
        address: 'Registered office',
        registration: 'Registration',
      },
      activity:
        'Distribution and activation of Atlas Pro subscription codes, installation assistance and customer support.',
    },
    director: {
      title: 'Publication director',
      label: 'Publication director',
    },
    contact: {
      title: 'Contact',
      intro: 'For any question about the website or your subscription:',
    },
    host: {
      title: 'Hosting',
      label: 'Host',
    },
    ip: {
      title: 'Intellectual property',
      paragraphs: [
        'The structure of the website, its texts, illustrations and graphic elements are protected by intellectual property law. Any reproduction or representation, in whole or in part, without the prior written authorisation of the publisher is prohibited.',
        'The trade marks, names and logos of the apps and players mentioned on the website belong to their respective owners. They are mentioned solely to indicate the compatibility of the service.',
      ],
    },
    links: {
      title: 'Links to third-party services',
      paragraphs: [
        'The website links to third-party services: WhatsApp for orders and support, as well as the download pages of the official apps and partner players. These services are subject to their own terms; the publisher is responsible neither for their content nor for their availability.',
      ],
    },
    accuracy: {
      title: 'Accuracy of information',
      paragraphs: [
        'The publisher takes care to ensure the accuracy of the information published (plans, number of channels and titles, app versions, installation guides). This information may change: if in doubt, our team will confirm the latest details on WhatsApp.',
      ],
    },
    data: {
      title: 'Personal data',
      before: 'The processing of your personal data is described in our ',
      link: 'Privacy policy',
      after: '.',
    },
  },

  privacy: {
    title: 'Privacy policy',
    lead: (seller: string, domain: string) =>
      `What data is processed when you visit ${domain} or order an Atlas Pro subscription from ${seller}, why, and how to exercise your rights.`,
    summary: {
      title: 'In brief',
      items: [
        'No customer account, no form and no payment on the website.',
        'No cookies, no advertising trackers and no audience measurement tools.',
        'Your orders go through a WhatsApp conversation that you open yourself.',
        'Your data is used to process your order, deliver your codes and assist you.',
      ],
    },
    controller: {
      title: 'Data controller',
      before: (seller: string) =>
        `The data controller is ${seller}, publisher of the website. Its full identity is set out in the `,
      link: 'legal notice',
      after: '.',
    },
    notCollected: {
      title: 'What the website does not collect',
      items: [
        'No customer account or personal area.',
        'No forms: nothing you read or choose on the website is sent to us.',
        'No payment on the website: no bank card details are requested or stored there.',
        'No cookies, no advertising trackers, no audience measurement tools.',
        'Fonts are hosted with the website: your browser does not contact any third-party service to display the pages.',
      ],
    },
    browsing: {
      title: 'Browsing the website',
      paragraphs: [
        'Like any web server, the website host may record technical connection data (IP address, date and time, page requested, browser type) to ensure the security and proper functioning of the website. Legal basis: our legitimate interest in protecting the website.',
      ],
    },
    whatsapp: {
      title: 'Orders and support on WhatsApp',
      intro: [
        'The order, activation, renewal and help buttons open WhatsApp with a pre-filled message. Nothing is sent to us until you send that message.',
        'When you write to us, we process the information you provide in the conversation:',
      ],
      items: [
        'your WhatsApp number and profile name;',
        'the plan chosen, your device and the payment method chosen;',
        'your email address, for sending your Atlas Pro Code and login details;',
        'your current code or username when you renew;',
        'information needed for support (device, app, error message, screenshots you choose to send).',
      ],
      outro: [
        'This data is used to process your order, deliver and activate your codes, assist you and manage your renewals. Legal basis: performance of the contract you enter into with us (Article 6(1)(b) GDPR).',
        'WhatsApp is a third-party service, subject to its own terms of use and its own privacy policy.',
      ],
    },
    payment: {
      title: 'Payment',
      paragraphs: [
        'Payment is made by PayPal or by SEPA bank transfer, according to the information given in the WhatsApp conversation. No payment takes place on the website.',
        'We receive the transaction information: account holder’s name, amount, date and payment reference (and, for a transfer, the bank details shown on the transaction). PayPal processes your payment data in accordance with its own privacy policy.',
        'This data is used to confirm your payment and to meet our accounting obligations. Legal basis: performance of the contract and our legal obligations.',
      ],
    },
    recipients: {
      title: 'Recipients',
      team: (seller: string) =>
        `Your data is processed by the ${seller} team and by the service providers required for the service: WhatsApp (messaging), PayPal or your bank (payment), the website host (technical connection data).`,
      transfers:
        'Some of these providers may process data outside the European Union, subject to the safeguards provided for by the GDPR.',
    },
    retention: {
      title: 'Retention periods',
      intro:
        'We keep your data for as long as necessary for the purposes described above and then delete it, unless the law requires us to keep it.',
      rows: {
        order: { label: 'Conversation and order data', what: 'retention period for conversations and order data' },
        accounting: { label: 'Payments and accounting records', what: 'retention period for payment data and accounting records' },
        logs: { label: 'Technical connection data', what: 'retention period for the host’s logs' },
      },
    },
    rights: {
      title: 'Your rights',
      paragraphs: [
        'Under the General Data Protection Regulation (GDPR) and the French Data Protection Act (loi « Informatique et Libertés »), you have the right to access, rectify, erase, restrict, object to and port your data.',
        'To exercise these rights, write to us on WhatsApp or by email (contact details below). We will reply within one month at most.',
        'If you believe your rights have not been respected, you may lodge a complaint with the data protection authority of your country (in France, the CNIL).',
      ],
    },
    cookies: {
      title: 'Cookies',
      paragraphs: [
        'The website sets no cookies and uses no trackers, so no consent banner is required. Should this change, this policy will be updated and your consent requested where the law requires it.',
      ],
    },
    changes: {
      title: 'Changes',
      paragraphs: [
        'We may update this policy to reflect changes to the website or our services. The date of the last update is shown at the top of this page.',
      ],
    },
  },

  terms: {
    title: 'Terms & Conditions & Money-Back Guarantee',
    lead: (seller: string) =>
      `The terms of sale of the Atlas Pro subscriptions offered by ${seller}, official authorised Atlas Pro ONTV distributor, and our money-back guarantee.`,
    scope: {
      title: 'Purpose',
      text: (seller: string, domain: string) =>
        `These terms and conditions govern the sale of Atlas Pro subscriptions by ${seller} to customers who order from ${domain} or directly on WhatsApp. Placing an order implies acceptance of these terms.`,
    },
    seller: {
      title: 'The seller',
      before: (seller: string) =>
        `The seller is ${seller}, official authorised Atlas Pro ONTV distributor. Its full contact details are set out in the `,
      link: 'legal notice',
      after: '.',
    },
    service: {
      title: 'The service',
      offer: (v: { months: string; channels: string; films: string; series: string; replayDays: string; replayChannels: string }) =>
        `The Atlas Pro subscription gives access, for ${v.months} months, to the Atlas Pro ONTV offer: +${v.channels} live channels, a video-on-demand catalogue (+${v.films} films and +${v.series} series) and ${v.replayDays}-day Replay on +${v.replayChannels} channels.`,
      codes: 'Each plan includes one Atlas Pro Code per screen.',
      apps: (apps: string) =>
        `The service is used with our free official apps (${apps}) or with a compatible partner player (Xtream Codes login details or M3U link).`,
      players: (price: string, days: string) =>
        `Some partner players, notably on Samsung and LG Smart TVs, are paid apps sold by their publisher (around ${price} per year, after a ${days}-day free trial). This cost is not included in the Atlas Pro subscription.`,
      requirements: {
        before: 'The service requires an internet connection and a compatible device. Before ordering, read our ',
        install: 'installation guides',
        middle: ' and the ',
        downloads: 'Download',
        after: ' page, or ask our team for advice.',
      },
    },
    plans: {
      title: 'Plans and prices',
      intro: 'The following plans are offered:',
      columns: { plan: 'Plan', duration: 'Term', price: 'Price' },
      names: { premium: 'Premium 1 Écran', duo: 'Duo 2 Écrans', famille: 'Famille 3 Écrans' },
      months: (months: string) => `${months} months`,
      pricePending: 'plan price',
      notes: [
        'Prices are shown in euros. The applicable price is the one displayed at the time of ordering and confirmed in the WhatsApp conversation.',
      ],
      vat: { label: 'VAT', what: 'VAT statement (price including VAT or “VAT not applicable”)' },
    },
    order: {
      title: 'Ordering',
      steps: [
        'Choose your plan and click its button: WhatsApp opens with a pre-filled message. The Shop also lets you specify your device and payment method.',
        'Send the message: our team confirms the plan, the price and the payment details.',
        'The order is final once your payment has been confirmed.',
      ],
      shop: 'Open the Shop',
    },
    payment: {
      title: 'Payment',
      paragraphs: [
        'The price of the plan is paid by PayPal or by SEPA bank transfer, according to the information provided in the WhatsApp conversation. No bank card payment takes place on the website.',
      ],
    },
    delivery: {
      title: 'Delivery and activation',
      paragraphs: [
        'Once your payment has been confirmed, your official Atlas Pro Code (along with your Xtream / M3U access) is sent to you on WhatsApp and by email. During our opening hours, delivery is almost instant (usually within 3 to 15 minutes).',
        'Nothing received? Check your junk (spam) folder, then message our team on WhatsApp: an adviser will send you your Atlas Pro Code straight away.',
        'Our team assists you with installation and activation on your device.',
      ],
      rows: {
        hours: { label: 'Opening hours', what: 'team opening hours (code delivery)' },
        start: { label: 'Start of the subscription', what: 'start date of the subscription (delivery or first activation of the code)' },
      },
    },
    renewal: {
      title: 'Term and renewal',
      paragraphs: [
        (months: string) =>
          `The subscription lasts ${months} months. It does not renew automatically: no payment is ever taken without your request.`,
        (months: string) =>
          `To renew, contact us on WhatsApp with your current code or username. As soon as your payment (PayPal or SEPA) is confirmed, your subscription is extended for ${months} months within minutes. You keep the app you have already installed and your favourites lists, with nothing to reinstall.`,
      ],
    },
    support: {
      title: 'Support',
      text: (minutes: string) =>
        `Our customer support, 100% in French, is available 7 days a week on WhatsApp and by email: installation help, app downloads, recovery of lost codes or connection diagnostics. We reply in under ${minutes} minutes on average, including evenings and weekends.`,
    },
    guarantee: {
      title: 'Money-Back Guarantee',
      quote: 'Try it risk-free — money back if it is not right for you.',
      continuity: (months: string) =>
        `Guarantee & Ongoing Follow-Up: personalised support and a full continuity guarantee throughout your ${months}-month subscription.`,
      how: 'To claim under the guarantee, contact our team on WhatsApp or by email, stating your Atlas Pro code or username.',
      rows: {
        window: { label: 'Deadline for claiming', what: 'deadline for requesting a refund' },
        conditions: { label: 'Conditions', what: 'conditions of the money-back guarantee' },
        amount: { label: 'Amount refunded', what: 'amount refunded (full or pro rata)' },
        method: { label: 'Refund method and timeframe', what: 'refund method and timeframe' },
      },
    },
    withdrawal: {
      title: 'Right of withdrawal',
      label: 'Right of withdrawal',
      what: 'right of withdrawal: period, how to exercise it, and the case of a code supplied immediately with your consent',
    },
    disputes: {
      title: 'Complaints and disputes',
      text: 'If you have a problem, please contact our team first on WhatsApp or by email: we will work with you to find an amicable solution.',
      rows: {
        mediator: { label: 'Consumer mediator', what: 'consumer mediator (name and contact details)' },
        law: { label: 'Governing law and jurisdiction', what: 'governing law and competent court' },
      },
    },
    changes: {
      title: 'Changes to these terms',
      text: 'The terms applicable to your order are those in force on the date of that order.',
    },
  },
}
