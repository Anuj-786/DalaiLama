var debug = require('debug')('read')
var _ = require('lodash')
var async = require('async-q')
var Q = require('q')

var es = require('../es')
var read = require('./read')
var entityConfigs = require('../../../common/index')  

module.exports = function(doc, joins, entityConfig, lang) {
  return async.each(joins, function(joinField) {

      var toJoinFieldName = joinField.fieldName
      var fieldTypeInfo = entityConfig[toJoinFieldName].type
      var fieldType = _.isArray(fieldTypeInfo) && fieldTypeInfo[0] || fieldTypeInfo

      var toJoinIds = doc[toJoinFieldName]
      if (!toJoinIds) {
        return Q()
      }
      toJoinIds = (_.isArray(toJoinIds) && toJoinIds) || [toJoinIds]

      //Resetting the joinField value doc
      if (_.isArray(fieldTypeInfo)) {
        doc[toJoinFieldName] = []
      } //Else let it be. It will be replaced with joined Doc

      //we will replace array of ids with their respective documents
      return async.each(toJoinIds, function(id) {
          return read.read({
            type: fieldType,
            _id: id,
            fields: joinField.fields,
            joins: joinField.joins,
            lang: lang
          })
        })
        .then(function(toJoinDocs) {

          if (_.isArray(fieldTypeInfo)) {
            _.each(toJoinDocs, function(toJoinDoc) {
              doc[toJoinFieldName].push(toJoinDoc)
            })
          } else {
            doc[toJoinFieldName] = toJoinDocs[0]
          }
        })
    })
    .then(function() {
      return doc
    })
}