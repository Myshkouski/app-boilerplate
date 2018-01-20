<template lang="pug">
transition(
	@enter="enter"
  enter-class="before-enter"
  enter-active-class="before-enter"
  after-class="entering"
	@after-enter="afterEnter"
  leave-active-class="released cancelled"
	)
	div.ripple(
    :class="classNames"
    :style="style"
    )
</template>

<script>
function _setState( state ) {
  return Object.assign( this, {
    entering: true,
    cancelled: false,
    released: false
  }, state || {} )
}

// const timings = {
//   in: 1000,
//   out: 1000
// }

export default {
  props: [ 'ripple' ],

  // mounted() {
  //   Object.assign( this.$el.style, {
  //     left: `${ this.ripple.left }px`,
  //     top: `${ this.ripple.top }px`
  //   } )
  // },

  data() {
    return _setState.call({entering: false})
  },

  computed: {
    style() {
      return {
        left: `${ this.ripple.left }px`,
        top: `${ this.ripple.top }px`
      }
    },

    classNames() {
      const {
        entering,
        released,
        cancelled
      } = this

      return {
        entering,
        released,
        cancelled
      }
    }
  },

  methods: {
    setState( state ) {
      _setState.call( this, state )
      return this
    },

    destroy( state ) {
      // this.setState(state)
      // setTimeout(() => {
      //   this.$destroy()
      //   this.$el.remove()
      //   this.$el = null
      // }, timings.out)
      // return this
    },

    enter(el, done) {
      done()
    },

    afterEnter(el) {
      // console.warn('afterEnter', el)
      // this.setState({ entering: true })
      // console.log(this.ripple)
      requestAnimationFrame(() => {
        const rad = +Math.sqrt( Math.pow( this.ripple.width, 2 ) + Math.pow( this.ripple.height, 2 ) ).toFixed(3)

        Object.assign( el.style, {
          transform: `translate3d(${ -rad }px, ${ -rad }px, 0)`,
          width: `${ rad * 2 }px`,
          height: `${ rad * 2 }px`
        })
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .ripple
    position: absolute
    width: 0
    height: 0
    max-width: none
    max-height: none
    top: 0
    left: 0
    bottom: 0
    right: 0
    border-radius: 50%
    transition-duration: .5s
    transition-property: width, height, border-radius, transform, background-color, opacity
    // transform: translateX(0) translateY(0)
    &.before-enter
      width: 0
      height: 0

    &.entering
      transition-timing-function: ease-out

    &.released, &.cancelled
      transition-timing-function: ease-out
      background-color: transparent

    // &.activated
    //   transition-duration: .5s
    // &.leave.released, &.leave.cancelled
    //   transition-duration: .25s
    // &.released, &.cancelled
    //   background-color: transparent
    // &.cancelled
    //   background-color: red
    //   opacity: 0
</style>
