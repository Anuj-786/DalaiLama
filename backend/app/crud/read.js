// var debug = require('debug')('read')
// var _ = require('lodash')

// var es = require('../es')
// var resolveJoins = require('../utils/resolveJoins')
// var read = require('../utils/read')
// var entityConfigs = require('../../../common/index')

module.exports = function(params, socket) {
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

