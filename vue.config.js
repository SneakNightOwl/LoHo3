const path = require('path');
// const mock = require('./mock/index.js');
// const { defineConfig } = require('@vue/cli-service');
// const port = process.env.port || process.env.npm_config_port || 3000;
// module.exports = defineConfig({
  module.exports = { 
  // transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // port: port,
    proxy: {
      '/api': {
        //  接口请求路径
        target: 'http://localhost:3000', //反向代理的目标地址
        changeOrigin: true,
      },
    },
    before:require('./mock/mock-server.js') //webpack 4.x的写法
    // setupMiddlewares:require('./mock/index') //5.x的写法
  },
// });
  }
  