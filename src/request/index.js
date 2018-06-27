import Mock from 'mockjs'
import axios from 'axios'
const Proxy = '/api'

Mock.mock(`${Proxy}/tests/templates`, 'get', {
  'code': 200,
  'message': '',
  'data|5-10': [{
    'id|+1': 1,
    'name': '@name',
    'creator': 'yini',
    'create_time': '2017-10-17 10:27:23',
    'update_time': '2017-10-17 10:27:23',
    'desc': 'bank template',
    'type': 'test case',
    'source': {
      'binary_name': 'bank2',
      'type': 'binary',
      'url': 'http://pingcap-dev.hk.ufileos.com/buildbot/pingcap/octopus/7fbccc0cfb535c19247aca515d5ea42f424d46d7/centos7/case-octopus-bank2.tar.gz',
      'git_value': ''
    },
    'args': ''
  }]
})

Mock.mock(`${Proxy}/tests/templates`, 'post', {
  'status': 200,
  'message': '',
  'data': {
    'id': 10,
    'name': 'bank2',
    'creator': 'cwen',
    'create_time': '2017-10-17 10:27:23',
    'update_time': '2017-10-17 10:27:23',
    'desc': 'bank template',
    'type': 'test case',
    'source': {
      'binaryname': 'bank2',
      'type': 'binary',
      'url': 'http://pingcap-dev.hk.ufileos.com/buildbot/pingcap/octopus/7fbccc0cfb535c19247aca515d5ea42f424d46d7/centos7/case-octopus-bank2.tar.gz',
      'git_value': ''
    },
    'args': ''
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
    return axios.post(`${Proxy}/tests/templates/`)
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
