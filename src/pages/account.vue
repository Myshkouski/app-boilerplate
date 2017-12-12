<template lang="pug">
div.tile.is-ancestor
  div.tile.is-parent.is-3.is-vertical
    div.tile.is-child
      p One
    div.tile.is-child
      p Two
  div.tile.is-parent.is-9
    div.tile.is-child
      p One
    div.tile.is-child
      p Two
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
