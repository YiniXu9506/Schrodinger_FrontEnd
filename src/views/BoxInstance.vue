<template>
  <div>
    <!-- No box -->
    <el-container v-if="noBoxInstance" style="height: 1000px; border: 1px solid #eee">
      <el-aside width="200px">
        <el-menu width="auto" default-openeds=[1] active-text-color="red">
          <el-submenu index="1">
            <template slot="title"><Icon type="ios-box" style="margin-right: 15px"></Icon>Boxes</template>
            <el-menu-item index="1">No Box</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          No Box Data
        </el-main>
      </el-container>
    </el-container>

    <!-- Has Box -->
    <el-container v-if="hasBoxInstance" style="height: 1000px; border: 1px solid #eee">
      <el-aside width="200px" style="border-right: 1px solid #eee; height: 100%">
        <el-menu v-if="boxInstanceList.length" :default-active="boxInstanceList[0].name" width="auto">
          <el-submenu index="1">
            <template slot="title"><Icon type="ios-box" style="margin-right: 15px"></Icon>Box Instance List</template>
            <el-menu-item v-for="(instance, index) in boxInstanceList" :key="index" :index="instance.name" @click.native="getBoxDetail(instance.id)">{{instance.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- <el-table :data="boxInstanceList"  max-height="1000" style="border-bottom: none">
          <el-table-column label="Box Instance List" prop="name">
          </el-table-column>
        </el-table> -->
      </el-aside>

      <!-- show box detail -->
      <el-container v-if="getDetail && showBoxDetail">
        <el-header v-if="showBoxConfig == true" style="height:400px;">
          <el-row type="flex" class="row-bg" justify="start">
            <div v-if="boxStopped" class="box-operation">
              <!-- <Strong>Box Operations</Strong> -->
              <el-button type="primary" round @click.native="hideConfigCards"><Icon type="settings" style="margin-right: 7px;" size="15"></Icon>Hide Box Config</el-button>
              <el-button round disabled @click.native="handleEdit"><Icon type="edit" style="margin-right: 7px;" size="15"></Icon> Edit </el-button>
              <el-button type="primary" disabled round @click.native="handleManualTrigger"><Icon type="android-hand" style="margin-right: 7px;" size="15"></Icon>Manual Trigger </el-button>
              <el-button type="info" disabled round @click.native="handleStop"><Icon type="stop" style="margin-right: 7px;" size="15"></Icon> Stop </el-button>
              <el-button type="primay" round @click.native="handleRecover"><Icon type="refresh" style="margin-right: 7px;" size="15"></Icon> Recover </el-button>
              <el-button type="danger" disabled round @click.native="handleDelete"><Icon type="android-delete" style="margin-right: 7px;" size="15"></Icon>Delete </el-button>
            </div>
            <div v-else class="box-operation">
              <!-- <Strong>Box Operations</Strong> -->
              <el-button type="primary" round @click.native="hideConfigCards"><Icon type="settings" style="margin-right: 7px;" size="15"></Icon>Hide Box Config</el-button>
              <el-button round @click.native="handleEdit"><Icon type="edit" style="margin-right: 7px;" size="15"></Icon> Edit </el-button>
              <el-button type="primary" round @click.native="handleManualTrigger"><Icon type="android-hand" style="margin-right: 7px;" size="15"></Icon>Manual Trigger </el-button>
              <el-button type="info" round @click.native="handleStop"><Icon type="stop" style="margin-right: 7px;" size="15"></Icon> Stop </el-button>
              <el-button type="primay" disabled round @click.native="handleRecover"><Icon type="refresh" style="margin-right: 7px;" size="15"></Icon> Recover </el-button>
              <el-button type="danger" round @click.native="handleDelete"><Icon type="android-delete" style="margin-right: 7px;" size="15"></Icon>Delete </el-button>
            </div>
          </el-row>

          <el-row type="flex" :gutter="10" style="padding: 20px 0;height: 340px;">
            <el-col :span="12">
              <my-card :boxInfoCard="boxInstanceDetail" section="Config" box="true">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :boxInfoCard="boxInstanceDetail.cat" section="Cat" box="true">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :boxInfoCard="boxInstanceDetail.tests" section="Tests" box="true">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :boxInfoCard="boxInstanceDetail.rules" section="Rules" box="true">
              </my-card>
            </el-col>
          </el-row>
        </el-header>

        <el-header v-else style="height:80px;">
          <el-row type="flex" class="row-bg" justify="start">
            <div v-if="boxStopped" class="box-operation">
              <el-button type="primary" round @click.native="showConfigCards"><Icon type="settings" style="margin-right: 7px;" size="15"></Icon>Show Box Config</el-button>
              <el-button round disabled @click.native="handleEdit"><Icon type="edit" style="margin-right: 7px;" size="15"></Icon> Edit </el-button>
              <el-button type="primary" disabled round @click.native="handleManualTrigger"><Icon type="android-hand" style="margin-right: 7px;" size="15"></Icon>Manual Trigger </el-button>
              <el-button type="info" disabled round @click.native="handleStop"><Icon type="stop" style="margin-right: 7px;" size="15"></Icon> Stop </el-button>
              <el-button type="primay" round @click.native="handleRecover"><Icon type="refresh" style="margin-right: 7px;" size="15"></Icon> Recover </el-button>
              <el-button type="danger" disabled round @click.native="handleDelete"><Icon type="android-delete" style="margin-right: 7px;" size="15"></Icon>Delete </el-button>
            </div>
            <div v-else class="box-operation">
              <el-button type="primary" round @click.native="showConfigCards"><Icon type="settings" style="margin-right: 7px;" size="15"></Icon>Show Box Config</el-button>
              <el-button round @click.native="handleEdit"><Icon type="edit" style="margin-right: 7px;" size="15"></Icon> Edit </el-button>
              <el-button type="primary" round @click.native="handleManualTrigger"><Icon type="android-hand" style="margin-right: 7px;" size="15"></Icon>Manual Trigger </el-button>
              <el-button type="info" round @click.native="handleStop"><Icon type="stop" style="margin-right: 7px;" size="15"></Icon> Stop </el-button>
              <el-button type="primay" disabled round @click.native="handleRecover"><Icon type="refresh" style="margin-right: 7px;" size="15"></Icon> Recover </el-button>
              <el-button type="danger" round @click.native="handleDelete"><Icon type="android-delete" style="margin-right: 7px;" size="15"></Icon>Delete </el-button>
            </div>
          </el-row>
        </el-header>

        <div style="margin-bottom: 10px; margin-left: 25px; margin-top: 30px">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item><el-button style="border: none">All Experiments in Box: {{boxInstanceDetail.name}}</el-button></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-main>
          <el-table :data="experimentTable.list" :header-cell-style="{background: '#ebeef5'}">
            <el-table-column fixed label="Experiment #" width="150" prop="id"></el-table-column>
            <el-table-column width="150" v-for="(item, index) in experimentTable.prop" :key="index" :prop="item" :label="experimentTable.label[index]"></el-table-column>
            <el-table-column width="150" label="PD Version" prop="pd_ver">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark">
                  <div v-if="scope.row.cat.run_version == null" slot="content">Waiting for running...</div>
                  <div v-else slot="content">{{scope.row.cat.run_version.pd_version.value}}</div>
                  <div v-if="scope.row.cat.run_version == null">{{scope.row.cat.config_version.pd_version.value}}(...)</div>
                  <div v-else>{{scope.row.cat.config_version.pd_version.value}}({{(scope.row.cat.run_version.pd_version.value).substring(0,7)}}...)</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column width="150" label="TiKV Version" prop="tikv_ver">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark">
                  <div v-if="scope.row.cat.run_version == null" slot="content">Waiting for running...</div>
                  <div v-else slot="content">{{scope.row.cat.run_version.tikv_version.value}}</div>
                  <div v-if="scope.row.cat.run_version == null">{{scope.row.cat.config_version.tikv_version.value}}(...)</div>
                  <div v-else>{{scope.row.cat.config_version.tikv_version.value}}({{(scope.row.cat.run_version.tikv_version.value).substring(0,7)}}...)</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column width="150" label="TiDB Version" prop="tidb_ver">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark">
                  <div v-if="scope.row.cat.run_version == null" slot="content">Waiting for running...</div>
                  <div v-else slot="content">{{scope.row.cat.run_version.tidb_version.value}}</div>
                  <div v-if="scope.row.cat.run_version == null">{{scope.row.cat.config_version.tidb_version.value}}(...)</div>
                  <div v-else>{{scope.row.cat.config_version.tidb_version.value}}({{(scope.row.cat.run_version.tidb_version.value).substring(0,7)}}...)</div>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column width="150" label="Stage" prop="stage"
                      :filters="[{text: 'NEW', value:'NEW'}, {text:'PENDING', value: 'PENDING'}, {text:'PREPAREING', value: 'PREPAREING'},
                      {text:'RUNNING', value: 'RUNNING'}, {text:'FINISHING', value: 'FINISHING'}, {text:'FINISHED', value: 'FINISHED'}]"
                      :filter-method="filterExperimentStage" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag type="primary">{{scope.row.stage}}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column width="150" label="Status" prop="status"
                      :filters="[{text: 'NORMAL', value:'NORMAL'}, {text:'ABNORMAL', value: 'ABNORMAL'}]"
                      :filter-method="filterExperimentStatus" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 'ABNORMAL' ? 'danger' : 'primary'">{{scope.row.status}}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column fixed="right" width="200" label="Operation">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="Experiment Detail">
                  <el-button type="info" circle @click.native="handleExperimentDetailClick(scope.row.id)"><Icon type="ios-paper-outline"></Icon></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Redo the experiment with same box config">
                  <el-button type="warning" circle @click.native="handleExperimentRedoClick(scope.row.id)"><Icon type="android-refresh"></Icon></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Stop the experiment">
                  <el-button type="danger" circle @click.native="handleStopExperiment(boxInstanceDetail.id ,scope.row.id)"><Icon type="stop" size="100px"></Icon></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>

      <!-- show experiment Detail -->
      <el-container v-if="showExperimentDetail">
        <el-header v-if="showExperimentConfig == true" style="height:400px;">
          <el-row type="flex" class="row-bg" justify="start">
            <div class="experiment-operation">
              <el-button type="primary" round @click.native="hideExperimentConfigCards"><Icon type="settings" style="margin-right: 7px;" size="15"></Icon>Hide Experiment Config</el-button>
            </div>
          </el-row>

          <el-row type="flex" :gutter="10" style="padding: 20px 0">
            <el-col :span="12">
              <my-card :experimentInfoCard="experimentDetail" section="Config" experiment="true">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :experimentInfoCard="experimentDetail.Config.Cat" section="Cat" experiment="true">
              </my-card>
            </el-col>
            <el-col :span="12">
              <my-card :experimentInfoCard="experimentDetail.Config.Tests" section="Tests" experiment="true">
              </my-card>
            </el-col>
          </el-row>
        </el-header>

        <el-header v-else style="height:80px;">
            <el-row type="flex" class="row-bg" justify="start">
              <div class="experiment-operation">
                <el-button round type="primary" @click.native="showExperimentConfigCards"><Icon type="settings" style="margin-right: 7px;" size="15"></Icon>Show Experiment Config</el-button>
              </div>
            </el-row>
        </el-header>
        <div style="margin-bottom: 10px; margin-left: 25px; margin-top: 30px">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item><el-button @click.native="jumpToExperimentLists">All Experiments in Box {{boxInstanceDetail.name}}</el-button></el-breadcrumb-item>
            <el-breadcrumb-item><el-button disabled style="border: none">All Tests List in Experiment : {{experimentDetail.name}}</el-button></el-breadcrumb-item>

          </el-breadcrumb>
        </div>
        <el-main>
          <el-table :data="testTable.list" :header-cell-style="{background: '#ebeef5'}">
            <el-table-column fixed label="Test Name" width="150" prop="name"></el-table-column>
            <el-table-column width="200" v-for="(item, index) in testTable.prop" :key="index" :prop="item"
                            :label="testTable.label[index]">
            </el-table-column>

            <el-table-column width="150" label="Status" prop="status"
                            :filters="[{text:'PENDING', value: 'PENDING'},{text:'CREATING', value: 'CREATING'},
                            {text: 'STOPED', value: 'STOPED'},
                            {text: 'FINISHED', value: 'FINISHED'},{text:'DESTROYED', value:'DESTROYED'},
                            {text: 'FAILED', value:'FAILED'}]"
                            :filter-method="filterTestStatus" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === ('FAILED' || 'DESTROYED' || 'STOPED') ? 'danger' : 'success'">{{scope.row.status}}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column label="Pod ID" prop="podip" width="150">
              <template slot-scope="scope">
                <div v-if="scope.row.report == null">--</div>
                <div v-else>{{scope.row.report.podip}}</div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" width="200" label="Operation">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="Test Detail">
                  <el-button type="info" icon="el-icon-document" circle @click.native="handleTestDetailClick(scope.row.name)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>

    <!-- update box dialog -->
    <div>
      <el-dialog title="Update Box" :visible.sync="updateBoxDialog">
        <el-form :model="updateBoxForm" :rules="validationRules" ref="updateBoxForm" label-width="8em" class="demo-form-inline">
          <el-form-item label="Box Name:" prop="miscConfigForm.name" label-width="7rem">
            <el-input v-model="updateBoxForm.miscConfigForm.name" placeholder="Enter box name"></el-input>
          </el-form-item>
          <el-collapse>
            <el-collapse-item title='CAT' name='cat'>
              <el-form-item label="Cat From" prop="catForm.choice">
                <el-radio-group v-model="updateBoxForm.catForm.choice" @change="handleCatChoiceChange">
                  <el-radio border label="select">Created Cat Pool</el-radio>
                  <el-radio border label="create">Create New Cat</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="updateBoxForm.catForm.choice == 'select'" label="Pick Cat" prop="catForm.selected_cat"  class="cat">
                <el-select v-model="updateBoxForm.catForm.selected_cat" placeholder="Please select cat" style="width: 400px;">
                  <el-option v-for="(item, index) in createdCatPool" :key="index" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <div v-if="updateBoxForm.catForm.choice == 'create' " class="create-box-cat" style="width: 100%;">
                <el-form-item label="Labels" prop="catForm.labels">
                  <el-input v-model="updateBoxForm.catForm.labels" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="PD Verion:" required>
                  <el-col :span="6">
                    <el-form-item prop="catForm.pd_ver.type">
                      <el-select v-model="updateBoxForm.catForm.pd_ver.type" placeholder="Select type">
                        <el-option label="branch" value="branch"></el-option>
                        <el-option label="hash" value="hash"></el-option>
                        <el-option label="tag" value="tag"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item prop="catForm.pd_ver.value">
                      <el-input v-if="updateBoxForm.catForm.pd_ver.type == ''" v-model="updateBoxForm.catForm.pd_ver.value" class="input-with-select" placeholder="Enter PD version value"></el-input>
                      <el-input v-if="updateBoxForm.catForm.pd_ver.type == 'branch'" v-model="updateBoxForm.catForm.pd_ver.value" class="input-with-select" placeholder="eg.master or release-1.0"></el-input>
                      <el-input v-if="updateBoxForm.catForm.pd_ver.type == 'hash'" v-model="updateBoxForm.catForm.pd_ver.value" class="input-with-select" placeholder="Enter hash value"></el-input>
                      <el-input v-if="updateBoxForm.catForm.pd_ver.type == 'tag'" v-model="updateBoxForm.catForm.pd_ver.value" class="input-with-select" placeholder="Enter tag of git repo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item prop="catForm.pd_ver.platform">
                      <el-select v-model="updateBoxForm.catForm.pd_ver.platform" placeholder="Compile to platform">
                        <el-option label="Centos7" value="centos7"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-form-item>

                <el-form-item label="PD Size:" prop="catForm.pd_size">
                  <el-input v-model.number="updateBoxForm.catForm.pd_size" style="width: 200px;"></el-input>
                </el-form-item>

                <el-form-item label="TiKV Verion:" required>
                  <el-col :span="6">
                    <el-form-item prop="catForm.tikv_ver.type">
                      <el-select v-model="updateBoxForm.catForm.tikv_ver.type" placeholder="Select type">
                        <el-option label="branch" value="branch"></el-option>
                        <el-option label="hash" value="hash"></el-option>
                        <el-option label="tag" value="tag"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item prop="catForm.tikv_ver.value">
                      <el-input v-if="updateBoxForm.catForm.tikv_ver.type == ''" v-model="updateBoxForm.catForm.tikv_ver.value" class="input-with-select" placeholder="Enter PD version value"></el-input>
                      <el-input v-if="updateBoxForm.catForm.tikv_ver.type == 'branch'" v-model="updateBoxForm.catForm.tikv_ver.value" class="input-with-select" placeholder="eg.master or release-1.0"></el-input>
                      <el-input v-if="updateBoxForm.catForm.tikv_ver.type == 'hash'" v-model="updateBoxForm.catForm.tikv_ver.value" class="input-with-select" placeholder="Enter hash value"></el-input>
                      <el-input v-if="updateBoxForm.catForm.tikv_ver.type == 'tag'" v-model="updateBoxForm.catForm.tikv_ver.value" class="input-with-select" placeholder="Enter tag of git repo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item prop="catForm.tikv_ver.platform">
                      <el-select v-model="updateBoxForm.catForm.tikv_ver.platform" placeholder="Compile to platform">
                        <el-option label="Unportable Centos7" value="unportable_centos7"></el-option>
                        <el-option label="Centos7" value="centos7"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="TiKV Size:" prop="catForm.tikv_size">
                  <el-input v-model.number="updateBoxForm.catForm.tikv_size" style="width: 200px;"></el-input>
                </el-form-item>

                <el-form-item label="TiDB Verion:" required>
                  <el-col :span="6">
                    <el-form-item prop="catForm.tidb_ver.type">
                      <el-select v-model="updateBoxForm.catForm.tidb_ver.type" placeholder="Select type">
                        <el-option label="branch" value="branch"></el-option>
                        <el-option label="hash" value="hash"></el-option>
                        <el-option label="tag" value="tag"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item prop="catForm.tidb_ver.value">
                      <el-input v-if="updateBoxForm.catForm.tidb_ver.type == ''" v-model="updateBoxForm.catForm.tidb_ver.value" class="input-with-select" placeholder="Enter PD version value"></el-input>
                      <el-input v-if="updateBoxForm.catForm.tidb_ver.type == 'branch'" v-model="updateBoxForm.catForm.tidb_ver.value" class="input-with-select" placeholder="eg.master or release-1.0"></el-input>
                      <el-input v-if="updateBoxForm.catForm.tidb_ver.type == 'hash'" v-model="updateBoxForm.catForm.tidb_ver.value" class="input-with-select" placeholder="Enter hash value"></el-input>
                      <el-input v-if="updateBoxForm.catForm.tidb_ver.type == 'tag'" v-model="updateBoxForm.catForm.tidb_ver.value" class="input-with-select" placeholder="Enter tag of git repo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item prop="catForm.tidb_ver.platform">
                      <el-select v-model="updateBoxForm.catForm.tidb_ver.platform" placeholder="Compile to platform">
                        <el-option label="Centos7" value="centos7"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="TiDB Size:" prop="catForm.tidb_size">
                  <el-input v-model.number="updateBoxForm.catForm.tidb_size" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="Config Map:" prop="catForm.config_map">
                  <el-input v-model="updateBoxForm.catForm.config_map"></el-input>
                </el-form-item>
              </div>
            </el-collapse-item>

            <el-collapse-item title="Tests" name="tests">
              <el-form-item label="Execution method" prop="testForm.in_order">
                  <el-radio v-model="updateBoxForm.testForm.in_order" :label=true>Serial execution</el-radio>
                  <el-radio v-model="updateBoxForm.testForm.in_order" :label=false>Parallel execution</el-radio>
              </el-form-item>
              <div style="position: relative; margin-top: 20px">
                <el-form-item label="Tests: " prop="testForm.tests">
                    <el-select v-model="updateBoxForm.testForm.tests" multiple placeholder="Please select test" style="width: 400rem;">
                      <el-option v-for="(item, index) in testTemplateList" :key="index" :value="item.name"></el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </el-collapse-item>

            <el-collapse-item title="Rules" name="name">
              <el-form-item v-for="(rule, index) in updateBoxForm.ruleForm" label-width="7rem" :key="rule.key" :label="'Rule ' + index"
                          :prop="'ruleForm.' + index + '.type'">
                <el-row>
                  <el-col :span="22">
                    <el-input v-model="rule.value" class="input-with-select">
                      <el-select v-model="rule.type" slot="prepend" style="width: 150px" placeholder="Select prefix">
                        <el-option label="Immediately Job" value="immediately job"></el-option>
                        <el-option label="Crontab Job" value="crontab job"></el-option>
                        <el-option label="Git Webhook" value="git webhook"></el-option>
                      </el-select>
                    </el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button @click.prevent="handleRemove(rule)">Remove</el-button>
                  </el-col>
                </el-row>
                <br>
              </el-form-item>
              <el-row>
                <el-col :span="1" :offset="1">
                  <Button type="dashed" @click="handleAdd()" icon="plus-round">Add rule</Button>
                </el-col>
              </el-row>
            </el-collapse-item>

            <el-collapse-item title="Misc Config" name="miscConfig">
              <el-form-item label="Name:" prop="miscConfigForm.name">
                <el-input v-model="updateBoxForm.miscConfigForm.name"></el-input>
              </el-form-item>
              <el-form-item label="Slack Channel:" prop="miscConfigForm.slack">
                <el-input v-model="updateBoxForm.miscConfigForm.slack"></el-input>
              </el-form-item>
              <el-form-item label="Prepare Callback:" prop="miscConfigForm.prepare">
                <el-input v-model="updateBoxForm.miscConfigForm.prepare"></el-input>
              </el-form-item>
              <el-form-item label="Stop Callback:" prop="miscConfigForm.stop">
                <el-input v-model="updateBoxForm.miscConfigForm.stop"></el-input>
              </el-form-item>
              <el-form-item label="DestoryTidbCluster:" prop="miscConfigForm.destory_tidb_cluster">
              <el-radio border v-model="updateBoxForm.miscConfigForm.destory_tidb_cluster" :label=true>Yes</el-radio>
                <el-radio border v-model="updateBoxForm.miscConfigForm.destory_tidb_cluster" :label=false>No</el-radio>
              </el-form-item>
              <el-form-item label="Type:" prop="miscConfigForm.type">
                <el-input v-model="updateBoxForm.miscConfigForm.type"></el-input>
              </el-form-item>
              <el-form-item label="Data:" prop="miscConfigForm.data">
                <el-input v-model="updateBoxForm.miscConfigForm.data"></el-input>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
          <div style="margin-top: 10px;">
            <el-form-item>
              <el-button type="primary" @click="saveBoxForm('updateBoxForm')">Save</el-button>
              <el-button @click="resetForm('updateBoxForm')">Reset</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>

    <!-- test detail dialog -->
    <el-dialog title="Test Detail" :visible.sync="testDetailDialog">
      <!-- <el-form label-position="">
      </el-form> -->
      {{testDetail}}
      <!-- <el-form label-position="left">
        <el-form-item label="ID "><span>{{testDetail.id}}</span>
        </el-form-item>
        <el-form-item label="Experiment ID"><span>{{testDetail.experiment_id}}</span>
        </el-form-item>
        <el-form-item label="Creator"><span>{{testDetail.template.creator}}</span>
        </el-form-item>
        <el-form-item label="Create Time"><span>{{testDetail.template.create_time}}</span>
        </el-form-item>
        <el-form-item label="Update Time"><span>{{testDetail.template.update_time}}</span>
        </el-form-item>
        <el-form-item label="Binary Name"><span>{{testDetail.template.source.binary_name}}</span>
        </el-form-item>
        <el-form-item label="Type"><span>{{testDetail.template.source.type}}</span>
        </el-form-item>
        <el-form-item label="Git Value"><span>{{testDetail.template.source.git_value.git_type}}:{{testDetail.template.source.git_value.value}}</span>
        </el-form-item>
        <el-form-item label="Git Repo"><span>{{testDetail.template.source.git_repo}}</span>
        </el-form-item>
      </el-form> -->
    </el-dialog>
    </div>
