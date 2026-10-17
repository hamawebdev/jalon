// The consent banner as the layout mounts it (APPROVAL §2e, brand HANDOFF §17.3), in a module of its own: SiteLayout
// loads it only while cookies.tools lists a tool, so a site without one never downloads the banner, its store or its
// words (QA HC-08). The banner is imported from its own kit module, not from the kit's index: whatever the index
// re-exports ships in the chunk every page loads.
import { ConsentBanner } from '@/components/brand/Consent'
import type { CookieTool } from '@/lib/facts'
import { COOKIES_POLICY_PATH } from '@/lib/site'
import { CONSENT_TEXTS } from './consent-texts'

export default function ConsentMount({ tools }: { tools: readonly CookieTool[] }) {
  return <ConsentBanner tools={tools} texts={CONSENT_TEXTS} policyTo={COOKIES_POLICY_PATH} dataSection="chrome-consent" />
}
