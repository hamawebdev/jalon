// European Portuguese (pt-PT), home FAQ. Source: ../fr/faq.ts. Owner: tr-pt.
// Same 24 items, same ids, same order, same block shapes. Numbers, prices and versions come in through `v`.
import type { Dict } from '../types.ts'
import type { FaqInline, FaqItem, FaqWa } from '../fr/faq.ts'

const b = (text: string): FaqInline => ({ b: text })
const wa = (kind: FaqWa, number = false, text?: string): FaqInline => ({ wa: kind, number, text })

const items: FaqItem[] = [
  {
    id: 'order',
    q: () => 'Como encomendar uma subscrição Atlas Pro ONTV no nosso portal oficial?',
    a: (v) => [
      {
        p: [
          'Clique no botão « Subscrever agora » na nossa ',
          { to: 'pricing', text: 'tabela de preços' },
          ` (Premium ${v.screens.premium} Écran por ${v.price.premium}, Duo ${v.screens.duo} Écrans por ${v.price.duo} ou Famille ${v.screens.famille} Écrans por ${v.price.famille}): abre-se diretamente uma conversa pré-preenchida com a nossa equipa no `,
          wa('activate', true),
          ' para uma validação e uma ativação imediatas.',
        ],
      },
    ],
  },
  {
    id: 'delivery',
    q: () => 'Em quanto tempo vou receber o meu Código Atlas Pro e as minhas credenciais?',
    a: () => [
      {
        p: [
          'Durante o nosso horário de funcionamento, o envio do seu ',
          b('Código Atlas Pro'),
          ' oficial (bem como dos seus acessos Xtream / M3U) por WhatsApp e por e-mail, após a validação do pagamento, é quase imediato (geralmente em menos de 3 a 15 minutos).',
        ],
      },
    ],
  },
  {
    id: 'email',
    q: () => 'Não recebi o e-mail dentro do prazo indicado. Devo preocupar-me?',
    a: () => [
      {
        p: [
          'Não, fique descansado. Os nossos envios são assegurados 7 dias por semana. Se não encontrar nada na pasta de correio não solicitado (spam), basta escrever à nossa equipa por ',
          wa('contact', true),
          ': um consultor envia-lhe de imediato o seu Código Atlas Pro.',
        ],
      },
    ],
  },
  {
    id: 'otherApps',
    q: () => 'Posso utilizar a minha subscrição Atlas Pro ONTV noutras aplicações IPTV?',
    a: (v) => [
      {
        p: [
          `Sim, sem dúvida! Além das nossas ${v.appCount} aplicações oficiais gratuitas (`,
          b(`Atlas Pro ONTV ${v.ontv}`),
          ', ',
          b(`Atlas Pro Max v${v.max}`),
          ', ',
          b(`Atlas Pro IBO v${v.ibo}`),
          ', ',
          b('Atlas Pro 9X'),
          '), recomendamos excelentes leitores pagos como o IBO Player, o IBO Player Smarter, o Hot Player ou o Bob Player para Smart TV Samsung/LG e Apple, ou leitores gratuitos como o IPTV Smarters Pro (com credenciais Xtream ou M3U).',
        ],
      },
    ],
  },
  {
    id: 'renew',
    q: () => 'Como renovar o meu Código Atlas Pro atual?',
    a: (v) => [
      {
        p: [
          'Clique no botão ',
          { to: 'renewal', text: '« Renovar aqui (Introduza o seu Código Atlas Pro) »' },
          ' ou contacte-nos diretamente por ',
          wa('renewal'),
          ` indicando o seu código ou identificador atual. Assim que o seu pagamento (PayPal ou SEPA) for validado, a sua subscrição é prolongada por ${v.months} meses em poucos minutos.`,
        ],
      },
    ],
  },
  {
    id: 'keepFavorites',
    q: () => 'Posso renovar mantendo os meus favoritos e a minha aplicação atual?',
    a: () => [
      {
        p: [
          'Sim! Mantém a aplicação já instalada e as suas listas de favoritos, sem precisar de reinstalar tudo.',
        ],
      },
    ],
  },
  {
    id: 'download',
    q: (v) => `Como transferir a aplicação oficial Atlas Pro ONTV ${v.ontv} APK e o Atlas Pro Max v${v.max}?`,
    a: () => [
      {
        p: [
          'Vá à nossa secção ',
          { to: 'install', text: '« Guias de Instalação & Transferências »' },
          ', logo acima: clique diretamente no botão violeta de download do APK da versão pretendida ou introduza o respetivo Código Downloader oficial na aplicação Downloader da sua TV/Box/Firestick.',
        ],
      },
    ],
  },
  {
    id: 'activation',
    q: (v) =>
      `Qual é a diferença de ativação entre o Atlas Pro ONTV ${v.ontv}, o Atlas Pro Max v${v.max}, o IBO v${v.ibo} e o 9X?`,
    a: (v) => [
      {
        ul: [
          [b(`Atlas Pro ONTV ${v.ontvLine} (v${v.ontv}):`), ' Ativa-se apenas com o seu Code Active (Código Atlas Pro).'],
          [
            b(`Atlas Pro Max (Versão ${v.max}):`),
            ' Ativa-se, à sua escolha, com o seu Code Active OU com Nome de utilizador (Username) + Palavra-passe (Password).',
          ],
          [b(`Atlas Pro IBO (Versão ${v.ibo}):`), ' Ativa-se com o seu Code Active.'],
          [b('Atlas Pro 9X:'), ' Ativa-se com Nome de utilizador (Username) + Palavra-passe (Password).'],
        ],
      },
      {
        note: [
          b('Atenção:'),
          ' não compre o Fire TV Stick HD de 2.ª geração com o sistema fechado Vega OS, porque bloqueia a aplicação Downloader.',
        ],
      },
    ],
  },
  {
    id: 'replace',
    q: () => 'O que substitui o Atlas Pro ON TV em 2026?',
    a: (v) => [
      {
        p: [
          `Nada substitui o original: em 2026, o Atlas Pro ONTV reinventou-se com a sua própria suite oficial de nova geração (Atlas Pro ONTV v${v.ontv}, Atlas Pro Max v${v.max}, Atlas Pro IBO v${v.ibo} e Atlas Pro 9X), impulsionada por uma nova arquitetura de servidores europeia anticortes com ${v.uptime}% de disponibilidade.`,
        ],
      },
    ],
  },
  {
    id: 'countries',
    q: () =>
      'A subscrição Atlas Pro ONTV funciona em França, na Bélgica, na Suíça, no Canadá e no estrangeiro?',
    a: () => [
      {
        p: [
          'Sim, o nosso serviço funciona em todo o mundo, desde que disponha de uma ligação à Internet estável (França, Bélgica, Suíça, Canadá, Europa, EUA, Norte de África, etc.), sem necessidade de VPN.',
        ],
      },
    ],
  },
  {
    id: 'screens',
    q: () => 'Posso utilizar a minha subscrição em vários ecrãs ao mesmo tempo?',
    a: (v) => [
      {
        p: [
          `O plano Premium (${v.price.premium}) inclui ${v.screens.premium} ecrã ativo. Se quiser ver os seus programas em vários ecrãs em simultâneo, em família, opte diretamente pelo nosso `,
          { to: 'pricing', text: `Plano Duo ${v.screens.duo} Écrans` },
          ` (${v.price.duo} / ${v.months} meses) ou pelo nosso `,
          { to: 'pricing', text: `Plano Famille ${v.screens.famille} Écrans` },
          ` (${v.price.famille} / ${v.months} meses), que lhe entregam ${v.screens.duo} ou ${v.screens.famille} códigos oficiais independentes!`,
        ],
      },
    ],
  },
  {
    id: 'oldTv',
    q: () => 'Tenho um televisor antigo (não Smart). Que solução propõem?',
    a: () => [
      {
        p: [
          'Basta ligar uma box Android TV certificada (Xiaomi Mi Box, Mecool, Formuler) ou uma pen Amazon Fire TV Stick 4K / 4K Max (com Fire OS) à porta HDMI do seu televisor para o transformar numa Smart TV ultrarrápida, compatível com todas as nossas aplicações gratuitas.',
        ],
      },
    ],
  },
  {
    id: 'trust',
    q: () => 'Porquê confiar no nosso portal oficial enquanto distribuidor autorizado?',
    a: (v) => [
      {
        p: [
          `Somos o portal autorizado de referência em França e na Europa, com mais de ${v.customers} clientes satisfeitos, códigos 100% oficiais garantidos durante ${v.months} meses, nenhum pagamento por cartão bancário no site (pagamento seguro por PayPal ou SEPA), uma garantia satisfeito ou reembolsado e um suporte técnico humano que responde em menos de ${v.supportMinutes} minutos por `,
          wa('contact'),
          '.',
        ],
      },
    ],
  },
  {
    id: 'samsungLg',
    q: (v) => `Porque é que a aplicação na minha TV Samsung ou LG é paga (~${v.playerPrice}) e como a ativo?`,
    a: (v) => [
      {
        p: [
          `Como a aplicação oficial Atlas Pro não está presente nas lojas fechadas da Samsung e da LG, é necessário utilizar um leitor parceiro (IBO Player, IBO Player Smarter, Hot Player, Bob Player), que custa cerca de ${v.playerPrice} / ano (após ${v.trialDays} dias de teste gratuito). Estes leitores oferecem uma estabilidade irrepreensível, um EPG instantâneo e a retoma da reprodução VOD no segundo exato.`,
        ],
      },
      {
        p: [
          'Para lhe facilitar a vida, a nossa equipa pode ativar diretamente esse leitor por si e configurar nele a sua subscrição Atlas Pro ao mesmo tempo: basta enviar-nos o seu endereço MAC e a Device Key por ',
          wa('help', true),
          '!',
        ],
      },
    ],
  },
  {
    id: 'content',
    q: () => 'Que conteúdos e canais estão incluídos na subscrição Atlas Pro 2026?',
    a: (v) => [
      {
        p: [
          `A sua subscrição inclui +${v.channels} canais em direto (França, Europa, Internacional, incluindo +${v.sportsChannels} canais desportivos premium em Full HD H.265), +${v.films} filmes e +${v.series} séries (${v.episodes} episódios) em 4K e Full HD, atualizados diariamente, bem como o Replay de ${v.replayDays} dias em +${v.replayChannels} canais.`,
        ],
      },
    ],
  },
  {
    id: 'connect',
    q: () =>
      'Como resolver o problema « o Atlas Pro não consegue ligar-se ao servidor », « erro de reprodução no Atlas Pro ON TV » ou « porque é que o Atlas Pro TV deixou de funcionar »?',
    a: (v) => [
      {
        cards: [
          [
            b('Caso N.º 1 — Na aplicação oficial Atlas Pro (Android / TV Box):'),
            ' As mensagens « o Atlas Pro não consegue ligar-se ao servidor » ou « erro de reprodução » surgem geralmente quando se utiliza uma versão antiga da aplicação, perante um erro temporário ou uma incompatibilidade com uma versão do Android demasiado antiga (as nossas aplicações estão otimizadas para televisores Google TV, smartphones e TV Box com uma versão recente do Android). ',
            b('Solução:'),
            ` Experimente introduzir novamente os seus dados, limpe a cache da aplicação nas definições do seu aparelho e volte a iniciar sessão, ou instale a última atualização oficial (Atlas Pro ONTV ${v.ontv} ou Atlas Pro Max v${v.max}).`,
          ],
          [
            b('Caso N.º 2 — Mensagem « A playlist não funciona » no IBO Player, Hot Player, Bob Player ou IBO Smarter:'),
            ' Nestes leitores, este erro indica, na maioria dos casos, que o link do servidor (URL) partilhado precisa de ser atualizado. Basta então alterar o link ou atualizar os dados do servidor. ',
            b('Solução imediata:'),
            ' Basta contactar a nossa equipa de suporte por ',
            wa('contact', true),
            '; os nossos técnicos atualizam o seu link e repõem a sua playlist à distância em poucos segundos!',
          ],
        ],
      },
    ],
  },
  {
    id: 'apple',
    q: () => 'Como funciona o Atlas Pro no iPhone, iPad ou Apple TV (Gratuito vs Pago)?',
    a: (v) => [
      {
        p: [
          'Como a aplicação nativa Atlas Pro (e o Atlas Pro Prime) não está disponível em iOS/tvOS, tem 2 opções na App Store:',
        ],
      },
      {
        ol: [
          [
            b('Gratuito:'),
            ' Transfira o Smarters Pro IPTV (Smarters Player Lite) e peça à nossa equipa, por ',
            wa('help'),
            ', os seus acessos Xtream (URL + Username + Password) ou M3U.',
          ],
          [
            b(`Pago, recomendado (~${v.playerPrice} / ano):`),
            ' Transfira o IBO Player, o Hot Player, o IBO Player Smarter ou o Bob Player para uma fluidez máxima e a retoma da reprodução VOD.',
          ],
        ],
      },
    ],
  },
  {
    id: 'smarters',
    q: () =>
      'INFO para Utilizadores LG & SAMSUNG: a aplicação Smarters mostra o erro « Failed to authorize ». O que fazer?',
    a: () => [
      {
        p: [
          'A edição antiga do Smarters em TV Samsung e LG apresenta frequentemente erros (« Failed to authorize ») alheios aos nossos servidores. Transfira a última atualização do Smarters Pro na loja da sua TV ou mude para o IBO Player / Hot Player / Bob Player com a ajuda da nossa equipa por ',
          wa('help', true),
          ', para uma estabilidade definitiva.',
        ],
      },
    ],
  },
  {
    id: 'serverLink',
    q: () => 'O link do servidor ou o meu código não funciona quando introduzo os meus dados. Porquê?',
    a: () => [
      {
        p: [
          'Certifique-se, antes de mais, de que o URL começa por ',
          { code: 'http://' },
          ' (sem « s »). Para garantir a máxima segurança e estabilidade em França e na Europa, atualizamos regularmente as nossas ligações de servidor privadas. Basta contactar o nosso suporte por ',
          wa('help', true),
          ' para receber de imediato os seus parâmetros atualizados ou deixar a nossa equipa configurar o seu ecrã.',
        ],
      },
    ],
  },
  {
    id: 'enterCode',
    q: () => 'Como introduzir o código Atlas Pro e onde encontrar o meu identificador Atlas Pro?',
    a: (v) => [
      {
        p: [
          'Recebe o seu Código Atlas Pro e o seu identificador Atlas Pro diretamente por WhatsApp e por e-mail assim que a sua encomenda é validada no nosso portal oficial.',
        ],
      },
      {
        p: [
          b('Como introduzir o código Atlas Pro?'),
          ` Basta abrir a aplicação Atlas Pro ONTV ${v.ontv} (ou IBO v${v.ibo}), introduzir o código no campo próprio (« Code Active ») e confirmar. Nas versões Atlas Pro Max v${v.max} ou Atlas Pro 9X, pode iniciar sessão diretamente com o seu nome de utilizador (Username) e a sua palavra-passe.`,
        ],
      },
    ],
  },
  {
    id: 'changeCode',
    q: () => 'Como mudar o código no Atlas Pro ONTV?',
    a: () => [
      {
        p: [
          'Para mudar o código no Atlas Pro ONTV (por exemplo, numa nova subscrição ou numa mudança de plano), vá ao ecrã inicial da aplicação e clique em ',
          b('Terminar sessão / Mudar de utilizador'),
          ', ou aceda às definições do seu aparelho Android (',
          b('Aplicações > Atlas Pro ONTV > Limpar dados e cache'),
          '). Depois, abra novamente a aplicação e introduza o seu novo Código Atlas Pro.',
        ],
      },
    ],
  },
  {
    id: 'installTv',
    q: () => 'Como instalar o Atlas Pro na TV (Samsung, LG, TCL, Sony) e como pôr o Atlas Pro na TV?',
    a: (v) => [
      {
        p: [
          'Quer saber como pôr o Atlas Pro na TV ou como instalar o Atlas Pro na TV? O método depende da marca do seu televisor:',
        ],
      },
      {
        ul: [
          [
            b('Como instalar o Atlas Pro numa TV TCL, Sony, Philips ou Xiaomi (Android TV / Google TV):'),
            ' Instale a aplicação gratuita Downloader a partir da Google Play Store e, depois, introduza ',
            { to: 'apps', text: 'o nosso código Downloader' },
            ` para transferir gratuitamente o Atlas Pro ONTV ${v.ontv} APK.`,
          ],
          [
            b('Como instalar o Atlas Pro numa TV Samsung e como instalar o Atlas Pro ONTV numa TV LG:'),
            ' Abra a loja oficial do seu televisor, instale o IBO Player, o Hot Player, o Bob Player ou o IBO Smarter Player e envie o seu endereço MAC e a Device Key à nossa equipa por ',
            wa('help', true),
            ', que ativa o seu ecrã à distância em 2 minutos.',
          ],
        ],
      },
    ],
  },
  {
    id: 'fireTv',
    q: () => 'Como instalar o Atlas Pro na Fire TV e como instalar o Atlas Pro ONTV no Chromecast e no iPad?',
    a: (v) => [
      {
        ul: [
          [
            b('Como instalar o Atlas Pro na Fire TV e como instalar o Atlas Pro ONTV no Chromecast:'),
            ' Transfira a aplicação Downloader para a sua pen Amazon Fire TV Stick (4K, Max, Lite) ou para o seu Chromecast com Google TV, permita as fontes desconhecidas e introduza ',
            { to: 'apps', text: 'o código de transferência' },
            ` da nossa suite gratuita (Atlas Pro ONTV ${v.ontv}, Max v${v.max}, IBO v${v.ibo} ou 9X).`,
          ],
          [
            b('Como instalar o Atlas Pro no iPad e no iPhone:'),
            ' Vá à App Store, transfira um leitor gratuito (Smarters Pro IPTV) ou um leitor de alto desempenho (IBO Player, Hot Player, Bob Player) e contacte o nosso ',
            wa('help', false, 'suporte WhatsApp'),
            ' para receber as suas credenciais Xtream / M3U ou ativar o seu aparelho.',
          ],
        ],
      },
    ],
  },
  {
    id: 'cast',
    q: () => 'Como transmitir (fazer cast) o Atlas Pro ONTV para o meu televisor?',
    a: () => [
      {
        p: [
          'Para transmitir o Atlas Pro ONTV do seu smartphone ou tablet para o televisor, certifique-se de que os dois aparelhos estão ligados à mesma rede Wi-Fi e utilize a função Transmitir / Espelhar ecrã (Chromecast ou AirPlay). No entanto, para uma fluidez ideal em Full HD H.265 e 4K sem latência, recomendamos que instale diretamente a aplicação na sua Smart TV, Fire TV Stick, Chromecast com Google TV ou Box Android.',
        ],
      },
    ],
  },
]

export const faq: Dict['faq'] = {
  badge: 'AJUDA, SUPORTE & FAQ OFICIAL',
  title: 'As Suas Perguntas Frequentes – ATLAS PRO ONTV',
  titleHighlight: 'ATLAS PRO ONTV',
  subtitle:
    'Tudo o que precisa de saber antes, durante e depois da encomenda da sua subscrição Atlas Pro ONTV no nosso portal oficial.',
  help: {
    title: 'Não encontra a sua resposta?',
    text: (minutes: string) =>
      `O nosso suporte técnico humano responde-lhe em menos de ${minutes} minutos por WhatsApp, 7 dias por semana.`,
    button: 'Escrever ao suporte WhatsApp',
  },
  whatsapp: 'WhatsApp',
  items,
}
