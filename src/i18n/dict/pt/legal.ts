// European Portuguese (pt-PT), legal pages: informação legal, privacidade, termos e condições.
// Source: ../fr/legal.ts. Owner: tr-pt. French law references are kept, named in Portuguese where usual.
import type { Dict } from '../types.ts'

export const legal: Dict['legal'] = {
  common: {
    badge: 'Informações legais',
    updatedLabel: 'Última atualização:',
    updated: '25 de outubro de 2026',
    toc: 'Índice',
    others: 'Outros documentos',
    docs: {
      mentions: 'Informação legal',
      confidentialite: 'Política de privacidade',
      conditions: 'Termos e Condições & Garantia Satisfeito ou Reembolsado',
    },
    help: {
      title: 'Tem alguma pergunta sobre estas informações?',
      text: 'A nossa equipa responde-lhe por WhatsApp 7 dias por semana, em francês.',
      cta: 'Escrever-nos por WhatsApp',
    },
    contact: {
      whatsapp: 'WhatsApp',
      email: 'E-mail',
    },
    pending: {
      companyName: 'denominação social do editor',
      legalForm: 'forma jurídica (e capital social, se aplicável)',
      address: 'morada da sede',
      registration: 'registo (RCS / SIREN, n.º de IVA intracomunitário)',
      publisher: 'nome do diretor da publicação',
      host: 'alojamento do site (nome, morada, telefone)',
      email: 'endereço de e-mail do suporte',
    },
  },

  mentions: {
    title: 'Informação legal',
    lead: (domain: string) =>
      `Informações sobre o editor e o fornecedor de alojamento do site ${domain}, publicadas em aplicação do artigo 6.º da lei francesa n.º 2004-575, de 21 de junho de 2004, para a confiança na economia digital (LCEN).`,
    publisher: {
      title: 'Editor do site',
      intro: (seller: string, domain: string) =>
        `O site ${domain} é editado por ${seller}, distribuidor oficial autorizado Atlas Pro ONTV.`,
      rows: {
        tradeName: 'Nome comercial',
        domain: 'Endereço do site',
        activity: 'Atividade',
        companyName: 'Denominação social',
        legalForm: 'Forma jurídica',
        address: 'Sede',
        registration: 'Registo',
      },
      activity:
        'Distribuição e ativação de códigos de subscrição Atlas Pro, assistência à instalação e apoio ao cliente.',
    },
    director: {
      title: 'Diretor da publicação',
      label: 'Diretor da publicação',
    },
    contact: {
      title: 'Contacto',
      intro: 'Para qualquer questão sobre o site ou sobre a sua subscrição:',
    },
    host: {
      title: 'Alojamento',
      label: 'Fornecedor de alojamento',
    },
    ip: {
      title: 'Propriedade intelectual',
      paragraphs: [
        'A estrutura do site, os seus textos, ilustrações e elementos gráficos estão protegidos pelo direito da propriedade intelectual. É proibida qualquer reprodução ou representação, total ou parcial, sem autorização prévia e por escrito do editor.',
        'As marcas, nomes e logótipos das aplicações e dos leitores mencionados no site pertencem aos respetivos titulares. São referidos apenas para indicar a compatibilidade do serviço.',
      ],
    },
    links: {
      title: 'Ligações para serviços de terceiros',
      paragraphs: [
        'O site remete para serviços de terceiros: o WhatsApp, para as encomendas e a assistência, bem como as páginas de transferência das aplicações oficiais e dos leitores parceiros. Estes serviços estão sujeitos às suas próprias condições; o editor não é responsável pelo seu conteúdo nem pela sua disponibilidade.',
      ],
    },
    accuracy: {
      title: 'Exatidão das informações',
      paragraphs: [
        'O editor zela pela exatidão das informações publicadas (planos, número de canais e de conteúdos, versões das aplicações, guias de instalação). Estas informações podem mudar: em caso de dúvida, a nossa equipa confirma-lhe os dados atualizados por WhatsApp.',
      ],
    },
    data: {
      title: 'Dados pessoais',
      before: 'O tratamento dos seus dados pessoais está descrito na nossa ',
      link: 'Política de privacidade',
      after: '.',
    },
  },

  privacy: {
    title: 'Política de privacidade',
    lead: (seller: string, domain: string) =>
      `Que dados são tratados quando consulta ${domain} ou encomenda uma subscrição Atlas Pro a ${seller}, porquê, e como exercer os seus direitos.`,
    summary: {
      title: 'Em resumo',
      items: [
        'Nenhuma conta de cliente, nenhum formulário e nenhum pagamento no site.',
        'Nenhum cookie, nenhum rastreador publicitário nem ferramenta de medição de audiências.',
        'As suas encomendas passam por uma conversa de WhatsApp que é o próprio a abrir.',
        'Os seus dados servem para tratar a sua encomenda, entregar-lhe os seus códigos e prestar-lhe assistência.',
      ],
    },
    controller: {
      title: 'Responsável pelo tratamento',
      before: (seller: string) =>
        `O responsável pelo tratamento é ${seller}, editor do site. A sua identificação completa consta da `,
      link: 'informação legal',
      after: '.',
    },
    notCollected: {
      title: 'O que o site não recolhe',
      items: [
        'Nenhuma conta de cliente nem área pessoal.',
        'Nenhum formulário: nada do que lê ou escolhe no site nos é transmitido.',
        'Nenhum pagamento no site: não são pedidos nem guardados quaisquer dados de cartão bancário.',
        'Nenhum cookie, nenhum rastreador publicitário, nenhuma ferramenta de medição de audiências.',
        'Os tipos de letra estão alojados com o site: o seu navegador não contacta nenhum serviço de terceiros para apresentar as páginas.',
      ],
    },
    browsing: {
      title: 'Consulta do site',
      paragraphs: [
        'Como qualquer servidor web, o fornecedor de alojamento do site pode registar dados técnicos de ligação (endereço IP, data e hora, página pedida, tipo de navegador) para garantir a segurança e o bom funcionamento do site. Fundamento jurídico: o nosso interesse legítimo em proteger o site.',
      ],
    },
    whatsapp: {
      title: 'Encomenda e assistência por WhatsApp',
      intro: [
        'Os botões de encomenda, ativação, renovação e ajuda abrem o WhatsApp com uma mensagem pré-preenchida. Nada nos é transmitido enquanto não enviar essa mensagem.',
        'Quando nos escreve, tratamos as informações que nos comunica na conversa:',
      ],
      items: [
        'o seu número de WhatsApp e o nome do seu perfil;',
        'o plano escolhido, o seu aparelho e o meio de pagamento escolhido;',
        'o seu endereço de e-mail, para o envio do seu Código Atlas Pro e das suas credenciais;',
        'o seu código ou identificador atual, no caso de uma renovação;',
        'as informações úteis à assistência (aparelho, aplicação, mensagem de erro, capturas de ecrã que decida enviar).',
      ],
      outro: [
        'Estes dados servem para tratar a sua encomenda, entregar e ativar os seus códigos, prestar-lhe assistência e gerir as suas renovações. Fundamento jurídico: a execução do contrato que celebra connosco (artigo 6.º, n.º 1, alínea b), do RGPD).',
        'O WhatsApp é um serviço de terceiros, sujeito aos seus próprios termos de utilização e à sua própria política de privacidade.',
      ],
    },
    payment: {
      title: 'Pagamento',
      paragraphs: [
        'O pagamento é feito por PayPal ou por transferência bancária SEPA, de acordo com as informações dadas na conversa de WhatsApp. Nenhum pagamento é efetuado no site.',
        'Recebemos as informações da transação: nome do titular, montante, data e referência do pagamento (e, no caso de uma transferência, os dados bancários que constam da operação). O PayPal trata os seus dados de pagamento de acordo com a sua própria política de privacidade.',
        'Estes dados servem para confirmar o seu pagamento e cumprir as nossas obrigações contabilísticas. Fundamento jurídico: a execução do contrato e as nossas obrigações legais.',
      ],
    },
    recipients: {
      title: 'Destinatários',
      team: (seller: string) =>
        `Os seus dados são tratados pela equipa de ${seller} e pelos prestadores necessários ao serviço: WhatsApp (mensagens), PayPal ou o seu banco (pagamento), o fornecedor de alojamento do site (dados técnicos de ligação).`,
      transfers:
        'Alguns destes prestadores podem tratar dados fora da União Europeia, no âmbito das garantias previstas pelo RGPD.',
    },
    retention: {
      title: 'Prazos de conservação',
      intro:
        'Conservamos os seus dados durante o tempo necessário às finalidades acima descritas e, em seguida, apagamo-los, salvo obrigação legal de conservação.',
      rows: {
        order: { label: 'Conversa e dados da encomenda', what: 'prazo de conservação das conversas e dos dados de encomenda' },
        accounting: { label: 'Pagamentos e documentos contabilísticos', what: 'prazo de conservação dos dados de pagamento e dos documentos contabilísticos' },
        logs: { label: 'Dados técnicos de ligação', what: 'prazo de conservação dos registos do fornecedor de alojamento' },
      },
    },
    rights: {
      title: 'Os seus direitos',
      paragraphs: [
        'Nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD) e da lei francesa « Informatique et Libertés », dispõe dos direitos de acesso, retificação, apagamento, limitação, oposição e portabilidade dos seus dados.',
        'Para exercer estes direitos, escreva-nos por WhatsApp ou por e-mail (contactos abaixo). Respondemos no prazo máximo de um mês.',
        'Se considerar que os seus direitos não são respeitados, pode apresentar uma reclamação junto da autoridade de proteção de dados do seu país (em França, a CNIL).',
      ],
    },
    cookies: {
      title: 'Cookies',
      paragraphs: [
        'O site não instala nenhum cookie e não utiliza nenhum rastreador: por isso, não é necessário qualquer aviso de consentimento. Se isso vier a mudar, esta política será atualizada e o seu consentimento será pedido sempre que a lei o exija.',
      ],
    },
    changes: {
      title: 'Alterações',
      paragraphs: [
        'Podemos atualizar esta política para refletir uma evolução do site ou dos nossos serviços. A data da última atualização figura no topo desta página.',
      ],
    },
  },

  terms: {
    title: 'Termos e Condições & Garantia Satisfeito ou Reembolsado',
    lead: (seller: string) =>
      `As condições de venda das subscrições Atlas Pro propostas por ${seller}, distribuidor oficial autorizado Atlas Pro ONTV, e a nossa garantia satisfeito ou reembolsado.`,
    scope: {
      title: 'Objeto',
      text: (seller: string, domain: string) =>
        `Os presentes termos e condições regem a venda das subscrições Atlas Pro por ${seller} aos clientes que encomendam através de ${domain} ou diretamente por WhatsApp. A realização de uma encomenda implica a aceitação destes termos.`,
    },
    seller: {
      title: 'O vendedor',
      before: (seller: string) =>
        `O vendedor é ${seller}, distribuidor oficial autorizado Atlas Pro ONTV. Os seus dados completos constam da `,
      link: 'informação legal',
      after: '.',
    },
    service: {
      title: 'O serviço',
      offer: (v: { months: string; channels: string; films: string; series: string; replayDays: string; replayChannels: string }) =>
        `A subscrição Atlas Pro dá acesso, durante ${v.months} meses, à oferta Atlas Pro ONTV: +${v.channels} canais em direto, um catálogo de vídeo a pedido (+${v.films} filmes e +${v.series} séries) e o Replay de ${v.replayDays} dias em +${v.replayChannels} canais.`,
      codes: 'Cada plano inclui um Código Atlas Pro por ecrã.',
      apps: (apps: string) =>
        `O serviço utiliza-se com as nossas aplicações oficiais gratuitas (${apps}) ou com um leitor parceiro compatível (credenciais Xtream Codes ou link M3U).`,
      players: (price: string, days: string) =>
        `Alguns leitores parceiros, nomeadamente em Smart TV Samsung e LG, são pagos ao respetivo editor (cerca de ${price} por ano, após um período de teste gratuito de ${days} dias). Este custo não está incluído na subscrição Atlas Pro.`,
      requirements: {
        before: 'O serviço requer uma ligação à Internet e um aparelho compatível. Antes de encomendar, consulte os nossos ',
        install: 'guias de instalação',
        middle: ' e a página ',
        downloads: 'Transferir',
        after: ', ou peça conselho à nossa equipa.',
      },
    },
    plans: {
      title: 'Planos e preços',
      intro: 'Os planos propostos são os seguintes:',
      columns: { plan: 'Plano', duration: 'Duração', price: 'Preço' },
      names: { premium: 'Premium 1 Écran', duo: 'Duo 2 Écrans', famille: 'Famille 3 Écrans' },
      months: (months: string) => `${months} meses`,
      pricePending: 'preço do plano',
      notes: [
        'Os preços são indicados em euros. O preço aplicável é o apresentado no momento da encomenda e confirmado na conversa de WhatsApp.',
      ],
      vat: { label: 'IVA', what: 'menção ao IVA (preço com IVA incluído ou « IVA não aplicável »)' },
    },
    order: {
      title: 'Encomenda',
      steps: [
        'Escolha o seu plano e clique no respetivo botão: o WhatsApp abre com uma mensagem pré-preenchida. A Loja permite-lhe também indicar o seu aparelho e o meio de pagamento.',
        'Envie a mensagem: a nossa equipa confirma-lhe o plano, o preço e as informações de pagamento.',
        'A encomenda torna-se definitiva após a validação do seu pagamento.',
      ],
      shop: 'Abrir a Loja',
    },
    payment: {
      title: 'Pagamento',
      paragraphs: [
        'O preço do plano é pago por PayPal ou por transferência bancária SEPA, de acordo com as informações transmitidas na conversa de WhatsApp. Nenhum pagamento por cartão bancário é efetuado no site.',
      ],
    },
    delivery: {
      title: 'Entrega e ativação',
      paragraphs: [
        'Após a validação do seu pagamento, o seu Código Atlas Pro oficial (bem como os seus acessos Xtream / M3U) é-lhe enviado por WhatsApp e por e-mail. Durante o nosso horário de funcionamento, o envio é quase imediato (geralmente em menos de 3 a 15 minutos).',
        'Não recebeu nada? Verifique a pasta de correio não solicitado (spam) e, em seguida, escreva à nossa equipa por WhatsApp: um consultor envia-lhe de imediato o seu Código Atlas Pro.',
        'A nossa equipa acompanha-o na instalação e na ativação no seu aparelho.',
      ],
      rows: {
        hours: { label: 'Horário de funcionamento', what: 'horário de funcionamento da equipa (envio dos códigos)' },
        start: { label: 'Início da subscrição', what: 'momento de início da subscrição (envio ou primeira ativação do código)' },
      },
    },
    renewal: {
      title: 'Duração e renovação',
      paragraphs: [
        (months: string) =>
          `A subscrição tem a duração de ${months} meses. Não é renovada automaticamente: nenhum débito é efetuado sem o seu pedido.`,
        (months: string) =>
          `Para renovar, contacte-nos por WhatsApp indicando o seu código ou identificador atual. Assim que o seu pagamento (PayPal ou SEPA) for validado, a sua subscrição é prolongada por ${months} meses em poucos minutos. Mantém a aplicação já instalada e as suas listas de favoritos, sem ter de reinstalar nada.`,
      ],
    },
    support: {
      title: 'Assistência',
      text: (minutes: string) =>
        `O nosso apoio ao cliente, 100% em francês, está disponível 7 dias por semana por WhatsApp e por e-mail: ajuda na instalação, transferência das aplicações, recuperação de códigos perdidos ou diagnóstico da ligação. Respondemos em menos de ${minutes} minutos, em média, incluindo à noite e aos fins de semana.`,
    },
    guarantee: {
      title: 'Garantia Satisfeito ou Reembolsado',
      quote: 'Experimente sem riscos — garantia satisfeito ou reembolsado se não ficar convencido.',
      continuity: (months: string) =>
        `Garantia & Acompanhamento Contínuo: acompanhamento personalizado e garantia total de continuidade ao longo dos ${months} meses da sua subscrição.`,
      how: 'Para acionar a garantia, contacte a nossa equipa por WhatsApp ou por e-mail, indicando o seu código ou identificador Atlas Pro.',
      rows: {
        window: { label: 'Prazo para a pedir', what: 'prazo para pedir o reembolso' },
        conditions: { label: 'Condições', what: 'condições da garantia satisfeito ou reembolsado' },
        amount: { label: 'Montante reembolsado', what: 'montante reembolsado (total ou proporcional)' },
        method: { label: 'Forma e prazo de reembolso', what: 'forma e prazo do reembolso' },
      },
    },
    withdrawal: {
      title: 'Direito de livre resolução',
      label: 'Direito de livre resolução',
      what: 'direito de livre resolução: prazo, exercício e caso de um código fornecido de imediato com o seu acordo',
    },
    disputes: {
      title: 'Reclamações e litígios',
      text: 'Em caso de dificuldade, contacte primeiro a nossa equipa por WhatsApp ou por e-mail: procuraremos consigo uma solução amigável.',
      rows: {
        mediator: { label: 'Entidade de resolução alternativa de litígios', what: 'entidade de resolução alternativa de litígios de consumo (nome e contactos)' },
        law: { label: 'Lei aplicável e foro competente', what: 'lei aplicável e foro competente' },
      },
    },
    changes: {
      title: 'Alteração dos termos',
      text: 'Os termos aplicáveis à sua encomenda são os que estiverem em vigor na data dessa encomenda.',
    },
  },
}
