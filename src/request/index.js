import Mock from 'mockjs'
import axios from 'axios'
const Proxy = '/api'

// get all test templates
Mock.mock(`${Proxy}/tests/templates`, 'get', {
  'code': 200,
  'message': '',
  'data|10': [{
    'id|+1': 1,
    'name': '@name',
    'creator': 'yini',
    'args': 'arg1',
    'type': 'type1',
    'create_time': '2017-10-17 10:27:23',
    'update_time': '2017-10-17 10:27:23',
    'desc': 'bank template',
    'source': {
      'binary_name': 'bank2',
      'type': 'binary',
      'url': 'http://pingcap-dev.hk.ufileos.com/buildbot/pingcap/octopus/7fbccc0cfb535c19247aca515d5ea42f424d46d7/centos7/case-octopus-bank2.tar.gz',
      'git_value': '',
      'image': 'image1',
      'git_repo': 'git_repo'
    },
    'status': ['@name']
  }]
})

// create a new test template
Mock.mock(`${Proxy}/tests/templates`, 'post', {
  'code': 200,
  'message': '',
  'data': [{
    'name': '@name',
    'creator': 'yini',
    'args': 'arg23',
    'type': 'type23',
    'desc': 'bank template',
    'source': {
      'binary_name': 'bank2',
      'type': 'binary',
      'url': 'http://pingcap-dev.hk.ufileos.com/buildbot/pingcap/octopus/7fbccc0cfb535c19247aca515d5ea42f424d46d7/centos7/case-octopus-bank2.tar.gz',
      'git_value': '',
      'image': 'image1',
      'git_repo': 'git_repo'
    }
  }]
})

// get test template by Name
Mock.mock(/\/api\/tests\/templates\/[\w-]+/, 'get', {
  'code': 200,
  'message': '',
  'data': {
    'id': 1,
    'name': '@name',
    'creator': 'yini',
    'create_time': '2017-10-17 10:27:23',
    'update_time': '2017-10-17 10:27:23',
    'desc': 'bank template',
    'args': '0624',
    'type': 'type1',
    'source': {
      'binary_name': 'bank2',
      'type': 'binary',
      'url': 'http://pingcap-dev.hk.ufileos.com/buildbot/pingcap/octopus/7fbccc0cfb535c19247aca515d5ea42f424d46d7/centos7/case-octopus-bank2.tar.gz',
      'git_value': 'gitvalue',
      'image': 'image1',
      'git_repo': 'git_repo'
    },
    'status': ['@name']
  }
})

// create a new box
Mock.mock(`${Proxy}/boxes`, 'post', {
  'code': 200,
  'message': '',
  'data': {
    'name': 'box1',
    'cat': {
      'pdVer': 'hash:838f93c075f91df943470970f3d71b593004de5b',
      'tikvVer': 'hash:27eedda83505d55914c912ae482c182f0e598da8',
      'tidbVer': 'hash:3857ee60db755291ff2de1999ccb4ef9bc77af0f',
      'pdSize': 1,
      'tidbSize': 2,
      'tikvSize': 3,
      'configMap': 'this.newBoxForm.catForm.configMap'
    },
    'rules|1-3': [{
      'type': 'type1',
      'value': 'value1'
    }],
    'tests': [{
      'in_order': true,
      'tests|2-4': [{
        'test': '@name'
      }]
    }],
    'config': {
      'slack': 'this.newBoxForm.miscConfigForm.slackChannel',
      'prepare|1-2': [
        '@name'
      ],
      'stop': [
        '@name'
      ],
      'destory_tidb_cluster': false,
      'type': 'type1',
      'data': 'data1'
    }
  }
})

