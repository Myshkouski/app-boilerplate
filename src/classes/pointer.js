const eventProps = 'clientX clientY width height tiltX tiltY pressure'.split(' ')

const assignEventProps = (obj, ...args) => {
  for(let key in args) {
    const arg = args[key]
    for(let prop of eventProps) {
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
      relative: Vector.fromValues(0, 0, 0),

      size: Vector.fromValues(options.width || 0, options.height || 0, 0),
      tilt: Vector.fromValues(options.tiltX || 0, options.tiltY || 0, 0),
      pressure: Vector.fromValues(0, 0, options.pressure || 1)
    }

    const elRect = el.getBoundingClientRect()
    const elPosition = Vector.create(elRect.left, elRect.top, 0)

    Vector.sub(pointerState.relative, pointerState.client, elPosition)

    return pointerState
  }
}

export class Pointer {
  static create({
    id,
    type
  }, {
    options,
    el
  }) {
    const pointer = {
      id: id || options.pointerId || -1,
      type: type || options.pointerType || 'default',
      el,
      start: PointerState.create({
        options,
        el
      }),
      final: PointerState.create({
        options,
        el
      })
    }

    return pointer
  }

  static update(pointer, {
    options,
    el
  }) {
    pointer.final = PointerState.create({
      options,
      el
    })
  }
}

export class MousePointer extends Pointer {
  static create({
    options,
    el
  }) {
    return Pointer.create({
      id: -1,
      type: 'mouse'
    }, {
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
