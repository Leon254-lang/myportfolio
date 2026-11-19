import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const pagesRoot = fileURLToPath(new URL('./src/pages', import.meta.url))
const assetsRoot = fileURLToPath(new URL('./src/assets', import.meta.url))
const distRoot = fileURLToPath(new URL('./dist', import.meta.url))

export default defineConfig({
  root: pagesRoot,
  publicDir: assetsRoot,
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
  build: {
    outDir: distRoot,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./src/pages/index.html', import.meta.url)),
        'portfolio-details': fileURLToPath(
          new URL('./src/pages/portfolio-details.html', import.meta.url),
        ),
        'service-details': fileURLToPath(
          new URL('./src/pages/service-details.html', import.meta.url),
        ),
        'starter-page': fileURLToPath(
          new URL('./src/pages/starter-page.html', import.meta.url),
        ),
        privacy: fileURLToPath(new URL('./src/pages/privacy.html', import.meta.url)),
        terms: fileURLToPath(new URL('./src/pages/terms.html', import.meta.url)),
        '404': fileURLToPath(new URL('./src/pages/404.html', import.meta.url)),
      },
    },
  },
})
