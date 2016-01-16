var configsToLoad = ['schema', 'web.read', 'web.search']

var entities = ['person', 'event', 'speaker', 'session']

var entityConfigs = {}

configsToLoad.forEach(function(path) {

  path = path.split('.')
  var configAtPath = entityConfigs

  path.forEach(function(key){
    if (!configAtPath[key]) {
      configAtPath[key] = {}
    }  
    configAtPath = configAtPath[key]
  })

  entities.forEach(function(entityType) {

    deepGet(entityConfigs, path)[entityType] = require('./' + path.join('/') + '/' + entityType)
  })
  console.log(entityConfigs)
})

function deepGet(o, path) {
  var nested = o
  path.forEach(function(key) {
    nested = nested[key]
  })
  return nested
}

module.exports = entityConfigs
module.exports.entityTypes = entities
