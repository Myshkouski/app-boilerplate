<template lang="pug">
pointer.root(
	v-model="ripples"
	)
	ripple(
		v-for="(ripple, index) in ripples"
		:key="index"
		:ripple="ripple"
		)
</template>

<script type="text/javascript">
import RippleComponent from '~/components/ripple'
import TouchComponent from '~/components/touch'
import getElementRect from '~/helpers/getElementRect'

import {
  add as addEventListeners
} from '~/helpers/eventListeners'

export default {
  components: {
    pointer: TouchComponent,
    ripple: RippleComponent
  },

  data() {
    return {
      pointers: []
    }
  },

  computed: {
    ripples: {
      get() {
        const {
          width,
          height
        } = this.rect()

        const ripples = this.pointers.map( pointer => Object.assign( {}, {
          width,
          height
        }, pointer ) )

        return ripples
      },
      set( pointers ) {
        this.pointers = pointers
      }
    }
  },

  methods: {
    rect() {
      return getElementRect( this.$el )
    }
  }
}
</script>

<style lang="sass" scoped>
  .root
    &, &::after
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      width: 100%
      height: 100%

    &::after
      content: ''

  .root
    // overflow: hidden
    transform-style: preserve-3d
</style>
