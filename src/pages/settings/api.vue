<template lang="pug">
v-layout
  v-flex
    v-list
      v-subheader Providers
      //- v-list-tile
        v-list-tile-content
          v-list-tile-title API
      v-list-tile(v-for="provider in providers")
        v-list-tile-content
          v-list-tile-sub-title {{provider.name | camelcase }}
          v-container
            v-layout
              v-flex
                v-switch(v-model="provider.active")
</template>

<script>
import { mapGetters } from 'vuex'
import querySchema from '~/schemas/query'

export default {
  data() {
    return {
      providers: [{
        name: 'cex',
        active: false
      }, {
        name: 'exmo',
        active: false
      }],
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
