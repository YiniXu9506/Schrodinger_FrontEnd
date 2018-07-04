<template>
  <div>
    <el-container style="height: 750px; border: 1px solid #eee">
      <el-aside width="200px">
        <el-menu v-if="boxInstanceList.length" :default-active="boxInstanceList[0].name" width="auto">
          <el-submenu index="1">
            <template slot="title"><Icon type="ios-box"></Icon>Boxes</template>
            <el-menu-item v-for="(instance, index) in boxInstanceList" :key="index" :index="instance.name" @click.native="getBoxDetail(instance)">{{instance.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container v-if="getDetail">
          <el-header style="height:400px;">
            <el-row type="flex" class="row-bg" justify="end">
              <div class="box-operation">
                <!-- <span style="font-size: 1.5rem"><Strong>Box Operation: </Strong></span> -->
                <el-button type="info" round><Icon type="stop" style="margin-right: 7px;" size="15"></Icon> Stop </el-button>
                <el-button type="primary" round><Icon type="android-hand" style="margin-right: 7px;" size="15"></Icon>Manual Trigger </el-button>
                <el-button type="danger" round><Icon type="android-delete" style="margin-right: 7px;" size="15"></Icon>Manual Trigger </el-button>
              </div>
            </el-row>

            <el-row type="flex" :gutter="10" style="padding: 20px 0">
              <el-col :span="12">
                <my-card :boxInfoCard="boxInstanceDetail" section="Config">
                </my-card>
              </el-col>
              <el-col :span="12">
                <my-card :boxInfoCard="boxInstanceDetail.cat" section="Cat">
                </my-card>
              </el-col>
              <el-col :span="12">
                <my-card :boxInfoCard="boxInstanceDetail.tests" section="Tests">
                </my-card>
              </el-col>
              <el-col :span="12">
                <my-card :boxInfoCard="boxInstanceDetail.rules" section="Rules">
                </my-card>
              </el-col>
            </el-row>
          </el-header>

          <div style="margin-bottom: 10px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{path: '/'}"><Strong>Box: {{boxInstanceDetail.name}} </Strong></el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <el-main>
            <el-table :data="tableData">
              <el-table-column prop="date" label="日期" width="140">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import ajax from '../request/index'
import myCard from '../components/Card'
export default {
  components: {
    myCard
  },

  data() {
    const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
    return {
      boxInstanceList: [],
      boxInstanceDetail: {},
      getDetail: false,
      saveButton: true,
      editButton: false,

      tableData: Array(20).fill(item)
    }
  },

  created() {
    var getData = function() {
      console.log('get start')
      return new Promise(function(resolve, reject) {
        ajax.getBox().then((result) => {
          if(result.data.code == 200) {
            resolve(result.data)
          } else {
            this.$notify.error({
              title: 'Error',
              message: result.data.message
            });
          }
        }).catch((resp) => {
          reject(resp.message)
        })
      })
    }

    getData().then((data)=>{
      this.boxInstanceList = data.data
      this.fetchInitialBox()
    })
  },

  methods: {
    fetchInitialBox: function() {
      this.boxInstanceDetail = this.boxInstanceList[0]
      this.getDetail = true
      console.log('this.boxInstanceDetail: ', this.boxInstanceDetail)
    },

    getBoxDetail: function(instance) {
       this.boxInstanceDetail = instance
     },

    //  handleClickBox: function(instance) {
    //    console.log('hello from hanleclick: ', instance)
    //  }
  }
}
</script>

<style>
  /* .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  } */

  .el-aside {
    color: #333;
  }
  .el-row {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  /* .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  } */
  .box-card {
    height: 300px;
    float:none;
    overflow-y: auto;
    overflow-x: auto;
  }
  .box-operation {
    /* font-size: 1.5rem; */
    float: right;
    height: 50px;
    /* background: #333; */
    padding-top: 20px;
  }
</style>
