import Mock from 'mockjs'
import axios from 'axios'
const Proxy = '/api'

// get all test templates
// Mock.mock(`${Proxy}/tests/templates`, 'get', {
//   'code': 200,
//   'message': '',
//   'data|10': [{
//     'id|+1': 1,
//     'name': '@name',
//     'creator': 'yini',
//     'args': 'arg1',
//     'type': 'type1',
//     'create_time': '2017-10-17 10:27:23',
//     'update_time': '2017-10-17 10:27:23',
//     'desc': 'bank template',
//     'source': {
//       'binary_name': 'bank2',
//       'type': 'binary',
//       'url': 'http://pingcap-dev.hk.ufileos.com/buildbot/pingcap/octopus/7fbccc0cfb535c19247aca515d5ea42f424d46d7/centos7/case-octopus-bank2.tar.gz',
//       'git_value': '',
//       'image': 'image1',
//       'git_repo': 'git_repo'
//     },
//     'status': ['@name']
//   }]
// })

// // create a new test template
// Mock.mock(`${Proxy}/tests/templates`, 'post', {
//   'code': 200,
//   'message': '',
//   'data': [{
//     'name': '@name',
//     'creator': 'yini',
//     'args': 'arg23',
//     'type': 'type23',
//     'desc': 'bank template',
//     'source': {
//       'binary_name': 'bank2',
//       'type': 'binary',
//       'url': 'http://pingcap-dev.hk.ufileos.com/buildbot/pingcap/octopus/7fbccc0cfb535c19247aca515d5ea42f424d46d7/centos7/case-octopus-bank2.tar.gz',
//       'git_value': 'valu',
//       'image': 'image1',
//       'git_repo': 'git_repo'
//     }
//   }]
// })

// // get test template by Name
// Mock.mock(/\/api\/tests\/templates\/[\w-]+/, 'get', {
//   'code': 200,
//   'message': '',
//   'data': {
//     'id|+1': 1,
//     'name': 'Yiniyini',
//     'creator': 'yini',
//     'create_time': '2017-10-17 10:27:23',
//     'update_time': '2017-10-17 10:27:23',
//     'desc': 'bank template',
//     'args': '0624',
//     'type': 'type1',
//     'source': {
//       'binary_name': 'bank2',
//       'type': 'binary',
//       'url': 'http://pingcap-dev.hk.ufileos.com/buildbot/pingcap/octopus/7fbccc0cfb535c19247aca515d5ea42f424d46d7/centos7/case-octopus-bank2.tar.gz',
//       'git_value': 'gitvalue',
//       'image': 'image1',
//       'git_repo': 'git_repo'
//     },
//     'status': ['@name']
//   }
// })

// // update test template
// Mock.mock(/\/api\/tests\/templates\/[\w-]+/, 'put', {
//   'code': 200,
//   'message': '',
//   'data': {
//     'id|+1': 1,
//     'name': 'update test template',
//     'creator': 'yini',
//     'create_time': '2017-10-17 10:27:23',
//     'update_time': '2017-10-17 10:27:23',
//     'desc': 'bank template',
//     'args': '0624',
//     'type': 'type1',
//     'source': {
//       'binary_name': 'bank2',
//       'type': 'binary',
//       'url': 'http://pingcap-dev.hk.ufileos.com/buildbot/pingcap/octopus/7fbccc0cfb535c19247aca515d5ea42f424d46d7/centos7/case-octopus-bank2.tar.gz',
//       'git_value': 'gitvalue',
//       'image': 'image1',
//       'git_repo': 'git_repo'
//     },
//     'status': ['@name']
//   }
// })

// // create a new box
// Mock.mock(`${Proxy}/boxes`, 'post', {
//   'code': 200,
//   'message': '',
//   'data': {
//     'name': '@name',
//     'cat': {
//       'pdVer': 'hash:838f93c075f91df943470970f3d71b593004de5b',
//       'tikvVer': 'hash:27eedda83505d55914c912ae482c182f0e598da8',
//       'tidbVer': 'hash:3857ee60db755291ff2de1999ccb4ef9bc77af0f',
//       'pdSize': 1,
//       'tidbSize': 2,
//       'tikvSize': 3,
//       'configMap': 'this.newBoxForm.catForm.configMap'
//     },
//     'rules|1-3': [{
//       'type': 'type1',
//       'value': 'value1'
//     }],
//     'tests': [{
//       'in_order': true,
//       'tests|2-4': [{
//         'test': '@name'
//       }]
//     }],
//     'config': {
//       'slack': 'this.newBoxForm.miscConfigForm.slackChannel',
//       'prepare|1-2': [
//         '@name'
//       ],
//       'stop': [
//         '@name'
//       ],
//       'destory_tidb_cluster': false,
//       'type': 'type1',
//       'data': 'data1'
//     }
//   }
// })

