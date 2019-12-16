<script>
export default {
  name: 'render-custom-component',
  props: {
    /**
     * @description v-model 双向绑定的值
     */
    value: {
      required: true
    },
    /**
     * @description 自定义参数
     */
    props: {
      default: null
    },
    componentName: {
      required: true
    },
    /**
     * @description 行数据
     */
    scope: {
      default: null
    }
  },
  render(h) {
    let self = this
    return h(self.componentName, {
      props: {
        value: self.value,
        scope: self.scope,
        ...self.props
      },
      on: {
        input: function(event) {
          self.$emit('input', event)
        }
      }
    })
  }
}
</script>
