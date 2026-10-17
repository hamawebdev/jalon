import type { ReactNode } from 'react'
import { useConsent } from './consent-store'

type ConsentGateProps = {
  /** The tool's name, exactly as in cookies.tools. */
  tool: string
  /** What the tool mounts (a script loader, an embed): mounted only while useConsent(tool) is true. */
  children: ReactNode
  /** Shown instead while it is not (e.g. a sentence and a button that calls openConsentSettings()). Default: nothing. */
  fallback?: ReactNode
}

/**
 * The only way a tool mounts (APPROVAL §2e): its children render while the tool may run (useConsent), and unmount
 * the moment it may not (the visitor refuses or withdraws, the choice expires). An essential tool (consent: false)
 * mounts at once. A name that cookies.tools does not list never mounts: the list is the one the mounted banner hands
 * to the store.
 *
 * A module of its own, apart from the banner (Consent.tsx), so a page that mounts a tool never pulls the banner into
 * the chunk every page loads (QA HC-08).
 */
export function ConsentGate({ tool, children, fallback = null }: ConsentGateProps) {
  const ok = useConsent(tool)
  return <>{ok ? children : fallback}</>
}
