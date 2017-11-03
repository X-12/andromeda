"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    const uuid = require("uuid/v4")
    const add = (a,b) => {
        let c = [0,0,0]
        c[0] = b[0]+a[0]
        c[1] = b[1]+a[1]
        c[2] = b[2]+a[2]
        return c
    }
    const multiply = (a,b) => {
        let c = [0,0,0]
        c[0] =a[0]*b
        c[1] = a[1]*b
        c[2] = a[2]*b
        return c
    }
    class Objects extends System {
        constructor(){
            super("Objects")
            const shipid = uuid()
            this.set("objects",{
                [shipid]:{
                    name:"Andromeda",
                    type:"ship",
                    position:[0,0,0],
                    velocity:[1,0,0],
                    acceleration:[0,0,0],
                    rotation:[0,0,0],
                    info:"The ship you are currently on."
                }
            })
            this.set("shipid",shipid)
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Objects.addObject",(data)=>{
                this.addObject(data.name,data.type,data.position,data.velocity,data.acceleration,data.rotation,data.info)
            })
            socket.on("Objects.removeObject",(data)=>{
                this.removeObject(data)
            })
        }
        addObject(name,type,position,velocity,acceleration,rotation,info){
            let newobjects = this.objects
            newobjects[uuid()] = {name:name,type:type,position:position,velocity:velocity,acceleration:acceleration,rotation:rotation,info:info}
            this.set("objects",newobjects)
        }
        removeObject(uuid){
            let newobjects = this.objects
            delete newobjects[uuid]
            this.set("objects",newobjects)
        }
        updateAcceleration(uuid,acceleration){
            let newobjects = this.objects
            newobjects[uuid].acceleration = acceleration
            this.set("objects",newobjects)
        }
        updateObjects(){
            let delta = this.getDelta()/1000
            let newobjects = this.objects
            for(var key in newobjects){
                if(newobjects.hasOwnProperty(key)){
                    newobjects[key].position = add(newobjects[key].position,add(multiply(newobjects[key].acceleration,0.5*delta*delta),multiply(newobjects[key].velocity,delta)))
                    newobjects[key].velocity = add(newobjects[key].velocity,multiply(newobjects[key].acceleration,delta))
                }
            }
            this.set("objects",newobjects)
            setImmediate(()=>{this.updateObjects()})
        }
        setupWatches(){
            this.updateObjects()
        }
    }
    return new Objects()
}