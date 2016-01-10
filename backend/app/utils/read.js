var debug = require('debug')('read')
var _ = require('lodash')

var es = require('../es')

var configs = require('../../../configs/index')
var readConfigs = _.get(configs, 'web.read')
var schema = _.get(configs, 'schema')
var fieldsToFetch = require('./fieldsToFetch')

module.exports = function(params) {

  var entitySchema = schema[params.type]
  var toFetchFields = fieldsToFetch.forEntity(params.type, params.context, params.lang)

  return es.get.agg({
      index: params.type + "s",
      type: params.type,
      id: params._id,
      fields: toFetchFields
    })
    .then(function(response) {

      if (response.fields) {
        _.keys(entitySchema).forEach(function(field) {

          if (!_.isArray(entitySchema[field].type)) {
            var fieldData = response.fields[field]
            if (fieldData) {
              response.fields[field] = fieldData[0]
            }
          }
        })
        unflatten(response.fields)
      }
      if (params.context) {
        return require('./resolveJoins')(
          response,
          params.lang,
          params.context
        )
      } else {
        return response
      }
    })
}

function unflatten(doc) {
  _.keys(doc).forEach(function(key) {
    var path = key.split('\.')
    var innerDoc = doc
    if (path.length > 1) {
      path.forEach(function(field, index) {
        if (!innerDoc[field]) {
          if (index < path.length - 1) {
            innerDoc[field] = {}
          } else {
            innerDoc[field] = doc[key]
            delete doc[key]
          }
        }
        innerDoc = innerDoc[field]
      })
    }
  })
}

if (require.main === module) {
  module.exports({
      type: "event",
      _id: "AVIhUbKyPPf_7Ds87q0K",
      lang: 'english',
      context: 'web.read'
    })
    .then(function(res) {
      debug(JSON.stringify(res))
    })
    .catch(debug)
}
