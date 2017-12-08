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
				v-btn(flat fab to="/account")
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
	v-bottom-nav.hidden-lg-and-up.white(fixed app :value="true" )
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

<style>
@import url("https://unpkg.com/vuetify@0.17.3/dist/vuetify.min.css");
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
</style>
<style lang="styl" src="vuetify/src/stylus/main.styl"></style>
<style lang="styl" src="vuetify/src/stylus/bootstrap.styl"></style>
<!-- <style lang="scss" src="mdi/scss/materialdesignicons.scss"></style> -->
<style lang="sass" scoped>
#drawer
	min-height: 100vh
</style>
