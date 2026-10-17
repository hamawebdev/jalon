/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * How a missing owner fact shows (APPROVAL §2c): 'review' = every marker, 'launch' = only the markers of required
   * facts. Unset: 'launch' in a production build, 'review' on the dev server. Read once, in
   * src/components/brand/mode.ts.
   */
  readonly VITE_PENDING?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
