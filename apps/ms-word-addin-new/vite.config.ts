import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { type UserConfig, defineConfig } from 'vite'
import type { InlineConfig } from 'vitest'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'

interface VitestConfigExport extends UserConfig {
  test: InlineConfig
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    __VERSION__: `"${pkg.version}"`,
    __MATOMO_URL__: `"${process.env.VUE_APP_MATOMO_URL}"`
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
  }
} as VitestConfigExport)
