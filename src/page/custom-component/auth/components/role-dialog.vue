<template>
  <base-dialog :visible.sync="visible" title="权限" width="500px" :frozen="submiting">
    <div
      class="auth-dialog__container"
      element-loading-background="rgba(255,255,255,0.5)"
      v-loading="submiting"
    >
      <el-select v-model="role" placeholder="请选择">
        <el-option v-for="item in options.role" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </div>
    <div slot="footer" flex="dir:left main:right cross:center" class="s-text-right">
      <el-button class="s-mg-r-20" type="primary" plain @click="handleSubmit()">保存</el-button>
      <el-button plain @click="close()" size="small">关闭</el-button>
    </div>
  </base-dialog>
</template>

<script>
import { postAuth } from '@/api/index.js'
import BaseDialog from '@/components/base-dialog'
export default {
  data() {
    return {
      visible: false,
      submiting: false,
      role: '',
      options: {
        role: ['客户', '开发', '管理']
      }
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
      this.row = row
      this.role = row.role
    },
    /**
     * @description 保存/提交
     */
    async handleSubmit() {
      this.submiting = true
      let newData = {
        ...this.row,
        role: this.role
      }
      let { success, code } = await postAuth(newData)
      if (success && code === '0001') {
        this.submiting = false
        this.visible = false
        this.$emit('refresh')
      } else {
        this.$message({
          message: '修改失败',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.auth-dialog__container {
  padding: 20px;
}
</style>
