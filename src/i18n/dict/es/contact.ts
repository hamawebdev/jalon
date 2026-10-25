// Spanish (Spain) copy, Contact page. Source: ../fr/contact.ts. Owner: tr-es.
import type { Dict } from '../types.ts'

export const contact: Dict['contact'] = {
  badge: '✦ CONTACTO Y SOPORTE 7 DÍAS A LA SEMANA',
  title: 'Contacta con tu distribuidor oficial de Atlas Pro',
  subtitle:
    'Una pregunta antes de hacer tu pedido, un código que activar o renovar, ayuda con la instalación: nuestro equipo te responde en francés, los 7 días de la semana.',

  whatsapp: {
    badge: 'Canal prioritario',
    title: 'WhatsApp',
    text: 'Pedidos, activación, renovación de tu código Atlas Pro y asistencia técnica: todo se resuelve aquí, directamente con nuestro equipo.',
    response: (minutes: number) => `Respuesta < ${minutes} min`,
    days: '7 días a la semana',
    french: 'En francés',
    button: 'Escribir por WhatsApp',
    tip: 'Para ir más rápido, indica tu dispositivo y, si es una renovación, tu código o identificador actual.',
  },

  email: {
    title: 'Correo electrónico',
    text: 'Para tus consultas detalladas y el seguimiento de tu suscripción.',
    pending: 'dirección de correo electrónico del soporte',
  },

  telegram: {
    title: 'Telegram',
    text: 'Asistencia técnica y nuevas versiones de las aplicaciones oficiales.',
    pending: 'enlace de Telegram',
    open: 'Abrir Telegram',
  },

  help: {
    title: 'Encuentra tu respuesta en un clic',
    install: {
      title: 'Guías de instalación',
      text: 'Smart TV, Fire TV Stick, Android, iPhone, PC: los pasos a seguir, dispositivo por dispositivo.',
    },
    faq: {
      title: 'Preguntas frecuentes',
      text: 'Pedido, activación, compatibilidad, renovación: las respuestas a las preguntas más habituales.',
    },
    reseller: {
      title: 'Hazte revendedor',
      text: '¿Quieres revender Atlas Pro? Descubre nuestros paneles de códigos.',
    },
  },
}
