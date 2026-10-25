// Spanish (Spain) copy, home installation hub. Source: ../fr/install.ts (its header documents the inline markup:
// **bold**, `mono`, {wa}, {waShort}, {price}, {trial}, {app:id}, {ver:id}, {pcode:key}, [text](#anchor)). Owner: tr-es.
import type { InstallCopy } from '../fr/install.ts'

export const install: InstallCopy = {
  badge: '✨ Guías visuales 2026 · Distribuidor autorizado de Atlas Pro ONTV',
  title: 'Instalación de Atlas Pro ONTV 2026: guías interactivas paso a paso y descarga del APK',
  subtitle: (minutes) =>
    `Selecciona el dispositivo en el que quieres ver tus programas y sigue unos sencillos pasos. La mayoría de nuestros suscriptores lo tienen todo listo en menos de ${minutes} minutos.`,
  kpis: {
    fast: { value: (minutes) => `< ${minutes} min`, label: 'Instalación rápida' },
    compat: { value: '100 %', label: 'Compatible con todas las pantallas' },
    support: { value: '7/7 · 24/7', label: 'Soporte técnico incluido' },
  },

  selector: {
    title: 'Elige tu dispositivo',
    hint: 'La guía paso a paso de tu dispositivo aparece justo debajo.',
    listLabel: 'Dispositivos',
    change: 'Cambiar de dispositivo',
    current: 'Tu dispositivo',
    devices: {
      smartTv: { name: 'Smart TV', detail: 'Samsung Tizen, LG webOS, Sony, Philips...' },
      firestick: { name: 'Amazon Firestick', detail: 'Fire TV Stick 4K / Max / Lite / Cube' },
      android: { name: 'Android', detail: 'Móvil, tableta, Google TV, TV Box Xiaomi / Mecool' },
      apple: { name: 'iPhone / iPad / Apple TV', detail: 'iOS, iPadOS y tvOS' },
      windows: { name: 'PC con Windows', detail: 'Aplicación oficial y Microsoft Store' },
      mac: { name: 'Mac', detail: 'macOS' },
      linux: { name: 'Linux', detail: 'Aplicación oficial y reproductores' },
      mag: { name: 'MAG Box y Formuler / Dreamlink', detail: 'MyTVOnline 2 y 3' },
      shield: { name: 'Nvidia Shield', detail: 'Android TV de alto rendimiento' },
    },
  },

  stepLabel: (n) => `Paso ${n}`,

  guides: {
    smartTv: {
      kicker: 'Smart TV (Samsung Tizen y LG WebOS)',
      title: 'Cómo instalar Atlas Pro ONTV en una TV Samsung y LG',
      blocks: [
        {
          kind: 'notice',
          tone: 'info',
          title: '💡 NOTA IMPORTANTE (TV SAMSUNG Y LG FRENTE A ANDROID TV)',
          body: [
            'La aplicación nativa **Atlas Pro ONTV** no está disponible directamente en las tiendas oficiales de Samsung (Tizen) y LG (WebOS). Los reproductores de alto rendimiento compatibles con estos televisores (**IBO Player / IBO Player Pro**, **IBO Player Smarter**, **Hot Player**, **Bob Player**) son **aplicaciones de pago independientes (unos ~{price} al año tras {trial} días de prueba gratuita)**. Garantizan una guía EPG instantánea, una estabilidad Full HD impecable (4K en la VOD) y la reanudación de películas y series en el segundo exacto en que las dejaste. Aunque puedes activarlas tú mismo, **te recomendamos encarecidamente que dejes que nuestro equipo técnico se encargue de la activación completa de la aplicación Y de la carga de tu suscripción a Atlas Pro al mismo tiempo**: envíanos simplemente tu **MAC Address** y tu **Device Key** por {wa} y nuestro equipo se ocupa de todo, de principio a fin.',
            '(Nota: en los televisores Sony, TCL y Xiaomi con Android TV / Google TV, la aplicación oficial Atlas Pro es 100 % gratuita a través de Downloader).',
          ],
        },
        {
          kind: 'notice',
          tone: 'warn',
          title: '⚠️ Advertencia sobre Smarters Pro en Smart TV',
          body: [
            'Desaconsejamos usar la antigua versión de IPTV Smarters Pro en televisores Samsung y LG (provoca cortes, bloqueos y errores de autorización ajenos a nuestro servidor). **¿Por qué es mejor optar por los reproductores de pago (IBO Player, IBO Player Smarter, Bob Player, Hot Player)?** Ofrecen **{trial} días de prueba gratuita**, una estabilidad Full HD impecable (4K en la VOD), una carga instantánea de la guía EPG y la **reanudación de tus películas y series en el segundo exacto en que las dejaste**.',
          ],
        },
        {
          kind: 'steps',
          title: 'Samsung y LG: pasos de instalación',
          steps: [
            { text: 'Enciende tu televisor y abre la tienda oficial (**Samsung Apps** o **LG Content Store**).' },
            { text: 'Busca e instala **IBO Player**, **IBO Player Smarter**, **Hot Player** o **Bob Player**.' },
            { text: 'Abre la aplicación para que aparezcan tu **MAC Address** y tu **Device Key**.' },
            {
              text: 'Envía una foto de tu pantalla a nuestro {wa}: nuestro equipo activa tu aplicación y carga tu **suscripción a Atlas Pro ONTV** a distancia en menos de 2 minutos.',
            },
          ],
        },
      ],
    },

    firestick: {
      kicker: 'Amazon Fire TV Stick (4K, 4K Max, Lite, Cube)',
      title: 'Cómo instalar Atlas Pro ONTV en el Amazon Fire TV Stick',
      blocks: [
        {
          kind: 'notice',
          tone: 'alert',
          title: '🚨 AVISO OFICIAL SOBRE EL AMAZON FIRE TV STICK HD DE 2.ª GENERACIÓN (VEGA OS)',
          body: [
            'Recomendamos encarecidamente a nuestros clientes **no comprar el modelo Amazon Fire TV Stick HD (2.ª generación)**. Este modelo reciente funciona con el sistema cerrado **Vega OS**, a diferencia de las versiones anteriores con Android / Fire OS:',
          ],
          points: [
            { mark: 'no', text: 'La aplicación **Downloader** no está disponible en este modelo.' },
            { mark: 'no', text: 'La instalación de aplicaciones externas o de archivos **APK de Atlas Pro ONTV** está bloqueada.' },
            {
              mark: 'yes',
              text: '**Solución recomendada:** opta por un **Fire TV Stick 4K, 4K Max, Lite o Cube** (con Fire OS) o por un box Android TV (Xiaomi, Mecool, Formuler) 100 % compatible con Downloader.',
            },
          ],
        },
        {
          kind: 'steps',
          title: 'Pasos, códigos Downloader y activación en el Fire Stick',
          steps: [
            {
              title: 'Instalar Downloader',
              text: 'Desde la pantalla de inicio del Fire TV, ve a Buscar (la lupa), escribe **Downloader** e instala la aplicación naranja oficial.',
            },
            {
              title: 'Activar las opciones para desarrolladores',
              text: 'Ve a **Configuración > Mi Fire TV > Acerca de** y pulsa **7 veces seguidas, rápidamente**, sobre el nombre de tu Fire TV Stick hasta que aparezca el mensaje «Ya eres desarrollador».',
            },
            {
              title: 'Permitir las fuentes desconocidas',
              text: 'En **Opciones para desarrolladores > Instalar aplicaciones desconocidas**, activa el permiso (**ON**) para **Downloader**.',
            },
            {
              title: 'Introducir el código Downloader y activar según la versión',
              text: 'Abre **Downloader**, introduce el código de la versión oficial que quieras y activa tu acceso:',
              appCodes: true,
              list: [
                '**Reproductores de pago (~{price}/año · {trial} días de prueba)** · Bob Player ({pcode:bobPlayer}) · Hot Player ({pcode:hotPlayer}).',
              ],
            },
          ],
        },
      ],
    },

    android: {
      kicker: 'Android: Google TV, Chromecast, TV Sony / TCL / Philips, TV Box Xiaomi / Mecool, móviles y tabletas',
      title: 'Cómo instalar Atlas Pro ONTV en Chromecast y Android TV',
      blocks: [
        {
          kind: 'steps',
          steps: [
            {
              text: 'Abre **Google Play Store** en tu Android TV, Chromecast con Google TV o Box Android, e instala gratis la aplicación **Downloader**.',
            },
            {
              text: 'Permite las fuentes desconocidas para **Downloader** en Ajustes > Seguridad y restricciones (después de pulsar 7 veces sobre Número de compilación en Información si el modo desarrollador está oculto).',
            },
            {
              text: 'Abre **Downloader** y escribe el código de la aplicación gratuita que quieras (**{app:ontv}** con Code Active, **{app:max}** con usuario y contraseña, **{app:ibo}**, o **{app:x9}** con usuario y contraseña), o pulsa directamente en nuestros [botones de descarga del APK más abajo](#apps) desde tu móvil o tableta.',
              appCodes: true,
            },
          ],
        },
        {
          kind: 'notice',
          tone: 'tip',
          title: '📌 Nota sobre Xtream / M3U y asistencia a distancia',
          body: [
            'También puedes usar tus datos de acceso en formato **Xtream Codes** o **M3U** en cualquier reproductor. Si no quieres hacerlo tú mismo, envía simplemente la información de tu aplicación por {wa} y nuestro equipo lo configura todo a distancia.',
          ],
        },
      ],
    },

    apple: {
      kicker: 'Apple (iPhone, iPad y Apple TV — iOS, iPadOS y tvOS)',
      title: 'Apple (iPhone, iPad y Apple TV) — Cómo instalar Atlas Pro ONTV en iOS y tvOS',
      blocks: [
        {
          kind: 'notice',
          tone: 'info',
          title: '📌 Nota importante (disponibilidad en iOS)',
          body: [
            'La aplicación oficial **Atlas Pro** **NO está disponible en iOS ni en tvOS** (está disponible de forma nativa en Android, PC con Windows, macOS y Linux). Para ver tu **suscripción a Atlas Pro ONTV** en iPhone, iPad o Apple TV, **tienes dos métodos sencillos**:',
          ],
        },
        {
          kind: 'options',
          items: [
            {
              label: 'Opción 1',
              tag: 'Gratis',
              title: 'Reproductor gratuito (Smarters Pro IPTV / IPTV Smarters Pro / Smarters Player Lite)',
              text: 'Una aplicación gratuita muy conocida en la App Store. Necesita un **enlace del servidor (Server URL) + usuario (Username) + contraseña (Password)** en formato **Xtream Codes** (o un enlace **M3U**). Contacta con nuestro equipo por {wa} para obtener gratis tus accesos Xtream / M3U, descarga la aplicación en la App Store, introduce tus datos y disfruta de tu suscripción.',
            },
            {
              label: 'Opción 2',
              tag: 'Recomendado',
              recommended: true,
              title: 'Reproductores de pago recomendados (IBO Player, IBO Player Smarter, Hot Player, Bob Player)',
              text: '¿Por qué los recomendamos tanto frente a Smarters Pro? Por unos **~{price} al año (tras {trial} días de prueba gratuita)**, garantizan cero cortes en iPhone/iPad/Apple TV, una guía EPG ultrarrápida y la **reanudación de tus películas y series en el segundo exacto en que las dejaste**. Descarga la aplicación en la App Store y envíanos su dirección MAC + Device Key por {wa}: nuestro equipo puede activar directamente la aplicación y cargar tu suscripción a Atlas Pro al mismo tiempo.',
              playerLinks: 'ios',
            },
          ],
        },
      ],
    },

    desktop: {
      kicker: 'Cómo instalar Atlas Pro en PC, Mac y Linux',
      title: 'Ordenadores PC con Windows, Mac (macOS) y Linux — Instalación oficial y reproductores',
      blocks: [
        {
          kind: 'options',
          items: [
            {
              label: 'Opción A',
              tag: 'Gratis',
              recommended: true,
              title: 'Aplicaciones oficiales gratuitas de Atlas Pro',
              text: 'Descarga directamente nuestras versiones oficiales dedicadas **Atlas Pro para PC con Windows (.EXE)**, **macOS** o **Linux** con los botones de descarga de abajo, abre la aplicación e inicia sesión con tu **código Atlas Pro** (o con tus datos de acceso).',
              desktopDownloads: true,
            },
            {
              label: 'Opción B',
              tag: 'Reproductores',
              title: 'Reproductores alternativos en Microsoft Store y Mac',
              list: [
                '**Gratis (FREE): IPTV Smarters Pro / Expert** (versión para ordenador actualizada, fluida y gratuita, con los datos de acceso Xtream Codes que te facilita nuestro soporte).',
                '**Reproductores de pago (~{price} al año · {trial} días de prueba gratuita): IBO Player / IBO Player Pro**, **IBO Player Smarter**, **Hot Player**, **Vormedia Sat**. (No se usa VLC ni BlueStacks).',
              ],
              playerLinks: 'windows',
            },
          ],
        },
      ],
    },

    mag: {
      kicker: 'Formuler / Dreamlink (MyTVOnline 2 y 3) y MAG Box (Infomir)',
      title: 'Cómo instalar Atlas Pro ONTV en Formuler, Dreamlink y MAG Box',
      blocks: [
        { kind: 'subheading', text: 'Formuler / Dreamlink (MyTVOnline 2 y 3)' },
        {
          kind: 'notice',
          tone: 'warn',
          title: '⚠️ Importante',
          body: [
            'En Formuler y Dreamlink, la conexión se hace con tus datos de acceso **Xtream Codes** (URL del portal + usuario + contraseña), y no con la dirección MAC.',
          ],
        },
        {
          kind: 'steps',
          steps: [
            { text: 'Abre **MyTVOnline 2 o 3**.' },
            { text: '**Menú > Conexiones > Añadir portal** (Add Portal).' },
            { text: 'Ponle un nombre al portal (**Atlas Pro**).' },
            { text: 'Cambia «**Login Required**» a **ON**.' },
            { text: 'Introduce la **URL del portal**, el **usuario** y la **contraseña** que te facilita nuestro equipo por {waShort}.' },
            { text: 'Pulsa **Connect**.' },
          ],
        },
        { kind: 'subheading', text: 'MAG Box (Infomir 254, 256, 322, 520...)' },
        {
          kind: 'steps',
          steps: [
            { text: 'Anota la dirección MAC que figura en la parte trasera del receptor (`00:1A:79:XX:XX:XX`) y envíasela a nuestro soporte por {wa}.' },
            { text: 'Recibe nuestro enlace **Portal URL** activado.' },
            { text: 'Ve a **Settings > System Settings > Servers > Portals**.' },
            { text: 'Escribe «Atlas Pro» en **Portal 1 Name** y la URL en **Portal 1 URL**.' },
            { text: 'Guarda (**OK**) y reinicia.' },
          ],
        },
      ],
    },

    shield: {
      kicker: 'Nvidia Shield TV / Shield Pro',
      title: 'Cómo instalar Atlas Pro ONTV en Nvidia Shield',
      blocks: [
        {
          kind: 'steps',
          steps: [
            { text: 'Abre **Google Play Store** en tu Nvidia Shield e instala gratis **Downloader**.' },
            {
              text: 'Permite las fuentes desconocidas para Downloader en **Ajustes > Preferencias del dispositivo > Seguridad y restricciones**.',
            },
            {
              text: 'Introduce el código Downloader de nuestra suite oficial gratuita ({app:ontv}, {app:max}, {app:ibo} o {app:x9}) o el de IBO Player Pro ({pcode:iboPlayerPro}).',
              appCodes: true,
            },
            { text: 'Activa tu **código Atlas Pro** y disfruta de la señal Full HD H.265 y de la VOD en 4K.' },
          ],
        },
      ],
    },
  },

  desktop: {
    windows: 'Atlas Pro para Windows (.EXE)',
    mac: 'Atlas Pro para macOS',
    linux: 'Atlas Pro para Linux',
  },
  storeLink: {
    ios: (player) => `${player} en la App Store`,
    windows: (player) => `${player} para Windows`,
  },

  apps: {
    badge: 'Aplicaciones oficiales gratuitas',
    title: 'Descargar el APK de Atlas Pro ONTV: las 4 aplicaciones oficiales gratuitas y sus códigos Downloader',
    subtitle:
      'Para Android, Google TV, TV Box y Fire TV Stick: escribe el código en la aplicación Downloader o descarga el APK directamente desde tu móvil o tu tableta.',
    free: 'Gratis',
    status: {
      latest: 'Última versión oficial',
      new: 'Nueva versión',
      previous: 'Versión anterior',
    },
    version: (version) => `Versión ${version}`,
    compatible: (versions) => `compatible con ${versions}`,
    codeLabel: 'Código Downloader',
    download: (app) => `Descargar el APK de ${app}`,
    activationLabel: 'Modo de activación',
    activation: {
      code: 'Code Active (código Atlas Pro)',
      login: 'Usuario + contraseña',
    },
    or: 'o',
    notes: {
      ontv: 'Se activa directamente con tu Code Active, sin enlace ni nombre de usuario que introducir.',
    },
    apkFree: (app) => `APK de ${app} (gratis)`,
    activationBy: 'Activación con',
    copy: 'Copiar',
    copied: '¡Copiado!',
    copyAria: (app, code) => `Copiar el código Downloader ${code} de ${app}`,
    redundancy: {
      title: '📌 Nota de redundancia Atlas Pro',
      text: 'Te aconsejamos mantener las **4 versiones oficiales** instaladas en tu dispositivo Android o en tu Fire TV Stick: si una de ellas está en mantenimiento técnico, las demás versiones toman el relevo al instante, sin ninguna interrupción.',
    },
  },

  questions: {
    title: 'Preguntas técnicas sobre la instalación',
    items: [
      {
        q: 'He introducido mis datos de acceso pero la aplicación muestra un error («error de reproducción» o «Atlas Pro no puede conectarse al servidor»). ¿Qué hago?',
        a: 'Comprueba primero el **enlace del servidor (Server URL)**: debe empezar obligatoriamente por **http — y no por https**. Esa simple letra es la causa de error más frecuente. Asegúrate también de que no se ha colado ningún espacio invisible al copiar y pegar, y de que usas el método de activación correcto (**Code Active** en {app:ontv}, o **usuario + contraseña** en {app:x9} y Max v{ver:max}). **¿Sigues sin poder entrar?** Escríbenos por {wa}: nuestro equipo comprobará tu **código Atlas Pro** y configurará tu reproductor a distancia por ti.',
      },
      {
        q: '¿Qué velocidad de Internet necesito para ver Atlas Pro ONTV con fluidez?',
        a: 'Una conexión de **10 a 20 Mbps** es el mínimo necesario para un streaming fluido en Full HD (H.265). Recomendamos una velocidad mayor (**30 Mbps o más**) si quieres disfrutar al máximo de los contenidos VOD en **Ultra HD 4K** o si en casa hay varias pantallas usando la misma conexión a Internet a la vez.',
      },
      {
        q: '¿Tengo que usar una VPN con mi suscripción a Atlas Pro?',
        a: '**No, no es obligatorio**: nuestros accesos oficiales **Atlas Pro ONTV** integran conexiones optimizadas que evitan los bloqueos de los operadores de Internet. Si aun así usas una VPN, **elige siempre un servidor situado en tu propio país** (o en un país vecino) para mantener la máxima velocidad y evitar cualquier latencia.',
      },
      {
        q: '¿Por qué necesito un reproductor de pago (~{price} al año) en algunos dispositivos?',
        a: 'En una **Smart TV (Samsung / LG) o un dispositivo Apple (iPhone / Apple TV)**, los reproductores de pago (**IBO Player, IBO Player Smarter, Bob Player, Hot Player** — unos **~{price} al año tras {trial} días de prueba gratuita**) ofrecen un rendimiento muy superior, funcionan sin ningún bloqueo y recuerdan dónde dejaste tus películas y series. En cambio, en **Android, Google TV, TV Box, Fire TV Stick y PC**, nuestras aplicaciones oficiales **Atlas Pro ONTV (v{ver:ontv}, Max v{ver:max}, IBO v{ver:ibo}, 9X)** funcionan de maravilla y son **100 % gratuitas**.',
      },
    ],
  },

  help: {
    title: '¿Te has atascado en algún paso? Configuramos tu dispositivo contigo.',
    subtitle:
      'Envía un mensaje a nuestro equipo de asistencia por WhatsApp: te guiaremos paso a paso o activaremos directamente tu suscripción a Atlas Pro y tu reproductor a distancia.',
    button: 'Obtener ayuda por WhatsApp',
  },
}
