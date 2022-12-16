const CopyPlugin = require('copy-webpack-plugin')
const pkg = require('./package.json')

const getConfigureWebpack = () => {
  return {
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: '../../packages/visual-engine/dist/readapt-visual-engine.browser.js',
            to: 'scripts/readapt-visual-engine.browser.js'
          },
          {
            from: 'manifest.json',
            to: 'manifest.json',
            transform(content) {
              const manifest = JSON.parse(content)
              manifest.version = pkg.version
              return JSON.stringify(manifest, null, 2)
            }
          }
        ]
      })
    ]
  }
}

module.exports = {
  lintOnSave: false,
  configureWebpack: getConfigureWebpack(),
  productionSourceMap: process.env.NODE_ENV !== 'production',
  pages: {
    index: {
      entry: 'src/main/ui.ts',
      title: 'Readapt by Contentsquare Foundation'
    }
  }
}
