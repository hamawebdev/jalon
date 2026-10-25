import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  // GitHub Pages serves the preview under /<repo>/: the workflows set BASE_PATH (local builds and the custom domain
  // stay at /). Absolute URLs (canonical, hreflang, og:image, sitemap) always use the client's domain instead.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    // The client build writes dist/.vite/manifest.json: scripts/prerender.mjs reads it for each page's preloads,
    // then removes it.
    manifest: !isSsrBuild,
  },
}))
