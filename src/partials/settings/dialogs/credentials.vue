<template lang="pug">
v-dialog(lazy scrollable :full-width="$vuetify.breakpoint.name == 'xs'" :value="show" @input="$emit('update:show', false)")
  v-card
    v-card-title.headline Credentials
    v-card-text
      v-text-field(label="key" :value="credentials.key")
      v-text-field(label="secret" :value="credentials.secret")
    v-card-actions
      v-btn(flat @click.native="$emit('update:show', false)") Save
      v-btn(flat @click.native="$emit('update:show', false)") Close
</template>

<script>
export default {
  props: ['show', 'credentials'],

  data() {
    return {

    }
  }
}
</script>
