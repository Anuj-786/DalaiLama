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

      socket.emit("r-entity.done", {
        message: "Successfully read " + params.type,
        status: res.status || 200,
        response: res,
        params: params
      })

      return res
    })
    .catch(function(err) {

      socket.emit("r-entity.error", {
        message: "Error in reading " + params.type,
        status: err.status || 500,
        error: err,
        params: params
      })
      
      return err
    })
}
