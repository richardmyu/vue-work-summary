import localforage from 'localforage'
import find from 'lodash/find'
import sortBy from 'lodash/sortBy'
// 组件名过滤
export const filterComponentName = name =>
  name.replace(/\//g, '_').replace(/^_/, '')

/**
 * 递归
 * @param data object array
 * @param primaryKey
 * @param key
 * @param value
 */
export const recursion = (data, primaryKey, key, value, sortFn = null) => {
  let result = []
  let temp
  for (const item of data) {
    if (item[key] === value) {
      temp = recursion(data, primaryKey, key, item[primaryKey], sortFn)
      if (temp.length) {
        item.children = temp
      }
      result.push(item)
    }
  }

  if (sortFn) {
    result = sortBy(result, sortFn)
  }
  return result
}

/**
 * @description 时间格式化
 */
export const dateFormat = (value, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (!value) {
    return ''
  }
  const getDate = new Date(value)
  const o = {
    'M+': getDate.getMonth() + 1,
    'd+': getDate.getDate(),
    'h+': getDate.getHours(),
    'm+': getDate.getMinutes(),
    's+': getDate.getSeconds(),
    'q+': Math.floor((getDate.getMonth() + 3) / 3),
    S: getDate.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (getDate.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
