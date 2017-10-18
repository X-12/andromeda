"use strict";
const io = require('socket.io')();
const fork = require('child_process').fork
const webserver = fork('./server/webserver.js')
let Ship = {}
Ship.Lights = require('./systems/lights')(io,Ship)

for(var key in Ship){
    if(Ship.hasOwnProperty(key)){
        Ship[key].setupWatches()
    }
}
const port = 3000
io.on("connection",(socket)=>{
    for(var key in Ship){
        if(Ship.hasOwnProperty(key)){
            Ship[key].setupSocket(socket)
        }
    }
})
io.listen(port)
console.log("Socket.IO listening on port "+port)