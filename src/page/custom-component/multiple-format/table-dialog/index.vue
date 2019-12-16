<template>
  <base-dialog
    :visible.sync="visible"
    title="一级哟"
    width="900px"
    :frozen="submitting"
    @closed="hanldeClosed"
  >
    <el-table
      ref="multipleTable"
      :data="items"
      tooltip-effect="dark"
      style="width: 100%"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
    </el-table>
    <div flex="dir:left main:right cross:center" slot="footer">
      <el-button type="primary" size="small" :disabled="submitting" @click="close">关闭</el-button>
      <el-button type="primary" size="small" :disabled="submitting" @click="handleSubmit">提交</el-button>
    </div>
  </base-dialog>
</template>

<script>
import baseDialog from '@/components/base-dialog'
import DialogMixin from '@/plugins/mixins/dialog-mixin.js'
export default {
  mixins: [DialogMixin],
  data() {
    return {
      items: [
        {
          id: 1,
          date: '2016-05-02',
          name: '张三',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '李四',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王五',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '赵六',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      currentRow: {},
      selectedRow: []
    }
  },
  components: {
    baseDialog
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val
    },
    handleSelectionChange(val) {
      this.selectedRow = val
    },
    open(list, key) {
      if (!Array.isArray(list)) {
        return
      }
      let itemLeng = this.items.length
      let listLeng = list.length
      for (let i = 0; i < itemLeng; i++) {
        for (let j = 0; j < listLeng; j++) {
          if (this.items[i][key] === list[j]) {
            this.$nextTick(()=>{
              this.$refs.multipleTable.toggleRowSelection(this.items[i], true)
            })
          }
        }
      }
      this.visible = true
    },
    handleSubmit() {
      let leng = this.selectedRow
      if (leng === 0) {
        this.$warning('请先选择一条数据')
        return
      }
      this.$emit('multiple-value', this.selectedRow)
      this.close()
    },
    hanldeClosed() {
      this.currentRow = {}
      this.selectedRow = []
      this.$refs.multipleTable.clearSelection()
    }
  }
}
</script>
