const dbSettings = {
    db: process.env.DB,
    auth: process.env.DB_AUTH,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    servers: process.env.DB_SERVERS.split(' '),

    dbParameters: {
      useUnifiedTopology: true
    }
  }
  
  const serverSettings = {
    port: process.env.PORT || 3000
  }
  
  module.exports = Object.assign({}, { dbSettings, serverSettings })