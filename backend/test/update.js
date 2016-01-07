var client = require('./socket-client');

//Testing Reading Entity
client.emit('u-entity', {
  type: "event",
  _id: "AVGly6IMhZb3Opo_wyaM",
  update: {
    set: {
      session: ["AVGlWtJEhZb3Opo_wyZl"]
    }
  }
})

client.on('u-entity.done', function(data) {
  console.log(data);
})

client.on('u-entity.error', function(data) {
  console.log(data);
})