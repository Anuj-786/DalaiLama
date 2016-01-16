var debug = require('debug')('search')
var _ = require('lodash')
var async = require('async-q')

var es = require('../es')
var configs = require('../../../configs/index')
var fieldsToFetch = require('./fieldsToFetch')
var sanitize = require('./sanitizeEsResponse')

module.exports = function(params) {

  var toFetchFields = fieldsToFetch.forEntities(configs.entityTypes, params.context, params.lang)
  var mustClauses = params.filters || []
  if (params.q) {
    mustClauses.push({
      query_string: {
        query: params.q
      }
    })
  }

  return es.search({

      index: configs.entityTypes.map(function(entityType) {
        return entityType + 's'
      }),

      type: configs.entityTypes,

      fields: toFetchFields,
      from: params.from || 0,
      size: params.size || 2,
      body: {
        query: {
          bool: {
            must: mustClauses
          }
        }
      }
    }).then(function(res) {
      return async.each(res.hits.hits, function(doc) {
        sanitize(doc, params.lang)
        return require('../utils/resolveJoins')(doc, params.lang, params.context)
      })
    })
}

if (require.main === module) {

  module.exports({
      q: "kalachakra",
      lang: 'english',
      context: 'web.search'
    })
    .then(function(res) {
      debug(JSON.stringify(res))
    })
    .catch(debug)
}
