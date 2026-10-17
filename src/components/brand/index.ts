// Jalon brand kit (IDENTITY.md §5, §8). Import everything from '@/components/brand'.
export { Section, Container, NuitPanel, PlatePanel } from './Section'
export { Eyebrow, SectionHead, Kw, TextLink, TextA, Breadcrumb } from './Type'
export { Button, ButtonLink, ButtonA, CtaButton, WhatsAppButton } from './Button'
export {
  Tab,
  SavingChip,
  Tag,
  Chip,
  PaymentBadge,
  QualityStamp,
  Stars,
  RatingPill,
  StatusDot,
  Monogram,
  CartCount,
  IconTile,
} from './Labels'
export { Price, OldPrice, PaymentRow, TrustRow, GuaranteeRow, InfoRow, StatStrip } from './Price'
export {
  Card,
  CheckList,
  FeatureGrid,
  FeatureCard,
  IndexList,
  IndexItem,
  GenreRow,
  PlanCard,
  Testimonial,
  SupportCard,
  AppBox,
  RelatedCard,
} from './Cards'
export { Recap, OrderSummary } from './Recap'
export { FaqList, FaqItem, GuideAccordion, GuideTip, Code } from './Accordion'
export { Timeline } from './Timeline'
export { FormCard, Field, Input, Select, Textarea, Checkbox, Radio, RadioCard, Segmented, Notice } from './Form'
export { DeviceFrame, ChannelMosaic, Mire, AppMock, QualityLadder } from './Screens'
export { GuideGrid } from './GuideGrid'
export { NowStrip } from './NowStrip'
export { Graduations, Plaque } from './Wayfinding'
export { Carte } from './Carte'
export { Marker } from './Marker'
export { Pending } from './Pending'
// Launch mode (APPROVAL §2c, HANDOFF « Launch mode »): which markers show, and which units still make sense.
export { FactScope } from './FactScope'
export { PENDING_MODE, LAUNCH } from './mode'
export type { PendingMode } from './mode'
export { inScope, anyInScope, scoped, switchedOn, markerShown, slotShown } from './scope'
export type { FactDeps, FactValues, Scoped } from './scope'
export { Wordmark, Wordmark as Logo, LogoMark } from './Logo'
export { WhatsAppBubble, BuyBar } from './Chrome'
// Cookie consent (APPROVAL §2e, HANDOFF « Consentement »): the gate every tool mounts through, and the store. The
// banner is not exported here: the layout imports it from './Consent' and loads it only when a tool needs consent, so
// the chunk every page loads carries none of it (QA HC-08). Its texts' type is (types are erased).
export { ConsentGate } from './ConsentGate'
export type { ConsentTexts } from './Consent'
export {
  useConsent,
  useConsentRecord,
  openConsentSettings,
  hasConsentTools,
  CONSENT_STORAGE_KEY,
  CONSENT_MAX_AGE_MONTHS,
} from './consent-store'
export type { ConsentTool, ConsentRecord } from './consent-store'
export { Reveal } from './Reveal'
export { useReveal, useInView, enableMotionGate } from './motion'
export { BRAND, BRAND_UPPER, BRAND_DESCRIPTOR, BRAND_LOCKUP, BRAND_STATEMENT, pageTitle, pendingText, joinWords } from './identity'
export {
  SCOPE,
  fixedRootClass,
  zoneClass,
  containerClass,
  rhythmClass,
  typo,
  iconClass,
  markerClass,
  buttonVariants,
  buttonClass,
  buttonIconSize,
  linkClass,
  linkStandaloneClass,
  tapTargetClass,
  navLinkClass,
  headerClass,
  headerNavLinkClass,
  navCurrentClass,
  sideLinkClass,
  drawerClass,
  sideMenuClass,
  panelClosedClass,
  overlayClass,
  overlayClosedClass,
  cardClass,
  panelInnerBottomClass,
  tileClass,
  checkIconClass,
  stepDiscClass,
  tabClass,
  savingChipVariants,
  neutralTagClass,
  chipVariants,
  chipIconClass,
  paymentBadgeClass,
  qualityStampClass,
  statusDotClass,
  cartCountClass,
  trustRowClass,
  trustItemClass,
  guaranteeRowClass,
  infoRowClass,
  pendingClass,
  WHATSAPP_FACT,
  PAYMENT_METHODS_FACT,
  whatsappPendingClass,
  fieldClass,
  choiceRowClass,
  segmentedClass,
  noticeClass,
  toastClass,
  MOSAIC_FILLS,
  MOSAIC_ICONS,
  SPORT_ICONS,
  initials,
  revealDelay,
} from './recipes'
export type * from './types'
