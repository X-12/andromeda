"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Thrusters extends System{
        constructor(){
            super("Thrusters")
        }
        setupSocket(socket){
            super.setupSocket(socket)
        }
    }
    return new Thrusters()
}