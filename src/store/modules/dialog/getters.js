const getters = {
  getDialogItem: state => key => {
    let isHas = Object.keys(state.dialogMap).includes(key)
    if (!isHas) {
      return null
    }
    return state.dialogMap[key]
  }
}

export default getters
