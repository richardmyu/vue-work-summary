<template>
  <base-dialog
    :visible.sync="visible"
    title="二级"
    :frozen="submitting"
    @closed="hanldeClosed"
    :level="2"
    :scaleWidth="0.9"
  >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <div flex="dir:left main:right cross:center" slot="footer">
      <el-button type="primary" size="small" :disabled="submitting" @click="close">关闭</el-button>
      <el-button type="primary" size="small" :disabled="submitting" @click="handleOpen">下一级</el-button>
    </div>
    <thi-dialog ref="thiDialog"></thi-dialog>
  </base-dialog>
</template>

<script>
import baseDialog from '@/components/base-dialog'
import DialogMixin from '@/plugins/mixins/dialog-mixin.js'
import thiDialog from './thi-dialog'
export default {
  mixins: [DialogMixin],
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  components: {
    baseDialog,
    thiDialog
  },
  methods: {
    hanldeClosed() {},
    handleOpen() {
      this.$refs.thiDialog.open()
    }
  }
}
</script>

<style scoped lang=''></style>
