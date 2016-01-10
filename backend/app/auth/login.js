var debug = require('debug')('login')

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketioJwt = require('socketio-jwt');
var bodyParser = require('body-parser');
var _ = require('lodash')
var jwt = require('jsonwebtoken')

var config = require('./../../config.js')


function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret.secret, {
    expiresIn: 60 * 60 * 5
  });
}

app.use(bodyParser.json());

app.post('/login', function(req, res) {
  debug('get user details to generate a token', req.body)
  console.log('req.body:', req.body);
  var profile = _.pick(req.body, 'username', 'password', 'canEdit');

  debug('generate token and send response', profile)
  res.status(201).json({
    token: createToken(profile)
  })
})


io.set('authorization', socketioJwt.authorize({
  secret: config.secret.secret,
  handshake: true
}));

io.on('connection', function(socket) {
  debug('on connection:', socket.client.request.decoded_token.username)
  console.log('hello! ', socket.client.request.decoded_token.username);
  
  socket.on("error", function(error) {
    if (error.type == "UnauthorizedError" || error.code == "invalid_token") {
      // redirect user to login page perhaps?
      console.log("User's token has expired");
    }
  });

  socket.on('hello', function(data) {
  	console.log(data);
  })
});




// start the server
http.listen(3030, function() {
  console.log('listening on *:3030');
});
