<template>
<div>
  <div class="createdTestTemplatePool">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <strong><span style="font-size:15px;">Created Test Template Pool</span></strong>
        <el-button style="float: right;" type="primary" @click="clickCreateTestTemplate()">Create Test Template</el-button>
      </div>
      <div style="margin-bottom: 20px">
        <el-input placeholder="search created test template" v-model='searchContent' @change="handleSearch">
          <el-button slot="prepend" icon="search"></el-button>
        </el-input>
      </div>
      <el-popover v-for="(item, index) in createdTestTemplateNames" :key="index" trigger="hover" content="this is content" placement="right" width="150" >
        <el-button style="margin-left: 20px; margin-bottom: 20px" slot="reference" @dblclick.native="clickUpdateTestTemplate(item)">
          <!-- <el-tag style="margin-left: 20px; margin-bottom: 20px" slot="reference" :closable="true" :close-transition="false" @dblclick.native="clickUpdateCase()" @close="handleClose(item)"> -->
            {{item}}
          <!-- </el-tag> -->
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
        <el-form-item label="Binary Name:" prop="binary_name">
          <el-input v-model="testTemplateForm.source.binary_name"></el-input>
        </el-form-item>
        <el-form-item label="Source Type:" prop="type">
          <el-select v-model="testTemplateForm.source.type" placeholder="select source type">
            <el-option label="git" value="git"></el-option>
            <el-option label="bin" value="bin"></el-option>
            <el-option label="docker" value="docker"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Git Repo:" prop="git_repo">
          <el-input v-model="testTemplateForm.source.git_repo"></el-input>
        </el-form-item>
        <el-form-item label="Git Value:" prop="git_value">
          <el-input v-model="testTemplateForm.source.git_value"></el-input>
        </el-form-item>
        <el-form-item label="Binary URL:" prop="url">
          <el-input v-model="testTemplateForm.source.url"></el-input>
        </el-form-item>
        <el-form-item label="Image Address:" prop="image">
          <el-input v-model="testTemplateForm.source.image"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createTestTemplateDialog = false; clearTestTemplateForm()">Cancel</el-button>
        <el-button @click="resetForm('testTemplateForm')">Reset</el-button>
        <el-button @click="submitForm('testTemplateForm', 'new')">OK</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Update Test Template" :visible.sync="updateTestTemplateDialog">
      <el-form :inline="true" :model="testTemplateForm" :rules="rules" ref="testTemplateForm" label-width="6rem">
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
        <el-form-item label="Binary Name:" prop="binary_name">
          <el-input v-model="testTemplateForm.source.binary_name"></el-input>
        </el-form-item>
        <el-form-item label="Source Type:" prop="type">
          <el-select v-model="testTemplateForm.source.type" placeholder="select source type">
            <el-option label="git" value="git"></el-option>
            <el-option label="bin" value="bin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Git Repo:" prop="git_repo">
          <el-input v-model="testTemplateForm.source.git_repo"></el-input>
        </el-form-item>
        <el-form-item label="Git Value:" prop="git_value">
          <el-input v-model="testTemplateForm.source.git_value"></el-input>
        </el-form-item>
        <el-form-item label="Binary URL:" prop="url">
          <el-input v-model="testTemplateForm.source.url"></el-input>
        </el-form-item>
        <el-form-item label="Image Address:" prop="image">
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
    return {
      searchContent: '',
      filteredData: '',
      createdTestTemplateNames: [],
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
          git_repo: ''
        }
      },
      rules: {
        name: [{
          required: true,
          message: 'Please input name',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 64,
          message: 'Length should be 1 to 64',
          trigger: 'blur'
        }],
        type: [{
          required: true,
          message: 'Please select type',
          trigger: 'change'
        }],
        desc: [{
          required: true,
          message: 'Please input description',
          trigger: 'blur'
        }],
        creator: [{
          required: true,
          message: 'Please input creator',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 64,
          message: 'Length should be 1 to 64',
          trigger: 'blur'
        }],
        'source.binary_name': [{
          required: true,
          message: 'Please input binary name',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 64,
          message: 'Length should be 1 to 64',
          trigger: 'blur'
        }],
        'source.type': [{
          required: true,
          message: 'Please select source type',
          trigger: 'change'
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
        console.log('result.data.data', result.data.data)
        this.createdTestTemplateList = result.data.data
        const res = _.values(this.createdTestTemplateList)
        res.forEach(item => {
          var i = item
          this.createdTestTemplateNames.push(i.name)
        })
        console.log('createdTestTemplateNames', this.createdTestTemplateNames)
      })
    },

    clickCreateTestTemplate: function() {
      this.clearTestTemplateForm()
      this.resetForm('testTemplateForm')
      this.createTestTemplateDialog = true
    },

    clickUpdateTestTemplate: function(testTemplateName) {
      ajax.getTestTemplateDetailByName(testTemplateName).then((result) => {
        this.createdTestTemplateDetail = result.data.data
        console.log('create Test template: ' , this.createdTestTemplateDetail)
      })
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
      };
      this.updateTestTemplateDialog = true
    },

    createTestTemplate: function () {
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
        console.log('hhhhh result.data.code, ', result.data.code)
        console.log('the test been created: ', this.testTemplateForm)
        console.log('hhhhh result.data.messsage, ', result.data.message)
        if (result.data.code != 200) {
          this.$notify.error({
            title: "ERROR 1",
            message: result.data.message,
            duration: 0
          });
          return
        }
        this.createTestTemplateDialog = false
        this.createdTestTemplateList.unshift(result.data.data)
        this.createdTestTemplateNames.push(this.testTemplateForm.name)
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
      ajax.updateTestTemplate (this.createdTestTemplateDetail.name, {
        id: this.createdTestTemplateDetail.id,
        name: this.createdTestTemplateDetail.name,
        creator: this.createdTestTemplateDetail.creator,
        create_time: this.createdTestTemplateDetail.create_time,
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
      }).then((result) => {
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
        });
        ajax.getTestTemplate().then((result) => {
          this.createdTestTemplateList = result.data.data;
        }).catch(() => {})
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
      this.$refs[formName].validate((valid) => {
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
          console.log('error submit!!')
          return false;
        }
      });
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
        this.$refs[formName].resetFields();
      }
    },

    search: function(data, searchName) {
      console.log('data in search', data)
      console.log('searchName: ', searchName)
    },

    handleSearch: function() {
      this.filteredData = this.createdTestTemplateNames
      console.log('this.filtered data: ', this.filteredData)
      this.filteredData = this.search(this.filteredData, this.searchContent)
    }
    // Display all created cases using tags
    // handleClose(tag) {
    //   this.createdCasesNames.splice(this.createdCasesNames.indexOf(tag), 1)
    // }

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
</style>

