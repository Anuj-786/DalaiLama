var debug = require('debug')('crudLink')
var _ = require('lodash')

var update = require('../utils/update')
var configs = require('../../../configs')



module.exports = function(params, socket) {

  var missingArgumentMessage
  if (!params.body) {
    missingArgumentMessage = "body missing"
  }

  if (missingArgumentMessage) {
    socket.emit('u-entity.error', {
      message: "Illegal Argument Exception: " + missingArgumentMessage,
      status: 400
    })
  }

  // check if body keys is there in schema
  var paramKeys = _.keys(params.body)
  var entityKeys = resolveEntityKeys(_.keys(params.body))

  var pushUpdate = {}
  pushUpdate[entityKeys[1]] = params.body[_.keys(params.body)[1]]

  return update({
      type: paramKeys[0],
      _id: params.body[_.keys(params.body)[0]],
      update: {
        push: pushUpdate
      }
    })
    .then(function(res) {

      var entityKeysReverse = resolveEntityKeys(_.keys(params.body).reverse())
      var pushUpdate = {}
      pushUpdate[entityKeysReverse[1]] = params.body[_.keys(params.body)[0]]

      return update({
        type: paramKeys[1],
        _id: params.body[_.keys(params.body)[1]],
        update: {
          push: pushUpdate
        }
      })

    }).then(function(res) {

      socket.emit("u-entity.done", {
        message: "Successfully updated " + params.type,
        status: res.status || 204,
        response: res,
        params: params
      })

      return res
    })
    .catch(function(err) {

      socket.emit("u-entity.error", {
        message: "Error in updating " + params.type,
        status: err.status || 500,
        error: err,
        params: params
      })

      return err
    })

}

function resolveEntityKeys(entityKeys) {
  var schemaKeys = _.keys(_.get(configs, 'schema')[entityKeys[0]])

  if (!_.includes(schemaKeys, entityKeys[1])) {
    entityKeys[1] = entityKeys[1] + 's'
  }

  return entityKeys
}

if (require.main === module) {
  module.exports({
      body: {
        event: 'AVIhUbKyPPf_7Ds87q0K',
        session: 'AVIv437NAuidQZrWJNty'
      }
    }).then(function(res) {
      debug(JSON.stringify(res))
    })
    .catch(debug)
}
