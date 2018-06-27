<template>
<div>
  <el-collapse v-model="activeName">
    <el-collapse-item title="Misc Config">
      <el-form :inline="true" :model="miscConfigForm" :rules="rules" ref="miscConfigForm" label-width="13rem" class="demo-form-inline">
        <el-form-item label="Name:" prop="name">
          <el-input v-model="miscConfigForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Slack Channel:" prop="slackChannel">
          <el-input v-model="miscConfigForm.slackChannel"></el-input>
        </el-form-item>
        <el-form-item label="Prepare Callback:" prop="prepare">
          <el-input v-model="miscConfigForm.prepare"></el-input>
        </el-form-item>
        <el-form-item label="Stop Callback:" prop="stop">
          <el-input v-model="miscConfigForm.stop"></el-input>
        </el-form-item>
        <el-form-item label="DestoryTidbCluster:" prop="destory_tidb_cluster">
          <el-input v-model="miscConfigForm.destory_tidb_cluster"></el-input>
        </el-form-item>
        <el-form-item label="Type:" prop="type">
          <el-input v-model="miscConfigForm.type"></el-input>
        </el-form-item>
        <el-form-item label="Data:" prop="data">
          <el-input v-model="miscConfigForm.data"></el-input>
        </el-form-item>
      </el-form>
    </el-collapse-item>
    <el-collapse-item title="CAT">
      <el-form :inline="true" :model="catForm" :rules="rules" ref="catForm" label-width="13rem" class="demo-form-inline">
        <el-form-item label="Pdver:" prop="pdver">
          <el-input v-model="catForm.pdver"></el-input>
        </el-form-item>
        <el-form-item label="TikvVer:" prop="tikvVer">
          <el-input v-model="catForm.tikvVer"></el-input>
        </el-form-item>
        <el-form-item label="TidbVer" prop="tidbVer">
          <el-input v-model="catForm.tidbVer"></el-input>
        </el-form-item>
        <el-form-item label="PdSize:" prop="pdSize">
          <el-input v-model="catForm.pdSize"></el-input>
        </el-form-item>
        <el-form-item label="TidbSize:" prop="tidbSize">
          <el-input v-model="catForm.tidbSize"></el-input>
        </el-form-item>
        <el-form-item label="TikvSize:" prop="tikvSize">
          <el-input v-model="catForm.tikvSize"></el-input>
        </el-form-item>
        <el-form-item label="ConfigMap:" prop="configMap">
          <el-input v-model="catForm.configMap"></el-input>
        </el-form-item>
      </el-form>
    </el-collapse-item>
    <el-collapse-item title="Tests">
      <el-form :model="testForm" :rules="rules" ref="testForm" label-width="7rem" class="demo-form-inline">
        <el-form-item v-for="(item, index) in testForm.items" :key="index" :label="'Test ' + item.index"
        :prop="'items.' + index + '.value'" :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
          <Row>
            <Col span="10">
              <Select v-model="testTemplateNames" placeholder="Select Test Template">
                <Option v-for="(item, i) in testTemplateNames" :key="i" :value="item.value">{{item}}</Option>
              </Select>
            </Col>
            <Col span="4" offset="1">
              <Button @click="handleRemove(index)">Delete</Button>
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
      </el-form>
    </el-collapse-item>
    <el-collapse-item title="Rules">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="13rem" class="demo-el-form-inline">
        <el-form-item label="Type:" prop="type">
          <el-input v-model="ruleForm.pdver"></el-input>
        </el-form-item>
        <el-form-item label="Value:" prop="value">
          <el-input v-model="ruleForm.tikvVer"></el-input>
        </el-form-item>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<script>
import ajax from '../request/index'
export default {
  data() {
    return {
      activeName: '1',
      // index: 1,
      testTemplateList: [],
      testTemplateNames:[{
        value: '',
        label: '',
      }],
      selectedTest: [],
      miscConfigForm: {
        name: '',
        slackChannel: '',
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
        items: [{
          value: ''
        }]
      },

      ruleForm: {
        type: '',
        value: ''
      },

      rules: {

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
        this.testTemplateList = result.data.data
        const res = _.values(this.testTemplateList)
        res.forEach(item => {
          var i = item
          // console.log("i is", i)
          // debugger
          // this.testTemplateNames.value = i.name
          // this.testTemplateNames.label = i.name

          this.testTemplateNames.value.push(i.name)
          this.testTemplateNames.label.push(i.name)
        })
        console.log(this.testTemplateNames)
      })
    },

    handleAdd() {
      this.testForm.items.push({
        value: '',
      })
    },

    handleRemove(index) {
      // this.index--
      const i = index
      this.testForm.items.splice(i, 1)
    }
  }
}
</script>
<style>

</style>

