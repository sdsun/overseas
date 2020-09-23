const path = require('path');

module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        prependData:`@import "./src/assets/css/_variable.scss";`
      }
    }
  },
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'element-ui': 'ElementUI',
      'moment': 'moment'
    }
  },
  productionSourceMap: false,
  devServer: {
    port: '9000',
    // proxy: {
    //   '/api': {
    //     target: 'http://39.100.103.122:8000',
    //     changeOrigin: true,
    //   }
    // }
  }
}
