var _ = require('lodash')
var moment = require('moment')
var configs = require('../../../../configs/')

module.exports = function(entityType, data, lang) {
  var entitySchema = configs.schema[entityType]
  var formSchema = {}

  _.keys(entitySchema).forEach(function(key) {

    var fieldSchema  = entitySchema[key] 
    var fieldType = _.isArray(fieldSchema.type) && fieldSchema.type[0] || fieldSchema.type

    if (configs.schema[fieldType]) {
      return
    }

    formSchema[key] = {
      type: fieldSchema.type,
      label: fieldSchema[lang] && fieldSchema[lang].label || fieldSchema.label,
      defaultValue: getDefaultValue(key, fieldSchema, lang, data), 
      isRequired: fieldSchema.isRequired
    }

    var enums = fieldSchema.enum || fieldSchema[lang] && fieldSchema[lang].enum
    if (enums){
      formSchema[key].enum =  enums
    }
    
    if(fieldSchema.multiline) {

      formSchema[key].multiline = fieldSchema.multiline
      
    }

  })
  console.log(formSchema)
  return formSchema
}

function getDefaultValue(field, fieldSchema, lang, data) {
  
  if (fieldSchema[lang]) {
    field = lang + '.' + field
  }

  var defaultValueIndicator = fieldSchema[lang] && fieldSchema[lang].defaultValue || fieldSchema.defaultValue

  var defaultValue

  if (defaultValueIndicator) {
    if (defaultValueIndicator.indexOf('\*') === 0) {
      defaultValue = data && _.get(data, defaultValueIndicator.substring(1))
    } else {
      defaultValue = defaultValueIndicator
    }
    
  } else {
    defaultValue = data && _.get(data, field)  
  }
  if (defaultValue && fieldSchema.type === Date) {
    defaultValue = moment(defaultValue).toDate()
  }

  if(!defaultValue && _.isArray(fieldSchema.type)) {
    defaultValue = []
  }
  return defaultValue
}
