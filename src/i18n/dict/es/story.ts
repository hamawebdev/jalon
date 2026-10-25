// Spanish (Spain) copy, home: hero, why Atlas Pro, history, sport, VOD, renewal CTA. Source: ../fr/story.ts.
// Owner: tr-es. Live sport is Full HD 1080p / H.265 only; 4K applies to VOD only.
import type { Dict } from '../types.ts'

export const story: Dict['story'] = {
  fmt: {
    plus: (n: string) => `${n}+`,
    lead: (n: string) => `+${n}`,
    thousands: (n: string) => `${n}K+`,
    /** « 99,99 % » (Spanish: no-break space before %) */
    percent: (n: string) => `${n} %`,
  },

  apps: {
    ontv: (v: string) => `Atlas Pro ONTV ${v}`,
    max: (v: string) => `Max v${v}`,
    ibo: (v: string) => `IBO v${v}`,
    maxFull: (v: string) => `Atlas Pro Max v${v}`,
    iboFull: (v: string) => `Atlas Pro IBO v${v}`,
  },

  hero: {
    badge: '✦ EL IPTV ATLAS PRO N.º 1 EN 2026',
    title: 'Descubre Atlas Pro ONTV (2026)',
    subtitle:
      'IPTV Atlas Pro se ha consolidado como el líder indiscutible de los servicios de streaming. La suscripción a Atlas Pro sigue siendo, como siempre, la referencia absoluta en calidad, estabilidad y experiencia de usuario.',
    useCasesLabel: 'Lo que te importa',
    useCases: {
      uptime: (uptime: string) => `Infraestructura 2026 ultraestable · ${uptime}`,
      sport: 'Directos y grandes eventos deportivos en Full HD · H.265',
      vod: (films: string, series: string) => `${films} películas y ${series} series a la carta`,
      apps: (versions: string) => `Suite oficial: ${versions}`,
      support: (minutes: string) => `Distribuidor oficial y soporte en < ${minutes} min`,
    },
    cta: 'Activar mi código Atlas Pro oficial',
    pricingLink: 'Ver precios',
    guarantees: ['Código oficial 100 % verificado', 'Entrega por WhatsApp y correo electrónico', 'Garantía total durante toda la suscripción'],
    stats: {
      channels: 'Canales de TV de todo el mundo',
      titles: 'Películas y series',
      customers: 'Clientes satisfechos (opiniones de Atlas Pro ONTV)',
      uptime: 'Disponibilidad garantizada',
    },
    visual: {
      online: 'En línea',
      live: 'En directo',
      liveQuality: 'Full HD 1080p · H.265',
      nav: ['TV en directo', 'Películas', 'Series', 'Replay'],
      vodRow: 'Películas y series',
      servers: 'Servidores europeos',
      support: (minutes: string) => `Soporte en < ${minutes} min`,
    },
  },

  why: {
    title: '¿Por qué Atlas Pro ON TV domina el mercado?',
    leader: {
      title: 'Líder IPTV en Francia y Europa',
      text: (years: string) =>
        `Reconocido desde hace más de ${years} años, Atlas Pro ONTV es el proveedor oficial n.º 1 en Francia y en el mundo francófono, y garantiza una estabilidad a toda prueba para tu suscripción a Atlas Pro.`,
      stamp: 'N.º 1',
      region: 'Francia y Europa',
    },
    tech: {
      title: 'Tecnología avanzada',
      text: 'Nuestros servidores están distribuidos estratégicamente por todo el mundo para garantizar una latencia mínima, con codificación H.265 de última generación para una fluidez perfecta.',
    },
    apps: {
      title: 'Ecosistema de aplicaciones oficiales (APK y Box)',
      text: (ontv: string, max: string, ibo: string) =>
        `Disfruta de una experiencia fluida en todos tus dispositivos. Descarga fácilmente el APK de Atlas Pro ONTV, aprovecha la potencia de Atlas Pro Max (versión ${max}) o usa Atlas Pro IBO (v${ibo}). Nuestra aplicación Atlas Pro ONTV ${ontv} está optimizada para todos los box Android, Smart TV y PC.`,
      tag: 'APK',
    },
    world: {
      title: 'Cobertura mundial',
      text: 'La aplicación Atlas Pro ONTV funciona en todas partes: Francia, Bélgica, Suiza, Canadá, EE. UU. y mucho más. Precisión total para tus paquetes de canales favoritos.',
    },
    support: {
      title: 'Soporte 7 días a la semana y opiniones de clientes',
      text: (minutes: string) =>
        `¿Atlas Pro no puede conectarse al servidor? Nuestro equipo técnico francófono está disponible los 7 días de la semana por WhatsApp, con un tiempo de respuesta inferior a ${minutes} minutos.`,
      reviews: 'Descubre las opiniones de Atlas Pro ONTV',
      response: (minutes: string) => `< ${minutes} min`,
    },
    value: {
      title: 'Ahorro y calidad-precio',
      text: 'Por el precio de una sola suscripción a Atlas Pro, accede a un contenido equivalente a decenas de suscripciones por separado (deporte, cine, TV de todo el mundo). El contenido más completo al mejor precio.',
      tags: ['Deporte', 'Cine', 'TV mundial'],
    },
  },

  history: {
    title: 'La historia de Atlas Pro',
    creation: {
      label: (year: string) => `CREACIÓN (${year})`,
      title: 'El nacimiento de Atlas Pro',
      text: 'La aventura de Atlas Pro ONTV comenzó con una visión sencilla: ofrecer una alternativa accesible y fiable a los servicios de streaming tradicionales.',
    },
    expansion: {
      label: 'EXPANSIÓN',
      title: 'Crecimiento internacional',
      text: (generation: string) =>
        `Desarrollo de nuestras propias aplicaciones dedicadas (Atlas Pro ONTV ${generation}, Atlas Pro Max, Atlas Pro IBO) para una experiencia de usuario inigualable en todas las pantallas.`,
    },
    today: {
      label: 'HOY',
      title: 'Líder del mercado',
      text: 'Atlaspro ONTV se ha convertido en la referencia absoluta en calidad, estabilidad de servidor y riqueza de contenido.',
    },
    future: {
      label: 'FUTURO',
      title: 'Innovación continua',
      text: 'Nuestro equipo trabaja sin descanso en nuevas funciones y en la optimización constante de tu IPTV Atlas Pro.',
    },
  },

  sport: {
    title: 'Atlas Pro ON TV y el deporte en directo',
    text: (channels: string) =>
      `Para los amantes del deporte, la suscripción a Atlas Pro es un auténtico paraíso. Incluye todos los grandes canales deportivos y más de ${channels} canales premium (TF1, France 2, M6, etc.). Gracias a nuestros servidores de alto rendimiento, no te perderás ningún evento mundial.`,
    pills: { football: 'Fútbol', basketball: 'Baloncesto', tennis: 'Tenis', cars: 'Motor' },
    visual: {
      live: 'En directo',
      quality: 'Full HD 1080p · H.265',
      channels: (channels: string) => `+${channels} canales premium`,
    },
  },

  vod: {
    title: 'VOD Atlas Pro ONTV (películas y series)',
    text: (films: string, series: string) =>
      `El servicio VOD de Atlas Pro cuenta con más de ${films} películas y ${series} series. Una biblioteca inmensa que se actualiza a diario para tu máximo disfrute.`,
    checks: {
      quality: (ontv: string) => `Calidad 4K y Full HD (optimizada para ${ontv})`,
      subtitles: 'Subtítulos en varios idiomas (incluido el francés)',
      daily: 'Actualización diaria con los últimos estrenos',
      compat: 'Compatible con Atlas Pro Max y Atlas Pro IBO',
    },
    categoriesLabel: 'Categorías',
    categories: {
      action: 'Acción',
      comedy: 'Comedia',
      drama: 'Drama',
      scifi: 'Ciencia ficción',
      horror: 'Terror',
      romance: 'Romance',
      animation: 'Animación',
      documentary: 'Documental',
    },
    visual: {
      allusion: 'Las producciones originales de las mayores plataformas del mundo',
      episodes: (episodes: string) => `${episodes} episodios`,
      quality: '4K UHD y Full HD',
    },
  },

  renewal: {
    title: 'Únete hoy a Atlas Pro ONTV',
    text: 'Descubre lo mejor del IPTV con Atlas Pro 2026. Disfruta de lo mejor de la televisión: deportes en directo, películas recientes y series exclusivas.',
    subscribe: 'Suscribirme ahora (nuevo cliente)',
    renew: 'Renovar aquí (introduce tu código Atlas Pro)',
  },
}
