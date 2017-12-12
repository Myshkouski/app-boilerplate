const { writeFileSync } = require('fs')
const { set } = require('lodash')

const patchRules = (filter, key, value) => {
  const rulesToPatch = this.filter(filter)

  rulesToPatch.forEach(rule => {
    set(rule, key, value)
  })
}

const getLoaders = (rules, loaderRegexp) => {
  let loaders = []

  rules.forEach(rule => {
    if(rule.loader && rule.loader.match(loaderRegexp)) {
      loaders.push(rule)
    } else if(rule.use) {
      loaders = [...loaders, ...getLoaders(rule.use, loaderRegexp)]
    }
  })

  return loaders
}

module.exports = {
  srcDir: 'src/',
  plugins: [
    '~/plugins/bootstrap',
    '~/plugins/filters'
  ],
  build: {
    extend(config) {
      config.resolve.extensions.push('.yaml')
      config.module.rules.push({
        test: /\.ya?ml$/,
        loaders: [
          'json-loader',
          'yaml-loader'
        ]
      })

      // console.log(getLoaders(config.module.rules, /^css/))
    }
  }
}
