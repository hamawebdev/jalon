// European Portuguese (pt-PT), home: hero, why Atlas Pro, history, sport, VOD, renewal CTA.
// Source: ../fr/story.ts. Owner: tr-pt. Live sport: Full HD 1080p / H.265 only; 4K is VOD only.
import type { Dict } from '../types.ts'

export const story: Dict['story'] = {
  fmt: {
    plus: (n: string) => `${n}+`,
    lead: (n: string) => `+${n}`,
    thousands: (n: string) => `${n}K+`,
    percent: (n: string) => `${n}%`,
  },

  apps: {
    ontv: (v: string) => `Atlas Pro ONTV ${v}`,
    max: (v: string) => `Max v${v}`,
    ibo: (v: string) => `IBO v${v}`,
    maxFull: (v: string) => `Atlas Pro Max v${v}`,
    iboFull: (v: string) => `Atlas Pro IBO v${v}`,
  },

  hero: {
    badge: '✦ O IPTV ATLAS PRO N.º 1 EM 2026',
    title: 'Descubra o Atlas Pro ONTV (2026)',
    subtitle:
      'O IPTV Atlas Pro impôs-se como o líder incontestado dos serviços de streaming. A subscrição Atlas Pro continua a ser, como sempre, a referência absoluta em qualidade, estabilidade e experiência de utilização.',
    useCasesLabel: 'O que é importante para si',
    useCases: {
      uptime: (uptime: string) => `Infraestrutura 2026 Ultraestável · ${uptime}`,
      sport: 'Direto & Grandes Eventos Desportivos Full HD · H.265',
      vod: (films: string, series: string) => `${films} Filmes & ${series} Séries a Pedido`,
      apps: (versions: string) => `Suite Oficial: ${versions}`,
      support: (minutes: string) => `Distribuidor Oficial & Suporte < ${minutes} min`,
    },
    cta: 'Ativar o meu Código Atlas Pro Oficial',
    pricingLink: 'Ver os preços',
    guarantees: ['Código oficial 100% verificado', 'Entrega por WhatsApp & E-mail', 'Garantia total durante toda a subscrição'],
    stats: {
      channels: 'Canais de TV de Todo o Mundo',
      titles: 'Filmes & Séries',
      customers: 'Clientes Satisfeitos (Opiniões Atlas Pro ONTV)',
      uptime: 'Uptime Garantido',
    },
    visual: {
      online: 'Online',
      live: 'Em direto',
      liveQuality: 'Full HD 1080p · H.265',
      nav: ['TV em direto', 'Filmes', 'Séries', 'Replay'],
      vodRow: 'Filmes & Séries',
      servers: 'Servidores europeus',
      support: (minutes: string) => `Suporte < ${minutes} min`,
    },
  },

  why: {
    title: 'Porque é que o Atlas Pro ON TV Domina o Mercado?',
    leader: {
      title: 'Líder IPTV em França & na Europa',
      text: (years: string) =>
        `Reconhecido há mais de ${years} anos, o Atlas Pro ONTV é o fornecedor oficial N.º 1 em França e no mundo francófono, garantindo uma estabilidade à prova de tudo para a sua subscrição Atlas Pro.`,
      stamp: 'N.º 1',
      region: 'França & Europa',
    },
    tech: {
      title: 'Tecnologia Avançada',
      text: 'Os nossos servidores estão distribuídos estrategicamente pelo mundo para garantir uma latência mínima e uma codificação H.265 de última geração, para uma fluidez perfeita.',
    },
    apps: {
      title: 'Ecossistema de Aplicações Oficiais (APK & Box)',
      text: (ontv: string, max: string, ibo: string) =>
        `Desfrute de uma experiência fluida em todos os seus aparelhos. Transfira facilmente o Atlas Pro ONTV APK, aproveite a potência do Atlas Pro Max (Versão ${max}) ou utilize o Atlas Pro IBO (v${ibo}). A nossa aplicação Atlas Pro ONTV ${ontv} está otimizada para todas as boxes Android, Smart TV e PC.`,
      tag: 'APK',
    },
    world: {
      title: 'Cobertura Mundial',
      text: 'A aplicação Atlas Pro ONTV funciona em todo o lado: França, Bélgica, Suíça, Canadá, EUA e muito mais. Uma precisão total para os seus pacotes preferidos.',
    },
    support: {
      title: 'Suporte 7 Dias por Semana & Opiniões de Clientes',
      text: (minutes: string) =>
        `O Atlas Pro não consegue ligar-se ao servidor? A nossa equipa técnica francófona está disponível 7 dias por semana por WhatsApp, com um tempo de resposta inferior a ${minutes} minutos.`,
      reviews: 'Descubra as nossas Opiniões Atlas Pro ONTV',
      response: (minutes: string) => `< ${minutes} min`,
    },
    value: {
      title: 'Poupança & Relação Qualidade/Preço',
      text: 'Pelo preço de uma única subscrição Atlas Pro, aceda a um conteúdo equivalente a dezenas de subscrições separadas (Desporto, Cinema, TV mundial). O conteúdo mais rico ao melhor preço.',
      tags: ['Desporto', 'Cinema', 'TV mundial'],
    },
  },

  history: {
    title: 'A História do Atlas Pro',
    creation: {
      label: (year: string) => `CRIAÇÃO (${year})`,
      title: 'O Nascimento do Atlas Pro',
      text: 'A aventura Atlas Pro ONTV começou com uma visão simples: oferecer uma alternativa acessível e fiável aos serviços de streaming tradicionais.',
    },
    expansion: {
      label: 'EXPANSÃO',
      title: 'Crescimento Internacional',
      text: (generation: string) =>
        `Desenvolvimento das nossas próprias aplicações dedicadas (Atlas Pro ONTV ${generation}, Atlas Pro Max, Atlas Pro IBO) para uma experiência de utilização inigualável em todos os ecrãs.`,
    },
    today: {
      label: 'HOJE',
      title: 'Líder de Mercado',
      text: 'O Atlaspro ONTV tornou-se a referência absoluta em qualidade, estabilidade dos servidores e riqueza de conteúdos.',
    },
    future: {
      label: 'FUTURO',
      title: 'Inovação Contínua',
      text: 'A nossa equipa trabalha incansavelmente em novas funcionalidades e na otimização constante do seu IPTV Atlas Pro.',
    },
  },

  sport: {
    title: 'Atlas Pro ON TV & o Desporto em Direto',
    text: (channels: string) =>
      `Para os amantes de desporto, a subscrição Atlas Pro é um verdadeiro paraíso. A subscrição inclui todos os principais canais desportivos e mais de ${channels} canais premium (TF1, France 2, M6, etc.). Graças aos nossos servidores de alto desempenho, não perca nenhum evento mundial.`,
    pills: { football: 'Futebol', basketball: 'Basquetebol', tennis: 'Ténis', cars: 'Automobilismo' },
    visual: {
      live: 'Em direto',
      quality: 'Full HD 1080p · H.265',
      channels: (channels: string) => `+${channels} canais premium`,
    },
  },

  vod: {
    title: 'VOD Atlas Pro ONTV (Filmes & Séries)',
    text: (films: string, series: string) =>
      `O serviço VOD do Atlas Pro conta com mais de ${films} filmes e ${series} séries. Uma biblioteca imensa, atualizada diariamente para o seu máximo prazer.`,
    checks: {
      quality: (ontv: string) => `Qualidade 4K e Full HD (Otimizada para ${ontv})`,
      subtitles: 'Legendas multilingues (incluindo francês)',
      daily: 'Atualização diária com as últimas novidades',
      compat: 'Compatível com Atlas Pro Max e Atlas Pro IBO',
    },
    categoriesLabel: 'Categorias',
    categories: {
      action: 'Ação',
      comedy: 'Comédia',
      drama: 'Drama',
      scifi: 'Ficção Científica',
      horror: 'Terror',
      romance: 'Romance',
      animation: 'Animação',
      documentary: 'Documentário',
    },
    visual: {
      allusion: 'As produções originais das maiores plataformas mundiais',
      episodes: (episodes: string) => `${episodes} episódios`,
      quality: '4K UHD & Full HD',
    },
  },

  renewal: {
    title: 'Junte-se Hoje ao Atlas Pro ONTV',
    text: 'Descubra o melhor do IPTV com o Atlas Pro 2026. Desfrute do melhor da televisão: desporto em direto, filmes recentes e séries exclusivas.',
    subscribe: 'Subscrever Agora (Novo Cliente)',
    renew: 'Renovar aqui (Introduza o seu Código Atlas Pro)',
  },
}
