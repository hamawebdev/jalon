#!/usr/bin/env node
// Launch check (APPROVAL §2c.3). Owner of this file: copy (T19).
//
// Lists the required facts still missing from src/lib/facts.data.ts, grouped and in the order to answer them, then
// the answers that ask for a part the site does not have yet (UNSUPPORTED_ANSWERS in facts.ts: a yes to
// shop.physicalDevices), then says how many optional facts are still empty. Some facts are required only with an
// answer (CONDITIONAL_FACTS, APPROVAL §2e): the hand-off addresses of the chosen checkout.mode (payment links, shop,
// payment page: each one an https address) and the four fields of each cookies.tools entry; they are listed with
// the required facts, and a value the site cannot use is listed « à corriger » with what is wrong. The address of
// the form service (contact.formEndpoint) is checked the same way: an https address (QA HC-06). A demo video played
// from a video host names that host's tool, a cookies.tools entry that asks for consent (media.demoVideo.tool, QA
// HC-03). Exit code: 1 while a required fact is missing or an unsupported answer is there, 0 once neither is, 2 when
// the check itself cannot run. The deploy workflow runs it before the build, so a site with holes is not published.
//
//   npm run launch-check                    check src/lib/facts.data.ts
//   node scripts/launch-check.mjs --data <file>   check another data file (it must export FACTS, like facts.data.ts)
//   node scripts/launch-check.mjs --json          the same result as JSON, for scripts
//
// The list of required facts, their labels and the tests live in src/lib/facts.ts (REQUIRED_FACTS, CONDITIONAL_FACTS,
// missingRequired, requiredCount; UNSUPPORTED_ANSWERS, unsupportedAnswers). This script imports that TypeScript file
// directly: Node 24 strips the types (the two facts files use erasable syntax and relative imports only).

import { existsSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DEFAULT_DATA = resolve(ROOT, 'src/lib/facts.data.ts')
const NBSP = '\u00a0'

/** Stops the check with exit code 2: a problem with the check itself, never a missing fact. */
function fail(message) {
  console.error(`launch-check: ${message}`)
  process.exit(2)
}

function parseArgs(argv) {
  const options = { data: null, json: false }
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--json') options.json = true
    else if (arg === '--data') {
      i += 1
      if (!argv[i]) fail('--data needs a file path.')
      options.data = argv[i]
    } else if (arg.startsWith('--data=')) options.data = arg.slice('--data='.length)
    else if (arg === '--help' || arg === '-h') {
      console.log('Usage: node scripts/launch-check.mjs [--data <file exporting FACTS>] [--json]')
      process.exit(0)
    } else fail(`unknown option ${arg}. Usage: node scripts/launch-check.mjs [--data <file>] [--json]`)
  }
  return options
}

async function load(path, what) {
  try {
    return await import(pathToFileURL(path).href)
  } catch (error) {
    if (error && error.code === 'ERR_UNKNOWN_FILE_EXTENSION') {
      fail(`this Node (${process.version}) cannot import ${what}: use Node 24, as the project and the deploy workflow do.`)
    }
    fail(`cannot read ${what} (${relative(ROOT, path) || path}): ${error && error.message ? error.message : error}`)
  }
}

/** « 3, 6, 12 et 24 mois » from the plan list. */
function lineup(plans) {
  const months = plans.list.map((plan) => String(plan.months))
  const text = months.length > 1 ? `${months.slice(0, -1).join(', ')} et ${months[months.length - 1]}` : (months[0] ?? '')
  const featured = plans.list.find((plan) => plan.id === plans.featured)
  return `aujourd’hui${NBSP}: ${text}${NBSP}mois${featured ? `${NBSP}; formule conseillée${NBSP}: ${featured.months}${NBSP}mois` : ''}`
}

const options = parseArgs(process.argv.slice(2))
const dataPath = options.data ? resolve(process.cwd(), options.data) : DEFAULT_DATA
if (!existsSync(dataPath)) fail(`no such data file: ${options.data ?? dataPath}`)

