"use strict";
const io = require('socket.io')();
const fork = require('child_process').fork
const webserver = fork('./server/webserver.js')
const Lights = require('./systems/lights')(io)
const port = 3000
io.listen(port)
console.log("Socket.IO listening on port "+port)