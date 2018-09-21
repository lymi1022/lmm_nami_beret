export const makeField = (type, label, defaultValue, obj) => {
  return {
    ...obj,
    label,
    default: defaultValue,
    type
  }
}
export const required = value => (value ? undefined : '{label}必填')

export const setFieldDefault = val => obj => {
  return {
    ...obj,
    default: val
  }
}
export const setValidators = (validators, override = false) => field => {
  return {
    ...field,
    validators: override ? validators : validators.concat(field.validators || [])
  }
}

export const makeOption = (value, name, template) => ({
  name: name || value,
  value,
  template,
})

const defaultOptions = [
  makeOption('1', '选项1'),
  makeOption('2', '选项2'),
]

const booleanOptions = [
  makeOption(true, '是'),
  makeOption(false, '否'),
]

export const isValidTenVideoUrl = msg => value => {
  if (value.indexOf('http://') === 0) {
    return
  }
  return msg
}
export const noEmptyOptionList = msg => value => {
  return value && value.every(v => {
    if (typeof v === 'string') {
      return v.length > 0
    }
    return v && v.value.length > 0 ? undefined : msg
  })
}

export const widgetFields = {
  makeOptions: (label, options, max = 10, enableChecked = false, min = 0) => {
    let options2 = options
    if (!options) {
      const defaultOptions = ['选项1', '选项2', '选项3', '选项4']
      options2 = enableChecked ? defaultOptions.map(item => {
        return {
          value: item,
          checked: false
        }
      }) : defaultOptions
    }
    return makeField('make-options', label, options2, {
      max,
      enableChecked,
      min,
    })
  },
  input: (label = '描述', rows = 1, hint) => {
    return makeField('input', label, '', {
      rows,
      hint,
    })
  },
  slide: (label = '滑块', max = 100, min = 1,  step = 1) => {
    if (max < min) {
      throw new Error('`max` should be greater than `min`!')
    }
    return makeField('slide', label, 0, {
      max,
      min,
      step,
    })
  },
  colorInput: (label = '颜色', defaultColor = '#ffffff') => {
    return makeField('color-input', label, defaultColor)
  },
  radio: (label = '单选', options = defaultOptions, style = 'circle') => {
    return makeField('radio', label, options[0].value, {
      options,
      style
    })
},
  booleanRadio: (label = '是否单选', defaultValue = booleanOptions[0].value) => makeField('radio', label, defaultValue, {
    options: booleanOptions
  })
  
}

