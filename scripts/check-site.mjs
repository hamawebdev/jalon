#!/usr/bin/env node
// Checks the built site (dist/, after `npm run build`) against the client's content rules:
//   - no Arabic character anywhere (HTML, scripts, styles);
//   - no streaming-platform name (Netflix, Canal+, HBO Max, Prime Video, Disney+, Apple TV+);
//   - no « Jalon »; the site never calls itself « le site officiel » (in any of its languages);
//   - no 4K claim for live TV or sport (a sentence that names 4K/UHD and live/sport words);
//   - every wa.me link goes to the client's number with one of the allowed pre-filled French messages;
//   - every language page exists, and the six translations carry no French text left over from the French page;
//   - the numbers of each translated page match the French page (warning only: phrasing can differ).
// Exit code 1 when a rule is broken, 0 otherwise.
//
//   node scripts/check-site.mjs [--dist dist] [--verbose]
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const args = process.argv.slice(2)
const DIST = path.resolve(ROOT, args.includes('--dist') ? args[args.indexOf('--dist') + 1] : 'dist')
const VERBOSE = args.includes('--verbose')

if (!existsSync(path.join(DIST, 'index.html'))) {
  console.error(`check-site: no build in ${DIST}. Run npm run build first.`)
  process.exit(2)
}

const { FACTS } = await import(pathToFileURL(path.join(ROOT, 'src/lib/facts.data.ts')).href)
const routes = await import(pathToFileURL(path.join(ROOT, 'src/i18n/routes.ts')).href)
const { LANGS } = await import(pathToFileURL(path.join(ROOT, 'src/i18n/locales.ts')).href)

const errors = []
const warnings = []
const error = (rule, where, detail) => errors.push({ rule, where, detail })
const warn = (rule, where, detail) => warnings.push({ rule, where, detail })

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}
const files = walk(DIST).filter((f) => /\.(html|js|css|json|xml|txt|webmanifest|svg)$/.test(f) && !f.includes(`${path.sep}.vite${path.sep}`))
const rel = (f) => path.relative(DIST, f)

// ── 1. Text rules on every file ──────────────────────────────────────────────────────────────────────────────
const ARABIC = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/
const PLATFORMS = /netflix|canal\s*\+|canal\s*plus|hbo\s*max|prime\s*video|disney\s*\+|disney\s*plus|apple\s*tv\s*\+|apple\s*tv\s*plus/i
const JALON = /jalon/i
// « the official site » in the seven languages (« portail officiel », « distributeur officiel » are allowed).
const OFFICIAL_SITE = /\b(le|du|au|notre)\s+site\s+officiel|\bsite\s+officiel\b|official\s+(web)?site|offizielle[nr]?\s+(web)?seite|offizielle[nr]?\s+website|sitio\s+(web\s+)?oficial|site\s+oficial|sito\s+(web\s+)?ufficiale|virallinen\s+(verkko)?sivusto|virallisella\s+(verkko)?sivustolla/i

for (const file of files) {
  const text = readFileSync(file, 'utf8')
  const where = rel(file)
  const lines = text.split(/(?<=[.!?])\s|\n/)
  if (ARABIC.test(text)) error('arabic', where, (text.match(new RegExp(`.{0,30}${ARABIC.source}.{0,30}`)) ?? [''])[0])
  const platform = text.match(PLATFORMS)
  if (platform) error('platform-name', where, platform[0])
  if (JALON.test(text)) error('jalon', where, (text.match(/.{0,40}jalon.{0,40}/i) ?? [''])[0])
  const official = text.match(OFFICIAL_SITE)
  if (official) error('official-site', where, official[0])
  void lines
}

