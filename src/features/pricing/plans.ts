// Small read helpers shared by the plan cards and the order configurator. Owner: pricing.
import { FACTS, type AppId } from '@/lib/facts'

/** The apps every plan gives access to, short and with their version: « ONTV v4.0.2, Max v7, IBO v4.3, 9X ». */
const PLAN_APPS: AppId[] = ['ontv', 'max', 'ibo', 'x9']

export function planApps(): string {
  return PLAN_APPS.map((id) => {
    const app = FACTS.apps[id]
    const short = app.name.replace(/^Atlas Pro\s+/, '')
    return app.version ? `${short} v${app.version}` : short
  }).join(', ')
}
