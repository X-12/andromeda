"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Authentication extends System{
        constructor(){
            super("Authentication")
            this.set("Warp",Ship.Defaults.Authentication.Warp)
        }
        setStatus(system,value){
            this[system] = value
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Authentication.setStatus", (value)=>{
                this.setStatus(value.system,value.value)
            })
        }
    }
    return new Authentication()
}