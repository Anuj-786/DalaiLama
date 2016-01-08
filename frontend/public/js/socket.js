import io from 'socket.io-client'
var socket = io.connect('http://0.0.0.0:3000')

export default socket
