var io = require('socket.io-client');
var client = io.connect("http://0.0.0.0:3000");

module.exports = client;