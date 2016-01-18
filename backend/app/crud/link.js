var debug = require('debug')('crudLink')
var _ = require('lodash')
var Q = require('q')

var update = require('../utils/update')
var configs = require('../../../configs')

module.exports = function(params, socket) {

  var missingArgumentMessage
  if (!params) {
    missingArgumentMessage = "params missing"
  }

  if (missingArgumentMessage) {
    socket.emit('u-entity.error', {
      message: "Illegal Argument Exception: " + missingArgumentMessage,
      status: 400
    })
  }

  var entityKeys = resolveEntityKeys(_.pluck(params, '_type'))
  return Q.all(
    makeLink(params[0], entityKeys[1], params[1]._id),
    makeLink(params[1], entityKeys[0], params[0]._id)
  ).then(function(res) {
  debug(res)

    socket.emit('u-entity-link.done', {
      message: 'linked successfully!',
      status: res.status || 201,
      response: res,
      params: params
    })
    return res
  }).catch(function(err) {
  debug(err)
    socket.emit('u-entity-link.error', {
      message: 'Error in linking to database',
      status: err.status || 500,
      error: err,
      params: params
    })

    return err
  })

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
