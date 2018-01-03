export default {
  props: ['error'],

  head() {
    return {
      titleTemplate(titleChunk) {
        let trailer = ''
        try {
          trailer = ' - ' + this.$store.state.location.host
        } catch(err) {
          console.error(err)
        }

        return (titleChunk || '<Default title>') + trailer
      },
  		meta: [
  			{ charset: 'utf8' },
  			{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  		]
    }
	},
  data() {
    return {
      ui: {
        drawer: false,
        nav: [{
            text: 'Dashboard',
            icon: 'home',
            to: '/dashboard'
          }, {
            text: 'Tickers',
            icon: 'trending_up',
            to: '/tickers'
          },
          {
            text: 'Settings',
            icon: 'settings',
            to: '/settings'
          }
        ]
      }
    }
  },

  methods: {
    updateAction() {
      console.log('updateAction()')
    }
  }
}
