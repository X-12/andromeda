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
                if(Ship.Power.Warp > Ship.Defaults.Warp.minpower && Ship.Health.Warp > Ship.Defaults.Warp.minhealth){
                this.set("speed",value)
                }
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
        powerChanged(){
            if(Ship.Power.Warp < Ship.Defaults.Warp.minpower){
                this.set("speed",0)
            }
        }
        healthChanged(){
            if(Ship.Health.Warp < Ship.Defaults.Warp.minhealth){
                this.set("speed",0)
            }
        }
        setupWatches(){
            Ship.Power.watch("Warp",Ship.Warp.powerChanged)
            Ship.Health.watch("Warp",Ship.Warp.healthChanged)
        }
    }
    return new Warp()
}