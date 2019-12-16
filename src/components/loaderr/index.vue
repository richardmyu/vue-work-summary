<template>
  <div class="loaderr">
    <el-button type="danger" size="medium" @click="$emit('click')">{{label}}</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    label: {
      type: String,
      default: '加载失败，点击重试'
    }
  }
}
</script>

<style scoped lang='scss'>
.loaderr {
  height: 80px;
  line-height: 80px;
  text-align: center;
}
</style>
