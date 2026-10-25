// European Portuguese (pt-PT), Revendedor page. Source: ../fr/reseller.ts. Owner: tr-pt.
// Never show a reseller price: the price zone always sends to WhatsApp.
import type { Dict } from '../types.ts'

export const reseller: Dict['reseller'] = {
  hero: {
    badge: 'PROGRAMA DE PARCEIROS & PAINEL OFICIAL',
    title: 'Torne-se Revendedor Oficial Atlas Pro ONTV',
    description: (uptime: string) =>
      `Desenvolva o seu próprio negócio e gere receitas recorrentes graças à infraestrutura IPTV premium mais procurada em França e na Europa. Ao juntar-se à nossa rede oficial Atlas Pro, tem acesso a um painel de administração (Painel de Revendedor) ultrapotente, intuitivo e totalmente autónomo. Faça a gestão, a ativação e a renovação dos códigos dos seus clientes com um clique, em todas as nossas aplicações oficiais (Android, Google TV, PC) e leitores parceiros (iOS, Smart TV), com uma estabilidade de servidor garantida de ${uptime}.`,
    points: ['Entrega imediata do seu Painel de Revendedor', 'Suporte Dedicado a Revendedores 24/7', 'SERVIÇO PÓS-VENDA & FORMAÇÃO GRATUITOS'],
    seePanels: 'Ver os painéis',
  },

  panels: {
    label: 'Os painéis de revendedor Atlas Pro',
    title: (codes: string) => `PAINEL ATLAS PRO — ${codes} CÓDIGOS`,
    featured: 'Popular',
    logoLabel: 'Atlas Pro ONTV',
    priceLabel: 'Preço de Revendedor',
    priceText: 'Contacte a nossa equipa por WhatsApp',
    priceNote: '(subscrição anual)',
    features: {
      codes: (codes: string) => `${codes} CÓDIGOS ATLAS PRO (Créditos de 12 meses)`,
      channels: (count: string) => `+${count} Canais de Todo o Mundo em Direto`,
      vod: (count: string) => `+${count} Filmes & Séries VOD (4K / FHD)`,
      replay: (days: string) => `Replay ${days} Dias, EPG & Vídeo a pedido`,
      service: 'SERVIÇO PÓS-VENDA & FORMAÇÃO GRATUITOS',
      delivery: 'Entrega imediata do seu Painel de Revendedor',
      support: 'Suporte Dedicado a Revendedores 24/7',
    },
    cta: 'Pedir este Painel por WhatsApp',
    guarantee: 'GARANTIA 100% Satisfação',
  },

  why: {
    badge: 'PAINEL DE REVENDEDOR ATLAS PRO',
    title: 'Um painel pensado para fazer crescer o seu negócio',
    items: {
      autonomous: {
        title: 'Painel ultrapotente & autónomo',
        text: 'Um painel de administração (Painel de Revendedor) intuitivo e totalmente autónomo, entregue de imediato.',
      },
      oneClick: {
        title: 'Faça a gestão dos seus clientes com um clique',
        text: 'Faça a gestão, a ativação e a renovação dos códigos dos seus clientes com um clique.',
      },
      apps: {
        title: 'Aplicações oficiais & leitores parceiros',
        text: 'As nossas aplicações oficiais (Android, Google TV, PC) e os leitores parceiros (iOS, Smart TV).',
      },
      uptime: {
        title: 'Estabilidade de servidor garantida',
        text: 'A infraestrutura IPTV premium mais procurada em França e na Europa.',
      },
      support: {
        title: 'Suporte Dedicado a Revendedores 24/7',
        text: 'Serviço pós-venda & formação gratuitos para começar bem e acompanhar os seus clientes.',
      },
    },
  },

  cta: {
    title: 'Desenvolva o seu próprio negócio com o Atlas Pro ONTV',
    text: 'Preço de Revendedor: contacte a nossa equipa por WhatsApp (subscrição anual). Escolha o seu painel:',
    button: (codes: string) => `Painel ${codes} Códigos`,
    guarantee: 'GARANTIA 100% Satisfação',
  },
}
