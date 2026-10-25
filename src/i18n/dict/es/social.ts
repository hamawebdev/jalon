// Spanish (Spain) copy, home device compatibility, brand pillars, reviews. Source: ../fr/social.ts. Owner: tr-es.
import type { Dict } from '../types.ts'
import type { ReviewVars } from '../fr/social.ts'

export const social: Dict['social'] = {
  compat: {
    title: 'Compatible con todos tus dispositivos y pantallas',
    highlight: 'todos tus dispositivos',
    subtitle:
      'Descubre una compatibilidad universal y nuestras guías de instalación para disfrutar de tu suscripción a Atlas Pro ONTV en cualquier pantalla.',
    guide: 'Guía de instalación',
    guideFor: (device: string) => `Guía de instalación: ${device}`,
    tv: {
      title: 'Televisores',
      description: 'Configuración rápida y directa en tu Smart TV.',
      pills: ['Samsung', 'LG', 'Sony', '+2'],
    },
    android: {
      title: 'Android',
      suite: 'Suite oficial',
      players: 'Reproductores',
      playerNames: ['IBO Player', 'Hot Player', 'IBO Player Smarter', 'Bob Player', 'TiviMate', 'Smarters Pro'],
      pills: ['Box', 'Móvil', 'Tableta'],
    },
    apple: {
      title: 'Apple',
      description: 'Tutorial claro y configuración fluida para dispositivos Apple.',
      pills: ['iPhone', 'iPad', 'Apple TV'],
    },
    box: {
      title: 'Receptores',
      description: 'Instalación de alto rendimiento en todos los modelos.',
      pills: ['Magbox', 'Formuler Z7', 'Formuler Z8'],
    },
  },

  pillars: {
    badge: '✦ ATLASPROTVOFFICIAL · DISTRIBUIDOR AUTORIZADO DE ATLAS PRO ONTV',
    title: '¡Lo que distingue nuestro servicio Atlas Pro ONTV!',
    subtitle:
      'Miles de hogares en Francia, Bélgica, Suiza y Canadá nos confían sus noches de televisión. Descubre por qué nuestros suscriptores de Atlas Pro nos siguen siendo fieles año tras año.',
    distributor: {
      title: 'La exigencia del distribuidor autorizado (un servicio aclamado)',
      body: 'Nuestros suscriptores destacan la transparencia de nuestro acompañamiento y la regularidad ejemplar de la señal de Atlas Pro ONTV, noche tras noche, desde el primer segundo de la activación.',
      seal: 'Distribuidor autorizado de Atlas Pro ONTV',
    },
    screens: {
      title: 'Compatible con todas tus pantallas',
      body: (apps: string) =>
        `Tanto si usas nuestras aplicaciones oficiales gratuitas (${apps}) como un reproductor asociado (IBO Player, Bob Player, Hot Player, Smarters Pro), tu suscripción funciona en Smart TV, Box Android, Firestick, Apple y PC.`,
      devices: ['Smart TV', 'Box Android', 'Firestick', 'Apple', 'PC'],
    },
    quality: {
      title: 'Imagen de alta fidelidad (Full HD H.265 y VOD 4K)',
      body: 'Desde los 480p económicos hasta el Full HD 1080p de alta fluidez en directo, y hasta el Ultra HD 4K en la VOD: la señal de Atlas Pro se adapta automáticamente a tu conexión a Internet sin compresión agresiva.',
      ladder: ['480p', 'Full HD 1080p · Directo', 'Ultra HD 4K · VOD'],
    },
    infra: {
      title: 'Infraestructura europea multiservidor sin congelaciones',
      body: (uptime: string) =>
        `Una red de servidores de alta disponibilidad distribuida por Europa, diseñada para absorber los picos de audiencia durante los grandes eventos deportivos y garantizar una estabilidad del ${uptime} %.`,
      stat: (uptime: string) => `${uptime} %`,
    },
    zapping: {
      title: (seconds: string) => `Zapping ultrarrápido (< ${seconds} s)`,
      body: 'Pasa de un canal a otro en una fracción de segundo gracias a la optimización de la señal de Atlas Pro ONTV, sin pantalla negra ni tiempos de carga.',
      stat: (seconds: string) => `< ${seconds} s`,
    },
    support: {
      title: 'Ayuda y atención personalizada en francés 7 días a la semana',
      body: (phone: string, minutes: string) =>
        `Un asesor técnico te acompaña personalmente por WhatsApp (${phone}) en menos de ${minutes} minutos, desde la validación del pago hasta la activación completa de tu pantalla.`,
      stat: (minutes: string) => `< ${minutes} min`,
      cta: 'Escribir a un asesor',
    },
  },

  reviews: {
    badge: '✦ TESTIMONIOS VERIFICADOS · OPINIONES ATLAS PRO ONTV 2026',
    title: 'La opinión de quienes ven Atlas Pro ONTV a través de nuestro portal',
    subtitle:
      'Descubre las opiniones auténticas (opiniones de Atlas Pro ONTV) de los espectadores que eligieron nuestro portal oficial para activar y renovar su suscripción cada año.',
    trust: {
      rating: (rating: string) => `${rating} / 5`,
      ratingLabel: 'Valoración global (opiniones de Atlas Pro ONTV)',
      customers: (customers: string) => `+${customers}`,
      customersLabel: 'Suscriptores acompañados y fidelizados',
      recommend: (percent: string) => `${percent} %`,
      recommendLabel: 'Recomiendan nuestro soporte 7 días a la semana',
    },
    stars: 'Valoración: 5 de 5',
    countries: { fr: 'Francia', be: 'Bélgica', ch: 'Suiza', ca: 'Canadá' },
    cities: { thomas: 'Lyon', sophie: 'Quebec', karim: 'Namur', marc: 'Burdeos', lucas: 'Toulouse', nadia: 'Ginebra' },
    from: (city: string, country: string, year: string) => `${city}, ${country} · ${year}`,
    screenshotAlt: (name: string) => `Captura de WhatsApp de la opinión de ${name}`,
    screenshotOpen: (name: string) => `Ampliar la captura de WhatsApp de la opinión de ${name}`,
    screenshotPending: (name: string) => `Captura de WhatsApp de la opinión de ${name}`,
    items: {
      thomas: {
        badge: 'Respuesta inmediata',
        quote: (_v: ReviewVars) =>
          'Pedí mi suscripción a Atlas Pro ONTV directamente por su WhatsApp. Un tiempo de respuesta increíble: menos de 3 minutos después de mi transferencia, el asesor ya me había enviado mi código Atlas Pro y todo funcionaba en mi tele.',
      },
      sophie: {
        badge: 'Ayuda y amabilidad',
        quote: (_v: ReviewVars) =>
          'Como no se me da muy bien la tecnología, me daba miedo no saber cómo instalar Atlas Pro ONTV en mi tele Samsung. El soporte tuvo una paciencia admirable: activaron mi reproductor IBO Player y cargaron mi suscripción a distancia, paso a paso. ¡Un servicio humano de verdad!',
      },
      karim: {
        badge: 'Estabilidad y deporte en Full HD',
        quote: (v: ReviewVars) =>
          `Probé con varios vendedores antes de conocer este portal oficial. Con mi plan Duo 2 Écrans y la nueva aplicación ${v.ontv} (y ${v.max}), veo todos los grandes partidos en Full HD H.265 sin el menor corte.`,
      },
      marc: {
        badge: 'Confianza y transparencia',
        quote: (v: ReviewVars) =>
          `Lo que valoro aquí es la franqueza y la seriedad. Como distribuidor autorizado de Atlas Pro, no piden ninguna tarjeta bancaria en la web, el pago por PayPal y transferencia SEPA es seguro y los precios son claros (${v.price} al año). Te da confianza desde el primer momento.`,
      },
      lucas: {
        badge: 'Cine a lo grande y precio amable',
        quote: (_v: ReviewVars) =>
          'Desde que nos pasamos a Atlas Pro ONTV, las noches en familia han cambiado de verdad. El catálogo VOD es enorme (+24.000 películas y +6200 series en 4K y FHD), retomamos los episodios donde los habíamos dejado y el precio nos ahorra una fortuna.',
      },
      nadia: {
        badge: 'Fidelidad y seguimiento',
        quote: (v: ReviewVars) =>
          `Es el segundo año que renuevo mi código Atlas Pro con este equipo. Un simple mensaje a su WhatsApp y mi acceso se amplió ${v.months} meses en cuestión de segundos, sin perder mis favoritos en mi Box Android.`,
      },
    },
    pills: {
      quality: 'Señal Full HD H.265 y VOD 4K',
      zapping: (seconds: string) => `Zapping < ${seconds} s`,
      servers: (uptime: string) => `Servidores sin congelaciones ${uptime} %`,
      price: (monthly: string) => `Desde ${monthly} / mes`,
      catalogue: (films: string, series: string) => `+${films} películas y +${series} series`,
      support: (minutes: string) => `Soporte por WhatsApp < ${minutes} min`,
      apps: (ontv: string, max: string) => `Apps oficiales ${ontv} y ${max}`,
      replay: (days: string) => `Replay de ${days} días`,
    },
  },
}
