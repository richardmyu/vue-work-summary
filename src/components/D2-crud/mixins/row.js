export default {
  methods: {
    /**
     * @description
     */
    checkboxT(row, rowIndex) {
      if (row._level === this.selectable) {
        return true
      } else {
        return false
      }
    },
    /**
     * @description 显示行
     * @param {*} args
     */
    rowStyle(args) {
      let row = args
      if (typeof args === 'object' && args.row) {
        row = args.row
      } else {
        row = args
      }
      row._show = row._parent
        ? row._parent._expanded && row._parent._show
        : true
      return row._show ? '' : 'displat:none;'
    }
  }
}
