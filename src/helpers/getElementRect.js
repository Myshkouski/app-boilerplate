export default el => {
  if ( typeof el.getBoundingClientRect == 'function' ) {
    return el.getBoundingClientRect()
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHright,
      x: el.offsetTop,
      y: el.offsetLeft
    }
  }
}
