const bootstrapSassAbstractsImports = require('vue-cli-plugin-bootstrap-vue/sassAbstractsImports.js')
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: bootstrapSassAbstractsImports.join('\n')
      },
      scss: {
        additionalData: [...bootstrapSassAbstractsImports, ''].join(';\n')
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    host: 'localhost',
    port: 4000,
    public: '0.0.0.0:4000',
    https: false
  },
  publicPath: '/'
}
