"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    const alfador = require("alfador")
    const Quaternion = alfador.Quaternion
    const Vec3 = alfador.Vec3
    class Radar extends System{
        constructor(){
            super("Radar")
            this.set("objects",{
            })
            this.set("position",new Vec3([0,0,0]))
            this.set("rotation",Quaternion.identity())
            this.set("velocity",new Vec3([0,0,0]))
            this.set("angular",Quaternion.identity())
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
                this.set("angular",Ship.Objects.objects[Ship.Objects.shipid].angular)
                for(var key in Ship.Objects.objects){
                    if(Ship.Objects.objects.hasOwnProperty(key) && key != Ship.Objects.shipid){
                        if(this.position.sub(Ship.Objects.objects[key].position).length() < (Ship.Power.Radar/Ship.Defaults.Power.Radar)*Ship.Defaults.Radar.Range){
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