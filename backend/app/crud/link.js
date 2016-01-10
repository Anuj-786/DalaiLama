var debug = require('debug')('crudLink')

module.exports = function(params) {

}

if (require.main === module) {
  module.exports({
      body: {
      	event: ,
      	session: 'AVIhUMEBPPf_7Ds87q0J'
      }
      context: 'web.read'
    })
    .then(function(res) {
      debug(JSON.stringify(res))
    })
    .catch(debug)
}
