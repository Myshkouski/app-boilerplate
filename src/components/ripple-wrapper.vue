<template lang="pug">
tracker.root(
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
import TrackerComponent from '~/components/touchable'
import getElementRect from '~/helpers/getElementRect'

import {
  add as addEventListeners
} from '~/helpers/eventListeners'

export default {
  components: {
    tracker: TrackerComponent,
    ripple: RippleComponent
  },

  data() {
    return {
      trackers: []
    }
  },

  computed: {
    ripples: {
      get() {
        const {
          width,
          height
        } = this.rect()

        const ripples = this.trackers.map( tracker => Object.assign( {}, {
          width,
          height
        }, tracker ) )

        return ripples
      },
      set( trackers ) {
        this.trackers = trackers
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
