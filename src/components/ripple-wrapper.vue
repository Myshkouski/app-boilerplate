<template lang="pug">
  div
    div(ref="ripples")
    div
</template>

<script type="text/javascript">
import Vue from 'vue'
import RippleComponent from '~/components/ripple'
const Ripple = Vue.extend( RippleComponent )

export default {
  methods: {
    ripple(rippleData) {
      const ripple = new Ripple( {
          propsData: {
            ripple: rippleData
          }
        } )
        .$mount()

      this.$refs['ripples'].appendChild( ripple.$el )

      return ripple
    }
  }
}
</script>

<style lang="sass" scoped>
  div
    position: absolute
    width: 100%
    height: 100%
    overflow: hidden
</style>
