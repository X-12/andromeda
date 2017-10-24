"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Impulse extends System{
        constructor(){
            super("Impulse")
            this.set("speed",0)
        }
        setSpeed(value){
            if(typeof value == "number" && 0 <= value < 10){
                //if(Ship.Power.Impulse > some value && Ship.Health.Impulse > some value){
                this.set("speed",value)
                //}
            }
            else{
                console.error("Invalid type "+typeof value+" for Impulse.setSpeed")
            }
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Impulse.setSpeed", (value)=>{
                this.setSpeed(value)
            })
        }
        powerChanged(){
            /*
            if(Ship.Power.Impulse < some config value){
                this.set("speed",0)
            }
            */
        }
        healthChanged(){
            /*
            if(Ship.Health.Impulse < some config value){
                this.set("speed",0)
            }*/
        }
        setupWatches(){
            /*
            Ship.Power.watch("Impulse",this.powerChanged)
            Ship.Health.watch("Impulse",this.healthChanged)
            */
        }
    }
    return new Impulse()
}