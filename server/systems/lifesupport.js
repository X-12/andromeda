"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class LifeSupport extends System {
        constructor(){
            super("LifeSupport")
            this.set("status",Ship.Defaults.LifeSupport.status)
            this.set("oxygen",Ship.Defaults.LifeSupport.oxygen)
        }
        setStatus(value){
            if(typeof value == "boolean"){
                if(value == true){

                    if(Ship.Power.LifeSupport < Ship.Defaults.LifeSupport.minpower){
                        //insufficient power
                        return
                    }
                    if(Ship.Health.LifeSupport < Ship.Defaults.LifeSupport.minhealth){
                        //insufficient health
                        return
                    }
                    this.set("status",true)
                }
                else{
                    this.set("status",false)
                }
            }
            else{
                console.error("Invalid type "+typeof value+" for LifeSupport.setStatus")
            }
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("LifeSupport.setStatus", (value) => {
                this.setStatus(value)
            })
        }
        setupWatches(){
            Ship.Power.watch("LifeSupport",Ship.LifeSupport.powerChanged)
            Ship.Health.watch("LifeSupport",Ship.LifeSupport.healthChanged)
        }
        powerChanged(){
            
            if(Ship.Power.LifeSupport < Ship.Defaults.LifeSupport.minpower){
                this.set("status",false)
            }
            
        }
        healthChanged(){
            
            if(Ship.Health.LifeSupport < Ship.Defaults.LifeSupport.minhealth){
                this.set("status",false)
            }
            
        }
    }
    return new LifeSupport()
}