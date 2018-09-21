
import _ from 'lodash'
export const structWidgets = (widgets, additionalFields = []) => {
  return (widgets || []).map(widget => {
    const widgetData = _.pick(widget, ['id', 'key', 'name', 'model', ...additionalFields])
    return _.mapKeys(widgetData, (v, k) => (k === 'id' ? 'uuid' : k))
  })
}
export const getVideoId = (value) => {
  if ((value.indexOf('<embed') === 0 || value.indexOf('<iframe') === 0) && value.indexOf('vid=') !== -1) {
    try {
      let radioId = (value.split('vid=')[1]).split('&')[0]
      return radioId
    } catch (e) {
      return 'err'
    }
  } else if ((value.indexOf('http://') === 0 || value.indexOf('https://') === 0) && value.indexOf('.html') !== -1) {
    try {
      let radioId = ''
      var str = (value.split('.html')[0])
      let index = str.lastIndexOf('\/')
      radioId = str.substring(index + 1, str.length)
      return radioId
    } catch (e) {
      return 'err'
    }
  }
}