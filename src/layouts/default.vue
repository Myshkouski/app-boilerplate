<template lang="pug">
v-app(light)
  v-navigation-drawer.hidden-lg-and-up.orange.lighten-1(
    fixed
    v-model="ui.drawer"
    app
  )
    v-list(dense)
      v-list-tile(@click="")
        v-list-tile-action
          v-icon(dark) mdi-home
        v-list-tile-content
          v-list-tile-title
            span Home
      v-list-tile(@click="")
        v-list-tile-action
          v-icon mdi-contact-mail
        v-list-tile-content
          v-list-tile-title
            span Contact
  v-toolbar.orange.lighten-1(fixed app)
    v-toolbar-side-icon(@click.stop="ui.drawer = !ui.drawer")
      v-icon mdi-menu
    //- v-avatar.gray.lighten-1
      v-icon mdi-person
    v-toolbar-title Application
  v-content
    nuxt
  v-bottom-nav(absolute :value="true" :active.sync="ui.bottomNav.active" color="transparent")
    v-btn(flat color="gray" value="recent")
      span Recent
      v-icon mdi-history
    v-btn(flat color="gray" value="favorites")
      span Favorites
      v-icon mdi-heart
    v-btn(flat color="gray" value="nearby")
      span Nearby
      v-icon mdi-map-marker
  //- v-footer.black(app)
</template>

<script>
export default {
  data() {
    return {
      ui: {
        drawer: null,
        bottomNav: {
          active: null
        }
      }
    }
  }
}
</script>

<style lang="styl" src="vuetify/src/stylus/main.styl"></style>
<style lang="styl" src="vuetify/src/stylus/bootstrap.styl"></style>
<style lang="scss" src="mdi/scss/materialdesignicons.scss"></style>

<style lang="sass" scoped>
.app-layout
  overflow: auto
</style>
