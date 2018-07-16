<template>
<div>
  <el-form :model="newBoxForm" inline :rules="validationRules" ref="newBoxForm" label-width="10rem" class="demo-form-inline">
    <el-form-item label="Box Name:" prop="miscConfigForm.name" label-width="7rem">
          <el-input v-model="newBoxForm.miscConfigForm.name" placeholder="Enter box name"></el-input>
        </el-form-item>
    <el-collapse v-model="activeName">
      <!-- <el-collapse-item title="CAT" name="cat">
        <el-form-item label="PD Verion:" prop="catForm.pd_ver">
          <el-input v-model="newBoxForm.catForm.pd_ver.value" class="input-with-select" placeholder="Enter PD version value" width="200px">
            <el-select v-model="newBoxForm.catForm.pd_ver.type" slot="prepend" style="width: 130px" placeholder="Select type">
              <el-option label="branch" value="branch"></el-option>
              <el-option label="hash" value="hash"></el-option>
              <el-option label="tag" value="tag"></el-option>
            </el-select>
            <el-select v-model="newBoxForm.catForm.pd_ver.platform" slot="append" style="width: 200px" placeholder="Compile to platform">
              <el-option label="Centos7" value="centos7"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="TiKV Verion:" prop="catForm.tikv_ver">
          <el-input v-model="newBoxForm.catForm.tikv_ver.value" class="input-with-select" placeholder="Enter TiKV version value">
            <el-select v-model="newBoxForm.catForm.tikv_ver.type" slot="prepend" style="width: 130px" placeholder="Select type">
              <el-option label="branch" value="branch"></el-option>
              <el-option label="hash" value="hash"></el-option>
              <el-option label="tag" value="tag"></el-option>
            </el-select>
            <el-select v-model="newBoxForm.catForm.tikv_ver.platform" slot="append" style="width: 200px" placeholder="Compile to platform">
              <el-option label="Unportable Centos7" value="unportable_centos7"></el-option>
              <el-option label="Centos7" value="centos7"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="TiDB Verion:" prop="catForm.tidb_ver">
          <el-input v-model="newBoxForm.catForm.tidb_ver.value" class="input-with-select" placeholder="Enter TiDB version value">
            <el-select v-model="newBoxForm.catForm.tidb_ver.type" slot="prepend" style="width: 130px" placeholder="Select type">
              <el-option label="branch" value="branch"></el-option>
              <el-option label="hash" value="hash"></el-option>
              <el-option label="tag" value="tag"></el-option>
            </el-select>
            <el-select v-model="newBoxForm.catForm.tidb_ver.platform" slot="append" style="width: 200px" placeholder="Compile to platform">
              <el-option label="Centos7" value="centos7"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="PD Size:" prop="catForm.pd_size">
          <el-input v-model.number="newBoxForm.catForm.pd_size"></el-input>
        </el-form-item>
        <el-form-item label="TiDB Size:" prop="catForm.tidb_size">
          <el-input v-model.number="newBoxForm.catForm.tidb_size"></el-input>
        </el-form-item>
        <el-form-item label="Tikv Size:" prop="catForm.tikv_size">
          <el-input v-model.number="newBoxForm.catForm.tikv_size"></el-input>
        </el-form-item>
        <el-form-item label="Config Map:" prop="catForm.config_map">
          <el-input v-model="newBoxForm.catForm.config_map"></el-input>
        </el-form-item>
      </el-collapse-item> -->
      <el-collapse-item title='CAT' name='cat' class="cat">
        <el-form-item label="Cat From" prop="catForm.chooseCreatedCats">
           <el-radio v-model="newBoxForm.catForm.chooseCreatedCats" :label="true">Created Cat Pool</el-radio>
           <el-radio v-model="newBoxForm.catForm.chooseCreatedCats" :label="false">Create New Cat</el-radio>
        </el-form-item>
        <el-form-item v-if="newBoxForm.catForm.chooseCreatedCats" label="Pick Cat" prop="catForm.cat">
          <el-select v-model="newBoxForm.catForm.cat" multiple placeholder="Please select cat" style="width: 400px;">
            <el-option v-for="(item, index) in createdCatPool" :key="index" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <div v-if="!newBoxForm.catForm.chooseCreatedCats">
          <el-form-item label="PD Verion:" prop="catForm.pd_ver">
          <el-input v-model="newBoxForm.catForm.pd_ver.value" class="input-with-select" placeholder="Enter PD version value" width="200px">
            <el-select v-model="newBoxForm.catForm.pd_ver.type" slot="prepend" style="width: 130px" placeholder="Select type">
              <el-option label="branch" value="branch"></el-option>
              <el-option label="hash" value="hash"></el-option>
              <el-option label="tag" value="tag"></el-option>
            </el-select>
            <el-select v-model="newBoxForm.catForm.pd_ver.platform" slot="append" style="width: 200px" placeholder="Compile to platform">
              <el-option label="Centos7" value="centos7"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="TiKV Verion:" prop="catForm.tikv_ver">
          <el-input v-model="newBoxForm.catForm.tikv_ver.value" class="input-with-select" placeholder="Enter TiKV version value">
            <el-select v-model="newBoxForm.catForm.tikv_ver.type" slot="prepend" style="width: 130px" placeholder="Select type">
              <el-option label="branch" value="branch"></el-option>
              <el-option label="hash" value="hash"></el-option>
              <el-option label="tag" value="tag"></el-option>
            </el-select>
            <el-select v-model="newBoxForm.catForm.tikv_ver.platform" slot="append" style="width: 200px" placeholder="Compile to platform">
              <el-option label="Unportable Centos7" value="unportable_centos7"></el-option>
              <el-option label="Centos7" value="centos7"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="TiDB Verion:" prop="catForm.tidb_ver">
          <el-input v-model="newBoxForm.catForm.tidb_ver.value" class="input-with-select" placeholder="Enter TiDB version value">
            <el-select v-model="newBoxForm.catForm.tidb_ver.type" slot="prepend" style="width: 130px" placeholder="Select type">
              <el-option label="branch" value="branch"></el-option>
              <el-option label="hash" value="hash"></el-option>
              <el-option label="tag" value="tag"></el-option>
            </el-select>
            <el-select v-model="newBoxForm.catForm.tidb_ver.platform" slot="append" style="width: 200px" placeholder="Compile to platform">
              <el-option label="Centos7" value="centos7"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="PD Size:" prop="catForm.pd_size">
          <el-input v-model.number="newBoxForm.catForm.pd_size"></el-input>
        </el-form-item>
        <el-form-item label="TiDB Size:" prop="catForm.tidb_size">
          <el-input v-model.number="newBoxForm.catForm.tidb_size"></el-input>
        </el-form-item>
        <el-form-item label="Tikv Size:" prop="catForm.tikv_size">
          <el-input v-model.number="newBoxForm.catForm.tikv_size"></el-input>
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
       <el-collapse-item title="Rules" name="name">
        <el-form-item v-for="(rule, index) in newBoxForm.ruleForm" label-width="7rem" :key="rule.key" :label="'Rule ' + index"
                    :prop="'ruleForm.' + index + '.type'">
          <el-row>
            <el-col :span="18">
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
        <el-row>
          <el-col :span="1" :offset="1">
            <Button type="dashed" @click="handleAdd()" icon="plus-round">Add rule</Button>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Misc Config" name="miscConfig">
        <el-form-item label="Slack Channel:" prop="miscConfigForm.slack">
          <el-input v-model="newBoxForm.miscConfigForm.slack"></el-input>
        </el-form-item>
        <el-form-item label="Prepare Callback:" prop="miscConfigForm.prepare">
          <el-input v-model="newBoxForm.miscConfigForm.prepare"></el-input>
        </el-form-item>
        <el-form-item label="Stop Callback:" prop="miscConfigForm.stop">
          <el-input v-model="newBoxForm.miscConfigForm.stop"></el-input>
        </el-form-item>
        <el-form-item label="DestoryTidbCluster:" prop="miscConfigForm.destory_tidb_cluster">
          <el-radio border v-model="newBoxForm.miscConfigForm.destory_tidb_cluster" :label=true>Yes</el-radio>
          <el-radio border v-model="newBoxForm.miscConfigForm.destory_tidb_cluster" :label=false>No</el-radio>
        </el-form-item>
        <el-form-item label="Type:" prop="miscConfigForm.type">
          <el-input v-model="newBoxForm.miscConfigForm.type"></el-input>
        </el-form-item>
        <el-form-item label="Data:" prop="miscConfigForm.data">
          <el-input v-model="newBoxForm.miscConfigForm.data"></el-input>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
    <div style="margin-top: 10px;">
      <el-form-item>
        <el-button type="primary" @click="submitForm('newBoxForm')">Submit</el-button>
        <el-button @click="resetForm('newBoxForm')">Reset</el-button>
      </el-form-item>
    </div>
  </el-form>
   <!-- <el-form :model="newBoxForm" inline :rules="validationRules" ref="newBoxForm" label-width="10rem" class="demo-form-inline">

        <el-form-item label="Name:" prop="miscConfigForm.name">
          <el-input v-model="newBoxForm.miscConfigForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Slack Channel:" prop="miscConfigForm.slack">
          <el-input v-model="newBoxForm.miscConfigForm.slack"></el-input>
        </el-form-item>
        <el-form-item label="Prepare Callback:" prop="miscConfigForm.prepare">
          <el-input v-model="newBoxForm.miscConfigForm.prepare"></el-input>
        </el-form-item>
        <el-form-item label="Stop Callback:" prop="miscConfigForm.stop">
          <el-input v-model="newBoxForm.miscConfigForm.stop"></el-input>
        </el-form-item>
        <el-form-item label="DestoryTidbCluster:" prop="miscConfigForm.destory_tidb_cluster">
          <el-radio border v-model="newBoxForm.miscConfigForm.destory_tidb_cluster" :label=true>Yes</el-radio>
          <el-radio border v-model="newBoxForm.miscConfigForm.destory_tidb_cluster" :label=false>No</el-radio>
        </el-form-item>
        <el-form-item label="Type:" prop="miscConfigForm.type">
          <el-input v-model="newBoxForm.miscConfigForm.type"></el-input>
        </el-form-item>
        <el-form-item label="Data:" prop="miscConfigForm.data">
          <el-input v-model="newBoxForm.miscConfigForm.data"></el-input>
        </el-form-item>
        <el-form-item label="PD Verion:" prop="catForm.pd_ver">
          <el-input v-model="newBoxForm.catForm.pd_ver"></el-input>
        </el-form-item>
        <el-form-item label="TiKV Verion:" prop="catForm.tikv_ver">
          <el-input v-model="newBoxForm.catForm.tikv_ver"></el-input>
        </el-form-item>
        <el-form-item label="TiDB Verion" prop="catForm.tidb_ver">
          <el-input v-model="newBoxForm.catForm.tidb_ver"></el-input>
        </el-form-item>
        <el-form-item label="PD Size:" prop="catForm.pd_size">
          <el-input v-model.number="newBoxForm.catForm.pd_size"></el-input>
        </el-form-item>
        <el-form-item label="TiDB Size:" prop="catForm.tidb_size">
          <el-input v-model.number="newBoxForm.catForm.tidb_size"></el-input>
        </el-form-item>
        <el-form-item label="Tikv Size:" prop="catForm.tikv_size">
          <el-input v-model.number="newBoxForm.catForm.tikv_size"></el-input>
        </el-form-item>
        <el-form-item label="Config Map:" prop="catForm.config_map">
          <el-input v-model="newBoxForm.catForm.config_map"></el-input>
        </el-form-item>
        <el-form-item label="Execution method" prop="testForm.in_order">
            <el-radio v-model="newBoxForm.testForm.in_order" :label=true>Serial execution</el-radio>
            <el-radio v-model="newBoxForm.testForm.in_order" :label=false>Parallel execution</el-radio>
        </el-form-item>
        <div style="position: relative; margin-top: 20px">
          <el-form-item label="Tests: " prop="testForm.tests">
              <el-select v-model="newBoxForm.testForm.tests" multiple placeholder="Please select test" style="width: 33rem;">
                <el-option v-for="(item, index) in testTemplateList" :key="index" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
        </div>
        <el-row>
          <el-col :span="2" :offset="2"><Strong>Type</Strong></el-col>
          <el-col :span="4" :offset="1"><Strong>Value</Strong></el-col>
        </el-row>
        <el-form-item v-for="(rule, index) in newBoxForm.ruleForm" label-width="7rem" :key="rule.key" :label="'Rule ' + index"
                      :prop="'ruleForm.' + index + '.type'">
          <el-row>
            <el-col :span="22">
               <el-input v-model="rule.value" class="input-with-select">
                <el-select v-model="rule.type" style="width: 150px" slot="prepend" placeholder="Select Type">
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
        <el-row>
          <el-col :span="1" :offset="1">
            <Button type="dashed" @click="handleAdd()" icon="plus-round">Add rule</Button>
          </el-col>
        </el-row>
    <div style="margin-top: 10px;">
      <el-form-item>
        <el-button type="primary" @click="submitForm('newBoxForm')">Submit</el-button>
        <el-button @click="resetForm('newBoxForm')">Reset</el-button>
      </el-form-item>
    </div>
  </el-form> -->
