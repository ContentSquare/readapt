/// <reference types="vite/client" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type LibraryOptions } from 'vite'
import dotenv from 'dotenv'

dotenv.config()

const ENTRIES: Record<string, LibraryOptions> = {
  background: {
    entry: fileURLToPath(new URL('./src/app/background/index.ts', import.meta.url)),
    formats: ['iife'],
    name: 'background',
    fileName: 'scripts/background'
  },
  contentscript: {
    entry: fileURLToPath(new URL('./src/app/contentScript/index.ts', import.meta.url)),
    formats: ['iife'],
    name: 'contentScript',
    fileName: 'scripts/contentScript'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __MATOMO_URL__: `"${process.env.VUE_APP_MATOMO_URL}"`,
    __MATOMO_SITEID__: `"${process.env.VUE_APP_MATOMO_SITEID}"`
  },
  build: {
    emptyOutDir: false,
    commonjsOptions: {
      transformMixedEsModules: true,
      // TODO: try to provide ESM and remove commonjsOptions
      include: [/shared-components/, /text-engine/, /dictionaries/, /node_modules/]
    },
    lib: ENTRIES[process.env.ENTRY as 'string']
  },
  resolve: {
    // change config
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
