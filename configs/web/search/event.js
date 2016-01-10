module.exports = {
  fields: ['title', 'description', 'startingDate', 'endingDate', 'keywords'],
  primaryField: 'title',
  joins: [{
    fieldName: 'sessions',
    fields: ["title"],
    primaryField: 'title'
  }, {
    fieldName: 'speakers',
    fields: ['type', 'language'],
    primaryField: 'person',
    joins: [{
      fieldName: 'person',
      fields: ["name"]
    }]
  }]
}
