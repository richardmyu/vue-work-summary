import getters from './getters'
import mutations from './mutations'
const state = {
  menu: [],
  isHome: true,
  breadcrumb: []
}

const modele = {
  namespaced: true,
  state,
  getters,
  mutations
}

export default modele
