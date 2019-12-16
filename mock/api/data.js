const Mock = require('mockjs')
const Random = Mock.Random

module.esports = {
  'GET /api/getTable(.*)': (req, res) => {
    console.log(req, res)

    const newData = {
      content: 'data',
      total: 12,
      code: '0001',
      success: true
    }
    return Mock.mock(newData)
  }
}

// pageData
// Mock.mock(/\/getPage\?page=(\d)+&pageSize=(\d)+/, options => {
//   let reg = /page=(\d+)&pageSize=(\d+)/
//   reg.exec(options.url)
//   let page = RegExp.$1 !== 'Function' ? RegExp.$1 : 1
//   let pageSize = RegExp.$2 !== 'Function' ? RegExp.$2 : 6

//   let data = pageData.slice(pageSize * (page - 1), pageSize * page)
//   const newData = {
//     content: data,
//     total: pageData.length,
//     code: '0001',
//     success: true
//   }
//   return Mock.mock(newData)
// })

// 修改/删除
// Mock.mock(/\/getPage(\?id=([0-9a-zA-Z-]+))?/, options => {
//   let type = options.type
//   let body = JSON.parse(options.body)
//   let reg = /\?id=([0-9a-zA-Z-]+)/
//   reg.exec(options.url)
//   let id = RegExp.$1 !== 'Function' ? RegExp.$1 : null
//   let index = 0
//   for (let i of pageData) {
//     if (i.id === id) {
//       index = pageData.indexOf(i)
//     }
//   }
//   // 删除
//   if (id && type === 'DELETE') {
//     console.log('DELETE')
//     pageData.splice(index, 1)
//   }
//   // 修改
//   if (id && type === 'PUT' && body) {
//     pageData.splice(index, 1, body)
//   }
//   // 新增
//   if (!id && type === 'POST' && body) {
//     console.log('POST')
//     let id
//     let onlyId
//     do {
//       id = Random.guid()
//       onlyId = pageData.every(item => {
//         return item.id !== id
//       })
//     } while (!onlyId)
//     let data = {
//       image: Random.dataImage('200x200'),
//       id: id,
//       ...body
//     }
//     pageData.splice(0, 0, data)
//   }

//   const newData = {
//     content: null,
//     code: '0001',
//     success: true
//   }
//   return Mock.mock(newData)
// })

// Mock.mock('/setTable', options => {
//   return Mock.mock('is ok')
// })

// Mock.mock(
//   /\/getAuths\?page=(\d)+&pageSize=(\d)+(&[a-zA-Z]+=[\u4e00-\u9fa5_a-zA-Z0-9-]+)?/,
//   options => {
//     let reg = /page=(\d+)&pageSize=(\d+)(?:&([a-zA-Z]+)=([\u4e00-\u9fa5_a-zA-Z0-9-]+))?/
//     reg.exec(options.url)
//     let page = RegExp.$1 !== 'Function' ? RegExp.$1 : 1
//     let pageSize = RegExp.$2 !== 'Function' ? RegExp.$2 : 6
//     let queryType = RegExp.$3 !== 'Function' ? RegExp.$3 : null
//     let queryText = RegExp.$4 !== 'Function' ? RegExp.$4 : null
//     let queryData = []
//     if (queryType && queryText) {
//       if (queryType === 'query') {
//         authData.filter(item => {
//           Object.keys(item).map(ite => {
//             if (item[ite] === queryText) {
//               queryData.push(item)
//             }
//           })
//         })
//       } else {
//         authData.filter(item => {
//           if (item[queryType] === queryText) {
//             queryData.push(item)
//           }
//         })
//       }
//     } else {
//       queryData = authData
//     }
//     let data = queryData.slice(pageSize * (page - 1), pageSize * page)
//     const newData = {
//       content: data,
//       total: queryData.length,
//       code: '0001',
//       success: true
//     }
//     return Mock.mock(newData)
//   }
// )

// Mock.mock(/\/getAuths\?id=([0-9a-zA-Z_-])+/, options => {
//   let reg = /id=([0-9a-zA-Z_-]+)/
//   reg.exec(options.url)
//   let id = RegExp.$1 !== 'Function' ? RegExp.$1 : null
//   let body = JSON.parse(options.body)
//   let type = options.type
//   let index
//   for (let i of authData) {
//     if (i.id === id) {
//       index = authData.indexOf(i)
//     }
//   }
//   if (type === 'PUT' && id && body) {
//     authData.splice(index, 1, body)
//   }
//   const newData = {
//     content: null,
//     code: '0001',
//     success: true
//   }
//   return Mock.mock(newData)
// })
