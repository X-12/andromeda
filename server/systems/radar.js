"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Radar extends System{
        constructor(){
            super("Radar")
        }
        setupSocket(){
            super.setupSocket()
        }
        setupWatches(){

        }
    }
    return new Radar()
}