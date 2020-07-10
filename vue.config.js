module.exports = {
  // chainWebpack: config => {
  //   config.rules[
  //     {
  //       test: /\.sass$/,
  //       loaders: ['style', 'css', 'sass']
  //     }
  //   ]
  // },
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8088,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://47.93.35.179:8080',
        // target: 'http://47.93.89.177:8080',
        // target: 'http://192.168.1.120:8080',
        ws: true,
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map'
  }
}
