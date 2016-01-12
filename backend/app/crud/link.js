var debug = require('debug')('crudLink')
var _ = require('lodash')
var Q = require('q')

var update = require('../utils/update')
var configs = require('../../../configs')

module.exports = function(params) {

  var missingArgumentMessage
  if (!params) {
    missingArgumentMessage = "params missing"
  }

  if (missingArgumentMessage) {
    socket.emit('r-entity.error', {
      message: "Illegal Argument Exception: " + missingArgumentMessage,
      status: 400
    })
  }

  // check if body keys is there in schema
  var entityKeys = resolveEntityKeys(_.pluck(params, '_type'))
  return Q.all(
    makeLink(params[0], entityKeys[1], params[1]._id),
    makeLink(params[1], entityKeys[0], params[0]._id)
  )

}

function makeLink(parentEntity, linkedField, linkedEntityId) {

  return update({
    type: parentEntity._type,
    _id: parentEntity._id,
    update: {
      push: {
        [linkedField]: linkedEntityId
      }
    }
  })
}

function resolveEntityKeys(entityKeys) {
  var schemaKeys = _.keys(configs.schema)[entityKeys[0]]

  if (!_.includes(schemaKeys, entityKeys[1])) {
    entityKeys[1] = entityKeys[1] + 's'
  }

  return entityKeys
}

if (require.main === module) {
  module.exports(
      [{
        _type: 'event',
        _id: 'AVIwnJguMLJOR0EfnMlt'
      }, {
        _type: 'session',
        _id: 'AVIwcm0_MLJOR0EfnMlp'
      }]
    ).then(function(res) {
      debug(JSON.stringify(res))
    })
    .catch(debug)
}
