/**
 * read the file metadata from a directory. Audio, Video, Image specific headers and file headers like creationDate, modificationDate etc.
 * sanitize the metadata like fileFormat, keywords, location, isRaw: true|false(based on raw or edit being there in parent directory or file name). Trim unecessary fields.
 * do an update in the db with type: audio/video/image and _id being the fileName+creationDate. Add new location if file entity exists already. Create entity with this location if not exist.
 * for files found in the db, but not in the read data from disk, remove the particular location from the db
 *
 * **/
