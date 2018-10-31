const pointerOptions = new Map()

function create3dMatrix(array = [0, 0, 0, 0, 0, 0]) {
  if (array.length === 6) {
    array = [array[0], array[1], 0, 0, array[2], array[3], 0, 0, 0, 0, 1, 0, array[4], array[5], 0, 1]
  } else if (array.length !== 16) {
    throw new Error('Invalid matrix length: ' + array.length)
  }

  return array
}

function create3dMatrixFromString(string) {
  string = string.replace(/^matrix(3d)?/, '')
  let array = string.match(/-?[\d\.]+/g)

  if (array) {
    array = array.map(value => parseFloat(value))
  } else {
    array = [1, 0, 0, 1, 0, 0]
  }

  return create3dMatrix(array)
}

// console.log(create3dMatrixFromString('matrix(1, 0, 0, 1, 0, 0)'))
// console.log(create3dMatrixFromString('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'))

function getComputed3dMatrix(computedStyle) {
  let transformProperty = computedStyle.getPropertyValue('transform')

  const matrix = create3dMatrixFromString(transformProperty)

  return matrix
}

function addTransformMatrices(...matrices) {
  return matrices.reduce((matrix, next) => {
    next = create3dMatrix(next)

    for (let index in next) {
      if (index in matrix) {
        matrix[index] += next[index]
      } else {
        matrix[index] = next[index]
      }
    }

    return matrix
  }, new Array(16).fill(0))
}

function _setStyleProperties(el, mapObject, cb) {
  for (let key in mapObject) {
    el.style.setProperty(key, mapObject[key])
  }

  cb && setImmediate(cb)
}
let setStyleProperties = _setStyleProperties

function _removeStyleProperties(el, keyArray, cb) {
  for (let key of keyArray) {
    el.style.removeProperty(key)
  }

  cb && setImmediate(cb)
}
let removeStyleProperties = _removeStyleProperties

if (window.requestAnimationFrame) {
  setStyleProperties = (el, mapObject, cb) => {
    window.requestAnimationFrame(() => {
      _setStyleProperties(el, mapObject, cb)
    })
  }

  removeStyleProperties = (el, mapObject, cb) => {
    window.requestAnimationFrame(() => {
      _removeStyleProperties(el, mapObject, cb)
    })
  }
}

function translateOnPointerDown(event) {
  const el = event.target
  console.log(event)
  if(pointerOptions.has(el)) {
    const options = pointerOptions.get(el)
    const transformOptions = options.transform || {}
    const computedStyle = window.getComputedStyle(el)
    let initialMatrix = getComputed3dMatrix(computedStyle)

    let initialTranslateValues = [-1 * event.clientX, -1 * event.clientY]

    if (transformOptions.translate) {
      initialMatrix = addTransformMatrices(initialMatrix, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ...initialTranslateValues, 0, 0])
      setStyleProperties(el, {
        'touch-action': 'none',
        'transition': computedStyle.getPropertyValue('transition') + ', transform 0s'
      })
    }

    function _onPointerMove(event) {
      let matrix = initialMatrix
      if (transformOptions.translate) {
        matrix = addTransformMatrices(matrix, [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          // event.clientX,
          transformOptions.translateX ? event.clientX : -1 * initialTranslateValues[0],
          // event.clientY,
          transformOptions.translateY ? event.clientY : -1 * initialTranslateValues[1],
          0, 0
        ])
      }

      setStyleProperties(el, {
        'transform': `matrix3d(${ matrix.join(',') })`
      })
    }

    function _onPointerUp(event) {
      document.removeEventListener('pointermove', _onPointerMove)
      document.removeEventListener('pointercancel', _onPointerUp)
      document.removeEventListener('pointerup', _onPointerUp)

      el.releasePointerCapture(event.pointerId)

      removeStyleProperties(el, ['transition', 'touch-action'], () => {
        removeStyleProperties(el, ['transform'])
      })
    }

    el.setPointerCapture(event.pointerId)

    document.addEventListener('pointermove', _onPointerMove)
    document.addEventListener('pointerup', _onPointerUp)
    document.addEventListener('pointercancel', _onPointerUp)
  }
}

function setPointerOptions(el, bindings) {
  const xy = !('x' in bindings.modifiers || 'y' in bindings.modifiers)

  let options = {
    transform: bindings.arg !== 'transform' ? null : {
      translate: bindings.value === 'translate',
      translateX: bindings.modifiers.x || xy,
      translateY: bindings.modifiers.y || xy
    },

    reset: !!bindings.modifiers.reset
  }

  if (pointerOptions.has(el)) {
    options = Object.assign({}, pointerOptions.get(el), options)
  }

  pointerOptions.set(el, options)
}

export default {
  bind: setPointerOptions,
  update: setPointerOptions,

  inserted(el) {
    el.addEventListener('pointerdown', translateOnPointerDown)

    const eventTypes = [
      // 'pointerenter',
      // 'pointerover',
      // 'pointerdown',
      // 'pointermove',
      // 'pointerup',
      // 'pointerleave',
      // 'pointerout',
      // 'pointercancel',
      // 'gotpointercapture',
      // 'lostpointercapture'
    ]

    eventTypes.forEach(eventType => {
      el.addEventListener(eventType, event => {
        console.log(event.type, event)
        // event.preventDefault()
        // event.stopPropagation()
      }, {
        // passive: false
      })
    })

    // console.log('inserted')
  },

  // componentUpdated() {
  //   console.log('componentUpdated')
  // },

  unbind(el, bindings) {
    // console.log('unbind')
    el.removeEventListener('pointerdown', translateOnPointerDown)
    pointerOptions.delete(el)
  }
}
