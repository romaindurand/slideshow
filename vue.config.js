module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /color-thief/,
          use: [ 'script-loader' ]
        }
      ]
    }
  }
}
