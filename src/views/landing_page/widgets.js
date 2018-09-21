import genId from '@/utils/guid'
import { widgetFields, setFieldDefault, setValidators, isValidTenVideoUrl, makeOptions,noEmptyOptionList, required, booleanRadio, isValidTenVideoUrl1 } from './widget_fields'
const inputFontSizeL = label => setFieldDefault(22)(widgetFields.slide(label, 50, 14))
const inputFontSizeM = label => setFieldDefault(16)(widgetFields.slide(label, 50, 14))
const defaultTextColor = 'rgba(51,51,51,1)'
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
  validateField(fieldKey) {
    let field = this.fields[fieldKey]
    if (field.validators && field.validators.length > 0) {
      const fieldErrs = field.validators.reduce((allErrors, validator) => {
        const err = validator(this.model[fieldKey])
        if (err) {
          return allErrors.concat(err)
        }
        return allErrors
      }, [])
      return fieldErrs.length > 0 ? fieldErrs : undefined
    }
    return undefined
  }

  validate() {
    const results = _
      .map(this.fields, (f, key) => {
        // todo: use validateField
        if (f.validators && f.validators.length > 0) {
          const fieldErrs = f.validators.reduce((allErrors, validator) => {
            const err = validator(this.model[key])
            if (err) {
              return allErrors.concat(err)
            }
            return allErrors
          }, [])
          return {
            key,
            errors: fieldErrs
          }
        }
        return false
      })
      .filter(f => {
        if (f && f.errors.length > 0) {
          return true
        }
        return false
      })
      .reduce((errorsObj, f) => {
        return {
          ...errorsObj,
          [f.key]: f.errors
        }
      }, {})
    return _.isEmpty(results) ? undefined : results
  }
  // model中的值是从fields中去除来的key和default组成的值
  initModel() {
    const defaultModel = _.mapValues(this.fields, val => {
      return val.default
    })
    // key: default
    // console.log(defaultModel);// {title: "", subTitle: "", titleSize: 22, subTitleSize: 16, titleColor: "rgba(51,51,51,1)"}
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
      title: widgetFields.input('标题'),
      subTitle: widgetFields.input('副标题')
    })
    this.setStyleFields({
      titleSize: inputFontSizeL('标题大小'),
      subTitleSize: inputFontSizeM('副标题大小'),
      titleColor: widgetFields.colorInput('标题颜色', defaultTextColor),
    })
    this.name = Title.name
    this.initModel()
  }
}
// setValidators的第二个参数是true或false：true => 覆盖原有的校验器，例如购买记录名称input中的validators被覆盖成2000
export class Video extends PageWidget {

  static displayName = '视频组件'
  static icon = 'video'

  constructor(model) {
    super(model)
    this.displayName = Video.displayName
    this.icon = Video.icon
    this.setContentFields({
      videoUrl: setValidators([isValidTenVideoUrl('{label}无效，请上传正确的地址后提交')], true)(widgetFields.input('视频地址'))
    })
    this.name = Video.name
    this.initModel()
  }
}
class FormWidget extends Widget {
  constructor(model) {
    super(model)
    this.group = 'form'
    this.type = 'formElement'
  }
}
export class Select extends FormWidget {
  constructor(data, {key, label, multi}) {
    super(data)
    this.setContentFields({
      label: setValidators([required])(setFieldDefault(label)(widgetFields.input('标签名'))),
      subLabel: widgetFields.input('副标题'),
      required: widgetFields.booleanRadio('是否必填'),
      options: setValidators([noEmptyOptionList('所设选项不能为空')])(widgetFields.makeOptions(undefined, undefined, undefined, !multi)),
      layoutCols: setFieldDefault('2')(widgetFields.radio('排列方式',[{
        name: '一行一个',
        value: '1',
      }, {
        name: '一行两个',
        value: '2',
      }])),
    })
    this.key = key
    this.multi = multi
    this.type = 'Select'
    this.initModel()
  }
}

export class SinglePic extends Select {

  static displayName = '单选图片'
  static icon = 'title'

  constructor(data, key="singlePic") {
    super(data, {
      label: '单选图片',
      key,
      multi: false
    })
    this.displayName = SinglePic.displayName
    this.icon  = SinglePic.icon
    this.name = SinglePic.name
  }
}




