import _ from 'lodash'

export default function submitWithVersionCheck(vm, apiFn, updateVersionFn, successMsg, showError = true) {
  return apiFn()
    .then(val => {
      vm.$message({
        showClose: true,
        message: successMsg || '保存成功',
        type: 'success'
      })
      if (!val || !val.version) {
        console.warn('响应数据未包含更新后的 version!')
      } else {
        updateVersionFn(val.version)
      }
      return val
    })
    .catch(errs => {
      const versionErr = _.find(errs, {
        key: 'version'
      })
      if (versionErr) {
        return vm.$confirm(versionErr.message, '提示', {
          type: 'warning'
        })
          .then(() => {
            updateVersionFn(versionErr.value)
            submitWithVersionCheck(vm, apiFn, updateVersionFn)
            return Promise.resolve()
          })
      } else {
        if (showError) {
          vm.$message({
            showClose: true,
            message: _.get(errs, '[0].message') || '发生未知 API 错误！',
            type: 'error'
          })
        }
        return Promise.reject(errs)
      }
    })
}
