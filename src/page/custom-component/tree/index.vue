<template>
  <div class="tree__container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基础用法" name="base"></el-tab-pane>
      <el-tab-pane label="可选择" name="selectable"></el-tab-pane>
      <el-tab-pane label="懒加载" name="lazy"></el-tab-pane>
      <el-tab-pane label="默认展开/选中" name="defaultExpend"></el-tab-pane>
      <el-tab-pane label="禁用状态" name="disbaled"></el-tab-pane>
      <el-tab-pane label="树节点" name="treeNode"></el-tab-pane>
      <el-tab-pane label="自定义" name="customize"></el-tab-pane>
      <el-tab-pane label="节点过滤" name="filterNode"></el-tab-pane>
      <el-tab-pane label="手风琴模式" name="accordion"></el-tab-pane>
      <el-tab-pane label="可拖拽节点" name="dragNode"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'base'
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>

<style scoped lang=''></style>
