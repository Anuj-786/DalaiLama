module.exports = {
  "mappings": {
    "speakers": {
      "properties": {
        "english": {
          "properties": {
            "type": {
              "type": "string",
              "analyzer": "english"
            },
            "language": {
              "type": "string",
              "analyzer": "english"
            }
          }
        },
        "french": {
          "properties": {
            "type": {
              "type": "string",
              "analyzer": "french"
            },
            "language": {
              "type": "string",
              "analyzer": "french"
            }
          }
        }
      }
    }
  }
}
