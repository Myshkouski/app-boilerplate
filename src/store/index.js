export const state = () => ( {
  credentials: {}
} )

export const getters = {
  credentials: state => id => state.credentials[id] || {}
}

export const mutations = {
  credentials( state, credentials ) {
    // console.log(credentials)
    Object.assign(state.credentials, credentials)
    // console.log(state)
  }
}
