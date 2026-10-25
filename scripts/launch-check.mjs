#!/usr/bin/env node
// Launch check. Lists the client facts the site cannot launch without that are still missing from
// src/lib/facts.data.ts (REQUIRED_FACTS in src/lib/facts.ts), then the optional ones still missing (they are left out
// of the launched site and show « À compléter » in review mode). Exit code 1 while a required fact is missing,
// 0 otherwise, 2 when the check cannot run. Needs Node 24 (it imports the TypeScript facts files directly).
//
//   npm run launch-check
//   node scripts/launch-check.mjs --json
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
let facts
try {
  facts = await import(pathToFileURL(resolve(ROOT, 'src/lib/facts.ts')).href)
} catch (error) {
  console.error(`launch-check: cannot read src/lib/facts.ts: ${error?.message ?? error}`)
  process.exit(2)
}

const required = facts.missingRequired()
const optional = facts.missingOptional()

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ required: required.map((f) => f.path), optional: optional.map((f) => f.path) }, null, 2))
} else {
  if (required.length) {
    console.log(`Missing required facts (${required.length}), in src/lib/facts.data.ts:`)
    for (const fact of required) console.log(`  ✗ ${fact.path} — ${fact.label}`)
  } else {
    console.log(`All ${facts.REQUIRED_FACTS.length} required facts are there.`)
  }
  if (optional.length) {
    console.log(`\nOptional facts still missing (${optional.length}): left out of the launched site, « À compléter » in review mode:`)
    for (const fact of optional) console.log(`  · ${fact.path} — ${fact.label}`)
  }
}
process.exit(required.length ? 1 : 0)
