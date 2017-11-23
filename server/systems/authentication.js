"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Authentication extends System{
        constructor(){
            super("Authentication")
            this.set("list",Ship.Defaults.Authentication.list)
        }
        add(event,data){
            this.list.push({event,data})
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Authentication.remove", (value)=>{
                this.list.splice(value,1)
            })
        }
    }
    return new Authentication()
}