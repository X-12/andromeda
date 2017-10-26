"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Communications extends System{
        constructor(){
            super("Communications")
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Communications.sendMessage",(data)=>{
                this.sendMessage(data.message,data.frequency)
            })
            socket.on("Communications.fdsendMessage",(data)=>{
                this.fdsendMessage(data.message,data.frequency)
            })
        }
        sendMessage(message,frequency){
            //if(Ship.Power > Ship.Defaults.Communications.minpower && Ship.Health > Ship.Defaults.Communications.minhealth){
                //send message
            //}
        }
        fdsendMessage(message,frequency){
            //receive message (meant to be executed by the Flight Director)
        }
    }
    return new Communications()
}