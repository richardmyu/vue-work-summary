import { filterComponentName } from '@/libs/util'
const ELEMENT_PATH = '/element/'
const CUSTOMCOMPONENT_PATH = '/custom-component/'

const load = (item, name) => {
  return import(`@/page${item.path}`).then(component => {
    if (typeof component.default === 'object') {
      component.default.name = name
    } else {
      component.default.options.name = name
    }

    return component
  })
}

const MAPS = [

  {
    id: '3',
    title: 'component',
    pid: null
  },
  // {
  //   id: '3-1',
  //   title: 'kr-filter',
  //   path: `${CUSTOMCOMPONENT_PATH}kr-filter`,
  //   pid: '3'
  // },
  {
    id: '3-2',
    title: 'd2-crud',
    path: `${CUSTOMCOMPONENT_PATH}d2-crud`,
    pid: '3'
  },
  {
    id: '3-3',
    title: 'pagination',
    path: `${CUSTOMCOMPONENT_PATH}pagination`,
    pid: '3'
  },
  // {
  //   id: '3-4',
  //   title: 'auth',
  //   path: `${CUSTOMCOMPONENT_PATH}auth`,
  //   pid: '3'
  // },
  // {
  //   id: '3-5',
  //   title: 'tree',
  //   path: `${CUSTOMCOMPONENT_PATH}tree`,
  //   pid: '3'
  // },
  {
    id: '3-6',
    title: 'screen-full',
    path: `${CUSTOMCOMPONENT_PATH}screen-full`,
    pid: '3'
  },
  {
    id: '3-7',
    title: 'dialog',
    path: `${CUSTOMCOMPONENT_PATH}dialog`,
    pid: '3'
  },
  {
    id: '3-8',
    title: 'img-item',
    path: `${CUSTOMCOMPONENT_PATH}img-item`,
    pid: '3'
  },
  {
    id: '3-9',
    title: 'multiple-format',
    path: `${CUSTOMCOMPONENT_PATH}multiple-format`,
    pid: '3'
  },
  {
    id: '3-10',
    title: 'async-switch',
    path: `${CUSTOMCOMPONENT_PATH}async-switch`,
    pid: '3'
  },
]

const ignoreMaps = []

const MAP_WITH_COMPONENT = MAPS.filter(item => !!item.path).map(item => ({
  id: item.id,
  name: '',
  path: item.path,
  meta: {
    pool: true,
    cache: !(item.cahce === false),
    requiresAuth: true,
    title: item.title
  },
  component: name => () => load(item, name)
}))

export const routes = MAP_WITH_COMPONENT
export const maps = MAPS

export const ignoreRoutes = ignoreMaps.map(item => {
  const name = filterComponentName(item.path)
  return {
    name,
    path: item.path,
    component: () => load(item, name),
    meta: {
      pool: true,
      cache: !(item.cache === false),
      requiresAuth: true,
      title: item.title
    }
  }
})
