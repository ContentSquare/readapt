import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import pkg from './package.json'

const { env } = process

const HOME_DIRECTORY = os.homedir()
const IS_PRODUCTION = env.NODE_ENV === 'production'

const copyManifest = viteStaticCopy({
  targets: [
    {
      // TODO: try to refactor this copying to normal building
      src: '../../packages/visual-engine/dist/readapt-visual-engine.browser.js',
      dest: 'scripts'
    },
    {
      src: 'manifest*.xml',
      dest: '.',
      transform(content) {
        // @see https://render.com/docs/environment-variables
        const productionUrl = env.IS_PULL_REQUEST === 'true' || !env.READAPT_MSWORD_URL ? env.RENDER_EXTERNAL_URL : env.READAPT_MSWORD_URL
        if (!IS_PRODUCTION || !productionUrl) {
          return content
        }
        const DEVELOPMENT_URL = 'https://localhost:5173'
        return content.toString().replaceAll(DEVELOPMENT_URL, productionUrl)
      }
    }
  ]
})

const httpsConfigDevMode = {
  key: fs.readFileSync(path.resolve(`${HOME_DIRECTORY}/.office-addin-dev-certs/localhost.key`)),
  cert: fs.readFileSync(path.resolve(`${HOME_DIRECTORY}/.office-addin-dev-certs/localhost.crt`)),
  ca: fs.readFileSync(path.resolve(`${HOME_DIRECTORY}/.office-addin-dev-certs/ca.crt`))
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), copyManifest],
  define: {
    __VERSION__: `"${pkg.version}"`,
    __MATOMO_URL__: `"${env.VUE_APP_MATOMO_URL}"`
  },
  optimizeDeps: {
    // TODO: try to provide ESM and remove the optimizeDeps
    include: ['@readapt/text-engine']
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      // TODO: try to provide ESM and remove commonjsOptions
      include: [/text-engine/, /dictionaries/, /node_modules/]
    }
  },
  test: {
    setupFiles: [path.resolve(__dirname, './vitest.setup.ts')],
    globals: true,
    environment: 'jsdom'
  },
  resolve: {
    // change config
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    https: IS_PRODUCTION ? undefined : httpsConfigDevMode
  }
})
