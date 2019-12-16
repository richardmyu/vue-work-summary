<template>
  <div class="krfilter__container">
    <krFilter :config="tagTable" separator=";" @doFilter="handleSearch" />
    <p>{{ searchText }}</p>
    <!-- <el-table :data="addPlanRoute" border style="width:100%">
      <el-table-column property="order1" label="顺序"></el-table-column>
      <el-table-column property="order2" label="装车点">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="add(scope)">添加</el-button>
        </template>
      </el-table-column>
    </el-table>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagTable: [
        {
          key: 'type', //搜索类型关键字
          content: '类型', //填充文字
          multiple: true, //是否可以多选(默认false)；多选的意思是可以重复选择
          type: 'select', //筛选类型 (select,input,date,dateRange)
          separator: ',', //多选时多个值之间的分隔符(仅在多选时有效)
          color: 'red', //c
          background: '#0f0faa', //bgc
          options: [
            //下拉选项(仅在type为"select"时可用)
            {
              label: '哈哈哈',
              value: '1'
            },
            {
              label: '哇哇哇',
              value: '2'
            }
          ]
        },
        {
          key: 'status',
          content: '状态',
          multiple: false,
          type: 'select',
          options: [
            {
              label: '吃饭',
              value: '1'
            },
            {
              label: '睡觉',
              value: '2'
            }
          ]
        },
        {
          key: 'keyword',
          content: '关键字',
          type: 'input'
        },
        {
          key: 'dateRange',
          content: '日期范围',
          type: 'dateRange',
          multiple: false
        },
        {
          key: 'date',
          content: '日期',
          type: 'date',
          multiple: true
        }
      ],
      searchText: ''
      // addPlanRoute: [
      //   {
      //     order1: 'xx',
      //     order2: 'cc'
      //   }
      // ]
    }
  },
  methods: {
    handleSearch(obj) {
      console.log(obj)
      this.searchText = obj
    }
    // add(scope) {
    //   console.log(scope)
    // }
  }
}
</script>

<style scoped lang=''></style>
