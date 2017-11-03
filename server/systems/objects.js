"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Objects extends System {
        constructor(){
            super("Objects")
        }
        setupSocket(socket){
            super.setupSocket(socket)
        }
        setupWatches(){

        }
    }
    return new Objects()
}