var client = require('./socket-client');

// Testing Reading Entity
client.emit('r-entity', {
  type: "event",
  _id: "AVIhUbKyPPf_7Ds87q0K",
  lang: 'english',
  context: 'web.read'
})


client.on('r-entity.done', function(data) {
  console.log(JSON.stringify(data));
})

client.on('r-entity.error', function(data) {
  console.log(data);
})
