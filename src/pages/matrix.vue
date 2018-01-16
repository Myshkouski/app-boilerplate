<template lang="pug">
ul
	p relative: {{ relative }}
	p average: {{ average }}
	p rotation: {{ rotation }}
	p averageDelta: {{ averageDelta }}
</template>

<script>
import {
	Matrix4,
	Vector2,
	Vector3
} from 'math.gl'

export default {
	data() {
		return {
			trackers: [{
				start: [2, 1, 0],
				end: [1, 1, 0]
			}, {
				start: [0, 1, 0],
				end: [-1, -1, 0]
			}]
		}
	},

	computed: {
		space() {
			return (new Matrix4()).identity()
		},

		deltaPosition() {
			console.log('get deltaPosition')
			return this.trackers.map(tracker => {
				return (new Vector3(tracker.end)).subtract(tracker.start)
			})
		},

		relative() {
			console.log('get relative')
			return this.trackers.map(tracker => {
				return {
					start: (new Vector3(tracker.start)).subtract(this.average.start),
					end: (new Vector3(tracker.end)).subtract(this.average.end)
				}
			})
		},


		rotation() {
			console.log('get rotation')
			const computeBasisAngles = (rotation, value, index, vector) => {
				const basis = Array(vector.length).fill(0)
				basis[index] = 1

        /**
        @ TODO Direction
        */

				rotation[index] = (new Vector3(vector)).scale(basis).angle(basis)

				return rotation
			}

			const rotation = this.relative.map(tracker => {
				return {
					start: tracker.start.reduce(computeBasisAngles, []),
					end: tracker.end.reduce(computeBasisAngles, [])
				}
			})

			return rotation
		},

    deltaRotation() {
			console.log('get deltaRotation')
      return this.rotation.map(rotation => {
				return (new Vector3(rotation.end)).subtract(rotation.start)
			})
    },

		average() {
			console.log('get average')
			const summary = this.trackers.reduce((summary, tracker) => {
				return Object.assign(summary, {
					start: summary.start.add(tracker.start),
					end: summary.end.add(tracker.end)
				})
			}, {
				start: new Vector3([0, 0, 0]),
				end: new Vector3([0, 0, 0])
			})

			const scale = 1 / this.trackers.length

			return {
				start: summary.start.scale(scale),
				end: summary.end.scale(scale)
			}
		},

		averageDelta() {
      const computeSummary = (summary, delta) => {
        console.warn(summary, delta)
        return summary.add(delta)
      }

			return {
				position: this.deltaPosition.reduce(computeSummary, new Vector3([0, 0, 0])).scale(1 / this.deltaPosition.length),
        rotation: this.deltaRotation.reduce(computeSummary, new Vector3([0, 0, 0])).scale(1 / this.deltaRotation.length)
			}
		},
	}
}
</script>
