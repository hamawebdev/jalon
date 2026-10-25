// European Portuguese (pt-PT) <title>, meta description and social/structured-data wording of every page.
// Source: ../fr/meta.ts. Owner: tr-pt. Titles ≤ ~60 characters, descriptions ≈ 140–160, pt-PT search phrasing.
import type { Dict } from '../types.ts'

const pages: Dict['meta']['pages'] = {
  home: {
    name: 'Início',
    title: 'Atlas Pro ONTV (2026) · Subscrição IPTV Atlas Pro',
    description: (v) =>
      `Descubra o Atlas Pro ONTV 2026, o IPTV Atlas Pro on TV: +${v.channels} canais em Full HD, +${v.films} filmes e +${v.series} séries. Subscrição Atlas Pro ativada por WhatsApp.`,
  },
  boutique: {
    name: 'Loja',
    title: 'Loja · Subscrição Atlas Pro ONTV de 12 meses',
    description: (v) =>
      `Encomende a sua subscrição Atlas Pro ONTV em 3 cliques: 1, 2 ou 3 ecrãs por 12 meses, desde ${v.priceFrom}. Pagamento por PayPal ou SEPA, códigos por WhatsApp.`,
  },
  revendeur: {
    name: 'Revendedor',
    title: 'Revendedor Atlas Pro ONTV · Painel oficial',
    description: (v) =>
      `Torne-se revendedor Atlas Pro: painel de ${v.panels} códigos de 12 meses, entrega imediata, formação gratuita e suporte dedicado 24/7. Preços por WhatsApp.`,
  },
  telecharger: {
    name: 'Transferir',
    title: 'Transferir Atlas Pro ONTV APK · Aplicações oficiais',
    description: (v) =>
      `Transfira o ${v.ontv} (APK), o ${v.max} e o ${v.ibo} com o código Downloader, e os leitores para iPhone, Smart TV, Windows e Mac.`,
  },
  contact: {
    name: 'Contacto',
    title: 'Contacto Atlas Pro · Suporte WhatsApp 7 dias/semana',
    description: (v) =>
      `Dúvidas sobre a sua subscrição Atlas Pro ou a instalação do Atlas Pro ONTV? O nosso suporte responde por WhatsApp no ${v.whatsapp}, 7 dias por semana.`,
  },
  mentions: {
    name: 'Informação legal',
    title: 'Informação legal · AtlasProTVOfficial',
    description: (v) =>
      `Informação legal do site ${v.domain}: editor, alojamento e propriedade intelectual. AtlasProTVOfficial, distribuidor oficial autorizado Atlas Pro.`,
  },
  confidentialite: {
    name: 'Política de privacidade',
    title: 'Política de privacidade · AtlasProTVOfficial',
    description: () =>
      'Como a AtlasProTVOfficial trata as informações que lhe confia para encomendar e ativar a sua subscrição Atlas Pro por WhatsApp, e quais são os seus direitos.',
  },
  conditions: {
    name: 'Termos e condições',
    title: 'Termos e condições & garantia · Atlas Pro ONTV',
    description: () =>
      'Termos e condições da subscrição Atlas Pro ONTV: encomenda e ativação por WhatsApp, pagamento por PayPal ou SEPA, garantia satisfeito ou reembolsado.',
  },
  notFound: {
    name: 'Página não encontrada',
    title: 'Página não encontrada · Atlas Pro ONTV',
    description: () =>
      'Esta página não existe ou mudou de endereço. Encontre a subscrição Atlas Pro ONTV, as aplicações e os guias de instalação a partir da página inicial.',
  },
}

export const meta: Dict['meta'] = {
  siteName: 'AtlasProTVOfficial',
  ogImageAlt: 'Atlas Pro ONTV 2026 · Subscrição IPTV Atlas Pro na AtlasProTVOfficial, distribuidor oficial autorizado',
  organizationDescription: 'Distribuidor Oficial Autorizado Atlas Pro N.º 1 em França & na Europa.',
  productName: 'Subscrição Atlas Pro ONTV',
  productDescription:
    'Subscrição IPTV Atlas Pro ONTV de 12 meses para 1, 2 ou 3 ecrãs: canais em direto em Full HD, filmes e séries em VOD, replay, em Android, Smart TV, Fire TV Stick, iPhone e PC.',
  planNames: { premium: 'Premium', duo: 'Duo', famille: 'Famille' },
  offerName: (plan: string, screens: number, months: number) =>
    `${plan} · ${screens} ${screens > 1 ? 'ecrãs' : 'ecrã'} · ${months} meses`,
  pages,
}
