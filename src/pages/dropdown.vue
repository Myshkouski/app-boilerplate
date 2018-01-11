<template lang="pug">
  div.wrapper
    p Wrapper
    div.button
    div.dropdown
      slot
</template>

<script>
import style from '~/assets/style/vars.sass'

console.log(style)

export default {
  data() {
    return {
      show: true
    }
  }
}
</script>

<style lang="sass" scoped>
  .button, .dropdown
    width: 200px
    height: 40px

  .dropdown
    overflow: hidden
</style>
