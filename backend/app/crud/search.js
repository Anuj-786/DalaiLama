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
      return async.each(response.hits.hits, function(value) {

        debug("values:", value)
        return resolveJoins(value, config.searchEntities[value._type].joins, params.lang)
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


function resolveJoins(doc, joins, lang) {
  debug("joins", joins)

  var mgetInstructions = []
  var joinFields = _.keys(joins).map(function(value) {
    return lang + "." + value
  })

  _.each(joinFields, function(joinField) {

    debug("joinField:", joinField)

    var toJoinValues = (_.isArray(doc.fields[joinField])) && doc.fields[joinField] || [doc.fields[joinField]]
    var toJoinFieldFields = joins[_.last(joinField.split('.'))].fields

    if (toJoinFieldFields) {
      toJoinFieldFields = toJoinFieldFields.map(function(toJoinFieldField) {
        return lang + "." + toJoinFieldField
      })
    }

    debug("toJoinValues:", toJoinValues)
    debug("joinField:", joinField)

    _.each(toJoinValues, function(id) {

      mgetInstructions.push({
        _index: _.last(joinField.split('.')) + 's',
        _type: _.last(joinField.split('.')),
        _id: id,
        fields: toJoinFieldFields
      })

    })

    doc.fields[joinField] = []
  })

  debug("mgetInstructions2:", mgetInstructions)

  return es.mget.agg({
      body: {
        docs: mgetInstructions
      }
    })
    .then(function(res) {
      debug("res", JSON.stringify(res))

      _.each(res.docs, function(toJoinDoc) {
        debug("doc:", doc.fields, "toJoinDoc", JSON.stringify(toJoinDoc.fields))
        doc.fields[lang + "." + toJoinDoc._type].push(toJoinDoc._source || toJoinDoc.fields)
      })

      return doc
    })
}
