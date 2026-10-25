// Spanish (Spain) <title>, meta description and social/structured-data wording of every page. Source: ../fr/meta.ts.
// Owner: tr-es. Titles ≤ ~60 characters, descriptions ~140–160, Spanish search phrasing (« suscripción Atlas Pro »,
// « descargar Atlas Pro ONTV APK »). Descriptions take MetaVars, already formatted for Spanish.
import type { Dict } from '../types.ts'
import type { PageMetaCopy } from '../fr/meta.ts'

type MetaPage = keyof Dict['meta']['pages']

const pages: Record<MetaPage, PageMetaCopy> = {
  home: {
    name: 'Inicio',
    title: 'Atlas Pro ONTV (2026) · Suscripción IPTV Atlas Pro',
    description: (v) =>
      `Descubre Atlas Pro ONTV 2026, el IPTV Atlas Pro on TV: +${v.channels} canales en Full HD, +${v.films} películas y series. Suscripción Atlas Pro activada por WhatsApp.`,
  },
  boutique: {
    name: 'Tienda',
    title: 'Tienda · Suscripción Atlas Pro ONTV 12 meses',
    description: (v) =>
      `Contrata tu suscripción Atlas Pro ONTV en 3 clics: 1, 2 o 3 pantallas durante 12 meses, desde ${v.priceFrom}. Pago por PayPal o SEPA, códigos por WhatsApp.`,
  },
  revendeur: {
    name: 'Revendedor',
    title: 'Hazte revendedor de Atlas Pro ONTV · Panel oficial',
    description: (v) =>
      `Hazte revendedor de Atlas Pro: panel de ${v.panels} códigos de 12 meses, entrega inmediata, formación gratuita y soporte exclusivo 24/7. Precios por WhatsApp.`,
  },
  telecharger: {
    name: 'Descargar',
    title: 'Descargar Atlas Pro ONTV APK · Aplicaciones oficiales',
    description: (v) =>
      `Descarga ${v.ontv} (APK), ${v.max} y ${v.ibo} con su código Downloader, y los reproductores para iPhone, Smart TV, Windows y Mac.`,
  },
  contact: {
    name: 'Contacto',
    title: 'Contacto Atlas Pro · Soporte por WhatsApp 7/7',
    description: (v) =>
      `¿Dudas sobre tu suscripción Atlas Pro o sobre cómo instalar Atlas Pro ONTV? Nuestro soporte te responde por WhatsApp en el ${v.whatsapp}, 7 días a la semana.`,
  },
  mentions: {
    name: 'Aviso legal',
    title: 'Aviso legal · AtlasProTVOfficial',
    description: (v) =>
      `Aviso legal del sitio ${v.domain}: editor, alojamiento y propiedad intelectual. AtlasProTVOfficial, distribuidor oficial autorizado de Atlas Pro.`,
  },
  confidentialite: {
    name: 'Política de privacidad',
    title: 'Política de privacidad · AtlasProTVOfficial',
    description: () =>
      'Cómo trata AtlasProTVOfficial la información que nos confías para contratar y activar tu suscripción Atlas Pro por WhatsApp, y cuáles son tus derechos.',
  },
  conditions: {
    name: 'Condiciones generales',
    title: 'Condiciones generales y garantía · Atlas Pro ONTV',
    description: () =>
      'Condiciones generales de la suscripción Atlas Pro ONTV: pedido y activación por WhatsApp, pago por PayPal o transferencia SEPA, garantía de devolución.',
  },
  notFound: {
    name: 'Página no encontrada',
    title: 'Página no encontrada · Atlas Pro ONTV',
    description: () =>
      'Esta página no existe o ha cambiado de dirección. Encuentra la suscripción Atlas Pro ONTV, las aplicaciones y las guías de instalación desde el inicio.',
  },
}

export const meta: Dict['meta'] = {
  siteName: 'AtlasProTVOfficial',
  ogImageAlt: 'Atlas Pro ONTV 2026 · Suscripción IPTV Atlas Pro con AtlasProTVOfficial, distribuidor oficial autorizado',
  organizationDescription: 'Distribuidor Oficial Autorizado de Atlas Pro n.º 1 en Francia y en Europa.',
  productName: 'Suscripción Atlas Pro ONTV',
  productDescription:
    'Suscripción IPTV Atlas Pro ONTV de 12 meses para 1, 2 o 3 pantallas: canales en directo en Full HD, películas y series en VOD y replay, en Android, Smart TV, Fire TV Stick, iPhone y PC.',
  planNames: { premium: 'Premium', duo: 'Duo', famille: 'Famille' },
  offerName: (plan: string, screens: number, months: number) =>
    `${plan} · ${screens} pantalla${screens > 1 ? 's' : ''} · ${months} meses`,
  pages,
}
