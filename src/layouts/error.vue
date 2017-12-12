<template lang="pug" src="~/assets/markup/layouts/error.pug"></template>

<script>
// import TreeVue from 'treevue'

export default {
	components: {
		// 'v-tree': TreeVue
	},
	props: ['error'],
	data() {
    return {
      ui: {
        drawer: false,
        nav: [ {
            name: 'Tickers',
            icon: 'trending_up',
            href: '/tickers'
          },
          {
            name: 'Account',
            icon: 'person',
            href: '/account'
          }
        ].map( ( item, index ) => Object.assign( item, {
          index
        } ) )
      }
    }
  }
}
</script>