// // get all box instances
// Mock.mock(`${Proxy}/boxes`, 'get', {
//   'code': 200,
//   'message': '',
//   'data|20': [{
//     'id|+1': 1,
//     'name': '@name',
//     'state': 'ONLINE',
//     'create_time': '2018-07-04 10:41:22',
//     'update_time': '2018-07-04 10:41:22',
//     'cat': {
//       'labels': 'label1',
//       'pd_ver': 'branch:release-1.0',
//       'tikv_ver': 'branch:release-1.0',
//       'tidb_ver': 'branch:release-1.0',
//       'pd_size': 1,
//       'tidb_size': 1,
//       'tikv_size': 3,
//       'config_map': 'tidb-cluster-config-template'
//     },
//     'rules': [{
//       'type': 'IMMEDIATELY',
//       'value': 'value1'
//     },
//     {
//       'type': 'IMMEDIATELY',
//       'value': 'value2'
//     },
//     {
//       'type': 'IMMEDIATELY',
//       'value': 'value3'
//     }],
//     'tests': {
//       'in_order': true,
//       'tests': [
//         'bank',
//         'test1',
//         'test2',
//         'test3'
//       ]
//     },
//     'config': {
//       'slack': '#schrodinger-alert',
//       'prepare': null,
//       'stop': null,
//       'destory_tidb_cluster': true,
//       'timeout': 604800000000000,
//       'type': '',
//       'data': ''
//     }
//   }]
// })

// // get experiments by box ID
// Mock.mock(/\/api\/boxes\/[\w-]+\/experiments/, 'get', {
//   'code': 200,
//   'message': '',
//   'data|11': [{
//     'id|+1': 1,
//     'name': '@name',
//     'status': 'Normal',
//     'stage': 'Running',
//     'state': 'ONLINE',
//     'create_time': '2018-07-04 10:41:22',
//     'update_time': '2018-07-04 10:41:22',
//     'cat': {
//       'labels': 'label1',
//       'pd_ver': 'branch:release-1.0',
//       'tikv_ver': 'branch:release-1.0',
//       'tidb_ver': 'branch:release-1.0',
//       'pd_size': 1,
//       'tidb_size': 1,
//       'tikv_size': 3,
//       'config_map': 'tidb-cluster-config-template'
//     },
//     'rules': [{
//       'type': 'IMMEDIATELY',
//       'value': 'value1'
//     },
//     {
//       'type': 'IMMEDIATELY',
//       'value': 'value2'
//     },
//     {
//       'type': 'IMMEDIATELY',
//       'value': 'value3'
//     }
//     ],
//     'tests': {
//       'in_order': false,
//       'tests': [
//         'bank',
//         'test1',
//         'test2',
//         'test3'
//       ]
//     },
//     'config': {
//       'slack': '#schrodinger-alert',
//       'prepare': null,
//       'stop': null,
//       'destory_tidb_cluster': true,
//       'timeout': 604800000000000,
//       'type': '',
//       'data': ''
//     }
//   }]
// })

// // get experiment detail by experiment Id
// Mock.mock(/\/api\/boxes\/[\w-]+\/experiments\/[\w-]+/, 'get', {
//   'code': 200,
//   'message': '',
//   'data': {
//     'id|+1': 1,
//     'name': 'stability-test',
//     'namespace': 'stability-test-15308673783-tests',
//     'box': 15308673782,
//     'create_time': '',
//     'update_time': '2018-07-06 16:56:18',
//     'status': '',
//     'stage': 'RUNNING',
//     'status_message': '',
//     'Config': {
//       'Cat': {
//         'labels': '',
//         'pd_ver': 'branch:release-1.0',
//         'tikv_ver': 'branch:release-1.0',
//         'tidb_ver': 'branch:release-1.0',
//         'pd_size': 1,
//         'tidb_size': 1,
//         'tikv_size': 3,
//         'config_map': 'tidb-cluster-config-template'
//       },
//       'Misc': {
//         'slack': '#schrodinger-alert',
//         'prepare': null,
//         'stop': null,
//         'destory_tidb_cluster': true,
//         'timeout': 604800000000000,
//         'type': '',
//         'data': ''
//       },
//       'Tests': {
//         'in_order': true,
//         'tests': [
//           'bank'
//         ]
//       }
//     },
//     'RunHash': null,
//     'cat': {
//       'labels': {

