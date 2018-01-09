import Vue from 'vue'
import RippleComponent from '~/components/ripple'
import RippleWrapperComponent from '~/components/ripple-wrapper'

const Ripple = Vue.extend(RippleComponent)
const RippleWrapper = Vue.extend(RippleWrapperComponent)

const onMousedown = wrapper => function(event) {
  const { target } = event

  const targetData = target.getBoundingClientRect()
  console.warn(target.getClientRects())
  const clickData = { x: event.clientX, y: event.clientY }
  const timeout = 500

  const rippleData = {
    x: clickData.x - targetData.x,
    y: clickData.y - targetData.y,
    width: targetData.width,
    height: targetData.height
  }

  const ripple = new Ripple({
    propsData: {
      ripple: rippleData
    }
  }).$mount()

  wrapper.$el.appendChild(ripple.$el)

  ripple.$once('remove', () => {
    console.log(ripple.$el)
    ripple.$el.remove()
  })
}

const onMouseup = wrapper => function () {

}

export default {
  mounted() {
    const wrapper = new RippleWrapper().$mount()

    this.$el.insertBefore(wrapper.$el, this.$el.firstChild)

    this.$on('mousedown', onMousedown(wrapper))
    this.$on('mouseup', onMouseup(wrapper))

    console.log(this)
  },

  methods: {

  }
}
