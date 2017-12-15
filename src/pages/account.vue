<template lang="pug">
v-container
  v-breadcrumbs
  nuxt-child
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
