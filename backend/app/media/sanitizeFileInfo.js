var moment = require('moment')
var _ = require('lodash')

module.exports = function(filesInfo, hardDiskName) {

  var sanitizedFilesInfo = {}

  _.keys(filesInfo).forEach(function(fileType) {

    sanitizedFilesInfo[fileType] = sanitize(filesInfo, fileType, hardDiskName)

  })

  return sanitizedFilesInfo
}

function sanitize(filesInfo, mediaType, hardDiskName) {

  var files = filesInfo[mediaType]
  return files.map(function(file) {

    var filePath = file.basicInfo.root
    filePath = filePath.substring(filePath.indexOf(hardDiskName) + hardDiskName.length)
    
    var basicInfo = {
      _id: file.basicInfo.name,
      _type: mediaType,
      name: file.basicInfo.name,
      creationTime: +moment(file.basicInfo.stat.ctime),
      size: file.basicInfo.stat.size,
      raw: _.includes(file.basicInfo.name, 'raw') || _.includes(file.basicInfo.root, 'raw'),
      extension: file.basicInfo.name.substring(file.basicInfo.name.lastIndexOf('\.') + 1).toLowerCase(),
      hdLocations: [{name: hardDiskName, path: filePath}]
    }
    var sanitizedAudioInfo = mediaSanitizers[mediaType](file.mediaInfo)
    return _.extend(basicInfo, sanitizedAudioInfo)

  })
}


function sanitizeFfmpeg(mediaInfo) {
  var format = mediaInfo.format
  var result = {
    numberOfStreams: format.nb_streams,
    formatName: format.format_name,
    formatLongName: format.format_long_name,
    duration: parseInt(format.duration),
    bitRate: parseInt(format.bit_rate),
    majorBrand: _.get(format, 'tags.major_brand'),
    compatibleBrands: _.get(format, 'tags.compatible_brand'),
    streams: sanitizeMediaStreams(mediaInfo.streams),
  }

  return result
}

function sanitizeMediaStreams(mediaStreams) {
  return mediaStreams.map(function(stream) {
    return {
      codecName: stream.codec_name,
      codecLongName: stream.codec_long_name,
      codecType: stream.codecType,
      codecTagString: stream.codec_tag_string,
      width: stream.width,
      height: stream.height,
      pixelFormat: stream.pix_fmt,
      sampleRate: parseInt(stream.sample_rate),
      channels: stream.channels,
      bitsPerSample: stream.bits_per_sample,
      frameRate: stream.frame_rate,
      duration: parseInt(stream.duration),
      language: _.get(stream, 'tags.language')
    }
  })
}

var mediaSanitizers = {
  audio: sanitizeFfmpeg,
  video: sanitizeFfmpeg,
  image: function sanitizeImages(imageFiles) {
  }
}

if (require.main === module) {
  require('./readFromDirectory')('/media/Untitled')
  .then(function(res) {
    var sanitizedData = module.exports(res.fileInfo, 'HD1')
    //console.log(JSON.stringify(sanitizedData.video))
    //console.log(JSON.stringify(res.fileInfo))
  })
}
