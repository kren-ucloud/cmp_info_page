const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //publicPath: '/cmp_info_page_deploy',
  transpileDependencies: true,
  devServer: {
    allowedHosts: "all"
  }
})
