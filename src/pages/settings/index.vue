<template lang="pug">
v-layout
  v-flex.xs12.md6
    v-list(two-line)
      v-subheader General
      v-list-tile(avatar @click="")
        v-list-tile-avatar
          v-icon(x-large) person
        v-list-tile-content
          v-list-tile-title Account
          v-list-tile-sub-title Configure personal information
      v-list-tile(avatar @click="")
        v-list-tile-avatar
          v-icon(x-large) swap_horiz
        v-list-tile-content
          v-list-tile-title Endpoints
          v-list-tile-sub-title Configure API endpoints
      div(v-if="providers.length")
        v-divider
        v-subheader Endpoints
        v-list-tile(v-for="(provider, index) in providers" :key="index" @click="providerIndex=index;ui.dialog=true")
          v-list-tile-content
            v-list-tile-title {{ provider.name | camelcase }}
            v-list-tile-sub-title {{ provider.url }}
          v-list-tile-action(@click.stop.prevent="")
            v-switch(v-model="provider.active")

    credentials-dialog(:show.sync="ui.dialog" :id="provider.name")
</template>

<script>
import * as exmo from '~/api/exmo'
import Vue from 'vue'

export default {
  head() {
    return {
      title: 'Settings'
    }
  },

  components: {
    'credentials-dialog': require('~/partials/settings/dialogs/credentials').default
  },

  computed: {
    provider() {
      return this.providers[this.providerIndex] || {}
    }
  },

  data() {
    return {
      ui: {
        dialog: false
      },
      providerIndex: null,
      providers: [],
      input: {
        key: null,
        secret: null
      }
    }
  },

  watch: {
    providers: {
      handler(providers) {
        this.$store.commit('providers', providers)
      },
      deep: true
    }
  },

  mounted() {
    this.providers = this.$store.getters.providers || []
  },

  methods: {
    navigate(to, options) {
      const navigate = options
    },

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
