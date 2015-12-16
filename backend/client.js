var io = require('socket.io-client');
var client = io.connect("http://0.0.0.0:3030");

// Testing Reading Entity
client.emit('u-entity', {
  type: "event",
  _id: "AVGly6IMhZb3Opo_wyaM",
  update: {
    pull: {
      session: "1"
    }
  }
})

client.on('u-entity.done', function(data) {
  console.log(data);
})

client.on('u-entity.error', function(data) {
  console.log(data);
})


// Testing Reading Entity
/*
client.emit('r-entity', {
  type: "event",
  _id: "AVGly6IMhZb3Opo_wyaM",
  joins: {
    session: {
      fields: ["name"]
    }
  }
})

client.on('r-entity.done', function(data) {
  console.log(data);
})

client.on('r-entity.error', function(data) {
  console.log(data);
})
*/
// Testing Creating Event
/*
client.emit('c-entity', {
  index: 'events',
  type: 'event',
  body: {
    title_english: "KalaChakra 2014",
    title_tibetan: "དས་ཀ་འཁར་ལ།",
    speakers: [{
      person: "AVGlWN-6hZb3Opo_wyZk",
      type: "speaker"
    }, {
      speaker: "AVGlXJZbhZb3Opo_wyZo",
      type: "speaker"
    }],
    session: ["AVGlWtJEhZb3Opo_wyZl"]
  }
});

client.on('c-entity.done', function(data) {
  console.log(data);
})

client.on('c-entity.error', function(data) {
  console.log(data);
})
*/
