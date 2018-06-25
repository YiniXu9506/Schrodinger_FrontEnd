<template>
  <div>
    <div class="header">
      <h1 class="title">
        Schrodinger
      </h1>
      <span>TiDB Cluster Stability Test</span>
    </div>

    <div id="tabs">
      <Tabs type="card" v-model="activeTab" @on-click="tabClicked">
        <TabPane label="Create Case" icon="compose" name="createcase"></TabPane>
        <TabPane label="Create Box" icon="ios-box-outline" name="createbox"></TabPane>
        <TabPane label="Box Instance" icon="ios-box" name="boxinstance"></TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      let activeTab = 'createcase';
      location.hash && (activeTab = location.hash.slice(2));
      console.log('active Tab', activeTab)
      return {
        activeTab
      };
    },

    methods: {
      tabClicked(tab) {
        console.log('hello from tab clicked', tab)
        this.$router.push({path: this.activeTab})
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
