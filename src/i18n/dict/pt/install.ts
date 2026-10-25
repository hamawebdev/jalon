// European Portuguese (pt-PT), home installation hub. Source: ../fr/install.ts. Owner: tr-pt.
// Inline markers ({wa}, {price}, {app:…}, **…**, `…`, [text](#apps)) are kept exactly as in the French.
import type { InstallCopy } from '../fr/install.ts'

export const install: InstallCopy = {
  badge: '✨ Guias visuais 2026 · Distribuidor autorizado Atlas Pro ONTV',
  title: 'Instalação Atlas Pro ONTV 2026: Guias Interativos Passo a Passo & Download do APK',
  subtitle: (minutes) =>
    `Selecione o aparelho em que pretende ver os seus programas e siga os passos simples. A maioria dos nossos subscritores fica operacional em menos de ${minutes} minutos.`,
  kpis: {
    fast: { value: (minutes) => `< ${minutes} min`, label: 'Instalação Rápida' },
    compat: { value: '100%', label: 'Compatível com Todos os Ecrãs' },
    support: { value: '7 dias · 24 h', label: 'Suporte Técnico Incluído' },
  },

  selector: {
    title: 'Escolha o seu aparelho',
    hint: 'O guia passo a passo do seu aparelho aparece logo abaixo.',
    listLabel: 'Aparelhos',
    change: 'Mudar de aparelho',
    current: 'O seu aparelho',
    devices: {
      smartTv: { name: 'Smart TV', detail: 'Samsung Tizen, LG webOS, Sony, Philips...' },
      firestick: { name: 'Amazon Firestick', detail: 'Fire TV Stick 4K / Max / Lite / Cube' },
      android: { name: 'Android', detail: 'Telemóvel, Tablet, Google TV, TV Box Xiaomi / Mecool' },
      apple: { name: 'iPhone / iPad / Apple TV', detail: 'iOS, iPadOS & tvOS' },
      windows: { name: 'Windows PC', detail: 'Aplicação oficial & Microsoft Store' },
      mac: { name: 'Mac', detail: 'macOS' },
      linux: { name: 'Linux', detail: 'Aplicação oficial & Leitores' },
      mag: { name: 'MAG Box & Formuler / Dreamlink', detail: 'MyTVOnline 2 & 3' },
      shield: { name: 'Nvidia Shield', detail: 'Android TV de Alto Desempenho' },
    },
  },

  stepLabel: (n) => `Passo ${n}`,

  guides: {
    smartTv: {
      kicker: 'Smart TV (Samsung Tizen & LG WebOS)',
      title: 'Como instalar o Atlas Pro ONTV numa TV Samsung & LG',
      blocks: [
        {
          kind: 'notice',
          tone: 'info',
          title: '💡 NOTA IMPORTANTE (TV SAMSUNG & LG vs ANDROID TV)',
          body: [
            'A aplicação nativa **Atlas Pro ONTV** não está disponível diretamente nas lojas oficiais da Samsung (Tizen) e da LG (WebOS). Os leitores de alto desempenho compatíveis com estes televisores (**IBO Player / IBO Player Pro**, **IBO Player Smarter**, **Hot Player**, **Bob Player**) são **aplicações pagas independentes (cerca de ~{price} / ano após {trial} dias de teste gratuito)**. Garantem um guia EPG instantâneo, uma estabilidade Full HD irrepreensível (4K no VOD) e a retoma da reprodução de filmes e séries no segundo exato em que parou. Embora as possa ativar sozinho, **recomendamos vivamente que deixe a nossa equipa técnica tratar da ativação completa da aplicação E da configuração da sua subscrição Atlas Pro em simultâneo**: basta enviar-nos o seu **MAC Address** e a sua **Device Key** por {wa} e a nossa equipa trata de tudo, do início ao fim!',
            '(Nota: nas TV Sony, TCL e Xiaomi com Android TV / Google TV, a aplicação oficial Atlas Pro é 100% gratuita através do Downloader.)',
          ],
        },
        {
          kind: 'notice',
          tone: 'warn',
          title: '⚠️ Aviso sobre o Smarters Pro em Smart TV',
          body: [
            'Desaconselhamos a utilização da versão antiga do IPTV Smarters Pro em TV Samsung e LG (provoca cortes, bloqueios e erros de autorização alheios ao nosso servidor). **Porquê preferir os leitores pagos (IBO Player, IBO Player Smarter, Bob Player, Hot Player)?** Oferecem **{trial} dias de teste gratuito**, uma estabilidade Full HD irrepreensível (4K no VOD), o carregamento instantâneo do guia EPG e a **retoma da reprodução dos seus filmes e séries no segundo exato em que parou**.',
          ],
        },
        {
          kind: 'steps',
          title: 'Samsung & LG: passos de instalação',
          steps: [
            { text: 'Ligue o televisor e abra a loja oficial (**Samsung Apps** ou **LG Content Store**).' },
            { text: 'Pesquise e instale o **IBO Player**, o **IBO Player Smarter**, o **Hot Player** ou o **Bob Player**.' },
            { text: 'Abra a aplicação para ver o seu **MAC Address** e a sua **Device Key**.' },
            {
              text: 'Envie uma fotografia do ecrã para o nosso {wa}: a nossa equipa ativa a aplicação e configura a sua **subscrição Atlas Pro ONTV** à distância em menos de 2 minutos!',
            },
          ],
        },
      ],
    },

    firestick: {
      kicker: 'Amazon Fire TV Stick (4K, 4K Max, Lite, Cube)',
      title: 'Como instalar o Atlas Pro ONTV no Amazon Fire TV Stick',
      blocks: [
        {
          kind: 'notice',
          tone: 'alert',
          title: '🚨 AVISO OFICIAL SOBRE O AMAZON FIRE TV STICK HD DE 2.ª GERAÇÃO (VEGA OS)',
          body: [
            'Recomendamos vivamente aos nossos clientes que **não comprem o modelo Amazon Fire TV Stick HD (2.ª geração)**. Este modelo recente funciona com o sistema fechado **Vega OS**, ao contrário das versões anteriores com Android / Fire OS:',
          ],
          points: [
            { mark: 'no', text: 'A aplicação **Downloader** não está disponível neste modelo.' },
            { mark: 'no', text: 'A instalação de aplicações externas ou de ficheiros **Atlas Pro ONTV APK** está bloqueada.' },
            {
              mark: 'yes',
              text: '**Solução recomendada:** opte por um **modelo Fire TV Stick 4K, 4K Max, Lite ou Cube** (com Fire OS) ou por uma box Android TV (Xiaomi, Mecool, Formuler) 100% compatível com o Downloader.',
            },
          ],
        },
        {
          kind: 'steps',
          title: 'Passos, códigos Downloader e ativação no Fire Stick',
          steps: [
            {
              title: 'Instalar o Downloader',
              text: 'No ecrã inicial da Fire TV, vá a Pesquisar (lupa), escreva **Downloader** e instale a aplicação oficial cor de laranja.',
            },
            {
              title: 'Ativar as Opções de Programador',
              text: 'Vá a **Definições > A Minha Fire TV > Acerca de** e clique **7 vezes seguidas, rapidamente,** no nome do seu Fire TV Stick até aparecer a mensagem « Agora é um programador ».',
            },
            {
              title: 'Permitir fontes desconhecidas',
              text: 'Em **Opções de programador > Instalar aplicações desconhecidas**, ative a autorização (**ON**) para o **Downloader**.',
            },
            {
              title: 'Introduzir o Código Downloader & Ativar consoante a versão',
              text: 'Abra o **Downloader**, introduza o código da versão oficial pretendida e ative o seu acesso:',
              appCodes: true,
              list: [
                '**Leitores Pagos (~{price}/ano · {trial} dias de teste)** · Bob Player ({pcode:bobPlayer}) · Hot Player ({pcode:hotPlayer}).',
              ],
            },
          ],
        },
      ],
    },

    android: {
      kicker: 'Android: Google TV, Chromecast, TV Sony / TCL / Philips, TV Box Xiaomi / Mecool, telemóveis & tablets',
      title: 'Como instalar o Atlas Pro ONTV no Chromecast & Android TV',
      blocks: [
        {
          kind: 'steps',
          steps: [
            {
              text: 'Abra a **Google Play Store** na sua Android TV, Chromecast com Google TV ou Box Android e instale gratuitamente a aplicação **Downloader**.',
            },
            {
              text: 'Permita as fontes desconhecidas para o **Downloader** em Definições > Segurança e restrições (depois de clicar 7 vezes em Número de compilação, em Acerca de, se o modo de programador estiver oculto).',
            },
            {
              text: 'Abra o **Downloader** e escreva o código da aplicação gratuita pretendida (**{app:ontv}** com Code Active, **{app:max}** com Username/Password, **{app:ibo}**, ou **{app:x9}** com Username/Password) ou clique diretamente nos nossos [botões de download do APK abaixo](#apps) no smartphone/tablet.',
              appCodes: true,
            },
          ],
        },
        {
          kind: 'notice',
          tone: 'tip',
          title: '📌 Nota Xtream / M3U & Assistência remota',
          body: [
            'Também pode utilizar as suas credenciais no formato **Xtream Codes** ou **M3U** em qualquer leitor. Se não quiser fazer a configuração sozinho, basta enviar os dados da sua aplicação por {wa} e a nossa equipa configura tudo à distância!',
          ],
        },
      ],
    },

    apple: {
      kicker: 'Apple (iPhone, iPad & Apple TV — iOS, iPadOS & tvOS)',
      title: 'Apple (iPhone, iPad & Apple TV) — Como instalar o Atlas Pro ONTV em iOS & tvOS',
      blocks: [
        {
          kind: 'notice',
          tone: 'info',
          title: '📌 Nota Importante (Disponibilidade em iOS)',
          body: [
            'A aplicação oficial **Atlas Pro** **NÃO está disponível em iOS nem em tvOS** (está disponível nativamente em Android, Windows PC, macOS e Linux). Para ver a sua **subscrição Atlas Pro ONTV** no iPhone, iPad ou Apple TV, **tem à sua disposição dois métodos simples**:',
          ],
        },
        {
          kind: 'options',
          items: [
            {
              label: 'Opção 1',
              tag: 'Gratuito',
              title: 'Leitor Gratuito (Smarters Pro IPTV / IPTV Smarters Pro / Smarters Player Lite)',
              text: 'Aplicação gratuita muito conhecida na App Store. Requer um **Link do Servidor (Server URL) + Nome de utilizador (Username) + Palavra-passe (Password)** no formato **Xtream Codes** (ou através de um link **M3U**). Basta contactar a nossa equipa por {wa} para obter gratuitamente os seus acessos Xtream / M3U, transferir a aplicação da App Store, introduzir os seus dados e desfrutar da sua subscrição!',
            },
            {
              label: 'Opção 2',
              tag: 'Recomendado',
              recommended: true,
              title: 'Leitores Pagos Recomendados (IBO Player, IBO Player Smarter, Hot Player, Bob Player)',
              text: 'Porque os recomendamos vivamente em vez do Smarters Pro? Por cerca de **~{price} / ano (após {trial} dias de teste gratuito)**, garantem zero cortes no iPhone/iPad/Apple TV, um guia EPG ultrarrápido e a **retoma da reprodução dos seus filmes e séries no segundo exato em que parou**. Transfira a aplicação da App Store e envie-nos o respetivo endereço MAC + Device Key por {wa}: a nossa equipa pode ativar diretamente a aplicação e configurar a sua subscrição Atlas Pro ao mesmo tempo!',
              playerLinks: 'ios',
            },
          ],
        },
      ],
    },

    desktop: {
      kicker: 'Como instalar o Atlas Pro em PC, Mac e Linux',
      title: 'Computadores Windows PC, Mac (macOS) & Linux — Instalação Oficial & Leitores',
      blocks: [
        {
          kind: 'options',
          items: [
            {
              label: 'Opção A',
              tag: 'Gratuito',
              recommended: true,
              title: 'Aplicações Oficiais Gratuitas Atlas Pro',
              text: 'Transfira diretamente as nossas versões oficiais dedicadas **Atlas Pro para Windows PC (.EXE)**, **macOS** ou **Linux** através dos botões de download abaixo, abra a aplicação e inicie sessão com o seu **Código Atlas Pro** (ou as suas credenciais).',
              desktopDownloads: true,
            },
            {
              label: 'Opção B',
              tag: 'Leitores',
              title: 'Leitores alternativos na Microsoft Store & Mac',
              list: [
                '**Gratuito (FREE): IPTV Smarters Pro / Expert** (versão para computador atualizada, fluida e gratuita, com as credenciais Xtream Codes fornecidas pelo nosso suporte).',
                '**Leitores Pagos (~{price} / ano · {trial} dias de teste gratuito): IBO Player / IBO Player Pro**, **IBO Player Smarter**, **Hot Player**, **Vormedia Sat**. (Sem recurso ao VLC nem ao BlueStacks.)',
              ],
              playerLinks: 'windows',
            },
          ],
        },
      ],
    },

    mag: {
      kicker: 'Formuler / Dreamlink (MyTVOnline 2 & 3) & MAG Box (Infomir)',
      title: 'Como instalar o Atlas Pro ONTV em Formuler, Dreamlink & MAG Box',
      blocks: [
        { kind: 'subheading', text: 'Formuler / Dreamlink (MyTVOnline 2 & 3)' },
        {
          kind: 'notice',
          tone: 'warn',
          title: '⚠️ Importante',
          body: [
            'Na Formuler e na Dreamlink, a ligação faz-se com as suas credenciais **Xtream Codes** (URL do portal + nome de utilizador + palavra-passe), e não através do endereço MAC.',
          ],
        },
        {
          kind: 'steps',
          steps: [
            { text: 'Abrir **o MyTVOnline 2 ou 3**.' },
            { text: '**Menu > Ligações > Adicionar Portal** (Add Portal).' },
            { text: 'Dar um nome ao portal (**Atlas Pro**).' },
            { text: 'Mudar « **Login Required** » para **ON**.' },
            { text: 'Introduzir o **URL do Portal**, o **Nome de utilizador** e a **Palavra-passe** fornecidos pela nossa equipa por {waShort}.' },
            { text: 'Clicar em **Connect**.' },
          ],
        },
        { kind: 'subheading', text: 'MAG Box (Infomir 254, 256, 322, 520...)' },
        {
          kind: 'steps',
          steps: [
            { text: 'Anotar o endereço MAC na parte de trás da box (`00:1A:79:XX:XX:XX`) e enviá-lo ao nosso suporte {wa}.' },
            { text: 'Receber o nosso link **Portal URL** ativado.' },
            { text: 'Ir a **Settings > System Settings > Servers > Portals**.' },
            { text: 'Escrever « Atlas Pro » em **Portal 1 Name** e o URL em **Portal 1 URL**.' },
            { text: 'Guardar (**OK**) e reiniciar.' },
          ],
        },
      ],
    },

    shield: {
      kicker: 'Nvidia Shield TV / Shield Pro',
      title: 'Como instalar o Atlas Pro ONTV na Nvidia Shield',
      blocks: [
        {
          kind: 'steps',
          steps: [
            { text: 'Abrir a **Google Play Store** na sua Nvidia Shield e instalar gratuitamente o **Downloader**.' },
            {
              text: 'Permitir as fontes desconhecidas para o Downloader em **Definições > Preferências do dispositivo > Segurança e restrições**.',
            },
            {
              text: 'Introduzir o código Downloader da nossa suite oficial gratuita ({app:ontv}, {app:max}, {app:ibo} ou {app:x9}) ou do IBO Player Pro ({pcode:iboPlayerPro}).',
              appCodes: true,
            },
            { text: 'Ativar o seu **Código Atlas Pro** e desfrutar da transmissão Full HD H.265 e do VOD em 4K.' },
          ],
        },
      ],
    },
  },

  desktop: {
    windows: 'Atlas Pro para Windows (.EXE)',
    mac: 'Atlas Pro para macOS',
    linux: 'Atlas Pro para Linux',
  },
  storeLink: {
    ios: (player) => `${player} na App Store`,
    windows: (player) => `${player} para Windows`,
  },

  apps: {
    badge: 'Aplicações oficiais gratuitas',
    title: 'Transferir o Atlas Pro ONTV APK: as 4 Aplicações Oficiais Gratuitas & os seus Códigos Downloader',
    subtitle:
      'Para Android, Google TV, TV Box e Fire TV Stick: escreva o código na aplicação Downloader ou transfira o APK diretamente do seu smartphone ou tablet.',
    free: 'Gratuito',
    status: {
      latest: 'Última versão oficial',
      new: 'Nova versão',
      previous: 'Versão anterior',
    },
    version: (version) => `Versão ${version}`,
    compatible: (versions) => `compatível ${versions}`,
    codeLabel: 'Código Downloader',
    download: (app) => `Transferir ${app} APK`,
    activationLabel: 'Modo de ativação',
    activation: {
      code: 'Code Active (Código Atlas Pro)',
      login: 'Nome de utilizador + Palavra-passe',
    },
    or: 'ou',
    notes: {
      ontv: 'Ativa-se diretamente com o seu Code Active, sem link nem nome de utilizador para introduzir.',
    },
    apkFree: (app) => `${app} APK (Gratuito)`,
    activationBy: 'Ativação por',
    copy: 'Copiar',
    copied: 'Copiado!',
    copyAria: (app, code) => `Copiar o código Downloader ${code} de ${app}`,
    redundancy: {
      title: '📌 Nota de Redundância Atlas Pro',
      text: 'Aconselhamos a manter as **4 versões oficiais** instaladas no seu aparelho Android ou no seu Fire TV Stick: se uma delas estiver em manutenção técnica, as outras versões assumem de imediato, sem qualquer interrupção.',
    },
  },

  questions: {
    title: 'Perguntas técnicas sobre a instalação',
    items: [
      {
        q: 'Introduzi as minhas credenciais, mas a aplicação mostra um erro (« erro de reprodução » ou « o Atlas Pro não consegue ligar-se ao servidor »). O que devo fazer?',
        a: 'Verifique antes de mais o **link do servidor (Server URL)**: tem obrigatoriamente de começar por **http — e não https**. Esta simples letra é a causa de erro mais frequente. Certifique-se também de que nenhum espaço invisível se introduziu ao copiar e colar e de que está a usar o método de ativação correto (**Code Active** no {app:ontv}, ou **Nome de utilizador + Palavra-passe** no {app:x9} e no Max v{ver:max}). **Continua bloqueado?** Envie-nos uma mensagem por {wa}: a nossa equipa verifica o seu **Código Atlas Pro** e configura o seu leitor à distância por si.',
      },
      {
        q: 'Que velocidade de Internet é necessária para uma transmissão fluida no Atlas Pro ONTV?',
        a: 'Uma ligação de **10 a 20 Mbps** é o mínimo necessário para um streaming fluido em Full HD (H.265). Recomendamos uma velocidade superior (**30 Mbps ou mais**) se quiser aproveitar ao máximo os conteúdos VOD em **Ultra HD 4K** ou se vários ecrãs utilizarem a mesma ligação à Internet em simultâneo em casa.',
      },
      {
        q: 'Tenho de utilizar uma VPN com a minha subscrição Atlas Pro?',
        a: '**Não, não é obrigatório** — os nossos acessos oficiais **Atlas Pro ONTV** integram ligações otimizadas que evitam os bloqueios dos operadores de Internet. Se mesmo assim utilizar uma VPN, **escolha obrigatoriamente um servidor situado no seu próprio país** (ou num país vizinho) para manter a velocidade máxima e evitar qualquer latência.',
      },
      {
        q: 'Porque preciso de um leitor pago (~{price} / ano) em alguns aparelhos?',
        a: 'Numa **Smart TV (Samsung / LG) ou num aparelho Apple (iPhone / Apple TV)**, os leitores pagos (**IBO Player, IBO Player Smarter, Bob Player, Hot Player** — cerca de **~{price} / ano após {trial} dias de teste gratuito**) oferecem um desempenho muito superior, funcionam sem qualquer bloqueio e memorizam o ponto onde parou nos seus filmes e séries. Em contrapartida, em **Android, Google TV, TV Box, Fire TV Stick e PC**, as nossas aplicações oficiais **Atlas Pro ONTV (v{ver:ontv}, Max v{ver:max}, IBO v{ver:ibo}, 9X)** funcionam na perfeição e são **100% gratuitas**.',
      },
    ],
  },

  help: {
    title: 'Ficou bloqueado num passo? Configuramos o seu aparelho consigo.',
    subtitle:
      'Envie uma mensagem à nossa equipa de assistência por WhatsApp: acompanhamo-lo passo a passo ou ativamos diretamente a sua subscrição Atlas Pro e o seu leitor à distância.',
    button: 'Obter ajuda por WhatsApp',
  },
}
