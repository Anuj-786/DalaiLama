var debug = require('debug')('crudRead')

var read = require('../utils/read')

module.exports = function(params, socket) {
  
  var missingArgumentMessage
  if (!params._id) {
    missingArgumentMessage = "_id missing"
  } else if (!params.type) {
    missingArgumentMessage = "type missing"
  } else if (!params.lang) {
    missingArgumentMessage = "lang missing"
  } else if (!params.context) {
    missingArgumentMessage = "context missing"
  }

  if (missingArgumentMessage) {
    socket.emit('r-entity.error', {
      message: "Illegal Argument Exception: " + missingArgumentMessage,
      code: 400
    })
  }

  return read(params)
    .then(function(res) {
      debug(res)
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
