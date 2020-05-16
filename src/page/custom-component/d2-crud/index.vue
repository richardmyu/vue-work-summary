<template>
  <div class="s-full-h" flex="dir:top">
    <div class="s-mg-b-30" flex-box="1" flex="dir:top">
      <loaderr @click.native="handleFetch()" v-show="loaderr" />
      <d2-crud
        v-loading="loading"
        ref="d2Crud"
        flex-box="1"
        @current-change="handleCurrentChange($event)"
        @selection-change="handleSelectionChange($event)"
        @previous-page="handlePreviousPage"
        @next-page="handleNextPage"
        @select="handleSelect"
        :data="items"
        :options="tableOptions"
        :columns="columns"
        selection-row
      ></d2-crud>
    </div>
    <div class="s-text-right">
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
    <item-dialog ref="itemDialog" @refresh="handleRefresh()"></item-dialog>
  </div>
</template>

<script>
import Loaderr from '@/components/loaderr'
import Pagination from '@/components/pagination'
import GetColums from '@/libs/columns/page-column'
import {
  getPageData,
  postPageData,
  putPageData,
  deletePageData
} from '@/api/index.js'
import ItemDialog from './component/item-dialog'

const getDefaultParams = () => ({
  page: 1,
  pageSize: 10
})
export default {
  name: 'D2CRUD',
  data() {
    return {
      loaderr: false,
      // table info
      loading: false,
      columns: [],
      items: [],
      tableOptions: {
        size: 'mini',
        stripe: true,
        border: false,
        height: '100%',
        highlightCurrentRow: true
      },
      // pagination info
      total: 1,
      defaultParams: getDefaultParams()
    }
  },
  components: {
    Loaderr,
    Pagination,
    ItemDialog
  },
  methods: {
    handleCurrentChange(row) {
      this.currentRow = row
    },
    handleSelectionChange(rows) {
      this.selectedRows = rows
    },
    handleSelect(selection, row) {
      // console.log('handleSelect--selection', selection)
      // console.log('handleSelect--row', row)
    },
    /**
     * @description 获取表格数据，并绑定数据
     */
    async handleFetch() {
      // this.loading = true
      // const data = await getPageData(this.defaultParams)
      // this.loading = false
      // if (!data) {
      //   this.total = 0
      //   this.tableData = []
      //   return
      // }
      // this.$nextTick(() => {
      //   try {
      //     this.total = data.total || 0
      //     this.items = data.content || []
      //     this.$refs.d2Crud.setFirstRowSelected()
      //   } catch (err) {
      //     console.error('try setFirstRowSelected', err)
      //   }
      // })
    },
    /**
     * @description 切换每页条数，重置当前页
     */
    handleRefresh() {
      this.defaultParams.page = 1
      this.handleFetch()
    },
    /**
     * @description 列更新
     */
    reConfColumns() {
      this.columns = []
      this.$nextTick(() => {
        this.columns = GetColums.call(this).columns()
      })
    },
    /**
     * @description 数据表格上滑到顶端，会触发
     */
    handlePreviousPage(noPreviousPage) {
      // 加载状态不执行
      if (this.loading) {
        return
      }
      // 到了第一条
      if (this.defaultParams.page === 1) {
        return noPreviousPage()
      }
      // 默认条减 1
      this.defaultParams.page--
      //
      this.handleFetch()
    },
    /**
     * @description 数据表格下滑到底，会触发
     */
    handleNextPage(noNextPage) {
      if (this.loading) {
        return
      }
      if (this.total <= this.defaultParams.page * this.defaultParams.pageSize) {
        noNextPage()
        return
      }
      this.defaultParams.page++
      this.handleFetch()
    },
    /**
     * @description 新增
     */
    handleAdd() {
      this.$refs.itemDialog.open('add')
    },
    /**
     * @description 删除
     */
    async handleRemove(id) {
      // await deletePageData(id)
      // await this.handleFetch()
    },
    /**
     * @description 修改
     */
    handleModify(row) {
      this.$refs.itemDialog.open('modify', row)
    }
  },
  created() {
    this.handleFetch()
    this.reConfColumns()
  }
}
</script>

<style scoped lang=''></style>
