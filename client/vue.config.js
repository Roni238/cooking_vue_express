const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  // outputDir:path.resolve('../var/www/dist'),
  devServer:{
    proxy:{
      '/api':{
        target:'localhost:5000'
      }
    }
  },  
})
