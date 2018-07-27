<template>
<div>
  <div class="createdCatPool">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <strong><span style="font-size:15px;">Cat Pool</span></strong>
        <el-button style="float: right;" type="primary" @click="clickCreateCat">Create Cat</el-button>
        <!-- <div> -->
          <el-tooltip class="item" effect="dark" content="The format of PD/TiDB/TiKV version means: config_version_value(running_version_value)">
             <!-- <div slot="content">  -->
              <!-- <el-button type="danger" icon="el-icon-info" style="border: none">Click Me</el-button> -->
              <Icon type="information-circled" color="red" style="margin-right: 5px">Click</Icon>
              <el-button>Click Me</el-button>
            <!-- </div> -->
          </el-tooltip>
        <!-- </div> -->
      </div>

      <el-table :data="createdCatList.list" :header-cell-style="{background: '#F9F9F9'}" height="650"
                :row-key="getRowKeys" :expand-row-keys="expands" @row-click="toggleRowExpansion">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="my-table-expand">
              <!-- <el-row>
                <el-col :span="12"> -->
                  <el-form-item label="Cat Name">
                    <span>{{props.row.name}}</span>
                  </el-form-item>
                <!-- </el-col>
                <el-col :span="12"> -->
                  <el-form-item label="Labels">
                    <span>{{props.row.labels}}</span>
                  </el-form-item>
                <!-- </el-col>
              </el-row>
              <el-row> -->
                <!-- <el-col :span="12">
                  <el-form-item label="PD Version">
                    <span>{{props.row.config_version.pd_version.type}}:{{props.row.config_version.pd_version.value}}</span>
                  </el-form-item>
                </el-col> -->
                <!-- <el-col :span="12"> -->


                  <el-form-item label="PD Compile to Platform">
                    <span>{{props.row.config_version.pd_version.platform}}</span>
                  </el-form-item>



                  <!-- </el-col>
              </el-row>
              <el-row>
                <el-col :span="12"> -->
                  <el-form-item label="PD Size">
                    <span>{{props.row.pd}}</span>
                  </el-form-item>
                <!-- </el-col> -->
                <!-- <el-col :span="12">
                  <el-form-item label="TiKV Version">
                    <span>{{props.row.config_version.tikv_version.type}}:{{props.row.config_version.tikv_version.value}}</span>
                  </el-form-item>
                </el-col> -->
              <!-- </el-row>
              <el-row>
                <el-col :span="12"> -->

                  <el-form-item label="TiKV Compile to Platform">
                    <span>{{props.row.config_version.tikv_version.platform}}</span>
                  </el-form-item>


                <!-- </el-col>
                <el-col :span="12"> -->
                  <el-form-item label="TiKV Size">
                    <span>{{props.row.tikv}}</span>
                  </el-form-item>
                <!-- </el-col>
              </el-row>
              <el-row> -->
                <!-- <el-col :span="12">
                  <el-form-item label="TiDB Version">
                    <span>{{props.row.config_version.tidb_version.type}}:{{props.row.config_version.tidb_version.value}}</span>
                  </el-form-item>
                </el-col> -->
                <!-- <el-col :span="12"> -->
                  <el-form-item label="TiDB Compile to Platform">
                    <span>{{props.row.config_version.tidb_version.platform}}</span>
                  </el-form-item>
                <!-- </el-col>
              </el-row>
              <el-row>
                <el-col :span="12"> -->
                  <el-form-item label="TiDB Size">
                    <span>{{props.row.tidb}}</span>
                  </el-form-item>
                <!-- </el-col>
                <el-col :span="12"> -->
                  <el-form-item label="Config Map">
                    <span>{{props.row.config_map}}</span>
                  </el-form-item>
                <!-- </el-col>
              </el-row> -->
            </el-form>
          </template>
          <!-- Cat Details come here -->
        </el-table-column>

        <el-table-column label="Test Name" prop="name">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="Testing in Box" prop="owner" width="100px">
          <template slot-scope="scope">
            <div v-if="scope.row.owner == ''">--</div>
            <div v-else>{{scope.row.owner}}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Running Version"> -->
          <el-table-column label="PD Version" prop="pd_ver">
            <!-- <div> -->
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark">
                  <div v-if="scope.row.run_version == null" slot="content">Waiting for running...</div>
                  <div v-else slot="content">{{scope.row.run_version.pd_version.value}}</div>
                  <div v-if="scope.row.run_version == null">{{scope.row.config_version.pd_version.value}}(...)</div>
                  <div v-else>{{scope.row.config_version.pd_version.value}}({{(scope.row.run_version.pd_version.value).substring(0,7)}}...)</div>
                </el-tooltip>
                <!-- <el-tooltip class="item" effect="dark">
                  <div slot="content">{{scope.row.config_version.pd_version.value}}</div>
                  <div><strong>Config: </strong>{{scope.row.config_version.pd_version.type}}:{{(scope.row.config_version.pd_version.value).substring(0,7)}}</div>
                </el-tooltip> -->
              </template>
            <!-- </div> -->
          </el-table-column>
          <el-table-column label="TiKV Version" prop="tikv_ver">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark">
                <div v-if="scope.row.run_version == null" slot="content">Waiting for running...</div>
                <div v-else slot="content">{{scope.row.run_version.tikv_version.value}}</div>
                <div v-if="scope.row.run_version == null">{{scope.row.config_version.tikv_version.value}}(...)</div>
                <div v-else>{{scope.row.config_version.tikv_version.value}}({{(scope.row.run_version.tikv_version.value).substring(0,7)}}...)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="TiDB Version" prop="tidb_ver">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark">
                <div v-if="scope.row.run_version == null" slot="content">Waiting for running...</div>
                <div v-else slot="content">{{scope.row.run_version.tidb_version.value}}</div>
                <div v-if="scope.row.run_version == null">{{scope.row.config_version.tidb_version.value}}(...)</div>
                <div v-else>{{scope.row.config_version.tidb_version.value}}({{(scope.row.run_version.tidb_version.value).substring(0,7)}}...)</div>
                <!-- <div slot="content">{{scope.row.run_version.tidb_version.value}}</div>
                <div>{{scope.row.config_version.tidb_version.value}}({{(scope.row.run_version.tidb_version.value).substring(0,7)}}...)</div> -->
              </el-tooltip>
            </template>
          </el-table-column>
        <!-- </el-table-column> -->

        <el-table-column label="Stage" prop="stage"
                      :filters="[{text: 'NEW', value:'NEW'}, {text:'CREATING', value: 'CREATING'}, {text: 'UPDATING', value: 'UPDATING'}, {text: 'DESTROYING', value: 'DESTROYING'},{text:'DESTROYED', value:'DESTROYED'}, {text: 'FAILED', value:'FAILED'}]"
                      :filter-method="filterStatus" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.stage === ('FAILED' || 'DESTROYED' || 'DESTROYING') ? 'danger' : 'primary'">{{scope.row.stage}}
            </el-tag>
          </template>
        </el-table-column>

        <!-- <el-table-column label="Stage" prop="stage">
          <template slot-scope="scope">
            {{scope.row.stage}}
          </template>
        </el-table-column> -->
        <el-table-column label="Operation" prop="owner" width="200px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.owner == ''" type="primary" icon="el-icon-edit" circle @click="handleUpdateCatClick(scope.row.id)"></el-button>
            <el-button v-else type="warning" icon="el-icon-edit" circle @click="checkEditRunningCat(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="destoryCat(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

  <!-- create Cat dialog -->
   <el-dialog title="Create Cat" :visible.sync="createCatFormDialog" @close="handleCloseDialog">
     <el-form :model="catForm" :rules="validationRules" ref="catForm" label-width="9rem" class="demo-form-inline">
      <el-form-item label="Cat Name: " prop="name">
        <el-input v-model="catForm.name" style="width: 200px;" placeholder="Enter cat name"></el-input>
      </el-form-item>
      <el-form-item prop="labels">
        <template slot="label">Labels:
          <el-tooltip class="item" effect="dark" content="The purpose of this cat">
            <Icon type="information-circled" style="margin-left: 5px"></Icon>
          </el-tooltip>
        </template>
        <el-input v-model="catForm.labels" style="width: 200px" placeholder="usage == debug"></el-input>
      </el-form-item>

      <el-form-item label="PD Verion:" required>
        <el-col :span="6">
          <el-form-item prop="pd_ver.type">
            <el-select v-model="catForm.pd_ver.type" placeholder="Select type">
              <el-option label="branch" value="branch"></el-option>
              <el-option label="hash" value="hash"></el-option>
              <el-option label="tag" value="tag"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="pd_ver.value">
            <el-input v-if="catForm.pd_ver.type == ''" v-model="catForm.pd_ver.value" class="input-with-select" placeholder="Enter PD version value"></el-input>
            <el-input v-if="catForm.pd_ver.type == 'branch'" v-model="catForm.pd_ver.value" class="input-with-select" placeholder="eg.master or release-1.0"></el-input>
            <el-input v-if="catForm.pd_ver.type == 'hash'" v-model="catForm.pd_ver.value" class="input-with-select" placeholder="Enter hash value"></el-input>
            <el-input v-if="catForm.pd_ver.type == 'tag'" v-model="catForm.pd_ver.value" class="input-with-select" placeholder="Enter tag of git repo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pd_ver.platform">
            <el-select v-model="catForm.pd_ver.platform" placeholder="Compile to platform">
              <el-option label="Centos7" value="centos7"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="PD Size:" prop="pd_size">
        <el-input v-model.number="catForm.pd_size" style="width: 200px;" placeholder="int type only"></el-input>
      </el-form-item>

      <el-form-item label="TiKV Verion:" required>
        <el-col :span="6">
          <el-form-item prop="tikv_ver.type">
            <el-select v-model="catForm.tikv_ver.type" placeholder="Select type">
              <el-option label="branch" value="branch"></el-option>
              <el-option label="hash" value="hash"></el-option>
              <el-option label="tag" value="tag"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="tikv_ver.value">
            <el-input v-if="catForm.tikv_ver.type == ''" v-model="catForm.tikv_ver.value" class="input-with-select" placeholder="Enter PD version value"></el-input>
            <el-input v-if="catForm.tikv_ver.type == 'branch'" v-model="catForm.tikv_ver.value" class="input-with-select" placeholder="eg.master or release-1.0"></el-input>
            <el-input v-if="catForm.tikv_ver.type == 'hash'" v-model="catForm.tikv_ver.value" class="input-with-select" placeholder="Enter hash value"></el-input>
            <el-input v-if="catForm.tikv_ver.type == 'tag'" v-model="catForm.tikv_ver.value" class="input-with-select" placeholder="Enter tag of git repo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="tikv_ver.platform">
            <el-select v-model="catForm.tikv_ver.platform" placeholder="Compile to platform">
              <el-option label="Unportable Centos7" value="unportable_centos7"></el-option>
              <el-option label="Centos7" value="centos7"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="TiKV Size:" prop="tikv_size">
        <el-input v-model.number="catForm.tikv_size" style="width: 200px;" placeholder="int type only"></el-input>
      </el-form-item>

      <el-form-item label="TiDB Verion:" required>
        <el-col :span="6">
          <el-form-item prop="tidb_ver.type">
            <el-select v-model="catForm.tidb_ver.type" placeholder="Select type">
              <el-option label="branch" value="branch"></el-option>
              <el-option label="hash" value="hash"></el-option>
              <el-option label="tag" value="tag"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="tidb_ver.value">
            <el-input v-if="catForm.tidb_ver.type == ''" v-model="catForm.tidb_ver.value" class="input-with-select" placeholder="Enter PD version value"></el-input>
            <el-input v-if="catForm.tidb_ver.type == 'branch'" v-model="catForm.tidb_ver.value" class="input-with-select" placeholder="eg.master or release-1.0"></el-input>
            <el-input v-if="catForm.tidb_ver.type == 'hash'" v-model="catForm.tidb_ver.value" class="input-with-select" placeholder="Enter hash value"></el-input>
            <el-input v-if="catForm.tidb_ver.type == 'tag'" v-model="catForm.tidb_ver.value" class="input-with-select" placeholder="Enter tag of git repo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="tidb_ver.platform">
            <el-select v-model="catForm.tidb_ver.platform" placeholder="Compile to platform">
              <el-option label="Centos7" value="centos7"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="TiDB Size:" prop="tidb_size">
        <el-input v-model.number="catForm.tidb_size" style="width: 200px;" placeholder="int type only"></el-input>
      </el-form-item>

      <el-form-item prop="config_map">
        <template slot="label">Config Map:
          <el-tooltip class="item" effect="dark" content="Generate tidb/tikv/pd config file">
            <Icon type="information-circled" style="margin-left: 5px"></Icon>
          </el-tooltip>
        </template>
        <el-input v-model="catForm.config_map" placeholder="eg.tidb-cluster-config-template"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="createCatFormDialog = false; clearCatForm()">Cancel</el-button>
      <el-button @click="resetForm('catForm')">Reset</el-button>
      <el-button v-if="updateCatFormDialog == true" type="primary" @click="submitUpdateForm('catForm')">Save</el-button>
      <el-button v-else type="primary" @click="submitNewForm('catForm')">Create</el-button>
    </div>
   </el-dialog>
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

    var checkUnique = ((rule, value, callback) => {
      let isExist = this.createdCatNames.includes(value)
      if(isExist) {
        return callback(new Error('The Name already exists, please try another one'))
      } else {
        callback()
      }
    })
    return {
      createCatFormDialog: false,
      updateCatFormDialog: false,
      catDetial: '',
      createdCatNames: [],
      expands: [],
      preRowId: 0,
      createdCatList: {
        label: ['Name'],
        prop: ['name'],
        list: []
      },
      catForm: {
        labels: '',
        name: '',
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
        tikv_size: '',
        tidb_size: '',
        config_map: ''
      },
      validationRules: {
        'name': [{required: true, validator: checkString, trigger: 'change'}, {validator: checkUnique, trigger: 'blur'}],
        'pd_ver.type': [{required: true, validator: checkString, trigger: 'change'}],
        'pd_ver.value': [{required: true, validator: checkString, trigger: 'change'}],
        'pd_ver.platform': [{required: true, validator: checkString, trigger: 'change'}],
        'tikv_ver.type': [{required: true, validator: checkString, trigger: 'change'}],
        'tikv_ver.value': [{required: true, validator: checkString, trigger: 'change'}],
        'tikv_ver.platform': [{required: true, validator: checkString, trigger: 'change'}],
        'tidb_ver.type': [{required: true, validator: checkString, trigger: 'change'}],
        'tidb_ver.value': [{required: true, validator: checkString, trigger: 'change'}],
        'tidb_ver.platform': [{required: true, validator: checkString, trigger: 'change'}],
        'pd_size': [{required: true, validator: checkNumber, trigger:'change'}],
        'tikv_size': [{required: true, validator: checkNumber, trigger:'change'}],
        'tidb_size': [{required: true, validator: checkNumber, trigger:'change'}],
        'config_map': [{required: true, validator: checkString, trigger: 'change'}],
      }
    }
  },

  created() {
    this.fetchCreatedCat()
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
      },

    fetchCreatedCat() {
      console.log('fetching created cats')
      ajax.getCat().then(result => {
        debugger
        if(result.data.data.length == 0) {
          console.log('there is no created cats')
          this.createdCatList.list = []
          return
        } else {
            if(result.data.code == 200) {
              console.log('response successful',result.data.data)
              debugger
              this.createdCatList.list = result.data.data
              console.log('this.createdCatList.list is ', this.createdCatList.list)
              debugger
              this.getCreatedCatNames()
            }
          }
      }).catch(resp => {
          this.$notify.error({
            title: 'Error',
            message: resp.message
          })
        })
    },

    getCreatedCatNames() {
      this.createdCatNames = []
      const res = _.values(this.createdCatList.list)
      res.forEach(item => {
        var i = item
        this.createdCatNames.push(i.name)
      })
      console.log('createdCatNames', this.createdCatNames)
    },

    clickCreateCat() {
      console.log('click create cat')
      debugger
      // this.clearCatForm()
      this.resetForm('catForm')
      debugger
      this.createCatFormDialog = true
    },

    handleUpdateCatClick(catID) {
      console.log('inside handle updatecat click, catID is ', catID)
      this.updateCatFormDialog = true
      this.createCatFormDialog = true
      ajax.getCatDetailByID(catID).then(result =>{
        console.log('getcatdetail success, result.data.data', result.data.data)
        this.catDetial = result.data.data
        this.catForm = {
          labels: this.catDetial.labels,
          name: this.catDetial.name,
          pd_ver: {
            type: this.catDetial.config_version.pd_version.type,
            value: this.catDetial.config_version.pd_version.value,
            platform: this.catDetial.config_version.pd_version.platform
          },
          tikv_ver: {
            type: this.catDetial.config_version.tikv_version.type,
            value: this.catDetial.config_version.tikv_version.value,
            platform: this.catDetial.config_version.tikv_version.platform
          },
          tidb_ver: {
            type: this.catDetial.config_version.tidb_version.type,
            value: this.catDetial.config_version.tidb_version.value,
            platform: this.catDetial.config_version.tidb_version.platform
          },
          pd_size: this.catDetial.pd_size,
          tikv_size: this.catDetial.tikv_size,
          tidb_size: this.catDetial.tidb_size,
          config_map: this.catDetial.config_map
        }
        var catName = this.catDetial.name
        var idx = this.createdCatNames.indexOf(catName)
        console.log('this catName is',catName)
        this.createdCatNames.splice(idx, 1)
        console.log('after splice, the created catnames are ', this.createdCatNames)
      }).catch(resp => {
        this.$notify.error({
          title: 'Error in handleUpdateCatClick',
          message: resp.message
        })
      })
    },

    submitNewForm(formName) {
      console.log('click submit')
      this.$refs[formName].validate((valid) => {
        if(valid) {
          console.log('the form is valid')
          ajax.createCat({
            labels: this.catForm.labels,
            name: this.catForm.name,
            pd_ver: {
              type: this.catForm.pd_ver.type,
              value: this.catForm.pd_ver.value,
              platform: this.catForm.pd_ver.platform
            },
            tikv_ver: {
              type: this.catForm.tikv_ver.type,
              value: this.catForm.tikv_ver.value,
              platform: this.catForm.tikv_ver.platform
            },
            tidb_ver: {
              type: this.catForm.tidb_ver.type,
              value: this.catForm.tidb_ver.value,
              platform: this.catForm.tidb_ver.platform
            },
            pd_size: this.catForm.pd_size,
            tikv_size: this.catForm.tikv_size,
            tidb_size: this.catForm.tidb_size,
            config_map: this.catForm.config_map
          }).then(result => {
            console.log('the catform going to create is: ', this.catForm)
            console.log('the resulst inside createCats', result)
            if(result.data.code == 200) {
              this.createCatFormDialog = false
              this.createdCatList.list.unshift(this.catForm)
              debugger
              console.log('the new create cat is: ', this.createdCatList.list)
              this.fetchCreatedCat()
              debugger
              this.$notify({
                title: "SUCCESS",
                type: 'success',
                message: 'Create Case Template Success!'
              });
              this.clearCatForm()
            }
          }).catch((resp) => {
            console.log('inside catch')
            this.$notify.error({
              title: 'Error',
              message: resp.message,
              duration: 0
            })
          })
        }
      })
    },

    submitUpdateForm(formName) {
      console.log('inside submit update form')
      this.$refs[formName].validate((valid) =>{
        if(valid) {
          console.log('the update form is valid')
          ajax.updateCat(this.catDetial.id, {
            labels: this.catForm.labels,
            name: this.catForm.name,
            pd_ver: {
              type: this.catForm.pd_ver.type,
              value: this.catForm.pd_ver.value,
              platform: this.catForm.pd_ver.platform
            },
            tikv_ver: {
              type: this.catForm.tikv_ver.type,
              value: this.catForm.tikv_ver.value,
              platform: this.catForm.tikv_ver.platform
            },
            tidb_ver: {
              type: this.catForm.tidb_ver.type,
              value: this.catForm.tidb_ver.value,
              platform: this.catForm.tidb_ver.platform
            },
            pd_size: this.catForm.pd_size,
            tikv_size: this.catForm.tikv_size,
            tidb_size: this.catForm.tidb_size,
            config_map: this.catForm.config_map
          }).then(result =>{
            if(result.data.code == 200) {
              this.$notify({
                title: 'Success',
                message: 'Update Cat' + this.catDetial.name + 'Success'
              })
              this.getCreatedCatNames()
              debugger
              this.clearCatForm()
              debugger
              this.updateCatFormDialog = false
              this.createCatFormDialog = false

            } else {
              this.$notify.error({
                title: 'Error',
                message: 'Update Cat Failed'
              })
            }
          }).catch(resp => {
            this.$notify.error({
              title: 'Error in submitUpdateForm catch',
              message: resp.message
            })
          })
        } else {
          console.log('this form is invalid')
        }
      })
    },

    destoryCat(catID) {
      console.log('destory cat clicked')
      ajax.destroyCat(catID).then(result => {
        if(result.data.code == 200) {
          this.$notify({
            title: 'Success',
            type: 'success',
            message: 'Destroy Cat ' + catID + ' Success',
          })
        } else {
          this.$notify.error({
            title: 'Error',
            message: 'Destroy Cat '+ catID + ' Failed',
            duration: 0
          })
        }
        this.fetchCreatedCat()
      }).catch(resp => {
        this.$notify.error({
          title: 'Error',
          message: resp.message,
          duration: 0
        })
      })
    },

    clearCatForm: function() {
      console.log('inside clear cat form')
      console.log('this.createdCatList.list ', this.createdCatList.list)
      console.log('this.createdcatnames ', this.createdCatNames)
      debugger
      this.catForm = {
        labels: '',
        name: '',
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
        tikv_size: '',
        tidb_size: '',
        config_map: ''
      }
    },

    checkEditRunningCat: function(catID) {
      this.$confirm('This Cat is occupied, continue to edit?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type:'warning',
        center: true
      }).then(() => {
        console.log('click yes')
        this.handleUpdateCatClick(catID)
      }).catch(() => {
        console.log('click cancel')
        return
      })

    },

    resetForm: function(formName) {
      console.log('inside resetform, the cat form is :', this.catForm)
      if (this.$refs[formName] != null) {
        console.log('AGAIN!! inside resetform, the cat form is :', this.catForm)
        debugger
        console.log('this cat list inside restForm: ', this.createdCatList)
        console.log('this.catform is ', this.catForm)
        // this.clearCatForm()
        this.$refs[formName].resetFields()
        console.log('this catform after resestfield ', this.catForm)
        console.log('this cat list inside restForm: ', this.createdCatList)
      }
    },
    handleCloseDialog() {
      console.log('inside handle close click')
      console.log('the catform is ', this.catForm)
      this.getCreatedCatNames()
    },

    // addInfoIcon(h, {column, $index}) {
    //   console.log(h, column)
    // },

    filterStatus(value, row) {
      return row.stage === value
    }
  }
}
</script>
<style>
  .createCaseForm {
    margin-top: 30px;
  }
  /* .el-form.el-form-item.el-input {
    width: 12px;
  } */

  /* .my-table-expand {
    font-size: 0;
  } */

  .my-table-expand label {
    color: #99a9bf;
  }
  .my-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  /* .el-select .el-input {
    width: 130px;
  } */
  /* .el-table .cell {
    width: 270px;
  } */
.item {
  margin: 4px;
}

.box-card{
  height: 100%;
  overflow-x: auto
}

.el-table th>.cell {
  text-align: center;
  font-size: 13px;
}
.el-table td div{
  text-align: center
}
.item {
  margin: 4px;
}

/* .box-card .el-form-item__label {
    text-align: right;
    float: left;
    font-size: 14px;
    color: #99a9bf;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  } */

  .el-table__column-filter-trigger i {
    color: black;
    font-size: 20px;
    -webkit-transform: scale(.75);
    transform: scale(.75);
  }
</style>

