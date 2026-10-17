// Keeps the client preview out of search results: every HTML page of dist/ gets noindex, nofollow.
//   node scripts/preview-noindex.mjs        after npm run build and npm run static-head (preview workflow only)
// The served <meta name="robots"> covers crawlers that read the HTML as served. The browser rewrites that tag on
// every route (page-meta.ts applyMeta), so googlebot and bingbot, which it never touches, carry the same rule for
// the crawlers that render pages. Never run this for the real launch: .github/workflows/deploy.yml does not.
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const DIST = 'dist'
const TAGS = ['robots', 'googlebot', 'bingbot'].map((name) => `<meta name="${name}" content="noindex, nofollow" />`)

async function htmlFiles(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await htmlFiles(path)))
    else if (entry.name.endsWith('.html')) out.push(path)
  }
  return out
}

const files = await htmlFiles(DIST)
for (const file of files) {
  const html = await readFile(file, 'utf8')
  // Drop the tags a route already has (the order page and 404.html carry robots noindex), then add the three.
  const cleaned = html.replace(/\s*<meta name="(?:robots|googlebot|bingbot)"[^>]*>/g, '')
  if (!cleaned.includes('</head>')) throw new Error(`${file}: no </head>`)
  await writeFile(file, cleaned.replace('</head>', `    ${TAGS.join('\n    ')}\n  </head>`))
}
console.log(`preview-noindex: ${files.length} pages set to noindex, nofollow.`)
