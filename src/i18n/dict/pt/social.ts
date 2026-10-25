// European Portuguese (pt-PT), home device compatibility, brand pillars, reviews.
// Source: ../fr/social.ts. Owner: tr-pt.
import type { Dict } from '../types.ts'
import type { ReviewVars } from '../fr/social.ts'

export const social: Dict['social'] = {
  compat: {
    title: 'Compatível com Todos os seus Aparelhos & Ecrãs',
    highlight: 'Todos os seus Aparelhos',
    subtitle:
      'Descubra uma compatibilidade universal e os nossos guias de instalação para desfrutar da sua subscrição Atlas Pro ONTV em cada ecrã.',
    guide: 'Guia de instalação',
    guideFor: (device: string) => `Guia de instalação: ${device}`,
    tv: {
      title: 'Televisores',
      description: 'Configuração rápida e direta na sua Smart TV.',
      pills: ['Samsung', 'LG', 'Sony', '+2'],
    },
    android: {
      title: 'Android',
      suite: 'Suite oficial',
      players: 'Leitores',
      playerNames: ['IBO Player', 'Hot Player', 'IBO Player Smarter', 'Bob Player', 'TiviMate', 'Smarters Pro'],
      pills: ['Box', 'Telemóvel', 'Tablet'],
    },
    apple: {
      title: 'Apple',
      description: 'Tutorial claro e configuração fluida para os aparelhos Apple.',
      pills: ['iPhone', 'iPad', 'Apple TV'],
    },
    box: {
      title: 'Boxes',
      description: 'Instalação de alto desempenho em todos os modelos.',
      pills: ['Magbox', 'Formuler Z7', 'Formuler Z8'],
    },
  },

  pillars: {
    badge: '✦ ATLASPROTVOFFICIAL · DISTRIBUIDOR AUTORIZADO ATLAS PRO ONTV',
    title: 'O Que Distingue o Nosso Serviço Atlas Pro ONTV!',
    subtitle:
      'Milhares de lares em França, na Bélgica, na Suíça e no Canadá confiam-nos as suas noites de televisão. Descubra porque é que os nossos subscritores Atlas Pro nos continuam fiéis ano após ano.',
    distributor: {
      title: 'A Exigência do Distribuidor Autorizado (Serviço Aclamado)',
      body: 'Os nossos subscritores elogiam a transparência do nosso acompanhamento e a regularidade exemplar das transmissões Atlas Pro ONTV, noite após noite, desde o primeiro segundo de ativação.',
      seal: 'Distribuidor Autorizado Atlas Pro ONTV',
    },
    screens: {
      title: 'Compatível com Todos os Seus Ecrãs',
      body: (apps: string) =>
        `Quer utilize as nossas aplicações oficiais gratuitas (${apps}) ou um leitor parceiro (IBO Player, Bob Player, Hot Player, Smarters Pro), a sua subscrição funciona em Smart TV, Box Android, Firestick, Apple e PC.`,
      devices: ['Smart TV', 'Box Android', 'Firestick', 'Apple', 'PC'],
    },
    quality: {
      title: 'Imagem de Alta Fidelidade (Full HD H.265 & VOD 4K)',
      body: 'Dos 480p económicos ao Full HD 1080p de alta fluidez em direto, e até ao Ultra HD 4K no VOD, a transmissão Atlas Pro ajusta-se automaticamente à sua velocidade de Internet, sem compressão agressiva.',
      ladder: ['480p', 'Full HD 1080p · Direto', 'Ultra HD 4K · VOD'],
    },
    infra: {
      title: 'Infraestrutura Europeia Multisservidor Anti-Freeze',
      body: (uptime: string) =>
        `Uma rede de servidores de alta disponibilidade distribuída pela Europa, concebida para absorver os picos de audiência durante os grandes eventos desportivos e garantir uma estabilidade de ${uptime}%.`,
      stat: (uptime: string) => `${uptime}%`,
    },
    zapping: {
      title: (seconds: string) => `Zapping Relâmpago (< ${seconds} s)`,
      body: 'Passe de um canal para outro numa fração de segundo graças à otimização das nossas transmissões Atlas Pro ONTV, sem ecrã preto nem tempos de carregamento.',
      stat: (seconds: string) => `< ${seconds} s`,
    },
    support: {
      title: 'Ajuda & Concierge Francófono 7 Dias por Semana',
      body: (phone: string, minutes: string) =>
        `Um consultor técnico acompanha-o pessoalmente por WhatsApp (${phone}) em menos de ${minutes} minutos, desde a validação do pagamento até à ativação completa do seu ecrã.`,
      stat: (minutes: string) => `< ${minutes} min`,
      cta: 'Escrever a um consultor',
    },
  },

  reviews: {
    badge: '✦ TESTEMUNHOS VERIFICADOS · OPINIÕES ATLAS PRO ONTV 2026',
    title: 'A Opinião de Quem Vê o Atlas Pro ONTV Através do Nosso Portal',
    subtitle:
      'Descubra as opiniões autênticas (Opiniões Atlas Pro ONTV) dos espectadores que escolheram o nosso portal oficial para ativar e renovar a sua subscrição todos os anos.',
    trust: {
      rating: (rating: string) => `${rating} / 5`,
      ratingLabel: 'Classificação Global (Opiniões Atlas Pro ONTV)',
      customers: (customers: string) => `+${customers}`,
      customersLabel: 'Subscritores Acompanhados & Fidelizados',
      recommend: (percent: string) => `${percent}%`,
      recommendLabel: 'Recomendam o Nosso Suporte 7 Dias por Semana',
    },
    stars: 'Classificação: 5 em 5',
    countries: { fr: 'França', be: 'Bélgica', ch: 'Suíça', ca: 'Canadá' },
    cities: { thomas: 'Lyon', sophie: 'Quebeque', karim: 'Namur', marc: 'Bordéus', lucas: 'Toulouse', nadia: 'Genebra' },
    from: (city: string, country: string, year: string) => `${city}, ${country} · ${year}`,
    screenshotAlt: (name: string) => `Captura de ecrã do WhatsApp com a opinião de ${name}`,
    screenshotOpen: (name: string) => `Ampliar a captura de ecrã do WhatsApp com a opinião de ${name}`,
    screenshotPending: (name: string) => `Captura de ecrã do WhatsApp com a opinião de ${name}`,
    items: {
      thomas: {
        badge: 'Reatividade Imediata',
        quote: (_v: ReviewVars) =>
          'Encomendei a minha subscrição Atlas Pro ONTV diretamente pelo WhatsApp deles. Tempo de resposta incrível: menos de 3 minutos depois da minha transferência, o consultor já me tinha enviado o meu Código Atlas Pro e estava tudo a funcionar na minha televisão.',
      },
      sophie: {
        badge: 'Ajuda & Simpatia',
        quote: (_v: ReviewVars) =>
          'Como não sou muito jeitosa com tecnologia, tinha medo de não saber como instalar o Atlas Pro ONTV na minha TV Samsung. O suporte teve uma paciência notável: ativaram o meu leitor IBO Player e configuraram a minha subscrição à distância, passo a passo. Um verdadeiro serviço humano!',
      },
      karim: {
        badge: 'Estabilidade & Desporto Full HD',
        quote: (v: ReviewVars) =>
          `Experimentei vários vendedores antes de conhecer este portal oficial. Com o meu plano Duo 2 Écrans e a nova aplicação ${v.ontv} (e ${v.max}), vejo todos os grandes jogos em Full HD H.265 sem a mínima interrupção.`,
      },
      marc: {
        badge: 'Confiança & Transparência',
        quote: (v: ReviewVars) =>
          `O que aprecio aqui é a franqueza e a seriedade. Como distribuidor autorizado Atlas Pro, não pedem nenhum cartão bancário no site, o pagamento por PayPal e transferência SEPA é seguro e os preços são claros (${v.price} por ano). Sentimo-nos logo em confiança.`,
      },
      lucas: {
        badge: 'Cinema XXL & Preço Simpático',
        quote: (_v: ReviewVars) =>
          'Desde que mudámos para o Atlas Pro ONTV, as noites em família mudaram mesmo. O catálogo VOD é enorme (+24 000 filmes e +6200 séries em 4K e FHD), retomamos os episódios onde os deixámos e o preço faz-nos poupar uma fortuna.',
      },
      nadia: {
        badge: 'Fidelidade & Acompanhamento',
        quote: (v: ReviewVars) =>
          `É o segundo ano que renovo o meu Código Atlas Pro com esta equipa. Uma simples mensagem pelo WhatsApp deles e o meu acesso foi prolongado por ${v.months} meses em poucos segundos, sem perder os meus favoritos na minha Box Android.`,
      },
    },
    pills: {
      quality: 'Transmissão Full HD H.265 & VOD 4K',
      zapping: (seconds: string) => `Zapping < ${seconds} s`,
      servers: (uptime: string) => `Servidores Anti-Freeze ${uptime}%`,
      price: (monthly: string) => `Desde ${monthly} / mês`,
      catalogue: (films: string, series: string) => `+${films} Filmes & +${series} Séries`,
      support: (minutes: string) => `Suporte WhatsApp < ${minutes} min`,
      apps: (ontv: string, max: string) => `Apps Oficiais ${ontv} & ${max}`,
      replay: (days: string) => `Replay ${days} Dias`,
    },
  },
}
