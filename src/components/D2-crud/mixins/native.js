import findIndex from 'lodash/findIndex'
export default {
  methods: {
    /**
     * @description 行选中状态
     * @param {} currentRow
     * @param {} oldCurrentRow
     */
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.currentRowIndex = findIndex(this.$refs.elTable.data, currentRow)
      this._handleIntoView(this.currentRowIndex)
      if (currentRow) {
        this.$emit('current-change', currentRow, oldCurrentRow)
      }
    },
    /**
     * @description 行勾选数据时触发的事件
     */
    handleSelect(selection, row) {
      this.$emit('select', selection, row)
    },
    /**
     * @description 全勾选
     */
    handleSelectAll(selection) {
      this.$emit('select-all', selection)
    },
    /**
     * @description 勾选变化
     */
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    /**
     * @description 单元格 hover enter
     */
    handleCellMouseEnter(row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event)
    },
    /**
     * @description 单元格 hover leave
     */
    handleCellMouseLeave(row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event)
    },
    /**
     * @description 单元格 click
     */
    handleCellClick(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },
    /**
     * @description 单元格 dblclick
     */
    handleCellDblclick(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event)
    },
    /**
     * @description 行 click
     */
    handleRowClick(row, event, column) {
      this.$emit('row-click', row, event, column)
    },
    /**
     * @description 行 contextmenu
     */
    handleRowContextmenu(row, event) {
      this.$emit('row-contextmenu', row, event)
    },
    /**
     * @description 行 dblclick
     */
    handleRowDblclick(row, event) {
      this.$emit('row-dblclick', row, event)
    },
    /**
     * @description 表头 click
     */
    handleHeaderClick(column, event) {
      this.$emit('header-click', column, event)
    },
    /**
     * @description 表头 contextmenu
     */
    handleHeaderContextmenu(column, event) {
      this.$emit('header-contextmenu', column, event)
    }
  }
}
