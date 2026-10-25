// Keeps the client preview out of search results: every HTML page of dist/ (each prerendered page in every
// language, and 404.html) gets noindex, nofollow for robots, googlebot and bingbot.
//   node scripts/preview-noindex.mjs        after npm run build (.github/workflows/preview.yml only)
// Each page's own robots tag is removed first. These tags carry no data-seo attribute, so the browser never
// replaces them on client-side navigation (src/components/site/seo/apply.ts drops the page's robots tag when
// they are there). Never run this for the real launch: .github/workflows/deploy.yml does not.
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
  // Drop the robots tags the page already has (every page has one), then add the three.
  const cleaned = html.replace(/\s*<meta name="(?:robots|googlebot|bingbot)"[^>]*>/g, '')
  if (!cleaned.includes('</head>')) throw new Error(`${file}: no </head>`)
  await writeFile(file, cleaned.replace('</head>', `    ${TAGS.join('\n    ')}\n  </head>`))
}
console.log(`preview-noindex: ${files.length} pages set to noindex, nofollow.`)
