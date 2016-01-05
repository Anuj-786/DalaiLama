var io = require('socket.io-client/socket.io');
module.exports = io.connect('http://localhost:3000');
