// Device families of /applications/ (GLOSSARY §3): order, generic pictograms (no third-party marks), the
// directory text of each group and the app shown for it. Facts come from src/lib/facts.ts.
import { markerShown } from '@/components/brand'
import { DEVICE_FAMILIES, FACTS, present, type DeviceFamily, type ThirdPartyApp } from '@/lib/facts'

/** Generic Tabler pictogram per family: devices only, never a brand mark. */
export const FAMILY_ICON: Record<DeviceFamily, string> = {
  tv: 'ti-device-tv',
  box: 'ti-device-tv-old',
  android: 'ti-device-mobile',
  apple: 'ti-device-tablet',
  ordinateur: 'ti-device-desktop',
  recepteur: 'ti-satellite',
  console: 'ti-device-gamepad-2',
}

/** Group heading of the directory (the console group covers « other devices » too). */
export const FAMILY_GROUP_TITLE: Record<DeviceFamily, string> = {
  tv: 'Télé connectée',
  box: 'Clé ou box TV',
  android: 'Téléphone et tablette Android',
  apple: 'iPhone, iPad et Apple TV',
  ordinateur: 'Ordinateur',
  recepteur: 'Récepteur et box à portail',
  console: 'Console et autres appareils',
}

/** The words after « À compléter · » for each family's recommended app (FACTS.md). */
export const FAMILY_APP_PENDING: Record<DeviceFamily, string> = {
  tv: 'application conseillée pour les télés connectées',
  box: 'application conseillée pour les clés et box TV',
  android: 'application conseillée pour Android',
  apple: 'application conseillée pour Apple',
  ordinateur: 'application conseillée pour ordinateur',
  recepteur: 'récepteurs et box à portail compatibles',
  console: 'application conseillée pour console',
}

/** Families shown: every family until the owner lists the supported ones, then only those. */
export function shownFamilies(): DeviceFamily[] {
  const supported = FACTS.devices.supported
  if (!present(supported)) return [...DEVICE_FAMILIES]
  return DEVICE_FAMILIES.filter((f) => present(supported[f]))
}

/** The owner's own app, when it exists on this family. */
export function ownAppFor(family: DeviceFamily) {
  const own = FACTS.apps.own
  return own && own.platforms.includes(family) ? own : null
}

/** Third-party players the owner recommends for this family. */
export function thirdPartyFor(family: DeviceFamily): ThirdPartyApp[] {
  return FACTS.apps.thirdParty?.[family] ?? []
}

/**
 * The app named in a guide step: the owner's own app where it exists, otherwise the recommended players, in « »
 * (« A » ou « B »). null while the owner has not named any.
 */
export function guideAppName(family: DeviceFamily): string | null {
  const own = ownAppFor(family)
  if (own) return `« ${own.name} »`
  const names = thirdPartyFor(family).map((a) => `« ${a.name} »`)
  if (names.length === 0) return null
  return names.length === 1 ? names[0] : `${names.slice(0, -1).join(', ')} ou ${names[names.length - 1]}`
}

/** Model and system tags of a family, from devices.supported. null while unknown. */
export function familyTags(family: DeviceFamily): string[] | null {
  const list = FACTS.devices.supported?.[family]
  return present(list) ? list : null
}

/**
 * The page can say which app this family installs: the owner's own app covers it, a recommended player is named,
 * or (review mode) the marker of the missing name is on show. False on the published site while neither app fact
 * covers the family: the directory then drops the group's apps line and the guide uses its fact-free step.
 */
export function appShown(family: DeviceFamily): boolean {
  return ownAppFor(family) != null || thirdPartyFor(family).length > 0 || markerShown(`apps.thirdParty.${family}`)
}
