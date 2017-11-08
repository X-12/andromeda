"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Repair extends System{
        constructor(){
            super("Repair")
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Repair.", (value)=>{
            })
        }
    }
    return new Repair()
}