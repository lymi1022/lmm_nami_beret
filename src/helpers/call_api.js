import axios from 'axios'
import Vue from 'vue'
import getAPIRoot from './get_api_root'
import getToken from './get_took'
import qs from 'qs'
import _ from 'lodash'
const vm = new Vue()
const API_ROOT = getAPIRoot()
const callApi = (url, config = {}) => {
  const uri = (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) ? url : API_ROOT + url
  const data = config && config.data && (config.useJson ? config.data : qs.stringify(config.data))
    // 发送 POST 请求
    const _config = {
    method: 'get',
    showError: true,
    url: uri,
    ...config,
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'application/x-www-form-urlencoded',
      ...config.headers
    },
    data,
  }
  const { showError } = config
  const promise = axios(_config).then(result => {
    const body = result.data
    if (result.status === 200) {
      if (!_.isEmpty(body.errors)) {
        const noLoginError = _.find(body.errors, { code: 1000 })
        const tokenExpiredError = _.find(body.errors, { code: 1002 })
        const notFoundError = _.find(body.errors, { code: 1003 })
        if (noLoginError || tokenExpiredError) {
          window.location.href = '/#/login'
        } else if (notFoundError) {
          window.location.href = '/#/404'
        } else {
          return Promise.reject(body)
        }
      }
      return body.data || body
    }
      return Promise.reject(body)
    }).catch(err => {
      const errList = (!_.isEmpty(err.errors) ? err.errors : [err])
      if (showError && errList[0].code !== 1000 && errList[0].code !== 1002) {
        vm.$message({
          message: _.get(errList, '[0].message') || '发送未知 API 错误！',
          type: 'error'
        })
      }
      return Promise.reject(errList)
    })
  return promise
}
export default callApi