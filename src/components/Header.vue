<template>
  <div>
    <div class="header">
      <h1 class="title">
        Schrodinger
      </h1>
      <span>TiDB Cluster Stability Test</span>
    </div>

    <div id="tabs">
      <Tabs type="card">
        <TabPane label="Create Case" icon="compose">Create Case</TabPane>
        <TabPane label="Create Box" icon="ios-box-outline">Create Box</TabPane>
        <TabPane label="Box Instance" icon="ios-box">Create Box</TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  export default {

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
  }

</style>
