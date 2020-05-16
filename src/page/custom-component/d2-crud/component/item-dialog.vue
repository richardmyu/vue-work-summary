<template>
  <base-dialog :visible.sync="visible" :title="title" width="700px" :frozen="submiting">
    <div
      style="height:400px"
      element-loading-background="rgba(255,255,255,0.5)"
      v-loading="submiting"
    >
      <el-form
        ref="createForm"
        :model="createForm"
        style="height:100%;overflow:auto;"
        class="s-pd-r-10"
        label-width="80px"
      >
        <el-form-item label="编号">
          <el-input v-model="createForm.code" class="s-w-500"></el-input>
        </el-form-item>

        <el-form-item label="名称">
          <el-input v-model="createForm.name" class="s-w-500"></el-input>
        </el-form-item>

        <el-form-item label="规格">
          <el-input v-model="createForm.sepcification" class="s-w-500"></el-input>
        </el-form-item>

        <el-form-item label="产地">
          <el-input v-model="createForm.address" class="s-w-500"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input type="number" v-model="createForm.price" class="s-w-500"></el-input>
        </el-form-item>

        <el-form-item label="上架时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="createForm.date" class="s-w-500"></el-date-picker>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="createForm.status" class="s-w-500"></el-switch>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            type="textarea"
            v-model="createForm.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            class="s-w-500"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" flex="dir:right cross:center" class="s-text-right">
      <el-button plain @click="close()">关闭</el-button>
      <el-button class="s-mg-r-20" type="primary" plain @click="handleSubmit()">保存</el-button>
    </div>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base-dialog'
import {
  getPageData,
  postPageData,
  putPageData,
  deletePageData
} from '@/api/index.js'
function initForm() {
  return {
    code: '',
    name: '',
    sepcification: '',
    address: '',
    price: '',
    date: '',
    status: true,
    remark: ''
  }
}
export default {
  data() {
    return {
      visible: false,
      title: '',
      submiting: false,
      inRequest: false,
      state: 1,
      createForm: initForm(),
      formItem: {}
    }
  },
  components: {
    BaseDialog
  },
  methods: {
    /**
     * @description 保存/提交
     */
    async handleSubmit() {
      this.submiting = true

      // if (this.title === '新增') {
      //   const formData = {
      //     ...this.createForm
      //   }

      //   let { success, code } = await postPageData(formData)
      //   if (success && code === '0001') {
      //     this.submiting = false
      //     this.visible = false
      //     this.$emit('refresh')
      //     this.createForm = initForm()
      //   } else {
      //     this.$message({
      //       message: '修改失败',
      //       type: 'error'
      //     })
      //   }
      // }
      // if (this.title === '修改') {
      //   const formData = {
      //     ...this.formItem,
      //     ...this.createForm
      //   }
      //   console.log('formData', formData)
      //   let { success, code } = await putPageData(formData)
      //   if (success && code === '0001') {
      //     this.submiting = false
      //     this.visible = false
      //     this.$emit('refresh')
      //     this.createForm = initForm()
      //   } else {
      //     this.$message({
      //       message: '修改失败',
      //       type: 'error'
      //     })
      //   }
      // }
    },
    close() {
      this.visible = false
    },
    /**
     * @description 打开 新增/修改 弹框
     * @param {String} type 操作类型
     * @param {Object} row 行数据
     */
    open(type, row) {
      this.visible = true
      this.formItem = row
      if (type === 'add' && !row) {
        this.title = '新增'
      }
      if (type === 'modify' && row) {
        if (!row) {
          return
        }
        this.title = '修改'
        this.createForm = {
          ...this.createForm,
          code: row.code,
          name: row.name,
          sepcification: row.sepcification,
          address: row.address,
          price: row.price,
          date: row.date,
          status: row.status,
          remark: row.remark
        }
      }
    }
  }
}
</script>

<style scoped lang=''></style>
