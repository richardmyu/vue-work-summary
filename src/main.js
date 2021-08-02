import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// kr-filter
// import krFilter from 'kr-filter'
// import 'kr-filter/lib/kr-filter.css'

// 公共样式
import '@/assets/style/normal.css'
import '@/assets/style/reset.scss'
import '@/assets/style/help.scss'
import '@/assets/style/brower.scss'
// flex-style
import 'flex.css'
// element-style
import '@/assets/style/theme/index.scss'

import { getBaseInfo } from '@/libs/init'
import {
  generateDynamicMenu,
  generateDynamicRouting
} from '@/router/dynamic-routes'

// 全局组件
import D2Crud from '@/components/D2-crud'

import normalizeMoney from '@/plugins/filter/normalizeMoney'
import focus from '@/plugins/directive/focus'

Vue.use(Element)
// Vue.use(krFilter)
Vue.use(D2Crud)
Vue.use(normalizeMoney)
Vue.use(focus)

Vue.config.productionTip = false
//
const initApp = async () => {
  const baseInfo = await getBaseInfo()
  const store = require('@/store').default
  let ids = []
  let allMenus = generateDynamicMenu([])
  if (baseInfo && baseInfo.menu) {
    ids = baseInfo.menu
    allMenus = generateDynamicMenu(ids)
  }
  const generateRouting = require('./router/index').default
  const frameInRoutes = generateDynamicRouting(ids)
  const router = generateRouting(frameInRoutes)
  // console.log('router', router)
  new Vue({
    router,
    store,
    render: h => h(App),
    created() {
      this.$store.commit('yuSys/menu/SET_MENU', allMenus)
    }
  }).$mount('#app')
}
Promise.resolve(initApp()).catch(async error => {
  if (error) {
    console.error('error', error)
  }
})
