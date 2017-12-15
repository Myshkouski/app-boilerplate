<template lang="pug">
v-app
	v-toolbar.hidden-lg-and-up.gray.lighten-1(fixed app)
		//- v-toolbar-side-icon.hidden-md-and-down(@click.stop="ui.drawer = !ui.drawer")
			v-icon mdi-menu
		v-toolbar-title Application
	v-navigation-drawer#drawer.hidden-md-and-down.gray.lighten-1(
		fixed
		touchless
		app
	)
		v-list(dense)
			v-toolbar.gray.lighten-1()
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
		nuxt
	//- v-toolbar.hidden-lg-and-up.green.lighten-2(fixed app)
	//- 	//- v-toolbar-side-icon.hidden-md-and-down(@click.stop="ui.drawer = !ui.drawer")
	//- 		v-icon mdi-menu
	//- 	v-toolbar-title
	//- v-navigation-drawer#drawer.hidden-md-and-down.green.lighten-2(
	//- 	fixed
	//- 	touchless
	//- 	app
	//- )
	//- 	v-list(dense)
	//- 		v-toolbar.green.lighten-2()
	//- 			v-toolbar-title Application
	//- 			v-spacer
	//- 			v-avatar
	//- 				v-icon person
	//- 		v-list-tile(v-for="nav in ui.nav" :key="nav.index" :to="nav.href")
	//- 			v-list-tile-action
	//- 				v-icon {{ nav.icon }}
	//- 			v-list-tile-content
	//- 				v-list-tile-title
	//- 					span {{ nav.name }}
	//- v-content
	//- 	nuxt
	//- v-bottom-nav.green.lighten-2.hidden-lg-and-up(fixed app :value="true" )
	//- 	v-btn(v-for="nav in ui.nav" :key="nav.index" :to="nav.href" flat color="gray")
	//- 		span {{ nav.name }}
	//- 		v-icon {{ nav.icon }}
	//- //- v-footer.black(app)
</template>

<script>
export default {
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
            name: 'Settings',
            icon: 'settings',
            href: '/settings'
          }
        ]
      }
    }
  }
}
</script>

<style lang="styl" src="vuetify/src/stylus/main.styl"></style>
<style src="buefy/lib/buefy.css"></style>
<style lang="sass">
.navbar
	background-color: rgba(0, 0, 0, .2)
</style>
<style src="~/assets/style/icons.css"></style>
<!-- <style lang="styl" src="vuetify/src/stylus/bootstrap.styl"></style> -->
<style lang="sass">
html
	overflow-y: auto

#drawer
	min-height: 100vh
</style>
