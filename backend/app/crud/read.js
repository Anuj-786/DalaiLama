var debug = require('debug')('read')
var _ = require('lodash')

var es = require('../es')
var resolveJoins = require('./resolveJoins')
var entityConfigs = require('../../../common/index')

var crudRead = function(params, socket) {
  var missingArgumentMessage
  if (!params._id) {
    missingArgumentMessage = "_id missing"
  } else if (!params.type) {
    missingArgumentMessage = "type missing"
  }
  if (missingArgumentMessage) {
    socket.emit('r-entity.error', {
      message: "Illegal Argument Exception: " + missingArgumentMessage,
      code: 400
    })
  }

  return read(params)
    .then(function(res) {
      socket.emit("r-entity.done", {
        message: "Successfully read " + params.type,
        code: 200,
        body: res,
        params: params
      })
    })
    .catch(function(err) {
      socket.emit("r-entity.error", {
        message: "Error in reading " + params.type,
        code: 500,
        err: err,
        params: params
      })
      return err
    })
}


var read = function(params) {
  var toFetchFields = params.fields
  if (toFetchFields && params.joins) {

    //DO union of joins and fields
    var toJoinFields = _.pluck(params.joins, 'fieldName')
    toFetchFields = toFetchFields.concat(toJoinFields)

  }
  //Add language prefix to fields
  var entityConfig = entityConfigs[params.type]

  toFetchFields = toFetchFields.map(function(field) {
    if (entityConfig[field][params.lang]) {

      return params.lang + '.' + field

    } else {

      return field

    }

  })

  debug(toFetchFields, params.type)
  return es.get.agg({
      index: params.type + "s",
      type: params.type,
      id: params._id,
      fields: toFetchFields
    })
    .then(function(response) {
      if (response.fields) {
        _.keys(response.fields).forEach(function(field) {
          if (!_.isArray(entityConfigs[params.type].type)) {
            response.fields[field] = response.fields[field][0]
          }
        })
        unflatten(response.fields)
      }
      if (params.joins) {
        return resolveJoins(
          response._source || response.fields,
          params.joins,
          entityConfigs[params.type],
          params.lang
        )
      } else {
        return response.fields || response._source
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

module.exports.read = read
module.exports.crudRead = crudRead

if (require.main === module) {
  read({
      type: "event",
      _id: "AVIhUbKyPPf_7Ds87q0K",
      lang: 'english',
      fields: ['title', 'description', 'startingDate', 'endingDate', 'keywords'],
      primaryField: 'title',
      joins: [{
        fieldName: 'sessions',
        fields: ["title"],
        primaryField: 'title'
      }, {
        fieldName: 'speakers',
        fields: ['type', 'language'],
        primaryField: 'person',
        joins: [{
          fieldName: 'person',
          fields: ["name"]
        }]
      }]
    })
    .then(function(res) {
      debug(JSON.stringify(res))
    })
    .catch(debug)
}