</div>
</template>

<script>
import ajax from '../request/index'
export default {
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
          type: '',
          data: ''
        },
        catForm: {
          chooseCreatedCats: true,
          cat:'',
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
        'miscConfigForm.name' :[{required: true, validator: checkString, trigger: 'blur'}],
        // 'miscConfigForm.slack':[{required: true, validator: checkString, trigger: 'blur'}],
        // 'miscConfigForm.prepare':[{required: true, validator: checkArrayEmpty, trigger: 'blur'}],
        // 'miscConfigForm.stop':[{required: true, validator: checkArrayEmpty, trigger: 'blur'}],
        // 'miscConfigForm.destory_tidb_cluster':[{required: true, validator: checkEmpty, trigger: 'change'}],
        // 'miscConfigForm.type':[{required: true, validator: checkString, trigger: 'blur'}],
        // 'catForm.pd_ver': [{required: true, validator: checkString, trigger: 'blur'}],
        // 'catForm.tikv_ver': [{required: true, validator: checkString, trigger: 'blur'}],
        // 'catForm.tidb_ver': [{required: true, validator: checkString, trigger: 'blur'}],
        // 'catForm.pd_size': [{ required: true, message: 'Cannot be empty'}, { type: 'number', message: 'Must be number'}],
        // 'catForm.tikv_size': [{ required: true, message: 'Cannot be empty'}, { type: 'number', message: 'Must be number'}],
        // 'catForm.tidb_size': [{ required: true, message: 'Cannot be empty'}, { type: 'number', message: 'Must be number'}],
        // 'catForm.config_map': [{required: true, validator: checkString, trigger: 'blur'}],
        // 'testForm.tests':[{required: true, validator: checkArrayEmpty, trigger: 'change'}],
        // 'ruleForm.type': [{required: true, validator: checkString, trigger: 'blur'}],
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
          console.log('form is valid!')
          ajax.createBox({
            name: this.newBoxForm.miscConfigForm.name,
            cat: {
              chooseCreatedCats: this.newBoxForm.catForm.chooseCreatedCats,
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
              type: this.newBoxForm.miscConfigForm.type,
              data: this.newBoxForm.miscConfigForm.data
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
  .cat .el-select .el-input {
    width: 400px;
  }

  .test .el-select .el-input {
    width: 400px;
  }
</style>

