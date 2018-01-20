<template lang="pug">
div.clickable
  button(v-show="false")
  div.slot
    slot
</template>

<script>
import RippleMixin from '~/mixins/ripple'

export default {
  mixins: [RippleMixin]
}
</script>

<style lang="sass" scoped>
  .clickable, .slot
    position: relative
  .clickable
    display: inline-block
  button
    display: none
</style>
