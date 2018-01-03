<template lang="pug">
v-container
  v-layout
    v-flex.xs12.md6
      v-list(two-line)
        v-list-tile(v-for="(p, index) in providers" :key="index")
          v-list-tile-content
            v-list-tile-title {{ p.name }}
            v-list-tile-sub-title {{ p.active }}
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
