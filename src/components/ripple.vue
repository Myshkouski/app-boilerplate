<template lang="pug">
  div.ripple(
    :style="style"
    :class="{ active: applyStyle }"
  )
</template>

<script>
export default {
  props: ['ripple'],

  data() {
    return {
      applyStyle: false
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.applyStyle = true
    })

    setTimeout(() => {
      console.log('!!!')
      this.$emit('remove')
    }, this.ripple.timeout || 500)
  },

  computed: {
    style() {
      const rad = Math.sqrt(Math.pow(this.ripple.width, 2) + Math.pow(this.ripple.height, 2))

      const style = {
        'left': `${ this.ripple.x }px`,
        'top': `${ this.ripple.y }px`,
        'transform': `translateX(${ -rad }px) translateY(${ -rad }px)`,
        'width': `${ rad * 2 }px`,
        'height': `${ rad * 2 }px`
      }

      return this.applyStyle ? style : {}
    }
  }
}
</script>

<style lang="sass" scoped>
  @keyframes fade
    from
    to
      background-color: transparent

  .ripple
    position: absolute
    width: 0
    height: 0
    top: 0
    left: 0
    // background-color: red
    border-radius: 50%
    transform: translateX(0) translateY(0)
    transition-property: width, height, transform, background-color, opacity
    transition-timing-function: cubic-bezier(.17,.67,.83,.67)
</style>
