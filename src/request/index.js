import Mock from 'mockjs'
import axios from 'axios'
const Proxy = '/api'

// get all test templates
Mock.mock(`${Proxy}/tests/templates`, 'get', {
  'code': 200,
  'message': '',
  'data|2-6': [{
    'id|+1': 1,
    'name': '@name',
    'creator': 'yini',
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
    'args': '',
    'type': 'type1',
    'status': ['@name']
  }]
})

// create a new test template
Mock.mock(`${Proxy}/tests/templates`, 'post', {
  'status': 200,
  'message': '',
  'data': [{
    'name': '@name',
    'creator': 'yini',
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
    'args': '',
    'type': 'type1'
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
    'source': {
      'binary_name': 'bank2',
      'type': 'binary',
      'url': 'http://pingcap-dev.hk.ufileos.com/buildbot/pingcap/octopus/7fbccc0cfb535c19247aca515d5ea42f424d46d7/centos7/case-octopus-bank2.tar.gz',
      'git_value': '',
      'image': 'image1',
      'git_repo': 'git_repo'
    },
    'args': '',
    'type': 'type1',
    'status': ['@name']
  }
})

// create a new box
Mock.mock(`${Proxy}/boxes`, 'post', {
  'status': 200,
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
