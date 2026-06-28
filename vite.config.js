import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: './' → relative asset paths so the built bundle works on any
// static host (Cloudflare Pages, GitHub Pages project sites, etc.)
export default defineConfig({
  base: './',
  plugins: [react()],
})
