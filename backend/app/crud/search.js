var _ = require('lodash')
var es = require('../es')
var config = require('../../config')
var async = require('async-q')
var debug = require('debug')("search")

/*
  {
    "english" : {
    "name": "Kalachakra"
    },
    "french" : {
    "name": "le français"
    }
  }
*/


module.exports = function(params, socket) {
  var missingArgumentMessage
  if (!params.q) {
    missingArgumentMessage = "query missing"
  } else if (!params.lang) {
    missingArgumentMessage = "lang missing"
  }
  if (missingArgumentMessage) {
    socket.emit('r-entity.error', {
      message: "Illegal Argument Exception: " + missingArgumentMessage,
      code: 400
    })
  }
  var fields =
    _.chain(config.searchEntities)
    .reduce(
      function(result, value, prop) {

        if (value.fields) {
          result.push(value.fields);
        }
        var joinFields = _.toArray(_.keys(value.joins))
        result.push(joinFields)

        return result;
      }, []
    )
    .flatten()
    .uniq()
    .compact()
    .value()
    .map(function(value) {
      return params.lang + "." + value
    })


  debug(fields)
  var mustClauses = params.filters || []
  if (params.q) {
    mustClauses.push({
      query_string: {
        query: params.q
      }
    })
  }

  return es.search({

      index: _.keys(config.searchEntities).map(function(entityType) {

        debug("entityType:", entityType)
        return entityType + 's'
      }),

      type: _.keys(config.searchEntities),

      fields: fields,
      from: params.from || 0,
      size: params.size || 2,
      body: {
        query: {
          bool: {
            must: mustClauses
          }
        }
      }
    }).then(function(response) {

      debug("response:", JSON.stringify(response))
      return async.each(response.hits.hits, function(doc) {

        return require('../utils/resolveJoins')(doc, params.lang, require('../../common'))
      })
    })
    .then(function(res) {
      /**
            socket.emit("r-search.done", {
              message: "Successfully seached " + params.q,
              code: res.status || 204,
              params: params,
              res: res
            })
      **/
      debug(res, 'fff')
    }).catch(function(err) {
      debug(err, 'err')

      /**   socket.emit("r-search.error", {
           message: "Error in searching " + params.q,
           code: err.status || 500,
           error: err,
           params: params
         })
       })**/
    })
}

if (require.main === module) {
  module.exports({
      q: "kalchakra",
      lang: 'english',
      context: 'web.search'
    })
    .then(function(res) {
      debug(JSON.stringify(res))
    })
    .catch(debug)
}
