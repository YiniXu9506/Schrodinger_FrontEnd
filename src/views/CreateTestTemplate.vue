<template>
<div>
  <div class="createdTestTemplatePool">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <strong><span style="font-size:15px;">Created Test Template Pool</span></strong>
        <el-button style="float: right;" type="primary" @click="clickCreateTestTemplate">Create Test Template</el-button>
      </div>
      <el-table :data="createdTestTemplateList.list" :header-cell-style="{background: '#ebeef5'}">
        <el-table-column v-for="(item, index) in createdTestTemplateList.prop" :key="index" :label="createdTestTemplateList.label[index]"
        :prop="item">
        </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="clickUpdateTestTemplate(scope.row.name)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

  <div>
    <el-dialog title="Create Test Template" :visible.sync="createTestTemplateDialog">
      <el-form :inline="true" :model="testTemplateForm" :rules="rules" ref="testTemplateForm" label-width="8rem" class="demo-form-inline">
        <el-form-item label="Name:" prop="name">
          <el-input v-model="testTemplateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Creator:" prop="creator">
          <el-input v-model="testTemplateForm.creator"></el-input>
        </el-form-item>
        <el-form-item label="Description:" prop="desc">
          <el-input v-model="testTemplateForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="Args:" prop="args">
          <el-input v-model="testTemplateForm.args"></el-input>
        </el-form-item>
        <div class="sch-source" style="margin-bottom: 15px">
          <big>
            <strong>
              <span>Source: </span>
            </strong>
          </big>
        </div>
        <div class="source">
          <el-form-item label="Binary Name:" prop="source.binary_name">
            <el-input v-model="testTemplateForm.source.binary_name"></el-input>
          </el-form-item>
          <el-form-item label="Source Type:" prop="source.type">
            <el-select v-model="testTemplateForm.source.type" placeholder="select source type" @change='sourceTypeChange'>
              <el-option label="git" value="git"></el-option>
              <el-option label="bin" value="bin"></el-option>
            </el-select>
          </el-form-item>
          <div v-if="testTemplateForm.source.type == 'git'">
            <el-form-item label="Git Repo:" prop="source.git_repo">
              <el-input v-model="testTemplateForm.source.git_repo"></el-input>
            </el-form-item>
            <el-form-item label="Git Value:" required>
              <el-col :span="10">
                <el-form-item prop="source.git_value.git_type">
                  <el-select v-model="testTemplateForm.source.git_value.git_type" placeholder="Select git type">
                    <el-option label="branch" value="branch"></el-option>
                    <el-option label="tag" value="tag"></el-option>
                    <el-option label="hash" value="hash"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item  prop="source.git_value.value">
                  <el-input v-model="testTemplateForm.source.git_value.value" placeholder="Enter git value">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="Image Address" prop="source.image">
              <el-input v-model="testTemplateForm.source.image"></el-input>
            </el-form-item>
          </div>
          <div v-if="testTemplateForm.source.type == 'bin'">
            <el-form-item label="Binary URL:" prop="source.url">
              <el-input v-model="testTemplateForm.source.url"></el-input>
            </el-form-item>
            <el-form-item label="Image Address:" prop="source.image">
              <el-input v-model="testTemplateForm.source.image"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createTestTemplateDialog = false; clearTestTemplateForm()">Cancel</el-button>
        <el-button @click="resetForm('testTemplateForm')">Reset</el-button>
        <el-button v-if="updateTestTemplateDialog == 'true'" type="primary" @click="submitForm('testTemplateForm','update')">Save</el-button>
        <el-button v-else type="primary" @click="submitForm('testTemplateForm', 'new')">Create</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog title="Update Test Template" :visible.sync="updateTestTemplateDialog" @close="handleDialogClosed">
      <el-form :inline="true" :model="testTemplateForm" :rules="rules" ref="testTemplateForm" label-width="9rem" class="demo-form-inline">
        <el-form-item label="Name:" prop="name">
          <el-input v-model="testTemplateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Creator:" prop="creator">
          <el-input v-model="testTemplateForm.creator"></el-input>
        </el-form-item>
        <el-form-item label="Description:" prop="desc">
          <el-input v-model="testTemplateForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="Arg:" prop="args">
          <el-input v-model="testTemplateForm.args"></el-input>
        </el-form-item>
        <div class="sch-source">
          <big>
            <strong>
              <span>Source: </span>
            </strong>
          </big>
        </div>
        <el-form-item label="Binary Name:" prop="source.binary_name">
          <el-input v-model="testTemplateForm.source.binary_name"></el-input>
        </el-form-item>
        <el-form-item label="Source Type:" prop="source.type">
          <el-select v-model="testTemplateForm.source.type" placeholder="select source type" @change='sourceTypeChange'>
            <el-option label="git" value="git"></el-option>
            <el-option label="bin" value="bin"></el-option>
          </el-select>
        </el-form-item>
        <div v-if="testTemplateForm.source.type === 'git'">
          <el-form-item label="Git Repo:" prop="source.git_repo">
            <el-input v-model="testTemplateForm.source.git_repo"></el-input>
          </el-form-item>
          <el-form-item label="Git Value:" prop="source.git_value">
            <el-input v-model="testTemplateForm.source.git_value.value" class="input-with-select">
              <el-select v-model="testTemplateForm.source.git_value.git_type" slot="prepend" placeholder="Select prefix">
                <el-option label="branch" value="branch"></el-option>
                <el-option label="tag" value="tag"></el-option>
                <el-option label="hash" value="hash"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </div>
        <div v-if="testTemplateForm.source.type === 'bin'">
          <el-form-item label="Binary URL:" prop="source.url">
            <el-input v-model="testTemplateForm.source.url"></el-input>
          </el-form-item>
          <el-form-item label="Image Address:" prop="source.image">
            <el-input v-model="testTemplateForm.source.image"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateTestTemplateDialog = false; clearTestTemplateForm()">Cancel</el-button>
        <el-button @click="resetForm('testTemplateForm')">Reset</el-button>
        <el-button @click="submitForm('testTemplateForm','update')">Save</el-button>
      </div>
    </el-dialog> -->
  </div>
