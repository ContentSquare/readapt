import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { type UserConfig, defineConfig } from 'vite'
import type { InlineConfig } from 'vitest'
import pkg from './package.json'
import vue from '@vitejs/plugin-vue'

interface VitestConfigExport extends UserConfig {
  test: InlineConfig
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
    // AutoImport({
    //   imports: [
    //     'vue',
    //     {
    //       'webextension-polyfill': [['*', 'browser']]
    //     }
    //   ]
    // }),
  ],
  define: {
    __VERSION__: `"${pkg.version}"`
  },
  optimizeDeps: {
    // TODO: try to provide ESM and remove the optimizeDeps
    include: ['@readapt/text-engine']
  },
  build: {
    emptyOutDir: false,
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
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // @see https://github.com/intlify/bundle-tools/issues/23
      'vue-i18n': process.env.NODE_ENV === 'production' ? 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js' : 'vue-i18n'
    }
  }
} as VitestConfigExport)
