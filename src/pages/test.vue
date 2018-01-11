<template lang="pug">
  div.box
    div.wrapper(
      ref="wrapper"
      )
      div.tracker(
        v-for="tracker in trackers"
        :style="{ transform: `translateX(${ tracker.x }px) translateY(${ tracker.y }px)` }"
        )
</template>

<script>
function init() {
  document.addEventListener('mousedown', onMouseDown.bind(this))

  function onMouseDown(event) {
    if(event.path.some(el => el === this.$el)) {
      document.addEventListener('mousemove', onMouseMove.bind(this))

      document.addEventListener('mouseup', onMouseUp.bind(this), {
        once: true
      })

      const wrapper = this.$refs.wrapper

      Object.assign(this.mouse, {
        active: true,
        x: event.clientX - wrapper.offsetLeft,
        y: event.clientY - wrapper.offsetTop
      })
    }
  }

  function onMouseUp(event) {
    document.removeEventListener('mousemove', onMouseMove.bind(this))

    Object.assign(this.mouse, {
      active: false
    })
  }

  function onMouseMove(event) {
    if(this.mouse.active) {
      const wrapper = this.$refs.wrapper
      Object.assign(this.mouse, this._getCurrentPosition({
        x: event.clientX - wrapper.offsetLeft,
        y: event.clientY - wrapper.offsetTop
      }, wrapper))
    }
  }

  document.addEventListener('touchstart', onTouchStart.bind(this))
  document.addEventListener('touchmove', onTouchMove.bind(this))
  document.addEventListener('touchend', onTouchEnd.bind(this))
  document.addEventListener('touchcancel', onTouchEnd.bind(this))

  function onTouchStart(event) {
    if(event.path.some(el => el === this.$el)) {
      const wrapper = this.$refs.wrapper

      ;[].forEach.call(event.changedTouches, touch => {
        const data = {
          id: touch.identifier,
          x: touch.clientX - wrapper.offsetLeft,
          y: touch.clientY - wrapper.offsetTop
        }

        this.touch.push(data)
      })

      // console.log(event)
    }
  }

  function onTouchMove(event) {
    ;[].forEach.call(event.changedTouches, touch => {
      const index = this.touch.find(data => data.id == touch.identifier)

      if(index) {
        const wrapper = this.$refs.wrapper

        Object.assign(index, this._getCurrentPosition({
          x: touch.clientX - wrapper.offsetLeft,
          y: touch.clientY - wrapper.offsetTop
        }, wrapper))
      }
    })
  }

  function onTouchEnd(event) {
    ;[].forEach.call(event.changedTouches, touch => {
      const index = this.touch.findIndex(data => data.id == touch.identifier)

      if(~index) {
        this.touch.splice(index, 1)
      }
    })
  }
}

export default {
  data() {
    return {
      mouse: {
        active: false,
        x: 0,
        y: 0
      },
      touch: []
    }
  },
  mounted() {
    init.call(this)
  },
  computed: {
    trackers() {
      if(this.mouse.active) {
        return [this.mouse, ...this.touch]
      } else {
        return this.touch
      }
    }
  },
  methods: {
    _isOut(value, min, max) {
      if(value > max) {
        return 1
      } else if(value < min) {
        return -1
      }
      return 0
    },

    _getCurrentPosition(to, wrapperData) {
      function slow(actual, forced) {

      }

      const position = {}
      const x = this._isOut(to.x, 0, wrapperData.offsetWidth)

      // console.warn({wrapperData}, to.x, wrapperData.offsetWidth)

      if(x < 0) {
        position.x = 0
      } else if(x > 0) {
        position.x = wrapperData.offsetWidth
      } else {
        position.x = to.x
      }

      const y = this._isOut(to.y, 0, wrapperData.offsetHeight)

      if(y < 0) {
        position.y = 0
      } else if(y > 0) {
        position.y = wrapperData.offsetHeight
      } else {
        position.y = to.y
      }

      return position
    },

    _onMouseEnter() {
      this.mouse.over = true
    },

    _onMouseLeave() {
      this.mouse.over = false
    }
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
