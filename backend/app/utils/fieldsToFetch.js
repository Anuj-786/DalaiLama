var _ = require('lodash')
var debug = require('debug')('fieldsToFetch')
var configs = require('../../../configs')

function forEntities(entityTypes, context, lang) {
  return _.chain(entityTypes)
    .reduce(function(soFar, entityType) {
      soFar.push(fieldsForEntity(entityType, context, lang))
      return soFar
    }, [])
    .flatten()
    .uniq()
    .value()
}

function forEntity(entityType, context, lang) {
  var contextConfig = _.get(configs, context)[entityType]
  var schema = configs.schema[entityType]
  var toFetchFields = contextConfig.fields
  if (toFetchFields && contextConfig.joins) {

    //Do union of joins and fields
    var toJoinFields = _.pluck(contextConfig.joins, 'fieldName')
    toFetchFields = toFetchFields.concat(toJoinFields)
  }

  //Add language prefix to fields
  return toFetchFields.map(function(field) {
    if (schema[field][lang]) {

      return lang + '.' + field

    } else {

      return field

    }

  })
}

module.exports = {
  forEntities : forEntities,
  forEntity : forEntity
}