//       },
//       'id': 15308673784,
//       'create_time': '',
//       'update_time': '2018-07-06 16:58:34',
//       'namespace': 'stability-test-15308673783-tidb-cluster',
//       'pd_version': 'branch:release-1.0',
//       'tikv_version': 'branch:release-1.0',
//       'tidb_version': 'branch:release-1.0',
//       'run_hash': {
//         'pd_hash': 'hash:7c1c7fc0be18cc7271d9f8e75c97da0f9cce3b97:centos7',
//         'tikv_hash': 'hash:07d446df795bf8d673a55f8fa9da14919e7a1d25:unportable_centos7',
//         'tidb_hash': 'hash:23992db3d86d3f3a60f4613cea2985f1b4c9a003:centos7'
//       },
//       'pd': 1,
//       'tidb': 1,
//       'tikv': 3,
//       'config_map': 'tidb-cluster-config-template',
//       'stage': 'RUNNING',
//       'report': {
//         'id': 15308673784,
//         'namespace': 'stability-test-15308673783-tidb-cluster',
//         'stage': 'RUNNING',
//         'cluster': {
//           'pd_status': [{
//             'name': 'tidb-cluster-pd-5zrcc',
//             'pod_ip': '10.144.11.204',
//             'node_ip': '172.16.30.18',
//             'status': 'Running',
//             'image': '127.0.0.1:5001/pd:7c1c7fc-centos7',
//             'container_id': '250c270cf610e97f03d4a3a72a111319ed6f8b151b4f9b0360bc9bec18f8717c',
//             'log_addr': '/mnt/mfs/new_fluentd/2/50/250c270cf610e97f03d4a3a72a111319ed6f8b151b4f9b0360bc9bec18f8717c'
//           }],
//           'tidb_status': [{
//             'name': 'tidb-cluster-tidb-lwsn2',
//             'pod_ip': '10.144.12.128',
//             'node_ip': '172.16.30.19',
//             'status': 'Running',
//             'image': '127.0.0.1:5001/tidb:23992db-centos7',
//             'container_id': '6ef5becff203a149570d62ea07494d65c52591a9e3291f38bd48035bda7f266b',
//             'log_addr': '/mnt/mfs/new_fluentd/6/ef/6ef5becff203a149570d62ea07494d65c52591a9e3291f38bd48035bda7f266b'
//           }],
//           'tikv_status': [{
//             'name': 'tidb-cluster-tikv-b6kb6',
//             'pod_ip': '10.144.12.127',
//             'node_ip': '172.16.30.19',
//             'status': 'Running',
//             'image': '127.0.0.1:5001/tikv:07d446d-unportable_centos7',
//             'container_id': 'cdb3e20133fe0d03f0c546c6846b0135f8edb26803a85c7b565e17d594cef15b',
//             'log_addr': '/mnt/mfs/new_fluentd/c/db/cdb3e20133fe0d03f0c546c6846b0135f8edb26803a85c7b565e17d594cef15b'
//           },
//           {
//             'name': 'tidb-cluster-tikv-d7trn',
//             'pod_ip': '10.144.2.144',
//             'node_ip': '172.16.30.20',
//             'status': 'Running',
//             'image': '127.0.0.1:5001/tikv:07d446d-unportable_centos7',
//             'container_id': '87a72c0c58edb046904984d53d249d38dc723b18acfae272e7481867f8424c5f',
//             'log_addr': '/mnt/mfs/new_fluentd/8/7a/87a72c0c58edb046904984d53d249d38dc723b18acfae272e7481867f8424c5f'
//           },
//           {
//             'name': 'tidb-cluster-tikv-mjh6f',
//             'pod_ip': '10.144.0.137',
//             'node_ip': '172.16.30.16',
//             'status': 'Running',
//             'image': '127.0.0.1:5001/tikv:07d446d-unportable_centos7',
//             'container_id': 'c175827dff14e251b9c18ccbde98051a741d613e0463da07d191fd11fed6e613',
//             'log_addr': '/mnt/mfs/new_fluentd/c/17/c175827dff14e251b9c18ccbde98051a741d613e0463da07d191fd11fed6e613'
//           }
//           ],
//           'node_ip': [
//             '172.16.30.11',
//             '172.16.30.12',
//             '172.16.30.13',
//             '172.16.30.14',
//             '172.16.30.15',
//             '172.16.30.16',
//             '172.16.30.17',
//             '172.16.30.18',
//             '172.16.30.19',
//             '172.16.30.20',
//             '172.16.30.21',
//             '172.16.30.22',
//             '172.16.30.23',
//             '172.16.30.24',
//             '172.16.30.25'
//           ],
//           'tidb_service': {
//             'node_port': 32350,
//             'cluster_ip': '10.207.4.135',
//             'cluster_port': 4000
//           },
//           'prometheus_service': {
//             'node_port': 34864,
//             'cluster_ip': '10.200.34.201',
//             'cluster_port': 9090
//           },
//           'grafana_service': {
//             'node_port': 39271,
//             'cluster_ip': '10.195.150.57',
//             'cluster_port': 3000
//           }
//         },
//         'pd_ver': 'branch:release-1.0',
//         'tikv_ver': 'branch:release-1.0',
//         'tidb_ver': 'branch:release-1.0',
//         'pd_size': 1,
//         'tikv_size': 3,
//         'tidb_size': 1,
//         'run_hash': {
//           'pd_hash': 'hash:7c1c7fc0be18cc7271d9f8e75c97da0f9cce3b97:centos7',
//           'tikv_hash': 'hash:07d446df795bf8d673a55f8fa9da14919e7a1d25:unportable_centos7',
//           'tidb_hash': 'hash:23992db3d86d3f3a60f4613cea2985f1b4c9a003:centos7'
//         }
//       }
//     },
//     'tests|2': [{
//       'id|+1': 1,
//       'name': '@name',
//       'status': 'Abnormal',
//       'stage': 'Running',
//       'state': 'ONLINE',
//       'timeout': '0s'
//     }]
//   }
// })

