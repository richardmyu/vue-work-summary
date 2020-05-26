import Vue from 'vue'
import Router from 'vue-router'
import { ignoreRoutes } from './map'
import store from '../store/index'
Vue.use(Router)

export default dynamicRoutes => {
  const otherRoutes = dynamicRoutes[0].children.length === 0 ? [] : ignoreRoutes

  dynamicRoutes[0].children.push.apply(dynamicRoutes[0].children, otherRoutes)

  const router = new Router({
    base: '/',
    routes: [
      ...dynamicRoutes,
      {
        name: 'home',
        path: '/home',
        component: () => import('@/layout/home.vue'),
        meta: {
          title: '首页',
          pool: true,
          cahce: true,
          requiresAuth: true
        }
      },
      {
        name: 'page404',
        path: '/page404',
        component: () => import('@/page/page404/index.vue'),
        meta: {
          title: '页面不存在'
        }
      },
      {
        path: '*',
        redirect: {
          name: 'page404'
        }
      }
    ]
  })
  router.beforeEach(async (to, from, next) => {
    store.commit('yuSys/menu/SET_BREADCRUMB', to.fullPath.slice(1).split('/'))

    // 从其他页面跳往主页
    if (to.path === '/home') {
      store.commit('yuSys/menu/CHANGE_ISHOME', true)
    }

    // 从主页跳往其他页 或 刷新当前非主业
    if (from.path === '/home' || (from.path === '/' && to.path !== '/home')) {
      store.commit('yuSys/menu/CHANGE_ISHOME', false)
    }
    next()
  })

  return router
}
