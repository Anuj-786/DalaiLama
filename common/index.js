var configsPath = './entityConfigs/'

var entities = ['person', 'event', 'speaker', 'session']
var entityConfigs = {}

entities.forEach(function(entityType) {
  entityConfigs[entityType] = require(configsPath + entityType)
})

module.exports = entityConfigs