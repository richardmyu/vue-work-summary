import { maps, routes } from './map'
import { recursion, filterComponentName } from '@/libs/util'
import Home from '@/layout/home'

export const generateDynamicRouting = allowIds => {
  let frameInChildren = []
  if (allowIds.length > 0) {
    const data = routes.filter(item => {
      return ~allowIds.indexOf(item.id)
    })
    frameInChildren = data.map(item => {
      if (item.path) {
        const generalName = filterComponentName(item.path)
        item.name = generalName
        item.component = item.component(generalName)
      }
      // console.log('dy', item.component)
      return item
    })
  }
  // console.log('frameInChildren', frameInChildren)
  return [
    {
      path: '/',
      redirect: {
        name: 'home'
      },
      component: Home,
      children: frameInChildren
    }
  ]
}

export const generateDynamicMenu = allowIds => {
  let data = []
  if (allowIds.length > 0) {
    data = maps.filter(item => {
      return ~allowIds.indexOf(item.id)
    })
  }
  return recursion(data, 'id', 'pid', null)
}
