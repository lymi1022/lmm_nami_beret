import genId from '@/utils/guid'
export class Widget {
  static mergeModel = (obj1, obj2) => {
    return _.mergeWith(obj1, obj2, (objVal, srcVal) => {
      if (_.isArray(srcVal)) {
        return srcVal
      }
    })
  }
  constructor(model) {
    this.model = model
    this.id = (model && model.id) || genId()
    this.displayName = ''
    this.icon = ''
    this.errors = {}

    if (model) {
      delete this.model.id
    }
  }

  // model中的值是从fields中去除来的key和default组成的值
  initModel() {
    const defaultModel = _.mapValues(this.fields, val => {
      return val.default
    })
    const initModel = Widget.mergeModel(defaultModel, this.model)
    this.model = initModel
  }

  setFields(fields, group) {
    this.fields = {
      ...this.fields,
      ..._.mapValues(fields, field => {
        return {
          ...field,
          group,
        }
      }),
    }
  }

  setContentFields(fields) {
    this.setFields(fields, 'content')
  }

  setStyleFields(fields) {
    this.setFields(fields, 'style')
  }
}

class PageWidget extends Widget {
  constructor(model) {
    super(model)
    this.group = 'page'
    this.type = 'component'
  }
}

export class Title extends PageWidget {

  static displayName = '标题'
  static icon = 'title'

  constructor(model) {
    super(model)
    this.displayName = Title.displayName
    this.icon = Title.icon
    this.setContentFields({
      title: {label:'标题', type: 'input'},
      subTitle: {label: '副标题', type: 'input'}
    })
    this.setStyleFields({
      titleSize: {label:'标题大小', default: 22, max: 50, min: 14, type: 'slide'},
      subTitleSize: {label:'副标题大小', default: 18, max: 50, min: 14, type: 'slide'},
      titleColor: {label: '标题颜色', default: 'rgba(51, 51, 51, 1)', type: 'color-input' }
    })
    this.name = Title.name
    this.initModel()
  }
}

export class Video extends PageWidget {

  static displayName = '视频组件'
  static icon = 'video'

  constructor(model) {
    super(model)
    this.displayName = Video.displayName
    this.icon = Video.icon
    this.setContentFields({
      videoUrl: {label: '视频地址', type: 'input'}
    })
    this.name = Video.name
    this.initModel()
  }
}




