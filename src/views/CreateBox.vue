<template>
<div>
  <el-form :model="newBoxForm" inline :rules="validationRules" ref="newBoxForm" label-width="10rem" class="demo-form-inline">
    <el-collapse v-model="activeName">
      <el-collapse-item title="Misc Config" name="misConfig">
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
          <el-input v-model="newBoxForm.miscConfigForm.destory_tidb_cluster"></el-input>
        </el-form-item>
        <el-form-item label="Type:" prop="miscConfigForm.type">
          <el-input v-model="newBoxForm.miscConfigForm.type"></el-input>
        </el-form-item>
        <el-form-item label="Data:" prop="miscConfigForm.data">
          <el-input v-model="newBoxForm.miscConfigForm.data"></el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="CAT">
        <el-form-item label="Pdver:" prop="catForm.pdVer">
          <el-input v-model="newBoxForm.catForm.pdVer"></el-input>
        </el-form-item>
        <el-form-item label="TikvVer:" prop="catForm.tikvVer">
          <el-input v-model="newBoxForm.catForm.tikvVer"></el-input>
        </el-form-item>
        <el-form-item label="TidbVer" prop="catForm.tidbVer">
          <el-input v-model="newBoxForm.catForm.tidbVer"></el-input>
        </el-form-item>
        <el-form-item label="PdSize:" prop="catForm.pdSize">
          <el-input v-model="newBoxForm.catForm.pdSize"></el-input>
        </el-form-item>
        <el-form-item label="TidbSize:" prop="catForm.tidbSize">
          <el-input v-model="newBoxForm.catForm.tidbSize"></el-input>
        </el-form-item>
        <el-form-item label="TikvSize:" prop="catForm.tikvSize">
          <el-input v-model="newBoxForm.catForm.tikvSize"></el-input>
        </el-form-item>
        <el-form-item label="ConfigMap:" prop="catForm.configMap">
          <el-input v-model="newBoxForm.catForm.configMap"></el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="Tests">
        <!-- <el-form :model="testForm" :rules="rules" ref="testForm" label-width="7rem" class="demo-form-inline">
          <el-form-item v-for="(test_item, index) in testForm.testItems" :key="test_item.key" :label="'Test ' + index"
            :prop="'testItems.' + index + '.test'" :rules="{required: true, message: 'Item ' + index +' can not be empty', trigger: 'blur'}">
            <Row>
              <Col span="10">
                <el-select v-model="test_item.test" placeholder="Select Test Template">
                  <el-option v-for="(item, index) in testTemplateList" :key="index" :value="item.name"></el-option>
                </el-select>
              </Col>
              <Col span="4" offset="1">
                <el-button @click.prevent="handleRemove(test_item)">Delete</el-button>
              </Col>
            </Row>
          </el-form-item>
          <el-form-item>
            <Row>
              <Col span="12">
                <Button type="dashed" @click="handleAdd()" icon="plus-round">Add Test</Button>
              </Col>
            </Row>
          </el-form-item>
        </el-form> -->
        <div id="executionMethods">
          <Strong style="margin-right: 20px; font-size: 14px">Execution method:</Strong>
          <el-checkbox v-model="parallelChecked">Parallel execution</el-checkbox>
          <el-checkbox v-model="serialChecked">Serial execution</el-checkbox>
        </div>
        <div style="position: relative; margin-top: 20px">
          <el-form-item label="Tests: " prop="testItems">
              <el-select v-model="newBoxForm.testForm.testItems" multiple placeholder="Please select test" style="width: 33rem;">
                <el-option v-for="(item, index) in testTemplateList" :key="index" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
        </div>
        <div id="testOrder">
          <el-tag v-for="(item, index) in newBoxForm.testForm.testItems" :key="index" type="primary">{{item}}</el-tag>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Rules">
        <Row>
          <Col span="2" offset="2"><Strong>Type</Strong></Col>
          <Col span="4" offset="1"><Strong>Value</Strong></Col>
        </Row>
        <el-form-item v-for="(rule, index) in newBoxForm.ruleForm" label-width="7rem" :key="rule.key" :label="'Rule ' + index"
                      :prop="'ruleForm.' + index + '.type'">
          <Row>
            <Col span="6">
               <el-input v-model="rule.type"></el-input>
            </Col>
            <Col span="11" offset="1">
              <el-input v-model="rule.value"></el-input>
            </Col>
            <Col span="1" offset="1">
              <el-button @click.prevent="handleRemove(rule)">Delete</el-button>
            </Col>
          </Row>
          <br>
        </el-form-item>
        <Row>
          <Col span="1" offset="1">
            <Button type="dashed" @click="handleAdd()" icon="plus-round">Add rule</Button>
          </Col>
        </Row>
        <!-- <el-form-item>
          <Row>
            <Col span="12">
              <Button type="dashed" @click="handleAdd()" icon="plus-round">Add rule</Button>
            </Col>
          </Row>
        </el-form-item> -->
        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('newBoxForm')">Submit</el-button>
          <el-button @click="resetForm('newBoxForm')">Reset</el-button>
        </el-form-item> -->
      </el-collapse-item>
    </el-collapse>
  </el-form>
  <div style="margin-top: 10px;">
    <el-button type="primary" @click="submitForm('newBoxForm')">Submit</el-button>
    <el-button @click="resetForm('newBoxForm')">Reset</el-button>
  </div>
</div>
</template>

<script>
import ajax from '../request/index'
export default {
  data() {
    return {
      activeName: 'misConfig',
      parallelChecked: false,
      serialChecked: false,
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
          pdVer: '',
          tikvVer: '',
          tidbVer: '',
          pdSize: '',
          tidbSize: '',
          tikvSize: '',
          configMap: ''
        },
        testForm: {
          in_order: true,
          testItems: []
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

        'testForm.testItems': [{
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
        if (valid) {
          console.log('form is valid!')
          ajax.createBox({
            name: this.newBoxForm.miscConfigForm.name,
            cat: {
              pdVer: this.newBoxForm.catForm.pdVer,
              tikvVer: this.newBoxForm.catForm.tikvVer,
              tidbVer: this.newBoxForm.catForm.tidbVer,
              pdSize: this.newBoxForm.catForm.pdSize,
              tidbSize: this.newBoxForm.catForm.tidbSize,
              tikvSize: this.newBoxForm.catForm.tikvSize,
              configMap: this.newBoxForm.catForm.configMap
            },
            rules: {
              type: this.newBoxForm.miscConfigForm.type,
              value: this.newBoxForm.miscConfigForm.value,
            },
            tests: {
              in_order: this.newBoxForm.catForm.in_order,
              tests: this.newBoxForm.catForm.testItems
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
            this.$notify.error({
              title: "ERROR",
              message: resp.message,
              duration: 0
            })
          })
        } else {
          console.log('Submit Failed');
          return false;
        }
      });
    },

    resetForm(formName) {
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

