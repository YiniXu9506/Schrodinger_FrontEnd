<template>
  <div id="card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 1.2rem"><Strong>{{infoSection}}</Strong></span>
            <!-- <el-button type="primary" style="float: right" size="small" icon="el-icon-edit" circle></el-button> -->
          </div>
          <div v-if="infoSection == 'Config'">
            <!-- <el-row type="flex">
              <el-col :span="2"><div class="grid-content bg-purple"><Strong>ID: </Strong></div></el-col>
              <el-col :span="10" :offset="1"><div class="grid-content bg-purple">{{boxInfoCard.id}}</div></el-col>
            </el-row> -->
            <Strong>ID: </Strong> {{boxInfoCard.id}} <br>
            <Strong>Name: </Strong> {{boxInfoCard.name}} <br>
            <Strong>State: </Strong> {{boxInfoCard.state}} <br>
            <Strong>Create Time: </Strong> {{boxInfoCard.create_time}} <br>
            <Strong>Update Time: </Strong> {{boxInfoCard.update_time}} <br>
            <Strong>Data: </Strong> {{boxInfoCard.config.data}}<br>
            <Strong>Destroy TiDB Cluster: </Strong>{{boxInfoCard.config.destory_tidb_cluster}}<br>
            <Strong>Prepare: </Strong>{{boxInfoCard.config.prepare}}<br>
            <Strong>Slack: </Strong>{{boxInfoCard.config.slack}}<br>
            <Strong>Stop: </Strong>{{boxInfoCard.config.stop}}<br>
            <Strong>Timeout: </Strong>{{boxInfoCard.config.timeout}}<br>
            <Strong>Type: </Strong>{{boxInfoCard.config.type}}<br>
          </div>
          <div v-if="infoSection == 'Cat'">
            <Strong>Labels: </Strong> {{boxInfoCard.labels}} <br>
            <Strong>PD Version: </Strong> {{boxInfoCard.pd_ver}} <br>
            <Strong>TiKV Version: </Strong> {{boxInfoCard.tikv_ver}} <br>
            <Strong>TiDB Version: </Strong> {{boxInfoCard.tidb_ver}} <br>
            <Strong>PD Size: </Strong> {{boxInfoCard.pd_size}} <br>
            <Strong>TiDB Size: </Strong> {{boxInfoCard.tidb_size}}<br>
            <Strong>TiKV Size: </Strong>{{boxInfoCard.tikv_size}}<br>
            <Strong>Config Map: </Strong>{{boxInfoCard.config_map}}
          </div>
          <div v-if="infoSection == 'Tests'">
            <template v-if="boxInfoCard.in_order">
              <Strong>Execution Method: </Strong> Serial Execution <br>
            </template>
            <template v-if="!boxInfoCard.in_order">
              <Strong>Execution Method: </Strong> Parallel Execution <br>
            </template>
            <Strong>Tests: </Strong> <br>
            <el-tag v-for="(item, index) in boxInfoCard.tests" :key="index" style="margin-left: 7px">{{item}}
            </el-tag>
          </div>
          <div v-if="infoSection == 'Rules'">
            <el-row type="flex" justify="space-between">
              <el-col :span="12"><Strong>Type</Strong></el-col>
              <el-col :span="12"><Strong>Rule</Strong></el-col>
            </el-row>
            <el-row type="flex" justify="space-between" v-for="(item, index) in boxInfoCard" :key="index">
              <el-col :span="12">{{item.type}}</el-col>
              <el-col :span="12">{{item.value}}</el-col>
            </el-row>
          </div>
        </el-card>
  </div>
</template>

<script>
export default {
  props: ['boxInfoCard', 'section'],
  data() {
    return {
      infoSection: this.section
    }
  },

  created() {
    // console.log('this.boxinfocard inside card: ', this.boxInfoCard)
  }
}
</script>

<style>
  /* .text {
    font-size: 14px;
  } */

  /* .detail-item {
    margin-bottom: 12px;
  } */

  .clearfix:before,
  .clearfix:after {
    display: table;
    /* position: relative; */
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    height: 300px;
    float:none;
    overflow-y: auto;
    overflow-x: auto;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .bg-purple {
    background: #d3dce6;
  }
</style>