// ── 2. Prerendered pages ─────────────────────────────────────────────────────────────────────────────────────
function pageFile(routePath) {
  return path.join(DIST, routePath.replace(/^\//, ''), 'index.html')
}

/** Visible text of an HTML page, as separate text nodes (scripts, styles and attributes dropped). */
function textNodes(html) {
  const body = html.replace(/<head[\s\S]*?<\/head>/i, '').replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
  return body
    .split(/<[^>]+>/)
    .map((t) =>
      t
        .replace(/&nbsp;|&#160;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ')
        .trim(),
    )
    .filter(Boolean)
}

// Sentences that tie 4K / UHD to live TV or sport, in any of the seven languages.
const FOURK = /\b4\s?K\b|ultra\s?HD|\bUHD\b/i
const LIVE = /\b(direct|en direct|live|sport|sports|sportifs?|match|matchs|matches|chaînes?|channels?|kanäle|kanal|canales?|canais|canali|kanavat?|kanavia|deportes?|desporto|esporte|sportivi|urheilu\w*|spiele|partidos?|jogos|partite|ottelu\w*|tv en vivo|in diretta|suora\w*|livestream)/i
const VOD_OK = /\bVOD\b|vidéo à la demande|video on demand|films?|séries|series|filme|serien|películas|filmes|séries|film|serie|elokuv\w*|sarj\w*/i

const FRENCH_WORDS = /\b(le|la|les|des|du|vous|votre|vos|nous|notre|nos|pour|avec|sur|dans|est|une|un|et|en|au|aux|chaînes|abonnement|appareil|téléchargez|installez|cliquez|à|où|ou|très|plus|sans|selon|chaque|mois|écran|écrans)\b/gi
const ALLOWED_SAME = new Set() // text nodes allowed to be identical to French (filled below)
/** Words FRENCH_WORDS would flag that are ordinary words of a translation too (« or »). */
const SHARED_WORDS = { pt: ['ou'], es: ['o'] }

const routeList = routes.allRoutes()
const pages = new Map()
for (const r of routeList) {
  const file = pageFile(r.path)
  if (!existsSync(file)) {
    error('missing-page', r.path, 'no prerendered page')
    continue
  }
  pages.set(r.path, { ...r, html: readFileSync(file, 'utf8') })
}

/** An HTML attribute value as the browser reads it. */
const unescapeAttr = (value) =>
  value.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')

const MSG_GREETING = `Bonjour ${FACTS.brand.seller} (${FACTS.brand.domain})`
const allowedMessages = new Set([
  ...FACTS.plans.map((p) => {
    const name = { premium: 'Premium 1 Écran', duo: 'Duo 2 Écrans', famille: 'Famille 3 Écrans' }[p.id]
    return `${MSG_GREETING}, je souhaite activer le Forfait ${name} ${p.months} Mois (${p.price}€)`
  }),
  ...FACTS.resellerPanels.map(
    (n) => `Bonjour l'équipe ${FACTS.brand.seller}, je souhaite devenir revendeur et je voudrais obtenir un Panel Atlas Pro de ${n} Codes. Quels sont les détails pour commencer ?`,
  ),
])
// Messages of src/lib/whatsapp.ts the brief gives no text for (renewal, activation, help, contact) and the order
// message of the configurator (it starts with « …je souhaite commander : »).
const whatsappSource = readFileSync(path.join(ROOT, 'src/lib/whatsapp.ts'), 'utf8')
const extraPrefixes = [...whatsappSource.matchAll(/return `\$\{GREETING\}, ([^`$]+)/g)].map((m) => `${MSG_GREETING}, ${m[1]}`)
extraPrefixes.push(`${MSG_GREETING}, je souhaite commander :`)

const waCounts = new Map()
for (const page of pages.values()) {
  const { html, path: where, lang } = page
  // WhatsApp links
  for (const m of html.matchAll(/href="(https:\/\/(?:wa\.me|api\.whatsapp\.com)[^"]*)"/g)) {
    const url = new URL(unescapeAttr(m[1]))
    const number = url.pathname.replace(/\//g, '') || url.searchParams.get('phone')
    if (number !== FACTS.whatsapp.number) error('whatsapp-number', where, m[1])
    const text = url.searchParams.get('text')
    if (text == null) continue
    const ok = allowedMessages.has(text) || extraPrefixes.some((p) => text.startsWith(p.trim().replace(/\s+$/, '')))
    if (!ok) error('whatsapp-message', where, text)
    waCounts.set(where, (waCounts.get(where) ?? 0) + 1)
  }
  // 4K for live TV / sport
  for (const node of textNodes(html)) {
    for (const sentence of node.split(/(?<=[.!?;:])\s+|\s[·•|]\s/)) {
      if (FOURK.test(sentence) && LIVE.test(sentence) && !VOD_OK.test(sentence)) error('4k-live', where, sentence)
      else if (FOURK.test(sentence) && LIVE.test(sentence) && VERBOSE) warn('4k-check', where, sentence)
    }
  }
  // html lang
  const htmlLang = html.match(/<html[^>]*\blang="([^"]+)"/)?.[1]
  if (!htmlLang || !htmlLang.startsWith(lang)) error('html-lang', where, `lang="${htmlLang}"`)
  if (!/<link[^>]+hreflang="x-default"/.test(html)) error('hreflang', where, 'no hreflang alternates')
}

