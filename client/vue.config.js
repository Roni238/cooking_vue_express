const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  // outputDir:path.resolve('/var/www/public'),,
  devServer:{
    proxy:{
      '/api':{
        target:'localhost:5000'
      }
    }
  },  
})
