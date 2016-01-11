var debug = require('debug')('update')
var updater = require('js-object-updater')

var es = require('../es')

module.exports = function(params) {
  debug(params)
  return es.get({
      index: params.type + "s",
      type: params.type,
      id: params._id
    })
    .then(function(res) {

      updater({
        doc: res._source,
        update: params.update,
        force: true
      })

      return es.index({
        index: params.type + "s",
        type: params.type,
        id: params._id,
        body: res._source
      })
    })
}

if (require.main === module) {
  module.exports({
      type: "event",
      _id: "AVIhUbKyPPf_7Ds87q0K",
      update: {
        push: {
          speaker: ['AVIhYcY1PPf_7Ds87q0S']
        }
      }
    }).then(function(res) {
      debug(JSON.stringify(res))
    })
    .catch(debug)
}
