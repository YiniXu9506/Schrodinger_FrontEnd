<template>
<div>
  <div class="createdTestTemplatePool">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <strong><span style="font-size:15px;">Created Test Template Pool</span></strong>
        <el-button style="float: right;" type="primary" @click="clickCreateTestTemplate">Create Test Template</el-button>
      </div>
      <el-table :data="createdTestTemplateList.list" :header-cell-style="{background: '#ebeef5'}" height="650"
                :row-key="getRowKeys" :expand-row-keys="expands" @row-click="toggleRowExpansion">
        <el-table-column type="expand">
          <!-- Test Template Details come here -->
          <template slot-scope="props">
            <el-form label-position="left">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="Name">
                  <span>{{props.row.name}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Source Type">
                  <span>{{props.row.source.type}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="Binary Name">
                  <span>{{props.row.source.binary_name}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <template v-if="props.row.source.type == 'git'">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="Git Repo">
                      <span>{{props.row.source.git_repo}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Git Value">
                      <span>{{props.row.source.git_value.git_type}}:{{props.row.source.git_value.value}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
              <template v-else>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="Binary URL">
                      <span>{{props.row.source.url}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
              <template v-if="props.row.source.image != ''">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="Image Address">
                      <span>{{props.row.source.image}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column v-for="(item, index) in createdTestTemplateList.prop" :key="index" :label="createdTestTemplateList.label[index]"
        :prop="item">
        </el-table-column>
        <el-table-column label="Prepare Stage" prop="status"
                      :filters="[{text: 'NEW', value:'NEW'}, {text:'BUILDING', value: 'BUILDING'}, {text: 'ERROR', value: 'ERROR'}, {text: 'DONE', value: 'DONE'}]"
                      :filter-method="filterStatus" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 'ERROR' ? 'danger' : 'primary'">{{scope.row.status}}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="clickUpdateTestTemplate(scope.row.name)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteTestTemplateByName(scope.row.name)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
  <!-- create and update test dialog -->
  <div>
    <el-dialog :visible.sync="createTestTemplateDialog">
      <div slot="title">
        <strong style="font-size: 22px"> Test Template</strong>
        <el-tooltip class="item" effect="dark" placement="top-start">
          <div slot="content">Create new test template for <br> cat testing in the future</div>
          <Icon type="information-circled" style="margin-left: 10px"></Icon>
        </el-tooltip>
      </div>
      <!-- <span><Icon type="information-circled"></Icon></span> -->
      <el-form :model="testTemplateForm" :rules="rules" ref="testTemplateForm" label-width="10rem" :status-icon='true'	class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="Test Name:" prop="name">
              <el-input v-model="testTemplateForm.name" placeholder="Enter test name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item label="Test Creator:" prop="creator">
            <el-input v-model="testTemplateForm.creator" placeholder="Enter test creator"></el-input>
          </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24"> -->
            <el-form-item label="Description:" prop="desc">
              <el-input v-model="testTemplateForm.desc" placeholder="Briefly descripe the purpose of this test"></el-input>
            </el-form-item>
          <!-- </el-col>
        </el-row> -->
        <div class="sch-source" style="margin-bottom: 15px; margin-top: 40px">
          <big>
            <strong>
              <span>Source: </span>
            </strong>
              <span style="font-size: 14px">select an existing binary test file or compile one from git</span>
          </big>
        </div>
        <div class="source">
          <el-row>
            <el-col :span="12">
              <el-form-item label="Source Type:" prop="source.type">
                <el-radio-group v-model="testTemplateForm.source.type" @change="sourceTypeChange">
                  <el-radio label="git">git</el-radio>
                  <el-radio label="bin">bin</el-radio>
                </el-radio-group>
                <!-- <el-select v-model="testTemplateForm.source.type" placeholder="select source type" @change='sourceTypeChange'>
                  <el-option label="git" value="git"></el-option>
                  <el-option label="bin" value="bin"></el-option>
                </el-select> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="13">
              <el-form-item label="Binary Name:" prop="source.binary_name">
                <el-input v-model="testTemplateForm.source.binary_name" placeholder="Enter name of the binary test file"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="testTemplateForm.source.type == 'git'">
            <el-form-item label="Git Repo:" prop="source.git_repo">
              <el-input v-model="testTemplateForm.source.git_repo"></el-input>
            </el-form-item>

            <!-- <el-form-item > -->
              <!-- <el-col :span="8"> -->
                <el-form-item prop="source.git_value.git_type" label="Git Type:" required>
                  <el-radio-group v-model="testTemplateForm.source.git_value.git_type">
                    <el-radio label="branch">branch</el-radio>
                    <el-radio label="tag">tag</el-radio>
                    <el-radio label="hash">hash</el-radio>
                  </el-radio-group>
                  <!-- <el-select v-model="testTemplateForm.source.git_value.git_type" placeholder="Select git type">
                    <el-option label="branch" value="branch"></el-option>
                    <el-option label="tag" value="tag"></el-option>
                    <el-option label="hash" value="hash"></el-option>
                  </el-select> -->
                </el-form-item>
              <!-- </el-col> -->
              <!-- <el-col :span="16"> -->
                <el-form-item v-if="testTemplateForm.source.git_value.git_type == 'branch'" label="Git Value" prop="source.git_value.value" required>
                  <el-input v-model="testTemplateForm.source.git_value.value"></el-input>
                </el-form-item>
                <el-form-item v-if="testTemplateForm.source.git_value.git_type == 'tag'" label="Git Value" prop="source.git_value.value" required>
                  <el-input v-model="testTemplateForm.source.git_value.value" placeholder="Tag of git repo"></el-input>
                </el-form-item>
                <el-form-item v-if="testTemplateForm.source.git_value.git_type == 'hash'" label="Git Value" prop="source.git_value.value" required>
                  <el-input v-model="testTemplateForm.source.git_value.value" placeholder="eg.05b9e47b617b68aeb868bcaec8355961a181581d"></el-input>
                </el-form-item>
              <!-- </el-col> -->
            <!-- </el-form-item> -->
          </div>
          <div v-if="testTemplateForm.source.type == 'bin'">
            <el-form-item label="Binary URL:" prop="source.url">
              <el-input v-model="testTemplateForm.source.url"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="Docker Image" prop="source.image">
              <el-input v-model="testTemplateForm.source.image" placeholder="Enter docker execution image"></el-input>
            </el-form-item>
          <el-form-item label="Args:" prop="args">
            <el-input v-model="testTemplateForm.args" placeholder="Execution arguments"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createTestTemplateDialog = false; clearTestTemplateForm()">Cancel</el-button>
        <el-button @click="resetForm('testTemplateForm')">Reset</el-button>
        <el-button v-if="updateTestTemplateDialog == true" type="primary" @click="submitForm('testTemplateForm','update')">Save</el-button>
        <el-button v-else type="primary" @click="submitForm('testTemplateForm', 'new')">Create</el-button>
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
      stopPolling: false,
      testStatusArray: [],
      preRowId: 0,
      expands: [],
      createdTestTemplateDetail: '',
      createTestTemplateDialog: false,
      updateTestTemplateDialog: false,
      createdTestTemplateList: {
        label: ['ID', 'Name', 'Source Type','Create Time', 'Update Time'],
        prop: ['id', 'name', 'source.type', 'create_time', 'update_time'],
        list: []
      },
      testTemplateForm: {
        name: '',
        creator: '',
        desc: '',
        args: '',
        source: {
          binary_name: '',
          image: '',
          type: 'git',
          url: '',
          git_value: {
            git_type: 'branch',
            value: ''
          },
          git_repo: ''
        }
      },
      rules: {
        name: [{required: true, validator: checkString, trigger: 'blur'}],
        'source.binary_name': [{required: true, validator: checkString, trigger: 'blur'}],
        'source.type': [{required: true, validator: checkString, trigger: 'blur'}],
        'source.url': [{required: true, validator: checkString, trigger: 'blur'}],
        'source.git_value.git_type': [{required: true, validator: checkString, trigger: 'blur'}],
        'source.git_value.value': [{required: true, validator: checkString, trigger: 'blur'}],
        'source.git_repo': [{required: true, validator: checkString, trigger: 'blur'}]
      }
    }
  },

  created() {
    this.fetchTestTemplates()
    this.pollStatus()
  },

  methods: {
    getRowKeys(row) {
      return row.id
    },

    toggleRowExpansion(row) {
      console.log('hello from toggle ', row)
      if(row.id == this.preRowId) {
        this.preRowId = 0
        this.expands = []
        return
      }
      this.preRowId = row.id
      this.expands = []
      this.expands.push(row.id)
      this.$router.push({ name: 'CreateTestTemplate', params: { testid: row.id}})
    },

    pollStatus() {
      console.log('polling status')
      var timeId = setInterval(() => {
        if(this.stopPolling){
          clearInterval(timeId)
          console.log('stop polling status')
        }
        this.fetchTestTemplates()}
      ,10000)
    },

    fetchTestTemplates: function() {
      this.testStatusArray = []
      console.log('inside fetching test tempaltes')
      ajax.getTestTemplate().then((result) => {
        if(result.data.data.length == 0) {
          this.createdTestTemplateList.list = []
          return
        } else {
          this.createdTestTemplateList.list = result.data.data
          console.log('list: ',this.createdTestTemplateList.list)
          var res= _.values(this.createdTestTemplateList.list)
          res.forEach((item, index) => {
            var i = item
            this.testStatusArray.push(i.status)
          })

          console.log('this testStatsus array: ', this.testStatusArray)
          if(!this.testStatusArray.includes('NEW') && !this.testStatusArray.includes('BUILDING')) {
            this.stopPolling = true
          }
        }
      })

    },

    clickCreateTestTemplate: function() {
      this.resetForm('testTemplateForm')
      this.clearTestTemplateForm()
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
      ajax.createTestTemplate(this.testTemplateForm).then((result) => {
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
        this.createdTestTemplateList.list.unshift(result.data.data)
        this.$notify({
          title: "SUCCESS",
          type: 'success',
          message: 'Create Case Template Success!'
        });
        // this.clearTestTemplateForm()
        this.resetForm('testTemplateForm')
        this.clearTestTemplateForm()
        this.fetchTestTemplates()
        this.pollStatus()
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
        this.updateTestTemplateDialog = false
        this.createTestTemplateDialog = false
        this.resetForm('testTemplateForm')
        this.clearTestTemplateForm()
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
        // this.clearTestTemplateForm();
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

    deleteTestTemplateByName(testName) {
      this.$confirm('Continue to Delete The Test', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type:'warning',
        center: true
      }).then(() => {
        console.log('click delete test, test name is ', testName)
        ajax.deleteTestTemplateByName(testName).then(result => {
          if(result.data.code == 200) {
            this.$notify({
              title: 'Success',
              type: 'success',
              message: 'Delete Test: ' + testName + ' Success'
            })
          } else {
            this.$notify.error({
              title: 'Error',
              message: 'Delete Test: ' + testName + ' Failed',
              duration: 0
            })
          }
          this.fetchTestTemplates()
        }).catch(resp => {
          this.$notify.error({
            title: 'Error',
            message: resp.message,
            duration: 0
          })
        })
      }).catch(() => {
        console.log('click cancel')
        return
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
          type: 'git',
          url: '',
          git_value: {
            git_type: 'branch',
            value: 'master'
          },
          git_repo: ''
        }
      }
    },

    resetForm: function(formName) {
      console.log('inside resetform')
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
    },

    filterStatus(value, row) {
      return row.status === value
    }
  }
}
</script>
<style>
  .createdTestTemplatePool {
    /* display: inline-block; */
    width: auto;
    /* height: 600px; */
    overflow: auto;
  }
  .box-card .el-form-item__label {
    text-align: right;
    /* font-weight: bold; */
    float: left;
    font-size: 14px;
    /* color: black; */
    color: #99a9bf;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .el-table__column-filter-trigger i {
    color: black;
    font-size: 20px;
    -webkit-transform: scale(.75);
    transform: scale(.75);
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

