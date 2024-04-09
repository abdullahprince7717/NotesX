#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('notesx:server');
var http = require('http');
const { db, models } = require('../models/index')
const { database } = require('../config.json')
const { Server } = require("socket.io");
const initSocket = require('./socketManager');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


const { io, server } = initSocket(app);



if (database == "postgres") {
  db.sequelize.sync({ alter: true }).then(() => { //alter: true means that the tables will be dropped and recreated if there are any changes in the models
    // console.log('db', db)
    console.log('Models', models)
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    console.log('Server is listening on port', port)
  }).catch((err) => {
    console.log('Error connecting to database', err)
  });
}

else {
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
  console.log('Server is listening on port', port)
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = { io }
