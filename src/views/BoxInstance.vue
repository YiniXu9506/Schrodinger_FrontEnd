<template>
<div class="layout">
  <Layout style="height: 100%">
    <Sider style="position: fixed; overflow: auto; height: 100%">
      <Menu :active-name="boxInstanceList[0].name" theme="dark" :open-names="['box_instance']" width="auto">
        <Submenu name="box_instance">
          <template slot="title"><Icon type="ios-box"></Icon>Boxes</template>
          <MenuItem v-for="(instance, index) in boxInstanceList" :key="index" :name="instance.name" @click.native="getBoxDetail(instance)">{{instance.name}}</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout>
      <Content style="margin-left: 200px; background: #fff; width: 1000px">
        <!-- <Row>
          <Col :xs="{span: 4, offset: 1}" :lg="{span: 6, offset: 2}">
            <my-card :boxInfoCard="boxInstanceDetail.config" :boxName="boxInstanceDetail.name"></my-card>
          </Col>
          <Col :xs="{span: 4, offset: 1}" :lg="{span: 6, offset: 2}">
            <my-card :boxInfoCard="boxInstanceDetail.cat"></my-card>
          </Col>
          <Col :xs="{span: 4, offset: 1}" :lg="{span: 6, offset: 2}">
            <my-card :boxInfoCard="boxInstanceDetail.tests"></my-card>
          </Col>
          <Col :xs="{span: 4, offset: 1}" :lg="{span: 6, offset: 2}">
            <my-card :boxInfoCard="boxInstanceDetail.rules"></my-card>
          </Col>
        </Row> -->
      </Content>
    </Layout>
    <!-- <Layout>
      <Header style="position: relative; background: black; boxShadow: 0, 2px, 3px, 2px, rgba(0,0,0,.1); height: 400px; width: 100%">
        <Row>
          <Col :xs="{ span: 2, offset: 1 }" :sm="{span: 4, offset: 1}" :md="{span: 6, offset: 1}" :lg="{ span: 6, offset: 2 }"><Card>Col</Card></Col>
          <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }"><Card>Col</Card></Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"><Card>Col</Card></Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"><Card>Col</Card></Col>
          <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }"><Card>Col</Card></Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"><Card>Col</Card></Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"><Card>Col</Card></Col>
          <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }"><Card>Col</Card></Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"><Card>Col</Card></Col>

        </Row>

      </Header>
      <Content style="margin-top: 20px; overflow: auto; width: 100%">
          <Breadcrumb :style="{margin: '16px 0'}">
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Components</BreadcrumbItem>
              <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Card>
              <div style="height: 100%; width: 100%">Content</div>
          </Card>
          <Card>
              <div style="height: 100%">Content</div>
          </Card>
          <Card>
              <div style="height: 100%">Content</div>
          </Card>
          <Card>
              <div style="height: 100%">Content</div>
          </Card>
          <Card>
              <div style="height: 100%">Content</div>
          </Card>
          <Card>
              <div style="height: 100%">Content</div>
          </Card>
          <Card>
              <div style="height: 100%">Content</div>
          </Card>
          <Card>
              <div style="height: 100%">Content</div>
          </Card><Card>
              <div style="height: 100%">Content</div>
          </Card><Card>
              <div style="height: 100%">Content</div>
          </Card>
      </Content>
    </Layout> -->

  </Layout>
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
    return {
      boxInstanceList: [],
      boxInstanceDetail:''
    }
  },

  created() {
    // this.fetchAllBoxes()
    // this.fetchInitialBox()
    let asyncFn = async() => {
      // let data = null;
      this.boxInstanceList = await getData();
      console.log(this.boxInstanceList)
    }

    var getData = function() {
      console.log('get start')
      return new Promise(function(resolve, reject) {
        ajax.getBox().then((result) => {
          resolve(result.data)
        }).catch((resp) => {
          reject(resp.message)
        })
      })
    }
  },

  methods: {
    // fetchAllBoxes: function() {
    //   ajax.getBox().then((result) => {
    //     this.boxInstanceList = result.data.data
    //     console.log('boxinstance: ', this.boxInstanceList)
    //   })
    // },

    // fetchInitialBox: function() {
    //   this.boxInstanceDetail = this.boxInstanceList[0]
    //   console.log('the initial box detail: ', this.boxInstanceDetail)
    // },

    getBoxDetail: function(instance) {
       console.log('hello from hanleclick: ', instance)
       this.boxInstanceDetail = instance
       console.log('box detail ', this.boxInstanceDetail)
     },

    //  handleClickBox: function(instance) {
    //    console.log('hello from hanleclick: ', instance)
    //  }
  }
}
</script>

<style scoped>
  .layout{
      border: 1px solid #d7dde4;
      background:#fff;
      position: absolute;
      border-radius: 4px;
      overflow: hidden;
  }
  .layout-header-bar{
      background: #fff;
      box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .text {
  font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>

