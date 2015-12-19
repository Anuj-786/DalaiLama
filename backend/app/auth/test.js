var io = require('socket.io-client');
var request = require('superagent');
var debug = require('debug')('testLogin :')

function connect_socket(token) {
  debug('get a token', token);
  var socket = io.connect('http://localhost:3030', {
    query: 'token=' + token
  });

  socket.on('connect', function() {
    console.log('authenticated');
    socket.emit('hello', {
      hello: "world"
    })
  }).on('disconnect', function() {
    console.log('disconnected');
  }).on('error', function(data) {
    console.log(data)
  });
}

request
  .post('http://localhost:3030/login')
  .send({
    username: "admin",
    password: "pass",
    canEdit: ["event", "person", "speaker", "session", "rawvideo", "rawaudio", "user", "editedvidoe", "editedaudio"]
  })
  .set('Accept', 'application/json')
  .end(function(err, res) {
    debug('get a token', res.body, res.body.token);
    connect_socket(res.body.token)
  });
