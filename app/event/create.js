var es = require('../es')
var _ = require('lodash')

module.exports = function(params, socket) {
  console.log('params', params);
  // to do : need to work on 400 status code errors.
  es.index({
    index: 'events',
    type: 'event',
    id: params._id,
    body: _.pick(params, ['title', 'classification', 'startingDate', 'endingDate',
      'venue', 'city', 'state', 'country', 'langauge', 'description',
      'speackers', 'translations', 'sessions', 'keywords'
    ])
  }).then(function() {
    // emit the Successful creationg messages.
    socket.emit('create.event.done', {
      message: 'Event created successfully!',
      status: 201
    });
  }).catch(function(err) {
    // emit error in creating event in database
    socket.emit('create.event.done', {
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
