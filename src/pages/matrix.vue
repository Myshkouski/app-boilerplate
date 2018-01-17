<template lang="pug">
ul
	p relative: {{ relative }}
	p average: {{ average }}
	p rotation: {{ rotation }}
	div.line(
		:style="style"
		)
	//- p deltaRotation: {{ rotationMatrix }}
</template>

<script>
// import {
// 	Matrix4,
// 	Vector2,
// 	Vector3,
// 	Quaternion
// } from 'math.gl'

import {
	mat3 as Matrix,
	vec3 as Vector,
	quat as Quaternion
} from 'gl-matrix'

// const q = new Quaternion()
// const a = [1, 1, 0]
// const b = [0, 1, 0]
//
// const res = Quaternion.rotationTo([], Vector.normalize([], a), Vector.normalize([], b))
// const m = Matrix.fromQuat([], res)

export default {
	data() {
		return {
			trackers: [
				{
					start: [2, 1, 0],
					end: [1, 1, 0]
				},
				{
					start: [0, 1, 0],
					end: [-1, -1, 0]
				}
			]
		}
	},

	computed: {
		style() {
			return {
				transform: `rotate3d(${ this.deltaRotation[0] }, ${ this.deltaRotation[1] }, ${ this.deltaRotation[2] }, ${ this.deltaRotation[3] }rad)`
			}
		},

		space() {
			return Matrix.identity([])
		},

		deltaPosition() {
			console.log('get deltaPosition')
			return this.trackers.map(tracker => {
				return Vector.sub([], tracker.end, tracker.start)
			})
		},

		relative() {
			console.log('get relative')
			return this.trackers.map(tracker => {
				const start = Vector.sub([], tracker.start, this.average.start)
				const end = Vector.sub([], tracker.end, this.average.end)
				console.log(start, end)
				return {
					start,
					end
				}
			})
		},


		rotation() {
			console.log('get rotation')
			const q = this.deltaRotation
			const rZ = Math.atan2(2 * (q[0] * q[1] + q[2] * q[3]), 1 - 2 * (q[1] * q[1] + q[2] * q[2]))
			const rY = Math.asin(2 * (q[0] * q[2] - q[3] * q[1]))
			const rX = Math.atan2(2 * (q[0] * q[3] + q[1] * q[2]), 1 - 2 * (q[2] * q[2] + q[3] * q[3]))

			return [rX, rY, rZ].map(r => r % Math.PI)
		},

		deltaRotation() {
			console.log('get deltaRotation')
			const rotation = this.relative.reduce((quaternion, tracker) => {
				const from = Vector.normalize([], tracker.start)
				const to = Vector.normalize([], tracker.end)
				return Quaternion.add([], quaternion, Quaternion.rotationTo([], from, to))
			}, Quaternion.create())

			return Quaternion.normalize([], rotation)
		},

		rotationMatrix() {
			return Matrix.fromQuat([], this.deltaRotation)
		},

		average() {
			console.log('get average')
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
				console.warn(summary, delta)
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
		width: 200px
		height: 5px
		background-color: red
</style>
