<template>
<div>
  <el-form :model="newBoxForm" :rules="validationRules" ref="newBoxForm" label-width="13rem" class="demo-form-inline">
    <el-row>
      <el-col :span="10" :offset="2">
        <el-form-item label="Box Name:" prop="miscConfigForm.name" label-width="7rem">
          <el-input v-model="newBoxForm.miscConfigForm.name" placeholder="Enter box name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-collapse v-model="activeName">
      <el-collapse-item title='CAT' name='cat'>
        <el-form-item label="Cat From" prop="catForm.choice">
            <el-radio v-model="newBoxForm.catForm.choice" label="select">Cat Pool</el-radio>
            <el-radio v-model="newBoxForm.catForm.choice" label="create">Create New Cat</el-radio>
        </el-form-item>
        <div v-if="newBoxForm.catForm.choice == 'select'">
          <el-form-item label="Pick Cat" prop="catForm.selected_cat"  class="cat">
            <el-select v-model="newBoxForm.catForm.selected_cat" placeholder="Please select cat" style="width: 400px;">
              <el-option v-for="(item, index) in createdCatPool" :key="index" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div v-if="newBoxForm.catForm.choice == 'create' " class="create-box-cat">
          <el-form-item label="PD Verion:" required>
            <el-col :span="6">
              <el-form-item prop="catForm.pd_ver.type">
                <el-select v-model="newBoxForm.catForm.pd_ver.type" placeholder="Select type">
                  <el-option label="branch" value="branch"></el-option>
                  <el-option label="hash" value="hash"></el-option>
                  <el-option label="tag" value="tag"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="catForm.pd_ver.value">
                <el-input v-if="newBoxForm.catForm.pd_ver.type == ''" v-model="newBoxForm.catForm.pd_ver.value" class="input-with-select" placeholder="Enter PD version value"></el-input>
                <el-input v-if="newBoxForm.catForm.pd_ver.type == 'branch'" v-model="newBoxForm.catForm.pd_ver.value" class="input-with-select" placeholder="eg.master or release-1.0"></el-input>
                <el-input v-if="newBoxForm.catForm.pd_ver.type == 'hash'" v-model="newBoxForm.catForm.pd_ver.value" class="input-with-select" placeholder="Enter hash value"></el-input>
                <el-input v-if="newBoxForm.catForm.pd_ver.type == 'tag'" v-model="newBoxForm.catForm.pd_ver.value" class="input-with-select" placeholder="Enter tag of git repo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="catForm.pd_ver.platform">
                <el-select v-model="newBoxForm.catForm.pd_ver.platform" placeholder="Compile to platform">
                  <el-option label="Centos7" value="centos7"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="PD Size:" prop="catForm.pd_size">
            <el-input v-model.number="newBoxForm.catForm.pd_size" style="width: 200px;"></el-input>
          </el-form-item>

          <el-form-item label="TiKV Verion:" required>
            <el-col :span="6">
              <el-form-item prop="catForm.tikv_ver.type">
                <el-select v-model="newBoxForm.catForm.tikv_ver.type" placeholder="Select type">
                  <el-option label="branch" value="branch"></el-option>
                  <el-option label="hash" value="hash"></el-option>
                  <el-option label="tag" value="tag"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="catForm.tikv_ver.value">
                <el-input v-if="newBoxForm.catForm.tikv_ver.type == ''" v-model="newBoxForm.catForm.tikv_ver.value" class="input-with-select" placeholder="Enter PD version value"></el-input>
                <el-input v-if="newBoxForm.catForm.tikv_ver.type == 'branch'" v-model="newBoxForm.catForm.tikv_ver.value" class="input-with-select" placeholder="eg.master or release-1.0"></el-input>
                <el-input v-if="newBoxForm.catForm.tikv_ver.type == 'hash'" v-model="newBoxForm.catForm.tikv_ver.value" class="input-with-select" placeholder="Enter hash value"></el-input>
                <el-input v-if="newBoxForm.catForm.tikv_ver.type == 'tag'" v-model="newBoxForm.catForm.tikv_ver.value" class="input-with-select" placeholder="Enter tag of git repo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="catForm.tikv_ver.platform">
                <el-select v-model="newBoxForm.catForm.tikv_ver.platform" placeholder="Compile to platform">
                  <el-option label="Unportable Centos7" value="unportable_centos7"></el-option>
                  <el-option label="Centos7" value="centos7"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="TiKV Size:" prop="catForm.tikv_size">
            <el-input v-model.number="newBoxForm.catForm.tikv_size" style="width: 200px;"></el-input>
          </el-form-item>

          <el-form-item label="TiDB Verion:" required>
            <el-col :span="6">
              <el-form-item prop="catForm.tidb_ver.type">
                <el-select v-model="newBoxForm.catForm.tidb_ver.type" placeholder="Select type">
                  <el-option label="branch" value="branch"></el-option>
                  <el-option label="hash" value="hash"></el-option>
                  <el-option label="tag" value="tag"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="catForm.tidb_ver.value">
                <el-input v-if="newBoxForm.catForm.tidb_ver.type == ''" v-model="newBoxForm.catForm.tidb_ver.value" class="input-with-select" placeholder="Enter PD version value"></el-input>
                <el-input v-if="newBoxForm.catForm.tidb_ver.type == 'branch'" v-model="newBoxForm.catForm.tidb_ver.value" class="input-with-select" placeholder="eg.master or release-1.0"></el-input>
                <el-input v-if="newBoxForm.catForm.tidb_ver.type == 'hash'" v-model="newBoxForm.catForm.tidb_ver.value" class="input-with-select" placeholder="Enter hash value"></el-input>
                <el-input v-if="newBoxForm.catForm.tidb_ver.type == 'tag'" v-model="newBoxForm.catForm.tidb_ver.value" class="input-with-select" placeholder="Enter tag of git repo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="catForm.tidb_ver.platform">
                <el-select v-model="newBoxForm.catForm.tidb_ver.platform" placeholder="Compile to platform">
                  <el-option label="Centos7" value="centos7"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="TiDB Size:" prop="catForm.tidb_size">
            <el-input v-model.number="newBoxForm.catForm.tidb_size" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="Config Map:" prop="catForm.config_map">
            <el-input v-model="newBoxForm.catForm.config_map"></el-input>
          </el-form-item>
        </div>
      </el-collapse-item>

      <el-collapse-item title="Tests" name="tests" class="test">
        <el-form-item label="Execution method" prop="testForm.in_order">
            <el-radio v-model="newBoxForm.testForm.in_order" :label=true>Serial execution</el-radio>
            <el-radio v-model="newBoxForm.testForm.in_order" :label=false>Parallel execution</el-radio>
        </el-form-item>
        <div style="position: relative; margin-top: 20px">
          <el-form-item label="Pick Tests: " prop="testForm.tests">
              <el-select v-model="newBoxForm.testForm.tests" multiple placeholder="Please select test" style="width: 400px;">
                <el-option v-for="(item, index) in testTemplateList" :key="index" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
        </div>
      </el-collapse-item>

      <el-collapse-item title="Trigger Rules" name="rules">
        <!-- <el-form-item v-for="(rule, index) in newBoxForm.ruleForm" label-width="7rem" :key="rule.key" label="Rule Type" required>
            <el-row>
              <el-col> -->
                <el-form-item v-for="(rule, index) in newBoxForm.ruleForm" :key="rule.key" label="Rule Type: " :prop="'ruleForm.'+index+'.type'" required>
                  <el-radio-group v-model="newBoxForm.ruleForm[index].type">
                    <el-radio label="IMMEDIATELY">Immediately Job
                      <el-tooltip class="item" effect="dark" content="Trigger an experiment immediately">
                        <Icon type="information-circled" style="margin-left: 5px"></Icon>
                      </el-tooltip>
                    </el-radio>
                    <el-radio label="CRONTAB">Crontab Job
                      <el-tooltip class="item" effect="dark" content="Trigger an experiment at customized time">
                        <Icon type="information-circled" style="margin-left: 5px"></Icon>
                      </el-tooltip>
                    </el-radio>
                    <el-radio label="GIT">Git Update
                      <el-tooltip class="item" effect="dark" content="Trigger an experiment when tiDB code been updated">
                        <Icon type="information-circled" style="margin-left: 5px"></Icon>
                      </el-tooltip>
                    </el-radio>
                  </el-radio-group>
                  <!-- <el-select v-model="newBoxForm.ruleForm[index].type" placeholder="Select rule type">
                    <el-option label="Immediately Job" value="IMMEDIATELY"></el-option>
                    <el-option label="Crontab Job" value="CRONTAB"></el-option>
                    <el-option label="Git Webhook" value="GIT"></el-option>
                  </el-select> -->
                </el-form-item>
              <!-- </el-col>
            </el-row> -->
            <el-row>
              <el-col>
                <el-form-item v-if="newBoxForm.ruleForm[index].type == 'CRONTAB'" v-for="(rule, index) in newBoxForm.ruleForm" :key="rule.key" :prop="'ruleForm.'+index+'.type'" required="">
                  <template slot="label">Timed Trigger:
                    <el-tooltip class="item" effect="dark">
                      <div slot="content">Format:* * * * *<br> 1st col: minute, <br>2nd col: hour, <br>3rd col: date, <br>4th col: month, <br>5th col: year <br><br><br>
                          <a href="https://blog.csdn.net/bsf5521/article/details/76522222">Click me for more details</a></div>
                      <Icon type="information-circled" style="margin-left: 5px"></Icon>
                    </el-tooltip>
                  </template>
                  <el-input v-model="newBoxForm.ruleForm[index].value" class="input-with-select" placeholder="eg. 30 6 * * * (Means trigger an experiment at 6:30AM everyday)"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          <!-- <br> -->
        <!-- </el-form-item> -->
        <!-- <el-row>
          <el-col :span="1" :offset="1">
            <Button type="dashed" @click="handleAdd()" icon="plus-round">Add rule</Button>
          </el-col>
        </el-row> -->
      </el-collapse-item>

      <el-collapse-item title="Misc Config" name="miscConfig">
        <el-form-item prop="miscConfigForm.slack">
          <template slot="label">Slack Channel:
            <el-tooltip class="item" effect="dark" content="Send experiment reports to Slack channel #">
              <Icon type="information-circled" style="margin-left: 5px"></Icon>
            </el-tooltip>
          </template>
          <el-input v-model="newBoxForm.miscConfigForm.slack"></el-input>
        </el-form-item>
        <el-form-item prop="miscConfigForm.prepare">
          <template slot="label">Prepare Callback:
            <el-tooltip class="item" effect="dark" content="Execute callbacks preparing clusters">
              <Icon type="information-circled" style="margin-left: 5px"></Icon>
            </el-tooltip>
          </template>
          <el-input v-model="newBoxForm.miscConfigForm.prepare"></el-input>
        </el-form-item>
        <el-form-item prop="miscConfigForm.stop">
          <template slot="label">Stop Callback:
            <el-tooltip class="item" effect="dark" content="Execute callbacks stopping clusters">
              <Icon type="information-circled" style="margin-left: 5px"></Icon>
            </el-tooltip>
          </template>
          <el-input v-model="newBoxForm.miscConfigForm.stop"></el-input>
        </el-form-item>
        <el-form-item label="Type:" prop="miscConfigForm.type">
          <el-input v-model="newBoxForm.miscConfigForm.type"></el-input>
        </el-form-item>
        <el-form-item prop="miscConfigForm.destory_tidb_cluster">
          <template slot="label">Destory TiDB Cluster:
            <el-tooltip class="item" effect="dark" content="Destroy TiDB cluster after finishing all experiments">
              <Icon type="information-circled" style="margin-left: 5px"></Icon>
            </el-tooltip>
          </template>
          <el-radio border v-model="newBoxForm.miscConfigForm.destory_tidb_cluster" :label=true>Yes</el-radio>
          <el-radio border v-model="newBoxForm.miscConfigForm.destory_tidb_cluster" :label=false>No</el-radio>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
    <div class="my-footer" style="margin-top: 10px;">
      <el-form-item>
        <el-button type="primary" @click="submitForm('newBoxForm')">Submit</el-button>
        <el-button @click="resetForm('newBoxForm')">Reset</el-button>
      </el-form-item>
    </div>
  </el-form>
