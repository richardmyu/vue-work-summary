const getters = {
  menus(state) {
    return state.menu
  },
  isHome(state) {
    return state.isHome
  },
  breadcrumbs(state) {
    return state.breadcrumb
  }
}

export default getters
