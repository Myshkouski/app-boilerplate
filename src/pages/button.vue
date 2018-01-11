<template lang="pug">
  div
    div.wrapper
      clickable.button.rippled
</template>

<script>
import Clickable from '~/components/clickable'

export default {
  components: {
    'clickable': Clickable
  }
}
</script>

<style lang="sass" scoped>
  /deep/
    .ripple
      transition-duration: 20s
      max-width: 20px
      &.cancelled
        background-color: red
        opacity: 0

  .wrapper
    padding: 50px

  .button
    box-shadow: 2px 2px 10px 2px gray
    border-radius: 2px

  .button
    position: relative
    width: 100px
    height: 40px
    background-color: rgba(0, 0, 0, .1)
</style>
