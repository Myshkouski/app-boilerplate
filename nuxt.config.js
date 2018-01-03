const set = require('lodash.set')

module.exports = {
  srcDir: 'src/',
  plugins: [
    '~/plugins/bootstrap',
    '~/plugins/filters',
    '~/plugins/storage',
    '~/plugins/location'
  ],
  build: {
    extend(config) {
      config.resolve.mainFields = ['module', 'main']
      if(config.isClient) {
        mainFields.unshift('browser')
      }

      config.module.rules.push({
        test: /\.json$/,
        loader: 'json-loader'
      })

      config.resolve.extensions.push('.yaml')
      config.resolve.extensions.push('.yml')
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: [
          'json-loader',
          'yaml-loader'
        ]
      })
    }
  }
}
