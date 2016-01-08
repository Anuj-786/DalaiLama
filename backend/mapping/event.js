{
  "mappings": {
    "sessions": {
      "properties": {
        "english": {
          "properties": {
            "number": {
              "type": "string",
              "analyzer": "english"
            },
            "title": {
              "type": "string",
              "analyzer": "english"
            },
            "venue": {
              "type": "string",
              "analyzer": "english"
            },
            "classification": {
              "type": "string",
              "index": "not_analyzed"
            },
            "startingDate": {
              "type": "date",
              "analyzer": "english"
            },
            "languages": {
              "type": "string",
              "analyzer": "english"
            },
            "translation": {
              "type": "string",
              "analyzer": "english"
            }
          }
        },
        "french": {
          "properties": {
            "number": {
              "type": "string",
              "analyzer": "french"
            },
            "title": {
              "type": "string",
              "analyzer": "french"
            },
            "venue": {
              "type": "string",
              "analyzer": "french"
            },
            "classification": {
              "type": "string",
              "analyzer": "french"
            },
            "startingDate": {
              "type": "string",
              "analyzer": "french"
            },
            "languages": {
              "type": "string",
              "analyzer": "french"
            },
            "translation": {
              "type": "string",
              "analyzer": "french"
            }
          }
        }
      }
    }
  }
}
