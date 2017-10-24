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
                //if(Ship.Power.Warp > some value && Ship.Health.Warp > some value){
                this.set("speed",value)
                //}
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
            /*
            if(Ship.Power.Warp < some config value){
                this.set("speed",0)
            }
            */
        }
        healthChanged(){
            /*
            if(Ship.Health.Warp < some config value){
                this.set("speed",0)
            }*/
        }
        setupWatches(){
            /*
            Ship.Power.watch("Warp",this.powerChanged)
            Ship.Health.watch("Warp",this.healthChanged)
            */
        }
    }
    return new Warp()
}