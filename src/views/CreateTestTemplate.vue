<template>
<div>
  <div class="createdTestTemplatePool">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <strong><span style="font-size:15px;">Created Test Template Pool</span></strong>
        <el-button style="float: right;" type="primary" @click="clickCreateTestTemplate">Create Test Template</el-button>
      </div>
      <div style="margin-bottom: 20px">
        <el-input placeholder="search created test template"  prefix-icon="el-icon-search" :autofocus='true'
                  v-model="searchContent" @input="handleSearch"></el-input>
      </div>
      <el-popover v-for="(item, index) in filteredData" :key="index" trigger="hover" placement="right" width="150" >
        <Strong>Creator: </Strong> {{item.creator}} <br>
        <Strong>Status: </Strong> {{item.status}} <br>
        <Strong>Type: </Strong> {{item.type}} <br>
        <!-- <Strong>Git Repo: </Strong> {{item.source.git_repo}}
        <Strong>Image: </Strong> {{item.source.image}} -->
        <el-button style="margin-left: 20px; margin-bottom: 20px" slot="reference" @dblclick.native="clickUpdateTestTemplate(item.name)">
            {{item.name}}
        </el-button>
      </el-popover>
    </el-card>
  </div>
  <div>
    <el-dialog title="Create Test Template" :visible.sync="createTestTemplateDialog">
      <el-form :inline="true" :model="testTemplateForm" :rules="rules" ref="testTemplateForm" label-width="9rem" class="demo-form-inline">
        <el-form-item label="Name:" prop="name">
          <el-input v-model="testTemplateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Type:" prop="type">
          <el-select v-model="testTemplateForm.type" placeholder="select type">
            <el-option label="test case" value="test case"></el-option>
            <el-option label="auxiliary tool" value="auxiliary tool"></el-option>
          </el-select>
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
          <el-select v-model="testTemplateForm.source.type" placeholder="select source type">
            <el-option label="git" value="git"></el-option>
            <el-option label="bin" value="bin"></el-option>
            <el-option label="docker" value="docker"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="testTemplateForm.source.type === 'git'" label="Git Repo:" prop="source.git_repo">
          <el-input v-model="testTemplateForm.source.git_repo"></el-input>
        </el-form-item>
        <el-form-item v-if="testTemplateForm.source.type === 'git'" label="Git Value:" prop="source.git_value">
          <el-input v-model="testTemplateForm.source.gitValue" class="input-with-select">
            <el-select v-model="testTemplateForm.source.gitValuePrefix" slot="prepend" placeholder="Select prefix">
              <el-option label="branch" value="branch"></el-option>
              <el-option label="tag" value="tag"></el-option>
              <el-option label="hash" value="hash"></el-option>
            </el-select>
          </el-input>
          <!-- <el-input v-model="testTemplateForm.source.git_value" class="input-with-select">
          </el-input> -->
        </el-form-item>
        <el-form-item v-if="testTemplateForm.source.type === 'bin'" label="Binary URL:" prop="source.url">
          <el-input v-model="testTemplateForm.source.url"></el-input>
        </el-form-item>
        <el-form-item label="Image Address:" prop="source.image">
          <el-input v-model="testTemplateForm.source.image"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createTestTemplateDialog = false; clearTestTemplateForm()">Cancel</el-button>
        <el-button @click="resetForm('testTemplateForm')">Reset</el-button>
        <el-button @click="submitForm('testTemplateForm', 'new')">Create</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Update Test Template" :visible.sync="updateTestTemplateDialog" @close="handleDialogClosed">
      <el-form :inline="true" :model="testTemplateForm" :rules="rules" ref="testTemplateForm" label-width="9rem" class="demo-form-inline">
        <el-form-item label="Name:" prop="name">
          <el-input v-model="testTemplateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Type:" prop="type">
          <el-select v-model="testTemplateForm.type" placeholder="select type">
            <el-option label="test case" value="test case"></el-option>
            <el-option label="auxiliary tool" value="auxiliary tool"></el-option>
          </el-select>
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
          <el-select v-model="testTemplateForm.source.type" placeholder="select source type">
            <el-option label="git" value="git"></el-option>
            <el-option label="bin" value="bin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="testTemplateForm.source.type === 'git'" label="Git Repo:" prop="source.git_repo">
          <el-input v-model="testTemplateForm.source.git_repo"></el-input>
        </el-form-item>
        <el-form-item v-if="testTemplateForm.source.type === 'git'" label="Git Value:" prop="source.git_value">
          <el-input v-model="testTemplateForm.source.git_value"></el-input>
        </el-form-item>
        <el-form-item v-if="testTemplateForm.source.type === 'bin'" label="Binary URL:" prop="source.url">
          <el-input v-model="testTemplateForm.source.url"></el-input>
        </el-form-item>
        <el-form-item label="Image Address:" prop="source.image">
          <el-input v-model="testTemplateForm.source.image"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateTestTemplateDialog = false; clearTestTemplateForm()">Cancel</el-button>
        <el-button @click="resetForm('testTemplateForm')">Reset</el-button>
        <el-button @click="submitForm('testTemplateForm','update')">Save</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import ajax from '../request/index'
