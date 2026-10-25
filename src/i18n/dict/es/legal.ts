// Spanish (Spain) copy, legal pages: aviso legal, política de privacidad, condiciones generales.
// Source: ../fr/legal.ts. Owner: tr-es. French law references stay as they are.
import type { Dict } from '../types.ts'

export const legal: Dict['legal'] = {
  common: {
    badge: 'Información legal',
    updatedLabel: 'Última actualización:',
    updated: '25 de octubre de 2026',
    toc: 'Índice',
    others: 'Otros documentos',
    docs: {
      mentions: 'Aviso legal',
      confidentialite: 'Política de privacidad',
      conditions: 'Condiciones generales y garantía de devolución',
    },
    help: {
      title: '¿Tienes alguna pregunta sobre esta información?',
      text: 'Nuestro equipo te responde por WhatsApp los 7 días de la semana, en francés.',
      cta: 'Escríbenos por WhatsApp',
    },
    contact: {
      whatsapp: 'WhatsApp',
      email: 'Correo electrónico',
    },
    pending: {
      companyName: 'razón social del editor',
      legalForm: 'forma jurídica (y capital social, si procede)',
      address: 'dirección del domicilio social',
      registration: 'datos registrales (RCS / SIREN, n.º de IVA intracomunitario)',
      publisher: 'nombre del director de la publicación',
      host: 'proveedor de alojamiento del sitio (nombre, dirección, teléfono)',
      email: 'dirección de correo electrónico del soporte',
    },
  },

  mentions: {
    title: 'Aviso legal',
    lead: (domain: string) =>
      `Información sobre el editor y el proveedor de alojamiento del sitio ${domain}, publicada en cumplimiento del artículo 6 de la Ley francesa n.º 2004-575, de 21 de junio de 2004, para la confianza en la economía digital (LCEN).`,
    publisher: {
      title: 'Editor del sitio',
      intro: (seller: string, domain: string) =>
        `El sitio ${domain} es editado por ${seller}, distribuidor oficial autorizado de Atlas Pro ONTV.`,
      rows: {
        tradeName: 'Nombre comercial',
        domain: 'Dirección del sitio',
        activity: 'Actividad',
        companyName: 'Razón social',
        legalForm: 'Forma jurídica',
        address: 'Domicilio social',
        registration: 'Datos registrales',
      },
      activity:
        'Distribución y activación de códigos de suscripción Atlas Pro, asistencia con la instalación y atención al cliente.',
    },
    director: {
      title: 'Director de la publicación',
      label: 'Director de la publicación',
    },
    contact: {
      title: 'Contacto',
      intro: 'Para cualquier pregunta sobre el sitio o sobre tu suscripción:',
    },
    host: {
      title: 'Alojamiento',
      label: 'Proveedor de alojamiento',
    },
    ip: {
      title: 'Propiedad intelectual',
      paragraphs: [
        'La estructura del sitio, sus textos, sus ilustraciones y sus elementos gráficos están protegidos por la normativa de propiedad intelectual. Queda prohibida cualquier reproducción o representación, total o parcial, sin la autorización previa y por escrito del editor.',
        'Las marcas, nombres y logotipos de las aplicaciones y reproductores citados en el sitio pertenecen a sus respectivos titulares. Solo se mencionan para indicar la compatibilidad del servicio.',
      ],
    },
    links: {
      title: 'Enlaces a servicios de terceros',
      paragraphs: [
        'El sitio remite a servicios de terceros: WhatsApp para los pedidos y la asistencia, así como a las páginas de descarga de las aplicaciones oficiales y de los reproductores asociados. Estos servicios se rigen por sus propias condiciones; el editor no es responsable ni de su contenido ni de su disponibilidad.',
      ],
    },
    accuracy: {
      title: 'Exactitud de la información',
      paragraphs: [
        'El editor vela por la exactitud de la información publicada (planes, número de canales y de contenidos, versiones de las aplicaciones, guías de instalación). Esta información puede cambiar: en caso de duda, nuestro equipo te confirma los datos actualizados por WhatsApp.',
      ],
    },
    data: {
      title: 'Datos personales',
      before: 'El tratamiento de tus datos personales se describe en nuestra ',
      link: 'Política de privacidad',
      after: '.',
    },
  },

  privacy: {
    title: 'Política de privacidad',
    lead: (seller: string, domain: string) =>
      `Qué datos se tratan cuando visitas ${domain} o contratas una suscripción a Atlas Pro con ${seller}, para qué y cómo ejercer tus derechos.`,
    summary: {
      title: 'En resumen',
      items: [
        'Ni cuenta de cliente, ni formularios, ni pagos en el sitio.',
        'Ni cookies, ni rastreadores publicitarios, ni herramientas de medición de audiencia.',
        'Tus pedidos se tramitan en una conversación de WhatsApp que abres tú mismo.',
        'Tus datos sirven para tramitar tu pedido, entregarte tus códigos y prestarte asistencia.',
      ],
    },
    controller: {
      title: 'Responsable del tratamiento',
      before: (seller: string) =>
        `El responsable del tratamiento es ${seller}, editor del sitio. Su identidad completa figura en el `,
      link: 'aviso legal',
      after: '.',
    },
    notCollected: {
      title: 'Lo que el sitio no recoge',
      items: [
        'Sin cuenta de cliente ni área personal.',
        'Sin formularios: nada de lo que lees o eliges en el sitio se nos transmite.',
        'Sin pagos en el sitio: no se solicita ni se almacena ningún dato de tarjeta bancaria.',
        'Sin cookies, sin rastreadores publicitarios, sin herramientas de medición de audiencia.',
        'Las fuentes tipográficas se alojan junto con el sitio: tu navegador no contacta con ningún servicio de terceros para mostrar las páginas.',
      ],
    },
    browsing: {
      title: 'Navegación por el sitio',
      paragraphs: [
        'Como cualquier servidor web, el proveedor de alojamiento del sitio puede registrar datos técnicos de conexión (dirección IP, fecha y hora, página solicitada, tipo de navegador) para garantizar la seguridad y el buen funcionamiento del sitio. Base jurídica: nuestro interés legítimo en proteger el sitio.',
      ],
    },
    whatsapp: {
      title: 'Pedidos y asistencia por WhatsApp',
      intro: [
        'Los botones de pedido, activación, renovación y ayuda abren WhatsApp con un mensaje ya redactado. No se nos transmite nada hasta que envías ese mensaje.',
        'Cuando nos escribes, tratamos la información que nos facilitas en la conversación:',
      ],
      items: [
        'tu número de WhatsApp y el nombre de tu perfil;',
        'el plan elegido, tu dispositivo y el método de pago elegido;',
        'tu dirección de correo electrónico, para enviarte tu código Atlas Pro y tus datos de acceso;',
        'tu código o identificador actual cuando renuevas;',
        'la información útil para la asistencia (dispositivo, aplicación, mensaje de error, capturas de pantalla que decidas enviar).',
      ],
      outro: [
        'Estos datos sirven para tramitar tu pedido, entregarte y activar tus códigos, prestarte asistencia y gestionar tus renovaciones. Base jurídica: la ejecución del contrato que celebras con nosotros (artículo 6.1.b del RGPD).',
        'WhatsApp es un servicio de terceros, sujeto a sus propias condiciones de uso y a su propia política de privacidad.',
      ],
    },
    payment: {
      title: 'Pago',
      paragraphs: [
        'El pago se realiza por PayPal o por transferencia bancaria SEPA, según la información facilitada en la conversación de WhatsApp. No se realiza ningún pago en el sitio.',
        'Recibimos la información de la transacción: nombre del titular, importe, fecha y referencia del pago (y, en el caso de una transferencia, los datos bancarios que figuran en la operación). PayPal trata tus datos de pago conforme a su propia política de privacidad.',
        'Estos datos sirven para confirmar tu pago y cumplir nuestras obligaciones contables. Base jurídica: la ejecución del contrato y nuestras obligaciones legales.',
      ],
    },
    recipients: {
      title: 'Destinatarios',
      team: (seller: string) =>
        `Tus datos son tratados por el equipo de ${seller} y por los proveedores necesarios para el servicio: WhatsApp (mensajería), PayPal o tu banco (pago) y el proveedor de alojamiento del sitio (datos técnicos de conexión).`,
      transfers:
        'Algunos de estos proveedores pueden tratar datos fuera de la Unión Europea, en el marco de las garantías previstas por el RGPD.',
    },
    retention: {
      title: 'Plazos de conservación',
      intro:
        'Conservamos tus datos durante el tiempo necesario para los fines descritos anteriormente y después los eliminamos, salvo obligación legal de conservación.',
      rows: {
        order: { label: 'Conversación y datos del pedido', what: 'plazo de conservación de las conversaciones y de los datos de pedido' },
        accounting: { label: 'Pagos y documentos contables', what: 'plazo de conservación de los datos de pago y de los documentos contables' },
        logs: { label: 'Datos técnicos de conexión', what: 'plazo de conservación de los registros del proveedor de alojamiento' },
      },
    },
    rights: {
      title: 'Tus derechos',
      paragraphs: [
        'De conformidad con el Reglamento General de Protección de Datos (RGPD) y con la ley francesa «Informatique et Libertés», tienes derecho de acceso, rectificación, supresión, limitación del tratamiento, oposición y portabilidad de tus datos.',
        'Para ejercer estos derechos, escríbenos por WhatsApp o por correo electrónico (datos de contacto más abajo). Te responderemos en el plazo máximo de un mes.',
        'Si consideras que no se respetan tus derechos, puedes presentar una reclamación ante la autoridad de protección de datos de tu país (en Francia, la CNIL).',
      ],
    },
    cookies: {
      title: 'Cookies',
      paragraphs: [
        'El sitio no instala ninguna cookie ni utiliza rastreadores, por lo que no es necesario ningún aviso de consentimiento. Si esto cambiara, esta política se actualizaría y se te pediría tu consentimiento cuando la ley lo exija.',
      ],
    },
    changes: {
      title: 'Modificaciones',
      paragraphs: [
        'Podemos actualizar esta política para reflejar cambios en el sitio o en nuestros servicios. La fecha de la última actualización figura en la parte superior de esta página.',
      ],
    },
  },

  terms: {
    title: 'Condiciones generales y garantía de devolución',
    lead: (seller: string) =>
      `Las condiciones de venta de las suscripciones Atlas Pro ofrecidas por ${seller}, distribuidor oficial autorizado de Atlas Pro ONTV, y nuestra garantía de satisfacción o reembolso.`,
    scope: {
      title: 'Objeto',
      text: (seller: string, domain: string) =>
        `Las presentes condiciones generales regulan la venta de suscripciones Atlas Pro por parte de ${seller} a los clientes que realizan su pedido desde ${domain} o directamente por WhatsApp. Realizar un pedido implica la aceptación de estas condiciones.`,
    },
    seller: {
      title: 'El vendedor',
      before: (seller: string) =>
        `El vendedor es ${seller}, distribuidor oficial autorizado de Atlas Pro ONTV. Sus datos completos figuran en el `,
      link: 'aviso legal',
      after: '.',
    },
    service: {
      title: 'El servicio',
      offer: (v: { months: string; channels: string; films: string; series: string; replayDays: string; replayChannels: string }) =>
        `La suscripción a Atlas Pro da acceso, durante ${v.months} meses, a la oferta Atlas Pro ONTV: +${v.channels} canales en directo, un catálogo de vídeo a la carta (+${v.films} películas y +${v.series} series) y el Replay de ${v.replayDays} días en +${v.replayChannels} canales.`,
      codes: 'Cada plan incluye un código Atlas Pro por pantalla.',
      apps: (apps: string) =>
        `El servicio se utiliza con nuestras aplicaciones oficiales gratuitas (${apps}) o con un reproductor asociado compatible (datos de acceso Xtream Codes o enlace M3U).`,
      players: (price: string, days: string) =>
        `Algunos reproductores asociados, en particular en las Smart TV Samsung y LG, son de pago y se contratan con su editor (unos ${price} al año, tras una prueba gratuita de ${days} días). Este coste no está incluido en la suscripción a Atlas Pro.`,
      requirements: {
        before: 'El servicio requiere una conexión a Internet y un dispositivo compatible. Antes de hacer tu pedido, consulta nuestras ',
        install: 'guías de instalación',
        middle: ' y la página ',
        downloads: 'Descargar',
        after: ', o pide consejo a nuestro equipo.',
      },
    },
    plans: {
      title: 'Planes y precios',
      intro: 'Los planes disponibles son los siguientes:',
      columns: { plan: 'Plan', duration: 'Duración', price: 'Precio' },
      names: { premium: 'Premium 1 Écran', duo: 'Duo 2 Écrans', famille: 'Famille 3 Écrans' },
      months: (months: string) => `${months} meses`,
      pricePending: 'precio del plan',
      notes: [
        'Los precios se indican en euros. El precio aplicable es el que se muestra en el momento del pedido y se confirma en la conversación de WhatsApp.',
      ],
      vat: { label: 'IVA', what: 'mención del IVA (precios con IVA incluido o «IVA no aplicable»)' },
    },
    order: {
      title: 'Pedido',
      steps: [
        'Elige tu plan y haz clic en su botón: WhatsApp se abre con un mensaje ya redactado. En la tienda también puedes indicar tu dispositivo y tu método de pago.',
        'Envía el mensaje: nuestro equipo te confirma el plan, el precio y la información de pago.',
        'El pedido es definitivo una vez validado tu pago.',
      ],
      shop: 'Abrir la tienda',
    },
    payment: {
      title: 'Pago',
      paragraphs: [
        'El precio del plan se abona por PayPal o por transferencia bancaria SEPA, según la información facilitada en la conversación de WhatsApp. No se realiza ningún pago con tarjeta bancaria en el sitio.',
      ],
    },
    delivery: {
      title: 'Entrega y activación',
      paragraphs: [
        'Una vez validado tu pago, tu código Atlas Pro oficial (junto con tus accesos Xtream / M3U) se te envía por WhatsApp y por correo electrónico. Durante nuestro horario de atención, el envío es prácticamente inmediato (normalmente, entre 3 y 15 minutos).',
        '¿No has recibido nada? Revisa tu carpeta de correo no deseado (spam) y después escribe a nuestro equipo por WhatsApp: un asesor te enviará al momento tu código Atlas Pro en directo.',
        'Nuestro equipo te acompaña en la instalación y la activación en tu dispositivo.',
      ],
      rows: {
        hours: { label: 'Horario de atención', what: 'horario de atención del equipo (envío de códigos)' },
        start: { label: 'Inicio de la suscripción', what: 'momento de inicio de la suscripción (envío o primera activación del código)' },
      },
    },
    renewal: {
      title: 'Duración y renovación',
      paragraphs: [
        (months: string) =>
          `La suscripción dura ${months} meses. No se renueva automáticamente: no se realiza ningún cargo sin que lo solicites.`,
        (months: string) =>
          `Para renovar, contacta con nosotros por WhatsApp indicando tu código o identificador actual. En cuanto se valida tu pago (PayPal o SEPA), tu suscripción se amplía ${months} meses en pocos minutos. Conservas la aplicación que ya tienes instalada y tus listas de favoritos, sin reinstalar nada.`,
      ],
    },
    support: {
      title: 'Asistencia',
      text: (minutes: string) =>
        `Nuestro servicio de atención al cliente, 100 % en francés, está disponible los 7 días de la semana por WhatsApp y por correo electrónico: ayuda con la instalación, descarga de las aplicaciones, recuperación de códigos perdidos o diagnóstico de la conexión. Respondemos en menos de ${minutes} minutos de media, también por la noche y los fines de semana.`,
    },
    guarantee: {
      title: 'Garantía de satisfacción o reembolso',
      quote: 'Pruébalo sin riesgo: si no te convence, te devolvemos tu dinero.',
      continuity: (months: string) =>
        `Garantía y seguimiento continuo: acompañamiento personalizado y garantía total de continuidad durante los ${months} meses de tu suscripción.`,
      how: 'Para hacer valer la garantía, contacta con nuestro equipo por WhatsApp o por correo electrónico indicando tu código o identificador de Atlas Pro.',
      rows: {
        window: { label: 'Plazo para solicitarla', what: 'plazo para solicitar el reembolso' },
        conditions: { label: 'Condiciones', what: 'condiciones de la garantía de satisfacción o reembolso' },
        amount: { label: 'Importe reembolsado', what: 'importe reembolsado (total o proporcional)' },
        method: { label: 'Forma y plazo de reembolso', what: 'forma y plazo del reembolso' },
      },
    },
    withdrawal: {
      title: 'Derecho de desistimiento',
      label: 'Derecho de desistimiento',
      what: 'derecho de desistimiento: plazo, forma de ejercerlo y caso de un código entregado de inmediato con tu consentimiento',
    },
    disputes: {
      title: 'Reclamaciones y litigios',
      text: 'En caso de problema, contacta primero con nuestro equipo por WhatsApp o por correo electrónico: buscaremos contigo una solución amistosa.',
      rows: {
        mediator: { label: 'Mediador de consumo', what: 'mediador de consumo (nombre y datos de contacto)' },
        law: { label: 'Legislación aplicable y jurisdicción', what: 'legislación aplicable y jurisdicción competente' },
      },
    },
    changes: {
      title: 'Modificación de las condiciones',
      text: 'Las condiciones aplicables a tu pedido son las vigentes en la fecha de dicho pedido.',
    },
  },
}
