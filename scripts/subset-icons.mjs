#!/usr/bin/env node
// Icon font subset: the site ships only the Tabler icons it uses.
//
//   npm run icons                          scan src/ for ti-* class names, then write src/assets/icons/:
//                                            tabler-icons-subset.woff2   the glyphs of those icons, nothing else
//                                            tabler-icons-subset.css     @font-face, the .ti rule, one rule per icon
//   node scripts/subset-icons.mjs --check  fail when src/ uses a ti-* class the subset lacks (runs before a build)
//
// src/index.css imports the subset CSS in place of the package stylesheet. Class names and code points are the
// package's own, so no page changes. To add an icon: write its full class name (`ti-heart`) in src/, run
// `npm run icons`, commit the two files. A name must appear in full somewhere in src/ (never built from pieces).
//
// Node only, no dependency: the script reads the package's TrueType font, copies the glyph outlines it needs into a
// new font and packs it as WOFF2 (Brotli comes with Node). The source font has simple glyphs only; a composite
// glyph, which this script does not handle, stops it with an error instead of writing a broken font.
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import zlib from 'node:zlib'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PACKAGE_DIR = path.join(ROOT, 'node_modules/@tabler/icons-webfont')
const SOURCE_CSS = path.join(PACKAGE_DIR, 'dist/tabler-icons.min.css')
const SOURCE_TTF = path.join(PACKAGE_DIR, 'dist/fonts/tabler-icons.ttf')
const OUT_DIR = path.join(ROOT, 'src/assets/icons')
const OUT_FONT = 'tabler-icons-subset.woff2'
const OUT_CSS = 'tabler-icons-subset.css'

/** Where icon class names are looked for: every text source under src/ (the generated folder excepted) and index.html. */
const SCAN_ROOTS = ['src', 'index.html']
const SCAN_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css', '.html', '.svg', '.json'])
/** A full icon class name: `ti-` then lowercase words and digits joined by hyphens, not part of a longer word. */
const ICON_CLASS = /(?<![\w-])ti-[a-z0-9]+(?:-[a-z0-9]+)*/g
/** An icon rule of the stylesheets (the package's and the subset's): `.ti-name:before{content:"\ea01"}`. */
const ICON_RULE = /\.(ti-[a-z0-9-]+):before\s*\{\s*content:\s*"\\([0-9a-fA-F]+)"\s*;?\s*\}/g

const rel = (file) => path.relative(ROOT, file)

// ── Scan ────────────────────────────────────────────────────────────────────────────────────────────────────────

function* walk(entry) {
  const stat = statSync(entry)
  if (stat.isFile()) {
    if (SCAN_EXTENSIONS.has(path.extname(entry))) yield entry
    return
  }
  if (path.resolve(entry) === OUT_DIR) return
  for (const name of readdirSync(entry).sort()) yield* walk(path.join(entry, name))
}

/** Icon class names used in the sources, each with the first place it appears: Map<name, "file:line">. */
function scanSources() {
  const used = new Map()
  for (const root of SCAN_ROOTS) {
    const start = path.join(ROOT, root)
    if (!existsSync(start)) continue
    for (const file of walk(start)) {
      const lines = readFileSync(file, 'utf8').split('\n')
      lines.forEach((line, index) => {
        for (const match of line.matchAll(ICON_CLASS)) {
          if (!used.has(match[0])) used.set(match[0], `${rel(file)}:${index + 1}`)
        }
      })
    }
  }
  return used
}

/** Icon rules of a stylesheet: Map<class name, code point>. */
function readRules(css) {
  const rules = new Map()
  for (const match of css.matchAll(ICON_RULE)) rules.set(match[1], Number.parseInt(match[2], 16))
  return rules
}

// ── TrueType in, TrueType tables out ────────────────────────────────────────────────────────────────────────────

function readSfnt(font) {
  const tables = new Map()
  const count = font.readUInt16BE(4)
  for (let i = 0; i < count; i++) {
    const at = 12 + i * 16
    const offset = font.readUInt32BE(at + 8)
    tables.set(font.toString('latin1', at, at + 4), font.subarray(offset, offset + font.readUInt32BE(at + 12)))
  }
  return tables
}

