<template>
  <div class="pagination__container" flex="dir:top justify:center">
    <div flex="dir:left main:left cross:center">
      <el-autocomplete
        class="s-mg-r-20"
        v-model="state"
        :fetch-suggestions="querySearch"
        placeholder="请选择条件"
        @select="handleSelect"
        @input="handleInput"
        @clear="handleClear"
        @keyup.enter.native="handleQuery()"
        size="small"
        clearable
      ></el-autocomplete>

      <el-select
        v-model="stateValue"
        placeholder="请选择"
        class="s-mg-r-20"
        size="small"
        :disabled="disabled"
        clearable
        ref="select"
      >
        <el-option v-for="(item,index) in options(this.state)" :key="index" :value="item"></el-option>
      </el-select>

      <el-button type="primary" size="small" @click="handleQuery()">搜索</el-button>
    </div>
    <div flex-box="1" class="s-mg-b-20">
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column prop="name" label="姓名" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="id" label="ID" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="company" label="公司" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="subCompany" label="子公司" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="department" label="部门" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="job" label="岗位" show-overflow-tooltip align="center"></el-table-column>

        <el-table-column prop="role" label="角色" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <div class="pa-btns">
              <span class="pa-btn--text">{{scope.row.role}}</span>
              <el-button type="primary" circle class="pa-btn">
                <i class="el-icon-edit" @click="handleIconClick('role',scope.row)"></i>
              </el-button>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="model" label="权限" align="center">
          <template slot-scope="scope">
            <el-button type="primary" circle>
              <i class="el-icon-s-help" @click="handleIconClick('model',scope.row)"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div flex="dir:left main:right">
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
    <auth-dialog ref="authDialog"></auth-dialog>
    <role-dialog ref="roleDialog" @refresh="handleRefresh()"></role-dialog>
  </div>
</template>

<script>
import { getAuths } from '@/api/index.js'
import Pagination from '@/components/pagination'
import authDialog from './components/auth-dialog'
import roleDialog from './components/role-dialog'
function loadAll(type) {
  // return
  let data = []
  switch (type) {
    case 'company':
      data = ['abc有限责任公司', '蓝狐责任有限公司', 'hk科技有限公司']
      break
    case 'subCompany':
      data = [
        'abc-修饰',
        'abc-富康',
        'abc-萨克',
        '蓝狐-蝴蝶',
        '蓝狐-沃克',
        '蓝狐-贝克',
        'hk-健康',
        'hk-快快'
      ]
      break
    case 'department':
      data = ['技术部', '研发部', '人事部']
      break
    case 'job':
      data = ['前端', '后台', 'UI']
      break
    case 'role':
      data = ['客户', '开发', '管理']
      break
    default:
      data = [
        { label: 'company', value: '公司' },
        { label: 'subCompany', value: '子公司' },
        { label: 'department', value: '部门' },
        { label: 'job', value: '岗位' },
        { label: 'role', value: '角色' }
      ]
      break
  }
  return data
}
const getDefaultParams = () => ({
  page: 1,
  pageSize: 6
})
export default {
  data() {
    return {
      total: 1,
      defaultParams: getDefaultParams(),
      tableData: [],
      restaurants: [],
      state: '',
      stateValue: '',
      disabled: true,
      isEditor: false
    }
  },
  components: {
    Pagination,
    authDialog,
    roleDialog
  },
  methods: {
    model(val) {
      let leng = Object.keys(val).length
      if (leng === 3) {
        return [1, 2, 3]
      } else if (leng === 4) {
        return [1, 2, 3, 4]
      }
    },
    /**
     * @description 获取表格数据，并绑定数据
     */
    async handleFetch(item = {}) {
      // this.loading = true
      // let queryParam = this.defaultParams
      // let { key, value } = item
      // if (key && value) {
      //   queryParam = {
      //     ...this.defaultParams,
      //     [key]: value
      //   }
      // }
      // const data = await getAuths(queryParam)
      // this.loading = false
      // if (!data) {
      //   this.total = 0
      //   this.tableData = []
      //   return
      // }
      // this.total = data.total || 0
      // this.tableData = data.content || []
    },
    /**
     * @description 切换每页条数，重置当前页
     */
    handleRefresh() {
      this.defaultParams.page = 1
      this.handleFetch()
    },
    /**
     * @description 打开弹框
     * @param {String} 弹框类型
     * @param {Object} 行数据
     */
    handleIconClick(type, row) {
      if (type === 'model') {
        this.$refs.authDialog.open(row)
      }
      if (type === 'role') {
        this.$refs.roleDialog.open(row)
      }
    },
    /**
     * @description 带建议的 input
     */
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    /**
     * @description 监听建议输入
     */
    handleSelect(item) {
      this.isEditor = false
    },
    /**
     * @description 监听用户自定义输入
     */
    handleInput() {
      this.isEditor = true
    },
    /**
     * @description 清除输入条件，重置搜索
     */
    handleClear() {
      this.state = ''
      this.handleRefresh()
    },
    /**
     * @description 搜索
     */
    handleQuery() {
      let data = loadAll()
      let key
      let value
      if (!this.isEditor) {
        if (!this.stateValue) {
          this.$message({
            message: '请选择具体条件',
            type: 'warning'
          })
          // 获得焦点
          this.$refs.select.$el
            .getElementsByClassName('el-input__inner')[0]
            .focus()
          return
        }
        // 建议输入
        key = this.valueTolabel(this.state)
        value = this.stateValue
      } else {
        // 手动输入
        key = 'query'
        value = this.state
      }

      let item = {
        key: key,
        value: value
      }
      // console.log('handleQuery', item)
      this.handleFetch(item)
      this.isEditor = false
    },
    /**
     * @description 转换函数
     * @param {String} key 需要转换的属性
     * @param {String} type 类型
     *   type=vTol(default) value to label
     *   type=lTov label to value
     *   type=all all
     * @returns {String}
     */
    valueTolabel(key, type = 'vTol') {
      let data = loadAll()
      for (let item of data) {
        if (type === 'vTol' && item.value === key) {
          return item.label
        } else if (type === 'lTov' && item.label === key) {
          return item.value
        } else if (type === 'all' && item.value === key && item.label === key) {
          return item
        }
      }
    },
    /**
     * @description 筛选
     * @abstract 根据 this.state 选择的条件范围，返回对应的子选项
     * @param {String} 条件类型
     * @returns {Array} 对应类型选项
     */
    options(value) {
      let label
      if (value && !this.isEditor) {
        this.disabled = false
        label = this.valueTolabel(value)
        let data = loadAll(label)
        return data
      } else {
        this.disabled = true
      }
    }
  },
  created() {
    this.handleFetch()
  },
  mounted() {
    this.restaurants = loadAll()
  }
}
</script>

<style lang="scss">
.pa-btns {
  .pa-btn--text {
    margin-right: 0;
  }
  .pa-btn.el-button.is-circle {
    display: none;
  }
}
.pa-btns:hover {
  .pa-btn--text {
    margin-right: 10px;
  }
  .pa-btn.el-button.is-circle {
    display: inline-block;
  }
}
</style>

<style scoped lang=''></style>
