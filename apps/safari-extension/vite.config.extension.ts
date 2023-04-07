import { defineConfig, mergeConfig } from 'vite'
import baseConfig from '../browser-extension-template/vite.config.extension'

export default defineConfig(
  mergeConfig(
    baseConfig,
    {
      root: '../browser-extension-template'
    },
    true
  )
)
