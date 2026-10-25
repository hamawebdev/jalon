// European Portuguese (pt-PT), Contact page. Source: ../fr/contact.ts. Owner: tr-pt.
import type { Dict } from '../types.ts'

export const contact: Dict['contact'] = {
  badge: '✦ CONTACTO & SUPORTE 7 DIAS POR SEMANA',
  title: 'Contacte o seu distribuidor oficial Atlas Pro',
  subtitle:
    'Uma pergunta antes de encomendar, um código para ativar ou renovar, ajuda com a instalação: a nossa equipa responde-lhe em francês, 7 dias por semana.',

  whatsapp: {
    badge: 'Canal prioritário',
    title: 'WhatsApp',
    text: 'Encomenda, ativação, renovação do seu Código Atlas Pro e assistência técnica: resolve tudo aqui, diretamente com a nossa equipa.',
    response: (minutes: number) => `Resposta < ${minutes} min`,
    days: '7 dias por semana',
    french: 'Em francês',
    button: 'Escrever por WhatsApp',
    tip: 'Para ser mais rápido, indique o seu aparelho e, no caso de uma renovação, o seu código ou identificador atual.',
  },

  email: {
    title: 'E-mail',
    text: 'Para pedidos detalhados e o acompanhamento da sua subscrição.',
    pending: 'endereço de e-mail do suporte',
  },

  telegram: {
    title: 'Telegram',
    text: 'Assistência técnica e novas versões das aplicações oficiais.',
    pending: 'link do Telegram',
    open: 'Abrir o Telegram',
  },

  help: {
    title: 'Encontre a sua resposta num clique',
    install: {
      title: 'Guias de Instalação',
      text: 'Smart TV, Fire TV Stick, Android, iPhone, PC: o passo a passo, aparelho a aparelho.',
    },
    faq: {
      title: 'Perguntas Frequentes',
      text: 'Encomenda, ativação, compatibilidade, renovação: as respostas às perguntas mais colocadas.',
    },
    reseller: {
      title: 'Tornar-se Revendedor',
      text: 'Quer revender o Atlas Pro? Descubra os nossos painéis de códigos.',
    },
  },
}
