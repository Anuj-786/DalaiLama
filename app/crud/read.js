var es = require('../es')

module.exports = function(params, socket) {
  console.log('params', params);
  // to do : need to work on 400 status code errors.
  es.get({
    index: 'events',
    type: 'event',
    id: params._id
  }).then(function(response) {
    // emit the Successful creationg messages.
    socket.emit('read.done', {
      data: response._source,
      status: 20
    });
  }).catch(function(err) {
    // emit error in creating event in database
    console.log(err);
    socket.emit('read.done', {
      message: 'Error in reading event in database',
      code: 500,
      err: err
    })

    // throw err
  })

  .done()

}

if (require.main === module) {
  module.exports({
    foo: 'bar'
  })
}
