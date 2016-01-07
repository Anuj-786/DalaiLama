var client = require('./socket-client');

// Testing Search 
client.emit('r-search', {
  q: "le",
  lang: "french"
})

client.on('r-search.done', function(data) {
  console.log("response:", JSON.stringify(data.res));
})

client.on('r-search.error', function(data) {
  console.log(data);
})