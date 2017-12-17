<template lang="pug">
v-app
	v-toolbar.hidden-lg-and-up.green.lighten-2(fixed app)
		//- v-toolbar-side-icon.hidden-md-and-down(@click.stop="ui.drawer = !ui.drawer")
			v-icon mdi-menu
		v-toolbar-title Application
	v-navigation-drawer#drawer.hidden-md-and-down.green.lighten-2(
		fixed
		touchless
		app
	)
		v-list(dense)
			v-toolbar.green.lighten-2()
				v-toolbar-title Application
				v-spacer
				v-avatar
					v-icon person
			v-list-tile(v-for="nav in ui.nav" :key="nav.index" :to="nav.href")
				v-list-tile-action
					v-icon {{ nav.icon }}
				v-list-tile-content
					v-list-tile-title
						span {{ nav.name }}
	v-content
		v-container.column(fluid fill-height justify-center align-center)
			v-card
				v-card-title {{ error.statusCode }}
				v-expansion-panel.elevation-0
					v-expansion-panel-content
						div(slot="header")
							span Details
						p {{ error }}
						//- v-tree(v-model='error')
				v-btn.elevation-0(fab loading)
					v-icon home
	v-bottom-nav.green.lighten-2.hidden-lg-and-up(fixed app :value="true" )
		v-btn(v-for="nav in ui.nav" :key="nav.index" :to="nav.href" flat color="gray")
			span {{ nav.name }}
			v-icon {{ nav.icon }}
</template>

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

<style lang="styl" src="vuetify/src/stylus/main.styl"></style>
<style src="~/assets/style/icons.sass"></style>
<!-- <style lang="styl" src="vuetify/src/stylus/bootstrap.styl"></style> -->
<style lang="sass">
html
	overflow-y: auto

.column
	flex-direction: column

#drawer
	min-height: 100vh
</style>
