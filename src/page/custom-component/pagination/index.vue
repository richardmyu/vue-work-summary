<template>
  <div class="pagination__container" flex="dir:top justify:center">
    <div flex-box="1" flex="dir:top" class="s-mg-b-20">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
    <pagination
      class="pagination"
      :current-page.sync="defaultParams.page"
      :page-size.sync="defaultParams.pageSize"
      :total="total"
      small
      @current-change="handleFetch()"
      @size-change="handleRefresh()"
    />
  </div>
</template>

<script>
import { getTableData, postTableData } from '@/api/index.js'
import Pagination from '@/components/pagination'
const getDefaultParams = () => ({
  page: 1,
  pageSize: 6
})
export default {
  name: 'pagination',
  data() {
    return {
      total: 1,
      defaultParams: getDefaultParams(),
      tableData: []
    }
  },
  components: {
    Pagination
  },
  methods: {
    /**
     * @description 获取表格数据，并绑定数据
     */
    async handleFetch() {
      this.loading = true
      const { data } = await getTableData(this.defaultParams)
      this.loading = false
      if (!data) {
        this.total = 0
        this.tableData = []
        return
      }
      this.total = data.total || 0
      this.tableData = data.content || []
    },
    /**
     * @description 切换每页条数，重置当前页
     */
    handleRefresh() {
      this.defaultParams.page = 1
      this.handleFetch()
    }
  },
  created() {
    this.handleFetch()
    // test data
    // postTableData(
    //   JSON.stringify({
    //     date: '2016-05-02',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1518 弄'
    //   })
    // )
  }
}
</script>

<style scoped lang=''></style>
