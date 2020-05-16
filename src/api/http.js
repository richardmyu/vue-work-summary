import axios, { isCancel as IsCancel } from 'axios'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'

const baseURI = 'http://127.0.0.1:8080/api'

/**
 * @description GET
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
export function GET(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseURI + url, { params: params })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * @description POST
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
export function POST(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(baseURI + url, JSON.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * @description PUT
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
export function PUT(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(baseURI + url, JSON.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * @description DELETE
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
export function DELETE(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(baseURI + url, JSON.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
