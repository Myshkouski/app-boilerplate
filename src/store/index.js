import Vue from 'vue'

export const state = () => ( {

} )

export const getters = {
  credentials: state => id => {
    if(Vue.localStorage) {
      try {
        return JSON.parse(Vue.localStorage.get(`credentials:${ id }`))
      } catch(err) {
        console.error(err)
        return null
      }
    } else {
      return null
    }
  },

  providers: state => {
    if(Vue.localStorage) {
      try {
        return JSON.parse(Vue.localStorage.get(`providers`))
      } catch(err) {
        console.error(err)
        return null
      }
    } else {
      return null
    }
  }
}

export const mutations = {
  credentials( state, { id, credentials } ) {
    if(Vue.localStorage) {
      Vue.localStorage.set(`credentials:${ id }`, JSON.stringify(credentials))
    }
  },

  providers(state, providers) {
    if(Vue.localStorage) {
      Vue.localStorage.set(`providers`, JSON.stringify(providers))
    }
  }
}
