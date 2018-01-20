<template lang="pug">
  div.box
    swiper
</template>

<script>
import SwiperComponent from '~/components/swiper'
export default {
  components: {
    swiper: SwiperComponent
  }
}
</script>

<style lang="sass" scoped>
  .box
    display: flex

  .wrapper
    position: relative
    width: 300px
    height: 300px
    margin: auto
    background-color: gray
    transform-style: preserve-3d

  .tracker
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    margin-top: -5px
    margin-left: -5px
    width: 10px
    height: 10px
    border-radius: 50%
    background-color: red
</style>
