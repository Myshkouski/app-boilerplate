<template lang="pug">
v-container
  v-layout
    v-flex
      v-list
        v-subheader Data
        nuxt-link(append to='/settings/api')
          v-list-tile
            v-list-tile-content
              v-list-tile-title API
</template>

<script>
import * as exmo from '~/api/exmo'

export default {
  data() {
    return {
      user: null
    }
  },

  methods: {
    onIdChange( id ) {
      this.$store.commit( 'id', id )
    },
    onSecretChange( secret ) {
      this.$store.commit( 'secret', secret )
    },
    loadAccountInfo() {
      const {
        id: key,
        secret
      } = this.$store.state.credentials

      return exmo.user( {
        key,
        secret
      } ).then( res => {
        this.user = res
      } ).catch( console.error )
    }
  }
}
</script>

<style lang="sass">
.column, .tile
  border: 1px dashed
</style>
