<template>
  <div>
    <p class="s-mg-b-20">基于 dialog 的多级弹框</p>
    <el-button type="primary" size="small" @click="handleOpen">一级</el-button>
    <fir-dialog ref="firDialog"></fir-dialog>
  </div>
</template>

<script>
import firDialog from "./fir-dialog";
export default {
  data() {
    return {};
  },
  components: {
    firDialog
  },
  methods: {
    handleOpen() {
      this.$refs.firDialog.open();
    }
  }
};
</script>

<style scoped lang=''></style>
