import Mock from 'mockjs'
import axios from 'axios'
const Proxy = '/api'

Mock.mock(`${Proxy}/cases`, 'get', {
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

Mock.mock(`${Proxy}/cases`, 'post', {
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
  getCreatedCase () {
    return axios.get(`${Proxy}/cases`)
  }

  getCreatedCaseDetailByID (caseID) {
    return axios.get(`${Proxy}/cases/${caseID}`)
  }

  updateCreatedCase (caseData) {
    return axios.put(`${Proxy}/cases`, caseData)
  }

  createCase () {
    return axios.post(`${Proxy}/cases`)
  }

  deleteCreatedCaseByID (caseID) {
    return axios.delete(`$${Proxy}/cases/${caseID}`)
  }

  createBox (boxData) {
    return axios.post(`${Proxy}/boxes`, boxData)
  }

  updateBoxByID (boxID, boxData) {
    return axios.put(`${Proxy}/boxes/${boxID}`, boxData)
  }

  stopBoxByID (boxID) {
    return axios.post(`${Proxy}/boxes/${boxID}/stop`)
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

  replayExperimentByID (boxID, experimentID) {
    return axios.post(`${Proxy}/boxes/${boxID}/experiments/${experimentID}/replay`)
  }

  getTestByID (boxID, experimentID) {
    return axios.get(`${Proxy}/boxes/${boxID}/experiments/${experimentID}/tests`)
  }

  getTestDetailByID (boxID, experimentID, testID) {
    return axios.get(`${Proxy}/boxes/${boxID}/experiments/${experimentID}/tests/${testID}`)
  }
}
export default new Ajax()
