<template>
  <el-row :gutter="30">
    <el-col :span="18">
      <multiple-format ref="tableList" v-model="tableList">
        <i
          slot="suffix"
          class="el-icon-more el-input__icon s-cp"
          @click="$refs.tableDialog.open(tableList,'id')"
        ></i>
      </multiple-format>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" plain @click="handleReset">重置</el-button>
    </el-col>
    <table-dialog ref="tableDialog" @multiple-value="handleMultipleValue"></table-dialog>
  </el-row>
</template>

<script>
import multipleFormat from '@/components/multiple-format'
import tableDialog from './table-dialog'
export default {
  name: '',
  data() {
    return {
      tableList: []
    }
  },
  components: {
    multipleFormat,
    tableDialog
  },
  methods: {
    handleMultipleValue(rows) {
      this.$refs.tableList.setList(rows, 'name', 'id')
    },
    handleReset() {
      this.$refs.tableList.clear()
    }
  }
}
</script>

<style scoped lang=''></style>
