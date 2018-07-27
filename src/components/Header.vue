<template>
  <div>
    <div class="header">
      <h1 class="title">
        Schrodinger
      </h1>
      <span>TiDB Cluster Stability Test</span>
    </div>

    <div class="tabs">
      <Tabs type="card" v-model="activeTab" @on-click="tabClicked">
        <TabPane label="Homepage" icon="ios-box" name="boxinstance"></TabPane>
        <TabPane label="Create Box" icon="ios-box-outline" name="createbox"></TabPane>
        <TabPane label="Cat Pool" icon="social-octocat" name="createcat"></TabPane>
        <TabPane label="Create Test Template" icon="compose" name="createtesttemplate"></TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      let activeTab = 'boxinstance';
      location.hash && (activeTab = location.hash.slice(2));
      console.log('active Tab', activeTab)
      return {
        activeTab
      };
    },

    methods: {
      tabClicked(tab) {
        console.log('hello from tab clicked', tab)
        console.log('hello form this.activetab: ', this.activeTab)
        this.$router.push({path: this.activeTab})
      }
    },
    watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      if(from.fullPath == '/createbox' && to.fullPath == '/boxinstance') {
        console.log('to', to)
        console.log('from', from)
        console.log('fullpath: ', from.fullPath)
        this.activeTab = (to.fullPath).slice(1)
      }

      // this.$router.push({path: this.activeTab})
    }
  }

  };

</script>

<style scoped>
  .header {
    display: flex;
    align-items: baseline;
    width: 80rem;
    margin-top: 20px;
    margin-bottom: 40px
  }

  .title {
    margin-right: 30px;
    font-size: 30px
  }

</style>
