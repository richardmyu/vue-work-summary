import findIndex from 'lodash/findIndex'
import slice from 'lodash/slice'
import findLastIndex from 'lodash/findLastIndex'
import last from 'lodash/last'
export default {
  methods: {
    /**
     * @description 寻找前一条
     */
    _findPrev() {
      const index = this.currentRowIndex
      const obj = this.$refs.elTable.data[index - 1]
      if (obj) {
        // console.log('index', index)
        if (obj._level !== 0 && obj._parent._expanded === false) {
          const slices = slice(this.$refs.elTable.data, 0, index - 1)
          return findLastIndex(slices, item => {
            return item._level === 0
          })
        } else {
          return index - 1
        }
      }
      return 'prev'
    },
    /**
     * @description 寻找后一条
     */
    _findNext() {
      const index = this.currentRowIndex
      const obj = this.$refs.elTable.data[index + 1]
      if (obj) {
        if (obj._level !== 0 && obj._parent._expanded === false) {
          const idx = findIndex(
            this.$refs.elTable.data,
            item => {
              return item._level === 0
            },
            index + 1
          )
          return idx === -1 ? 'next' : idx
        } else {
          return index + 1
        }
      }
      return 'next'
    },
    /**
     * @descrition 最后一条
     */
    _findLast() {
      const pureLast = last(this.$refs.elTable.data)
      if (pureLast) {
        if (pureLast._show) {
          return this.$refs.elTable.data.length - 1
        } else {
          return findLastIndex(this.$refs.elTable.data, item => {
            return item._level === 0
          })
        }
      }
      return -1
    },
    /**
     * @description 行跳转
     */
    _handleJumpRow(index) {
      const len = this._findLast()
      if (index === 'prev') {
        this.$emit('previous-page', () => {})
        return
      } else if (index === 'next') {
        this.$emit('next-page', () => {
          this._handleSetCurrentRowWithIndex(0)
        })
        return
      } else if (index === -1) {
        return
      }
      this._handleSetCurrentRowWithIndex(index)
    }
  }
}
