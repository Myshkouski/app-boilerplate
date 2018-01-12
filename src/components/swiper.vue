<template lang="pug">
div.root(
  ref="wrapper"
  )
  div.wrapper
    slot
</template>

<script>
// import Touchable from '~/components/touchable' 
export default {

}
</script>

<style lang="sass" scoped>
  .root, .wrapper
    position: relative

  .wrapper
    top: 0
    bottom: 0
    left: 0
    right: 0
    transform-style: preserve-3d
</style>
