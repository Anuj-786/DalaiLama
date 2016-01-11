module.exports = {
  "mappings": {
    "persons": {
      "properties": {
        "english": {
          "properties": {
            "name": {
              "type": "string",
              "analyzer": "english"
            }
          }
        },
        "french": {
          "properties": {
            "name": {
              "type": "string",
              "analyzer": "french"
            }
          }
        }
      }
    }
  }
}
