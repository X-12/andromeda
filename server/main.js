"use strict";
const io = require('socket.io')();
const fork = require('child_process').fork
const webserver = fork('./server/webserver.js')
let Ship = {}
Ship.Defaults = require('./config.js')
Ship.Lights = require('./systems/lights')(io,Ship)
Ship.Power = require('./systems/power')(io, Ship)
Ship.Music = require('./systems/music')(io,Ship)
Ship.Health = require('./systems/health')(io,Ship)
Ship.Alert = require('./systems/alert')(io, Ship)
Ship.Impulse = require('./systems/impulse')(io,Ship)
Ship.Warp = require('./systems/warp')(io,Ship)
Ship.LifeSupport = require('./systems/lifesupport')(io,Ship)
Ship.Position = require('./systems/position')(io,Ship)
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