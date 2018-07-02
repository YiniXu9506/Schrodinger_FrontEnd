<template>
  <div id="card">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">卡片名称</span>
        <el-button style="float: right;" type="primary">Edit</el-button>
        <el-button style="float: right;" type="primary">Save</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['boxInfoCard'],
  data() {
    return {
      boxInfo: this.boxInfoCard
    }
  }
}
</script>

<style>

</style>


