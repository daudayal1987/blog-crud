'use strict'
/**
 * Bootstrap file of service
 * It will load all dependencies of services here and pass dependency to modules from here
 * Using Dependency Injection pattern (DI)
 */

// we load all the depencies we need
const {EventEmitter} = require('events');
const server = require('./server/server');
const repository = require('./repository/repository');
const validationMiddleware = require('./middleware/validation');
const joiSchema = require('./joiSchema/joiSchema');
const config = require('./config/');
const mediator = new EventEmitter();

// verbose logging when we are starting the server
console.log('--- Starting Service ---');
console.log('Connecting to repository...');

// log unhandled execpetions
process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})
process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

// event listener when the repository has been connected
mediator.on('db.ready', (db) => {
  let rep
  repository.connect(db)
    .then(repo => {
      console.log('Repository Connected. Starting Server')
      rep = repo
      return server.start({
        port: config.serverSettings.port,
        repo,
        validationMiddleware,
        joiSchema
      })
    })
    .then(app => {
      console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
      app.on('close', () => {
        rep.disconnect()
      })
    })
})
mediator.on('db.error', (err) => {
  console.error(err)
})

// we load the connection to the repository, it will bind boot.ready event 
config.db.connect(config.dbSettings, mediator)
// init the repository connection, and the event listener will handle the rest
mediator.emit('boot.ready')