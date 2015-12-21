var express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('lodash');

var consumers = {
  // CRUD Operation
  'c-entity': 'crud/create',
  'r-entity': 'crud/read',
  'u-entity': 'crud/update',

  // search Operation
  'r-search': 'crud/search'
}

io.on('connection', function(socket) {
  _.keys(consumers).forEach(function(ev, i) {
    var eventConsumers = consumers[ev]
    if (!_.isArray(eventConsumers)) {
      eventConsumers = [eventConsumers]
    }

    eventConsumers.forEach(function(evc) {
      evc = './' + evc
      var consume = require(evc)
      socket.on(ev, function(data) {
        consume(data, socket)
      })
    })
  })

})


// start the server
server.listen(process.env.PORT || 3030, function() {
  console.log('\nServer ready on port %d\n', server.address().port);
});
