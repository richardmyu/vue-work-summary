import GetFixedColumns, { filterColumns } from '@/libs/columns/column'
import { normalizeMoney } from '@/plugins/filter/normalizeMoney.js'

const baseColumns = function() {
  return [
    {
      title: '图片',
      key: 'image',
      width: '60',
      align: 'center',
      component: {
        render: (h, row) => {
          return (
            <el-popover placement="top-start" width="200" trigger="hover">
              <img src={row.image} style="width:200px;height:200px;"></img>
              <img
                src={row.image}
                slot="reference"
                style="width:30px;height:30px;"
              ></img>
            </el-popover>
          )
        }
      }
    },
    {
      title: 'ID',
      key: 'id',
      width: 180,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      title: '编号',
      key: 'code',
      align: 'center',
      showOverflowTooltip: true
    },
    {
      title: '名称',
      key: 'name',
      align: 'center',
      showOverflowTooltip: true
    },
    {
      title: '条码',
      key: 'barCode',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      title: '规格',
      key: 'sepcification',
      align: 'center',
      showOverflowTooltip: true
    },
    {
      title: '产地',
      key: 'address',
      width: 180,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      title: '价格',
      key: 'price',
      width: 80,
      align: 'center',
      showOverflowTooltip: true,
      component: {
        render: (h, row) => {
          return <span>{normalizeMoney(row.price)}</span>
        }
      }
    },
    {
      title: '上架时间',
      key: 'date',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      title: '状态',
      key: 'status',
      width: 60,
      align: 'center',
      component: {
        render: (h, row) => {
          return <span>{row.status ? '有货' : '缺货'}</span>
        }
      }
    },
    {
      title: '备注',
      key: 'remark',
      minWidth: 200,
      align: 'center',
      showOverflowTooltip: true
    }
  ]
}

export default function(conf = {}) {
  return {
    columns: () => [
      ...GetFixedColumns.call(this),
      {
        title: '操作',
        key: 'operation',
        fixed: 'left',
        width: '120',
        align: 'center',
        component: {
          render: (h, row) => {
            if (row._level === 0) {
              return (
                <span>
                  <el-button
                    onClick={() => {
                      return this.handleAdd()
                    }}
                    type="primary"
                    circle
                  >
                    增
                  </el-button>
                  <el-button
                    onClick={() => this.handleRemove(row.id)}
                    type="danger"
                    circle
                  >
                    删
                  </el-button>
                  <el-button
                    onClick={() => this.handleModify(row)}
                    type="warning"
                    circle
                  >
                    改
                  </el-button>
                </span>
              )
            }
          }
        }
      },
      ...filterColumns(baseColumns.call(this), conf)
    ]
  }
}
