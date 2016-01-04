var _ = require('lodash')
var es = require('../es')
var config = require('../../config')
var async = require('async-q')

/*
{
  "english" : {
  "name": "Kalachakra"
  },
  "french" : {
  "name": "le français"
  },
  "common" : {
  "location":"ladakh"
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
      }, 
      []
    )
    .flatten()
    .uniq()
    .compact()
    .value()

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

      return async.each(response.hits.hits, function(value) {
        console.log(value)
        return resolveJoins(value, config.searchEntities[value._type].joins)
      })
    })
    .then(function(res) {

      socket.emit("r-search.done", {
        message: "Successfully seached " + params.q,
        code: res.status || 204,
        params: params,
        res: res
      })
    }).catch(function(err) {

      socket.emit("r-search.error", {
        message: "Error in searching " + params.q,
        code: err.status || 500,
        error: err,
        params: params
      })
    })
}


function resolveJoins(doc, joins) {
  var mgetInstructions = []
  var joinFields = _.keys(joins)

  _.each(joinFields, function(joinField) {

    var toJoinValues = (_.isArray(doc.fields[joinField])) && doc.fields[joinField] || [doc.fields[joinField]]

    _.each(toJoinValues, function(id) {

      mgetInstructions.push({
        _index: joinField + 's',
        _type: joinField,
        _id: id,
        fields: joins[joinField].fields
      })

    })

    doc.fields[joinField] = []
  })

  return es.mget.agg({
      body: {
        docs: mgetInstructions
      }
    })
    .then(function(res) {

      _.each(res.docs, function(toJoinDoc) {
        doc.fields[toJoinDoc._type].push(toJoinDoc._source || toJoinDoc.fields)
      })

      return doc
    })
}
