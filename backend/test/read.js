var client = require('./socket-client');

// Testing Reading Entity
client.emit('r-entity', {
  type: "event",
  _id: "AVIhUbKyPPf_7Ds87q0K",
  lang: 'english',
  fields: ['english.title', 'english.description', 'english.startingDate', 'english.endingDate'],
  primaryField: 'english.title',
  joins: [{
    _type: 'session',
    fields: ["english.title"],
    primaryField: 'title'
  }, {
    _type: ['speaker'],
    fields: ['english.type', 'english.languages', ['attendees']],
    primaryField: 'person.name',
    joins: [{
      _type: 'person',
      fields: ["english.name"]
    }]
  }]
})


client.on('r-entity.done', function(data) {
  console.log(JSON.stringify(data));
})

client.on('r-entity.error', function(data) {
  console.log(data);
})

/**
	_id
	_type
	_source || fields
**/
