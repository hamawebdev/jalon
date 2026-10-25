// Helpers for version labels on the Télécharger page.

/** « 4.0.2 » → « 4.0 », the family the brief prints next to the name. */
export function versionFamily(version: string): string {
  return version.split('.').slice(0, 2).join('.')
}
