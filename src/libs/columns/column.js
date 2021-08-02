import sortBy from 'lodash/sortBy'
import isEmpty from 'lodash/isEmpty'

export default function() {
  return [
    {
      renderHeader: h => <span>序号</span>,
      fixed: 'left',
      key: '__id',
      align: 'center',
      component: {
        render: (h, row, index, isSelected) => {
          if (row._level === 0) {
            let idx = row._index + 1
            if (
              this &&
              this.defaultParams &&
              this.defaultParams.page &&
              this.defaultParams.pageSize
            ) {
              idx =
                (this.defaultParams.page - 1) * this.defaultParams.pageSize +
                idx
            }
            if (idx < 10) {
              idx = '0' + idx
            }
            return <span>{idx}</span>
          }
        }
      },
      width: 50
    }
  ]
}

export const filterColumns = function(col, conf = {}) {
  // console.log('filterColumns---', col)
  if (isEmpty(conf)) {
    return col
  }
  col = col.filter(item => Object.keys(conf).indexOf(item.key) !== -1)
  col.forEach(item => {
    const cnf = conf[item.key]
    item.sort = cnf.sort
    item.title = cnf.webName
  })
  // console.log('sortBy---', sortBy(col, item => item.sort))
  return sortBy(col, item => item.sort)
}
