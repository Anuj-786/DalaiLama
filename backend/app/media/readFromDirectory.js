var debug = require('debug')('sync')
var fs = require('fs')
var async = require('async-q')
var Q = require('q')
var walk = require('walk-promise')
var exif = require('exiftool')
var _ = require('lodash')
var ffmpeg = require('fluent-ffmpeg')

module.exports = function(path) {
  var ignoredTypes = []
  var fileInfo = {
    video: [],
    audio: [],
    images: []
  }
  return walk(path)
  .then(function(files) {
    return readFiles(files, fileInfo, ignoredTypes)
  })
  .then(function() {
    return {
      fileInfo: fileInfo,
      ignoredTypes: ignoredTypes
    }
  })
}

function readFiles(files, fileInfo, ignoredTypes) {
  return async.eachLimit(files, 2, function(file) {
    if (file.name.charAt(0) === '.') {
      return Q()
    }
    if (file.root.indexOf('/\.') > -1) {
      return Q()
    }
    var fileExtension = file.name.split('\.')
    fileExtension = fileExtension[fileExtension.length - 1].toLowerCase()
    var filePath = file.root + '/' + file.name
    //Video
    if (_.includes(['mov', 'mp4', 'avi'], fileExtension)) {
      return readFfmpegMetadata(filePath)
      .then(function(video) {
        fileInfo.video.push(video)
      })
    }
    //Audio
    if (_.includes(['wav', 'mp3'], fileExtension)) {
      return readFfmpegMetadata(filePath)
      .then(function(audio) {
        fileInfo.audio.push(audio)
      })
    }
    //Image
    if (_.includes(['dng', 'jpg', 'jpeg', 'tiff', 'png'], fileExtension)) {
      return readExifMetadata(filePath)
      .then(function(image) {
        fileInfo.images.push(image)
      })
    }
    ignoredTypes.push(fileExtension)
    return Q()
  })
  .then(function(fileInformation) {
    return _.compact(_.flatten(fileInformation))
  })
}

function readFfmpegMetadata(filePath) {
  var deferred = Q.defer()
  ffmpeg.ffprobe(filePath, function(err, res) {
    if (!err) {
      deferred.resolve(res)
    } else if (err.toString().indexOf('Invalid data') === -1) {
      console.log('found invalid file. ignoring', err)
      deferred.resolve()
    } else {
      deferred.reject(err)
    }
  })
  return deferred.promise
}

function readExifMetadata(filePath) {
  return readFilePart(filePath, 20 * 1024 * 1024)
  .then(function(data) {
    var deferred = Q.defer()
    exif.metadata(data, function(err, metadata) {
      if (err) {
        deferred.reject(err)
      }
      else {
        delete metadata.profileHueSatMapData2
        delete metadata.profileHueSatMapData1
        deferred.resolve(metadata)
      }
    })
    return deferred.promise
  })
}

function readFilePart(filePath, size) {

  var deferred = Q.defer()

  var chunks = []
  var rstream = fs.createReadStream(filePath, {
    encoding: null,
    start: 0,
    end: size
  })
  rstream
    .on('data', function(chunk) {
      chunks.push(chunk)
    })
    .on('end', function() { // done
      deferred.resolve(Buffer.concat(chunks))
    })
    .on('error', function(err) {
      deferred.reject(err)
    })

  return deferred.promise
}

if (require.main === module) {
  module.exports('/media/Untitled')
  .then(function(res) {

    console.log('ignored ' + res.ignoredTypes.length + ' files of types ' + _.uniq(res.ignoredTypes))

    _.keys(res.fileInfo).forEach(function(type) {

      var formats = _.uniq(_.pluck(res.fileInfo[type], 'format.format_long_name'))

      console.log('found ' + res.fileInfo[type].length + ' ' + type + ' files of ' + formats.length + ' types ' + formats)

      _.keys(res.fileInfo[type][0]).forEach(function(key) {
        console.log(key, res.fileInfo[type][0][key])
      })

    })
  })
  .catch(console.log)
}
