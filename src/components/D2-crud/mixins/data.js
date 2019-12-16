import _clonedDeep from 'lodash/cloneDeep'
import _set from 'lodash/set'
import _get from 'lodash/get'
export default {
  methods: {
    /**
     * @description lodashe.get
     */
    _get,
    /**
     * @description lodashe.set
     */
    _set,
    /**
     * @description 同步外部表格数据到 d2Data
     */
    handleDataChange() {
      if (this.d2Data !== this.data) {
        this.d2Data = _clonedDeep(this.data)
        if (this.pagination) {
          this.d2PaginationData = this.d2Data.slice(
            this.paginationDataStart,
            this.paginationDataEnd
          )
        }
      }
    },
    /**
     * @description 包装表格数据
     */
    createData(data, parent, level, expandedAll) {
      let tmp = []
      data.forEach((record, index) => {
        this.$set(record, '_index', index)
        if (typeof record._expanded === 'undefined') {
          this.$set(record, '_expanded', expandedAll)
        }
        if (parent) {
          this.$set(record, '_parent', parent)
        }
        let tmpLevel = 0
        if (typeof level !== 'undefined' && level !== null) {
          tmpLevel = level + 1
        }
        this.$set(record, '_level', tmpLevel)
        tmp.push(record)
        if (record.childrens && record.childrens.length > 0) {
          const children = this.createData(
            record.chidlrens,
            record,
            tmpLevel,
            expandedAll
          )
          tmp = tmp.concat(children)
        }
      })
      return tmp
    },
    /**
     * @description 排序数据变化
     */
    handleSortDataChange() {
      this.$nextTick(() => {
        if (this.pagination) {
          let j = 0
          for (
            let i = this.paginationDataStart;
            i < this.paginationDataEnd;
            i++
          ) {
            this.d2Data[i] = this.$refs.elTable.store.states.data[j]
            j += 1
          }
        } else {
          this.d2Data = this.$refs.elTable.store.states.data
        }
      })
    },
    /**
     * @description 排序状态
     */
    handleSortChange({ column, prop, order }) {
      this.handleSortDataChange()
      this.$emit('sort-change', {
        column,
        prop,
        order
      })
    },
    /**
     * @description 更新行数据
     * @param {Number} index 表格数据索引
     * @param {Object} row 更新的表格行数据
     */
    updateRow(index, row) {
      if (this.pagination) {
        this.$set(this.d2Data, index + this.paginationDataStart, row)
      } else {
        this.$set(this.d2Data, index, row)
      }
      if (this.defaultSort) {
        this.handleSortDataChange()
      }
    },
    /**
     * @description 新增行数据
     * @param {Object} row 新增的表格行数据
     */
    addRow(row) {
      this.$set(this.d2Data, this.daData.length, row)
      if (this.defaultSort) {
        this.handleSortDataChange()
      }
    },
    /**
     * @description 删除行
     * @param {Oject} index 删除行索引
     */
    removeRow(index) {
      if (this.pagination) {
        this.$delete(this.d2Data, index + this.paginationDataStart)
      } else {
        this.$delete(this.d2Data, index)
      }
      if (this.defaultSort) {
        this.handleSortDataChange()
      }
    }
  }
}
