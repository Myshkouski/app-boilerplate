<template lang="pug">
div.ripple(
  :style="style"
  :class="{ activated, released, cancelled }"
  )
</template>

<script>
function _setState(state) {
  return Object.assign(this, {
    positioned: true,
    activated: true,
    cancelled: false,
    released: false
  }, state || {})
}

const timings = {
  in: 20000,
  out: 20000
}

export default {
  props: ['ripple'],

  data() {
    return _setState.call({}, { positioned: false, activated: false })
  },

  mounted() {
    setTimeout(() => {
      _setState.call(this, { activated: true })
    })
  },

  computed: {
    style() {
      const style = {}

      if(this.positioned) {
        Object.assign(style, {
          'left': `${ this.ripple.x }px`,
          'top': `${ this.ripple.y }px`
        })
      }

      if(this.activated) {
        const rad = Math.sqrt(Math.pow(this.ripple.width, 2) + Math.pow(this.ripple.height, 2))

        Object.assign(style, {
          'transform': `translateX(${ -rad }px) translateY(${ -rad }px)`,
          'width': `${ rad * 2 }px`,
          'height': `${ rad * 2 }px`
        })
      }

      return style
    }
  },

  methods: {
    setState(state) {
      _setState.call(this, state)
      return this
    },

    destroy(state) {
      // this.setState(state)
      setTimeout(() => {
        this.$el.remove()
        this.$destroy()
      }, timings.out)
      return this
    }
  }
}
</script>

<style lang="sass" scoped>
  .ripple
    position: absolute
    width: 0
    max-width: none
    height: 0
    max-height: none
    top: 0
    left: 0
    bottom: 0
    right: 0
    border-radius: 50%
    // transform: translateX(0) translateY(0)
    transition-property: width, height, transform, background-color, opacity
    transition-timing-function: ease-out
    background-color: rgba(0, 0, 0, .3)

    &.activated
      transition-duration: .5s
    &.released, &.cancelled
      transition-duration: .25s
    &.released, &.cancelled
      background-color: transparent
    // &.cancelled
    //   background-color: red
    //   opacity: 0
</style>
