// Spanish (Spain) copy, Descargar page: official app suite and apps & players hub by system.
// Source: ../fr/downloads.ts. Owner: tr-es.
import type { Dict } from '../types.ts'

export const downloads: Dict['downloads'] = {
  suite: {
    badge: 'APLICACIÓN OFICIAL',
    title: {
      ontv: 'ATLAS PRO ONTV',
      and: '&',
      max: 'MAX',
      maxVersion: (version: string) => `V${version}`,
    },
    description:
      'Disfruta de una experiencia fluida en todos tus dispositivos con nuestra suite de aplicaciones oficiales, compatible con móviles, tabletas, televisores y ordenadores.',
    versions: {
      label: 'Ediciones oficiales y secundarias de Atlas Pro',
      mainTitle: 'Ediciones oficiales principales (últimas versiones)',
      secondaryTitle: 'Ediciones secundarias disponibles',
      version: (version: string) => `Versión ${version}`,
      alsoVersion: (version: string) => `versión ${version}`,
      short: (version: string) => `v${version}`,
      status: {
        latest: 'Última versión oficial',
        new: 'Nueva versión',
        previous: 'Versión anterior',
      },
    },
    noteLabel: 'Nota de compatibilidad:',
    note: 'La aplicación oficial Atlas Pro está disponible en los dispositivos Android, en los televisores Google TV recientes y en todos los TV Box con Android (Formuler, Xiaomi, Mecool, etc.; se recomienda una versión reciente de Android para un rendimiento óptimo). También hay versiones oficiales dedicadas para ordenadores con Windows, macOS y Linux.',
    keyPoints: ['Zapping ultrarrápido', 'Interfaz intuitiva', 'EPG integrada'],
    compatLabel: 'Dispositivos compatibles',
    compat: ['Smart TV', 'Android y TV Box', 'Fire Stick', 'iOS', 'Windows / macOS / Linux', 'Multipantalla'],
    cta: 'Ver las descargas',
    media: {
      label: 'Vista previa de la interfaz de las aplicaciones oficiales Atlas Pro',
      tabs: ['En directo', 'Películas', 'Series', 'Replay'],
      epg: 'EPG',
      now: 'Ahora',
      next: 'A continuación',
    },
  },

  hub: {
    badge: 'DESCARGAS · APLICACIONES Y REPRODUCTORES',
    title: 'Descargar Atlas Pro ONTV: centro completo de aplicaciones y reproductores por sistema',
    subtitle:
      'Elige tu sistema: Android, iOS y Apple o PC con Windows y Mac. En Android, Google TV, TV Box, Fire TV Stick y PC, nuestras aplicaciones oficiales Atlas Pro ONTV son 100 % gratuitas.',
    navLabel: 'Elige tu sistema',
    count: (n: number) => (n > 1 ? `${n} aplicaciones` : `${n} aplicación`),
    groups: {
      android: {
        nav: 'Android',
        title: 'Android · Fire Stick · Google TV · Android Box',
        intro:
          'El APK de Atlas Pro ONTV y toda la suite oficial: introduce el código Downloader en la aplicación Downloader de tu Fire TV Stick, Google TV o Box Android, o descarga directamente el archivo APK. Después, activa tu código Atlas Pro.',
        officialTitle: 'Aplicaciones oficiales Atlas Pro (gratis)',
        partnersTitle: 'Reproductores asociados en Android y Fire Stick',
      },
      apple: {
        nav: 'iOS y Apple',
        title: 'iOS y Apple (iPhone · iPad · Apple TV)',
        intro:
          'La aplicación oficial Atlas Pro no está disponible en iOS: descarga uno de nuestros reproductores asociados en la App Store y envíanos su dirección MAC + Device Key por WhatsApp. Nuestro equipo puede activar directamente la aplicación y cargar tu suscripción a Atlas Pro al mismo tiempo.',
      },
      computers: {
        nav: 'PC con Windows y Mac',
        title: 'PC con Windows, Mac (macOS) y Linux',
        intro:
          'Descarga directamente nuestras versiones oficiales dedicadas Atlas Pro para PC con Windows (.EXE), macOS o Linux, abre la aplicación e inicia sesión con tu código Atlas Pro (o con tus datos de acceso).',
        officialTitle: 'Aplicaciones oficiales Atlas Pro (gratis)',
        partnersTitle: 'Reproductores asociados (PC con Windows)',
      },
    },
    playersPrice: (price: string, days: number) => `Reproductores de pago (~${price} al año · ${days} días de prueba gratuita)`,
    card: {
      free: 'Gratis',
      codeLabel: 'Código Downloader',
      copy: 'Copiar',
      copied: '¡Copiado!',
      copyAria: (code: string) => `Copiar el código Downloader ${code}`,
      download: (name: string) => `Descargar ${name} ahora`,
      activationLabel: 'Activación:',
      activation: { code: 'Código Atlas Pro', login: 'Usuario + contraseña' },
      or: 'o',
      systems: {
        android: 'Android / Google TV / Fire Stick',
        androidOnly: 'Android',
        ios: 'iOS / App Store',
        windows: 'PC con Windows',
        mac: 'macOS',
        linux: 'Linux',
      },
      buttonSystems: { ios: 'iOS', windows: 'Windows', mac: 'macOS', linux: 'Linux' },
      withSystem: (name: string, system: string) => `${name} (${system})`,
      windowsRequirement: 'Windows x64 (10+)',
    },
    partnerNames: { iboPlayerPro: 'IBO Player Pro', hotPlayer: 'Hot Player', bobPlayer: 'Bob Player' },
  },

  help: {
    title: '¿Te has atascado en algún paso? Configuramos tu dispositivo contigo.',
    subtitle:
      'Envía un mensaje a nuestro equipo de asistencia por WhatsApp: te guiaremos paso a paso o activaremos directamente tu suscripción a Atlas Pro y tu reproductor a distancia.',
    whatsapp: 'Obtener ayuda por WhatsApp',
    guides: 'Ver las guías de instalación',
    shopLead: '¿Todavía no estás suscrito?',
    shop: 'Elegir mi plan en la tienda',
  },
}
