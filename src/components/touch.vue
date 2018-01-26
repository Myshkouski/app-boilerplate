<template lang="pug">
div._
  slot(
    :pointers="pointers"
    :mid="mid"
    )
</template>

<script>
import {
	Pointer,
	MousePointer,
	TouchPointer,
	eventProps as pointerEventProps
} from '~/classes/pointer'

import {
	mat3 as Matrix,
	vec3 as Vector,
	quat as Quaternion
} from 'gl-matrix'

import eventListeners from '~/helpers/eventListeners'
import getElementRect from '~/helpers/getElementRect'

export default {
	created() {
    // this.$set(this, 'pointers', this.pointers)
	},

	mounted() {
		eventListeners.add(document, this.eventListenersMap)
	},

	beforeDestroy() {
		eventListeners.remove(document, this.eventListenersMap)
	},

	model: {
		event: 'update:value'
	},

	props: {
		value: {
			type: Array,
			default: () => []
		}
	},

	data() {
		return {
			pointers: []
		}
	},

	computed: {
		eventListenersMap() {
			return [{
				events: ['mousedown'],
				handler: this.onMousedown
			}, {
				events: ['mousemove'],
				handler: this.onMousemove
			}, {
				events: ['touchstart'],
				handler: this.onTouchstart,
				options: {
					passive: false
				}
			}, {
				events: ['touchmove'],
				handler: this.onTouchmove,
				options: {
					passive: false
				}
			}, {
				events: ['mouseup'],
				handler: this.onMouseup
			}, {
				events: ['touchfinal'],
				handler: this.onTouchfinal
			}, {
				events: ['touchcancel'],
				handler: this.onCancel
			}, {
				events: ['visibilitychange'],
				handler: this.clear
			}]
		},

		relative() {
			// return this.pointers.map( point => {
			//   const start = Vector.sub( [], point.start, this.center.start )
			//   const final = Vector.sub( [], point.final, this.center.final )
			//
			//   return {
			//     start,
			//     final
			//   }
			// } )
		},

		angles() {
			// const q = this.rotation
			// const rZ = Math.atan2( 2 * ( q[ 0 ] * q[ 1 ] + q[ 2 ] * q[ 3 ] ), 1 - 2 * ( q[ 1 ] * q[ 1 ] + q[ 2 ] * q[ 2 ] ) )
			// const rY = Math.asin( 2 * ( q[ 0 ] * q[ 2 ] - q[ 3 ] * q[ 1 ] ) )
			// const rX = Math.atan2( 2 * ( q[ 0 ] * q[ 3 ] + q[ 1 ] * q[ 2 ] ), 1 - 2 * ( q[ 2 ] * q[ 2 ] + q[ 3 ] * q[ 3 ] ) )
			//
			// return [ rX, rY, rZ ].map( r => 90 * ( r % Math.PI ) / Math.PI )
		},

		// rotationMatrix() {
		//   return Matrix.fromQuat( [], this.rotation )
		// },

		rotation() {
			// const rotation = this.relative.reduce( ( quaternion, tracker ) => {
			//   // console.log('tracker', tracker)
			//   if ( !Vector.length( tracker.start ) || !Vector.length( tracker.start ) ) {
			//     return quaternion
			//   }
			//   const from = Vector.normalize( [], tracker.start )
			//   // console.log('from', from)
			//   const to = Vector.normalize( [], tracker.final )
			//   // console.log('to', to)
			//   const rotationTo = Quaternion.rotationTo( [], from, to )
			//   // console.log('rotationTo', rotationTo)
			//   // console.log('quaternion', quaternion)
			//   const sqlerp = Quaternion.sqlerp( [], quaternion, rotationTo, 1 )
			//   // console.warn('lerp', lerp)
			//   return sqlerp
			// }, Quaternion.create() )
			//
			// // return rotation
			//
			// // return Quaternion.normalize([], rotation)
			//
			// return new Float64Array([ ...rotation.slice( 0, 3 ), 2 * Math.acos( rotation[ 3 ] ) ])
		},

		mid() {
			if(this.pointers.length) {
        function mid(states) {
          const scale = 1 / states.length

          const summary = {
  					client: Vector.fromValues(0, 0, 0),
  					element: Vector.fromValues(0, 0, 0),
  					size: Vector.fromValues(0, 0, 0),
  					tilt: Vector.fromValues(0, 0, 0),
  					pressure: Vector.fromValues(0, 0, 0)
  				}

  				states.forEach(state => {
  					Vector.add(summary.client, summary.client, state.client),
            Vector.add(summary.element, summary.element, state.element),
  					Vector.add(summary.size, summary.size, state.size),
  					Vector.add(summary.tilt, summary.tilt, state.tilt),
  					Vector.add(summary.pressure, summary.pressure, state.pressure)
          })

  				Vector.scale(summary.client, summary.client, scale)
  				Vector.scale(summary.element, summary.element, scale)
  				Vector.scale(summary.size, summary.size, scale)
  				Vector.scale(summary.tilt, summary.tilt, scale)
  				Vector.scale(summary.pressure, summary.pressure, scale)

  				return summary
  			}

  			const startStates = this.pointers.map(pointer => pointer.start)
  			const finalStates = this.pointers.map(pointer => pointer.final)

  			return Pointer.create({
  				id: -1,
  				type: 'mid'
  			}, {
  				getStart() {
            return mid(startStates)
          },
          getFinal() {
            return mid(finalStates)
          }
  			})
      }

      return null
		}
	},

	methods: {
		findIndex(id) {
			return this.pointers.findIndex(pointer => pointer.id == id)
		},

		set(id, pointer) {
			const index = this.findIndex(id)

			if (~index) {
				this.pointers.splice(index, 1, pointer)
			} else {
				this.pointers.push(pointer)
			}

			this.$emit('set:pointer', pointer.id, pointer)
			this.$emit('update:pointers', this.pointers)
		},

		remove(id) {
			const index = this.findIndex(id)

			if (~index) {
				this.pointers.splice(index, 1).forEach(pointer => {
					this.$emit('remove:pointer', pointer.id, pointer)
				})
				this.$emit('update:pointers', this.pointers)
			}
		},

		clear() {
			this.pointers.splice(0).forEach(pointer => {
				this.$emit('remove:pointer', pointer.id, pointer)
			})
			this.$emit('update:pointers', this.pointers)
		},

		onMousedown(event) {
			if (this.$el.contains(event.target)) {
				const pointer = MousePointer.create({
					el: this.$el,
					options: event
				})
				this.set(pointer.id, pointer)
			}
		},

		onMouseup(event) {
			this.remove(MousePointer.id)
		},

		onMousemove(event) {
      const index = this.findIndex(MousePointer.id)
			if (~index) {
        const pointer = Pointer.update(this.pointers[index], {
					el: this.$el,
					options: event
				})

        this.set(pointer.id, pointer)
			}
		}
	}
}
</script>
