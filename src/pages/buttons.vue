<template lang="pug">
div.root
  div
    div.button.rounded(v-for="className in classes" :class="className")
      span {{ className }}
  div
    div.button.circle(v-for="className in classes" :class="className")
      span {{ className }}
</template>

<script>
// import Touchable from '~/components/touchable'
export default {
  data() {
    return {
      classes: [
        'action',
        'accept',
        'info',
        'warning',
        'error'
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
  $ui-size-base: 20px

  $gray: #e1e1e1
  $green: #a0e1b0
  $blue: #8ab0e1
  $yellow: #ffd047
  $red: #ef6565

  =theme-color($color)
    background-color: $color
    border-color: $color

  =button-shadow($elevation, $color)
    &::before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: $color
      box-shadow: 0 0 + $elevation * $ui-size-base / 40 $ui-size-base / 10 * $elevation $ui-size-base / 10 * $elevation $color

  =button-radius($radius)
    border-radius: $ui-size-base * $radius / 2

  =button-scale($scale-width, $scale-height)
    width: $ui-size-base * $scale-width
    height: $ui-size-base * $scale-height

  .root, .wrapper
    position: relative

  .button
    position: relative
    display: inline-block
    width: 100px
    height: 40px

    &.action
      +theme-color($gray)

    &.info
      +theme-color($blue)

    &.accept
      +theme-color($green)

    &.warning
      +theme-color($yellow)

    &.error
      +theme-color($red)

    &.circle
      $scale: 3
      +button-radius($scale)
      +button-scale($scale, $scale)

    &.rounded
      $scale: 2
      +button-radius($scale / 5)
      +button-scale($scale * 2.5, $scale)
      +button-shadow(2, #ddd)
</style>
