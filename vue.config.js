const WorkboxPlugin = require('workbox-webpack-plugin')
const { resolve } = require('path')
const apiMocker = require('webpack-api-mocker')

function createPlugin() {
  return [
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      importWorkboxFrom: 'local',
      importsDirectory: 'wb-assets',
      runtimeCaching: [
        {
          urlPattern: /\.(html)$/,
          handler: 'networkFirst' // 请求优先
        },
        {
          urlPattern: /\.(js|css)$/,
          handler: 'staleWhileRevalidate' // 先缓存并且后台更新
        },
        {
          urlPattern: /\.(png|jpg|jpeg|svg|gif|woff|woff2|ttf|eot)$/,
          handler: 'cacheFirst' // 缓存优先
        }
      ]
    })
  ]
}

module.exports = {
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map', // 需要调试则的打开注释
    output: {
      jsonpFunction: 'j'
    },
    plugins: process.env.NODE_ENV === 'production' ? createPlugin() : [],
    entry: {
      app: resolve('src/main.js')
    }
  },
  // 代理配置
  devServer: {
    before(app) {
      apiMocker(app, resolve(__dirname, './mock/index.js'))
    }
  }
}
