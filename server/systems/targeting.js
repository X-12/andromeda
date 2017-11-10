"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Targeting extends System{
        constructor(){
            super("Targeting")
        }
        setupSocket(socket){
            super.setupSocket(socket)
        }
        setupWatches(){
            
        }
    }
    return new Targeting()
}