/** Every code point → glyph index mapping of the font's cmap (format 12, or format 4 when there is none). */
function readCmap(cmap) {
  const subtables = []
  for (let i = 0; i < cmap.readUInt16BE(2); i++) {
    const offset = cmap.readUInt32BE(4 + i * 8 + 4)
    subtables.push({ offset, format: cmap.readUInt16BE(offset) })
  }
  const mapping = new Map()
  const full = subtables.find((s) => s.format === 12)
  if (full) {
    const groups = cmap.readUInt32BE(full.offset + 12)
    for (let g = 0; g < groups; g++) {
      const at = full.offset + 16 + g * 12
      const start = cmap.readUInt32BE(at)
      const end = cmap.readUInt32BE(at + 4)
      const glyph = cmap.readUInt32BE(at + 8)
      for (let code = start; code <= end; code++) mapping.set(code, glyph + (code - start))
    }
    return mapping
  }
  const basic = subtables.find((s) => s.format === 4)
  if (!basic) throw new Error('the source font has no cmap subtable in format 12 or 4')
  const o = basic.offset
  const segments = cmap.readUInt16BE(o + 6) / 2
  const ends = o + 14
  const starts = ends + segments * 2 + 2
  const deltas = starts + segments * 2
  const ranges = deltas + segments * 2
  for (let s = 0; s < segments; s++) {
    const start = cmap.readUInt16BE(starts + s * 2)
    const range = cmap.readUInt16BE(ranges + s * 2)
    const delta = cmap.readUInt16BE(deltas + s * 2)
    for (let code = start; code <= cmap.readUInt16BE(ends + s * 2) && code < 0xffff; code++) {
      const listed = range === 0 ? code : cmap.readUInt16BE(ranges + s * 2 + range + (code - start) * 2)
      const glyph = range !== 0 && listed === 0 ? 0 : (listed + delta) & 0xffff
      if (glyph !== 0) mapping.set(code, glyph)
    }
  }
  return mapping
}

const pad4 = (length) => (length + 3) & ~3

/** cmap with the same four encodings as the source: formats 4 (basic plane) and 12 (every code point). */
function writeCmap(mapping) {
  // Runs of consecutive code points that map to consecutive glyphs.
  const runs = []
  for (const [code, glyph] of mapping) {
    const last = runs[runs.length - 1]
    if (last && code === last.end + 1 && glyph === last.glyph + (code - last.start)) last.end = code
    else runs.push({ start: code, end: code, glyph })
  }

  const basic = runs.filter((run) => run.start <= 0xfffe).map((run) => ({ ...run, end: Math.min(run.end, 0xfffe) }))
  basic.push({ start: 0xffff, end: 0xffff, glyph: 0 }) // the closing segment the format requires
  const segments = basic.length
  const format4 = Buffer.alloc(16 + segments * 8)
  const power = 2 ** Math.floor(Math.log2(segments))
  format4.writeUInt16BE(4, 0)
  format4.writeUInt16BE(format4.length, 2)
  format4.writeUInt16BE(segments * 2, 6)
  format4.writeUInt16BE(power * 2, 8)
  format4.writeUInt16BE(Math.log2(power), 10)
  format4.writeUInt16BE(segments * 2 - power * 2, 12)
  basic.forEach((run, i) => {
    format4.writeUInt16BE(run.end, 14 + i * 2)
    format4.writeUInt16BE(run.start, 16 + segments * 2 + i * 2)
    format4.writeUInt16BE((run.start === 0xffff ? 1 : run.glyph - run.start) & 0xffff, 16 + segments * 4 + i * 2)
  })

  const format12 = Buffer.alloc(16 + runs.length * 12)
  format12.writeUInt16BE(12, 0)
  format12.writeUInt32BE(format12.length, 4)
  format12.writeUInt32BE(runs.length, 12)
  runs.forEach((run, i) => {
    format12.writeUInt32BE(run.start, 16 + i * 12)
    format12.writeUInt32BE(run.end, 20 + i * 12)
    format12.writeUInt32BE(run.glyph, 24 + i * 12)
  })

  // [platform, encoding, subtable]: Unicode BMP, Unicode full, Windows BMP, Windows full.
  const records = [[0, 3, 4], [0, 4, 12], [3, 1, 4], [3, 10, 12]]
  const header = Buffer.alloc(4 + records.length * 8)
  header.writeUInt16BE(records.length, 2)
  records.forEach(([platform, encoding, format], i) => {
    header.writeUInt16BE(platform, 4 + i * 8)
    header.writeUInt16BE(encoding, 6 + i * 8)
    header.writeUInt32BE(header.length + (format === 4 ? 0 : format4.length), 8 + i * 8)
  })
  return Buffer.concat([header, format4, format12])
}

