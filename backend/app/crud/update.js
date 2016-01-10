var debug = require('debug')('crudUpdate')
var _ = require('lodash')
var updater = require('js-object-updater')

var es = require('../es')

module.exports = function(params, socket) {
  var missingArgumentMessage
  if (!params._id) {
    missingArgumentMessage = "_id missing"
  } else if (!params.type) {
    missingArgumentMessage = "type missing"
  } else if (!params.update) {
    missingArgumentMessage = "update missing"
  }

  if (missingArgumentMessage) {
    socket.emit('u-entity.error', {
      message: "Illegal Argument Exception: " + missingArgumentMessage,
      code: 400
    })
  }

  return es.get({
      index: params.type + "s",
      type: params.type,
      id: params._id
    })
    .then(function(res) {

      updater({
        doc: res._source,
        update: params.update,
        force: true
      })
      
      return es.index({
        index: params.type + "s",
        type: params.type,
        id: params._id,
        body: res._source
      })
    })
    .then(function(res) {

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
