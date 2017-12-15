<template lang="pug">
v-layout
  v-flex.xs12.lg4
    v-card
      v-card-title(primary-title)
        p Enter your API credentials
      v-container
        span {{ user }}
        v-text-field(
          name="input-id"
          label="id"
          id="input-id"
          :value="credentials.key"
          @change="onIdChange"
        )
        v-text-field(
          name="input-secret"
          label="secret"
          id="input-secret"
          :value="credentials.secret"
          @change="onSecretChange"
        )
        v-btn(@click.stop="save") Save credentials
  p {{ provider }}
  p {{ $store.state }}
  p {{ credentials }}
</template>

<script>
import { mapGetters } from 'vuex'
import querySchema from '~/schemas/query'

export default {
  data() {
    return {
      input: {
        key: null,
        secret: null
      },
    }
  },
  // props: ['abc']
  computed: {
    // ...mapGetters(['credentials']),

    credentials() {
      return this.$store.getters.credentials(this.provider)
    },

    provider() {
      return this.$route.query[querySchema.credentials]
    }
  },

  methods: {
    save() {
      this.$store.commit('credentials', { [this.provider]: this.input })
    },

    loadAccountInfo() {
      const {
        id: key,
        secret
      } = this.credentials('exmo')

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

</style>
