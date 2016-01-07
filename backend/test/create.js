var client = require('./socket-client');

// Testing Creating Entity
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
