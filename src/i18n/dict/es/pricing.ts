// Spanish (Spain) copy, home how-to-buy, pricing cards, reassurance band; Tienda page with the order configurator.
// Source: ../fr/pricing.ts. Owner: tr-es. Plan names stay the client's product names.
import type { Dict } from '../types.ts'

/** « 1, 2 o 3 » */
const orList = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} o ${items[items.length - 1]}`

export const pricing: Dict['pricing'] = {
  howTo: {
    badge: '🛒 Cómo funciona',
    title: 'Cómo comprar tu suscripción a Atlas Pro ONTV',
    highlight: 'suscripción a',
    subtitle: (minutes: string) =>
      `De tu pedido a tu primer programa en menos de ${minutes} minutos. Así de fácil es activar tu suscripción a Atlas Pro.`,
    step: (n: string) => `Paso ${n}`,
    steps: {
      choose: {
        title: 'Elige tu oferta',
        text: (screens: string[], months: string) =>
          `Selecciona el plan de suscripción a Atlas Pro que mejor se adapte a ti: ${orList(screens)} pantallas durante ${months} meses.`,
        time: '1 minuto',
      },
      pay: {
        title: (pct: string) => `Pago ${pct} seguro`,
        text: 'Paga con total tranquilidad por PayPal o transferencia bancaria (SEPA). Tus transacciones están cifradas de extremo a extremo para tu seguridad.',
        time: '2 minutos',
      },
      receive: {
        title: 'Recibe tus códigos al instante',
        text: 'Tus datos de acceso y tu código Atlas Pro llegan al momento por WhatsApp y por correo electrónico (en menos de 30 segundos). Sin esperas.',
        time: '< 30 segundos',
      },
      install: {
        title: '¡Instala y disfruta!',
        text: (channels: string) =>
          `Descarga la aplicación Atlas Pro ONTV (o el APK de Atlas Pro ONTV, Atlas Pro Max e IBO), introduce tus códigos y disfruta al instante de más de ${channels} canales en directo.`,
        time: 'Al instante',
      },
    },
    timeLabel: 'Tiempo',
  },

  plans: {
    badge: '🏷️ Precios y suscripciones',
    title: 'Elige tu plan Atlas Pro ONTV',
    highlight: 'plan',
    subtitle:
      'No nos engañemos: hay decenas de servicios IPTV, pero pocos cumplen lo que prometen. Atlas Pro ONTV es una de esas excepciones. Pruébalo sin riesgo: si no te convence, te devolvemos tu dinero.',
    names: {
      premium: 'Premium 1 Écran',
      duo: 'Duo 2 Écrans',
      famille: 'Famille 3 Écrans',
    },
    popular: 'El más popular',
    limited: '🔥 Oferta limitada',
    per: (months: string) => `/ ${months} meses`,
    perMonth: (price: string) => `Solo ${price} / mes`,
    cta: 'Suscribirme ahora',
    featuresLabel: (plan: string) => `Incluido en el plan ${plan}`,
    features: {
      codesOne: (months: string) => `1 código de activación oficial (código Atlas Pro) para ${months} meses`,
      codesMany: (count: string) => `${count} códigos de activación oficiales (código Atlas Pro) para ${count} pantallas`,
      quality: 'Calidad 4K (VOD), FHD, HD y SD',
      antiFreeze: 'Sistema anticortes (Anti-Freeze) incluido',
      replay: (days: string) => `Replay de ${days} días + guía de TV completa (EPG)`,
      support: (pct: string) => `Atención al cliente ${pct} en francés`,
      supportVip: (pct: string) => `Soporte VIP ${pct} en francés`,
      links: 'Enlaces personalizados a elegir: formato Xtream Codes o M3U',
      assistance: 'Ayuda con la instalación y servicio posventa',
      warranty: 'Garantía y activación oficial',
      apps: (apps: string) => `Acceso a todas las aplicaciones (${apps})`,
    },
    boutiqueLink: 'Haz tu pedido en 3 clics en la tienda',
  },

  trust: {
    label: 'Garantías y métodos de pago',
    secure: (pct: string) => `Pago ${pct} seguro`,
    instant: 'Activación inmediata',
    protected: (pct: string) => `Acceso ${pct} protegido y garantizado`,
    payment: 'Pago:',
    methods: {
      paypal: 'PayPal',
      sepa: 'Transferencia bancaria / SEPA',
    },
  },

  reassurance: {
    label: 'Nuestros compromisos',
    renewal: {
      title: 'Renovación sencilla',
      text: 'Amplía tu código Atlas Pro en un clic por WhatsApp sin reinstalar tus aplicaciones ni perder tus favoritos.',
      cta: 'Renovar por WhatsApp',
    },
    activation: {
      title: 'Activación rápida',
      text: 'Código Atlas Pro oficial, datos de acceso Xtream y enlace M3U enviados al instante por WhatsApp y por correo electrónico en cuanto se valida el pago.',
    },
    guarantee: {
      title: 'Garantía y seguimiento continuo (satisfecho o te devolvemos tu dinero)',
      text: (months: string) =>
        `Acompañamiento personalizado y garantía total de continuidad durante los ${months} meses de tu suscripción.`,
    },
  },

  configurator: {
    badge: '🛍️ Tienda exprés · Pedido en 3 clics',
    title: 'Configura tu suscripción a Atlas Pro ONTV en 10 segundos',
    subtitle:
      'Selecciona tu dispositivo, el número de códigos que necesitas y tu método de pago para recibir tus accesos al instante por WhatsApp.',
    stepA: { letter: 'A', title: '¿Qué dispositivo tienes?' },
    stepB: { letter: 'B', title: '¿Cuántos códigos Atlas Pro necesitas?' },
    stepC: { letter: 'C', title: 'Tu método de pago preferido' },
    step: (letter: string) => `Paso ${letter}`,
    devices: {
      androidBox: 'TV Box Android',
      samsung: 'Smart TV Samsung',
      lg: 'Smart TV LG',
      firestick: 'Fire TV Stick',
      googleTv: 'Android TV / Google TV',
      apple: 'iPhone / iPad / Apple TV',
      pc: 'PC Windows / Mac',
      formuler: 'Formuler / MAG',
    },
    codes: (count: number) => (count === 1 ? '1 código Atlas Pro' : `${count} códigos Atlas Pro`),
    codesDetail: (plan: string, months: string) => `${plan} · ${months} meses`,
    price: (price: string) => `Precio: ${price}`,
    popular: 'Popular',
    payments: {
      sepa: 'Transferencia bancaria (SEPA)',
      paypal: 'PayPal',
    },
    summary: 'Tu pedido',
    summaryDevice: 'Dispositivo',
    summaryOffer: 'Oferta',
    summaryPayment: 'Pago',
    notChosen: 'Por elegir',
    total: 'Total',
    totalFor: (months: string) => `por ${months} meses`,
    cta: (price: string) => `Pedir ahora por WhatsApp (${price})`,
    needDevice: 'Elige primero tu dispositivo (paso A).',
    needPayment: 'Elige tu método de pago (paso C).',
    ready: 'Tu pedido se envía por WhatsApp, ya redactado: solo tienes que enviarlo.',
    boutiqueLink: 'Abrir la tienda',
  },

  boutique: {
    badge: 'Distribuidor Oficial Autorizado de Atlas Pro ONTV',
    title: 'Tienda Atlas Pro ONTV',
    intro:
      'Contrata tu suscripción a Atlas Pro en 3 clics: tu dispositivo, el número de códigos y tu método de pago. Tu pedido se envía directamente por WhatsApp y recibes tu código Atlas Pro oficial en cuanto se valida el pago por PayPal o transferencia bancaria (SEPA).',
  },
}
