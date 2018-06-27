<template>
<div>
  <div class="createdCasePool">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <strong><span style="font-size:15px;">Created Case Pool</span></strong>
        <el-button style="float: right;" type="primary" @click="clickCreateTestTemplate()">Create New Case</el-button>
      </div>
      <div style="margin-bottom: 20px">
        <el-input placeholder="search created case" >
          <el-button slot="prepend" icon="search"></el-button>
        </el-input>
      </div>
      <el-popover v-for="(item, index) in createdCasesNames" :key="index" trigger="hover" placement="right" width="150" content="this is content">
        <el-button style="margin-left: 20px; margin-bottom: 20px" slot="reference" @dblclick.native="clickUpdateTestTemplate(item)">
          <!-- <el-tag style="margin-left: 20px; margin-bottom: 20px" slot="reference" :closable="true" :close-transition="false" @dblclick.native="clickUpdateCase()" @close="handleClose(item)"> -->
            {{item}}
          <!-- </el-tag> -->
        </el-button>
      </el-popover>
    </el-card>
  </div>
  <div>
    <el-dialog title="Create Case Template" :visible.sync="createCaseDialog">
      <el-form :inline="true" :model="caseForm" :rules="rules" ref="caseForm" label-width="9rem" class="demo-form-inline">
        <el-form-item label="Name:" prop="name">
          <el-input v-model="caseForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Type:" prop="type">
          <el-select v-model="caseForm.type" placeholder="select type">
            <el-option label="test case" value="test case"></el-option>
            <el-option label="auxiliary tool" value="auxiliary tool"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Creator:" prop="creator">
          <el-input v-model="caseForm.creator"></el-input>
        </el-form-item>
        <el-form-item label="Description:" prop="desc">
          <el-input v-model="caseForm.desc"></el-input>
        </el-form-item>
        <div class="sch-source">
          <big>
            <strong>
              <span>Source: </span>
            </strong>
          </big>
        </div>
        <el-form-item label="Binary Name:" prop="binary_name">
          <el-input v-model="caseForm.binary_name"></el-input>
        </el-form-item>
        <el-form-item label="Source Type:" prop="source_type">
          <el-select v-model="caseForm.source_type" placeholder="select source type">
            <el-option label="git" value="git"></el-option>
            <el-option label="bin" value="bin"></el-option>
            <el-option label="docker" value="docker"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Git Repo:" prop="git_repo">
          <el-input v-model="caseForm.git_repo"></el-input>
        </el-form-item>
        <el-form-item label="Git Value:" prop="git_value">
          <el-input v-model="caseForm.git_value"></el-input>
        </el-form-item>
        <el-form-item label="Binary URL:" prop="source_url">
          <el-input v-model="caseForm.source_url"></el-input>
        </el-form-item>
        <el-form-item label="Args:" prop="args">
          <el-input v-model="caseForm.args"></el-input>
        </el-form-item>
        <el-form-item label="Image Address:" prop="image">
          <el-input v-model="caseForm.image"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateCaseTemplate = false; clearCaseForm()">Cancel</el-button>
        <el-button @click="resetForm('caseForm')">Reset</el-button>
        <el-button @click="submitForm('caseForm', 'new')">OK</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Update Case Template" :visible.sync="updateCaseDialog">
      <el-form :inline="true" :model="caseForm" :rules="rules" ref="caseForm" label-width="6rem">
        <el-form-item label="Name:" prop="name">
          <el-input v-model="caseForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Type:" prop="type">
          <el-select v-model="caseForm.type" placeholder="select type">
            <el-option label="test case" value="test case"></el-option>
            <el-option label="auxiliary tool" value="auxiliary tool"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Creator:" prop="creator">
          <el-input v-model="caseForm.creator"></el-input>
        </el-form-item>
        <el-form-item label="Description:" prop="desc">
          <el-input v-model="caseForm.desc"></el-input>
        </el-form-item>
        <div class="sch-source">
          <big>
            <strong>
              <span>Source: </span>
            </strong>
          </big>
        </div>
        <el-form-item label="Binary Name:" prop="binary_name">
          <el-input v-model="caseForm.binary_name"></el-input>
        </el-form-item>
        <el-form-item label="Source Type:" prop="source_type">
          <el-select v-model="caseForm.source_type" placeholder="select source type">
            <el-option label="git" value="git"></el-option>
            <el-option label="bin" value="bin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Git Repo:" prop="git_repo">
          <el-input v-model="caseForm.git_repo"></el-input>
        </el-form-item>
        <el-form-item label="Git Value:" prop="git_value">
          <el-input v-model="caseForm.git_value"></el-input>
        </el-form-item>
        <el-form-item label="Binary URL:" prop="source_url">
          <el-input v-model="caseForm.source_url"></el-input>
        </el-form-item>
        <el-form-item label="Arg:" prop="args">
          <el-input v-model="caseForm.args"></el-input>
        </el-form-item>
        <el-form-item label="Image Address:" prop="image">
          <el-input v-model="caseForm.image"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateCaseTemplate = false; clearCaseForm()">Cancel</el-button>
        <el-button @click="resetForm('caseForm')">Reset</el-button>
        <el-button @click="submitForm('caseForm','update')">Save</el-button>
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
      createdCasesNames: [],
      createdCasesList: [],
      createdCaseDetail: '',
      createCaseDialog: false,
      updateCaseDialog: false,
      caseForm: {
        name: '',
        creator: '',
        type: '',
        desc: '',
        binary_name: '',
        source_type: '',
        source_url: '',
        git_repo: '',
        git_value: '',
        args: '',
        image: ''
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
        binary_name: [{
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
        source_type: [{
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
        console.log(result.data.data)
        this.createdCasesList = result.data.data
        const res = _.values(this.createdCasesList)
        res.forEach(item => {
          var i = item
          this.createdCasesNames.push(i.name)
        })
        console.log(this.createdCasesNames)
      })
    },

    clickCreateTestTemplate: function() {
      this.clearCaseForm()
      this.resetForm('caseForm')
      this.createCaseDialog = true
    },

    clickUpdateTestTemplate: function(testTemplateName) {
      ajax.getTestTemplateDetailByName(testTemplateName).then((result) => {
        this.createdCaseDetail = result.data.data
      })
      console.log('createdCase detial, ', this.createdCaseDetail)
      this.caseForm = {
        name: this.createdCaseDetail.name,
        creator: this.createdCaseDetail.creator,
        type: this.createdCaseDetail.type,
        desc: this.createdCaseDetail.desc,
        binary_name: this.createdCaseDetail.source.binary_name,
        source_type: this.createdCaseDetail.source.type,
        git_repo: this.createdCaseDetail.source.git_repo,
        git_value: this.createdCaseDetail.source.git_value,
        args: this.createdCaseDetail.args,
        source_url: this.createdCaseDetail.source.url,
        image: this.createdCaseDetail.source.image
      };
      this.updateCaseDialog = true
    },

    createTestTemplate: function () {
      ajax.createTestTemplate({
        name: this.caseForm.name,
        creator: this.caseForm.creator,
        type: this.caseForm.type,
        desc: this.caseForm.desc,
        args: this.caseForm.args,
        source: {
          binary_name: this.caseForm.binary_name,
          type: this.caseForm.source_type,
          git_repo: this.caseForm.git_repo,
          git_value: this.caseForm.git_value,
          url: this.caseForm.source_url,
          image: this.caseForm.image
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
        this.createCaseDialog = false
        this.createdCasesList.unshift(result.data.data)
        this.caseCount = this.createdCasesList.length
        this.createdCasesNames.push(this.caseForm.name)
        this.$notify({
          title: "SUCCESS",
          type: 'success',
          message: 'Create Case Template Success!'
        });
        this.clearCaseForm()
      }).catch((resp) => {
        this.$notify({
          title: "ERROR",
          type: 'error',
          message: resp.message,
          duration: 0
        });
      })
    },

    updateTestTemplate: function () {
      ajax.updateTestTemplate (testTemplateName, {
        id: this.createdCaseDetail.id,
        name: this.caseForm.name,
        creator: this.caseForm.creator,
        create_time: this.createdCaseDetail.create_time,
        type: this.caseForm.type,
        desc: this.caseForm.desc,
        args: this.caseForm.args,
        source: {
          binary_name: this.caseForm.binary_name,
          type: this.caseForm.source_type,
          git_repo: this.caseForm.git_repo,
          git_value: this.caseForm.git_value,
          url: this.caseForm.source_url,
          image: this.caseForm.image
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
        this.updateCaseDialog = false;
        this.$notify({
          title: "SUCCESS",
          type: 'success',
          message: 'Update Case Template Success!'
        });
        ajax.getTestTemplate().then((result) => {
          this.createdCasesList = result.data.data;
          this.caseCount = this.createdCasesList.length;
        }).catch(() => {})
        this.clearCaseForm();
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

    clearCaseForm: function() {
      this.caseForm = {
        name: '',
        creator: '',
        type: '',
        desc: '',
        binary_name: '',
        source_type: '',
        git_repo: '',
        git_value: '',
        args: '',
        source_url: '',
        image: ''
      }
    },

    resetForm: function(formName) {
      if (this.$refs[formName] != null) {
        this.$refs[formName].resetFields();
      }
    },

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

