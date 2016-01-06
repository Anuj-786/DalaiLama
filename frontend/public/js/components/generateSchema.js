var _ = require('lodash')
var moment = require('moment')

module.exports = function(config, data, lang, enumValues) {
  var schema = {}

  _.keys(config).map(function(key) {
    schema[key] = {
      type: config[key].type,
      label: config[key][lang].label,
      defaultValue: config[key].enum && data[key] && enumValues[key].indexOf(_.get(data, (config[key].enum).replace('*', ''))) || '' || config[key].type === Date && data[key] && moment(_.get(data, (config[key].defaultValue).replace('*', ''))).toDate() || '' || _.get(data, config[key].defaultValue && (config[key].defaultValue).replace('*', '') || (config[key][lang].defaultValue).replace('*', '')) || data[key] || _.isArray(config[key].type) && [] || '',
      isRequired: config[key].isRequired
    }

    if(config[key].enum) {
    
      schema[key].enum = _.get(enumValues, (config[key].enum).replace('*', ''))

    }
    
    if(config[key].multiline) {

      schema[key].multiline = config[key].multiline
      
    }

  })
  console.log(schema)
  return schema
}
