import {
  vec3 as Vector
} from 'gl-matrix'

const eventProps = 'clientX clientY width height tiltX tiltY pressure'.split(' ')

const assignEventProps = (obj, ...args) => {
  for (let key in args) {
    const arg = args[key]
    for (let prop of eventProps) {
      obj[prop] = arg[prop]
    }
  }
  return obj
}

export class PointerState {
  static create({
    options,
    el
  }) {
    const pointerState = {
      client: Vector.fromValues(options.clientX || 0, options.clientY || 0, 0),
      element: Vector.fromValues(0, 0, 0),

      size: Vector.fromValues(options.width || 1, options.height || 1, 0),
      tilt: Vector.fromValues(options.tiltX || 0, options.tiltY || 0, 0),
      pressure: Vector.fromValues(0, 0, options.pressure || .5)
    }

    const elRect = el.getBoundingClientRect()
    const elPosition = Vector.fromValues(elRect.left, elRect.top, 0)

    Vector.sub(pointerState.element, pointerState.client, elPosition)

    return pointerState
  }
}

export class Pointer {
  static create({
    id,
    type
  }, {
    options,
    el,
    getStart,
    getFinal
  }) {
    const pointer = {
      id: typeof id != 'undefined' ? id : Pointer.getPointerId(options),
      type: type || options.pointerType || 'default',
      el,
      start: typeof getStart == 'function' ? getStart() : PointerState.create({
        options,
        el
      }),
      final: typeof getFinal == 'function' ? getFinal() : PointerState.create({
        options,
        el
      })
    }

    Object.defineProperties(pointer, {
      x: {
        get() {
          return this.final.element[0]
        }
      },

      y: {
        get() {
          return this.final.element[1]
        }
      },

      pressure: {
        get() {
          return this.final.pressure[2]
        }
      },

      size: {
        get() {
          return Vector.length(this.final.size)
        }
      }
    })

    return pointer
  }

  static getPointerId(options) {
    return options.pointerId || options.id || -1
  }

  static update(pointer, {
    options,
    el
  }) {
    Object.assign(pointer, {
      final: PointerState.create({
        options,
        el
      })
    })

    return pointer
  }
}

export class MousePointer extends Pointer {
  static get id() {
    return -1
  }

  static get type() {
    return 'mouse'
  }

  static create({
    options,
    el
  }) {
    return Pointer.create(MousePointer, {
      el,
      options
    })
  }
}

export class TouchPointer extends Pointer {
  static create({
    options,
    el
  }) {
    return Pointer.create({
      id: options.identifier,
      type: 'touch'
    }, {
      el,
      options
    })
  }
}
