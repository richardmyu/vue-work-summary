<script>
export default {
  name: 'render-component',
  props: {
    /**
     * @description
     */
    renderFunction: {
      type: Function,
      required: true
    },
    /**
     * @description scope
     */
    scope: {
      default: null
    },
    /**
     * @description 当前选中行
     */
    currentRowIndex: {
      default: 0
    }
  },
  render(h) {
    return this.handleRender(h, this.scope, this.currentRowIndex)
  },
  methods: {
    handleRender(h, scope, currentRowIndex) {
      if (typeof scope === 'string') {
        return this.renderFunction(h, scope, currentRowIndex)
      }
      return this.renderFunction(
        h,
        scope.row,
        scope.$index,
        scope.$index === currentRowIndex,
        scope.column
      )
    }
  }
}
</script>
