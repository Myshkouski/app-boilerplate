export default ({ store, req, isServer, isClient }, inject) => {
  if(isServer && req) {
    store.commit('location', {
      host: req.headers['host']
    })
  } else if(isClient && global.window && window.location) {
    store.commit('location', window.location)
  }
}
