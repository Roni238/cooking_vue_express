const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  outputDir:path.resolve(__dirname,'../server/public'),
  devServer:{
    proxy:{
      '/api':{
        target:'http://localhost:5000'
      }
    }
  },  

  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/scss/_variables.scss";`
      }
    }
  }
})
