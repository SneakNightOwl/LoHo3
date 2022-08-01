const path = require('path');
// const mock = require('./mock/index.js');
// const { defineConfig } = require('@vue/cli-service');
const port = process.env.port || process.env.npm_config_port || 8080;
// module.exports = defineConfig({
  module.exports = { 
  // transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    port: port,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        //  接口请求路径
        target: 'http://localhost:8080', //反向代理的目标地址
        changeOrigin: true,
      },
    },
    // proxy:{
    //   [process.env.VUE_APP_BASE_API]: {
    //     target: `http://localhost:${port}/mock`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_API]: ''
    //     }
    //   }
    // },
    after:require('./mock/mock-server.js') //webpack 4.x的写法
    // setupMiddlewares:require('./mock/index') //5.x的写法
  },
// });
  }
  