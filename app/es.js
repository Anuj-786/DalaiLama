var epicSearch = require('epicsearch');

// Database connection
module.exports = new epicSearch(require('../config').epicsearch);
