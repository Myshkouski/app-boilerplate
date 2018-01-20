<template lang="pug">
ul
	//- p trackers: {{ trackers }}
	//- p relative: {{ relative }}
	p average: {{ average }}
	p rotation: {{ rotation }}

	div.wrapper
		div(
			v-for="(tracker, index) in trackers"
			)
			div.line(
				:style="style"
				)
			div.tracker.center(
				:style="style"
				)
			div.tracker(
				:style="{ left: tracker.end[0] + 'px', top: tracker.end[1] + 'px' }"
				)
			div(
				v-for="(coordinate, i) in tracker.end"
				)
				input(
					:value="coordinate"
					@input="onUpdate($event.target.value, index, i)"
					type="range"
					max="1000"
					min="-1000"
					)
</template>

<script>
import {
	mat3 as Matrix,
	vec3 as Vector,
	quat as Quaternion
} from 'gl-matrix'

// const q = new Quaternion()
// const a = [1, 1, 0]
// const b = [0, 1, 0]
//
// const res = Quaternion.lerp([], Vector.normalize([], a), Vector.normalize([], b), 1)
// console.log(res)

export default {
	methods: {
		onUpdate(v, index, i) {
			console.log(this.trackers[index].end, i)
			const a = [...this.trackers[index].end]
			a[i] = +v
			this.trackers[index].end = a
		}
	},

	data() {
		return {
			trackers: [
				{
					start: [100, 0, 0],
					end: [100, 100, 0]
				},
				// {
				// 	start: [-100, 0, 0],
				// 	end: [-100, -100, 0]
				// },
				{
					start: [100, 0, 0],
					end: [-100, 0, 0]
				}
			]
		}
	},

	computed: {
		range() {
			return {
				min: 0,
				max: Math.PI
			}
		},

		style() {
			return {
				transform: `rotate3d(${ this.deltaRotation.slice(0, 3).join(',') }, ${ 2 * Math.acos(this.deltaRotation[3]) }rad)`,
				left: this.average.end[0] + 'px',
				top: this.average.end[1] + 'px'
			}
		},

		space() {
			return Matrix.identity([])
		},

		deltaPosition() {
			// console.log('get deltaPosition')
			return this.trackers.map(tracker => {
				return Vector.sub([], tracker.end, tracker.start)
			})
		},

		relative() {
			// console.log('get relative')
			return this.trackers.map(tracker => {
				const start = Vector.sub([], tracker.start, this.average.start)
				const end = Vector.sub([], tracker.end, this.average.end)
				console.log('!', start, end)
				return {
					start,
					end
				}
			})
		},


		rotation() {
			// console.log('get rotation')
			const q = this.deltaRotation
			const rZ = Math.atan2(2 * (q[0] * q[1] + q[2] * q[3]), 1 - 2 * (q[1] * q[1] + q[2] * q[2]))
			const rY = Math.asin(2 * (q[0] * q[2] - q[3] * q[1]))
			const rX = Math.atan2(2 * (q[0] * q[3] + q[1] * q[2]), 1 - 2 * (q[2] * q[2] + q[3] * q[3]))

			return [rX, rY, rZ].map(r => r % Math.PI)
		},

		deltaRotation() {
			// console.log('get deltaRotation')
			const rotation = this.relative.reduce((quaternion, tracker) => {
				// console.log('tracker', tracker)
				if(!Vector.length(tracker.start) || !Vector.length(tracker.start)) {
					return quaternion
				}
				const from = Vector.normalize([], tracker.start)
				// console.log('from', from)
				const to = Vector.normalize([], tracker.end)
				// console.log('to', to)
				const rotationTo = Quaternion.rotationTo([], from, to)
				// console.log('rotationTo', rotationTo)
				// console.log('quaternion', quaternion)
				const lerp = Quaternion.lerp([], quaternion, rotationTo, 1)
				// console.warn('lerp', lerp)
				return lerp
			}, Quaternion.create())

			return rotation

			return Quaternion.normalize([], rotation)
		},

		rotationMatrix() {
			return Matrix.fromQuat([], this.deltaRotation)
		},

		average() {
			// console.log('get average')
			const summary = this.trackers.reduce((summary, tracker) => {
				return Object.assign(summary, {
					start: Vector.add([], summary.start, tracker.start),
					end: Vector.add([], summary.end, tracker.end)
				})
			}, {
				start: [0, 0, 0],
				end: [0, 0, 0]
			})

			// return summary

			const scale = 1 / this.trackers.length

			return {
				start: Vector.scale([], summary.start, scale),
				end: Vector.scale([], summary.end, scale)
			}
		},

		averageDelta() {
			const computeSummary = (summary, delta) => {
				// console.warn(summary, delta)
				return summary.add(delta)
			}

			return {
				// position: this.deltaPosition.reduce(computeSummary, new Vector3([0, 0, 0])).scale(1 / this.deltaPosition.length),
				// rotation: this.deltaRotation.reduce(computeSummary, new Vector3([0, 0, 0])).scale(1 / this.deltaRotation.length)
			}
		},
	}
}
</script>

<style lang="sass">
	.line
		position: absolute
		width: 50px
		height: 25px
		margin-left: -25px
		margin-top: -25px
		background-color: red
		border-bottom: 25px solid blue

	.tracker
		position: absolute
		width: 10px
		height: 10px
		margin-left: -5px
		margin-top: -5px
		border-radius: 50%
		background-color: green

		&.center
			background-color: yellow
</style>
