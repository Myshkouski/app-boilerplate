<template lang="pug">
v-container
  v-card
    span {{ user }}
    v-text-field(
      name="input-id"
      label="id"
      id="input-id"
      :value="$store.state.credentials.id"
      @change="onIdChange"
    )
    v-text-field(
      name="input-secret"
      label="secret"
      id="input-secret"
      :value="$store.state.credentials.secret"
      @change="onSecretChange"
    )
    v-btn(@click.stop="loadAccountInfo" color="green") Save credentials
    v-avatar
      v-icon person
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
