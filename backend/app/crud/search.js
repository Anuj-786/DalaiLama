var debug = require('debug')('crudSearch')

var search = require('../utils/search')

module.exports = function(params, socket) {

  debug(params, socket)
  var missingArgumentMessage

  if (!params.q) {
    missingArgumentMessage = "query missing"
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

  return search(params)
    .then(function(res) {

      socket.emit("r-search.done", {
        message: "Successfully seached " + params.q,
        status: res.status || 204,
        response: res,
        params: params,
      })

      return res
    }).catch(function(err) {

      socket.emit("r-search.error", {
        message: "Error in searching " + params.q,
        status: err.status || 500,
        error: err,
        params: params
      })

      return err
    })
}
