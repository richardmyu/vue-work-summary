<template>
  <div class="screen-full__container">
    <p class="s-pd-b-20">
      原生:
      <i v-show="isShow" class="iconfont iconarrow-smaller s-cp" @click="handleScreenFull"></i>
      <i v-show="!isShow" class="iconfont iconarrow-bigger s-cp" @click="handleScreenFull"></i>
    </p>
    <p>元素全屏--图片</p>
    <ul class="sf-items" flex="dir:left cross:center">
      <li class="sf-item">
        <img src="@/assets/images/testImg001.jpg" alt @click="handleImgFull" />
      </li>
      <li class="sf-item">
        <img src="@/assets/images/testImg002.jpg" alt @click="handleImgFull" />
      </li>
      <li class="sf-item">
        <img src="@/assets/images/testImg003.jpg" alt @click="handleImgFull" />
      </li>
      <li class="sf-item">
        <img src="@/assets/images/testImg004.jpg" alt @click="handleImgFull" />
      </li>
      <li class="sf-item">
        <img src="@/assets/images/testImg005.jpg" alt @click="handleImgFull" />
      </li>
    </ul>
  </div>
</template>

<script>
const runPrefixMethod = (element, method) => {
  let usablePrefixMethod = null
  let prefixs = ['webkit', 'moz', 'ms', 'o', '']
  method = method.slice(0, 1).toUpperCase() + method.slice(1)
  prefixs.forEach(function(prefix) {
    if (usablePrefixMethod) {
      return
    }
    if (prefix === '') {
      // 无前缀，方法首字母小写
      method = method.slice(0, 1).toLowerCase() + method.slice(1)
    }

    var typePrefixMethod = typeof element[prefix + method]
    if (typePrefixMethod + '' !== 'undefined') {
      if (typePrefixMethod === 'function') {
        // 方法
        usablePrefixMethod = element[prefix + method]()
      } else {
        // 属性
        usablePrefixMethod = element[prefix + method]
      }
    }
  })

  return usablePrefixMethod
}

/**
 * @description 打开全屏
 */
const launchFullscreen = el => {
  if (el.requestFullscreen) {
    el.requestFullscreen()
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen()
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen()
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen()
  }
}

/**
 * @description 退出全屏
 */
const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

/**
 * @description 判断是否有节点处于全屏状态
 */
const fullscreen = () => runPrefixMethod(document, 'FullscreenElement')

// const fullscreen = () =>
//   document.fullscreenElement ||
//   document.mozFullScreenElement ||
//   document.webkitFullscreenElement ||
//   document.msFullscreenElement

/**
 * @description 当前文档是否可以切换到全屏
 */
const fullscreenEnabled = () => runPrefixMethod(document, 'fullscreenEnabled')
// const fullscreenEnabled = () =>
//   document.fullscreenEnabled ||
//   document.mozFullScreenEnabled ||
//   document.webkitFullscreenEnabled ||
//   document.msFullscreenEnabled

export default {
  data() {
    return {
      isShow: false,
      isF11: false
    }
  },
  methods: {
    handleScreenFull() {
      this.isShow = !this.isShow
      this.toggleFullScreen(document.documentElement)
    },
    /**
     * @description 进入全屏/退出全屏
     */
    toggleFullScreen(ele) {
      let isFullscreen = fullscreen()
      let isFullscreenEnabled = fullscreenEnabled()
      if (isFullscreenEnabled) {
        if (!isFullscreen) {
          launchFullscreen(ele)
        } else {
          exitFullscreen()
        }
      } else {
        this.$message({
          message: '抱歉，您的浏览器不支持全屏或者您可能设置浏览器禁止全屏',
          type: 'warning'
        })
      }
    },
    /**
     * @description 监听全屏进入/退出状态（处理 ESC 退出 icon 的改变）
     */
    screenChange() {
      let isFullscreen = fullscreen()
      if (isFullscreen) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    /**
     * @description 键盘输入事件处理（处理 F11）
     */
    keyDownEvent(e) {
      if (e.keyCode === 122 && e.cancelable) {
        e.preventDefault() //阻止F11默认动作
        this.isShow = !this.isShow
        this.toggleFullScreen(document.documentElement)
      }
    },
    /**
     * @description 图片全屏
     */
    handleImgFull() {
      event.stopPropagation
      this.toggleFullScreen(event.target)
    }
  },
  created() {
    this.isFullscreen = fullscreen()
    this.isFullscreenEnabled = fullscreenEnabled()
  },
  mounted() {
    document.addEventListener('fullscreenchange', this.screenChange, false)
    document.addEventListener('msfullscreenchange', this.screenChange, false)
    document.addEventListener('keydown', this.keyDownEvent, false)
  },
  destroyed() {
    document.removeEventListener('fullscreenchange', this.screenChange, false)
    document.removeEventListener('msfullscreenchange', this.screenChange, false)
    document.removeEventListener('keydown', this.keyDownEvent, false)
  }
}
</script>

<style scoped lang='scss'>
.screen-full__container {
  .sf-items {
    .sf-item {
      width: 120px;
      height: 100px;
      overflow: hidden;
      margin-left: 16px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
