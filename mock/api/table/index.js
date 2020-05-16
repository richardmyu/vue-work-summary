const Mock = require('mockjs')
const Random = Mock.Random

module.exports = {
  'GET /api/getTable': (req, res) => {
    const { page, pageSize } = req.query
    const newData = []
    const nums = pageSize || 12
    for (let i = 0; i < nums; i++) {
      newData.push({
        id: Random.guid(),
        date: Random.date(),
        name: Random.cname(),
        address: Random.county(true)
      })
    }
    return Mock.mock({
      content: newData,
      total: 24
    })
  }
}
