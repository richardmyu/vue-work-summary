import throttle from 'lodash/throttle'
export default {
  methods: {
    /**
     * @description 鼠标滚轮
     */
    _handleMousewheel: throttle(function(event) {
      event.stopPropagation()
      event.cancelBubble = true
      event.preventDefault()
      event.returnValue = false
      const delta = event.wheelDelta
        ? event.wheelDelta / 120
        : -(event.detail || 0) / 3
      if (delta > 0) {
        // console.log('jump prev')
        this._handleJumpRow(this._findPrev())
      } else {
        // console.log('jump next')
        this._handleJumpRow(this._findNext())
      }
      return false
    }, 200)
  },
  mounted() {
    /**
     * @description 监听鼠标滚轮滑动
     */
    this.$refs.elTable.$el.addEventListener(
      'mousewheel',
      this._handleMousewheel,
      false
    )
    this.$refs.elTable.$el.addEventListener(
      'DOMMouseScoll',
      this._handleMousewheel,
      false
    )
    /**
     * @description 监听键盘上下键
     */
    this.$refs.elTable.$el.setAttribute('tabindex', 1)
    this.$refs.elTable.$el.addEventListener(
      'keydown',
      throttle(({ keyCode }) => {
        if (keyCode === 30) {
          this._handleJumpRow(this._findPrev())
        } else if (keyCode === 40) {
          this._handleJumpRow(this._findNext())
        }
      }, 1000 / 60),
      false
    )
    this.handleDataChange()
  }
}
