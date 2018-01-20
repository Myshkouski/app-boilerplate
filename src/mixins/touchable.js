import eventListeners from '~/helpers/eventListeners'
import getElementRect from '~/helpers/getElementRect'
import MatrixMixin from '~/mixins/matrix'

function onMouseDown( event ) {
  if ( this.$el.contains( event.target ) ) {
    this.$el.focus()
    console.warn( document.activeElement )
    this.$emit( 'start', event )
  }
}

function onMouseUp( event ) {
  this.$emit( 'end', event )
}

function onMouseMove( event ) {
  this.$emit( 'move', event )
  // console.warn(event.type)
  // if ( this.mouse.active ) {
  //   const wrapper = this.$refs.wrapper
  //   Object.assign( this.mouse, this.getendPosition( {
  //     x: event.clientX - wrapper.offsetLeft,
  //     y: event.clientY - wrapper.offsetTop
  //   }, wrapper ) )
}

function onTouchStart( event ) {
  [].forEach.call( event.changedTouches, touch => {
    if ( this.$el.contains( touch.target ) ) {
      event.preventDefault()
      this.$emit( 'start', touch )
    }

    // const data = {
    //   id: touch.identifier,
    //   x: touch.clientX - wrapper.offsetLeft,
    //   y: touch.clientY - wrapper.offsetTop
    // }
    //
    // this.touch.push( data )
  } )
  // console.warn(event.type)
  // const wrapper = this.$refs.wrapper

}

function onTouchMove( event ) {
  [].forEach.call( event.changedTouches, touch => {
    this.$emit( 'move', touch )
    // const index = this.touch.find( data => data.id == touch.identifier )
    //
    // if ( index ) {
    //   const wrapper = this.$refs.wrapper
    //
    //   Object.assign( index, this.getendPosition( {
    //     x: touch.clientX - wrapper.offsetLeft,
    //     y: touch.clientY - wrapper.offsetTop
    //   }, wrapper ) )
    // }
  } )
}

function onTouchEnd( event ) {
  [].forEach.call( event.changedTouches, touch => {
    this.$emit( 'end', touch )
    // const index = this.touch.findIndex( data => data.id == touch.identifier )
    //
    // if ( ~index ) {
    //   this.touch.splice( index, 1 )
    // }
  } )
}

function onCancel( event ) {
  // if ( document.visibilityState == 'hidden' ) {
  this.$touchable.trackers.splice( 0 )

  this.$emit( 'update', this.$touchable.trackers )
  // }
}

function _isOut( value, min, max ) {
  if ( value > max ) {
    return 1
  } else if ( value < min ) {
    return -1
  }
  return 0
}

export const Emitter = {
  created() {
    this.$touchable = {
      data: {}
    }

    Object.defineProperties( this.$touchable, {
      'trackers': {
        get: () => {
          return this._data._trackers
        }
      },
      'eventListenersMap': {
        get: () => [ {
          events: [ 'mousedown' ],
          handler: onMouseDown.bind( this )
        }, {
          events: [ 'mousemove' ],
          handler: onMouseMove.bind( this )
        }, {
          events: [ 'touchstart' ],
          handler: onTouchStart.bind( this ),
          options: {
            passive: false
          }
        }, {
          events: [ 'touchmove' ],
          handler: onTouchMove.bind( this ),
          options: {
            passive: false
          }
        }, {
          events: [ 'mouseup' ],
          handler: onMouseUp.bind( this )
        }, {
          events: [ 'touchend' ],
          handler: onTouchEnd.bind( this )
        }, {
          events: [ 'visibilitychange', /* 'mouseleave', 'touchleave', */ 'touchcancel' ],
          handler: onCancel.bind( this )
        } ]
      }
    } )

    Object.defineProperties( this.$touchable.data, {
      'center': {
        get: () => this.center
      }
    } )
  },

  mounted() {
    eventListeners.add( document, this.$touchable.eventListenersMap )
  },

  unmount() {}
}

export const Handler = {
  mixins: [ MatrixMixin ],

  mounted() {
    this.$on( 'start', this.onStart )
    this.$on( 'move', this.onMove )
    this.$on( 'end', this.onEnd )
    this.$on( 'cancel', this.onEnd )
  },

  model: {
    prop: 'trackers',
    event: 'update'
  },

  props: {
    'trackers': {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      _trackers: []
    }
  },

  computed: {
    points() {
      return this.$touchable.trackers
    }
  },

  methods: {
    getElementRect() {
      return getElementRect( this.$el )
    },

    getRelativePositionOnStart( startEvent ) {
      const elementRect = this.getElementRect()

      return [
        startEvent.clientX - elementRect.left,
        startEvent.clientY - elementRect.top,
        0
      ]
    },

    getRelativePositionOnMove( moveEvent, endRelativePosition ) {
      let x = 0,
        y = 0
      const elementRect = this.getElementRect()
      const top = _isOut( moveEvent.clientY - elementRect.top, 0, elementRect.height )

      if ( top < 0 ) {
        y = 0
      } else if ( top > 0 ) {
        y = elementRect.height
      } else {
        y = moveEvent.clientY - elementRect.top
      }

      const left = _isOut( moveEvent.clientX - elementRect.left, 0, elementRect.width )

      if ( left < 0 ) {
        x = 0
      } else if ( left > 0 ) {
        x = elementRect.width
      } else {
        x = moveEvent.clientX - elementRect.left
      }

      return [ x, y, 0 ]
    },

    onStart( event ) {
      this.findByIdAndReplace( event.identifier )
      const startPosition = this.getRelativePositionOnStart( event )
      const tracker = {
        id: event.identifier,
        start: startPosition,
        end: startPosition,
        delta: {
          absolute: [ 0, 0, 0 ],
          marginal: [ 0, 0, 0 ]
        }
      }

      this.$touchable.trackers.push( tracker )
      // console.log( event, tracker )
      this.$emit( 'update', this.$touchable.trackers )
    },

    onMove( event ) {
      const trackerIndex = this.$touchable.trackers.findIndex( tracker => tracker.id == event.identifier )

      // console.log( this.$touchable.trackers, trackerIndex )

      if ( ~trackerIndex ) {
        const tracker = this.$touchable.trackers[ trackerIndex ]
        const relativePosition = this.getRelativePositionOnMove( event, tracker )

        Object.assign( tracker, {
          end: relativePosition,
          delta: {
            absolute: relativePosition.map( ( v, i ) => v - tracker.start[ i ] ),
            marginal: [
              event.movementX,
              event.movementY
            ]
          }
        } )

        this.$emit( 'update', this.$touchable.trackers )
      }
    },

    findByIdAndReplace( id ) {
      const trackerIndexes = []
      this.$touchable.trackers.forEach( ( tracker, index ) => {
        if ( tracker.id == id ) {
          trackerIndexes.push( index )
        }
      } )

      if ( trackerIndexes.length ) {
        trackerIndexes.forEach( trackerIndex => {
          this.$touchable.trackers.splice( trackerIndex, 1 )
        } )
      }
    },

    onEnd( event ) {
      this.findByIdAndReplace( event.identifier )
    },

    onCancel( event ) {

    }
  }
}

export default {
  Emitter,
  Handler
}
