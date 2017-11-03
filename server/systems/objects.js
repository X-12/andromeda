"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    const uuid = require("uuid/v4")
    class Objects extends System {
        constructor(){
            super("Objects")
            const shipid = uuid()
            this.set("objects",{
                [shipid]:{
                    name:"Andromeda",
                    type:"ship",
                    position:[0,0,0],
                    velocity:[0,0,0],
                    accleration:[0,0,0],
                    rotation:[0,0,0],
                    info:"The ship you are currently on."
                }
            })
            this.set("shipid",shipid)
        }
        setupSocket(socket){
            super.setupSocket(socket)
        }
        addObject(name,type,position,velocity,accleration,rotation,info){
            let newobjects = this.objects
            newobjects[uuid()] = {name:name,type:type,position:position,velocity:velocity,accleration:accleration,rotation:rotation,info:info}
            this.set("objects",newobjects)
        }
        removeObject(uuid){
            let newobjects = this.objects
            delete newobjects[uuid]
            this.set("objects",newobjects)
        }
        setupWatches(){

        }
    }
    return new Objects()
}