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
    disableHostCheck: false,
    host: 'localhost',
    port: 4300,
    public: '0.0.0.0:4300',
    https: false
  },
  publicPath: '/'
}