</div>
</template>

<script>
import ajax from '../request/index'
export default {
  data() {
    var checkArrayEmpty = (rule, value, callback) => {
      console.log('inside checkarray empty, value is ', value)
      if(value.length == 0) {
        return callback(new Error('Please pick at least one test'))
      } else {
        callback()
      }
    }
    var checkEmpty = (rule, value, callback) => {
        console.log('inside checkempty value and type of value: ', value, typeof(value))
        if(!value) {
          return callback(new Error('Cannot be empty'))
        } else {
          callback()
        }
      }

    var checkString = ((rule, value, callback) => {
      // console.log('inside checkstring, value', value, typeof(value))
      if(!value) {
        return callback(new Error('Cannot be empty'))
      }
      var regx = /^[0-9]*$/
      if(regx.test(value)) {
        return callback(new Error('Must be string'))
      } else {
        callback()
      }
    })

    var checkNumber = ((rule, value, callback) => {
      if(!value) {
        return callback(new Error('Cannot be empty'))
      }
      var regx = /^[0-9]*$/
      if(!regx.test(value)) {
        return callback(new Error('Must be a number'))
      } else {
        callback()
      }
    })

    return {
      activeName: ['cat'],
      testTemplateList: [],
      createdCatPool: [],
      newBoxForm: {
        miscConfigForm: {
          name: '',
          slack: '',
          prepare: '',
          stop: '',
          destory_tidb_cluster: true,
          type: ''
        },
        catForm: {
          choice: 'select',
          selected_cat:'',
          labels: '',
          pd_ver: {
            type: '',
            value: '',
            platform: ''
          },
          tikv_ver: {
            type: '',
            value: '',
            platform: ''
          },
          tidb_ver: {
            type: '',
            value: '',
            platform: ''
          },
          pd_size: 0,
          tidb_size: 0,
          tikv_size: 0,
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
        'miscConfigForm.name' :[{required: true, validator: checkString, trigger: 'blur'}],
        // 'miscConfigForm.slack':[{required: true, validator: checkString, trigger: 'blur'}],
        // 'miscConfigForm.prepare':[{required: true, validator: checkArrayEmpty, trigger: 'blur'}],
        // 'miscConfigForm.stop':[{required: true, validator: checkArrayEmpty, trigger: 'blur'}],
        // 'miscConfigForm.destory_tidb_cluster':[{required: true, validator: checkEmpty, trigger: 'change'}],
        // 'miscConfigForm.type':[{required: true, validator: checkString, trigger: 'blur'}],
        // 'catForm.labels': [{required: true, validator: checkString, trigger: 'change'}],
        'catForm.name': [{required: true, validator: checkString, trigger: 'change'}],
        'catForm.selected_cat': [{required: true, validator: checkString, trigger: 'change'}],
        'catForm.pd_ver.type': [{required: true, validator: checkString, trigger: 'change'}],
        'catForm.pd_ver.value': [{required: true, validator: checkString, trigger: 'change'}],
        'catForm.pd_ver.platform': [{required: true, validator: checkString, trigger: 'change'}],
        'catForm.tikv_ver.type': [{required: true, validator: checkString, trigger: 'change'}],
        'catForm.tikv_ver.value': [{required: true, validator: checkString, trigger: 'change'}],
        'catForm.tikv_ver.platform': [{required: true, validator: checkString, trigger: 'change'}],
        'catForm.tidb_ver.type': [{required: true, validator: checkString, trigger: 'change'}],
        'catForm.tidb_ver.value': [{required: true, validator: checkString, trigger: 'change'}],
        'catForm.tidb_ver.platform': [{required: true, validator: checkString, trigger: 'change'}],
        'catForm.pd_size': [{required: true, validator: checkNumber, trigger:'change'}],
        'catForm.tikv_size': [{required: true, validator: checkNumber, trigger:'change'}],
        'catForm.tidb_size': [{required: true, validator: checkNumber, trigger:'change'}],
        'catForm.config_map': [{required: true, validator: checkString, trigger: 'change'}],
        'testForm.tests':[{required: true, validator: checkArrayEmpty, trigger: 'change'}],
        'ruleForm.type': [{required: true, validator: checkString, trigger: 'blur'}],
        'ruleForm.value': [{required: true, validator: checkString, trigger: 'blur'}],
      }
    }
  },

  created() {
    this.fetchTestTemplates()
  },

  methods: {
    fetchTestTemplates: function() {
      ajax.getTestTemplate().then((result) => {
        console.log(result.data.data)
        this.testTemplateList = _.values(result.data.data)
        console.log('the testTemplateList is ', this.testTemplateList)
      }).catch(resp => {
        this.$notify.error({
          title: 'Error',
          message: resp.message
        })
      })
      ajax.getCat().then((result) => {
        console.log('getcats result: ',result)
        this.createdCatPool = _.values(result.data.data)
        console.log('the created cats are: ', this.createdCatPool)
      }).catch(resp => {
        this.$notify.error({
          title: 'Error',
          message: resp.message
        })
      })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // debugger
        if (valid) {
            ajax.createBox({
              name: this.newBoxForm.miscConfigForm.name,
              cat: {
                selected_cat: this.newBoxForm.catForm.selected_cat,
                labels: this.newBoxForm.catForm.labels,
                pd_ver: {
                  type: this.newBoxForm.catForm.pd_ver.type,
                  value: this.newBoxForm.catForm.pd_ver.value,
                  platform: this.newBoxForm.catForm.pd_ver.platform,
                },
                tikv_ver: {
                  type: this.newBoxForm.catForm.tikv_ver.type,
                  value: this.newBoxForm.catForm.tikv_ver.value,
                  platform: this.newBoxForm.catForm.tikv_ver.platform
                },
                tidb_ver: {
                  type: this.newBoxForm.catForm.tidb_ver.type,
                  value: this.newBoxForm.catForm.tidb_ver.value,
                  platform: this.newBoxForm.catForm.tidb_ver.platform
                },
                pd_size: this.newBoxForm.catForm.pd_size,
                tidb_size: this.newBoxForm.catForm.tidb_size,
                tikv_size: this.newBoxForm.catForm.tikv_size,
                config_map: this.newBoxForm.catForm.config_map
              },
              rules: this.newBoxForm.ruleForm,
              tests: {
                in_order: this.newBoxForm.testForm.in_order,
                tests: this.newBoxForm.testForm.tests
              },
              config: {
                slack: this.newBoxForm.miscConfigForm.slack,
                prepare: this.newBoxForm.miscConfigForm.prepare,
                stop: this.newBoxForm.miscConfigForm.stop,
                destory_tidb_cluster: this.newBoxForm.miscConfigForm.destory_tidb_cluster,
                type: this.newBoxForm.miscConfigForm.type
              }
            }).then((result) => {
              console.log('result code', result.data.code)
              if(result.data.code != 200) {
                this.$notify.error({
                  title: 'Error',
                  message: result.data.message
                });
                return
              }

              this.$notify({
                title: 'Submit success!',
                message: 'Create box SUCCESS',
                type: 'success'
              })

              this.$router.push({name: 'BoxInstance'})
            }).catch((resp) => {
              // debugger
              console.log('inside catch')
              this.$notify.error({
                title: "ERROR",
                message: resp.message,
                duration: 0
              })
            })
        } else {
          this.activeName = ['miscConfig', 'cat', 'tests', 'rules']
          console.log('check validation Failed');
          return false;
        }
      });
    },

    resetForm(formName) {
      console.log("click reset form")
      if (this.$refs[formName] != null) {
        this.$refs[formName].resetFields();
      }
    },
    handleAdd() {
      this.newBoxForm.ruleForm.push({
        type: '',
        value: '',
        key: Date.now()
      })
    },

    handleRemove(rule) {
      var index = this.newBoxForm.ruleForm.indexOf(rule)
      if(index !== -1) {
        this.newBoxForm.ruleForm.splice(index, 1)
      }
    }
  }
}
</script>
<style>
  /* .cat .el-select .el-input {
    width: 400px;
  }

  .test .el-select .el-input {
    width: 400px;
  }

  .create-box-cat .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input {
    width: 500px;
  } */

  .el-select {
    width: 100%;
  }

  .my-footer {
    padding: 10px 20px 20px;
    text-align: right;
    box-sizing: border-box;
  }
  /* .create-box-cat .el-input {
    width: 500px
  } */

  .el-collapse-item__header {
    font-size: 15px;
  }
  .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    font-size: 16px;
  }
</style>

