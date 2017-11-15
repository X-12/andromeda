"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Course extends System{
        constructor(){
            super("Course")
            this.set("target", Ship.Defaults.Course.target)
            this.set("status", Ship.Defaults.Course.status)
        }
        setStatus(value){
            if(Ship.Health.Radar > Ship.Defaults.Course.mincoursehealth && Ship.Power.Radar > Ship.Defaults.Course.mincoursepower){
                //if(Ship.Health.Thrusters >= Ship.Defaults.Course.minthrustershealth && Ship.Power.Thrusters >= Ship.Defaults.Course.minthrusterspower){
                    this.set("status",value)
                //}
            }
        }
        setTarget(value){
            this.set("target",value)
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Course.setStatus", (value)=>{
                this.setStatus(value)
            })
            socket.on("Course.setTarget",(value)=>{
                this.setTarget(value)
            })
        }
        thrustersHealthChanged(){
            if(Ship.Health.Thrusters < Ship.Defaults.Course.minthrustershealth){
                this.set("status",false)
            }
        }
        thrustersPowerChanged(){
            if(Ship.Power.Thrusters < Ship.Defaults.Course.minthrusterspower){
                this.set("status",false)
            }
        }
        radarPowerChanged(){
            if(Ship.Power.Radar < Ship.Defaults.Course.minradarpower){
                this.set("status",false)
            } 
        }
        radarHealthChanged(){
            if(Ship.Health.Radar < Ship.Defaults.Course.minthrustershealth){
                this.set("status",false)
            }       
        }
        updateRotation(){
            if(this.status == true){
                //do cool stuff
            }
            setImmediate(()=>{this.updateRotation()})
        }
        setupWatches(){
            Ship.Health.watch("Thrusters",this.thrustersHealthChanged)
            Ship.Power.watch("Thrusters",this.thrustersPowerChanged)
            Ship.Health.watch("Radar",this.radarHealthChanged)
            Ship.Power.watch("Radar",this.radarPowerChanged)
            updateRotation()
        }
    }
    return new Course()
}