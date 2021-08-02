<template>
  <div class="multiple-format__container">
    <el-input
      :value="singleValue"
      v-bind="$attrs"
      :readonly="true"
      style="width:100%"
      autocomplete="off"
    >
      <template slot="suffix">
        <slot name="suffix"></slot>
      </template>
    </el-input>
    <!-- tag 显示层 -->
    <div class="mf-select">
      <span class="mf-select__content"></span>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'MultipleFormat',
  props: {
    value: Array
  },
  data() {
    return {
      dataRow: [],
      dataValue: [],
      singleValue: '',
      tagRemove: null
    }
  },
  methods: {
    /**
     * @description 筛选数据，生成 {value,label} 结构
     * @param {Array} rows 源数据
     * @param {String} labelText label 的过滤关键字
     * @param {String} valueText value 的过滤关键字
     * @returns {*} void
     */
    setList(rows, labelText, valueText) {
      if (!Array.isArray(rows)) {
        return
      }
      if (!labelText || !valueText) {
        return
      }
      // 每次选中数据提交，都要清除上一次的数据
      this.clear()
      rows.map(item => {
        if (item[valueText] && item[labelText]) {
          this.dataRow.push({
            value: item[valueText],
            label: item[labelText]
          })
          this.dataValue.push(item[valueText])
        }
      })
      this.addTag()
      this.$emit('input', cloneDeep(this.dataValue))
      this.$emit('change', cloneDeep(this.dataRow))
    },
    /**
     * @description 生成 tags 显示层，生成并将 tag 挂在在显示层上
     * @param {*} void
     * @returns {*} void
     */
    addTag() {
      let rootEl = document.querySelector('.multiple-format__container')
      let spanBox = rootEl.querySelector('.mf-select .mf-select__content')
      this.dataRow.map(item => {
        if (item) {
          spanBox.appendChild(this.createTag(item))
        }
      })
    },
    // 创建 tag
    /**
     * @description 生成单个 tag，并添加 tag 样式及事件
     * @param {Object} data tag 的内容及 id
     * @returns {Object} 完整的 tag
     */
    createTag(data) {
      let tagParent = document.createElement('span')
      tagParent.className = 'mf-select__inner'
      tagParent.style.position = 'relative'
      tagParent.style.cursor = 'default'
      tagParent.style.backgroundColor = '#f5f5f7'
      tagParent.style.borderColor = '#eaecee'
      tagParent.style.color = '#969faa'
      tagParent.style.margin = '2px 0 2px 6px'
      tagParent.style.height = '20px'
      tagParent.style.padding = '2px'
      tagParent.style.boxSizing = 'border-box'
      tagParent.style.lineHeight = '14px'
      tagParent.style.borderWidth = '1px'
      tagParent.style.borderStyle = 'solid'
      tagParent.style.borderRadius = '2px'
      tagParent.style.display = 'inline-block'
      tagParent.style.fontSize = '12px'
      tagParent.style.whiteSpace = 'nowrap'

      let tag = document.createElement('span')
      tag.className = 'mf-select__text'
      tag.textContent = data.label
      tag.style.display = 'inline-block'
      tag.style.maxWidth = '60px'
      tag.style.overflow = 'hidden'
      tag.style.whiteSpace = 'nowrap'
      tag.style.textOverflow = 'ellipsis'
      tag.style.padding = '0'
      tag.style.verticalAlign = 'middle'
      tag.style.cursor = 'default'
      tag.style.color = '#969faa'
      tag.style.lineHeight = '14px'

      let tagIcon = document.createElement('i')
      tagIcon.className = 'el-icon-close mf-select__close'
      tagIcon.style.color = '#93A0AD'
      tagIcon.style.borderRadius = '50%'
      tagIcon.style.textAlign = 'center'
      tagIcon.style.position = 'relative'
      tagIcon.style.right = '-7px'
      tagIcon.style.top = '0'
      tagIcon.style.marginLeft = '-3px'
      tagIcon.style.marginTop = '-2px'
      tagIcon.style.transform = 'scale(0.7)'
      tagIcon.style.cursor = 'pointer'
      tagIcon.style.height = '16px'
      tagIcon.style.width = '16px'
      tagIcon.style.lineHeight = '16px'
      tagIcon.style.verticalAlign = 'middle'
      tagIcon.style.backgroundColor = '#e7e5e5'

      tagParent.appendChild(tag)
      tagParent.appendChild(tagIcon)
      if (!tagIcon.addEventListener) {
        return
      }
      // tag 移除事件
      this.tagRemove = () => {
        // 移除当前 tag 节点
        tagParent.parentNode.removeChild(tagParent)
        // 更新数据
        this.dataRow.map((item, index) => {
          if (item.value === data.value) {
            this.dataRow.splice(index, 1)
            this.dataValue.splice(index, 1)
          }
        })
        this.$emit('input', cloneDeep(this.dataValue))
        this.$emit('change', cloneDeep(this.dataRow))
      }

      tagIcon.addEventListener('click', this.tagRemove, false)
      return tagParent
    },
    clear() {
      this.dataRow = []
      this.dataValue = []
      // 移除 tag 节点
      let rootEl = document.querySelector('.multiple-format__container')
      let spanBox = rootEl.querySelector('.mf-select .mf-select__content')
      let tags = spanBox.querySelectorAll('.mf-select__inner')
      if (!tags) {
        return
      }
      tags.forEach(item => {
        if (item) {
          spanBox.removeChild(item)
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
.multiple-format__container {
  position: relative;
  .mf-select {
    position: absolute;
    top: 50%;
    left: 15px;
    right: 30px;
    transform: translate(0, -50%);
    line-height: normal;
    white-space: normal;
    z-index: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 28px;
    overflow-y: hidden;
    overflow-x: auto;
    .mf-select__content {
      display: flex;
    }
  }
}
</style>
