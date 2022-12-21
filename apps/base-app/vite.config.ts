/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    // TODO: try to provide ESM and remove the optimizeDeps
    include: ['@readapt/shared-components', '@readapt/text-engine']
  },
  plugins: [
    vue2(),
    legacy({
      targets: ['last 2 Chrome versions']
    })
  ],
  test: {
    alias: {
      vue: 'vue/dist/vue.runtime.mjs'
    },
    setupFiles: [path.resolve(__dirname, './vitest.setup.js')],
    globals: true
  },
  resolve: {
    // change config
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