/**
 * The tables of a font that holds glyph 0 and the glyphs of `codes`, in the source font's glyph order: the source
 * font cut down to those glyphs. Outlines, metrics and the font-wide values are copied as they are, and the cmap
 * keeps every code point the source maps to a kept glyph, an icon's second code point included. That is what makes
 * a kept icon render exactly as it does from the whole font: FreeType's auto-hinter, for one, picks a glyph's
 * script from its code points (the source gives « search » a second one inside an Arabic block).
 * Dropped: glyph names (post becomes version 3) and GSUB (the source's is an empty ligature stub).
 */
function subsetTables(source, codes) {
  const src = readSfnt(source)
  for (const tag of ['cmap', 'glyf', 'head', 'hhea', 'hmtx', 'loca', 'maxp', 'name', 'OS/2', 'post']) {
    if (!src.has(tag)) throw new Error(`the source font has no ${tag} table`)
  }
  const head = Buffer.from(src.get('head'))
  const hhea = Buffer.from(src.get('hhea'))
  const maxp = Buffer.from(src.get('maxp'))
  const os2 = Buffer.from(src.get('OS/2'))
  const glyf = src.get('glyf')
  const loca = src.get('loca')
  const hmtx = src.get('hmtx')
  const glyphCount = maxp.readUInt16BE(4)
  const longLoca = head.readInt16BE(50) === 1
  const metricCount = hhea.readUInt16BE(34)
  const offsetOf = (glyph) => (longLoca ? loca.readUInt32BE(glyph * 4) : loca.readUInt16BE(glyph * 2) * 2)

  const glyphOf = readCmap(src.get('cmap'))
  const missing = codes.filter((code) => !glyphOf.get(code))
  if (missing.length) throw new Error(`the source font has no glyph for ${missing.map((c) => `U+${c.toString(16)}`).join(', ')}`)

  const kept = [0, ...[...new Set(codes.map((code) => glyphOf.get(code)))].sort((a, b) => a - b)]
  const newIndex = new Map(kept.map((glyph, index) => [glyph, index]))
  // Every code point of the source that leads to a kept glyph, in code point order.
  const mapping = [...glyphOf].filter(([, glyph]) => glyph !== 0 && newIndex.has(glyph)).sort((a, b) => a[0] - b[0])

  const outlines = []
  const newLoca = Buffer.alloc((kept.length + 1) * 4)
  const newHmtx = Buffer.alloc(kept.length * 4)
  let offset = 0
  let widest = 0
  kept.forEach((glyph, index) => {
    if (glyph >= glyphCount) throw new Error(`glyph ${glyph} is outside the source font (${glyphCount} glyphs)`)
    const data = glyf.subarray(offsetOf(glyph), offsetOf(glyph + 1))
    if (data.length >= 2 && data.readInt16BE(0) < 0) {
      throw new Error(`glyph ${glyph} is a composite glyph, which this script does not handle`)
    }
    const padded = Buffer.alloc(pad4(data.length))
    data.copy(padded)
    outlines.push(padded)
    newLoca.writeUInt32BE(offset, index * 4)
    offset += padded.length
    // Glyphs past the last full metric share its advance width and keep their own side bearing.
    const advance = hmtx.readUInt16BE(Math.min(glyph, metricCount - 1) * 4)
    const bearing = glyph < metricCount ? hmtx.readInt16BE(glyph * 4 + 2) : hmtx.readInt16BE(metricCount * 4 + (glyph - metricCount) * 2)
    newHmtx.writeUInt16BE(advance, index * 4)
    newHmtx.writeInt16BE(bearing, index * 4 + 2)
    widest = Math.max(widest, advance)
  })
  newLoca.writeUInt32BE(offset, kept.length * 4)

  head.writeUInt32BE(0, 8) // checkSumAdjustment: the WOFF2 decoder computes it for the font it rebuilds
  head.writeInt16BE(1, 50) // long loca offsets
  hhea.writeUInt16BE(widest, 10)
  hhea.writeUInt16BE(kept.length, 34)
  maxp.writeUInt16BE(kept.length, 4)
  os2.writeUInt16BE(Math.min(mapping[0][0], 0xffff), 64) // usFirstCharIndex
  os2.writeUInt16BE(Math.min(mapping[mapping.length - 1][0], 0xffff), 66) // usLastCharIndex
  const post = Buffer.from(src.get('post').subarray(0, 32))
  post.writeUInt32BE(0x00030000, 0) // version 3: no glyph names

  return {
    glyphs: kept.length,
    codes: mapping.length,
    tables: new Map([
      ['OS/2', os2],
      ['cmap', writeCmap(mapping.map(([code, glyph]) => [code, newIndex.get(glyph)]))],
      ['glyf', Buffer.concat(outlines)],
      ['loca', newLoca],
      ['head', head],
      ['hhea', hhea],
      ['hmtx', newHmtx],
      ['maxp', maxp],
      ['name', Buffer.from(src.get('name'))],
      ['post', post],
    ]),
  }
}

