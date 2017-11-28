"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Authentication extends System{
        constructor(){
            super("Authentication")
            this.set("list",Ship.Defaults.Authentication.list)
        }
        addEvent(event,data){
            this.list.push({event,data})
            this.set("list",this.list)
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Authentication.remove", (value)=>{
                this.list.splice(value,1)
                this.set("list",this.list)
            })
            socket.on("Authentication.add",(value)=>{
                this.addEvent(value.event,value.data)
            })
        }
    }
    return new Authentication()
}