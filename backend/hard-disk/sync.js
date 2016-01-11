var debug = require('debug')('sync')
var walk = require('walk-promise');

walk('/home/vaibhavmule/Dropbox/interview')
  .then(function(files) {
    debug(files)
  });