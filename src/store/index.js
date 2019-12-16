import Vue from 'vue'
import Vuex from 'vuex'
import yuSys from './modules'

Vue.use(Vuex)

const store = {
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    yuSys
  }
}
export default new Vuex.Store(store)