// // manual trigger box
// Mock.mock(/\/api\/boxes\/[\w-]+\/trigger/, 'post', {
//   'code': 200,
//   'message': '',
//   'data': ''
// })

// // stop box
// Mock.mock(/\/api\/boxes\/[\w-]+\/stop/, 'post', {
//   'code': 200,
//   'message': '',
//   'data': ''
// })

// // delete box
// Mock.mock(/\/api\/boxes\/[\w-]+/, 'delete', {
//   'code': 200,
//   'message': '',
//   'data': ''
// })

class Ajax {
  getTestTemplate () {
    return axios.get(`${Proxy}/tests/templates`)
  }

  getTestTemplateDetailByName (testTemplateName) {
    return axios.get(`${Proxy}/tests/templates/${testTemplateName}`)
  }

  updateTestTemplate (testTemplateName, caseData) {
    return axios.put(`${Proxy}/tests/templates/${testTemplateName}`, caseData)
  }

  createTestTemplate (data) {
    return axios.post(`${Proxy}/tests/templates`, data)
  }

  deleteTestTemplateByName (testTemplateName) {
    return axios.delete(`$${Proxy}/tests/templates/${testTemplateName}`)
  }

  getBox () {
    return axios.get(`${Proxy}/boxes`)
  }

  createBox (boxData) {
    return axios.post(`${Proxy}/boxes`, boxData)
  }

  updateBoxByID (boxID, boxData) {
    return axios.put(`${Proxy}/boxes/${boxID}`, boxData)
  }

  deleteBoxByID (boxID) {
    return axios.delete(`${Proxy}/boxes/${boxID}`)
  }

  stopBoxByID (boxID) {
    return axios.post(`${Proxy}/boxes/${boxID}/stop`)
  }

  triggerBoxByID (boxID) {
    return axios.post(`${Proxy}/boxes/${boxID}/trigger`)
  }

  getBoxDetailByID (boxID) {
    return axios.get(`${Proxy}/boxes/${boxID}`)
  }

  getExperimentsByBoxID (boxID) {
    return axios.get(`${Proxy}/boxes/${boxID}/experiments`)
  }

  getExperimentsDetailByID (boxID, experimentID) {
    return axios.get(`${Proxy}/boxes/${boxID}/experiments/${experimentID}`)
  }

  stopExperimentByID (boxID, experimentID) {
    return axios.post(`${Proxy}/boxes/${boxID}/experiments/${experimentID}/stop`)
  }

  redoExperimentByID (boxID, experimentID) {
    return axios.post(`${Proxy}/boxes/${boxID}/experiments/${experimentID}/redo`)
  }

  getTestByID (boxID, experimentID) {
    return axios.get(`${Proxy}/boxes/${boxID}/experiments/${experimentID}/tests`)
  }

  getTestDetailByName (boxID, experimentID, testName) {
    return axios.get(`${Proxy}/boxes/${boxID}/experiments/${experimentID}/tests/${testName}`)
  }
}
export default new Ajax()
