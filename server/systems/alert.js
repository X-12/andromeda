"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Alert extends System{
        constructor(){
            super("Alert")
            this.set("status",3)
        }
        setStatus(value){
            if(typeof value == "number"){
                this.set("status",value)
            }
            else{
                console.error("Invalid type "+typeof value+" for Alert.setStatus")
            }
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Alert.setStatus", (value)=>{
                this.setStatus(value)
            })
        }
    }
    return new Alert()
}