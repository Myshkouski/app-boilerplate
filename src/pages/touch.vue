<template lang="pug">
  div._
    touch.wrapper
      template(
        slot-scope="props"
        )
        div.obj(
          v-touch.track="props.mid"
          )
        div.pointer.center(
          v-if="props.mid"
          :style=`{
            left: props.mid.x + 'px',
            top: props.mid.y + 'px',
          }`
          )
          //- transform: 'rotate3d(' + props.data.rotation.join(',') + 'rad)'
          p [{{ props.mid.x }};{{ props.mid.y }}]
        div.pointer(
          v-for="(pointer, index) of props.pointers"
          :key="index"
          :id="pointer.id"
          :style=`{
            left: pointer.x + 'px',
            top: pointer.y + 'px',
            'margin-left': -5 * pointer.pressure * pointer.size + 'px',
            'margin-top': -5 * pointer.pressure * pointer.size + 'px',
            width: 10 * pointer.pressure * pointer.size + 'px',
            height: 10 * pointer.pressure * pointer.size + 'px'
          }`
          )
          //- p [{{ pointer.x }};{{ pointer.y }}]
          //- p [{{ pointer.pressure }};{{ pointer.size }}]
</template>

<script>
  import TouchComponent from '~/components/touch'
  import TouchDirective from '~/directives/touch'

  export default {
    components: {
      touch: TouchComponent
    },

    directives: {
      touch: TouchDirective
    },

    data() {
      return {
        pointers: []
      }
    }
  }
</script>

<style lang="sass" scoped>
  ._
    display: flex

  .obj
    position: absolute
    width: 100px
    height: 100px
    background-color: black

  .wrapper
    position: relative
    width: 300px
    height: 300px
    margin: auto
    background-color: gray
    transform-style: preserve-3d
    user-select: none

  .pointer
    position: absolute
    background-color: red
    border-radius: 50%

    &.center
      width: 10px
      height: 10px
      margin-left: -5px
      margin-top: -5px
      background-color: yellow
</style>
