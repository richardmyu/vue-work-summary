<template>
  <div class="img-item__container" v-bind="$attrs">
    <img :src="src" :alt="alt" />
    <div class="img-mark" :class="{'img-mark-show':isMark}" ref="imgMark">
      <i v-show="isMark" class="el-icon-close s-cp img-close" @click="$emit('remove')"></i>
      <span
        class="img-text"
        :class="{
          'img-text--local':isLocal,'img-text--url':!isLocal
      }"
      >{{text}}</span>
      <span v-show="visible" class="img-tooltip">点击图片，可删除和放大查看</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImgItem',
  data() {
    return {
      visible: false,
      isMark: false,
      tooltipShow: null,
      tooltipHide: null
    }
  },
  props: {
    src: {
      type: String
    },
    alt: {
      type: String
    },
    text: {
      type: String
    },
    isLocal: {
      type: Boolean
    },
    level: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleScale() {}
  },
  created() {
    if (this.level === 1) {
      this.tooltipShow = () => {
        this.visible = true
      }
      this.tooltipHide = () => {
        this.visible = false
      }
    }
    if (this.level === 2) {
      this.visible = false
      this.tooltipShow = () => {
        this.isMark = true
      }
      this.tooltipHide = () => {
        this.isMark = false
      }
    }
  },
  mounted() {
    const mark = this.$refs.imgMark
    if (!mark) {
      return
    }
    if (!document.addEventListener) {
      return
    }
    mark.addEventListener('mouseover', this.tooltipShow, false)
    mark.addEventListener('mouseout', this.tooltipHide, false)
  },
  destroyed() {
    window.removeEventListener('mouseover', this.tooltipShow, false)
    window.removeEventListener('mouseout', this.tooltipHide, false)
  }
}
</script>

<style scoped lang='scss'>
$--color-primary: #1890ff !default;
$--color-success: #13c1a3 !default;
$--color-primary-secondary: #e8f4ff !default;
$--menu-bg-base: #262633 !default;
$--menu-color-base: #ffffff !default;
$--color-text-secondary: #93a0ad !default;
.img-item__container {
  display: inline-block;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .img-mark {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .img-close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 18px;
      height: 18px;
      color: $--menu-color-base;
    }
    .img-text {
      position: absolute;
      right: 0;
      bottom: 10px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      box-sizing: border-box;
      padding: 0 10px;
      border-radius: 14px 0 0 14px;
    }
    .img-text--local {
      background-color: $--color-primary;
      color: $--color-primary-secondary;
    }
    .img-text--url {
      background-color: $--color-success;
      color: $--color-primary-secondary;
    }
    .img-tooltip {
      position: absolute;
      left: 50px;
      bottom: 0;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      width: 200px;
      text-align: center;
      // box-sizing: border-box;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 14px;
      color: $--color-text-secondary;
      transform: translate(-50%, 120%);
      background-color: $--menu-bg-base;
    }
  }
  .img-mark-show {
    background-color: rgba(226, 223, 223, 0.5);
  }
}
</style>
