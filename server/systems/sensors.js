"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Sensors extends System {
        constructor(){
            super("Sensors")
        }

        setupSocket(socket){
            super.setupSocket(socket)
        }
        setupWatches(){

        }
    }
    return new Sensors()
}