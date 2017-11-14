"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Objectives extends System{
        constructor(){
            super("Objectives")
            this.set("message", Ship.Defaults.Objectives.message)
        }
        setMessage(value){
            this.set("message",value)
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Objectives.setMessage", (value)=>{
                this.setMessage(value)
            })
        }
    }
    return new Objectives()
}