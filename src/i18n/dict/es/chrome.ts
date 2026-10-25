// Spanish (Spain) copy: header, nav, language switcher, trust banner, footer, floating buttons, 404, shared labels.
// Source: ../fr/chrome.ts. Owner: tr-es.
import type { Dict } from '../types.ts'

export const chrome: Dict['chrome'] = {
  pending: 'Por completar',
  skipToContent: 'Ir al contenido',

  banner: {
    label: 'INFORMACIÓN OFICIAL',
    full: (domain: string) =>
      `Portal de activación autorizado y distribuidor certificado de Atlas Pro en ${domain} — Servicio 100 % seguro con garantía oficial: satisfecho o te devolvemos tu dinero`,
    medium: (domain: string) => `Distribuidor certificado de Atlas Pro en ${domain} — Satisfecho o te devolvemos tu dinero`,
    short: 'Distribuidor certificado · Satisfecho o reembolsado',
  },

  nav: {
    label: 'Navegación principal',
    home: 'Inicio',
    boutique: 'Tienda',
    revendeur: 'Revendedor',
    telecharger: 'Descargar',
    contact: 'Contacto',
  },

  header: {
    homeLink: 'Atlas Pro — inicio',
    whatsapp: 'Activación y renovación',
    whatsappShort: 'WhatsApp',
    menuOpen: 'Abrir el menú',
    menuClose: 'Cerrar el menú',
    menuTitle: 'Menú',
    menuLanguages: 'Idioma',
    menuWhatsapp: 'Activar o renovar',
  },

  language: {
    button: (name: string) => `Idioma: ${name}`,
    menu: 'Elegir idioma',
  },

  footer: {
    tagline: 'Distribuidor Oficial Autorizado de Atlas Pro ONTV · Asistencia y activación 7 días a la semana en Francia y en Europa.',
    homeLink: 'AtlasProTVOfficial — inicio',
    sectionsTitle: 'Navegación',
    sections: {
      hero: 'Inicio',
      why: 'Por qué Atlas Pro',
      apps: 'Aplicaciones APK',
      pricing: 'Precios y planes',
      install: 'Guías de instalación',
      reviews: 'Opiniones de clientes',
      faq: 'Preguntas frecuentes',
    },
    pagesTitle: 'Páginas',
    supportTitle: 'Soporte e información',
    support: 'Soporte por WhatsApp 7 días a la semana',
    renewal: 'Renovación del código Atlas Pro',
    legalTitle: 'Información legal',
    mentions: 'Aviso legal',
    confidentialite: 'Política de privacidad',
    conditions: 'Condiciones generales y garantía de devolución',
    paymentTitle: 'Pago por WhatsApp',
    payment: { paypal: 'PayPal', sepa: 'Transferencia bancaria (SEPA)' },
    copyright: (year: number, seller: string) => `© ${year} ${seller} · Distribuidor Oficial Autorizado de Atlas Pro ONTV`,
    watermark: 'ATLAS PRO ONTV',
  },

  floating: {
    whatsapp: 'Escribir al soporte por WhatsApp',
    top: 'Volver al principio de la página',
  },

  notFound: {
    badge: 'ERROR 404',
    title: 'No encontramos esta página',
    text: 'Puede que la dirección haya cambiado o que la página ya no exista. Vuelve al inicio o descubre nuestros planes Atlas Pro en la tienda.',
    home: 'Volver al inicio',
    shop: 'Ver la tienda',
    help: '¿Tienes alguna pregunta? Nuestro soporte te responde por WhatsApp los 7 días de la semana.',
    helpLink: 'Escribir por WhatsApp',
  },
}
