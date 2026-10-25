// German copy, Contact page. Translation of ../fr/contact.ts (same keys). Owner: tr-de.
import type { Dict } from '../types.ts'

export const contact: Dict['contact'] = {
  badge: '✦ KONTAKT & SUPPORT 7 TAGE DIE WOCHE',
  title: 'Kontaktieren Sie Ihren offiziellen Atlas Pro Vertriebspartner',
  subtitle:
    'Eine Frage vor der Bestellung, ein Code zum Aktivieren oder Verlängern, Hilfe bei der Installation: Unser Team antwortet Ihnen auf Französisch, 7 Tage die Woche.',

  whatsapp: {
    badge: 'Bevorzugter Kanal',
    title: 'WhatsApp',
    text: 'Bestellung, Aktivierung, Verlängerung Ihres Atlas Pro Codes und technischer Support: Hier klären Sie alles direkt mit unserem Team.',
    response: (minutes: number) => `Antwort < ${minutes} Min.`,
    days: '7 Tage/Woche',
    french: 'Auf Französisch',
    button: 'Auf WhatsApp schreiben',
    tip: 'Damit es schneller geht, nennen Sie Ihr Gerät und – bei einer Verlängerung – Ihren aktuellen Code bzw. Ihre aktuelle Kennung.',
  },

  email: {
    title: 'E-Mail',
    text: 'Für ausführliche Anfragen und die Betreuung Ihres Abonnements.',
    pending: 'E-Mail-Adresse des Supports',
  },

  telegram: {
    title: 'Telegram',
    text: 'Technischer Support und neue Versionen der offiziellen Apps.',
    pending: 'Telegram-Link',
    open: 'Telegram öffnen',
  },

  help: {
    title: 'Finden Sie Ihre Antwort mit einem Klick',
    install: {
      title: 'Installationsanleitungen',
      text: 'Smart TV, Fire TV Stick, Android, iPhone, PC: die Schritt-für-Schritt-Anleitung für jedes Gerät.',
    },
    faq: {
      title: 'Häufige Fragen',
      text: 'Bestellung, Aktivierung, Kompatibilität, Verlängerung: die Antworten auf die meistgestellten Fragen.',
    },
    reseller: {
      title: 'Wiederverkäufer werden',
      text: 'Sie möchten Atlas Pro weiterverkaufen? Entdecken Sie unsere Code-Panels.',
    },
  },
}
