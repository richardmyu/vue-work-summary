export default {
  methods: {
    /**
     * @description 表格选中，默认高亮第一条数据
     */
    setFirstRowSelected() {
      this.$refs.elTable.$el.focus()
      this._handleSetCurrentRowWithIndex(0)
    },
    /**
     * @description 通过行，高亮指定行
     */
    setRowSelected(row) {
      this.$refs.elTable.$el.focus()
      this.$refs.elTable.setCurrentRow(row)
    },
    /**
     * @description 通过索引，高亮指定行
     */
    setRowSelectedWithIndex(index) {
      this.$refs.elTable.$el.focus()
      this.$refs.elTable.setCurrentRow(this.$refs.elTable.data[index])
    },
    /**
     * @description 高亮选中行（表格不获取焦点）
     */
    _handleSetCurrentRowWithIndex(index) {
      this.$refs.elTable.setCurrentRow(this.$refs.elTable.data[index])
    }
  }
}
