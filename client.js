var io = require('socket.io-client');
var client = io.connect("http://0.0.0.0:3030");

client.emit('read',{
  _id: 1
})

client.on('read.done', function(data) {
  console.log(data);
})

// Testing Creating Event
/*client.emit('create.event', {
  _id: Date.now(),
  title_english: "KalaChakra 2014",
  title_tibetan: "དས་ཀ་འཁོར་ལོ།"
  classification: "Teaching",
  startingDate: "3 July 2014",
  endingDate: "14 July 2014",
  venue: "Ladakh",
  city: "Ladakh",
  state: "J&K",
  country: "India",
  language: "English",
  description: "His Holiness will",
  speakers: [{
    speaker: "speaker_id",
    type: "speaker"
  }],
  translations: ["Tibetan"],
  sessions: [1, 2],
  keywords: ["Ladakh", "Teaching"]
});

client.on('create.event.done', function(data) {
  console.log(data);
})
*/