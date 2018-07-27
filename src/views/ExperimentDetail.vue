<template>
  <div>
    <el-container style="height: 1000px; border: 1px solid #eee">
      <el-aside width="200px" style="border-right: 1px solid #eee; height: 100%">
        <el-menu v-if="boxInstanceList.length" :default-active="boxInstanceList[0].name" width="auto">
          <el-submenu index="1">
            <template slot="title"><Icon type="ios-box" style="margin-right: 15px"></Icon>Box</template>
            <el-menu-item v-for="(instance, index) in boxInstanceList" :key="index" :index="instance.name" @click.native="getBoxDetail(instance.id)">{{instance.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- show experiment Detail -->
      <el-container>
        <el-header v-if="showExperimentConfig == true" style="height:400px;">
          <el-row type="flex" class="row-bg" justify="start">
            <div class="experiment-operation">
              <el-button type="primary" round @click.native="hideExperimentConfigCards"><Icon type="settings" style="margin-right: 7px;" size="15"></Icon>Hide Experiment Config</el-button>
            </div>
          </el-row>

          <el-row type="flex" :gutter="10" style="padding: 20px 0">
            <el-col :span="12">
              <my-card :experimentInfoCard="experimentDetail" section="Config" experiment="true">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :experimentInfoCard="experimentDetail.Config.Cat" section="Cat" experiment="true">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :experimentInfoCard="experimentDetail.Config.Tests" section="Tests" experiment="true">
              </my-card>
            </el-col>
          </el-row>
        </el-header>

        <el-header v-else style="height:80px;">
            <el-row type="flex" class="row-bg" justify="start">
              <div class="experiment-operation">
                <el-button round type="primary" @click.native="showExperimentConfigCards"><Icon type="settings" style="margin-right: 7px;" size="15"></Icon>Show Experiment Config</el-button>
              </div>
            </el-row>
        </el-header>
        <div style="margin-bottom: 10px; margin-left: 25px; margin-top: 30px">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/BoxInstance' }">All Experiments in Box {{boxInstanceDetail.name}}</el-breadcrumb-item>
            <el-breadcrumb-item>All Tests List in Experiment : {{experimentDetail.name}}</el-breadcrumb-item>

          </el-breadcrumb>
        </div>
        <el-main>
          <el-table :data="testTable.list" :header-cell-style="{background: '#ebeef5'}">
            <el-table-column fixed label="Test Name" width="150" prop="name"></el-table-column>
            <el-table-column width="150" v-for="(item, index) in testTable.prop" :key="index" :prop="item"
                            :label="testTable.label[index]">
            </el-table-column>

            <el-table-column width="150" label="Status" prop="status"
                            :filters="[{text:'PENDING', value: 'PENDING'},{text:'CREATING', value: 'CREATING'},
                            {text: 'STOPED', value: 'STOPED'},
                            {text: 'FINISHED', value: 'FINISHED'},{text:'DESTROYED', value:'DESTROYED'},
                            {text: 'FAILED', value:'FAILED'}]"
                            :filter-method="filterTestStatus" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === ('FAILED' || 'DESTROYED' || 'STOPED') ? 'danger' : 'primary'">{{scope.row.status}}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column fixed="right" width="200" label="Operation">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="Test Detail">
                  <el-button type="info" icon="el-icon-document" circle @click.native="handleTestDetailClick(scope.row.name)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>

    <!-- test detail dialog -->
    <el-dialog title="Test Detail" :visible.sync="testDetailDialog">
      <!-- <el-form label-position="">
      </el-form> -->
      {{testDetail}}
      <!-- <el-form label-position="left">
        <el-form-item label="ID "><span>{{testDetail.id}}</span>
        </el-form-item>
        <el-form-item label="Experiment ID"><span>{{testDetail.experiment_id}}</span>
        </el-form-item>
        <el-form-item label="Creator"><span>{{testDetail.template.creator}}</span>
        </el-form-item>
        <el-form-item label="Create Time"><span>{{testDetail.template.create_time}}</span>
        </el-form-item>
        <el-form-item label="Update Time"><span>{{testDetail.template.update_time}}</span>
        </el-form-item>
        <el-form-item label="Binary Name"><span>{{testDetail.template.source.binary_name}}</span>
        </el-form-item>
        <el-form-item label="Type"><span>{{testDetail.template.source.type}}</span>
        </el-form-item>
        <el-form-item label="Git Value"><span>{{testDetail.template.source.git_value.git_type}}:{{testDetail.template.source.git_value.value}}</span>
        </el-form-item>
        <el-form-item label="Git Repo"><span>{{testDetail.template.source.git_repo}}</span>
        </el-form-item>
      </el-form> -->
    </el-dialog>
    </div>
</template>

<script>
import _ from 'lodash'
import ajax from '../request/index'
import myCard from '../components/Card'


// window.handleHrefClick = function() {
//   console.log('handle hef')
// }
export default {
  components: {
    myCard
  },

  data() {
    return {
      showExperimentConfig: false,
      testDetailDialog: false,
      boxInstanceList: [],
      boxInstanceDetail: {},
      getDetail: false,
      experimentDetail: '',
      testTemplateList: [],
      catDetail: '',
      testTable: {
        label: ['Start Time', 'Update Time'],
        prop: ['create_time', 'update_time'],
        list: []
      },
      testDetail: '',
    }
  },

  created() {
    this.getAllBox()
  },

  methods: {
    getAllBox: function() {
      ajax.getBox().then((result) => {
        console.log('the result is: ', result)
        this.boxInstanceList = result.data.data
        console.log('this.boxinstancelist: ', this.boxInstanceList)
        this.fetchInitialBox()
        // let boxId = this.boxInstanceDetail.id
        this.getExperiments(this.boxInstanceDetail.id)
      })
    },

    fetchInitialBox: function() {
      this.boxInstanceDetail = this.boxInstanceList[0]
      console.log('this.boxInstanceDetail kkkkkk: ', this.boxInstanceDetail)
    },

    getExperiments: function(boxId) {
      console.log('boxid is ', boxId)
      ajax.getExperimentsByBoxID(boxId).then((result) => {
        this.getDetail = true
        console.log('get experiment result: ', result)
        this.experimentTable.list = result.data.data
        console.log('box id: ', boxId)
        console.log('get experiments ', this.experimentTable.list)
      })
    },

    getBoxDetail: function(instanceID) {
      console.log('get box detail click other box, ', instanceID)
      this.showExperimentDetail = false
      this.showBoxDetail = true
      // this.boxInstanceDetail = instance
      ajax.getBoxDetailByID(instanceID).then(result => {
        console.log('box detail is hhhh: ', result.data.data)
        this.boxInstanceDetail = result.data.data
        console.log('this.boxinstancedetail id: ',this.boxInstanceDetail, this.boxInstanceDetail.id)
        this.getExperiments(this.boxInstanceDetail.id)
      })
    },

    handleEdit: function() {
      console.log('click handleEdit')
      console.log('boxinstance in handleedit: ', this.boxInstanceDetail)
      this.updateBoxDialog = true
      // debugger
      if(this.boxInstanceDetail.cat.selected_cat == '') {
        this.choice = 'create'
      } else {
        this.choice = 'select'
      }
      this.updateBoxForm = {
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
          choice: this.choice,
          selected_cat: this.boxInstanceDetail.cat.selected_cat,
          labels: this.boxInstanceDetail.cat.labels,
          pd_ver: {
            type: this.boxInstanceDetail.cat.pd_ver.type,
            value: this.boxInstanceDetail.cat.pd_ver.value,
            platform: this.boxInstanceDetail.cat.pd_ver.platform,
          },
          tikv_ver: {
            type: this.boxInstanceDetail.cat.tikv_ver.type,
            value: this.boxInstanceDetail.cat.tikv_ver.value,
            platform: this.boxInstanceDetail.cat.tikv_ver.platform
          },
          tidb_ver: {
            type: this.boxInstanceDetail.cat.tidb_ver.type,
            value: this.boxInstanceDetail.cat.tidb_ver.value,
            platform: this.boxInstanceDetail.cat.tidb_ver.platform
          },
          pd_size: this.boxInstanceDetail.cat.pd_size,
          tidb_size: this.boxInstanceDetail.cat.tidb_size,
          tikv_size: this.boxInstanceDetail.cat.tikv_size,
          config_map: this.boxInstanceDetail.cat.config_map
        },
        ruleForm: this.boxInstanceDetail.rules,
        testForm: {
          in_order: this.boxInstanceDetail.tests.in_order,
          tests: this.boxInstanceDetail.tests.tests
        }
      }
      console.log('the updateboxform: ', this.updateBoxForm)
      // debugger
    },

    handleExperimentDetailClick: function(experimentId) {
      this.showBoxDetail = false
      this.showExperimentDetail = true
      console.log('experimetn id: ', experimentId, this.boxInstanceDetail.id)
      ajax.getExperimentsDetailByID(this.boxInstanceDetail.id, experimentId).then((result) => {
        this.experimentDetail = result.data.data
        console.log('this experimentDetail: ', this.experimentDetail)
        }).catch((resp) => {
        this.$notify.error({
          title: 'Erorr',
          message: resp.message
        })
      })

      ajax.getTestByID(this.boxInstanceDetail.id, experimentId).then((result) => {
        console.log('get test result', result)
        this.testTable.list = result.data.data
        console.log('testtable list', this.testTable.list)
      }).catch((resp) => {
        this.$notify.error({
          title: 'Erorr',
          message: resp.message
        })
      })
    },

    handleExperimentRedoClick: function(experimentId) {
      console.log('before redo, experiment list: ', this.experimentTable.list)
      ajax.redoExperimentByID(this.boxInstanceDetail.id, experimentId).then((result) => {
        console.log('inside redo experiment, result is: ', result)
        if(result.data.code == 200) {
          this.$notify({
            title: 'Redo Success',
            type: 'success',
            message: 'Experiment: ' +  experimentId
          })
          // this.getExperiments(this.boxInstanceDetail.id)
        } else {
          this.$notify.error({
            title: 'Redo Failed',
            message: 'Experiment: ' +  experimentId
          })
        }

      }).catch(resp => {
          this.$notify.error({
            title: 'Error',
            message: resp.message
          })
        })

      ajax.getExperimentsByBoxID(this.boxInstanceDetail.id).then((result) => {
        this.getDetail = true
        this.experimentTable.list = result.data.data
        console.log('after redo, experiment list: ', this.experimentTable.list)
      }).catch(resp => {
        this.$notify.error({
          title: 'Error',
          message: resp.messages
        })
      })
    },

    handleTestDetailClick: function(testName) {
      console.log('hello from test detail click,', testName)
      this.testDetailDialog = true
      ajax.getTestDetailByName(this.boxInstanceDetail.id, this.experimentDetail.id, testName).then(result => {
        if(result.data.code == 200) {
          this.testDetail = result.data.data
        } else {
          this.$notify.error({
            title: 'Error',
            message: 'Get Test Detail By Name Failed'
          })
        }
      }).catch(resp => {
        this.$notify.error({
            title: 'Error',
            message: resp.message
          })
      })
    },

    handleManualTrigger: function() {
      this.$confirm('Continue to manual Trigger this box?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type:'warning',
        center: true
      }).then(() => {
        console.log('click yes')
        ajax.triggerBoxByID(this.boxInstanceDetail.id).then((result) =>{
          if(result.data.code !== 200) {
            this.$notify.error({
              title: 'Error',
              message: 'Manual Trigger Box Failed'
            })
            return
          }
          this.$notify({
            title: 'Manual Trigger Success',
            type: 'success',
            message: 'Box: ' + this.boxInstanceDetail.name
          })
          this.getExperiments(this.boxInstanceDetail.id)
        }).catch((resp) => {
          this.$notify.error({
            title: 'Error',
            message: resp.message
          })
        })
      }).catch(() => {
        console.log('click cancel')
        return
      })

    },

    handleStop: function() {
      this.$confirm('Continue to Stop the Box?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type:'warning',
        center: true
      }).then(() => {
        console.log('click yes')
        this.boxStopped = true
        ajax.stopBoxByID(this.boxInstanceDetail.id).then((result) => {
          if(result.data.code !== 200) {
            this.$notify.error({
              title: 'Error',
              message: 'Stop Box Failed'
            })
            return
          }
          this.$notify({
            title: 'Stop Success',
            type: 'success',
            message: 'Box: ' + this.boxInstanceDetail.name
          })
        }).catch((resp) => {
          this.$notify.error({
            title: 'Error',
            message: resp.message
          })
        })
      }).catch(() => {
        console.log('click cancel')
        return
      })
    },


    handleDelete: function() {
      this.$confirm('Continue to Delete the Box?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type:'warning',
        center: true
      }).then(() => {
        console.log('click yes')
        ajax.deleteBoxByID(this.boxInstanceDetail.id).then((result) => {
          if(result.data.code !== 200) {
            this.$notify.error({
              title: 'Error',
              message: 'Delete Box Failed'
            })
            return
          }
          this.$notify({
            title: ' Delete Success',
            type: 'success',
            message: 'Box: '+ this.boxInstanceDetail.name
          })
          this.getAllBox()
        }).catch((resp) => {
          this.$notify.error({
            title: 'Error',
            message: resp.message
          })
        })
      }).catch(() => {
        console.log('click cancel')
        return
      })
    },

    handleRecover() {
      this.$confirm('This Cat is occupied, continue to edit?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type:'warning',
        center: true
      }).then(() => {
        this.boxStopped = false
        console.log('click recover and teh boxdetail is', this.boxInstanceDetail)
        ajax.recoverBoxByID(this.boxInstanceDetail.id).then(result => {
          if(result.data.code == 200) {
            console.log('return success, the result is, ', result.data.data)
            this.$notify({
              title: 'Success',
              type: 'success',
              message: 'Recover Box '+ this.boxInstanceDetail.name + ' Success'
            })
          } else {
            this.$notify.error({
              title: 'Error',
              message: 'Recover Box '+ this.boxInstanceDetail.name + ' Failed',
            })
          }
        }).catch(resp => {
          this.$notify.error({
            title: 'Error',
            message: resp.message,
            duration: 0
          })
        })
      }).catch(() => {
        console.log('click cancel')
        return
      })
    },

    saveBoxForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ajax.updateBoxByID(this.boxInstanceDetail.id, {
            name: this.updateBoxForm.miscConfigForm.name,
            cat: {
              selected_cat: this.updateBoxForm.catForm.selected_cat,
              labels: this.updateBoxForm.catForm.labels,
              pd_ver: {
                type: this.updateBoxForm.catForm.pd_ver.type,
                value: this.updateBoxForm.catForm.pd_ver.value,
                platform: this.updateBoxForm.catForm.pd_ver.platform,
              },
              tikv_ver: {
                type: this.updateBoxForm.catForm.tikv_ver.type,
                value: this.updateBoxForm.catForm.tikv_ver.value,
                platform: this.updateBoxForm.catForm.tikv_ver.platform
              },
              tidb_ver: {
                type: this.updateBoxForm.catForm.tidb_ver.type,
                value: this.updateBoxForm.catForm.tidb_ver.value,
                platform: this.updateBoxForm.catForm.tidb_ver.platform
              },
              pd_size: this.updateBoxForm.catForm.pd_size,
              tidb_size: this.updateBoxForm.catForm.tidb_size,
              tikv_size: this.updateBoxForm.catForm.tikv_size,
              config_map: this.updateBoxForm.catForm.config_map
            },
            rules: this.updateBoxForm.ruleForm,
            tests: {
              in_order: this.updateBoxForm.testForm.in_order,
              tests: this.updateBoxForm.testForm.tests
            },
            config: {
              slack: this.updateBoxForm.miscConfigForm.slack,
              prepare: this.updateBoxForm.miscConfigForm.prepare,
              stop: this.updateBoxForm.miscConfigForm.stop,
              destory_tidb_cluster: this.updateBoxForm.miscConfigForm.destory_tidb_cluster,
              type: this.updateBoxForm.miscConfigForm.type,
              data: this.updateBoxForm.miscConfigForm.data
            }
          }).then(result => {
            console.log('after update, the updateboxform is: ',this.updateBoxForm)
            if (result.data.code != 200) {
              this.$notify({
                title: "ERROR",
                type: 'error',
                message: result.data.message,
                duration: 0
              });
              return
            }
            this.updateBoxDialog = false
            this.$notify({
              title: 'Success',
              type: 'success',
              message: 'Update Box Success'
            })
            ajax.getBoxDetailByID(this.boxInstanceDetail.id).then(result => {
              this.boxInstanceDetail = result.data.data
              console.log('after update, the new box detail is: ',this.boxInstanceDetail.name, this.boxInstanceDetail.id,  this.boxInstanceDetail)
              debugger
            }).catch((resp) => {
              this.$notify.error({
                title: 'Error',
                message: resp.message
              })
            })

            ajax.getBox().then((result) => {

              this.boxInstanceList = result.data.data
              console.log('boxinstancelsitL', this.boxInstanceList)
              debugger
            }).catch(resp => {
              this.$notify.error({
                title: 'Update Error',
                message: resp.message
              })
            })
          }).catch(resp =>  {
            this.$notify.error({
              title: 'Update Error',
              message: resp.message
            })
          })
        } else {
          this.activeName = ['miscConfig', 'cat', 'tests', 'name']
          console.log('check validation Failed');
          return false;
        }
      })
    },

    handleAdd() {
      this.updateBoxForm.ruleForm.push({
        type: '',
        value: '',
        key: Date.now()
      })
    },

    handleRemove(rule) {
      var index = this.updateBoxForm.ruleForm.indexOf(rule)
      if(index !== -1) {
        this.updateBoxForm.ruleForm.splice(index, 1)
      }
    },

    handleCatChoiceChange(catChoice) {
      console.log('inside hanvlecathchoicechange,catchoice is ', catChoice)
      if(catChoice == 'create') {
        this.updateBoxForm.catForm.selected_cat = ''
      } else {
        this.updateBoxForm.catForm.labels = '',
        this.updateBoxForm.catForm.pd_ver.type = '',
        this.updateBoxForm.catForm.pd_ver.value = '',
        this.updateBoxForm.catForm.pd_ver.platform = ''
        this.updateBoxForm.catForm.tikv_ver.type = '',
        this.updateBoxForm.catForm.tikv_ver.value = '',
        this.updateBoxForm.catForm.tikv_ver.platform = '',
        this.updateBoxForm.catForm.tidb_ver.type = '',
        this.updateBoxForm.catForm.tidb_ver.value = '',
        this.updateBoxForm.catForm.tidb_ver.platform = '',
        this.updateBoxForm.catForm.pd_size = '',
        this.updateBoxForm.catForm.tidb_size = '',
        this.updateBoxForm.catForm.tikv_size = '',
        this.updateBoxForm.catForm.config_map = ''
      }
    },

    jumpToExperimentLists() {
      console.log('jump to experiment ')
      this.showBoxDetail = true
      this.showExperimentDetail = false
    },

    handleStopExperiment(boxID, experimentID) {
      this.$confirm('Continue to Stop Experiment?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type:'warning',
        center: true
      }).then(() => {
        console.log('click yes')
        ajax.stopExperimentByID(boxID, experimentID).then(result => {
          if(result.data.code == 200) {
            this.$notify({
              title: 'Success',
              type: 'success',
              message: 'Stop Experiment: ' + experimentID + ' Successfully'
            })
          }
        }).catch(resp => {
          this.$notify.error({
            title: 'Error',
            message: resp.message
          })
        })
      }).catch(() => {
        console.log('click cancel')
        return
      })
    },

    checkEditRunningCat: function(catID) {
      this.$confirm('This Cat is occupied, continue to edit?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type:'warning',
        center: true
      }).then(() => {
        console.log('click yes')
        this.handleUpdateCatClick(catID)
      }).catch(() => {
        console.log('click cancel')
        return
      })
    },

    filterExperimentStatus(value, row) {
      return row.status === value
    },

    filterExperimentStage(value, row) {
      return row.stage === value
    },

    hideConfigCards() {

      this.showBoxConfig = false
      console.log('click hide box config ', this.showBoxConfig)
    },

    showConfigCards() {

      this.showBoxConfig = true
      console.log('click show box config ', this.showBoxConfig)
    },

    hideExperimentConfigCards() {

      this.showExperimentConfig = false
      console.log('click hide experiment detail', this.showExperimentConfig)
    },

    showExperimentConfigCards() {

      this.showExperimentConfig = true
      console.log('click show experiment detail, ', this.showExperimentConfig)
    },

    filterTestStatus(value, row) {
      return row.status === value
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

  /* .el-aside {
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
  } */
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  /* .grid-content {
    border-radius: 4px;
    min-height: 36px;
  } */
  /* .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  } */
  .box-card {
    /* height: 300px; */
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
    margin-bottom: 20px;
  }
  .experiment-operation {
    /* font-size: 1.5rem; */
    float: right;
    height: 50px;
    /* background: #333; */
    margin-bottom: 20px;
    padding-top: 20px;
  }

  .el-table th>.cell {
    text-align: center;
    font-size: 13px;
  }
  .el-table td div{
    text-align: center
  }
  .item {
    margin: 4px;
  }

  .el-table__column-filter-trigger i {
    color: black;
    font-size: 20px;
    -webkit-transform: scale(.75);
    transform: scale(.75);
  }
</style>
