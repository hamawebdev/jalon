// European Portuguese (pt-PT): home how-to-buy, pricing cards, reassurance band; Loja page with the order configurator.
// Source: ../fr/pricing.ts. Owner: tr-pt. Badges in normal case (the Badge component capitalises them).
import type { Dict } from '../types.ts'

/** « 1, 2 ou 3 » */
const orList = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} ou ${items[items.length - 1]}`

export const pricing: Dict['pricing'] = {
  howTo: {
    badge: '🛒 Como funciona',
    title: 'Como comprar a sua subscrição Atlas Pro ONTV',
    highlight: 'subscrição',
    subtitle: (minutes: string) =>
      `Da sua encomenda ao seu primeiro programa em menos de ${minutes} minutos. Veja como ativar a sua subscrição Atlas Pro com toda a simplicidade.`,
    step: (n: string) => `Passo ${n}`,
    steps: {
      choose: {
        title: 'Escolha a sua oferta',
        text: (screens: string[], months: string) =>
          `Selecione o plano de subscrição Atlas Pro que melhor se adapta a si: ${orList(screens)} ecrãs durante ${months} meses.`,
        time: '1 minuto',
      },
      pay: {
        title: (pct: string) => `Pagamento ${pct} seguro`,
        text: 'Pague com toda a tranquilidade por PayPal ou Transferência Bancária (SEPA). As suas transações são encriptadas de ponta a ponta para sua segurança.',
        time: '2 minutos',
      },
      receive: {
        title: 'Receba os seus códigos de imediato',
        text: 'As suas credenciais e o seu Código Atlas Pro chegam de imediato por WhatsApp e e-mail (em menos de 30 segundos). Sem esperas.',
        time: '< 30 segundos',
      },
      install: {
        title: 'Instale e comece a ver!',
        text: (channels: string) =>
          `Transfira a aplicação Atlas Pro ONTV (ou o Atlas Pro ONTV APK, o Atlas Pro Max e o IBO), introduza os seus códigos e desfrute de imediato de mais de ${channels} canais em direto.`,
        time: 'Imediato',
      },
    },
    timeLabel: 'Duração',
  },

  plans: {
    badge: '🏷️ Preços & subscrições',
    title: 'Escolha o seu plano Atlas Pro ONTV',
    highlight: 'plano',
    subtitle:
      'Sejamos francos: existem dezenas de serviços IPTV, mas poucos cumprem o que prometem. O Atlas Pro ONTV é uma dessas exceções. Experimente sem riscos — garantia satisfeito ou reembolsado se não ficar convencido.',
    names: {
      premium: 'Premium 1 Écran',
      duo: 'Duo 2 Écrans',
      famille: 'Famille 3 Écrans',
    },
    popular: 'O mais popular',
    limited: '🔥 Oferta limitada',
    per: (months: string) => `/ ${months} meses`,
    perMonth: (price: string) => `Ou seja, ${price} / mês`,
    cta: 'Subscrever agora',
    featuresLabel: (plan: string) => `Incluído no plano ${plan}`,
    features: {
      codesOne: (months: string) => `1 código de ativação oficial (Código Atlas Pro) para ${months} meses`,
      codesMany: (count: string) => `${count} códigos de ativação oficiais (Código Atlas Pro) para ${count} ecrãs`,
      quality: 'Qualidade 4K (VOD), FHD, HD e SD',
      antiFreeze: 'Sistema Anticortes (Anti-Freeze) incluído',
      replay: (days: string) => `Replay ${days} Dias + Guia TV Completo (EPG)`,
      support: (pct: string) => `Apoio ao cliente ${pct} em francês`,
      supportVip: (pct: string) => `Suporte VIP ${pct} em francês`,
      links: 'Links personalizados à escolha: formato Xtream Codes ou M3U',
      assistance: 'Assistência na instalação e suporte pós-venda',
      warranty: 'Garantia e ativação oficial',
      apps: (apps: string) => `Acesso a todas as aplicações (${apps})`,
    },
    boutiqueLink: 'Encomendar em 3 cliques na Loja',
  },

  trust: {
    label: 'Garantias e meios de pagamento',
    secure: (pct: string) => `Pagamento ${pct} seguro`,
    instant: 'Ativação imediata',
    protected: (pct: string) => `Acesso ${pct} protegido & garantido`,
    payment: 'Pagamento:',
    methods: {
      paypal: 'PayPal',
      sepa: 'Transferência bancária / SEPA',
    },
  },

  reassurance: {
    label: 'Os nossos compromissos',
    renewal: {
      title: 'Renovação Fácil',
      text: 'Prolongue o seu Código Atlas Pro com um clique por WhatsApp, sem reinstalar as suas aplicações nem perder os seus favoritos.',
      cta: 'Renovar por WhatsApp',
    },
    activation: {
      title: 'Ativação Rápida',
      text: 'Código Atlas Pro oficial, credenciais Xtream e link M3U enviados de imediato por WhatsApp e por e-mail logo após a validação.',
    },
    guarantee: {
      title: 'Garantia & Acompanhamento Contínuo (Satisfeito ou Reembolsado)',
      text: (months: string) =>
        `Acompanhamento personalizado e garantia total de continuidade ao longo dos ${months} meses da sua subscrição.`,
    },
  },

  configurator: {
    badge: '🛍️ Loja Express · Encomenda em 3 cliques',
    title: 'Configure a sua Subscrição Atlas Pro ONTV em 10 Segundos',
    subtitle:
      'Selecione o seu aparelho, o número de códigos pretendido e o seu meio de pagamento para receber os seus acessos de imediato por WhatsApp.',
    stepA: { letter: 'A', title: 'Qual é o seu aparelho?' },
    stepB: { letter: 'B', title: 'Quantos códigos Atlas Pro pretende?' },
    stepC: { letter: 'C', title: 'O seu meio de pagamento preferido' },
    step: (letter: string) => `Passo ${letter}`,
    devices: {
      androidBox: 'TV Box Android',
      samsung: 'Smart TV Samsung',
      lg: 'Smart TV LG',
      firestick: 'Fire TV Stick',
      googleTv: 'Android TV / Google TV',
      apple: 'iPhone / iPad / Apple TV',
      pc: 'PC Windows / Mac',
      formuler: 'Formuler / MAG',
    },
    codes: (count: number) => (count === 1 ? '1 Código Atlas Pro' : `${count} Códigos Atlas Pro`),
    codesDetail: (plan: string, months: string) => `${plan} · ${months} Meses`,
    price: (price: string) => `Preço: ${price}`,
    popular: 'Popular',
    payments: {
      sepa: 'Transferência Bancária (SEPA)',
      paypal: 'PayPal',
    },
    summary: 'A sua encomenda',
    summaryDevice: 'Aparelho',
    summaryOffer: 'Oferta',
    summaryPayment: 'Pagamento',
    notChosen: 'Por escolher',
    total: 'Total',
    totalFor: (months: string) => `por ${months} meses`,
    cta: (price: string) => `Encomendar Agora por WhatsApp (${price})`,
    needDevice: 'Escolha primeiro o seu aparelho (Passo A).',
    needPayment: 'Escolha o seu meio de pagamento (Passo C).',
    ready: 'A sua encomenda segue para o WhatsApp já redigida: só falta enviá-la.',
    boutiqueLink: 'Abrir a Loja',
  },

  boutique: {
    badge: 'Distribuidor Oficial Autorizado Atlas Pro ONTV',
    title: 'Loja Atlas Pro ONTV',
    intro:
      'Encomende a sua subscrição Atlas Pro em 3 cliques: o seu aparelho, o número de códigos e o seu meio de pagamento. A sua encomenda segue diretamente para o WhatsApp e o seu Código Atlas Pro oficial é-lhe enviado assim que o pagamento, por PayPal ou Transferência Bancária (SEPA), for validado.',
  },
}
