import head from './head'

export default {
  head,
  data() {
    return {
      ui: {
        nav: [{
            name: 'Tickers',
            icon: 'trending_up',
            to: '/tickers'
          },
          {
            name: 'Account',
            icon: 'person',
            to: '/account'
          }
        ]
      }
    }
  }
}
