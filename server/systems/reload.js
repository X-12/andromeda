"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Reload extends System{
        constructor(){
            super("Reload")
        }
        reloadAll(){
            io.emit("Reload.reloadAll","")
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Reload.reloadAll", (data)=>{
                this.reloadAll()
            })
        }
    }
    return new Reload()
}