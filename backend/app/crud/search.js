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
        code: res.status || 204,
        params: params,
        res: res
      })
    }).catch(function(err) {

      socket.emit("r-search.error", {
        message: "Error in searching " + params.q,
        code: err.status || 500,
        error: err,
        params: params
      })
    })
}
