"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Lights extends System{
        constructor(){
            super("Lights")
            this.set("on",Ship.Defaults.Lights)
        }
        setLight(value){
            if(typeof value == "boolean"){
                this.set("on",value)
            }
            else{
                console.error("Invalid type "+typeof value+" for Lights.setLight")
            }
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Lights.setLight", (value)=>{
                this.setLight(value)
            })
        }
    }
    return new Lights()
}