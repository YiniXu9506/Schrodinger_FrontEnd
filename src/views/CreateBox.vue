<template>
<div>
  <el-form :model="newBoxForm" inline :rules="validationRules" ref="newBoxForm" label-width="10rem" class="demo-form-inline">
    <el-collapse v-model="activeName">
      <el-collapse-item title="Misc Config" name="miscConfig">
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
          <el-select v-model="newBoxForm.miscConfigForm.destory_tidb_cluster" placeholder="select">
            <el-option label="Yes" value="true"></el-option>
            <el-option label="No" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Type:" prop="miscConfigForm.type">
          <el-input v-model="newBoxForm.miscConfigForm.type"></el-input>
        </el-form-item>
        <el-form-item label="Data:" prop="miscConfigForm.data">
          <el-input v-model="newBoxForm.miscConfigForm.data"></el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="CAT" name="cat">
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
          <el-input v-model="newBoxForm.catForm.pd_size"></el-input>
        </el-form-item>
        <el-form-item label="TiDB Size:" prop="catForm.tidb_size">
          <el-input v-model="newBoxForm.catForm.tidb_size"></el-input>
        </el-form-item>
        <el-form-item label="Tikv Size:" prop="catForm.tikv_size">
          <el-input v-model="newBoxForm.catForm.tikv_size"></el-input>
        </el-form-item>
        <el-form-item label="Config Map:" prop="catForm.config_map">
          <el-input v-model="newBoxForm.catForm.config_map"></el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="Tests" name="tests">
        <div id="executionMethods">
          <el-form-item>
            <Strong style="margin-right: 20px; font-size: 14px">Execution method:</Strong>
              <el-radio v-model="executionChecked" label='serialExecution'>Serial execution</el-radio>
              <el-radio v-model="executionChecked" label='parallelExecution'>Parallel execution</el-radio>
          </el-form-item>
        </div>
        <div style="position: relative; margin-top: 20px">
          <el-form-item label="Tests: " prop="tests">
              <el-select v-model="newBoxForm.testForm.tests" multiple placeholder="Please select test" style="width: 33rem;">
                <el-option v-for="(item, index) in testTemplateList" :key="index" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
        </div>
        <div id="testOrder">
          <el-tag v-for="(item, index) in newBoxForm.testForm.tests" :key="index" type="primary">{{item}}</el-tag>
        </div>
      </el-collapse-item>

      <el-collapse-item title="Rules" name="name">
        <el-row>
          <el-col :span="2" :offset="2"><Strong>Type</Strong></el-col>
          <el-col :span="4" :offset="1"><Strong>Value</Strong></el-col>
        </el-row>
        <el-form-item v-for="(rule, index) in newBoxForm.ruleForm" label-width="7rem" :key="rule.key" :label="'Rule ' + index"
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
      </el-collapse-item>
    </el-collapse>
    <div style="margin-top: 10px;">
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
      if(!Number.isInteger(value)) {
        return callback(new Error('Must be a number'))
      } else {
        callback()
      }
    });

    return {
      activeName: ['misConfig'],
      executionChecked: 'serialExecution',
      testTemplateList: [],
      newBoxForm: {
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
        'miscConfigForm.slack':[{required: true, validator: checkString, trigger: 'blur'}],
        'miscConfigForm.prepare':[{required: true, validator: checkString, trigger: 'blur'}],
        'miscConfigForm.stop':[{required: true, validator: checkString, trigger: 'blur'}],
        'miscConfigForm.destory_tidb_cluster':[{required: true, validator: checkEmpty, trigger: 'change'}],
        'miscConfigForm.type':[{required: true, validator: checkString, trigger: 'blur'}],

        'catForm.pd_ver': [{required: true, validator: checkString, trigger: 'blur'}],
        'catForm.tikv_ver': [{required: true, validator: checkString, trigger: 'blur'}],
        'catForm.tidb_ver': [{required: true, validator: checkString, trigger: 'blur'}],
        'catForm.pd_size': [{required: true, validator: checkNumber, trigger: 'blur'}],
        'catForm.tidb_size': [{required: true, validator: checkNumber, trigger: 'blur'}],
        'catForm.tikv_size': [{required: true, validator: checkNumber, trigger: 'blur'}],
        'catForm.config_map': [{required: true, validator: checkString, trigger: 'blur'}],
        'testFrom.in_order': [{required: true, validator: checkEmpty, trigger: 'blur'}],
        'testForm.tests':[{required: true, validator: checkEmpty, trigger: 'change'}],
        'ruleForm.type': [{required: true, validator: checkString, trigger: 'blur'}],
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
      })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        debugger
        if (valid) {
          console.log('form is valid!')
          ajax.createBox({
            name: this.newBoxForm.miscConfigForm.name,
            cat: {
              pd_ver: this.newBoxForm.catForm.pd_ver,
              tikv_ver: this.newBoxForm.catForm.tikv_ver,
              tidb_ver: this.newBoxForm.catForm.tidb_ver,
              pd_size: this.newBoxForm.catForm.pd_size,
              tidb_size: this.newBoxForm.catForm.tidb_size,
              tikv_size: this.newBoxForm.catForm.tikv_size,
              config_map: this.newBoxForm.catForm.config_map
            },
            rules: {
              type: this.newBoxForm.miscConfigForm.type,
              value: this.newBoxForm.miscConfigForm.value,
            },
            tests: {
              in_order: this.newBoxForm.catForm.in_order,
              tests: this.newBoxForm.catForm.tests
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
            debugger
            console.log('inside catch')
            this.$notify.error({
              title: "ERROR",
              message: resp.message,
              duration: 0
            })
          })
        } else {
          this.activeName = ['miscConfig', 'cat', 'tests', 'name']
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

</style>

