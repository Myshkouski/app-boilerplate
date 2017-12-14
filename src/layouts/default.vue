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
	v-bottom-nav.hidden-lg-and-up(fixed app :value="true" )
		v-btn(v-for="nav in ui.nav" :key="nav.index" :to="nav.href" flat color="gray")
			span {{ nav.name }}
			v-icon {{ nav.icon }}
	//- v-footer.black(app)
</template>

<script>
export default {
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
#drawer
	min-height: 100vh
</style>
