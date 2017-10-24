"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Warp extends System{
        constructor(){
            super("Warp")
            this.set("speed",0)
        }
        setSpeed(value){
            if(typeof value == "number" && 0 <= value < 10){
                this.set("speed",value)
            }
            else{
                console.error("Invalid type "+typeof value+" for Warp.setSpeed")
            }
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Warp.setSpeed", (value)=>{
                this.setSpeed(value)
            })
        }
    }
    return new Warp()
}