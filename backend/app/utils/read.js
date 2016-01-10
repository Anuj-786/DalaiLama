var debug = require('debug')('read')
var _ = require('lodash')

var es = require('../es')
var configs = require('../../../configs/index')
var fieldsToFetch = require('./fieldsToFetch')
var sanitize = require('./sanitizeEsResponse')

var readConfigs = _.get(configs, 'web.read')
var schema = _.get(configs, 'schema')

module.exports = function(params) {

  var entitySchema = schema[params.type]
  var toFetchFields = fieldsToFetch.forEntity(params.type, params.context, params.lang)

  debug('toFetchFields', toFetchFields)
  return es.get.agg({
      index: params.type + "s",
      type: params.type,
      id: params._id,
      fields: toFetchFields
    })
    .then(function(esDoc) {
      sanitize(esDoc, params.lang)

      if (params.context) {
        return require('./resolveJoins')(
          esDoc,
          params.lang,
          params.context
        )
      } else {
        return esDoc
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
