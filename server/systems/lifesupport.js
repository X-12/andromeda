"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class LifeSupport extends System {
        constructor(){
            super("LifeSupport")
            this.set("status",false)
            this.set("oxygen",100)
            this.minpower = 50
            this.minhealth = 50
        }
        setStatus(value){
            if(typeof value == "boolean"){
                if(value == true){
                    if(Ship.Power.LifeSupport < this.minpower){
                        //insufficient power
                        return
                    }
                    if(Ship.Health.LifeSupport < this.minhealth){
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
            Ship.Power.watch("LifeSupport",this.powerChanged)
            Ship.Health.watch("LifeSupport",this.healthChanged)
        }
        powerChanged(){
            
            if(Ship.Power.LifeSupport < this.minpower){
                this.set("status",false)
            }
            
        }
        healthChanged(){
            
            if(Ship.Health.LifeSupport < this.minpower){
                this.set("status",false)
            }
            
        }
    }
    return new LifeSupport()
}