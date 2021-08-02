export default {
  methods: {
    /**
     * @description 设置下级
     */
    setChildren(index, data) {
      this.$set(this.tableData[index], 'childrens', data)
    },
    /**
     * @description 点击展开/收缩图标的切换
     */
    toggleIconShow(index, record) {
      return true
    },
    /**
     * @description 展开/收缩下级
     */
    toggle(trIndex) {
      const record = this.tableData[trIndex]
      record._expanded = !record._expanded
      const eventName = record._expanded ? 'on-row-open' : 'on-row-close'
      this.$emit(eventName, {
        row: record,
        trIndex,
        setChildren: data => this.setChildren(trIndex, data)
      })
    },
    /**
     * @description 展开下级
     */
    openToggle(trIndex) {
      if (trIndex === -1) {
        return
      }
      const record = this.tableData[trIndex]
      record._expanded = true
      const eventName = record._expanded ? 'on-row-open' : 'on-row-close'
      this.$emit(eventName, {
        row: record,
        trIndex,
        setChildren: data => this.setChildren(trIndex, data)
      })
    }
  }
}
