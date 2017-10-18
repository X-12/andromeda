"use strict";

module.exports = (io,Ship) =>{
    class LifeSupport {
        constructor(){
            this.status = false
            this.oxygen = 100
            this.minpower = 50
            this.minhealth = 50
            io.on("LifeSupport.setStatus", (value) => {
                setStatus(value)
            })
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
                    this.status = true
                    //this.set("status",true)
                }
                else{
                    this.status = false
                    //this.set("status",false)
                }
            }
            else{
                console.error("Invalid type "+typeof value+" for LifeSupport.setStatus")
            }
        }
    }
    return new Lights()
}