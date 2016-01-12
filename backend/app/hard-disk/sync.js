var debug = require('debug')('sync')
var fs = require('fs')

var walk = require('walk-promise');
var exif = require('exiftool');
var _ = require('lodash')

/*
walk('/media/vaibhavmule/Untitled/2015-10-10-dharamsala-petonschool-edit')
  .then(function(files) {
    _.forEach(files, function(file) {
      debug(file.root + '/' + file.name, 'file')
      fs.readFileAsync(file.root + '/' + file.name, function(err, data) {
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
    })
  }).catch(function(err) {
    debug(err, 'err')
  })*/

var root = '/media/vaibhavmule/Untitled/2015-10-10-dharamsala-petonschool-edit/'
var file = '2015-10-10-dharamsala-petonschool-tibetan-audio.mp3'

/*
.DS_Store
._.DS_Store
  ._2015-10-10-dharamsala-petonschool-tibetan-audio-export.wav
  ._2015-10-10-dharamsala-petonschool-tibetan-video-export.mov
  2015-10-10-dharamsala-petonschool-tibetan-audio-edit.wav 
  2015-10-10-dharamsala-petonschool-tibetan-audio-export.wav 
  2015-10-10-dharamsala-petonschool-tibetan-audio.mp3 
  2015-10-10-dharamsala-petonschool-tibetan-video-HD.mp4 
  2015-10-10-dharamsala-petonschool-tibetan-video-export.mov 
  2015-10-10-dharamsala-petonschool-tibetan-video-hq.mp4 
  */


fs.readFile(root + file, function (err, data) {
  if (err)
    throw err;
  else {
    exif.metadata(data, function (err, metadata) {
      if (err)
        throw err;
      else
        console.log(metadata);
    });
  }
});
