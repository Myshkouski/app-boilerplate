<template lang="pug">
div
  div#container(
    style="touch-action: none"
    v-pointer:handler="onUpdate"
    )
    div#touchable()
</template>

<script>
export default {
  directives: {
    pointer: require('~/directives/pointer').default
  },
  methods: {
    accelerate(transformMatrix) {

    },

    onUpdate(event) {}
  }
}
</script>

<style lang="sass">
#container
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  min-width: 400px
  height: 100%
  min-height: 400px
  background-color: #999

#touchable
  width: 200px
  height: 200px
  background-color: #8f8
  transition: all 2s ease
  transform: rotate(45deg)
</style>
