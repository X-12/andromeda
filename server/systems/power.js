"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Power extends System{
        constructor(){
            super("Power")
            this.set("LifeSupport", Ship.Defaults.Power.LifeSupport)
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