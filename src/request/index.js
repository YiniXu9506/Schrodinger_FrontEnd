// import Mock from 'mockjs'
import axios from 'axios'
const Proxy = '/api'

class Ajax {
  getCreatedCase () {
    return axios.get(`${Proxy}/cases`)
  }

  getCreatedCaseDetailByID (caseID) {
    return axios.get(`${Proxy}/cases/${caseID}`)
  }

  updateCreatedCaseByID (caseID, caseData) {
    return axios.put(`${Proxy}/cases/${caseID}`, caseData)
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
