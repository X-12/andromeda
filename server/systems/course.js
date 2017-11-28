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
                if(Ship.Health.Thrusters >= Ship.Defaults.Course.minthrustershealth && Ship.Power.Thrusters >= Ship.Defaults.Course.minthrusterspower){
                    this.set("status",value)
                }
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
            let delta = this.getDelta()/1000.0
            if(this.status == true){
                let wantedquaternion = Quaternion.rotationFromTo([0,0,-1],Ship.Objects.objects[Ship.Objects.shipid].position.sub(this.target))
                //interpolate between current quaternion and wanted quaternion
                Ship.Objects.objects[Ship.Objects.shipid].rotation = Quaternion.slerp(Ship.Objects.objects[Ship.Objects.shipid].rotation,wantedquaternion,Ship.Defaults.Course.Factor*delta)
                Ship.Objects.setT("objects",Ship.Objects.objects)
            }
            setImmediate(()=>{this.updateRotation()})
        }
        setupWatches(){
            Ship.Health.watch("Thrusters",this.thrustersHealthChanged,Ship.Course)
            Ship.Power.watch("Thrusters",this.thrustersPowerChanged,Ship.Course)
            Ship.Health.watch("Radar",this.radarHealthChanged,Ship.Course)
            Ship.Power.watch("Radar",this.radarPowerChanged,Ship.Course)
            this.updateRotation()
        }
    }
    return new Course()
}