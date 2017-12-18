const { set } = require('lodash')

// const patchRules = (filter, key, value) => {
//   const rulesToPatch = this.filter(filter)
//
//   rulesToPatch.forEach(rule => {
//     set(rule, key, value)
//   })
// }
//
// const getLoaders = (rules, loaderRegexp) => {
//   let loaders = []
//
//   rules.forEach(rule => {
//     if(rule.loader && rule.loader.match(loaderRegexp)) {
//       loaders.push(rule)
//     } else if(rule.use) {
//       loaders = [...loaders, ...getLoaders(rule.use, loaderRegexp)]
//     }
//   })
//
//   return loaders
// }

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
      const mainFields = ['module', 'main']
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
