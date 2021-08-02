import mutations from './mutations'
import getters from './getters'
const state = {
  dialogMap: {}
}

const dislogs = {
  namespaced: true,
  state,
  getters,
  mutations
}
export default dislogs
