const { defineConfig } = require('@vue/cli-service')

// process.env.VUE_CLI_CSS_SHADOW_MODE = true

/**
 * These are some necessary steps changing the default webpack config of the Vue CLI
 * that need to be changed in order for TypeScript based components to generate their
 * declaration (.d.ts) files.
 * Solution proposed here https://github.com/vuejs/vue-cli/issues/1081#issuecomment-648805350
 */
module.exports = defineConfig({
  css: { extract: false },
  chainWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      config.module.rule('ts').uses.delete('cache-loader')
      config.module
        .rule('ts')
        .use('ts-loader')
        .loader('ts-loader')
        .tap((options) => ({
          ...options,
          transpileOnly: false,
          happyPackMode: false
        }))
    }

    config.merge({
      externals: ['vue', '@vue/composition-api', '@readapt/settings']
    })
  },
  parallel: false
})
