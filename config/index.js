// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../managebyb/index.html'),
        assetsRoot: path.resolve(__dirname, '../managebyb'),
        assetsSubDirectory: '',
        assetsPublicPath: '',
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8085,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/webyb': {
                // target: 'http://we818.com',
                target: 'http://139.224.207.42',
                changeOrigin: true,
                pathRewrite: {
                  '^/webyb': '/webyb'
                }
            }
        },
        cssSourceMap: false
    }
}
