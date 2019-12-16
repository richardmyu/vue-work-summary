// file
const fs = require('fs')
// path
const join = require('path').join
const mockPath = join(__dirname + '/api')

const delay = require('./delay')

/**
 *
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
  let result = []
  function finder(path) {
    // 同步读取目录，返回包含所有的文件和子目录的数组
    // 指定路径或文件的下一级全部，不区分文件夹和文件
    let files = fs.readdirSync(path)
    files.forEach((val, index) => {
      // path.join() 方法使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。
      let fPath = join(path, val)
      // 获取更详细的信息，用以区分文件和文件夹
      let stats = fs.statSync(fPath)
      // 目录/文件夹
      if (stats.isDirectory()) finder(fPath)
      // 文件
      if (stats.isFile()) result.push(fPath)
    })
  }
  finder(startPath)
  return result
}

const mock = {}

findSync(mockPath).forEach(file => {
  const ret = require(file)
  for (let key in ret) {
    // fn === 单个 mock 实例的处理函数
    const fn = ret[key]
    ret[key] = (req, res) => {
      let result = fn
      // console.log(req, res)
      if (typeof result === 'function') {
        result = result(req, res)
      }
      try {
        return res.send({
          head: {
            success: true,
            code: '000000',
            message: 'ok'
          },
          data: result
        })
      } catch (error) {
        //
      }
    }
  }
  Object.assign(mock, require(file))
})
module.exports = delay(mock)
