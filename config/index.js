'use strict'
const path = require('path')

module.exports = {

  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/wf-admin-ele': {
        //target: 'http://192.166.24.46:9001',//后端接口地址
        target: 'http://localhost:8081',//后端接口地址
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/wf-admin-ele': '/wf-admin-ele',//重写,
        }
      }
    },
    // 本地开发使用
    host: 'localhost',
    port: 8080,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'cheap-source-map',
    cssSourceMap: false
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    productionSourceMap: false,
    devtool: 'source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report || false,
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  }
}
