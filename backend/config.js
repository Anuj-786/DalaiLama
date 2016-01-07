module.exports = {
  epicsearch: {
    clientParams: {
      hosts: [{
        host: 'localhost',
        protocol: 'http',
        port: 9200
      }],
      requestTimeout: 90000,
      maxConnections: 200,
      log: 'error'
    },
    default_index: 'test',
    default_type: 'test',
    percolate: {
      query_index: 'queries'
    },
    batch_sizes: {
      mpu: 2,
      msearch: 2,
      bulk: 2,
      index: 20,
      mget: 50,
      get: 1,
      bulk_index: 2,
      search: 1
    },
    timeouts: {
      bulk: 2000,
      index: 1000,
      index_by_unique: 1000,
      get_first: 20,
      bulk_index: 1000,
      get: 0,
      mget: 50,
      msearch: 1000
    }

  },
  socket: {
    port: 3000
  },
  searchEntities: {
    event: {
      fields: ['name'],
      joins: {
        speaker: {
          fields: ['title'],
          joins: {
            person: {
              fields: ['name']
            }
          }
        }
      }
    }
  }
}
