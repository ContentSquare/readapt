import { defineConfig, mergeConfig } from 'vite'
import baseConfig from '../extension-template/vite.config'

export default defineConfig(
  mergeConfig(
    baseConfig,
    {
      root: '../extension-template'
    },
    true
  )
)