// get all box instances
Mock.mock(`${Proxy}/boxes`, 'get', {
  'code': 200,
  'message': '',
  'data|20': [{
    'id': 15306720822,
    'name': '@name',
    'state': 'ONLINE',
    'create_time': '2018-07-04 10:41:22',
    'update_time': '2018-07-04 10:41:22',
    'cat': {
      'labels': 'label1',
      'pd_ver': 'branch:release-1.0',
      'tikv_ver': 'branch:release-1.0',
      'tidb_ver': 'branch:release-1.0',
      'pd_size': 1,
      'tidb_size': 1,
      'tikv_size': 3,
      'config_map': 'tidb-cluster-config-template'
    },
    'rules': [{
      'type': 'IMMEDIATELY',
      'value': 'value1'
    },
    {
      'type': 'IMMEDIATELY',
      'value': 'value2'
    },
    {
      'type': 'IMMEDIATELY',
      'value': 'value3'
    }],
    'tests': {
      'in_order': false,
      'tests': [
        'bank',
        'test1',
        'test2',
        'test3'
      ]
    },
    'config': {
      'slack': '#schrodinger-alert',
      'prepare': null,
      'stop': null,
      'destory_tidb_cluster': true,
      'timeout': 604800000000000,
      'type': '',
      'data': ''
    }
  }]
})

// get experiments by box ID
Mock.mock(/\/api\/boxes\/[\w-]+\/experiments/, 'get', {
  'code': 200,
  'message': '',
  'data|11': [{
    'id': 15306720822,
    'name': '@name',
    'status': 'Normal',
    'stage': 'Running',
    'state': 'ONLINE',
    'create_time': '2018-07-04 10:41:22',
    'update_time': '2018-07-04 10:41:22',
    'cat': {
      'labels': 'label1',
      'pd_ver': 'branch:release-1.0',
      'tikv_ver': 'branch:release-1.0',
      'tidb_ver': 'branch:release-1.0',
      'pd_size': 1,
      'tidb_size': 1,
      'tikv_size': 3,
      'config_map': 'tidb-cluster-config-template'
    },
    'rules': [{
      'type': 'IMMEDIATELY',
      'value': 'value1'
    },
    {
      'type': 'IMMEDIATELY',
      'value': 'value2'
    },
    {
      'type': 'IMMEDIATELY',
      'value': 'value3'
    }
    ],
    'tests': {
      'in_order': false,
      'tests': [
        'bank',
        'test1',
        'test2',
        'test3'
      ]
    },
    'config': {
      'slack': '#schrodinger-alert',
      'prepare': null,
      'stop': null,
      'destory_tidb_cluster': true,
      'timeout': 604800000000000,
      'type': '',
      'data': ''
    }
  }]
})

// get experiment detail by experiment Id
Mock.mock(/\/api\/boxes\/[\w-]+\/experiments\/[\w-]+/, 'get', {
  'code': 200,
  'message': '',
  'data': [{
    'id': 15306720822,
    'name': '@name',
    'status': 'Normal',
    'stage': 'Running',
    'state': 'ONLINE',
    'create_time': '2018-07-04 10:41:22',
    'update_time': '2018-07-04 10:41:22',
    'cat': {
      'labels': 'label1',
      'pd_ver': 'branch:release-1.0',
      'tikv_ver': 'branch:release-1.0',
      'tidb_ver': 'branch:release-1.0',
      'pd_size': 1,
      'tidb_size': 1,
      'tikv_size': 3,
      'config_map': 'tidb-cluster-config-template'
    },
    'rules': [{
      'type': 'IMMEDIATELY',
      'value': 'value1'
    },
    {
      'type': 'IMMEDIATELY',
      'value': 'value2'
    },
    {
      'type': 'IMMEDIATELY',
      'value': 'value3'
    }
    ],
    'tests': {
      'in_order': false,
      'tests': [
        'bank',
        'test1',
        'test2',
        'test3'
      ]
    },
    'config': {
      'slack': '#schrodinger-alert',
      'prepare': null,
      'stop': null,
      'destory_tidb_cluster': true,
      'timeout': 604800000000000,
      'type': '',
      'data': ''
    }
  }]
})

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

  createTestTemplate () {
    return axios.post(`${Proxy}/tests/templates`)
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
