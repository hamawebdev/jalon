// European Portuguese (pt-PT): header, nav, language switcher, trust banner, footer, floating buttons, 404, shared labels.
// Source: ../fr/chrome.ts. Owner: tr-pt.
import type { Dict } from '../types.ts'

export const chrome: Dict['chrome'] = {
  pending: 'A completar',
  skipToContent: 'Ir para o conteúdo',

  banner: {
    label: 'INFORMAÇÃO OFICIAL',
    full: (domain: string) =>
      `Portal de ativação autorizado e distribuidor certificado Atlas Pro em ${domain} — Serviço 100% seguro com garantia oficial: Satisfeito ou Reembolsado`,
    medium: (domain: string) => `Distribuidor certificado Atlas Pro em ${domain} — Satisfeito ou Reembolsado`,
    short: 'Distribuidor certificado · Satisfeito ou Reembolsado',
  },

  nav: {
    label: 'Navegação principal',
    home: 'Início',
    boutique: 'Loja',
    revendeur: 'Revendedor',
    telecharger: 'Transferir',
    contact: 'Contacto',
  },

  header: {
    homeLink: 'Atlas Pro — início',
    whatsapp: 'Ativação & Renovação',
    whatsappShort: 'WhatsApp',
    menuOpen: 'Abrir o menu',
    menuClose: 'Fechar o menu',
    menuTitle: 'Menu',
    menuLanguages: 'Idioma',
    menuWhatsapp: 'Ativar ou renovar',
  },

  language: {
    button: (name: string) => `Idioma: ${name}`,
    menu: 'Escolher o idioma',
  },

  footer: {
    tagline: 'Distribuidor Oficial Autorizado Atlas Pro ONTV · Assistência & Ativação 7 dias por semana em França e na Europa.',
    homeLink: 'AtlasProTVOfficial — início',
    sectionsTitle: 'Navegação',
    sections: {
      hero: 'Início',
      why: 'Porquê o Atlas Pro',
      apps: 'Aplicações APK',
      pricing: 'Preços & Planos',
      install: 'Guias de Instalação',
      reviews: 'Opiniões de Clientes',
      faq: 'FAQ',
    },
    pagesTitle: 'Páginas',
    supportTitle: 'Suporte & Informações',
    support: 'Suporte WhatsApp 7 dias por semana',
    renewal: 'Renovação do Código Atlas Pro',
    legalTitle: 'Informações legais',
    mentions: 'Informação Legal',
    confidentialite: 'Política de Privacidade',
    conditions: 'Termos e Condições & Garantia Satisfeito ou Reembolsado',
    paymentTitle: 'Pagamento por WhatsApp',
    payment: { paypal: 'PayPal', sepa: 'Transferência bancária (SEPA)' },
    copyright: (year: number, seller: string) => `© ${year} ${seller} · Distribuidor Oficial Autorizado Atlas Pro ONTV`,
    watermark: 'ATLAS PRO ONTV',
  },

  floating: {
    whatsapp: 'Escrever ao suporte por WhatsApp',
    top: 'Voltar ao topo da página',
  },

  notFound: {
    badge: 'ERRO 404',
    title: 'Esta página não foi encontrada',
    text: 'O endereço pode ter mudado ou a página já não existe. Volte ao início ou descubra os nossos planos Atlas Pro na loja.',
    home: 'Voltar ao início',
    shop: 'Ver a loja',
    help: 'Tem uma pergunta? O nosso suporte responde-lhe 7 dias por semana por WhatsApp.',
    helpLink: 'Escrever por WhatsApp',
  },
}
