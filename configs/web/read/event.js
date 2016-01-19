module.exports = {
  fields: ['title', 'classification', 'description', 'startingDate', 'endingDate', 'country', 'city', 'venue', 'keywords'],
  primaryField: 'title',
  joins: [{
    fieldName: 'sessions',
    fields: ["title"],
    primaryField: 'title'
  }, {
    fieldName: 'persons',
    fields: ['name'],
    primaryField: 'name',
  }, {
    fieldName: 'speakers',
    fields: ['type', 'language'],
    primaryField: 'person.name',
    joins: [{
      fieldName: 'person',
      fields: ["name"]
    }]
  }]
}
