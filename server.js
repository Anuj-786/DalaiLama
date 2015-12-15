var express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// var createEvent = require('./app/event/create.js');
// var readEvent = require('./app/event/read.js');

// serve static file from public folder
app.use(express.static('public'));

// start the server
server.listen(process.env.PORT || 3030, function() {
  console.log('\nServer ready on port %d\n', server.address().port);
});

/* to do: optimize the code.
io.on('connection', function(socket) {
  socket.on('create', function(data) {
    createEvent(data, socket);
  });
  socket.on('read', function(data) {
  	readEvent(data, socket);
  });
});
*/