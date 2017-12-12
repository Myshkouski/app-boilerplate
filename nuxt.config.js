const { set } = require('lodash')
const { writeFileSync } = require('fs')

const babel = {
  presets: [
    'vue-app',
    'env'
  ],

  plugins: [
    //modules
    "transform-es2015-modules-commonjs",
    "add-module-exports",

    //syntax
    "transform-object-rest-spread"
  ]
}

module.exports = {
  srcDir: 'src/',
  plugins: [
    '~/plugins/bootstrap',
    '~/plugins/filters'
  ],
  build: {
    babel,
    extend(config, { isClient }) {
      const mainFields = ['module', 'main']
      if(isClient) {
        mainFields.unshift('browser')
      }
      // set(config, 'resolve.mainFields', mainFields)
      // console.log(config.module.rules[0].options)
    }
  }
}
