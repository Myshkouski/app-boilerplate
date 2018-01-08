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
        drawer: false
      },
      nav: [{
          title: 'Dashboard',
          icon: 'home',
          path: '/dashboard'
        }, {
          title: 'Tickers',
          icon: 'trending_up',
          path: '/tickers'
        }, {
          title: 'Cashback',
          icon: 'account_balance_wallet',
          path: '/cashback'
        }, {
          title: 'Settings',
          icon: 'settings',
          path: '/settings'
        }
      ]
    }
  },

  methods: {
    title() {
      const root = '/' + this.$route.path.split('/')[1] || ''
      const { title } = this.nav.find(item => item.path == root) || {}
      return title
    }
  }
}
