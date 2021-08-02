<template>
  <el-dialog
    ref="syDialog"
    :width="_width"
    :center="center"
    v-dialog-drag="isDrag"
    :modal-append-to-body="false"
    append-to-body
    :custom-class="customClass"
    :visible.sync="_visible"
    :show-close="!frozen"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
    :close-on-click-modal="frozen"
    :close-on-press-escape="frozen"
  >
    <div slot="title">{{ title }}</div>
    <slot></slot>
    <slot name="footer" slot="footer"></slot>
  </el-dialog>
</template>
<script>
import dialogDrag from './dialog-drag'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers(
  'yuSys/dialog'
)

export default {
  name: 'base-dialog',
  data() {
    return {
      recalc: '',
      prevWidth: '',
      defaultClass: 'yu-dialog',
      defaultWidth: '700px',
      defaultScale: 0.8
    }
  },
  directives: {
    dialogDrag
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String
    },
    frozen: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'normal'
    },
    level: {
      type: Number,
      default: 1
    },
    scaleWidth: {
      type: Number
    }
  },
  computed: {
    ...mapState({
      dialogMap: state => state.dialogMap
    }),
    ...mapGetters(['getDialogItem']),
    // 根据弹框层级，判断是否需要拖拽
    isDrag: {
      get() {
        if (this.level === 1) {
          return true
        } else {
          return false
        }
      }
    },
    _scaleWidth: {
      get() {
        let scaleWidth = this.scaleWidth
        // 对传入的缩放比例进行合法测试
        if (typeof scaleWidth === 'number' && !Number.isNaN(scaleWidth)) {
          // 正常区间为 （0，1），超过范围，使用默认值
          if (scaleWidth >= 1) {
            scaleWidth = this.defaultScale
          } else if (scaleWidth <= 0) {
            scaleWidth = this.defaultScale
          }
        } else {
          // 不合法也会使用默认值
          scaleWidth = this.defaultScale
        }
        return scaleWidth
      }
    },
    _visible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    // 宽度计算
    _width: {
      get() {
        let prevWidth = 0
        if (this.level !== 1) {
          // 先获取 dialog 位置信息，否则 this.prevWidth 会得到 ''
          let preNodeNumber = this.level - 1
          let preNode = 'level' + preNodeNumber
          this.getDialogPositionInfo(preNode)
          prevWidth =
            this.prevWidth === '' ? 0 : Number.parseFloat(this.prevWidth)
        }
        // 没有传入 width
        if (!this.width) {
          // 一级弹框采用默认值
          if (this.level === 1) {
            return this.defaultWidth
          } else {
            // 多级弹框采用缩放比例
            return `${prevWidth * this._scaleWidth}px`
          }
        } else {
          // 传入了 width，对其有效性进行验证
          let width = String(this.width)

          // 参数携带负号
          if (/^-/.test(width)) {
            // 一级弹框采用默认值
            if (this.level === 1) {
              return this.defaultWidth
            } else {
              // 多级弹框采用缩放比例
              return `${prevWidth * this._scaleWidth}px`
            }
          }
          // 带'单位'的情况
          if (/[a-zA-Z]/.test(width)) {
            let str = width.match(/[a-zA-Z]+/)[0]
            if (str !== 'px') {
              // 单位不对， width 不合法，按照无 width 处理
              if (this.level === 1) {
                return this.defaultWidth
              } else {
                return `${prevWidth * this._scaleWidth}px`
              }
            } else {
              // 单位正确
              if (this.level === 1) {
                return width
              } else {
                // 多级弹框，比较是否超过上一级弹框宽度
                // 超过按照缩放比例计算
                let curWidth = Number.parseFloat(width)
                if (curWidth >= prevWidth) {
                  return `${prevWidth * this._scaleWidth}px`
                } else {
                  return width
                }
              }
            }
          } else {
            // 不带单位的情况
            if (this.level === 1) {
              return `${width}px`
            } else {
              if (Number.parseFloat(width) >= prevWidth) {
                return `${prevWidth * this._scaleWidth}px`
              } else {
                return `${width}px`
              }
            }
          }
        }
      }
    },
    // 自定义类名处理
    customClass: {
      get() {
        // dialog 类型
        let typeTxte = ''
        if (['normal', 'nofooter'].indexOf(this.type) === -1) {
          typeTxte = 'yu-dialog-normal'
        }
        typeTxte = 'yu-dialog-' + this.type

        // 是否多级
        let advancedText = this.level === 1 ? '' : 'yu-dialog-multi'

        return this.defaultClass + ' ' + advancedText + ' ' + typeTxte
      }
    }
  },
  methods: {
    ...mapMutations([
      'SET_DIALOG_MAP',
      'REMOVE_DIALOG_MAP',
      'CLEAR_DIALOG_MAP'
    ]),
    /**
     * @description 创建 CSS3 动画（覆盖原有动画）
     */
    createFrame() {
      // 定义 @keyframe
      const keyframes = `@-webkit-keyframes dialog-fade-in {
        0% {
          -webkit-transform: translate3d(20px, 0, 0);
          transform: translate3d(20px, 0, 0);
          opacity: 0;
        }
        100% {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
      }

      @keyframes dialog-fade-in {
        0% {
          -webkit-transform: translate3d(20px, 0, 0);
          transform: translate3d(20px, 0, 0);
          opacity: 0;
        }
        100% {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
      }

      @-webkit-keyframes dialog-fade-out {
        0% {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
        100% {
          -webkit-transform: translate3d(20px, 0, 0);
          transform: translate3d(20px, 0, 0);
          opacity: 0;
        }
      }

      @keyframes dialog-fade-out {
        0% {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
        100% {
          -webkit-transform: translate3d(20px, 0, 0);
          transform: translate3d(20px, 0, 0);
          opacity: 0;
        }
      }`
      // 创建动画容器
      let style = document.createElement('style')
      // 设置类型
      style.type = 'text/css'
      // 挂载
      style.innerHTML = keyframes
      return style
    },
    /**
     * @description 获取当前 dialog 组件，存入 vuex
     */
    getDialogComponent() {
      let el = this.$refs.syDialog.$el
      let dialog =
        el.firstElementChild || el.getElementsByClassName('sy-dialog')[0]

      this.SET_DIALOG_MAP({ key: 'level' + this.level, value: dialog })
    },
    /**
     * @description 获取前一个 dialog 弹框位置信息
     * @param {String} item 弹框层级
     */
    getDialogPositionInfo(item) {
      let dialog = this.getDialogItem(item)
      if (!dialog) {
        return null
      }
      let { right, top, width, height } = dialog.getBoundingClientRect()
      if (!width) {
        return
      }
      this.prevWidth = width + 'px'
      return {
        right,
        top,
        width,
        height
      }
    },
    /**
     * @description 设置/更新 dialog 定位数据
     * @param {String} item 弹框层级
     */
    updateDialogPositionInfo(item) {
      // 获取上一级弹框的位置
      let preNodeNumber = Number(item.slice(-1)) - 1
      let preNode = 'level' + preNodeNumber
      let info = this.getDialogPositionInfo(preNode)
      if (!info) {
        return
      }
      let { right, top, width, height } = info

      // 获取当前弹框，并设置位置属性
      let dialog = this.getDialogItem(item)
      if (!dialog) {
        return
      }
      dialog.style.marginTop = `${top}px`
      dialog.style.marginLeft = `${right - Number.parseFloat(this._width)}px`
      dialog.style.height = `${height}px`
      // 覆盖动画
      let style = dialog.getElementsByTagName('style')
      if (this.level !== 1 && style.length === 0) {
        dialog.appendChild(this.createFrame())
      }
    },
    /**
     * @description 打开弹框，并记录；若是多级弹框，修正定位
     */
    handleOpen() {
      this.$emit('open')
      // 记录 dialog
      this.getDialogComponent()
      if (this.level === 1) {
        return
      }
      // 有多级弹框，监听页面缩放
      let win = window
      let doc = document
      let curItem = 'level' + this.level
      // 初始化二级及以上弹框的信息
      this.updateDialogPositionInfo(curItem)

      // 监听函数
      this.recalc = () => {
        this.updateDialogPositionInfo(curItem)
      }
      if (!doc.addEventListener) {
        return
      }
      win.addEventListener('resize', this.recalc, false)
      doc.addEventListener('DOMContentLoaded', this.recalc, false)
    },
    handleOpened() {
      this.$emit('opened')
    },
    handleClose() {
      this.$emit('close')
    },
    /**
     * @description 关闭当前弹框，清楚对应弹框信息
     */
    handleClosed() {
      let item = 'level' + this.level
      this.REMOVE_DIALOG_MAP(item)
      // 删除多级弹框的动画效果
      let el = this.$refs.syDialog.$el
      let dialog =
        el.firstElementChild || el.getElementsByClassName('sy-dialog')[0]
      let style = dialog.getElementsByTagName('style')[0]
      if (style) {
        style.remove()
      }
      if (this.level === 1) {
        // 清空 dialogMap
        this.CLEAR_DIALOG_MAP()
        // 移除监听
        if (!document.removeEventListener) {
          return
        }
        if (this.recalc) {
          window.removeEventListener('resize', this.recalc, false)
          document.removeEventListener('DOMContentLoaded', this.recalc, false)
        }
      }
      this.$emit('closed')
    }
  },
  destroyed() {
    // 移除监听事件
    if (this.recalc) {
      window.removeEventListener('resize', this.recalc, false)
      document.removeEventListener('DOMContentLoaded', this.recalc, false)
    }
  }
}
</script>
