<template lang="pug">
v-app
	v-navigation-drawer#drawer.hidden-md-and-down.gray.lighten-1(
		fixed
		touchless
		app
	)
		v-list(dense)
			v-list-tile(v-for="nav in ui.nav" :key="nav.index" :to="nav.href")
				v-list-tile-action
					v-icon {{ nav.icon }}
				v-list-tile-content
					v-list-tile-title
						span {{ nav.name }}
	v-content
		nuxt
	v-bottom-nav.green.lighten-2.hidden-lg-and-up(fixed app :value="true" )
		v-btn(v-for="nav in ui.nav" :key="nav.index" :to="nav.to" flat color="gray")
			span {{ nav.text }}
			v-icon {{ nav.icon }}
</template>

<script>
export default {
	head: {
		meta: [
			{ charset: 'utf8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
		]
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
  }
}
</script>

<!-- <style lang="styl" src="vuetify/src/stylus/main.styl"></style> -->

<!-- <style lang="styl" src="vuetify/src/stylus/bootstrap.styl"></style> -->

<style lang="stylus">
@require "~vuetify/src/stylus/main.styl"

.page
	@extend .fade-transition
</style>

<style src="~/assets/style/icons.sass"></style>
<style src="~/assets/style/fonts.sass"></style>

<style lang="sass">
html
	overflow-y: auto

#drawer
	min-height: 100vh

a
	color: inherit
	bor
</style>
