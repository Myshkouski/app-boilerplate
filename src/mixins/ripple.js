import Vue from 'vue'
import RippleWrapperComponent from '~/components/ripple-wrapper'

const RippleWrapper = Vue.extend( RippleWrapperComponent )

function mapEventHadlers( map, ...args ) {
  map.forEach( ( {
    events,
    createHandler,
    options
  } ) => {
    events.forEach( event => {
      this.$el.addEventListener( event, createHandler.apply( this, args )
        .bind( this ), options )
    } )
  } )
}

const release = ripple => function() {
  ripple.setState( {
      released: true
    } )
    .destroy()
}

const cancel = ripple => function() {
  ripple.setState( {
      cancelled: true
    } )
    .destroy()
}

const eventsAfterActivation = [ {
  events: [ 'mouseup', 'touchend' ],
  createHandler: release
}, {
  events: [ 'mouseleave', 'touchleave' ],
  createHandler: cancel
} ]

const activateMouse = wrapper => function( event ) {
  const {
    target
  } = event

  const targetData = target.getBoundingClientRect()

  const rippleData = {
    x: event.clientX - targetData.x,
    y: event.clientY - targetData.y,
    width: targetData.width,
    height: targetData.height
  }

  mapEventHadlers.call( this, eventsAfterActivation, wrapper.ripple( rippleData ) )
}

const activateTouch = wrapper => function( event ) {
  event.stopPropagation()
  event.preventDefault()
  const {
    target
  } = event

  const targetData = target.getBoundingClientRect()

  ;
  [].forEach.call( event.touches, touch => {
    const rippleData = {
      x: touch.clientX - targetData.x,
      y: touch.clientY - targetData.y,
      width: targetData.width,
      height: targetData.height
    }

    mapEventHadlers.call( this, eventsAfterActivation, wrapper.ripple( rippleData ) )
  } )
}

export default {
  mounted() {
    const wrapper = new RippleWrapper()
      .$mount()

    this.$el.insertBefore( wrapper.$el, this.$el.firstChild )

    mapEventHadlers.call( this, [ {
      events: [ 'mousedown' ],
      createHandler: activateMouse
    }, {
      events: [ 'touchstart' ],
      createHandler: activateTouch
    } ], wrapper )
  }
}
