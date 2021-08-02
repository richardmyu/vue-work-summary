const SET_MENU = 'SET_MENU'
const CHANGE_ISHOME = 'CHANGE_ISHOME'
const SET_BREADCRUMB = 'SET_BREADCRUMB'

const mutations = {
  [SET_MENU](state, menus) {
    state.menu = menus
  },
  [CHANGE_ISHOME](state, isHome) {
    state.isHome = isHome
  },
  [SET_BREADCRUMB](state, breadcrumbs) {
    state.breadcrumb = breadcrumbs
  }
}

export default mutations
