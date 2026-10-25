// Spanish (Spain) copy, home FAQ (the brief's questions 1–25; the brief has no question 12). Source: ../fr/faq.ts.
// Owner: tr-es. Numbers, prices and versions come in through `v` (FaqValues, already formatted for the language).
import type { Dict } from '../types.ts'
import type { FaqInline, FaqItem, FaqWa } from '../fr/faq.ts'

const b = (text: string): FaqInline => ({ b: text })
const wa = (kind: FaqWa, number = false, text?: string): FaqInline => ({ wa: kind, number, text })

const items: FaqItem[] = [
  {
    id: 'order',
    q: () => '¿Cómo contratar una suscripción a Atlas Pro ONTV en nuestro portal oficial?',
    a: (v) => [
      {
        p: [
          'Haz clic en el botón «Suscribirme ahora» de nuestra ',
          { to: 'pricing', text: 'tabla de precios' },
          ` (Premium ${v.screens.premium} Écran por ${v.price.premium}, Duo ${v.screens.duo} Écrans por ${v.price.duo} o Famille ${v.screens.famille} Écrans por ${v.price.famille}): se abrirá directamente una conversación con un mensaje ya redactado con nuestro equipo en `,
          wa('activate', true),
          ' para validar y activar tu suscripción al instante.',
        ],
      },
    ],
  },
  {
    id: 'delivery',
    q: () => '¿Cuánto tardaré en recibir mi código Atlas Pro y mis datos de acceso?',
    a: () => [
      {
        p: [
          'Durante nuestro horario de atención, el envío de tu ',
          b('código Atlas Pro'),
          ' oficial (junto con tus accesos Xtream / M3U) por WhatsApp y por correo electrónico tras la validación del pago es prácticamente inmediato (normalmente, entre 3 y 15 minutos).',
        ],
      },
    ],
  },
  {
    id: 'email',
    q: () => 'No he recibido el correo electrónico en el plazo indicado, ¿debo preocuparme?',
    a: () => [
      {
        p: [
          'No, tranquilo. Hacemos envíos los 7 días de la semana. Si no ves nada en tu carpeta de correo no deseado (spam), escribe sin más a nuestro equipo por ',
          wa('contact', true),
          ': un asesor te enviará al momento tu código Atlas Pro en directo.',
        ],
      },
    ],
  },
  {
    id: 'otherApps',
    q: () => '¿Puedo usar mi suscripción a Atlas Pro ONTV en otras aplicaciones IPTV?',
    a: (v) => [
      {
        p: [
          `¡Sí, por supuesto! Además de nuestras ${v.appCount} aplicaciones oficiales gratuitas (`,
          b(`Atlas Pro ONTV ${v.ontv}`),
          ', ',
          b(`Atlas Pro Max v${v.max}`),
          ', ',
          b(`Atlas Pro IBO v${v.ibo}`),
          ', ',
          b('Atlas Pro 9X'),
          '), te recomendamos excelentes reproductores de pago como IBO Player, IBO Player Smarter, Hot Player o Bob Player para las Smart TV Samsung/LG y Apple, o reproductores gratuitos como IPTV Smarters Pro (con datos de acceso Xtream o M3U).',
        ],
      },
    ],
  },
  {
    id: 'renew',
    q: () => '¿Cómo renuevo mi código Atlas Pro actual?',
    a: (v) => [
      {
        p: [
          'Haz clic en el botón ',
          { to: 'renewal', text: '«Renovar aquí (introduce tu código Atlas Pro)»' },
          ' o contacta directamente con nosotros por ',
          wa('renewal'),
          ` indicando tu código o identificador actual. En cuanto se valide tu pago (PayPal o SEPA), tu suscripción se amplía ${v.months} meses en pocos minutos.`,
        ],
      },
    ],
  },
  {
    id: 'keepFavorites',
    q: () => '¿Puedo renovar conservando mis favoritos y mi aplicación actual?',
    a: () => [
      {
        p: [
          '¡Sí! Conservas la aplicación que ya tienes instalada y tus listas de favoritos sin necesidad de reinstalarlo todo.',
        ],
      },
    ],
  },
  {
    id: 'download',
    q: (v) => `¿Cómo descargar la aplicación oficial Atlas Pro ONTV ${v.ontv} APK y Atlas Pro Max v${v.max}?`,
    a: () => [
      {
        p: [
          'Ve a nuestra sección ',
          { to: 'install', text: '«Guías de instalación y descarga»' },
          ' justo encima: haz clic directamente en el botón violeta de descarga del APK de la versión que quieras, o introduce su código Downloader oficial en la aplicación Downloader de tu TV/Box/Firestick.',
        ],
      },
    ],
  },
  {
    id: 'activation',
    q: (v) =>
      `¿Qué diferencia hay en la activación de Atlas Pro ONTV ${v.ontv}, Atlas Pro Max v${v.max}, IBO v${v.ibo} y 9X?`,
    a: (v) => [
      {
        ul: [
          [b(`Atlas Pro ONTV ${v.ontvLine} (v${v.ontv}):`), ' se activa únicamente con tu Code Active (código Atlas Pro).'],
          [
            b(`Atlas Pro Max (versión ${v.max}):`),
            ' se activa, a tu elección, con tu Code Active O con usuario (Username) + contraseña (Password).',
          ],
          [b(`Atlas Pro IBO (versión ${v.ibo}):`), ' se activa con tu Code Active.'],
          [b('Atlas Pro 9X:'), ' se activa con usuario (Username) + contraseña (Password).'],
        ],
      },
      {
        note: [
          b('Atención:'),
          ' no compres el Fire TV Stick HD de 2.ª generación con el sistema cerrado Vega OS, porque bloquea la aplicación Downloader.',
        ],
      },
    ],
  },
  {
    id: 'replace',
    q: () => '¿Qué sustituye a Atlas Pro ON TV en 2026?',
    a: (v) => [
      {
        p: [
          `Nada sustituye al original: en 2026, Atlas Pro ONTV se ha reinventado con su propia suite oficial de nueva generación (Atlas Pro ONTV v${v.ontv}, Atlas Pro Max v${v.max}, Atlas Pro IBO v${v.ibo} y Atlas Pro 9X), impulsada por una nueva arquitectura de servidores europea sin cortes, con una disponibilidad del ${v.uptime} %.`,
        ],
      },
    ],
  },
  {
    id: 'countries',
    q: () =>
      '¿La suscripción a Atlas Pro ONTV funciona en Francia, Bélgica, Suiza, Canadá y en el extranjero?',
    a: () => [
      {
        p: [
          'Sí, nuestro servicio funciona en cualquier parte del mundo siempre que tengas una conexión a Internet estable (Francia, Bélgica, Suiza, Canadá, Europa, EE. UU., norte de África, etc.), sin necesidad de VPN.',
        ],
      },
    ],
  },
  {
    id: 'screens',
    q: () => '¿Puedo usar mi suscripción en varias pantallas a la vez?',
    a: (v) => [
      {
        p: [
          `El plan Premium (${v.price.premium}) incluye ${v.screens.premium} pantalla activa. Si quieres ver tus programas en varias pantallas a la vez en familia, elige directamente nuestro `,
          { to: 'pricing', text: `plan Duo ${v.screens.duo} Écrans` },
          ` (${v.price.duo} / ${v.months} meses) o nuestro `,
          { to: 'pricing', text: `plan Famille ${v.screens.famille} Écrans` },
          ` (${v.price.famille} / ${v.months} meses), que te dan ${v.screens.duo} o ${v.screens.famille} códigos oficiales independientes.`,
        ],
      },
    ],
  },
  {
    id: 'oldTv',
    q: () => 'Tengo un televisor antiguo (no Smart), ¿qué solución me ofrecéis?',
    a: () => [
      {
        p: [
          'Solo tienes que conectar un Android TV Box certificado (Xiaomi Mi Box, Mecool, Formuler) o un Amazon Fire TV Stick 4K / 4K Max (con Fire OS) al puerto HDMI de tu televisor para convertirlo en una Smart TV ultrarrápida compatible con todas nuestras aplicaciones gratuitas.',
        ],
      },
    ],
  },
  {
    id: 'trust',
    q: () => '¿Por qué confiar en nuestro portal oficial como distribuidor autorizado?',
    a: (v) => [
      {
        p: [
          `Somos el portal autorizado de referencia en Francia y en Europa, con más de ${v.customers} clientes satisfechos, códigos 100 % oficiales garantizados durante ${v.months} meses, ningún cargo con tarjeta bancaria en la web (pago seguro por PayPal o SEPA), una garantía de satisfacción o reembolso y un soporte técnico humano que responde en menos de ${v.supportMinutes} minutos por `,
          wa('contact'),
          '.',
        ],
      },
    ],
  },
  {
    id: 'samsungLg',
    q: (v) => `¿Por qué la aplicación de mi TV Samsung o LG es de pago (~${v.playerPrice}) y cómo se activa?`,
    a: (v) => [
      {
        p: [
          `Como la aplicación oficial Atlas Pro no está en las tiendas cerradas de Samsung y LG, hay que usar un reproductor asociado (IBO Player, IBO Player Smarter, Hot Player, Bob Player) que cuesta unos ${v.playerPrice} al año (tras ${v.trialDays} días de prueba gratuita). Estos reproductores ofrecen una estabilidad impecable, una EPG instantánea y la reanudación de la VOD en el segundo exacto.`,
        ],
      },
      {
        p: [
          'Para ponértelo fácil, nuestro equipo puede activar directamente este reproductor por ti y cargar en él tu suscripción a Atlas Pro al mismo tiempo: envíanos simplemente tu dirección MAC y tu Device Key por ',
          wa('help', true),
          '.',
        ],
      },
    ],
  },
  {
    id: 'content',
    q: () => '¿Qué contenidos y canales incluye la suscripción a Atlas Pro 2026?',
    a: (v) => [
      {
        p: [
          `Tu suscripción incluye +${v.channels} canales en directo (Francia, Europa, internacionales, entre ellos +${v.sportsChannels} canales deportivos premium en Full HD H.265), +${v.films} películas y +${v.series} series (${v.episodes} episodios) en 4K y Full HD actualizadas a diario, además del Replay de ${v.replayDays} días en +${v.replayChannels} canales.`,
        ],
      },
    ],
  },
  {
    id: 'connect',
    q: () =>
      '¿Cómo resolver los problemas «Atlas Pro no puede conectarse al servidor», «error de reproducción en Atlas Pro ON TV» o «por qué Atlas Pro TV ya no funciona»?',
    a: (v) => [
      {
        cards: [
          [
            b('Caso n.º 1 — En la aplicación oficial Atlas Pro (Android / TV Box):'),
            ' los mensajes «Atlas Pro no puede conectarse al servidor» o «error de reproducción» suelen aparecer cuando se usa una versión antigua de la aplicación, por un fallo puntual o por una incompatibilidad con un sistema Android demasiado antiguo (nuestras aplicaciones están optimizadas para televisores Google TV, móviles y TV Box con una versión reciente de Android). ',
            b('Solución:'),
            ` vuelve a introducir tus datos, borra la caché de la aplicación en los ajustes de tu dispositivo y vuelve a iniciar sesión, o instala la última actualización oficial (Atlas Pro ONTV ${v.ontv} o Atlas Pro Max v${v.max}).`,
          ],
          [
            b('Caso n.º 2 — Mensaje «La playlist no funciona» en IBO Player, Hot Player, Bob Player o IBO Smarter:'),
            ' en estos reproductores, este error suele indicar que el enlace del servidor (URL) compartido necesita una actualización. Basta con modificar el enlace o actualizar los datos del servidor. ',
            b('Solución inmediata:'),
            ' contacta sin más con nuestro equipo de soporte por ',
            wa('contact', true),
            '; nuestros técnicos actualizarán tu enlace y restablecerán tu playlist a distancia en cuestión de segundos.',
          ],
        ],
      },
    ],
  },
  {
    id: 'apple',
    q: () => '¿Cómo funciona Atlas Pro en iPhone, iPad o Apple TV (gratis o de pago)?',
    a: (v) => [
      {
        p: [
          'Como la aplicación nativa Atlas Pro (y Atlas Pro Prime) no está disponible en iOS/tvOS, tienes 2 opciones en la App Store:',
        ],
      },
      {
        ol: [
          [
            b('Gratis:'),
            ' descarga Smarters Pro IPTV (Smarters Player Lite) y pide a nuestro equipo por ',
            wa('help'),
            ' tus accesos Xtream (URL + Username + Password) o M3U.',
          ],
          [
            b(`De pago, recomendado (~${v.playerPrice} al año):`),
            ' descarga IBO Player, Hot Player, IBO Player Smarter o Bob Player para disfrutar de la máxima fluidez y de la reanudación de la VOD.',
          ],
        ],
      },
    ],
  },
  {
    id: 'smarters',
    q: () =>
      'INFO para usuarios de LG y SAMSUNG: la aplicación Smarters muestra el error «Failed to authorize», ¿qué hago?',
    a: () => [
      {
        p: [
          'La antigua edición de Smarters en televisores Samsung y LG sufre fallos frecuentes («Failed to authorize») ajenos a nuestros servidores. Descarga la última actualización de Smarters Pro en tu tienda de aplicaciones o pásate a IBO Player / Hot Player / Bob Player con la ayuda de nuestro equipo por ',
          wa('help', true),
          ' para disfrutar de una estabilidad definitiva.',
        ],
      },
    ],
  },
  {
    id: 'serverLink',
    q: () => 'El enlace del servidor o mi código no funcionan cuando introduzco mis datos, ¿por qué?',
    a: () => [
      {
        p: [
          'Comprueba primero que la URL empieza por ',
          { code: 'http://' },
          ' (sin «s»). Para garantizar la máxima seguridad y estabilidad en Francia y en Europa, actualizamos periódicamente nuestras conexiones de servidor privadas. Contacta sin más con nuestro soporte por ',
          wa('help', true),
          ' para recibir al instante tus parámetros actualizados o para que nuestro equipo configure tu pantalla.',
        ],
      },
    ],
  },
  {
    id: 'enterCode',
    q: () => '¿Cómo introducir el código Atlas Pro y dónde encontrar mi usuario de Atlas Pro?',
    a: (v) => [
      {
        p: [
          'Recibes tu código Atlas Pro y tu usuario de Atlas Pro directamente por WhatsApp y por correo electrónico en cuanto se valida tu pedido en nuestro portal oficial.',
        ],
      },
      {
        p: [
          b('¿Cómo introducir el código Atlas Pro?'),
          ` Abre la aplicación Atlas Pro ONTV ${v.ontv} (o IBO v${v.ibo}), escribe tu código en el campo correspondiente («Code Active») y confirma. En las versiones Atlas Pro Max v${v.max} o Atlas Pro 9X, puedes iniciar sesión directamente con tu usuario (Username) y tu contraseña.`,
        ],
      },
    ],
  },
  {
    id: 'changeCode',
    q: () => '¿Cómo cambiar el código en Atlas Pro ONTV?',
    a: () => [
      {
        p: [
          'Para cambiar el código en Atlas Pro ONTV (por ejemplo, con una nueva suscripción o un cambio de plan), ve a la pantalla de inicio de la aplicación y pulsa ',
          b('Cerrar sesión / Cambiar de usuario'),
          ', o ve a los ajustes de tu dispositivo Android (',
          b('Aplicaciones > Atlas Pro ONTV > Borrar datos y caché'),
          '). Después, vuelve a abrir la aplicación e introduce tu nuevo código Atlas Pro.',
        ],
      },
    ],
  },
  {
    id: 'installTv',
    q: () => '¿Cómo instalar Atlas Pro en la TV (Samsung, LG, TCL, Sony) y cómo poner Atlas Pro en la tele?',
    a: (v) => [
      {
        p: [
          '¿Te preguntas cómo poner Atlas Pro en la tele o cómo instalar Atlas Pro en la TV? El método depende de la marca de tu televisor:',
        ],
      },
      {
        ul: [
          [
            b('Cómo instalar Atlas Pro en una TV TCL, Sony, Philips o Xiaomi (Android TV / Google TV):'),
            ' instala la aplicación gratuita Downloader desde Google Play Store e introduce ',
            { to: 'apps', text: 'nuestro código Downloader' },
            ` para descargar gratis el APK de Atlas Pro ONTV ${v.ontv}.`,
          ],
          [
            b('Cómo instalar Atlas Pro en una TV Samsung y cómo instalar Atlas Pro ONTV en una TV LG:'),
            ' abre la tienda oficial de tu televisor, instala IBO Player, Hot Player, Bob Player o IBO Smarter Player y envía tu dirección MAC y tu Device Key a nuestro equipo por ',
            wa('help', true),
            ', que activará tu pantalla a distancia en 2 minutos.',
          ],
        ],
      },
    ],
  },
  {
    id: 'fireTv',
    q: () => '¿Cómo instalar Atlas Pro en Fire TV y cómo instalar Atlas Pro ONTV en Chromecast y en iPad?',
    a: (v) => [
      {
        ul: [
          [
            b('Cómo instalar Atlas Pro en Fire TV y cómo instalar Atlas Pro ONTV en Chromecast:'),
            ' descarga la aplicación Downloader en tu Amazon Fire TV Stick (4K, Max, Lite) o en tu Chromecast con Google TV, permite las fuentes desconocidas e introduce ',
            { to: 'apps', text: 'el código de descarga' },
            ` de nuestra suite gratuita (Atlas Pro ONTV ${v.ontv}, Max v${v.max}, IBO v${v.ibo} o 9X).`,
          ],
          [
            b('Cómo instalar Atlas Pro en iPad y iPhone:'),
            ' entra en la App Store, descarga un reproductor gratuito (Smarters Pro IPTV) o un reproductor de alto rendimiento (IBO Player, Hot Player, Bob Player) y contacta con nuestro ',
            wa('help', false, 'soporte por WhatsApp'),
            ' para recibir tus datos de acceso Xtream / M3U o activar tu dispositivo.',
          ],
        ],
      },
    ],
  },
  {
    id: 'cast',
    q: () => '¿Cómo enviar Atlas Pro ONTV a mi televisor?',
    a: () => [
      {
        p: [
          'Para enviar Atlas Pro ONTV desde tu móvil o tableta a tu televisor, asegúrate de que ambos dispositivos están conectados a la misma red wifi y usa la función Enviar / Duplicar pantalla (Chromecast o AirPlay). Aun así, para disfrutar de una fluidez óptima sin latencia (Full HD H.265 en directo, 4K en la VOD), te recomendamos instalar la aplicación directamente en tu Smart TV, Fire TV Stick, Chromecast con Google TV o Box Android.',
        ],
      },
    ],
  },
]

export const faq: Dict['faq'] = {
  badge: 'AYUDA, SOPORTE Y FAQ OFICIAL',
  title: 'Tus preguntas frecuentes – ATLAS PRO ONTV',
  titleHighlight: 'ATLAS PRO ONTV',
  subtitle:
    'Todo lo que necesitas saber antes, durante y después de contratar tu suscripción a Atlas Pro ONTV en nuestro portal oficial.',
  help: {
    title: '¿No encuentras tu respuesta?',
    text: (minutes: string) =>
      `Nuestro soporte técnico humano te responde en menos de ${minutes} minutos por WhatsApp, los 7 días de la semana.`,
    button: 'Escribir al soporte por WhatsApp',
  },
  whatsapp: 'WhatsApp',
  items,
}
