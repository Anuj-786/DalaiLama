var client = require('./socket-client');

//Testing Reading Entity
client.emit('u-entity', {
  type: "event",
  _id: "AVIhUbKyPPf_7Ds87q0K",
  update: {
    push: {
      speaker: ['AVIhYcY1PPf_7Ds87q0S']
    }
  }
})

client.on('u-entity.done', function(data) {
  console.log(data);
})

client.on('u-entity.error', function(data) {
  console.log(data);
})


/*

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

*/
