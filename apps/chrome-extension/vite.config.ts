import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { type UserConfig, defineConfig } from 'vite'
import type { InlineConfig } from 'vitest'
import vue2 from '@vitejs/plugin-vue2'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import pkg from './package.json'

interface VitestConfigExport extends UserConfig {
  test: InlineConfig
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
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
    __VERSION__: pkg.version
  },
  optimizeDeps: {
    // TODO: try to provide ESM and remove the optimizeDeps
    include: ['@readapt/shared-components', '@readapt/text-engine']
  },
  build: {
    emptyOutDir: false,
    commonjsOptions: {
      transformMixedEsModules: true,
      // TODO: try to provide ESM and remove commonjsOptions
      include: [/shared-components/, /text-engine/, /dictionaries/, /node_modules/]
    }
  },
  test: {
    setupFiles: [path.resolve(__dirname, './vitest.setup.ts')],
    globals: true,
    environment: 'happy-dom'
  },
  resolve: {
    // change config
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
} as VitestConfigExport)
