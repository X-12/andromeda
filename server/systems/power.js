"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Power extends System{
        constructor(){
            super("Power")
            this.set("Sensors", Ship.Defaults.Power.Sensors)
            this.set("Impulse", Ship.Defaults.Power.Impulse)
            this.set("Warp", Ship.Defaults.Power.Warp)
            this.set("Communications", Ship.Defaults.Power.Communications)
            this.set("LifeSupport", Ship.Defaults.Power.LifeSupport)
            this.set("Radar", Ship.Defaults.Power.Radar)
            this.set("Thrusters", Ship.Defaults.Power.Thrusters)
            this.set("Targeting", Ship.Defaults.Power.Targeting)
            this.set("Transporters", Ship.Defaults.Power.Transporters)
            this.set("Available", Ship.Defaults.Power.Available)
        }
        allocatePower(value){
            if(typeof value.system == "string" && typeof value.power == "number" && value.power >= 0){
                if (this[value.system] > value.power) {
                    this.set("Available", (this.Available + (this[value.system] - value.power)))
                } else {
                    this.set("Available", (this.Available - (value.power - this[value.system])))
                }
                this.set(this[value.system], value.power)
            }
            else{
                console.error("Invalid type(s) " + typeof value.system + " and/or " + typeof value.power + " for Power.allocatePower")
            }
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Power.allocatePower", (value)=>{
                this.allocatePower(value)
            })
        }
    }
    return new Power()
}