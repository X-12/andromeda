"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Position extends System {
        constructor(){
            super("Position")
            this.set("x",0)
            this.set("y",0)
            this.set("z",0)
            this.set("yaw",0)
            this.set("pitch",0)
            this.set("roll",0)
            this.set("v",0)
        }
        setX(value){
            if(typeof value == "number"){
                this.set("x",value)
            }
        }
        setY(value){
            if(typeof value == "number"){
                this.set("y",value)
            }
        }
        setZ(value){
            if(typeof value == "number"){
                this.set("z",value)
            }
        }
        setYaw(value){
            if(typeof value == "number"){
                this.set("yaw",value)
            }
        }
        setPitch(value){
            if(typeof value == "number"){
                this.set("pitch",value)
            }
        }
        setRoll(value){
            if(typeof value == "number"){
                this.set("roll",value)
            }
        }
        setupSocket(socket){
            super.setupSocket(socket)
            const functions = ["setX","setY","setZ","setYaw","setPitch","setRoll"]
            functions.forEach((name)=>{
                socket.on("Position."+name, (value) => {
                    this[name](value)
                })
            })
        }
        setupWatches(){
            /*Ship.WarpDrive.watch("velocity",speedChanged)
            Ship.ImpulseDrive.watch("velocity",speedChanged*/
        }
        speedChanged(){
            /*
            Set velocity accordingly
            */
        }
    }
    return new Position()
}