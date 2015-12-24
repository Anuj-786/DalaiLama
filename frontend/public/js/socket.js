var io = require('socket.io-client/socket.io');
var socket = io.connect('http://localhost:3000');
module.exports = socket;