</template>

<script>
import _ from 'lodash'
import ajax from '../request/index'
import myCard from '../components/Card'


// window.handleHrefClick = function() {
//   console.log('handle hef')
// }
export default {
  components: {
    myCard
  },

  data() {
    var checkArrayEmpty = (rule, value, callback) => {
      if(value.length <= 0) {
        return callback(new Error('Cannot be empty'))
      } else {
        callback()
      }
    }

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
    });

    var checkNumber = ((rule, value, callback) => {
      if(!value) {
        return callback(new Error('Cannot be empty'))
      }
      if(isNaN(value)) {
        return callback(new Error('Must be a number'))
      } else {
        callback()
      }
    });
    return {
      activeName: 'cat',
      showBoxConfig: false,
      showExperimentConfig: false,
      testDetailDialog: false,
      noBoxInstance: false,
      hasBoxInstance: false,
      boxStopped: false,
      boxInstanceList: [],
      boxInstanceDetail: {},
      createdCatPool:[],
      showBoxDetail: true,
      showExperimentDetail: false,
      getDetail: false,
      updateBoxDialog: false,
      experimentDetail: '',
      testTemplateList: [],
      catDetail: '',
      experimentTable: {
        label: ['Experiment Name', 'Create Time', 'Update Time'],
        prop: ['name', 'create_time', 'update_time'],
        list: []
      },
      testTable: {
        label: ['Start Time', 'Update Time'],
        prop: ['create_time', 'update_time'],
        list: []
      },
      testDetail: '',
      updateBoxForm: {
        miscConfigForm: {
          name: '',
          slack: '',
          prepare: '',
          stop: '',
          destory_tidb_cluster: '',
          type: '',
          data: ''
        },
        catForm: {
          choice: 'select',
          selected_cat:'',
          labels: '',
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
          pd_size: 0,
          tidb_size: 0,
          tikv_size: 0,
          config_map: ''
        },
        testForm: {
          in_order: '',
          tests: []
        },

        ruleForm: [{
          type: '',
          value: ''
        }]
      },
      validationRules: {
        // 'miscConfigForm.name' :[{required: true, validator: checkString, trigger: 'blur'}],
        // 'catForm.pd_ver': [{required: true, validator: checkString, trigger: 'blur'}],
        // 'catForm.tikv_ver': [{required: true, validator: checkString, trigger: 'blur'}],
        // 'catForm.tidb_ver': [{required: true, validator: checkString, trigger: 'blur'}],
        // 'catForm.pd_size': [{ required: true, message: 'Cannot be empty'}, { type: 'number', message: 'Must be number'}],
        // 'catForm.tikv_size': [{ required: true, message: 'Cannot be empty'}, { type: 'number', message: 'Must be number'}],
        // 'catForm.tidb_size': [{ required: true, message: 'Cannot be empty'}, { type: 'number', message: 'Must be number'}],
        // 'catForm.config_map': [{required: true, validator: checkString, trigger: 'blur'}],
        // 'testForm.tests':[{required: true, validator: checkArrayEmpty, trigger: 'change'}],
      }
    }
  },

  created() {
    // this.testDetailDialog = false,
    // this.noBoxInstance = false,
    this.getAllBox()
  },

  methods: {
    getAllBox: function() {
      ajax.getBox().then((result) => {
        console.log('the result is: ', result)
        if(result.data.data.length == 0) {
          this.noBoxInstance = true
          this.hasBoxInstance = false
          return
        } else {
          this.noBoxInstance = false
          this.hasBoxInstance = true
          this.boxInstanceList = result.data.data
          console.log('this.boxinstancelist: ', this.boxInstanceList)
          this.fetchInitialBox()
          // let boxId = this.boxInstanceDetail.id
          this.getExperiments(this.boxInstanceDetail.id)
          ajax.getCat().then((result) => {
            console.log('getcats result: ',result)
            this.createdCatPool = _.values(result.data.data)
            console.log('the created cats are: ', this.createdCatPool)
          }).catch(resp => {
            this.$notify.error({
              title: 'Error',
              message: resp.message
            })
          })
        }
      })
    },

    fetchInitialBox: function() {
      this.boxInstanceDetail = this.boxInstanceList[0]
      console.log('this.boxInstanceDetail kkkkkk: ', this.boxInstanceDetail)
      if(this.boxInstanceDetail.cat.selected_cat != null) {
        console.log('select cat')
        ajax.getCatDetailByName(this.boxInstanceDetail.cat.selected_cat).then(

        ).catch(resp => {

        })
        // get cat detail
      }
      // ajax.getCatDetailByID()
    },

    getExperiments: function(boxId) {
      console.log('boxid is ', boxId)
      ajax.getExperimentsByBoxID(boxId).then((result) => {
        this.getDetail = true
        console.log('get experiment result: ', result)
        this.experimentTable.list = result.data.data
        console.log('box id: ', boxId)
        console.log('get experiments ', this.experimentTable.list)
      })
    },

    getBoxDetail: function(instanceID) {
      console.log('get box detail click other box, ', instanceID)
      this.showExperimentDetail = false
      this.showBoxDetail = true
      // this.boxInstanceDetail = instance
      ajax.getBoxDetailByID(instanceID).then(result => {
        console.log('box detail is hhhh: ', result.data.data)
        this.boxInstanceDetail = result.data.data
        console.log('this.boxinstancedetail id: ',this.boxInstanceDetail, this.boxInstanceDetail.id)
        this.getExperiments(this.boxInstanceDetail.id)
      })
    },

    handleEdit: function() {
      console.log('click handleEdit')
      console.log('boxinstance in handleedit: ', this.boxInstanceDetail)
      this.updateBoxDialog = true
      // debugger
      if(this.boxInstanceDetail.cat.selected_cat == '') {
        this.choice = 'create'
      } else {
        this.choice = 'select'
      }
      this.updateBoxForm = {
        miscConfigForm: {
          name: this.boxInstanceDetail.name,
          slack: this.boxInstanceDetail.config.slack,
          prepare: this.boxInstanceDetail.config.prepare,
          stop: this.boxInstanceDetail.config.stop,
          destory_tidb_cluster: this.boxInstanceDetail.config.destory_tidb_cluster,
          type: this.boxInstanceDetail.config.type,
          data: this.boxInstanceDetail.config.data
        },
        catForm: {
          choice: this.choice,
          selected_cat: this.boxInstanceDetail.cat.selected_cat,
          labels: this.boxInstanceDetail.cat.labels,
          pd_ver: {
            type: this.boxInstanceDetail.cat.pd_ver.type,
            value: this.boxInstanceDetail.cat.pd_ver.value,
            platform: this.boxInstanceDetail.cat.pd_ver.platform,
          },
          tikv_ver: {
            type: this.boxInstanceDetail.cat.tikv_ver.type,
            value: this.boxInstanceDetail.cat.tikv_ver.value,
            platform: this.boxInstanceDetail.cat.tikv_ver.platform
          },
          tidb_ver: {
            type: this.boxInstanceDetail.cat.tidb_ver.type,
            value: this.boxInstanceDetail.cat.tidb_ver.value,
            platform: this.boxInstanceDetail.cat.tidb_ver.platform
          },
          pd_size: this.boxInstanceDetail.cat.pd_size,
          tidb_size: this.boxInstanceDetail.cat.tidb_size,
          tikv_size: this.boxInstanceDetail.cat.tikv_size,
          config_map: this.boxInstanceDetail.cat.config_map
        },
        ruleForm: this.boxInstanceDetail.rules,
        testForm: {
          in_order: this.boxInstanceDetail.tests.in_order,
          tests: this.boxInstanceDetail.tests.tests
        }
      }
      console.log('the updateboxform: ', this.updateBoxForm)
      // debugger
    },

    handleExperimentDetailClick: function(experimentId) {
      this.showBoxDetail = false
      this.showExperimentDetail = true
      console.log('experimetn id: ', experimentId, this.boxInstanceDetail.id)
      ajax.getExperimentsDetailByID(this.boxInstanceDetail.id, experimentId).then((result) => {
        this.experimentDetail = result.data.data
        console.log('this experimentDetail: ', this.experimentDetail)
        }).catch((resp) => {
        this.$notify.error({
          title: 'Erorr',
          message: resp.message
        })
      })

      ajax.getTestByID(this.boxInstanceDetail.id, experimentId).then((result) => {
        console.log('get test result', result)
        this.testTable.list = result.data.data
        console.log('testtable list', this.testTable.list)
      }).catch((resp) => {
        this.$notify.error({
          title: 'Erorr',
          message: resp.message
        })
      })
    },

    handleExperimentRedoClick: function(experimentId) {
      console.log('before redo, experiment list: ', this.experimentTable.list)
      ajax.redoExperimentByID(this.boxInstanceDetail.id, experimentId).then((result) => {
        console.log('inside redo experiment, result is: ', result)
        if(result.data.code == 200) {
          this.$notify({
            title: 'Redo Success',
            type: 'success',
            message: 'Experiment: ' +  experimentId
          })
          // this.getExperiments(this.boxInstanceDetail.id)
        } else {
          this.$notify.error({
            title: 'Redo Failed',
            message: 'Experiment: ' +  experimentId
          })
        }

      }).catch(resp => {
          this.$notify.error({
            title: 'Error',
            message: resp.message
          })
        })

      ajax.getExperimentsByBoxID(this.boxInstanceDetail.id).then((result) => {
        this.getDetail = true
        this.experimentTable.list = result.data.data
        console.log('after redo, experiment list: ', this.experimentTable.list)
      }).catch(resp => {
        this.$notify.error({
          title: 'Error',
          message: resp.messages
        })
      })
    },

    handleTestDetailClick: function(testName) {
      console.log('hello from test detail click,', testName)
      this.testDetailDialog = true
      ajax.getTestDetailByName(this.boxInstanceDetail.id, this.experimentDetail.id, testName).then(result => {
        if(result.data.code == 200) {
          this.testDetail = result.data.data
        } else {
          this.$notify.error({
            title: 'Error',
            message: 'Get Test Detail By Name Failed'
          })
        }
      }).catch(resp => {
        this.$notify.error({
            title: 'Error',
            message: resp.message
          })
      })
    },

    handleManualTrigger: function() {
      this.$confirm('Continue to manual Trigger this box?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type:'warning',
        center: true
      }).then(() => {
        console.log('click yes')
        ajax.triggerBoxByID(this.boxInstanceDetail.id).then((result) =>{
          if(result.data.code !== 200) {
            this.$notify.error({
              title: 'Error',
              message: 'Manual Trigger Box Failed'
            })
            return
          }
          this.$notify({
            title: 'Manual Trigger Success',
            type: 'success',
            message: 'Box: ' + this.boxInstanceDetail.name
          })
          this.getExperiments(this.boxInstanceDetail.id)
        }).catch((resp) => {
          this.$notify.error({
            title: 'Error',
            message: resp.message
          })
        })
      }).catch(() => {
        console.log('click cancel')
        return
      })

    },

    handleStop: function() {
      this.$confirm('Continue to Stop the Box?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type:'warning',
        center: true
      }).then(() => {
        console.log('click yes')
        this.boxStopped = true
        ajax.stopBoxByID(this.boxInstanceDetail.id).then((result) => {
          if(result.data.code !== 200) {
            this.$notify.error({
              title: 'Error',
              message: 'Stop Box Failed'
            })
            return
          }
          this.$notify({
            title: 'Stop Success',
            type: 'success',
            message: 'Box: ' + this.boxInstanceDetail.name
          })
        }).catch((resp) => {
          this.$notify.error({
            title: 'Error',
            message: resp.message
          })
        })
      }).catch(() => {
        console.log('click cancel')
        return
      })
    },


    handleDelete: function() {
      this.$confirm('Continue to Delete the Box?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type:'warning',
        center: true
      }).then(() => {
        console.log('click yes')
        ajax.deleteBoxByID(this.boxInstanceDetail.id).then((result) => {
          if(result.data.code !== 200) {
            this.$notify.error({
              title: 'Error',
              message: 'Delete Box Failed'
            })
            return
          }
          this.$notify({
            title: ' Delete Success',
            type: 'success',
            message: 'Box: '+ this.boxInstanceDetail.name
          })
          this.getAllBox()
        }).catch((resp) => {
          this.$notify.error({
            title: 'Error',
            message: resp.message
          })
        })
      }).catch(() => {
        console.log('click cancel')
        return
      })
    },

    handleRecover() {
      this.$confirm('This Cat is occupied, continue to edit?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type:'warning',
        center: true
      }).then(() => {
        this.boxStopped = false
        console.log('click recover and teh boxdetail is', this.boxInstanceDetail)
        ajax.recoverBoxByID(this.boxInstanceDetail.id).then(result => {
          if(result.data.code == 200) {
            console.log('return success, the result is, ', result.data.data)
            this.$notify({
              title: 'Success',
              type: 'success',
              message: 'Recover Box '+ this.boxInstanceDetail.name + ' Success'
            })
          } else {
            this.$notify.error({
              title: 'Error',
              message: 'Recover Box '+ this.boxInstanceDetail.name + ' Failed',
            })
          }
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

    saveBoxForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ajax.updateBoxByID(this.boxInstanceDetail.id, {
            name: this.updateBoxForm.miscConfigForm.name,
            cat: {
              selected_cat: this.updateBoxForm.catForm.selected_cat,
              labels: this.updateBoxForm.catForm.labels,
              pd_ver: {
                type: this.updateBoxForm.catForm.pd_ver.type,
                value: this.updateBoxForm.catForm.pd_ver.value,
                platform: this.updateBoxForm.catForm.pd_ver.platform,
              },
              tikv_ver: {
                type: this.updateBoxForm.catForm.tikv_ver.type,
                value: this.updateBoxForm.catForm.tikv_ver.value,
                platform: this.updateBoxForm.catForm.tikv_ver.platform
              },
              tidb_ver: {
                type: this.updateBoxForm.catForm.tidb_ver.type,
                value: this.updateBoxForm.catForm.tidb_ver.value,
                platform: this.updateBoxForm.catForm.tidb_ver.platform
              },
              pd_size: this.updateBoxForm.catForm.pd_size,
              tidb_size: this.updateBoxForm.catForm.tidb_size,
              tikv_size: this.updateBoxForm.catForm.tikv_size,
              config_map: this.updateBoxForm.catForm.config_map
            },
            rules: this.updateBoxForm.ruleForm,
            tests: {
              in_order: this.updateBoxForm.testForm.in_order,
              tests: this.updateBoxForm.testForm.tests
            },
            config: {
              slack: this.updateBoxForm.miscConfigForm.slack,
              prepare: this.updateBoxForm.miscConfigForm.prepare,
              stop: this.updateBoxForm.miscConfigForm.stop,
              destory_tidb_cluster: this.updateBoxForm.miscConfigForm.destory_tidb_cluster,
              type: this.updateBoxForm.miscConfigForm.type,
              data: this.updateBoxForm.miscConfigForm.data
            }
          }).then(result => {
            console.log('after update, the updateboxform is: ',this.updateBoxForm)
            if (result.data.code != 200) {
              this.$notify({
                title: "ERROR",
                type: 'error',
                message: result.data.message,
                duration: 0
              });
              return
            }
            this.updateBoxDialog = false
            this.$notify({
              title: 'Success',
              type: 'success',
              message: 'Update Box Success'
            })
            ajax.getBoxDetailByID(this.boxInstanceDetail.id).then(result => {
              this.boxInstanceDetail = result.data.data
              console.log('after update, the new box detail is: ',this.boxInstanceDetail.name, this.boxInstanceDetail.id,  this.boxInstanceDetail)
              debugger
            }).catch((resp) => {
              this.$notify.error({
                title: 'Error',
                message: resp.message
              })
            })

            ajax.getBox().then((result) => {

              this.boxInstanceList = result.data.data
              console.log('boxinstancelsitL', this.boxInstanceList)
              debugger
            }).catch(resp => {
              this.$notify.error({
                title: 'Update Error',
                message: resp.message
              })
            })
          }).catch(resp =>  {
            this.$notify.error({
              title: 'Update Error',
              message: resp.message
            })
          })
        } else {
          this.activeName = ['miscConfig', 'cat', 'tests', 'name']
          console.log('check validation Failed');
          return false;
        }
      })
    },

    handleAdd() {
      this.updateBoxForm.ruleForm.push({
        type: '',
        value: '',
        key: Date.now()
      })
    },

    handleRemove(rule) {
      var index = this.updateBoxForm.ruleForm.indexOf(rule)
      if(index !== -1) {
        this.updateBoxForm.ruleForm.splice(index, 1)
      }
    },

    handleCatChoiceChange(catChoice) {
      console.log('inside hanvlecathchoicechange,catchoice is ', catChoice)
      if(catChoice == 'create') {
        this.updateBoxForm.catForm.selected_cat = ''
      } else {
        this.updateBoxForm.catForm.labels = '',
        this.updateBoxForm.catForm.pd_ver.type = '',
        this.updateBoxForm.catForm.pd_ver.value = '',
        this.updateBoxForm.catForm.pd_ver.platform = ''
        this.updateBoxForm.catForm.tikv_ver.type = '',
        this.updateBoxForm.catForm.tikv_ver.value = '',
        this.updateBoxForm.catForm.tikv_ver.platform = '',
        this.updateBoxForm.catForm.tidb_ver.type = '',
        this.updateBoxForm.catForm.tidb_ver.value = '',
        this.updateBoxForm.catForm.tidb_ver.platform = '',
        this.updateBoxForm.catForm.pd_size = '',
        this.updateBoxForm.catForm.tidb_size = '',
        this.updateBoxForm.catForm.tikv_size = '',
        this.updateBoxForm.catForm.config_map = ''
      }
    },

    jumpToExperimentLists() {
      console.log('jump to experiment ')
      this.showBoxDetail = true
      this.showExperimentDetail = false
    },

    handleStopExperiment(boxID, experimentID) {
      this.$confirm('Continue to Stop Experiment?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type:'warning',
        center: true
      }).then(() => {
        console.log('click yes')
        ajax.stopExperimentByID(boxID, experimentID).then(result => {
          if(result.data.code == 200) {
            this.$notify({
              title: 'Success',
              type: 'success',
              message: 'Stop Experiment: ' + experimentID + ' Successfully'
            })
          }
        }).catch(resp => {
          this.$notify.error({
            title: 'Error',
            message: resp.message
          })
        })
      }).catch(() => {
        console.log('click cancel')
        return
      })
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

    filterExperimentStatus(value, row) {
      return row.status === value
    },

    filterExperimentStage(value, row) {
      return row.stage === value
    },

    hideConfigCards() {

      this.showBoxConfig = false
      console.log('click hide box config ', this.showBoxConfig)
    },

    showConfigCards() {

      this.showBoxConfig = true
      console.log('click show box config ', this.showBoxConfig)
    },

    hideExperimentConfigCards() {

      this.showExperimentConfig = false
      console.log('click hide experiment detail', this.showExperimentConfig)
    },

    showExperimentConfigCards() {

      this.showExperimentConfig = true
      console.log('click show experiment detail, ', this.showExperimentConfig)
    },

    filterTestStatus(value, row) {
      return row.status === value
    }
  }
}
</script>

<style>
  /* .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  } */

  /* .el-aside {
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
  } */
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  /* .grid-content {
    border-radius: 4px;
    min-height: 36px;
  } */
  /* .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  } */
  .box-card {
    /* height: 300px; */
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
    margin-bottom: 20px;
  }
  .experiment-operation {
    /* font-size: 1.5rem; */
    float: right;
    height: 50px;
    /* background: #333; */
    margin-bottom: 20px;
    padding-top: 20px;
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

  .el-table__column-filter-trigger i {
    color: black;
    font-size: 20px;
    -webkit-transform: scale(.75);
    transform: scale(.75);
  }
</style>
