export default {
  props: {
    /**
     * @description 列数据
     */
    columns: {
      type: Array,
      default: () => []
    },
    /**
     * @description 数据源与 el-table 相同
     */
    data: {
      type: Array,
      default: () => []
    },
    /**
     * @description 是否全部展开树形结构
     */
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    /**
     * @description 表格最大高度
     */
    maxHeight: {
      type: [String, Number],
      default: '100%'
    },
    /**
     * @description 可展开按钮的行数
     */
    index: {
      type: Number,
      default: 1
    },
    /**
     * @description 多选框限制
     * 0 只能选择父节点
     * 1 只能选择一级子节点
     */
    selectable: {
      type: Number,
      default: 0
    },
    /**
     * @description 是否可滑动
     */
    scrollEnable: {
      tyep: Boolean,
      default: true
    },
    /**
     * @description 表格标题
     */
    title: {
      default: ''
    },
    /**
     * @description 表格配置
     */
    options: {
      type: Object,
      default: null
    },
    /**
     * @description 行索引
     */
    indexRow: {
      default: null
    },
    /**
     * @description 多选框
     */
    selectionRow: {
      default: null
    }
  },
  computed: {
    /**
     * @description 数据源
     */
    tableData() {
      return this.createData(this.data, null, null, this.defaultExpandAll)
    },
    _maxHeight() {
      return this.maxHeight
    },
    d2DataLength() {
      return this.d2Data.length
    }
  },
  watch: {
    data() {
      this.handleDataChange()
    },
    d2Data: {
      handler(val) {
        if (this.pagination) {
          this.d2PaginationData = this.d2Data.slice(
            this.paginationDataStart,
            this.paginationDataEnd
          )
        }
        this.$emit('d2-data-change', val)
      },
      deep: true
    }
  }
}
