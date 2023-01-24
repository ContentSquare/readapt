const fs = require('fs')
const path = require('path')
const homedir = require('os').homedir()
const CopyPlugin = require('copy-webpack-plugin')

const getDevServer = () => {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  let devServer = {}
  try {
    const certs = {
      key: fs.readFileSync(path.resolve(`${homedir}/.office-addin-dev-certs/localhost.key`)),
      cert: fs.readFileSync(path.resolve(`${homedir}/.office-addin-dev-certs/localhost.crt`)),
      ca: fs.readFileSync(path.resolve(`${homedir}/.office-addin-dev-certs/ca.crt`))
    }
    devServer = {
      port: 3000,
      https: true,
      server: {
        type: 'https',
        options: certs
      }
    }
  } catch (e) {
    console.error('No certs found!!')
  }

  return devServer
}

const getConfigureWebpack = () => {
  const prod = process.env.NODE_ENV === 'production'
  const urlDev = 'https://localhost:3000'
  // https://render.com/docs/environment-variables
  const urlProd =
    process.env.IS_PULL_REQUEST === 'true' || !process.env.READAPT_MSWORD_URL ? process.env.RENDER_EXTERNAL_URL : process.env.READAPT_MSWORD_URL

  return {
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: 'manifest*.xml',
            to: '[name][ext]',
            transform(content) {
              if (!prod || !urlProd) {
                return content
              }
              return content.toString().replace(new RegExp(urlDev, 'g'), urlProd)
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
  devServer: getDevServer(),
  chainWebpack(config) {
    config.plugin('html').tap((args) => {
      args[0].title = 'Readapt by Contentsquare Foundation'
      return [...args]
    })
  }
}
