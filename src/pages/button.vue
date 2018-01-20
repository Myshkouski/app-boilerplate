<template lang="pug">
  div.box
    clickable.button
      span Button
</template>

<script>
import clickable from '~/components/clickable'

export default {
  components: {
    clickable
  },
  data() {
    return {
      mouse: {
        active: false,
        x: 0,
        y: 0
      },
      touch: []
    }
  }
}
</script>

<style lang="sass" scoped>
  /deep/
    .ripple
      background-color: rgba(0, 0, 0, .1)

  .button
    position: relative
    display: flex
    justify-content: center
    align-items: center
    margin: 100px
    padding: 5px 20px
    font-family: 'Open Sans', sans-serif
    font-size: 1em
    border-bottom: 1px solid gray
    overflow: hidden
</style>
