import _ from 'lodash'
export const setLocalAuth = (data) => {
  _.forEach(data, (value, key) => {
    if (typeof value === 'boolean') {
      sessionStorage.setItem(key, value ? '1' : '0')
    } else if (typeof value === 'object') {
      try {
        sessionStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.log(error)
      }
    } else {
      sessionStorage.setItem(key, value)
    }
  })
}

export const getLocalAuth = () => {
  const dataType = {
    emp: 'boolean',
    gmp: 'boolean',
    free: 'boolean',
    type: 'raw',
    permissions: 'object'
  }
  return _.mapValues(sessionStorage, (raw, key) => {
    const type = dataType[key]
    switch (type) {
      case 'boolean':
        return raw === '1'
      case 'object':
        return JSON.parse(raw)
      case 'raw':
      default:
        return raw
    }
  })
}