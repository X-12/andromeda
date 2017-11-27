"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Explosions extends System{
        constructor(){
            super("Explosions")
        }
        explosion(config){
            io.emit("Explosions.explosion",config)
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Explosions.explosion", (config)=>{
                this.explosion(config)
            })
        }
    }
    return new Explosions()
}