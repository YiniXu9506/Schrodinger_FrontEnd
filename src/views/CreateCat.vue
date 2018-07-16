<template>
<div>
  <div class="createdTestTemplatePool">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <strong><span style="font-size:15px;">Created Cat Pool</span></strong>
        <el-button style="float: right;" type="primary" @click="clickCreateCat">Create Cat</el-button>
      </div>

    </el-card>
  </div>

   <el-dialog title="Create Cat" :visible.sync="createCatFormDialog">
     <el-form :model="catForm" inline :rules="validationRules" ref="catForm" label-width="10rem" class="demo-form-inline">
       <el-form-item label="PD Verion:" prop="pd_ver">
          <el-input v-model="catForm.pd_ver.value" class="input-with-select" placeholder="Enter PD version value" width="200px">
            <el-select v-model="catForm.pd_ver.type" slot="prepend" style="width: 130px" placeholder="Select type">
              <el-option label="branch" value="branch"></el-option>
              <el-option label="hash" value="hash"></el-option>
              <el-option label="tag" value="tag"></el-option>
            </el-select>
            <el-select v-model="catForm.pd_ver.platform" slot="append" style="width: 200px" placeholder="Compile to platform">
              <el-option label="Centos7" value="centos7"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="TiKV Verion:" prop="tikv_ver">
          <el-input v-model="catForm.tikv_ver.value" class="input-with-select" placeholder="Enter TiKV version value">
            <el-select v-model="catForm.tikv_ver.type" slot="prepend" style="width: 130px" placeholder="Select type">
              <el-option label="branch" value="branch"></el-option>
              <el-option label="hash" value="hash"></el-option>
              <el-option label="tag" value="tag"></el-option>
            </el-select>
            <el-select v-model="catForm.tikv_ver.platform" slot="append" style="width: 200px" placeholder="Compile to platform">
              <el-option label="Unportable Centos7" value="unportable_centos7"></el-option>
              <el-option label="Centos7" value="centos7"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="TiDB Verion:" prop="tidb_ver">
          <el-input v-model="catForm.tidb_ver.value" class="input-with-select" placeholder="Enter TiDB version value">
            <el-select v-model="catForm.tidb_ver.type" slot="prepend" style="width: 130px" placeholder="Select type">
              <el-option label="branch" value="branch"></el-option>
              <el-option label="hash" value="hash"></el-option>
              <el-option label="tag" value="tag"></el-option>
            </el-select>
            <el-select v-model="catForm.tidb_ver.platform" slot="append" style="width: 200px" placeholder="Compile to platform">
              <el-option label="Centos7" value="centos7"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="PD Size:" prop="pd_size">
          <el-input v-model.number="catForm.pd_size"></el-input>
        </el-form-item>
        <el-form-item label="TiDB Size:" prop="tidb_size">
          <el-input v-model.number="catForm.tidb_size"></el-input>
        </el-form-item>
        <el-form-item label="Tikv Size:" prop="tikv_size">
          <el-input v-model.number="catForm.tikv_size"></el-input>
        </el-form-item>
        <el-form-item label="Config Map:" prop="config_map">
          <el-input v-model="catForm.config_map"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('catForm')">Submit</el-button>
          <el-button @click="resetForm('catForm')">Reset</el-button>
        </el-form-item>
     </el-form>
   </el-dialog>
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
    })

    var checkNumber = ((rule, value, callback) => {
      if(!Number.isInteger(value)) {
        return callback(new Error('Must be a number'))
      } else {
        callback()
      }
    })

    var checkUnique = ((value, callback) => {
      let isExist = this.createdCatNames.includes(value)
      if(isExist) {
        return callback(new Error('The Cat Name is already exist, please enter another one'))
      } else {
        callback()
      }
    })
    return {
      createCatFormDialog: false,
      createdCatList: {},
      createdCatNames: [],
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
        'labels': [{required: true, validator: checkString, trigger: 'blur'}],
        'name': [{required: true, validator: checkString, trigger: 'blur'}, {validator: checkUnique, trigger: 'blur'}],
        'pd_ver.value': [{required: true, validator: checkString, trigger: 'blur'}],
        'tikv_ver.value': [{required: true, validator: checkString, trigger: 'blur'}],
        'tidb_ver.value': [{required: true, validator: checkString, trigger: 'blur'}],
        'pd_size': [{ required: true, message: 'Cannot be empty'}, { type: 'number', message: 'Must be number'}],
        'tikv_size': [{ required: true, message: 'Cannot be empty'}, { type: 'number', message: 'Must be number'}],
        'tidb_size': [{ required: true, message: 'Cannot be empty'}, { type: 'number', message: 'Must be number'}],
        'config_map': [{required: true, validator: checkString, trigger: 'blur'}],
      }
    }
  },

  created() {
    this.fetchCreatedCat()
  },

  methods: {
    fetchCreatedCat() {
      console.log('fetching created cats')
      ajax.getCat().then(result => {
        if(result.data.code == 200) {
          console.log('response successful',result)
          this.createdCatList = result.data.data
        }
      }).catch(resp => {
        this.$notify.error({
          title: 'Error',
          message: resp.message
        })
      }
      )
    },
    clickCreateCat() {
      this.createCatFormDialog = true
      // this.catForm = {
      //   labels: this.catForm.labels,
      //   name: this.catForm.name,
      //   pd_ver: {
      //     type: this.catForm.pd_ver.type,
      //     value: this.catForm.pd_ver.value,
      //     platform: this.catForm.pd_ver.platform
      //   },
      //   tikv_ver: {
      //     type: this.catForm.tikv_ver.type,
      //     value: this.catForm.tikv_ver.value,
      //     platform: this.catForm.tikv_ver.platform
      //   },
      //   tidb_ver: {
      //     type: this.catForm.tidb_ver.type,
      //     value: this.catForm.tidb_ver.value,
      //     platform: this.catForm.tidb_ver.platform
      //   },
      //   pd_size: this.catForm.pd_size,
      //   tikv_size: this.catForm.tikv_size,
      //   tidb_size: this.catForm.tidb_size,
      //   config_map: this.catForm.config_map
      // }
    },

    submitForm(formName) {
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
            console.log('the resulst inside createCats', result)
            if(result.data.code == 200) {
              this.createdCatList = this.catForm
            }
            this.createCatFormDialog = false
            this.resetForm()
          }).catch((resp) => {
            this.$notify.error({
              title: 'Error',
              message: resp.message
            })
          })
        }
      })
    },

    resetForm(formName) {

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

