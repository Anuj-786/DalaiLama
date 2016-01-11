var debug = require('debug')('crudCreate')

var es = require('../es')

module.exports = function(params, socket) {

  var missingArgumentMessage
  if (!params.type) {
    missingArgumentMessage = "type missing"
  } else if (!params.body) {
    missingArgumentMessage = "body missing"
  }

  if (missingArgumentMessage) {
    socket.emit('c-entity.error', {
      message: "Illegal Argument Exception: " + missingArgumentMessage,
      status: 400
    })
  }

  return es.index({
    index: params.type + 's',
    type: params.type,
    body: params.body
  }).then(function(res) {

    socket.emit('c-entity.done', {
      message: params.type + ' created successfully!',
      status: res.status || 201,
      response: res,
      params: params
    })

    return res
  }).catch(function(err) {

    socket.emit('c-entity.error', {
      message: 'Error in creating ' + params.index + ' in database',
      status: err.status || 500,
      error: err,
      params: params
    })

    return err
  })
}
