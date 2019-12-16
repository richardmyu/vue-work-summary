<template>
  <el-switch
    v-loading="loading"
    :value="status"
    :inactive-value="1"
    :active-value="0"
    @change="handleChange"
  />
</template>

<script>
export default {
  name: '',
  data() {
    return {
      loading: false,
      status: 0,
      old: ''
    }
  },
  methods: {
    handleChange(val) {
      this.old = this.state
      this.loading = true
      const h = this.$createElement
      setTimeout(() => {
        let num = Math.random()
        this.loading = false
        if (num > 0.5) {
          this.$message({
            type: 'success',
            message: h('p', null, [
              h('span', null, '修改成功'),
              h('i', { style: 'color: green' })
            ])
          })
          this.status = val
        } else {
          this.$message({
            type: 'error',
            message: h('p', null, [
              h('span', null, '修改失败'),
              h('i', { style: 'color: red' })
            ])
          })
          this.status = this.old
        }
      }, 2000)
    }
  }
}
</script>

<style scoped lang=''></style>
