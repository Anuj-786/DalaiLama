var io = require('socket.io-client');
var client = io.connect("http://0.0.0.0:3030");

client.emit('test', { my: 'data' });