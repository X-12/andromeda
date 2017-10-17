"use strict";
const io = require('socket.io')();
const fork = require('child_process').fork
const webserver = fork('./server/webserver.js')
let Ship = {}
Ship.Lights = require('./systems/lights')(io,Ship)
const port = 3000
io.listen(port)
console.log("Socket.IO listening on port "+port)
io.on('connection', function(io) {
    io.emit("Alert.change", 1)
    console.log("sent alert")
})