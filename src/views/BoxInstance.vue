<template>
  <div>
    <!-- No box -->
    <el-container v-if="noBoxInstance" style="height: 1000px; border: 1px solid #eee">
      <el-aside width="200px">
        <el-menu width="auto" default-openeds=[1] active-text-color="red">
          <el-submenu index="1">
            <template slot="title"><Icon type="ios-box" style="margin-right: 15px"></Icon>Boxes</template>
            <el-menu-item index="1">No Box</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          No Box Data
        </el-main>
      </el-container>
    </el-container>

    <!-- Has Box -->
    <el-container v-if="hasBoxInstance" style="height: 1000px; border: 1px solid #eee">
      <el-aside width="200px">
        <el-menu v-if="boxInstanceList.length" :default-active="boxInstanceList[0].name" width="auto">
          <el-submenu index="1">
            <template slot="title"><Icon type="ios-box" style="margin-right: 15px"></Icon>Boxes</template>
            <el-menu-item v-for="(instance, index) in boxInstanceList" :key="index" :index="instance.name" @click.native="getBoxDetail(instance)">{{instance.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- show box detail -->
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
              <my-card :boxInfoCard="boxInstanceDetail" section="Config" box="true">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :boxInfoCard="boxInstanceDetail.cat" section="Cat" box="true">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :boxInfoCard="boxInstanceDetail.tests" section="Tests" box="true">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :boxInfoCard="boxInstanceDetail.rules" section="Rules" box="true">
              </my-card>
            </el-col>
          </el-row>
        </el-header>
        <div style="margin-bottom: 10px; margin-left: 25px; margin-top: 30px">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>Box: {{boxInstanceDetail.name}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/'}"> <Strong>Experiments </Strong></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-main>
          <el-table :data="experimentTable.list">
            <el-table-column v-for="(item, index) in experimentTable.prop" :key="index" :prop="item" :label="experimentTable.label[index]">
            </el-table-column>
            <el-table-column label="Operation">
              <template slot-scope="scope">
                <el-button @click.native="handleExperimentDetailClick(scope.row.id)">Detail</el-button>
              </template>
            </el-table-column>
            <el-table-column label="Operation">
              <template slot-scope="scope">
                <el-button @click.native="handleExperimentRedoClick(scope.row.id)">Redo</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>

      <!-- show experiment Detail -->
      <el-container v-if="showExperimentDetail">
        <el-header style="height:400px;">
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
        <div style="margin-bottom: 10px; margin-left: 25px;">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>Box: {{boxInstanceDetail.name}} </el-breadcrumb-item>
            <el-breadcrumb-item>Experiments </el-breadcrumb-item>
            <el-breadcrumb-item> <Strong>Tests </Strong></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-main>
          <el-table :data="testTable.list">
            <el-table-column v-for="(item, index) in testTable.prop" :key="index" :prop="item"
                            :label="testTable.label[index]">
            </el-table-column>
            <!-- <el-table-column label="Status" prop="status">
              <template slot-scope="scope">
              <i v-if="scope.status == 'Error'" class="el-icon-error"></i>
              </template>
            </el-table-column> -->
            <el-table-column label="Operation">
              <template slot-scope="scope">
                <el-button @click.native="handleTestDetailClick(scope.row.name)">Detail</el-button>
              </template>
            </el-table-column>
            <el-table-column label="Status">
              <template slot-scope="scope">
                <el-button type="success" icon="el-icon-check" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>

    <!-- update box dialog -->
    <div>
      <el-dialog title="Update Box" :visible.sync="updateBoxDialog">
        <el-form :model="updateBoxForm" inline :rules="validationRules" ref="updateBoxForm" label-width="10rem" class="demo-form-inline">
          <el-collapse v-model="activeName">
            <el-collapse-item title="Misc Config" name="miscConfig">
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
              <el-radio border v-model="updateBoxForm.miscConfigForm.destory_tidb_cluster" :label=true>Yes</el-radio>
                <el-radio border v-model="updateBoxForm.miscConfigForm.destory_tidb_cluster" :label=false>No</el-radio>
              </el-form-item>
              <el-form-item label="Type:" prop="miscConfigForm.type">
                <el-input v-model="updateBoxForm.miscConfigForm.type"></el-input>
              </el-form-item>
              <el-form-item label="Data:" prop="miscConfigForm.data">
                <el-input v-model="updateBoxForm.miscConfigForm.data"></el-input>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="CAT" name="cat">
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
                <el-input v-model.number="updateBoxForm.catForm.pd_size"></el-input>
              </el-form-item>
              <el-form-item label="TiDB Size:" prop="catForm.tidb_size">
                <el-input v-model.number="updateBoxForm.catForm.tidb_size"></el-input>
              </el-form-item>
              <el-form-item label="TiKV Size:" prop="catForm.tikv_size">
                <el-input v-model.number="updateBoxForm.catForm.tikv_size"></el-input>
              </el-form-item>
              <el-form-item label="Config Map:" prop="catForm.config_map">
                <el-input v-model="updateBoxForm.catForm.config_map"></el-input>
              </el-form-item>
            </el-collapse-item>
          <el-collapse-item title="Tests" name="tests">
            <el-form-item label="Execution method" prop="testForm.in_order">
                <el-radio v-model="updateBoxForm.testForm.in_order" :label=true>Serial execution</el-radio>
                <el-radio v-model="updateBoxForm.testForm.in_order" :label=false>Parallel execution</el-radio>
            </el-form-item>
            <div style="position: relative; margin-top: 20px">
              <el-form-item label="Tests: " prop="testForm.tests">
                  <el-select v-model="updateBoxForm.testForm.tests" multiple placeholder="Please select test" style="width: 400rem;">
                    <el-option v-for="(item, index) in testTemplateList" :key="index" :value="item.name"></el-option>
                  </el-select>
                </el-form-item>
            </div>
            </el-collapse-item>

            <el-collapse-item title="Rules" name="name">
              <el-form-item v-for="(rule, index) in updateBoxForm.ruleForm" label-width="7rem" :key="rule.key" :label="'Rule ' + index"
                          :prop="'ruleForm.' + index + '.type'">
                <el-row>
                  <el-col :span="22">
                    <el-input v-model="rule.value" class="input-with-select">
                      <el-select v-model="rule.type" slot="prepend" style="width: 150px" placeholder="Select prefix">
                        <el-option label="Immediately Job" value="immediately job"></el-option>
                        <el-option label="Crontab Job" value="crontab job"></el-option>
                        <el-option label="Git Webhook" value="git webhook"></el-option>
                      </el-select>
                    </el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button @click.prevent="handleRemove(rule)">Remove</el-button>
                  </el-col>
                </el-row>
                <br>
              </el-form-item>
              <!-- <el-form-item v-for="(type, index) in updateBoxForm.ruleForm.type" label-width="7rem" :key="type.key"
                            :label="'Rule ' + index" :prop="'ruleForm.type' + index">
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
              </el-form-item> -->
              <el-row>
                <el-col :span="1" :offset="1">
                  <Button type="dashed" @click="handleAdd()" icon="plus-round">Add rule</Button>
                </el-col>
              </el-row>
            </el-collapse-item>
        </el-collapse>
          <div style="margin-top: 10px;">
            <el-form-item>
              <el-button type="primary" @click="saveBoxForm('updateBoxForm')">Save</el-button>
              <el-button @click="resetForm('updateBoxForm')">Reset</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>

    <!-- test detail dialog -->
    <el-dialog title="Test Detail" :visible.sync="testDetailDialog">
      {{testDetail}}
    </el-dialog>
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
    var checkArrayEmpty = (rule, value, callback) => {
      if(value.length <= 0) {
        return callback(new Error('Cannot be empty'))
      } else {
        callback()
      }
    }

    var checkEmpty = (rule, value, callback) => {
      if(!value) {
        return callback(new Error('Cannot be empty'))
      } else {
        callback()
      }
    }

    var checkString = ((rule, value, callback) => {
      if(!value) {
        return callback(new Error('Cannot be empty'))
      }
      if(Number.isInteger(value)) {
        return callback(new Error('Must be string'))
      } else {
        callback()
      }
    });

    var checkNumber = ((rule, value, callback) => {
      if(!value) {
        return callback(new Error('Cannot be empty'))
      }
      if(isNaN(value)) {
        return callback(new Error('Must be a number'))
      } else {
        callback()
      }
    });
    return {
      activeName: 'miscConfig',
      testDetailDialog: false,
      noBoxInstance: false,
      hasBoxInstance: false,
      boxInstanceList: [],
      boxInstanceDetail: {},
      showBoxDetail: true,
      showExperimentDetail: false,
      getDetail: false,
      updateBoxDialog: false,
      experimentDetail: '',
      testTemplateList: [],
      experimentTable: {
        label: ['ID', 'Name', 'Create Time', 'Update Time','Status', 'Stage'],
        prop: ['id', 'name', 'create_time', 'update_time', 'status','stage'],
        list: []
      },
      testTable: {
        label: ['Name', 'Status'],
        prop: ['name', 'status'],
        list: []
      },
      testDetail: '',
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
          in_order: '',
          tests: []
        },

        ruleForm: [{
          type: '',
          value: ''
        }]
      },
      validationRules: {
        'miscConfigForm.name' :[{required: true, validator: checkString, trigger: 'blur'}],
        'catForm.pd_ver': [{required: true, validator: checkString, trigger: 'blur'}],
        'catForm.tikv_ver': [{required: true, validator: checkString, trigger: 'blur'}],
        'catForm.tidb_ver': [{required: true, validator: checkString, trigger: 'blur'}],
        'catForm.pd_size': [{ required: true, message: 'Cannot be empty'}, { type: 'number', message: 'Must be number'}],
        'catForm.tikv_size': [{ required: true, message: 'Cannot be empty'}, { type: 'number', message: 'Must be number'}],
        'catForm.tidb_size': [{ required: true, message: 'Cannot be empty'}, { type: 'number', message: 'Must be number'}],
        'catForm.config_map': [{required: true, validator: checkString, trigger: 'blur'}],
        'testForm.tests':[{required: true, validator: checkArrayEmpty, trigger: 'change'}],
      }
    }
  },

  created() {
    this.testDetailDialog = false,
    this.noBoxInstance = false,
    // var getData = function() {
    //   console.log('get start')
    //   return new Promise(function(resolve, reject) {
    //     ajax.getBox().then((result) => {
    //       if(result.data.code == 200) {
    //         resolve(result.data)
    //       } else {
    //         this.$notify.error({
    //           title: 'Error',
    //           message: result.data.message
    //         });
    //       }
    //     }).catch((resp) => {
    //       reject(resp.message)
    //     })
    //   })
    // }

    // getData().then((data)=>{
    //   this.boxInstanceList = data.data
    //   this.fetchInitialBox()
    //   let boxId = this.boxInstanceDetail.id
    //   console.log('inside get experiment promise')
    //   console.log('this.boxinstance detail id: ', this.boxInstanceDetail.id)
    //   return new Promise(function(resolve, reject) {
    //     ajax.getExperimentsByBoxID (boxId).then((result) => {
    //       if(result.data.code == 200) {
    //         resolve(result.data)
    //       } else {
    //         this.$notify.error({
    //           title: 'Error',
    //           message: result.data.message
    //         });
    //       }
    //     }).catch((resp) => {
    //       reject(resp.message)
    //     })
    //   })
    // }).then((data) => {
    //   this.experimentTable.list = data.data
    //   this.getDetail = true
    //   console.log('the experimetntable: ', this.experimentTable)
    // })
    this.getAllBox()
  },

  methods: {
    getAllBox: function() {
      ajax.getBox().then((result) => {
        console.log('the result is: ', result)
        if(result.data.data.length == 0) {
          this.noBoxInstance = true
          this.hasBoxInstance = false
          return
        } else {
          this.noBoxInstance = false
          this.hasBoxInstance = true
          this.boxInstanceList = result.data.data
          console.log('this.boxinstancelist: ', this.boxInstanceList)
          this.fetchInitialBox()
          let boxId = this.boxInstanceDetail.id
          this.getExperiments(boxId)
        }
      })
    },
    fetchInitialBox: function() {
      this.boxInstanceDetail = this.boxInstanceList[0]
      console.log('this.boxInstanceDetail: ', this.boxInstanceDetail)
    },

    getExperiments: function(boxId) {
      ajax.getExperimentsByBoxID(boxId).then((result) => {
        this.getDetail = true
        console.log('get experiment result: ', result)
        this.experimentTable.list = result.data.data
        console.log('box id: ', boxId)
        console.log('get experiment from click other box instance: ', this.experimentTable.list)
      })
    },

    getBoxDetail: function(instance) {
      this.showExperimentDetail = false
      this.showBoxDetail = true
      this.boxInstanceDetail = instance
      this.getExperiments(this.boxInstanceDetail.id)
     },

    handleEdit: function() {
      console.log('click handleEdit')
      console.log('boxinstance in handleedit: ', this.boxInstanceDetail)
      this.updateBoxDialog = true
      // debugger
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
          pd_ver: this.boxInstanceDetail.cat.pd_ver,
          tikv_ver: this.boxInstanceDetail.cat.tikv_ver,
          tidb_ver: this.boxInstanceDetail.cat.tidb_ver,
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
    },

    handleStop: function() {
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
    },

    handleDelete: function() {
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
    },

    saveBoxForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ajax.updateBoxByID(this.boxInstanceDetail.id, {
            name: this.updateBoxForm.miscConfigForm.name,
            cat: {
              pd_ver: this.updateBoxForm.catForm.pd_ver,
              tikv_ver: this.updateBoxForm.catForm.tikv_ver,
              tidb_ver: this.updateBoxForm.catForm.tidb_ver,
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
            }).catch((resp) => {
              this.$notify.error({
                title: 'Error',
                message: resp.message
              })
            })

            ajax.getBox().then((result) => {
              this.boxInstanceList = result.data.data
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
