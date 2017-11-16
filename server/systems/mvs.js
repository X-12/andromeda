"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class MVS extends System{
        constructor(){
            super("MVS")
            this.set("screen", Ship.Defaults.MVS.screen)
        }
        setScreen(value){
            if(typeof value == "string"){
                this.set("status",value)
            }
            else{
                console.error("Invalid type "+typeof value+" for MVS.setScreen")
            }
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("MVS.setScreen", (value)=>{
                this.setScreen(value)
            })
        }
    }
    return new MVS()
}