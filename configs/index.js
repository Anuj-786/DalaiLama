var configsToLoad = ['schema', 'web.read', 'web.search']

var entities = ['person', 'event', 'speaker', 'session']

var entityConfigs = {}

configsToLoad.forEach(function(config) {

  entityConfigs[config] = {}

  entities.forEach(function(entityType) {

    entityConfigs[config][entityType] = require('./' + config.replace('.', '/') + '/' + entityType)
  })
})

module.exports = entityConfigs
module.exports.entityTypes = entities