// ── WOFF2 ───────────────────────────────────────────────────────────────────────────────────────────────────────

/** Index of each table tag in the WOFF2 directory (the tags this script writes). */
const WOFF2_TAG = { cmap: 0, head: 1, hhea: 2, hmtx: 3, maxp: 4, name: 5, 'OS/2': 6, post: 7, glyf: 10, loca: 11 }
const WOFF2_TAGS = Object.fromEntries(Object.entries(WOFF2_TAG).map(([tag, index]) => [index, tag]))
/** glyf and loca are stored as they are (« null transform », version 3); the other tables have no transform. */
const AS_IS = 3 << 6

function base128(value) {
  const bytes = [value & 0x7f]
  for (let rest = value >>> 7; rest > 0; rest >>>= 7) bytes.unshift((rest & 0x7f) | 0x80)
  return Buffer.from(bytes)
}

/** Packs sfnt tables (in the order given: loca right after glyf) as a WOFF2 file. */
function writeWoff2(tables) {
  const directory = []
  const stream = []
  let sfntSize = 12 + tables.size * 16
  for (const [tag, data] of tables) {
    directory.push(Buffer.from([WOFF2_TAG[tag] | (tag === 'glyf' || tag === 'loca' ? AS_IS : 0)]), base128(data.length))
    stream.push(data)
    sfntSize += pad4(data.length)
  }
  const plain = Buffer.concat(stream)
  const compressed = zlib.brotliCompressSync(plain, {
    params: {
      [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_FONT,
      [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
      [zlib.constants.BROTLI_PARAM_SIZE_HINT]: plain.length,
    },
  })
  const entries = Buffer.concat(directory)
  const header = Buffer.alloc(48)
  const length = pad4(header.length + entries.length + compressed.length)
  header.write('wOF2', 0, 'latin1')
  header.writeUInt32BE(0x00010000, 4) // flavor: TrueType outlines
  header.writeUInt32BE(length, 8)
  header.writeUInt16BE(tables.size, 12)
  header.writeUInt32BE(sfntSize, 16)
  header.writeUInt32BE(compressed.length, 20)
  header.writeUInt16BE(1, 24) // font revision 1.0; no metadata, no private data
  const file = Buffer.alloc(length)
  Buffer.concat([header, entries, compressed]).copy(file)
  return file
}

/** The code points a subset written by writeWoff2() maps to a glyph (for --check). */
function readWoff2Codes(file) {
  if (file.toString('latin1', 0, 4) !== 'wOF2') throw new Error('not a WOFF2 file')
  const count = file.readUInt16BE(12)
  const entries = []
  let at = 48
  for (let i = 0; i < count; i++) {
    const flags = file[at++]
    if ((flags & 0x3f) === 0x3f) throw new Error('a table this script did not write')
    let length = 0
    let byte
    do {
      byte = file[at++]
      length = length * 128 + (byte & 0x7f)
    } while (byte & 0x80)
    entries.push({ tag: WOFF2_TAGS[flags & 0x3f], length })
  }
  const plain = zlib.brotliDecompressSync(file.subarray(at, at + file.readUInt32BE(20)))
  let offset = 0
  for (const entry of entries) {
    if (entry.tag === 'cmap') {
      const cmap = plain.subarray(offset, offset + entry.length)
      const codes = new Set()
      for (let i = 0; i < cmap.readUInt16BE(2); i++) {
        const sub = cmap.readUInt32BE(4 + i * 8 + 4)
        if (cmap.readUInt16BE(sub) !== 12) continue
        for (let g = 0; g < cmap.readUInt32BE(sub + 12); g++) {
          for (let code = cmap.readUInt32BE(sub + 16 + g * 12); code <= cmap.readUInt32BE(sub + 20 + g * 12); code++) codes.add(code)
        }
      }
      return codes
    }
    offset += entry.length
  }
  throw new Error('no cmap table')
}

// ── Commands ────────────────────────────────────────────────────────────────────────────────────────────────────

const kB = (bytes) => `${(bytes / 1000).toFixed(1)} kB`

function generate() {
  if (!existsSync(SOURCE_CSS) || !existsSync(SOURCE_TTF)) {
    throw new Error(`${rel(PACKAGE_DIR)} is not installed: run npm ci first`)
  }
  const sourceCss = readFileSync(SOURCE_CSS, 'utf8')
  const all = readRules(sourceCss)
  const used = scanSources()
  const unknown = [...used].filter(([name]) => !all.has(name))
  if (unknown.length) {
    const version = JSON.parse(readFileSync(path.join(PACKAGE_DIR, 'package.json'), 'utf8')).version
    throw new Error(
      `not Tabler icons (Tabler ${version}); fix the name where it is written:\n` + unknown.map(([name, where]) => `  ${name}  ${where}`).join('\n'),
    )
  }
  const names = [...used.keys()].sort()
  if (names.length === 0) throw new Error('no ti-* class name found under src/')

  const banner = sourceCss.match(/^\/\*![\s\S]*?\*\//)?.[0].replace(/\s*\*\/$/, '')
  const base = sourceCss.match(/\.ti\{[^}]*\}/)?.[0]
  if (!banner || !base) throw new Error(`${rel(SOURCE_CSS)} does not look like the Tabler stylesheet (no banner or no .ti rule)`)

  const { tables, glyphs, codes } = subsetTables(readFileSync(SOURCE_TTF), [...new Set(names.map((name) => all.get(name)))])
  const font = writeWoff2(tables)
  const css =
    [
      `${banner}\n *\n * Subset: the ${names.length} icons src/ uses, generated by scripts/subset-icons.mjs (npm run icons).\n * Do not edit by hand: write the icon's class name in src/ and run the script again.\n */`,
      // font-display: block: a glyph never shows as its private-use code point or a fallback box while the file
      // loads. src/main.tsx preloads the file, so it is there for the first render.
      `@font-face{font-family:"tabler-icons";font-style:normal;font-weight:400;font-display:block;src:url("./${OUT_FONT}") format("woff2")}`,
      base,
      ...names.map((name) => `.${name}:before{content:"\\${all.get(name).toString(16)}"}`),
    ].join('\n') + '\n'

  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(path.join(OUT_DIR, OUT_FONT), font)
  writeFileSync(path.join(OUT_DIR, OUT_CSS), css)

  const fullFont = statSync(path.join(PACKAGE_DIR, 'dist/fonts/tabler-icons.woff2')).size
  console.log(`icons: ${names.length} icons (of ${all.size} in the package), ${glyphs} glyphs, ${codes} code points`)
  console.log(`  ${rel(path.join(OUT_DIR, OUT_FONT))}  ${kB(font.length)}  (package woff2: ${kB(fullFont)})`)
  console.log(`  ${rel(path.join(OUT_DIR, OUT_CSS))}  ${kB(Buffer.byteLength(css))}  (package stylesheet: ${kB(Buffer.byteLength(sourceCss))})`)
}

function check() {
  const cssFile = path.join(OUT_DIR, OUT_CSS)
  const fontFile = path.join(OUT_DIR, OUT_FONT)
  if (!existsSync(cssFile) || !existsSync(fontFile)) {
    console.error(`icons: ${rel(OUT_DIR)} has no subset yet. Run: npm run icons`)
    return 1
  }
  const subset = readRules(readFileSync(cssFile, 'utf8'))
  const codes = readWoff2Codes(readFileSync(fontFile))
  const used = scanSources()
  const lacking = [...used].filter(([name]) => !subset.has(name))
  const hollow = [...subset].filter(([, code]) => !codes.has(code))
  const unused = [...subset.keys()].filter((name) => !used.has(name))
  if (lacking.length) {
    console.error(`icons: src/ uses ${lacking.length} icon class${lacking.length > 1 ? 'es' : ''} the subset lacks (it would render as nothing):`)
    for (const [name, where] of lacking) console.error(`  ${name}  ${where}`)
  }
  if (hollow.length) {
    console.error(`icons: ${OUT_CSS} names ${hollow.length} icon(s) ${OUT_FONT} has no glyph for: ${hollow.map(([name]) => name).join(', ')}`)
  }
  if (lacking.length || hollow.length) {
    console.error('Run: npm run icons   (then commit src/assets/icons/)')
    return 1
  }
  if (unused.length) {
    console.log(`icons: ${unused.length} icon(s) in the subset are no longer used (${unused.join(', ')}); npm run icons drops them.`)
  }
  console.log(`icons: ok, the ${used.size} icon classes src/ uses are in the subset.`)
  return 0
}

try {
  const args = process.argv.slice(2)
  const unknownArg = args.find((arg) => arg !== '--check')
  if (unknownArg) throw new Error(`unknown argument ${unknownArg} (usage: node scripts/subset-icons.mjs [--check])`)
  if (args.includes('--check')) process.exitCode = check()
  else generate()
} catch (error) {
  console.error(`icons: ${error.message}`)
  process.exitCode = 1
}
