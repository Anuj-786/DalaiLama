var client = require('./socket-client');

// Testing Reading Entity
client.emit('r-entity', {
  type: "event",
  _id: "1",
  joins: {
    session: {
      fields: ["title"]
    }
  }
})

client.on('r-entity.done', function(data) {
  console.log(data);
})

client.on('r-entity.error', function(data) {
  console.log(data);
})