const policy = await load(resolve(ROOT, 'src/lib/facts.ts'), 'src/lib/facts.ts')
const data = dataPath === DEFAULT_DATA ? policy : await load(dataPath, 'the data file')
const facts = data.FACTS
if (!facts || typeof facts !== 'object' || !facts.plans || !Array.isArray(facts.plans.list)) {
  fail(`${relative(ROOT, dataPath) || dataPath} does not export a FACTS object shaped like src/lib/facts.data.ts.`)
}

const unclassified = policy.unclassifiedFacts(facts)
if (unclassified.length > 0) {
  fail(
    `these facts are neither required nor optional: ${unclassified.join(', ')}. ` +
      'Add each one to REQUIRED_FACTS or OPTIONAL_FACTS in src/lib/facts.ts.',
  )
}

const missing = policy.missingRequired(facts)
const unsupported = policy.unsupportedAnswers(facts)
const ready = missing.length === 0 && unsupported.length === 0
const optionalEmpty = policy.missingOptional(facts)
// One price per plan of the lineup, no share capital for a sole trader, and the conditional answers these facts
// call for (the hand-off of checkout.mode, one per cookies.tools entry).
const requiredTotal = policy.requiredCount(facts)
const dataLabel = options.data ?? relative(ROOT, dataPath)

if (options.json) {
  console.log(
    JSON.stringify(
      {
        data: dataLabel,
        ready,
        required: { total: requiredTotal, missing: missing.length, facts: missing },
        unsupported: {
          count: unsupported.length,
          answers: unsupported.map(({ key, answer, label, why }) => ({ key, answer, label, why })),
        },
        optional: { total: policy.OPTIONAL_FACTS.length, empty: optionalEmpty.length, facts: optionalEmpty },
      },
      null,
      2,
    ),
  )
  process.exit(ready ? 0 : 1)
}

console.log(`Jalon · launch check · ${dataLabel}`)
console.log('')
if (ready) {
  console.log(`Ready: the ${requiredTotal} required facts are all answered.`)
} else if (missing.length === 0) {
  console.log(
    `Not ready: the ${requiredTotal} required facts are all answered, but ${unsupported.length} ` +
      `${unsupported.length === 1 ? 'answer asks' : 'answers ask'} for a part the site does not have yet (below).`,
  )
} else {
  console.log(
    `Not ready: ${missing.length} of ${requiredTotal} required facts ${missing.length === 1 ? 'is' : 'are'} missing. ` +
      `Answer in ${dataLabel}, in this order (each line: what to provide, [its key], then where it shows).`,
  )
  let group = null
  let groupNumber = 0
  for (const fact of missing) {
    if (fact.group !== group) {
      group = fact.group
      groupNumber += 1
      const count = missing.filter((other) => other.group === group).length
      console.log('')
      console.log(`${groupNumber}. ${group} (${count})`)
    }
    const key = fact.key === 'plans.list' ? 'plans.confirmed' : fact.key
    console.log(`   - ${fact.label}  [${key}]`)
    if (fact.key === 'plans.list') console.log(`       ${lineup(facts.plans)}`)
    console.log(`       sur le site${NBSP}: ${fact.where}`)
  }
}
if (unsupported.length > 0) {
  console.log('')
  console.log(
    `Not supported yet (${unsupported.length}): ${unsupported.length === 1 ? 'this answer asks' : 'these answers ask'} ` +
      `for a part the site does not have. Change it in ${dataLabel}, or ask the team for that part first ` +
      '(each line: what the answer says, [its key = the answer], then why).',
  )
  for (const answer of unsupported) {
    console.log(`   - ${answer.label}  [${answer.key} = ${answer.answer}]`)
    console.log(`       ${answer.why}`)
  }
}
console.log('')
console.log(
  `Optional: ${optionalEmpty.length} of ${policy.OPTIONAL_FACTS.length} optional facts ${optionalEmpty.length === 1 ? 'is' : 'are'} still empty; ` +
    'their rows and sections stay off the published site until you answer (.team/copy/PLACEHOLDERS.md).',
)
process.exit(ready ? 0 : 1)
