{
  "mappings": {
    "event": {
      "properties": {
        "session": {
          "type": "long"
        },
        "speaker": {
          "type": "long"
        },
        "english": {
          "properties": {
            "city": {
              "type": "string",
              "analyzer": "english"
            },
            "classification": {
              "type": "string",
              "index": "not_analyzed"
            },
            "country": {
              "type": "string",
              "analyzer": "english"
            },
            "description": {
              "type": "string",
              "analyzer": "english"
            },
            "endingDate": {
              "type": "string",
              "analyzer": "english"
            },
            "keywords": {
              "type": "string",
              "analyzer": "english"
            },
            "languages": {
              "type": "string",
              "analyzer": "english"
            },
            "startingDate": {
              "type": "string",
              "analyzer": "english"
            },
            "startingTime": {
              "type": "string",
              "analyzer": "english"
            },
            "state": {
              "type": "string",
              "analyzer": "english"
            },
            "title": {
              "type": "string",
              "analyzer": "english"
            },
            "translation": {
              "type": "string",
              "analyzer": "english"
            },
            "venue": {
              "type": "string",
              "analyzer": "english"
            }
          }
        },
        "french": {
          "properties": {
            "city": {
              "type": "string",
              "analyzer": "french"
            },
            "classification": {
              "type": "string",
              "analyzer": "french",
              "index": "not_analyzed"
            },
            "country": {
              "type": "string",
              "analyzer": "french"
            },
            "description": {
              "type": "string",
              "analyzer": "french"
            },
            "endingDate": {
              "type": "string",
              "analyzer": "french"
            },
            "keywords": {
              "type": "string",
              "analyzer": "french"
            },
            "languages": {
              "type": "string",
              "analyzer": "french"
            },
            "startingDate": {
              "type": "string",
              "analyzer": "french"
            },
            "startingTime": {
              "type": "string",
              "analyzer": "french"
            },
            "state": {
              "type": "string",
              "analyzer": "french"
            },
            "title": {
              "type": "string",
              "analyzer": "french"
            },
            "translation": {
              "type": "string",
              "analyzer": "french"
            },
            "venue": {
              "type": "string",
              "analyzer": "french"
            }
          }
        }
      }
    }
  }
}
