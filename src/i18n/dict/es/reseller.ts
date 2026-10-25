// Spanish (Spain) copy, Revendedor page. Source: ../fr/reseller.ts. Owner: tr-es.
// Never show a reseller price: the price zone always sends to WhatsApp.
import type { Dict } from '../types.ts'

export const reseller: Dict['reseller'] = {
  hero: {
    badge: 'PROGRAMA DE SOCIOS Y PANEL OFICIAL',
    title: 'Hazte Revendedor Oficial de Atlas Pro ONTV',
    description: (uptime: string) =>
      `Desarrolla tu propio negocio y genera ingresos recurrentes con la infraestructura IPTV premium más solicitada de Francia y Europa. Al unirte a nuestra red oficial Atlas Pro, accedes a un panel de administración (Panel de Revendedor) ultrapotente, intuitivo y totalmente autónomo. Gestiona, activa y renueva los códigos de tus clientes en un clic en todas nuestras aplicaciones oficiales (Android, Google TV, PC) y reproductores asociados (iOS, Smart TV), con una estabilidad de servidor garantizada del ${uptime}.`,
    points: ['Entrega inmediata de tu Panel de Revendedor', 'Soporte exclusivo para revendedores 24/7', 'SERVICIO POSVENTA Y FORMACIÓN GRATUITOS'],
    seePanels: 'Ver los paneles',
  },

  panels: {
    label: 'Los paneles de revendedor Atlas Pro',
    title: (codes: string) => `PANEL ATLAS PRO — ${codes} CÓDIGOS`,
    featured: 'Popular',
    logoLabel: 'Atlas Pro ONTV',
    priceLabel: 'Precio para revendedores',
    priceText: 'Contacta con nuestro equipo por WhatsApp',
    priceNote: '(suscripción anual)',
    features: {
      codes: (codes: string) => `${codes} CÓDIGOS ATLAS PRO (créditos de 12 meses)`,
      channels: (count: string) => `+${count} canales de todo el mundo en directo`,
      vod: (count: string) => `+${count} películas y series VOD (4K / FHD)`,
      replay: (days: string) => `Replay de ${days} días, EPG y vídeo a la carta`,
      service: 'SERVICIO POSVENTA Y FORMACIÓN GRATUITOS',
      delivery: 'Entrega inmediata de tu Panel de Revendedor',
      support: 'Soporte exclusivo para revendedores 24/7',
    },
    cta: 'Solicitar este panel por WhatsApp',
    guarantee: 'GARANTÍA DE SATISFACCIÓN 100 %',
  },

  why: {
    badge: 'PANEL DE REVENDEDOR ATLAS PRO',
    title: 'Un panel pensado para hacer crecer tu negocio',
    items: {
      autonomous: {
        title: 'Panel ultrapotente y autónomo',
        text: 'Un panel de administración (Panel de Revendedor) intuitivo y totalmente autónomo, entregado al instante.',
      },
      oneClick: {
        title: 'Gestiona a tus clientes en un clic',
        text: 'Gestiona, activa y renueva los códigos de tus clientes en un clic.',
      },
      apps: {
        title: 'Aplicaciones oficiales y reproductores asociados',
        text: 'Nuestras aplicaciones oficiales (Android, Google TV, PC) y los reproductores asociados (iOS, Smart TV).',
      },
      uptime: {
        title: 'Estabilidad de servidor garantizada',
        text: 'La infraestructura IPTV premium más solicitada de Francia y Europa.',
      },
      support: {
        title: 'Soporte exclusivo para revendedores 24/7',
        text: 'Servicio posventa y formación gratuitos para empezar con buen pie y acompañar a tus clientes.',
      },
    },
  },

  cta: {
    title: 'Desarrolla tu propio negocio con Atlas Pro ONTV',
    text: 'Precio para revendedores: contacta con nuestro equipo por WhatsApp (suscripción anual). Elige tu panel:',
    button: (codes: string) => `Panel de ${codes} códigos`,
    guarantee: 'GARANTÍA DE SATISFACCIÓN 100 %',
  },
}
