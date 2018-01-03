import Vue from 'vue'
import Store from '@alexeimyshkouski/store/dist'
import LocalStore from '@alexeimyshkouski/store-local-plugin'
import VuexStore from '@alexeimyshkouski/store-vuex'

Store.use(LocalStore)
const localStorage = new Store({ type: 'local' })

export const plugins = [
  VuexStore(localStorage, {
    'timestamp': '/time/now'
  })
]

export const strict = true

export const state = () => ( {
  location: {}
} )

export const getters = {
  credentials: state => id => {
    return localStorage.get(`/credentials/${ id }`) || null
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
  timestamp(state, now) {
    state.now = now
  },

  location(state, location) {
    Object.assign(state.location, location)
  },

  credentials( state, { id, credentials } ) {
    localStorage.set(`/credentials/${ id }`, credentials)
  },

  providers(state, providers) {
    if(Vue.localStorage) {
      Vue.localStorage.set(`providers`, JSON.stringify(providers))
    }
  }
}
