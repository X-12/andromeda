"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    const distance = (p1,p2) => {
        return distance(p1[0],p1[1],p1[2],p2[0],p2[1],p2[2])
    }
    const distance = (x1,y1,z1,x2,y2,z2) => {
        return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)+(y2-y1)*(y2-y1))
    }
    class Radar extends System{
        constructor(){
            super("Radar")
            this.set("objects",{
            })
            this.set("position",[0,0,0])
            this.set("rotation",[0,0,0])
            this.set("velocity",[0,0,0])
        }
        setupSocket(){
            super.setupSocket()
        }
        setupWatches(){
            Ship.Objects.watch("objects",this.objectsUpdated)
            Ship.Health.watch("Radar",this.healthChanged)
            Ship.Power.watch("Radar",this.powerChanged)
            this.objectsUpdated()
        }
        objectsUpdated(){
            if(Ship.Health.Radar > Ship.Defaults.Radar.minhealth && Ship.Power.Radar > Ship.Defaults.Radar.minpower){
                this.objects = {}
                this.set("position",Ship.Objects.objects[Ship.Objects.shipid].position)
                this.set("rotation",Ship.Objects.objects[Ship.Objects.shipid].rotation)
                this.set("velocity",Ship.Objects.objects[Ship.Objects.shipid].velocity)
                for(key in Ship.Objects.objects){
                    if(Ship.Objects.objects.hasOwnProperty(key) && key != Ship.Objects.shipid){
                        if(distance(this.position,Ship.Objects.objects[key]) < (Ship.Power.Radar/Ship.Defaults.Power.Radar)*Ship.Defaults.Radar.Range){
                            this.objects[key] = Ship.Objects.objects[key]
                        }
                    }
                }
                this.set("objects",this.objects)
            }
        }
        healthChanged(){
            if(Ship.Health.Radar < Ship.Defaults.Radar.minhealth){
                this.set("objects",{})
            }
        }
        powerChanged(){
            if(Ship.Power.Radar < Ship.Defaults.Radar.minpower){
                this.set("objects",{})
            }
        }
    }
    return new Radar()
}