<template lang="pug">
v-dialog(lazy scrollable :full-width="$vuetify.breakpoint.name == 'xs'" :value="show" @input="$emit('update:show', false)")
  v-card
    v-card-title.headline Credentials
    v-card-text
      v-text-field(label="key" :value="getCredentials().key" @change="setCredentials({ key: $event })")
      v-text-field(label="secret" :value="getCredentials().secret" @change="setCredentials({ secret: $event })")
    v-card-actions
      v-btn(flat @click.native="$emit('update:show', false)") Save
      v-btn(flat @click.native="$emit('update:show', false)") Close
</template>

<script>
export default {
  props: {
    'show': {
      type: Boolean
    },
    'id': {
      required: true
    }
  },

  // computed: {
  //   credentials: {
  //     get() {
  //       const c = this.$store.getters.credentials(this.id)
  //       console.warn(c)
  //       return (this.id && c) || {}
  //     },
  //     set(credentials) {
  //       this.$store.commit('credentials', { id: this.id, credentials })
  //     }
  //   }
  // },

  methods: {
    getCredentials() {
      return (this.id && this.$store.getters.credentials(this.id)) || {}
    },
    setCredentials(credentials) {
      this.$store.commit('credentials', { id: this.id, credentials: Object.assign({}, this.getCredentials(), credentials) })
    },
    close() {
      this.$emit('update:show', false)
    }
  }
}
</script>
