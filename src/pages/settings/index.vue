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
      v-divider
      v-subheader API Providers
      v-list-tile(v-for="(provider, index) in providers" :key="index" @click="ui.providerIndex=index;ui.dialog=true")
        v-list-tile-content
          v-list-tile-title {{ provider.name | camelcase }}
          v-list-tile-sub-title {{ provider.url }}
        v-list-tile-action(@click.stop="")
          v-switch(v-model="provider.active")
      v-list-tile
        input(v-model="hello")
  credentials-dialog(:show.sync="ui.dialog" :credentials="{key: 'key', secret: 'secret'}")
</template>

<script>
import * as exmo from '~/api/exmo'

export default {
  components: {
    'credentials-dialog': require('~/partials/settings/dialogs/credentials').default
  },

  computed: {
    'hello': {
      get() {
        return this.$localStorage ? this.$localStorage.get('hello') : null
      },
      set(value) {
        this.$localStorage.set('hello.world', value)
      }
    }
  },

  data() {
    return {
      ui: {
        dialog: false,
        providerIndex: null
      },
      providers: [{
        name: 'cex',
        active: false,
        url: 'exmo.com/api'
      }, {
        name: 'exmo',
        active: false,
        url: 'api.cex.com'
      }],
      input: {
        key: null,
        secret: null
      }
    }
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
