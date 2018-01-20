import {
  mat3 as Matrix,
  vec3 as Vector,
  quat as Quaternion
} from 'gl-matrix'

export default {
  computed: {
    deltaPosition() {
      return this.points.map( point => {
        return Vector.sub( [], point.end, point.start )
      } )
    },

    relative() {
      return this.points.map( point => {
        const start = Vector.sub( [], point.start, this.center.start )
        const end = Vector.sub( [], point.end, this.center.end )

        return {
          start,
          end
        }
      } )
    },

    angles() {
      const q = this.rotation
      const rZ = Math.atan2( 2 * ( q[ 0 ] * q[ 1 ] + q[ 2 ] * q[ 3 ] ), 1 - 2 * ( q[ 1 ] * q[ 1 ] + q[ 2 ] * q[ 2 ] ) )
      const rY = Math.asin( 2 * ( q[ 0 ] * q[ 2 ] - q[ 3 ] * q[ 1 ] ) )
      const rX = Math.atan2( 2 * ( q[ 0 ] * q[ 3 ] + q[ 1 ] * q[ 2 ] ), 1 - 2 * ( q[ 2 ] * q[ 2 ] + q[ 3 ] * q[ 3 ] ) )

      return [ rX, rY, rZ ].map( r => 90 * ( r % Math.PI ) / Math.PI )
    },

    // rotationMatrix() {
    //   return Matrix.fromQuat( [], this.rotation )
    // },

    rotation() {
      const rotation = this.relative.reduce( ( quaternion, tracker ) => {
        // console.log('tracker', tracker)
        if ( !Vector.length( tracker.start ) || !Vector.length( tracker.start ) ) {
          return quaternion
        }
        const from = Vector.normalize( [], tracker.start )
        // console.log('from', from)
        const to = Vector.normalize( [], tracker.end )
        // console.log('to', to)
        const rotationTo = Quaternion.rotationTo( [], from, to )
        // console.log('rotationTo', rotationTo)
        // console.log('quaternion', quaternion)
        const lerp = Quaternion.lerp( [], quaternion, rotationTo, 1 )
        // console.warn('lerp', lerp)
        return lerp
      }, Quaternion.create() )

      // return rotation

      // return Quaternion.normalize([], rotation)

      return [ ...rotation.slice( 0, 3 ), 2 * Math.acos( rotation[ 3 ] ) ]
    },

    center() {
      const summary = this.points.reduce( ( summary, point ) => {
        return Object.assign( summary, {
          start: Vector.add( [], summary.start, point.start ),
          end: Vector.add( [], summary.end, point.end )
        } )
      }, {
        start: Vector.create(),
        end: Vector.create()
      } )

      const scale = 1 / this.points.length

      return {
        start: Vector.scale( [], summary.start, scale ),
        end: Vector.scale( [], summary.end, scale )
      }
    }
  }
}
