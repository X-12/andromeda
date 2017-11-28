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
        updateOxygen(){
            let delta = this.getDelta()/1000
            if(this.status == true){
                if(this.oxygen < 100){
                this.setT("oxygen",this.oxygen+Ship.Defaults.LifeSupport.replenishRate*delta)
                }
                else{
                    this.setT("oxygen",100)
                }
            }
            else{
                if(this.oxygen > 0){
                    this.setT("oxygen",this.oxygen-Ship.Defaults.LifeSupport.depletionRate*delta)
                }
                else{
                    this.setT("oxygen",0)
                }
            }
            setImmediate(()=>{this.updateOxygen()})
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("LifeSupport.setStatus", (value) => {
                this.setStatus(value)
            })
        }
        setupWatches(){
            Ship.Power.watch("LifeSupport",this.powerChanged,Ship.LifeSupport)
            Ship.Health.watch("LifeSupport",this.healthChanged,Ship.LifeSupport)
            this.updateOxygen()
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