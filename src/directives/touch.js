export default {
  update(el, binding) {
    const tracker = binding.value
    if(binding.modifiers.track && tracker) {
      // const left = +(el.style.left.replace(/(px)/, ''))
      // const top = +(el.style.top.replace(/(px)/, ''))
      // console.log(el.style.left, left, el.style.top)
      // el.style.left = top + tracker.final.client[0] - tracker.start.client[0] + 'px'
      // el.style.top = left + tracker.final.client[1] - tracker.start.client[1] + 'px'
    }
  }
}
