"use strict";
const io = require('socket.io')();
const fork = require('child_process').fork
const webserver = fork('./server/webserver.js')
const port = 3000
io.listen(port, function(){
    console.log("Socket.IO listening on port "+port)
})