/**
 * read the file metadata from a directory. Audio, Video, Image specific headers and file headers like creationDate, modificationDate etc.
 * sanitize the metadata like fileFormat, keywords, location, isRaw: true|false(based on raw or edit being there in parent directory or file name). Trim unecessary fields.
 * do an update in the db with type: audio/video/image and _id being the fileName+creationDate. Add new location if file entity exists already. Create entity with this location if not exist.
 * for files found in the db, but not in the read data from disk, remove the particular location from the db
 *
 * **/

//hdLocations: [{name: 'hd-1', path: 'penton-school/'}]

/*for every document
  if it exists in es, get it
    if current hdLocation already exists
      do nothing
    else
      add it to hdLocations array in the es document
      update in es using set using upsert: true
*/

var es = require('../es')
var _ = require('lodash')
var async = require('async')
var sanitizer = require('./sanitizeFileInfo')
var mediaReader = require('./readFromDirectory')

module.exports = function(directoryPath, hardDiskName) {
  return mediaReader(directoryPath)
  .then(function(res) {
    return sanitizer(res.fileInfo, hardDiskName)
  })
  .then(function(filesInfo) {
    return sync(filesInfo)
  })
}

function sync(filesInfo) {
  return async.each(_.keys(filesInfo), function(mediaType) {
    return async.each(filesInfo[mediaType], function(file) {
      return es.get.agg({
        index: file._type + 's',
        type: file._type,
        id: file._id
      })
      .catch(function(err) {
        if (err.status !== 404) console.log(err)
        return
      })
      .then(function(res) {
        var doc
        if (res && res.found) {
          doc = res._source
          if (!_.find(doc.hdLocations, file.hdLocations[0]))
            doc.hdLocations = _.union(doc.hdLocations, file.hdLocations)
          console.log('merged', doc.name, doc.hdLocations, doc._id)
        } else {
          doc = file
          console.log('unmerged', doc.name, doc.hdLocations, doc._id)
        }
        return es.index.agg({
          index: file._type + 's',
          type: file._type,
          id: file._id,
          body: doc
        })
      })
    })
  })
}

if (require.main === module) {
  console.log(process.argv[2])
  module.exports(process.argv[2], process.argv[3])//'/home/master/Videos/music jams', 'master'
  .then(console.log)
  .catch(console.log)
}
