/**
 * Server file of application 
 * it will run the actual application
 */
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const api = require('../api/blogPost');

const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.repo) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!options.port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express();
    app.use(logger('dev'));
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    api(app, options)

    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      console.error('Something went wrong!, err:' + err);
      res.status(500).json({result: false})
    })

    const server = app.listen(options.port, () => resolve(server))
  })
}

module.exports = Object.assign({}, {start})