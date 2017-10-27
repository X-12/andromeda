"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Communications extends System{
        constructor(){
            super("Communications")
            this.set("network","") //Blank = not connected.
            this.set("networks",Ship.Defaults.Communications.networks) 
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Communications.sendMessage",(data)=>{
                this.sendMessage(data.message,data.frequency)
            })
        }
        connectToNetwork(name){

        }
    }
    return new Communications()
}