export const add = ( target, map ) => {
  map.forEach( ( {
    events,
    handler,
    options
  } ) => {
    events.forEach( event => {
      target.addEventListener( event, handler, options )
    } )
  } )
}

export const remove = ( target, map ) => {
  map.forEach( ( {
    events,
    handler,
    options
  } ) => {
    events.forEach( event => {
      target.addEventListener( event, handler, options )
    } )
  } )
}

export default {
  add,
  remove
}
