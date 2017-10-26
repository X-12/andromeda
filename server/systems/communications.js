"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Communications extends System{
        constructor(){
            super("Communications")
        }
        setupSocket(socket){
            super.setupSocket(socket)
        }
    }
    return new Communications()
}