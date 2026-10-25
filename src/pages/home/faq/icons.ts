// The brief's emoji of each question, as a lucide icon (same meaning).
import {
  Apple,
  Cast,
  CircleHelp,
  CreditCard,
  Download,
  Earth,
  Flame,
  Globe,
  Handshake,
  KeyRound,
  Link2,
  MailOpen,
  Monitor,
  RefreshCw,
  Rocket,
  Search,
  ShoppingCart,
  Smartphone,
  TriangleAlert,
  Tv,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import type { FaqId } from '@/i18n/dict/fr/faq'

export const FAQ_ICONS: Record<FaqId, LucideIcon> = {
  order: ShoppingCart, // 🛒
  delivery: MailOpen, // 📩
  email: CircleHelp, // ❓
  otherApps: Smartphone, // 📱
  renew: RefreshCw, // 🔄
  keepFavorites: KeyRound, // 🔑
  download: Download, // (the brief's emoji is garbled)
  activation: Rocket, // 🚀
  replace: Search, // 🔍
  countries: Earth, // 🌍
  screens: Monitor, // 🖥️
  oldTv: Tv, // 📺
  trust: Handshake, // 🤝
  samsungLg: CreditCard, // 💳
  content: Globe, // 🌐
  connect: Wrench, // 🛠️
  apple: Apple, // 🍎
  smarters: TriangleAlert, // ⚠️
  serverLink: Link2, // 🔗
  enterCode: KeyRound, // 🔑
  changeCode: RefreshCw, // 🔄
  installTv: Tv, // 📺
  fireTv: Flame, // 🔥
  cast: Cast, // 📡
}
