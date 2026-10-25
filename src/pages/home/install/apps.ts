// The four free official apps of the hub, in the brief's order, and how their names are printed.
import { FACTS, type Activation, type AppId } from '@/lib/facts'

export type HubAppId = Extract<AppId, 'ontv' | 'max' | 'ibo' | 'x9'>
export const HUB_APPS: HubAppId[] = ['ontv', 'max', 'ibo', 'x9']

export function isHubApp(id: string): id is HubAppId {
  return (HUB_APPS as string[]).includes(id)
}

/** « Atlas Pro ONTV 4.0.2 », « Atlas Pro Max v7 », « Atlas Pro IBO v4.3 », « Atlas Pro 9X » (the brief's spelling). */
export function appLabel(id: AppId): string {
  const app = FACTS.apps[id]
  if (!app.version) return app.name
  return id === 'ontv' ? `${app.name} ${app.version}` : `${app.name} v${app.version}`
}

/** « Code Active (Code Atlas Pro) ou Identifiant + Mot de passe ». */
export function activationText(modes: Activation[], copy: Record<Activation, string>, or: string): string {
  return modes.map((m) => copy[m]).join(` ${or} `)
}
