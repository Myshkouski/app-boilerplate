module.exports = {
  srcDir: 'src/',
  plugins: [
    '~/plugins/vuetify'
  ],
  build: {
    extend( config ) {
      function isCssLoader( rule ) {
        if ( rule.loader == 'css-loader' ) {
          return rule
        }
      };

      function useCssRule( rule ) {
        if ( rule.use ) {
          return rule.use.find( isCssLoader )
        }
      }

      function isCssRule( rule ) {
        return isCssLoader( rule ) || useCssRule( rule )
      }

      config.module.rules.forEach( rule => {
        const cssLoader = isCssRule( rule )
        if ( cssLoader ) {
          // cssLoader.options.url = false
          // cssLoader.options.import = false
        }
      } )
    }
  }
}
