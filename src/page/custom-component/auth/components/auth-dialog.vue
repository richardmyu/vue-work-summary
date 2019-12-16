<template>
  <base-dialog :visible.sync="visible" title="权限" width="500px">
    <div class="auth-dialog__container" element-loading-background="rgba(255,255,255,0.5)">
      <p v-for="(item,index) of formItem" :key="index" class="ad-item s-text-center">
        <span class="s-mg-r-20">{{'模块' + index.slice(-1) }}:</span>
        <span class="s-mg-r-10" v-for="(ite,ind) of item" :key="ind">{{ite}}</span>
      </p>
    </div>
    <div slot="footer" flex="dir:right cross:center" class="s-text-right">
      <el-button plain @click="close()" size="small">关闭</el-button>
    </div>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base-dialog'
export default {
  data() {
    return {
      visible: false,
      formItem: {}
    }
  },
  components: {
    BaseDialog
  },
  methods: {
    close() {
      this.visible = false
    },
    /**
     * @description 打开 新增/修改 弹框
     * @param {String} type 操作类型
     * @param {Object} row 行数据
     */
    open(row) {
      this.visible = true
      this.formItem = row.model
    }
  }
}
</script>

<style scoped lang='scss'>
.auth-dialog__container {
  padding: 20px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  .ad-item {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    &:nth-child(odd) {
      background-color: rgba(152, 224, 188, 0.1);
    }
    &:nth-child(even) {
      background-color: rgba(103, 129, 129, 0.1);
    }
  }
}
</style>
