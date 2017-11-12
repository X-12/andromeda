"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    const distance = (p1) => {
        return distancew(p1,Ship.Radar.position)
    }
    const distancew = (p1,p2) => {
        return distancep(p1[0],p1[1],p1[2],p2[0],p2[1],p2[2])
    }
    const distancep = (x1,y1,z1,x2,y2,z2) => {
        return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)+(y2-y1)*(y2-y1))
    }
    class Targeting extends System{
        constructor(){
            super("Targeting")
            this.set("targeted","")
        }
        setupSocket(socket){
            super.setupSocket(socket)
        }
        setupWatches(){
            Ship.Health.watch("Targeting",this.healthChanged)
            Ship.Power.watch("Targeting",this.powerChanged)
            Ship.Radar.watch("objects",this.radarChanged)
        }
        targetShip(uuid){
            if(Ship.Health.Targeting >= Ship.Defaults.Targeting.minhealth && Ship.Power.Targeting >= Ship.Defaults.Targeting.minpower){
                if(Ship.Radar.objects.hasOwnProperty(uuid) && distance(Ship.Radar.objects[uuid])<=Ship.Defaults.Targeting.targetrange){
                    this.set("targeted",uuid)
                }
            }
        }
        healthChanged(){
            if(Ship.Health.Targeting < Ship.Defaults.Targeting.minhealth){
                this.set("targeted","")
            }
        }
        powerChanged(){
            if(Ship.Power.Targeting < Ship.Defaults.Targeting.minpower){
                this.set("targeted","")
            }
        }
        radarChanged(){
            if(!Ship.Radar.objects.hasOwnProperty(this.targeted) && distance(Ship.Radar.objects[this.targeted])<=Ship.Defaults.Targeting.loserange){
                this.set("targeted","")
            }
        }
    }
    return new Targeting()
}