// Every purchase path: the plan buttons and the reseller buttons must exist (in every language).
for (const lang of LANGS) {
  const home = pages.get(routes.pathFor('home', lang))?.html ?? ''
  const shop = pages.get(routes.pathFor('boutique', lang))?.html ?? ''
  const reseller = pages.get(routes.pathFor('revendeur', lang))?.html ?? ''
  const decoded = (html) =>
    [...html.matchAll(/href="(https:\/\/wa\.me\/[^"]*)"/g)].map((m) => new URL(unescapeAttr(m[1])).searchParams.get('text'))
  for (const p of FACTS.plans) {
    const want = [...allowedMessages][FACTS.plans.indexOf(p)]
    if (!decoded(home).includes(want)) error('purchase-path', routes.pathFor('home', lang), `no button with « ${want} »`)
    if (!decoded(shop).includes(want)) error('purchase-path', routes.pathFor('boutique', lang), `no button with « ${want} »`)
  }
  for (const n of FACTS.resellerPanels) {
    const want = [...allowedMessages][FACTS.plans.length + FACTS.resellerPanels.indexOf(n)]
    if (!decoded(reseller).includes(want)) error('purchase-path', routes.pathFor('revendeur', lang), `no button with the ${n}-code panel message`)
  }
}

// ── 3. Translations: French left over, numbers ───────────────────────────────────────────────────────────────
const digits = (text) =>
  (text.match(/\d[\d\s.,  ]*\d|\d/g) ?? []).map((n) => n.replace(/[^\d]/g, '')).filter((n) => n.length > 0)
const brandOnly = /^[\s\d.,:;!?()[\]«»"'/+\-–—·•|%€$#&*✓✔✦→↑↓➔⬇\u{1F525}]*$|^(Atlas Pro[\w\s.]*|ONTV[\w\s.]*|IBO[\w\s.]*|Max v?7|AtlasProTVOfficial|PayPal|SEPA|WhatsApp|Telegram|Downloader|Xtream Codes|M3U|EPG|VOD|Full HD|H\.265|4K|FHD|HD|SD|Smart TV|Fire TV Stick|Android|Google TV|iOS|Apple TV|iPhone|iPad|Windows|macOS|Linux|Mac|MAG|Formuler[\w\s]*|Nvidia Shield|Samsung|LG|Sony|Philips|TCL|Xiaomi|Mecool)$/iu
for (const p of routes.PAGES) {
  const fr = pages.get(routes.pathFor(p, 'fr'))
  if (!fr) continue
  const frNodes = new Set(textNodes(fr.html))
  const frDigits = digits(textNodes(fr.html).join(' ')).sort()
  for (const lang of LANGS) {
    if (lang === 'fr') continue
    const page = pages.get(routes.pathFor(p, lang))
    if (!page) continue
    const nodes = textNodes(page.html)
    for (const node of nodes) {
      if (!frNodes.has(node) || brandOnly.test(node) || ALLOWED_SAME.has(node)) continue
      // Short nodes identical to French whose only « French » word is also that language's own (pt « ou », es
      // « o »: « MyTVOnline 2 ou 3 ») are not leftovers.
      const shared = SHARED_WORDS[lang] ?? []
      const hits = node.match(FRENCH_WORDS) ?? []
      if (node.split(/\s+/).length <= 6 && hits.length && hits.every((w) => shared.includes(w.toLowerCase()))) continue
      const frenchHits = hits.length
      if (frenchHits >= 2 || (node.split(' ').length >= 3 && frenchHits >= 1)) error('untranslated', page.path, node.slice(0, 140))
    }
    const d = digits(nodes.join(' ')).sort()
    if (d.join(',') !== frDigits.join(',')) {
      const missing = frDigits.filter((x) => !d.includes(x))
      const extra = d.filter((x) => !frDigits.includes(x))
      if (missing.length || extra.length) warn('numbers', page.path, `vs French — missing ${[...new Set(missing)].join(' ') || '∅'}; extra ${[...new Set(extra)].join(' ') || '∅'}`)
    }
  }
}

// ── Report ───────────────────────────────────────────────────────────────────────────────────────────────────
const group = (list) => {
  const byRule = new Map()
  for (const item of list) byRule.set(item.rule, [...(byRule.get(item.rule) ?? []), item])
  return byRule
}
for (const [rule, items] of group(errors)) {
  console.log(`✗ ${rule} (${items.length})`)
  for (const item of items.slice(0, VERBOSE ? 1000 : 25)) console.log(`    ${item.where}: ${item.detail}`)
  if (!VERBOSE && items.length > 25) console.log(`    … ${items.length - 25} more (--verbose)`)
}
for (const [rule, items] of group(warnings)) {
  console.log(`! ${rule} (${items.length})`)
  for (const item of items.slice(0, VERBOSE ? 1000 : 15)) console.log(`    ${item.where}: ${item.detail}`)
}
console.log(
  `\n${pages.size} pages, ${[...waCounts.values()].reduce((a, b) => a + b, 0)} WhatsApp links checked. ${errors.length ? `${errors.length} problem(s).` : 'No problem.'}`,
)
process.exit(errors.length ? 1 : 0)
