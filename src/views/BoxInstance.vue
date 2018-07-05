<template>
  <div>
    <el-container style="height: 750px; border: 1px solid #eee">
      <el-aside width="200px">
        <el-menu v-if="boxInstanceList.length" :default-active="boxInstanceList[0].name" width="auto">
          <el-submenu index="1">
            <template slot="title"><Icon type="ios-box"></Icon>Boxes</template>
            <el-menu-item v-for="(instance, index) in boxInstanceList" :key="index" :index="instance.name" @click.native="getBoxDetail(instance)">{{instance.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container v-if="getDetail && showBoxDetail">
        <el-header style="height:400px;">
          <el-row type="flex" class="row-bg" justify="end">
            <div class="box-operation">
              <!-- <span style="font-size: 1.5rem"><Strong>Box Operation: </Strong></span> -->
              <el-button round  @click.native="handleEdit"><Icon type="edit" style="margin-right: 7px;" size="15"></Icon> Edit </el-button>
              <el-button type="primary" round @click.native="handleManualTrigger"><Icon type="android-hand" style="margin-right: 7px;" size="15"></Icon>Manual Trigger </el-button>
              <el-button type="info" round @click.native="handleStop"><Icon type="stop" style="margin-right: 7px;" size="15"></Icon> Stop </el-button>
              <el-button type="danger" round @click.native="handleDelete"><Icon type="android-delete" style="margin-right: 7px;" size="15"></Icon>Delete </el-button>
            </div>
          </el-row>

          <el-row type="flex" :gutter="10" style="padding: 20px 0">
            <el-col :span="12">
              <my-card :boxInfoCard="boxInstanceDetail" section="Config">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :boxInfoCard="boxInstanceDetail.cat" section="Cat">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :boxInfoCard="boxInstanceDetail.tests" section="Tests">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :boxInfoCard="boxInstanceDetail.rules" section="Rules">
              </my-card>
            </el-col>
          </el-row>
        </el-header>
        <div style="margin-bottom: 10px; margin-left: 25px;">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/'}"><Strong>Box: {{boxInstanceDetail.name}} </Strong></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-main>
          <!-- <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table> -->
          <el-table :data="experimentTable.list">
            <el-table-column v-for="(item, index) in experimentTable.prop" :key="index" :prop="item" :label="experimentTable.label[index]">
            </el-table-column>
            <el-table-column label="Operation">
              <template slot-scope="scope">
                <!-- <router-link tag='el-button' :to="'/missionOperation?id='+scope.row.id">
                  Manage
                </router-link> -->
                <el-button @click.native="handleDetailClick(scope.row.id)">Detail</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>

      <el-container v-if="showExperimentDetail">
        <el-header style="height:400px;">
          <el-row type="flex" :gutter="10" style="padding: 20px 0">
            <el-col :span="12">
              <my-card :boxInfoCard="boxInstanceDetail" section="Config">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :boxInfoCard="boxInstanceDetail.cat" section="Cat">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :boxInfoCard="boxInstanceDetail.tests" section="Tests">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :boxInfoCard="boxInstanceDetail.rules" section="Rules">
              </my-card>
            </el-col>
          </el-row>
        </el-header>
        <div style="margin-bottom: 10px; margin-left: 25px;">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/'}"><Strong>Box: {{boxInstanceDetail.name}} </Strong></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-main>
         experimentDetail
        </el-main>
      </el-container>
    </el-container>
    <!-- update box dialog -->
    <div>
      <el-dialog title="Update Box" :visible.sync="udpateBoxDialog">
        <el-form :model="updateBoxForm" inline :rules="validationRules" ref="updateBoxForm" label-width="10rem" class="demo-form-inline">
          <div>
            <Strong>Config</Strong>
          </div>
          <el-form-item label="Name:" prop="miscConfigForm.name">
            <el-input v-model="updateBoxForm.miscConfigForm.name"></el-input>
          </el-form-item>
          <el-form-item label="Slack Channel:" prop="miscConfigForm.slack">
            <el-input v-model="updateBoxForm.miscConfigForm.slack"></el-input>
          </el-form-item>
          <el-form-item label="Prepare Callback:" prop="miscConfigForm.prepare">
            <el-input v-model="updateBoxForm.miscConfigForm.prepare"></el-input>
          </el-form-item>
          <el-form-item label="Stop Callback:" prop="miscConfigForm.stop">
            <el-input v-model="updateBoxForm.miscConfigForm.stop"></el-input>
          </el-form-item>
          <el-form-item label="DestoryTidbCluster:" prop="miscConfigForm.destory_tidb_cluster">
            <el-input v-model="updateBoxForm.miscConfigForm.destory_tidb_cluster"></el-input>
          </el-form-item>
          <el-form-item label="Type:" prop="miscConfigForm.type">
            <el-input v-model="updateBoxForm.miscConfigForm.type"></el-input>
          </el-form-item>
          <el-form-item label="Data:" prop="miscConfigForm.data">
            <el-input v-model="updateBoxForm.miscConfigForm.data"></el-input>
          </el-form-item>
          <div>
            <Strong>Cat</Strong>
          </div>
          <el-form-item label="PD Ver:" prop="catForm.pd_ver">
            <el-input v-model="updateBoxForm.catForm.pd_ver"></el-input>
          </el-form-item>
          <el-form-item label="TiKV Ver:" prop="catForm.tikv_ver">
            <el-input v-model="updateBoxForm.catForm.tikv_ver"></el-input>
          </el-form-item>
          <el-form-item label="TiDB Ver" prop="catForm.tidb_ver">
            <el-input v-model="updateBoxForm.catForm.tidb_ver"></el-input>
          </el-form-item>
          <el-form-item label="PD Size:" prop="catForm.pd_size">
            <el-input v-model="updateBoxForm.catForm.pd_size"></el-input>
          </el-form-item>
          <el-form-item label="TiDB Size:" prop="catForm.tidb_size">
            <el-input v-model="updateBoxForm.catForm.tidb_size"></el-input>
          </el-form-item>
          <el-form-item label="TiKV Size:" prop="catForm.tikv_size">
            <el-input v-model="updateBoxForm.catForm.tikv_size"></el-input>
          </el-form-item>
          <el-form-item label="Config Map:" prop="catForm.config_map">
            <el-input v-model="updateBoxForm.catForm.config_map"></el-input>
          </el-form-item>
          <div>
            <Strong>Tests</Strong>
          </div>
          <div id="executionMethods">
            <Strong style="margin-right: 20px; font-size: 14px">Execution method:</Strong>
            <el-checkbox v-model="parallelChecked">Parallel execution</el-checkbox>
            <el-checkbox v-model="serialChecked">Serial execution</el-checkbox>
          </div>
          <div style="position: relative; margin-top: 20px">
            <el-form-item label="Tests: " prop="tests">
                <el-select v-model="updateBoxForm.testForm.tests" multiple placeholder="Please select test" style="width: 33rem;">
                  <el-option v-for="(item, index) in testTemplateList" :key="index" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
          </div>
          <div id="testOrder">
            <el-tag v-for="(item, index) in updateBoxForm.testForm.tests" :key="index" type="primary">{{item}}</el-tag>
          </div>
          <div>
            <Strong>Rules</Strong>
          </div>
          <el-row>
            <el-col :span="2" :offset="2"><Strong>Type</Strong></el-col>
            <el-col :span="4" :offset="1"><Strong>Value</Strong></el-col>
          </el-row>
          <el-form-item v-for="(rule, index) in updateBoxForm.ruleForm" label-width="7rem" :key="rule.key" :label="'Rule ' + index"
                        :prop="'ruleForm.' + index + '.type'">
            <el-row>
              <el-col :span="6">
                  <el-input v-model="rule.type"></el-input>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-input v-model="rule.value"></el-input>
              </el-col>
              <el-col :span="1" :offset="1">
                <el-button @click.prevent="handleRemove(rule)">Delete</el-button>
              </el-col>
            </el-row>
            <br>
          </el-form-item>
          <el-row>
            <el-col :span="1" :offset="1">
              <Button type="dashed" @click="handleAdd()" icon="plus-round">Add rule</Button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
  </div>


  </div>
</template>

<script>
import _ from 'lodash'
import ajax from '../request/index'
import myCard from '../components/Card'
export default {
  components: {
    myCard
  },

  data() {
    // const item = {
    //     date: '2016-05-02',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1518 弄'
    //   };
    return {
      boxInstanceList: [],
      boxInstanceDetail: {},
      showBoxDetail: true,
      showExperimentDetail: false,
      getDetail: false,
      saveButton: true,
      editButton: false,
      experimentTable: {
        label: ['ID', 'Name', 'Status', 'Stage'],
        prop: ['id', 'name', 'status', 'stage'],
        list: []
      },
      experimentDetail: '',
      udpateBoxDialog: false,
      parallelChecked: false,
      serialChecked: false,
      testTemplateList: [],
      updateBoxForm: {
        miscConfigForm: {
          name: '',
          slack: '',
          prepare: '',
          stop: '',
          destory_tidb_cluster: '',
          type: '',
          data: ''
        },
        catForm: {
          pd_ver: '',
          tikv_ver: '',
          tidb_ver: '',
          pd_size: '',
          tidb_size: '',
          tikv_size: '',
          config_map: ''
        },
        testForm: {
          in_order: true,
          tests: []
        },
        ruleForm: [{
          type: '',
          value: ''
        }]
      },
      validationRules: {
        'miscConfigForm.slack': [{
          required: true,
          message: 'Please input the slackChannel',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 64,
          message: 'Length should be 1 to 64',
          trigger: 'blur'
        }],

        'miscConfigForm.type': [{
          required: true,
          message: 'Please input type',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 64,
          message: 'Length should be 1 to 64',
          trigger: 'blur'
        }],
        'catForm.pdVer': [{
          required: true,
          message: 'Please input pdVer',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 64,
          message: 'Length should be 1 to 64',
          trigger: 'blur'
        }],

        'testForm.tests': [{
          required: true,
          message: 'Please select test',
          trigger: 'blur'
        }],

        'ruleForm.type': [{
          required: true,
          message: 'Please input type',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 64,
          message: 'Length should be 1 to 64',
          trigger: 'blur'
        }]
      }
      // tableData: Array(20).fill(item)
    }
  },

  created() {
    var getData = function() {
      console.log('get start')
      return new Promise(function(resolve, reject) {
        ajax.getBox().then((result) => {
          if(result.data.code == 200) {
            resolve(result.data)
          } else {
            this.$notify.error({
              title: 'Error',
              message: result.data.message
            });
          }
        }).catch((resp) => {
          reject(resp.message)
        })
      })
    }

    getData().then((data)=>{
      this.boxInstanceList = data.data
      this.fetchInitialBox()
      let boxId = this.boxInstanceDetail.id
      console.log('inside get experiment promise')
      console.log('this.boxinstance detail id: ', this.boxInstanceDetail.id)
      return new Promise(function(resolve, reject) {
        ajax.getExperimentsByBoxID (boxId).then((result) => {
          if(result.data.code == 200) {
            resolve(result.data)
          } else {
            this.$notify.error({
              title: 'Error',
              message: result.data.message
            });
          }
        }).catch((resp) => {
          reject(resp.message)
        })
      })
    }).then((data) => {
      this.experimentTable.list = data.data
      this.getDetail = true
      console.log('the experimetntable: ', this.experimentTable)
    })
  },

  methods: {
    fetchInitialBox: function() {
      this.boxInstanceDetail = this.boxInstanceList[0]
      console.log('this.boxInstanceDetail: ', this.boxInstanceDetail)
    },

    getExperiments: function(id) {
      ajax.getExperimentsByBoxID(id).then((result) => {
        this.experimentTable.list = result.data.data
        // debugger
        console.log('box id: ', id)
        console.log('get experiment from click other box instance: ', this.experimentTable.list)
      })
    },

    getBoxDetail: function(instance) {
      this.boxInstanceDetail = instance
      this.getExperiments(this.boxInstanceDetail.id)
     },

    handleEdit: function() {
      console.log('click handleEdit')
      console.log('boxinstance in handleedit: ', this.boxInstanceDetail)
      this.udpateBoxForm = {
        miscConfigForm: {
          name: this.boxInstanceDetail.name,
          slack: this.boxInstanceDetail.config.slack,
          prepare: this.boxInstanceDetail.config.prepare,
          stop: this.boxInstanceDetail.config.stop,
          destory_tidb_cluster: this.boxInstanceDetail.config.destory_tidb_cluster,
          type: this.boxInstanceDetail.config.type,
          data: this.boxInstanceDetail.config.data
        },
        catForm: {
          pd_ver: this.boxInstanceDetail.cat.pd_ver,
          tikv_ver: this.boxInstanceDetail.cat.tikv_ver,
          tidb_ver: this.boxInstanceDetail.cat.tidb_ver,
          pd_size: this.boxInstanceDetail.cat.pd_size,
          tidb_size: this.boxInstanceDetail.cat.tidb_size,
          tikv_size: this.boxInstanceDetail.cat.tikv_size,
          config_map: this.boxInstanceDetail.cat.config_map
        },
        ruleForm: {
          type: this.boxInstanceDetail.rules.type,
          value: this.boxInstanceDetail.rules.value,
        },
        testForm: {
          in_order: this.boxInstanceDetail.tests.in_order,
          tests: this.boxInstanceDetail.tests.tests
        }
      }
      this.udpateBoxDialog = true
    },

    handleDetailClick: function(rowId) {
      this.showBoxDetail = false
      this.showExperimentDetail = true
      console.log('hello from handleDetail Click', rowId)
    }
  }
}
</script>

<style>
  /* .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  } */

  .el-aside {
    color: #333;
  }
  .el-row {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  /* .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  } */
  .box-card {
    height: 300px;
    float:none;
    overflow-y: auto;
    overflow-x: auto;
  }
  .box-operation {
    /* font-size: 1.5rem; */
    float: right;
    height: 50px;
    /* background: #333; */
    padding-top: 20px;
  }
</style>
