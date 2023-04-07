import { defineConfig, mergeConfig } from 'vite'
import baseConfig from '../browser-extension-template/vite.config'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig(
  mergeConfig(
    baseConfig,
    {
      root: '../browser-extension-template',
      plugins: [
        viteStaticCopy({
          targets: [
            {
              // TODO: try to refactor this copying to normal building
              src: '../../packages/visual-engine/dist/readapt-visual-engine.browser.js',
              dest: 'scripts'
            },
            {
              src: '../firefox-addin/manifest.json',
              dest: '.',
              transform(content) {
                const manifest = JSON.parse(content)
                manifest.version = process.env.npm_package_version
                return JSON.stringify(manifest, null, 2)
              }
            }
          ]
        })
      ]
    },
    true
  )
)
