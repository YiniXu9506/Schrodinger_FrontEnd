<template>
  <div class="card">
    <!-- show box config cards -->
    <el-card class="box-card" v-if="box">
      <div slot="header" class="clearfix">
        <span style="font-size: 1.2rem"><Strong>{{infoSection}}</Strong></span>
        <!-- <el-button type="primary" style="float: right" size="small" icon="el-icon-edit" circle></el-button> -->
      </div>
      <div v-if="infoSection == 'Config'">
        <!-- <el-row type="flex">
          <el-col :span="2"><div class="grid-content bg-purple"><Strong>ID: </Strong></div></el-col>
          <el-col :span="10" :offset="1"><div class="grid-content bg-purple">{{boxInfoCard.id}}</div></el-col>
        </el-row> -->
        <!-- <el-table :data="boxInfoCard"> -->
          <!-- <el-form label-position="left">
            <el-form-item label="ID "><span>{{boxInfoCard.id}}</span>
            </el-form-item>
            <el-form-item label="Name"><span>{{boxInfoCard.name}}</span>
            </el-form-item>
            <el-form-item label="State"><span>{{boxInfoCard.state}}</span>
            </el-form-item>
            <el-form-item label="Create Time"><span>{{boxInfoCard.create_time}}</span>
            </el-form-item>
            <el-form-item label="Update Time"><span>{{boxInfoCard.update_time}}</span>
            </el-form-item>
            <el-form-item label="Destroy TiDB Cluster"><span>{{boxInfoCard.config.destory_tidb_cluster}}</span>
            </el-form-item>
            <el-form-item label="Prepare"><span>{{boxInfoCard.config.prepare}}</span>
            </el-form-item>
            <el-form-item label="Slack"><span>{{boxInfoCard.config.slack}}</span>
            </el-form-item>
            <el-form-item label="Timeout"><span>{{boxInfoCard.config.timeout}}</span>
            </el-form-item>
            <el-form-item label="Type"><span>{{boxInfoCard.config.type}}</span>
            </el-form-item>
          </el-form> -->
        <!-- </el-table> -->
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
        <Strong>Timeout: </Strong>{{(boxInfoCard.config.timeout)/(Math.pow(10, 9)*3600)}} hours<br>
        <Strong>Type: </Strong>{{boxInfoCard.config.type}}<br>
      </div>
      <div v-if="infoSection == 'Cat'">
        <Strong>Labels: </Strong> {{boxInfoCard.labels}} <br>
        <Strong>PD Version: </Strong> {{boxInfoCard.pd_ver.type}}:{{boxInfoCard.pd_ver.value}} <br>
        <Strong>TiKV Version: </Strong> {{boxInfoCard.tikv_ver.type}}:{{boxInfoCard.tikv_ver.value}} <br>
        <Strong>TiDB Version: </Strong> {{boxInfoCard.tidb_ver.type}}:{{boxInfoCard.tidb_ver.value}} <br>
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

    <!-- show experiment config cards -->
    <el-card class="box-card" v-if="experiment">
      <div slot="header" class="clearfix">
        <span style="font-size: 1.2rem"><Strong>{{infoSection}}</Strong></span>
      </div>
      <div v-if="infoSection == 'Config'">
        <Strong>ID: </Strong> {{experimentInfoCard.id}} <br>
        <Strong>Name: </Strong> {{experimentInfoCard.name}} <br>
        <Strong>Status: </Strong> {{experimentInfoCard.status}} <br>
        <Strong>Stage: </Strong> {{experimentInfoCard.stage}} <br>
        <Strong>Create Time: </Strong> {{experimentInfoCard.create_time}} <br>
        <Strong>Update Time: </Strong> {{experimentInfoCard.update_time}} <br>
        <Strong>Data: </Strong> {{experimentInfoCard.Config.Misc.data}}<br>
        <Strong>Destroy TiDB Cluster: </Strong>{{experimentInfoCard.Config.Misc.destory_tidb_cluster}}<br>
        <Strong>Prepare: </Strong>{{experimentInfoCard.Config.Misc.prepare}}<br>
        <Strong>Slack: </Strong>{{experimentInfoCard.Config.Misc.slack}}<br>
        <Strong>Stop: </Strong>{{experimentInfoCard.Config.Misc.stop}}<br>
        <Strong>Timeout: </Strong>{{experimentInfoCard.Config.Misc.timeout}}<br>
        <Strong>Type: </Strong>{{experimentInfoCard.Config.Misc.type}}<br>
      </div>
      <div v-if="infoSection == 'Cat'">
        <Strong>Labels: </Strong> {{experimentInfoCard.labels}} <br>
        <Strong>PD Version: </Strong> {{experimentInfoCard.pd_ver.type}}:{{experimentInfoCard.pd_ver.value}} <br>
        <Strong>TiKV Version: </Strong> {{experimentInfoCard.tikv_ver.type}}:{{experimentInfoCard.tikv_ver.value}} <br>
        <Strong>TiDB Version: </Strong> {{experimentInfoCard.tidb_ver.type}}:{{experimentInfoCard.tidb_ver.value}} <br>
        <Strong>PD Size: </Strong> {{experimentInfoCard.pd_size}} <br>
        <Strong>TiDB Size: </Strong> {{experimentInfoCard.tidb_size}}<br>
        <Strong>TiKV Size: </Strong>{{experimentInfoCard.tikv_size}}<br>
        <Strong>Config Map: </Strong>{{experimentInfoCard.config_map}}
      </div>
      <div v-if="infoSection == 'Tests'">
        <template v-if="experimentInfoCard.in_order">
          <Strong>Execution Method: </Strong> Serial Execution <br>
        </template>
        <template v-if="!experimentInfoCard.in_order">
          <Strong>Execution Method: </Strong> Parallel Execution <br>
        </template>
        <Strong>Tests: </Strong> <br>
        <el-tag v-for="(item, index) in experimentInfoCard.tests" :key="index" style="margin-left: 7px">{{item}}
        </el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['boxInfoCard', 'experimentInfoCard', 'section', 'experiment', 'box'],
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

  .card {
    height: 300px;
    /* height: 100%; */
  }
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
    /* height: 300px; */
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

.box-card .el-form-item__label {
      text-align: right;
      font-weight: bold;
      float: left;
      font-size: 14px;
      color: black;
      line-height: 40px;
      padding: 0 12px 0 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
  }
  .box-card .el-form-item__content {
    color: #606266;
    line-height: 40px;
    position: relative;
    font-size: 14px;
}
</style>