import _ from 'lodash'

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
      gitValuePrefix: '',
      select: '',
      searchContent: '',
      filteredData: [],
      createdTestTemplateList: [],
      createdTestTemplateDetail: '',
      createTestTemplateDialog: false,
      updateTestTemplateDialog: false,
      testTemplateForm: {
        name: '',
        creator: '',
        type: '',
        desc: '',
        args: '',
        source: {
          binary_name: '',
          image: '',
          type: '',
          url: '',
          git_value: '',
          gitValue: '',
          gitValuePrefix: '',
          git_repo: ''
        }
      },
      rules: {
        name: [{required: true, validator: checkString, trigger: 'blur'}],
        type: [{required: true, validator: checkString, trigger: 'blur'}],
        // 'args.arvalue': [{required: true, validator: checkString, trigger: 'blur'}],
        'source.binary_name': [{required: true, validator: checkString, trigger: 'blur'}],
        'source.type': [{required: true, validator: checkString, trigger: 'blur'}],
        'source.url': [{required: true, validator: checkString, trigger: 'blur'}],
        'source.git_value': [{required: true, validator: checkString, trigger: 'blur'}],
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
        console.log('hhhhresult.data.data', result.data.data)
        this.createdTestTemplateList = result.data.data
        // const res = _.values(this.createdTestTemplateList)
        // res.forEach(item => {
        //   var i = item
        //   this.createdTestTemplateNames.push(i.name)
        // })
        this.filteredData = this.createdTestTemplateList
        // this.filteredData = this.createdTestTemplateNames
        // console.log('createdTestTemplateNames', this.createdTestTemplateNames)
      })
    },

    clickCreateTestTemplate: function() {
      console.log('click create test template')
      this.clearTestTemplateForm()
      this.resetForm('testTemplateForm')
      this.createTestTemplateDialog = true
    },

    clickUpdateTestTemplate: function(testTemplateName) {
      ajax.getTestTemplateDetailByName(testTemplateName).then(result => {
        this.createdTestTemplateDetail = result.data.data
        console.log('create Test template: ' , this.createdTestTemplateDetail)
        this.testTemplateForm = {
          name: this.createdTestTemplateDetail.name,
          creator: this.createdTestTemplateDetail.creator,
          type: this.createdTestTemplateDetail.type,
          desc: this.createdTestTemplateDetail.desc,
          args: this.createdTestTemplateDetail.args,
          source: {
            binary_name: this.createdTestTemplateDetail.source.binary_name,
            type: this.createdTestTemplateDetail.source.type,
            git_repo: this.createdTestTemplateDetail.source.git_repo,
            git_value: this.createdTestTemplateDetail.source.git_value,
            url: this.createdTestTemplateDetail.source.url,
            image: this.createdTestTemplateDetail.source.image
          }
        }
      }).catch(resp => {
        this.$notify.error({
          title: 'Error',
          message: resp.message
        })
      })
      this.updateTestTemplateDialog = true
    },

    createTestTemplate: function () {
      console.log('inside createTestTempalte function')
      debugger
      ajax.createTestTemplate({
        name: this.testTemplateForm.name,
        creator: this.testTemplateForm.creator,
        type: this.testTemplateForm.type,
        desc: this.testTemplateForm.desc,
        args: this.testTemplateForm.args,
        source: {
          binary_name: this.testTemplateForm.source.binary_name,
          type: this.testTemplateForm.source.type,
          git_repo: this.testTemplateForm.source.git_repo,
          git_value: this.testTemplateForm.source.git_value,
          url: this.testTemplateForm.source.url,
          image: this.testTemplateForm.source.image
        }
      }).then((result) => {
        debugger
        console.log('this testtempalteform gitvalue: ', this.testTemplateForm.git_value)
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
        this.createdTestTemplateList.unshift(this.testTemplateForm)
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
      debugger
      ajax.updateTestTemplate (this.createdTestTemplateDetail.name, {
        name: this.testTemplateForm.name,
        creator: this.testTemplateForm.creator,
        type: this.testTemplateForm.type,
        desc: this.testTemplateForm.desc,
        args: this.testTemplateForm.args,
        source: {
          binary_name: this.testTemplateForm.source.binary_name,
          type: this.testTemplateForm.source.type,
          git_repo: this.testTemplateForm.source.git_repo,
          git_value: this.testTemplateForm.source.git_value,
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
        this.$notify({
          title: "SUCCESS",
          type: 'success',
          message: 'Update Case Template Success!'
        })
        ajax.getTestTemplate().then((result) => {
          console.log('inside update created testtemplate')
          this.createdTestTemplateList = result.data.data;
          this.filteredData = this.createdTestTemplateList
        }).catch(() => {})
        debugger
        console.log('after update, the createdTesttemplate list: ', this.createdTestTemplateList)
        debugger
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
        debugger
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
          debugger
          console.log('error submit!!')
          return false;
        }
      })
    },
    clearTestTemplateForm: function() {
      this.testTemplateForm = {
        name: '',
        creator: '',
        type: '',
        desc: '',
        args: '',
        source: {
          binary_name: '',
          image: '',
          type: '',
          url: '',
          git_value: '',
          git_repo: ''
        }
      }
    },

    resetForm: function(formName) {
      if (this.$refs[formName] != null) {
        this.clearTestTemplateForm()
        this.$refs[formName].resetFields()
        this.$refs[formName].clearValidate()
        console.log('after reset, this template form is', this.testTemplateForm)
      }
    },

    search: function(filter_data, searchName) {
      let res = filter_data

      res = this.createdTestTemplateList.filter((d) => {
        console.log('d is: ', d)
         return (d.name).toLowerCase().indexOf(searchName.toLowerCase()) > -1
      })
      return res
    },

    handleSearch: function() {
      let filter_data = this.filteredData
      this.filteredData = this.search(filter_data, this.searchContent)
      console.log('res is: ', this.filteredData)
    },

    handleDialogClosed: function(done) {
      console.log('hello from closed')
      this.clearTestTemplateForm()
    }
  }
}
</script>
<style>
  .createCaseForm {
    margin-top: 30px;
  }
  .el-form.el-form-item.el-input {
    width: 12px;
  }
  .el-select .el-input {
    width: 130px;
  }
</style>

