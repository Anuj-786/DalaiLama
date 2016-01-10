var debug = require('debug')('crudCreate')

var es = require('../es')

module.exports = function(params, socket) {

  var missingArgumentMessage
  if (!params._id) {
    missingArgumentMessage = "_id missing"
  } else if (!params.type) {
    missingArgumentMessage = "type missing"
  } else if (!params.body) {
    missingArgumentMessage = "body missing"
  }
  
  if (missingArgumentMessage) {
    socket.emit('r-entity.error', {
      message: "Illegal Argument Exception: " + missingArgumentMessage,
      code: 400
    })
  }

  return es.index({
    index: params.type + 's',
    type: params.type,
    body: params.body
  }).then(function(res) {
    // emit the Successful messages for creation of entiy.
    socket.emit('c-entity.done', {
      message: params.type + ' created successfully!',
      status: 201,
      response: res
    });
  }).catch(function(err) {
    // emit error in creating entity in database
    socket.emit('c-entity.error', {
      message: 'Error in creating ' + params.index + ' in database',
      code: 500,
      error: err
    })
  })
}