</div>
</template>

<script>
import ajax from '../request/index'
import _ from 'lodash'

export default {
  data() {
    var checkEmpty = (rule, value, callback) => {
      // console.log('inside checkempty value and type of value: ', value, typeof(value))
      if(!value) {
        return callback(new Error('Cannot be empty'))
      } else {
        callback()
      }
    }

    var checkString = ((rule, value, callback) => {
      // console.log('inside checkstring, value', value)
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
      gitValuePrefix: '',
      select: '',
      searchContent: '',
      filteredData: [],
      createdTestTemplateList: {
        label: ['ID', 'Name', 'Binary Name'],
        prop: ['id', 'name', 'source.binary_name'],
        list: []
      },
      createdTestTemplateDetail: '',
      createTestTemplateDialog: false,
      updateTestTemplateDialog: false,
      testTemplateForm: {
        name: '',
        creator: '',
        desc: '',
        args: '',
        source: {
          binary_name: '',
          image: '',
          type: '',
          url: '',
          git_value: {
            git_type: '',
            value: ''
          },
          git_repo: ''
        }
      },
      rules: {
        name: [{required: true, validator: checkString, trigger: 'change'}],
        'source.binary_name': [{required: true, validator: checkString, trigger: 'change'}],
        'source.type': [{required: true, validator: checkString, trigger: 'blur'}],
        'source.url': [{required: true, validator: checkString, trigger: 'blur'}],
        // 'source.git_value': [{required: true, validator: checkString, trigger: 'blur'}],
        'source.git_value.git_type': [{required: true, validator: checkString, trigger: 'blur'}],
        'source.git_value.value': [{required: true, validator: checkString, trigger: 'blur'}],
        'source.git_repo': [{required: true, validator: checkString, trigger: 'blur'}]
      }
    }
  },

  created() {
    this.fetchTestTemplates()
  },

  methods: {
    fetchTestTemplates: function() {
      ajax.getTestTemplate().then((result) => {
        if(result.data.data.length == 0) {
          console.log('there is no created test')
          this.createdTestTemplateList.list = []
          return
        } else {
          console.log('hhhhresult.data.data', result.data.data)
          this.createdTestTemplateList.list = result.data.data
          }
      })
    },

    clickCreateTestTemplate: function() {
      console.log('click create test template')
      this.resetForm('testTemplateForm')
      this.createTestTemplateDialog = true
    },

    clickUpdateTestTemplate: function(testTemplateName) {
      this.createTestTemplateDialog = true
      this.updateTestTemplateDialog = true
      ajax.getTestTemplateDetailByName(testTemplateName).then(result => {
        this.createdTestTemplateDetail = result.data.data
        console.log('create Test template: ' , this.createdTestTemplateDetail)
        this.testTemplateForm = {
          name: this.createdTestTemplateDetail.name,
          creator: this.createdTestTemplateDetail.creator,
          desc: this.createdTestTemplateDetail.desc,
          args: this.createdTestTemplateDetail.args,
          source: {
            binary_name: this.createdTestTemplateDetail.source.binary_name,
            type: this.createdTestTemplateDetail.source.type,
            git_repo: this.createdTestTemplateDetail.source.git_repo,
            git_value: {
              git_type: this.createdTestTemplateDetail.source.git_value.git_type,
              value: this.createdTestTemplateDetail.source.git_value.value,
            },
            url: this.createdTestTemplateDetail.source.url,
            image: this.createdTestTemplateDetail.source.image
          }
        }

        console.log('inside click updatetest template: ', this.testTemplateForm)
      }).catch(resp => {
        this.$notify.error({
          title: 'Error',
          message: resp.message
        })
      })

    },

    createTestTemplate: function () {
      console.log('inside createTestTempalte function')
      // debugger
      ajax.createTestTemplate({
        name: this.testTemplateForm.name,
        creator: this.testTemplateForm.creator,
        desc: this.testTemplateForm.desc,
        args: this.testTemplateForm.args,
        source: {
          binary_name: this.testTemplateForm.source.binary_name,
          type: this.testTemplateForm.source.type,
          git_repo: this.testTemplateForm.source.git_repo,
          git_value: {
            git_type: this.testTemplateForm.source.git_value.git_type,
            value: this.testTemplateForm.source.git_value.value,
          },
          url: this.testTemplateForm.source.url,
          image: this.testTemplateForm.source.image
        }
      }).then((result) => {
        // debugger
        console.log('the newest created testtempalteform is ', this.testTemplateForm)
        if (result.data.code != 200) {
          console.log('result.data.code', result.data.code)
          this.$notify.error({
            title: "ERROR",
            message: result.data.message,
            duration: 0
          });
          return
        }
        this.createTestTemplateDialog = false
        this.createdTestTemplateList.list.unshift(this.testTemplateForm)
        // this.createdTestTemplateList.push(this.testTemplateForm)
        this.$notify({
          title: "SUCCESS",
          type: 'success',
          message: 'Create Case Template Success!'
        });
        this.clearTestTemplateForm()
      }).catch((resp) => {
        this.$notify({
          title: "ERROR 2",
          type: 'error',
          message: resp.message,
          duration: 0
        });
      })
    },

    updateTestTemplate: function () {
      console.log('click save')
      // debugger
      ajax.updateTestTemplate (this.createdTestTemplateDetail.name, {
        name: this.testTemplateForm.name,
        creator: this.testTemplateForm.creator,
        desc: this.testTemplateForm.desc,
        args: this.testTemplateForm.args,
        source: {
          binary_name: this.testTemplateForm.source.binary_name,
          type: this.testTemplateForm.source.type,
          git_repo: this.testTemplateForm.source.git_repo,
          git_value: {
            git_type: this.testTemplateForm.source.git_value.git_type,
            value: this.testTemplateForm.source.git_value.value,
          },
          url: this.testTemplateForm.source.url,
          image: this.testTemplateForm.source.image
        }
      }).then((result) => {
        console.log('after update, the testtempalteform: ', this.testTemplateForm)
        if (result.data.code != 200) {
          this.$notify({
            title: "ERROR",
            type: 'error',
            message: result.data.message,
            duration: 0
          });
          return
        }
        this.updateTestTemplateDialog = false;
        // this.updateTestTemplate = false
        this.$notify({
          title: "SUCCESS",
          type: 'success',
          message: 'Update Case Template Success!'
        })
        ajax.getTestTemplate().then((result) => {
          console.log('inside update created testtemplate')
          this.createdTestTemplateList.list = result.data.data;
          // this.filteredData = this.createdTestTemplateList
        }).catch(() => {})
        console.log('after update, the createdTesttemplate list: ', this.createdTestTemplateList.list)
        this.clearTestTemplateForm();
      }).catch((resp) => {
        this.$notify({
          title: "ERROR",
          type: 'error',
          message: resp.message,
          duration: 0
        });
      })
    },

    submitForm: function (formName, type) {
      console.log('submit button clicked')
      this.$refs[formName].validate((valid) => {
        // debugger
        console.log('testestesets')
        if (valid) {
          switch (type) {
            case "new":
              this.createTestTemplate()
              break
            case "update":
              this.updateTestTemplate()
              break
            default:
              alert("Error");
              break;
          }
        } else {
          // debugger
          console.log('error submit!!')
          return false;
        }
      })
    },

    clearTestTemplateForm: function() {
      debugger
      this.testTemplateForm = {
        name: '',
        creator: '',
        desc: '',
        args: '',
        source: {
          binary_name: '',
          image: '',
          type: '',
          url: '',
          git_value: {
            git_type: '',
            value: ''
          },
          git_repo: ''
        }
      }
    },

    resetForm: function(formName) {
      debugger
      if (this.$refs[formName] != null) {
        // this.clearTestTemplateForm()
        this.$refs[formName].resetFields()
        debugger
        // this.$refs[formName].clearValidate()
        console.log('after reset, this template form is', this.testTemplateForm)
      }
    },

    sourceTypeChange: function() {
      if(this.testTemplateForm.source.type == 'git') {
        console.log('bin just now')
        this.testTemplateForm.source.url = ''
        console.log('this.testTemplateForm.source.url ', this.testTemplateForm.source.url)
      } else {
        console.log('git just now')
        this.testTemplateForm.source.git_repo = ''
        this.testTemplateForm.source.git_value.git_type = ''
        this.testTemplateForm.source.git_value.value = ''
        console.log('this.testTemplateForm.source.url ', this.testTemplateForm.source.git_value)
      }
      console.log('handle suorce type change')
    }
  }
}
</script>
<style>
  .createdTestTemplatePool {
    /* display: inline-block; */
    width: auto;
    height: 600px;
    overflow: auto;
  }
  /* .box-card {
    display: inline-block;
    width: auto;
    height: 300px;
    overflow: auto
  } */
  /* .el-form.el-form-item.el-input {
    width: 12px;
  } */
  /* .source .el-select .el-input {
    width: 130px;
  }

  .el-table .cell {
    width: 250px;
  } */
</style>

