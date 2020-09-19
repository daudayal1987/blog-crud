const MongoClient = require('mongodb')

const getMongoURL = (options) => {
  const url = options.servers
    .reduce((prev, cur) => prev + cur + ',', `mongodb://` + (options.auth ? `${options.user}:${options.pass}@` : ''))

  return `${url.substr(0, url.length - 1)}`
}

const connect = (options, mediator) => {
  mediator.once('boot.ready', () => {
    MongoClient.connect(
      getMongoURL(options), 
      options.dbParameters, 
      (err, client) => {
        if (err) {
          mediator.emit('db.error', err)
        }
        mediator.emit('db.ready', client.db(options.db));
      })
  })
}

module.exports = Object.assign({}, {connect})