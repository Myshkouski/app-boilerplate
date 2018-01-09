<template lang="pug">
  div
    //- p {{ ripples.length }}
    //- p {{ ripples }}
    div.wrapper
      v-button.button.rippled
</template>

<script>
import Clickable from '~/components/clickable'

export default {
  components: {
    'v-button': Clickable
  }
}
</script>

<style lang="sass" scoped>
  /deep/ .ripple
    transition-duration: 500ms

    &.faded
      background-color: gray
    &.active
      background-color: rgb(80, 221, 80)
      opacity: 0

  .button
    box-shadow: 2px 2px 20px 2px gray
    border-radius: 2px

  .button
    position: relative
    width: 100px
    height: 40px
    background-color: rgba(0, 0, 0, .1)
</style>
