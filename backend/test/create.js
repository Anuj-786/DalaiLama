var client = require('./socket-client');

// Testing Creating Entity
client.emit('c-entity', {
  index: 'events',
  type: 'event',
  body: {
    french: {
      title: 'KalaChakra 2014',
      classification: 'Teachings',
      startingDate: '1454889600000',
      endingDate: '1455062400000',
      startingTime: '1455105600000',
      city: 'Ladakh',
      state: 'J&K',
      country: 'India',
      languages: 'english',
      keywords: ['ladakh', 'KalaChakra', '2014'],
      description: 'KalaChakra',
      translation: 'french',
      venue: 'Ladakh'
    }
  }
});

client.on('c-entity.done', function(data) {
  console.log(data);
})

client.on('c-entity.error', function(data) {
  console.log(data);
})
