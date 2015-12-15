var es = require('../es')

module.exports = function(params, socket) {
  console.log('params', params);

  es.index({
    index: params.index,
    type: params.type,
    id: params._id,
    body: params
  }).then(function() {
    // emit the Successful messages for creation of entiy.
    socket.emit('create.done', {
      message: 'Event created successfully!',
      status: 201
    });
  }).catch(function(err) {
    // emit error in creating entity in database
    socket.emit('create.done', {
      message: 'Error in creating event in database',
      code: 500,
      err: err
    })

    throw err
  })

  .done()

}

if (require.main === module) {
  module.exports({
    foo: 'bar'
  })
}
