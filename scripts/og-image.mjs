#!/usr/bin/env node
// Renders scripts/og-image.html to public/og.png (1200 × 630) with headless Chrome (google-chrome on the PATH).
// Not part of the build: run it by hand after changing the template.
//   node scripts/og-image.mjs [--out public/og.png]
import { spawn } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const OUT = path.resolve(ROOT, args.includes('--out') ? args[args.indexOf('--out') + 1] : 'public/og.png')
const work = mkdtempSync(path.join(tmpdir(), 'og-image-'))
const page = path.join(work, 'og.html')
writeFileSync(
  page,
  readFileSync(path.join(ROOT, 'scripts/og-image.html'), 'utf8').replaceAll(
    '{{NODE_MODULES}}',
    pathToFileURL(path.join(ROOT, 'node_modules')).href,
  ),
)

const chrome = spawn(
  'google-chrome',
  ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    '--remote-debugging-port=0', `--user-data-dir=${path.join(work, 'profile')}`, 'about:blank'],
  { stdio: ['ignore', 'ignore', 'pipe'] },
)
try {
  const wsUrl = await new Promise((resolve, reject) => {
    let buffer = ''
    setTimeout(() => reject(new Error('google-chrome did not start')), 20000)
    chrome.stderr.on('data', (data) => {
      buffer += data
      const match = buffer.match(/ws:\/\/\S+/)
      if (match) resolve(match[0])
    })
  })
  const targets = await (await fetch(`http://127.0.0.1:${new URL(wsUrl).port}/json`)).json()
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl)
  await new Promise((resolve) => (ws.onopen = resolve))
  let id = 0
  const waiting = new Map()
  ws.onmessage = (message) => {
    const data = JSON.parse(message.data)
    if (data.id) waiting.get(data.id)?.(data)
  }
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      waiting.set(++id, resolve)
      ws.send(JSON.stringify({ id, method, params }))
    })
  await send('Page.enable')
  await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: pathToFileURL(page).href })
  await new Promise((resolve) => setTimeout(resolve, 1500))
  await send('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true })
  const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } })
  writeFileSync(OUT, Buffer.from(shot.result.data, 'base64'))
  ws.close()
  console.log(`og-image: ${path.relative(ROOT, OUT)} written (1200 × 630).`)
} finally {
  chrome.kill('SIGKILL')
  rmSync(work, { recursive: true, force: true })
}
