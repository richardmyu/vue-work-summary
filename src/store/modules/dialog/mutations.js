const SET_DIALOG_MAP = 'SET_DIALOG_MAP'
const REMOVE_DIALOG_MAP = 'REMOVE_DIALOG_MAP'
const CLEAR_DIALOG_MAP = 'CLEAR_DIALOG_MAP'

const mutations = {
  [SET_DIALOG_MAP](state, { key, value }) {
    state.dialogMap = {
      ...state.dialogMap,
      [key]: value
    }
  },
  [REMOVE_DIALOG_MAP](state, key) {
    let isHas = Object.keys(state.dialogMap).includes(key)
    if (!isHas) {
      return
    } else {
      state.dialogMap = {
        ...state.dialogMap,
        [key]: null
      }
    }
  },
  [CLEAR_DIALOG_MAP](state) {
    state.dialogMap = {}
  }
}

export default mutations
