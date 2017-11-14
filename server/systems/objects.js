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
                    velocity:[0,0,0],
                    angular:[0,0,0],
                    rotation:[0,0,0],
                    info:"The ship you are currently on."
                }
            })
            this.set("shipid",shipid)
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Objects.addObject",(data)=>{
                this.addObject(data)
            })
            socket.on("Objects.removeObject",(data)=>{
                this.removeObject(data)
            })
        }
        addObject(data){
            let newobjects = this.objects
            newobjects[uuid()] = data
            this.set("objects",newobjects)
        }
        removeObject(uuid){
            let newobjects = this.objects
            delete newobjects[uuid]
            this.set("objects",newobjects)
        }
        updateVelocity(uuid,velocity){
            let newobjects = this.objects
            newobjects[uuid].velocity = velocity
            this.set("objects",newobjects)
        }
        updateRotation(uuid,rotation){
            let newobjects = this.objects
            newobjects[uuid].rotation = rotation
            this.set("objects",newobjects)
        }
        updateObjects(){
            let delta = this.getDelta()/1000
            let newobjects = this.objects
            for(var key in newobjects){
                if(newobjects.hasOwnProperty(key)){
                    newobjects[key].position = add(newobjects[key].position,multiply(newobjects[key].velocity,delta))
                }
            }
            this.set("objects",newobjects)
            setImmediate(()=>{this.updateObjects()})
        }
        stuffChanged(){
            //set velocity and angular velocity accordingly
        }
        setupWatches(){
            this.updateObjects()
        }
    }
    return new Objects()
}