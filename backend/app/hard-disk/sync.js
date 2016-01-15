var debug = require('debug')('sync')
var fs = require('fs')

var walk = require('walk-promise')
var exif = require('exiftool')
var _ = require('lodash')


walk('/media/vaibhavmule/Untitled/OHHDL_images')
  .then(function(files) {
    _.forEach(files, function(file) {

      if (file.name.charAt(0) === '.') {
        return
      }

      debug(file.root + '/' + file.name, 'file')

      var buffer = new Buffer(1024)

      debug('buffer', buffer)

      var rstream = fs.createReadStream(file.root + '/' + file.name, {
        encoding: null,
        start: 0,
        end: 1024 * 1024
      })

      rstream
        .on('data', function(chunck) {
          debug(chunck)
          buffer += chunck
        })
        .on('end', function() { // done
          
          exif.metadata(buffer, function(err, metadata) {
            if (err)
              throw err;
            else
              debug(metadata, 'metadata');
          })
        })
    })
  }).catch(function(err) {
    debug(err, 'err')
  })

/*
      fs.read(file.root + '/' + file.name, function(err, data) {
        if (err)
          throw err;
        else {
          exif.metadata(data, function(err, metadata) {
            if (err)
              throw err;
            else
              debug(metadata, 'metadata');
          })
        }
      })
*/

/*
      var buffer = new Buffer(1024);

      fs.open(file.root + '/' + file.name, 'r+', function(err, fd) {
        if (err) {
          debug(err)
          throw err
        }

        fs.read(fd, buffer, 0, buffer.length, 0, function(err, bytes, buff) {
          if (err) {
            debug('error', err);
          }
          debug(bytes, buffer)
          exif.metadata(buffer, function(err, metadata) {
            if (err) {
              throw err;
            } else
              debug(metadata, 'metadata')
          })

        })


      })
*/
