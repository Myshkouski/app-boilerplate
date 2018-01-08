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

  created() {
    this.$store.commit('timestamp', Date.now())
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
