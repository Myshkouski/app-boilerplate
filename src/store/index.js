export const state = () => ( {
  credentials: {
    id: null,
    secret: null
  }
} )

export const mutations = {
  id( state, id ) {
    state.credentials.id = id
  },

  secret( state, secret ) {
    state.credentials.secret = secret
  },

  credentials( state, {
    id,
    secret
  } ) {
    Object.assign( state.credentials, {
      id,
      secret
    } )
  }
}
