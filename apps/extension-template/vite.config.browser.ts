import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import { type UserConfig, defineConfig } from 'vite'
import type { InlineConfig } from 'vitest'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import pkg from './package.json'

interface VitestConfigExport extends UserConfig {
  test: InlineConfig
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'webextension-polyfill': [['*', 'browser']]
        }
      ]
    }),
    viteStaticCopy({
      targets: [
        {
          // TODO: try to refactor this copying to normal building
          src: '../../packages/visual-engine/dist/readapt-visual-engine.browser.js',
          dest: 'scripts'
        },
        {
          src: 'manifest.json',
          dest: '.',
          transform(content) {
            const manifest = JSON.parse(content)
            manifest.version = process.env.npm_package_version
            return JSON.stringify(manifest, null, 2)
          }
        }
      ]
    })
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
