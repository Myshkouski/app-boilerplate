import Vue from 'vue'
import RippleWrapperComponent from '~/components/ripple-wrapper'

const RippleWrapper = Vue.extend( RippleWrapperComponent )

export default {
  mounted() {
    const vnode = document.createElement( 'i' )

    this.$el.insertBefore( vnode, this.$el.firstChild )

    const wrapper = new RippleWrapper()
      .$mount( vnode )
  }
}
