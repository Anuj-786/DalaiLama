var _ = require('lodash')
var es = require('../es')
var config = require('../../config')
var async = require('async-q')

/*
async-q each method
search result config field joins.

es.seach, resolve join for the array, then emit.
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

  es.search({
      index: _.keys(config.searchEntities).map(function(entities) {
        return entities + 's'
      }),
      type: _.keys(config.searchEntities),
      fields: _.uniq(
        _.reduce(config.searchEntities, function(result, value, prop) {
          if (_.isArray(value.fields)) {
            result.push.apply(result, value.fields);
          }
          return result;
        }, [])
      ),
      body: {
        query: {
          query_string: {
            query: params.q
          }
        }
      }
    }).then(function(response) {
      var res = response.hits.hits
      return async.each(res, function(value, index) {
        console.log(value, index);
        console.log("resolving, joins", resolveJoins(value, config.searchEntities.event.joins))
      })
    })
    .then(function(res) {
      socket.emit("r-search.done", {
          message: "Successfully seached " + params.q,
          // code: res.status || 204,
          params: params,
          res: res
        })
        // console.log("res:failures", res._shards.failures);
    }).catch(function(err) {
      console.log(err)
      socket.emit("r-search.error", {
        message: "Error in searching " + params.q,
        // code: err.status || 500,
        error: err,
        params: params
      })
    })
}


function resolveJoins(doc, joins) {
  // console.log("\n doc:", doc, "\n joins:", joins);
  var mgetInstructions = []
  var joinFields = _.keys(joins)
  // console.log("\n joinFields", joinFields);

  _.each(joinFields, function(joinField) {
    // console.log("\n joinField", joinField)
    // console.log("\n isArray", _.isArray(doc[joinField]))
    // console.log("\n doc", doc, "\n docField", doc.fields[joinField])

    var toJoinValues = (_.isArray(doc.fields[joinField])) && doc.fields[joinField] || [doc.fields[joinField]]
    // console.log('\n tojoinvalues:', toJoinValues)
    _.each(toJoinValues, function(id) {
      // console.log('\n id', id, joinField + 's', joinField, id, joins[joinField].fields)
      mgetInstructions.push({
        _index: joinField + 's',
        _type: joinField,
        _id: id,
        fields: joins[joinField].fields
      })

    })

    doc.fields[joinField] = []
  })
  //console.log('\n mgetInstructions', mgetInstructions)
  return es.mget({
      body: {
        docs: mgetInstructions
      }
    })
    .then(function(res) {
      // console.log('/n res:', res.docs)
      _.each(res.docs, function(toJoinDoc) {
        // console.log('/n toJoinDoc', toJoinDoc)
        // console.log('/n doc', doc)
        doc.fields[toJoinDoc._type].push(toJoinDoc._source || toJoinDoc.fields)
      })
      console.log('final doc:', doc);
      return doc
    })
}
