"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    const alfador = require("alfador")
    class Targeting extends System{
        constructor(){
            super("Targeting")
            this.set("targeted","")
        }
        setupSocket(socket){
            super.setupSocket(socket)
        }
        setupWatches(){
            Ship.Health.watch("Targeting",Ship.Targeting.healthChanged)
            Ship.Power.watch("Targeting",Ship.Targeting.powerChanged)
            Ship.Radar.watch("objects",Ship.Targeting.radarChanged)
        }
        targetShip(uuid){
            if(Ship.Health.Targeting >= Ship.Defaults.Targeting.minhealth && Ship.Power.Targeting >= Ship.Defaults.Targeting.minpower){
                if(Ship.Radar.objects.hasOwnProperty(uuid) && Ship.Radar.position.sub(Ship.Radar.objects[uuid].position).length()<=Ship.Defaults.Targeting.targetrange){
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
            if(!Ship.Radar.objects.hasOwnProperty(this.targeted) && Ship.Radar.position.sub(Ship.Radar.objects[this.targeted]).length()<=Ship.Defaults.Targeting.loserange){
                this.set("targeted","")
            }
        }
    }
    return new Targeting()
}