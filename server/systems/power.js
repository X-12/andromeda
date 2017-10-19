"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Power extends System{
        constructor(){
            super("Power")
            this.set("LifeSupport", 100)
            this.set("Available", 0)
        }
        allocatePower(value){
            if(typeof value.system == "string" && typeof value.power == "number"){
                if (this[value.system] > value.power) {
                    this.set("Available", (this.Available + (this[value.system] - value.power)))
                } else {
                    this.set("Available", (this.Available - (value.power - this[value.system])))
                }
                this.set(this[value.system], value.power)
            }
            else{
                console.error("Invalid type(s) " + typeof value.system + " and " + typeof value.power + " for Power.allocatePower")
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