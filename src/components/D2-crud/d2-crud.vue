<template>
  <div class="dc-table__container">
    <el-table
      ref="elTable"
      :data="tableData"
      v-bind="options"
      :row-style="rowStyle"
      @current-change="handleCurrentChange"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @cell-mouse-enter="handleCellMouseEnter"
      @cell-mouse-leave="handleCellMouseLeave"
      @cell-click="handleCellClick"
      @cell-dblclick="handleCellDblclick"
      @row-click="handleRowClick"
      @row-contextmenu="handleRowContextmenu"
      @row-dblclick="handleRowDblclick"
      @header-click="handleHeaderClick"
      @header-contextmenu="handleHeaderContextmenu"
    >
      <!-- 序号 -->
      <el-table-column
        v-if="indexRow || indexRow === ''"
        type="index"
        :label="handleAttribute(indexRow.title,'')"
        v-bind="indexRow"
      ></el-table-column>

      <!-- 选择框 -->
      <el-table-column
        v-if="(selectionRow !== false&&selectionRow) || selectionRow === ''"
        type="selection"
        :label="handleAttribute(selectionRow.title,'')"
        v-bind="selectionRow"
        width="42px"
        :selectable="checkboxT"
      ></el-table-column>

      <!-- shuju -->
      <el-table-column
        v-for="(column,index) of columns"
        v-show="!!column.hidden === false"
        :key="column.key || index"
        :label="handleAttribute(column.title,'')"
        :prop="handleAttribute(column.key,null)"
        v-bind="column"
      >
        <!-- scope -->
        <template slot-scope="scope">
          <template v-if="column.showToggle && scope.row._level === 0">
            <span v-for="item in scope.row._level" :key="item" class="dt-tree-space"></span>
            <div v-if="toggleIconShow(index,scope.row)" :key="item" class="dt-btn">
              <i
                :class="['el-icon',scope.row._expended ? 'el-icon-caret-bottom' : 'el-icon-caret-right' ]"
              ></i>
            </div>
            {{scope.row[column.key] || ''}}
          </template>

          <template v-if="column.showToggleCol && scope.row._level === 0">
            <el-button @click="toggle(scope.$index)" class="s-padding-2">
              <i :class="scope.row._expedned ? 'el-icon-minus' : 'el-icon-plus'"></i>
            </el-button>
          </template>

          <render-custom-component
            v-else-if="column.component && column.component.name"
            v-model="scope.row[column.key]"
            :component-name="column.component.name"
            :props="column.component.propos ? column.component.props : null"
            :currentRowIndex="currentRowIndex"
            :scope="scope"
          ></render-custom-component>

          <render-component
            v-else-if="column.component && column.component.render"
            :render-function="column.component.render"
            :currentRowIndex="currentRowIndex"
            :scope="scope"
          ></render-component>
          <span v-else>{{scope.row[column.key] || ''}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import renderComponent from './components/renderComponent.vue'
import renderCustomComponent from './components/renderCustomComponent.vue'
import scrollIntoView from 'scroll-into-view-if-needed'

import prop from './mixins/prop'
import event from './mixins/event'
import native from './mixins/native'
import row from './mixins/row'
import highlight from './mixins/highlight'
import data from './mixins/data'
import jump from './mixins/jump'
import toggle from './mixins/toggle'
export default {
  mixins: [prop, event, native, row, highlight, data, jump, toggle],
  data() {
    return {
      currentRowIndex: -1
    }
  },

  components: {
    renderComponent,
    renderCustomComponent
  },
  methods: {
    /**
     * @description 组件属性默认值
     */
    handleAttribute(attribute, defaultValue) {
      if (attribute === false || attribute === 0 || attribute === '') {
        return attribute
      }
      return attribute || defaultValue
    },

    /**
     * @description 将浏览器窗口的可见区域外的元素滚动到浏览器窗口的可见区域内
     * @param {*} index 指定可见的数据序列号
     */
    _handleIntoView(index) {
      this.$nextTick(() => {
        const table = this.$refs.elTable
        const el = table.$el
        const row = table.data[index]
        if (row) {
          const target = el.querySelectorAll('.el-table__body tr')[index]
          scrollIntoView(target, {
            scrollMode: 'if-needed',
            block: 'nearest',
            inline: 'nearest'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.el-table__body {
  // 斑马纹色
  tr.el-table__row--striped {
    td {
      background-color: rgba(240, 240, 241, 0.4) !important;
    }
  }
  // 高亮色
  tr.current-row {
    td {
      background-color: rgb(25, 228, 167) !important;
    }
  }
}

.el-button.is-circle {
  padding: 5px !important;
}
</style>

<style scoped lang='scss'>
$height: 22px;
.dc-table__container {
  padding: 0;
  overflow: hidden;
  .dt-btn {
    display: inline-block;
    cursor: pointer;
    width: $height;
    height: $height;
    line-height: $height;
    text-align: center;
    user-select: none;
    .el-icon-arrow-right {
      transition: transform 0.2s ease-in-out;
      position: relative;
      top: -1px;
      &.down {
        transform: rotate(90deg);
      }
    }
  }

  .dt-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    line-height: 1;
    width: 18px;
    height: 14px;
  }
}
</style>
