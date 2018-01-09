<template lang="pug">
div.root(@mousedown="$emit('mousedown', $event)")
  button
  slot
    div.content
</template>

<script>
import RippleMixin from '~/mixins/ripple'

export default {
  mixins: [RippleMixin]
}
</script>

<style lang="sass" scoped>
  .root
    cursor: pointer
  button
    display: none
</style>
