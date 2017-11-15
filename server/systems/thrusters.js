"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Thrusters extends System{
        constructor(){
            super("Thrusters")
            this.set("x",0)
            this.set("y",0)
            this.set("z",0)
            this.set("h",0)
            this.set("p",0)
            this.set("r",0)
        }
        setupSocket(socket){
            super.setupSocket(socket)
            const values = ["X","Y","Z","H","P","R"]
            values.forEach((value)=>{
                socket.on("Thrusters.set"+value,(data)=>{
                    this["set"+value](data)
                })
            })
        }
        setX(value){
            if(Ship.Power.Thrusters >= Ship.Defaults.Thrusters.minpower && Ship.Health.Thrusters >= Ship.Defaults.Thrusters.minhealth){
            this.set("x",value)
            }
        }
        setY(value){
            if(Ship.Power.Thrusters >= Ship.Defaults.Thrusters.minpower && Ship.Health.Thrusters >= Ship.Defaults.Thrusters.minhealth){
            this.set("y",value)
            }
        }
        setZ(value){
            if(Ship.Power.Thrusters >= Ship.Defaults.Thrusters.minpower && Ship.Health.Thrusters >= Ship.Defaults.Thrusters.minhealth){
            this.set("z",value)
            }
        }
        setH(value){
            if(Ship.Power.Thrusters >= Ship.Defaults.Thrusters.minpower && Ship.Health.Thrusters >= Ship.Defaults.Thrusters.minhealth){
            this.set("h",value)
            }
        }
        setP(value){
            if(Ship.Power.Thrusters >= Ship.Defaults.Thrusters.minpower && Ship.Health.Thrusters >= Ship.Defaults.Thrusters.minhealth){
            this.set("p",value)
            }
        }
        setR(value){
            if(Ship.Power.Thrusters >= Ship.Defaults.Thrusters.minpower && Ship.Health.Thrusters >= Ship.Defaults.Thrusters.minhealth){
            this.set("r",value)
            }
        }
        healthChanged(){
            if(Ship.Health.Thrusters<Ship.Defaults.Thrusters.minhealth){
                const values = ["x","y","z","h","p","r"]
                values.forEach((value)=>{
                    this.set(value,0)
                })    
            }
        }
        powerChanged(){
            if(Ship.Power.Thrusters<Ship.Defaults.Thrusters.minpower){
                const values = ["x","y","z","h","p","r"]
                values.forEach((value)=>{
                    this.set(value,0)
                })    
            }
        }
        setupWatches(){
            Ship.Health.watch("Thrusters",this.healthChanged)
            Ship.Power.watch("Thrusters",this.powerChanged)
        }
    }
    return new Thrusters()
}