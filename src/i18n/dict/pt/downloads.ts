// European Portuguese (pt-PT), Transferir page: official app suite and apps & players hub by system.
// Source: ../fr/downloads.ts. Owner: tr-pt.
import type { Dict } from '../types.ts'

export const downloads: Dict['downloads'] = {
  suite: {
    badge: 'APLICAÇÃO OFICIAL',
    title: {
      ontv: 'ATLAS PRO ONTV',
      and: '&',
      max: 'MAX',
      maxVersion: (version: string) => `V${version}`,
    },
    description:
      'Desfrute de uma experiência fluida em todos os seus aparelhos com a nossa suite de aplicações oficiais, compatível com smartphones, tablets, televisores e computadores.',
    versions: {
      label: 'Edições oficiais e secundárias Atlas Pro',
      mainTitle: 'Edições Oficiais Principais (Últimas Versões)',
      secondaryTitle: 'Edições Secundárias Disponíveis',
      version: (version: string) => `Versão ${version}`,
      alsoVersion: (version: string) => `versão ${version}`,
      short: (version: string) => `v${version}`,
      status: {
        latest: 'Última versão oficial',
        new: 'Nova versão',
        previous: 'Versão anterior',
      },
    },
    noteLabel: 'Nota de compatibilidade:',
    note: 'A aplicação oficial Atlas Pro está disponível nos aparelhos Android, nos televisores Google TV recentes e em todas as TV Box com Android (Formuler, Xiaomi, Mecool, etc. — recomenda-se uma versão recente do Android para um desempenho ideal). Estão também disponíveis versões oficiais dedicadas para computadores com Windows, macOS e Linux.',
    keyPoints: ['Zapping ultrarrápido', 'Interface intuitiva', 'EPG integrado'],
    compatLabel: 'Aparelhos compatíveis',
    compat: ['Smart TV', 'Android & TV Box', 'Fire Stick', 'iOS', 'Windows / macOS / Linux', 'Multiecrã'],
    cta: 'Ver as transferências',
    media: {
      label: 'Pré-visualização da interface das aplicações oficiais Atlas Pro',
      tabs: ['Em direto', 'Filmes', 'Séries', 'Replay'],
      epg: 'EPG',
      now: 'Agora',
      next: 'A seguir',
    },
  },

  hub: {
    badge: 'TRANSFERÊNCIAS · APLICAÇÕES & LEITORES',
    title: 'Transferir o Atlas Pro ONTV: Centro Completo de Aplicações & Leitores por Sistema',
    subtitle:
      'Escolha o seu sistema: Android, iOS & Apple ou Windows PC & Mac. Em Android, Google TV, TV Box, Fire TV Stick e PC, as nossas aplicações oficiais Atlas Pro ONTV são 100% gratuitas.',
    navLabel: 'Escolher o seu sistema',
    count: (n: number) => (n > 1 ? `${n} aplicações` : `${n} aplicação`),
    groups: {
      android: {
        nav: 'Android',
        title: 'Android · Fire Stick · Google TV · Box Android',
        intro:
          'Atlas Pro ONTV APK e toda a suite oficial: introduza o Código Downloader na aplicação Downloader do seu Fire TV Stick, Google TV ou Box Android, ou transfira diretamente o ficheiro APK. Depois, ative o seu Código Atlas Pro.',
        officialTitle: 'Aplicações oficiais Atlas Pro (Gratuitas)',
        partnersTitle: 'Leitores parceiros em Android & Fire Stick',
      },
      apple: {
        nav: 'iOS & Apple',
        title: 'iOS & Apple (iPhone · iPad · Apple TV)',
        intro:
          'A aplicação oficial Atlas Pro não está disponível em iOS: transfira um dos nossos leitores parceiros da App Store e envie-nos o respetivo endereço MAC + Device Key por WhatsApp. A nossa equipa pode ativar diretamente a aplicação e configurar a sua subscrição Atlas Pro ao mesmo tempo!',
      },
      computers: {
        nav: 'Windows PC & Mac',
        title: 'Windows PC & Mac (macOS) & Linux',
        intro:
          'Transfira diretamente as nossas versões oficiais dedicadas Atlas Pro para Windows PC (.EXE), macOS ou Linux, abra a aplicação e inicie sessão com o seu Código Atlas Pro (ou as suas credenciais).',
        officialTitle: 'Aplicações oficiais Atlas Pro (Gratuitas)',
        partnersTitle: 'Leitores parceiros (Windows PC)',
      },
    },
    playersPrice: (price: string, days: number) => `Leitores Pagos (~${price} / ano · ${days} dias de teste gratuito)`,
    card: {
      free: 'Gratuito',
      codeLabel: 'Código Downloader',
      copy: 'Copiar',
      copied: 'Copiado!',
      copyAria: (code: string) => `Copiar o Código Downloader ${code}`,
      download: (name: string) => `Transferir ${name} agora`,
      activationLabel: 'Ativação:',
      activation: { code: 'Código Atlas Pro', login: 'Nome de utilizador + palavra-passe' },
      or: 'ou',
      systems: {
        android: 'Android / Google TV / Fire Stick',
        androidOnly: 'Android',
        ios: 'iOS / App Store',
        windows: 'Windows PC',
        mac: 'macOS',
        linux: 'Linux',
      },
      buttonSystems: { ios: 'iOS', windows: 'Windows', mac: 'macOS', linux: 'Linux' },
      withSystem: (name: string, system: string) => `${name} (${system})`,
      windowsRequirement: 'Windows x64 (10+)',
    },
    partnerNames: { iboPlayerPro: 'IBO Player Pro', hotPlayer: 'Hot Player', bobPlayer: 'Bob Player' },
  },

  help: {
    title: 'Ficou bloqueado num passo? Configuramos o seu aparelho consigo.',
    subtitle:
      'Envie uma mensagem à nossa equipa de assistência por WhatsApp: acompanhamo-lo passo a passo ou ativamos diretamente a sua subscrição Atlas Pro e o seu leitor à distância.',
    whatsapp: 'Obter ajuda por WhatsApp',
    guides: 'Ver os guias de instalação',
    shopLead: 'Ainda não é subscritor?',
    shop: 'Escolher o meu plano na Loja',
  },
}
