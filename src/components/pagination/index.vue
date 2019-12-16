<template>
  <el-pagination
    @size-change="$emit('size-change')"
    @current-change="$emit('current-change')"
    @prev-click="$emit('prev-click')"
    @next-click="$emit('next-click')"
    :current-page.sync="page"
    :page-size.sync="size"
    :page-sizes="pageSizes"
    :pager-count="paperCount"
    :disabled="disabled"
    :small="small"
    :background="background"
    :layout="layout"
    :total="total"
    :hide-on-single-page="hideSingle"
  ></el-pagination>
</template>
<script>
/**
 *   pagination
 *
 *  Attribute
 *  - small {Boolean}[false] 是否使用小型分页样式
 *  - background {Boolean}[false] 是否为分页按钮添加背景色
 *  - page-size {Number}[10] 每页显示条目个数，支持 .sync 修饰符
 *  - total {Number} 总条目数
 *  - pager-count {Number}[7] 页码按钮的数量，当总页数超过该值时会折叠
 *  - current-page {Number}[1] 当前页数，支持 .sync 修饰符
 *  - layout {String}['prev,pager,next,jumper,->,total'] 组件布局，子组件名用逗号分隔
 *  - page-sizes {Number} [10,20,30,40,50,100]	每页显示个数选择器的选项设置
 *  - disabled {Boolean}[false] 是否禁用
 *  - hide-on-single-page {Boolean} 只有一页时是否隐藏
 *
 *  Event
 *  - size-change pageSize 改变时会触发
 *  - current-change currentPage 改变时会触发
 *  - prev-click 用户点击上一页按钮改变当前页后触发
 *  - next-click 用户点击下一页按钮改变当前页后触发
 */
export default {
  name: 'pagination',
  data() {
    return {
      // 设置每页条数
      pageSizes: [6, 12, 24]
    }
  },
  computed: {
    /**
     * @description 当前页(data)
     */
    page: {
      get() {
        return this.currentPage
      },
      set(n) {
        this.$emit('update:currentPage', n)
      }
    },
    /**
     * @description 每页条数(data)
     */
    size: {
      get() {
        return this.pageSize
      },
      set(n) {
        this.$emit('update:pageSize', n)
      }
    }
  },
  props: {
    /**
     * @description 当前页(prop)
     */
    currentPage: {
      type: Number,
      default: 1
    },
    /**
     * @description 页码按钮数
     */
    paperCount: {
      type: Number,
      default: 5
    },
    /**
     * @description 每页条数(prop)
     */
    pageSize: {
      type: Number,
      default: 10
    },
    /**
     * @description 总条目数
     */
    total: {
      type: Number,
      default: 1
    },
    /**
     * @description 是否使用小型分页样式
     */
    small: {
      type: Boolean,
      default: false
    },
    /**
     * @description 组件布局
     */
    layout: {
      type: String,
      default: 'total,sizes,prev,pager,next,jumper'
    },
    /**
     * @description 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否为分页按钮添加背景色
     */
    background: {
      type: Boolean,
      default: true
    },
    /**
     * @description 只有一页时是否隐藏
     */
    hideSingle: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang=''></style>
