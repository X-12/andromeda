"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    const uuid = require("uuid/v4")
    const alfador = require("alfador")
    const Quaternion = alfador.Quaternion
    const Vec3 = alfador.Vec3
    class Objects extends System {
        constructor(){
            super("Objects")
            const shipid = uuid()
            this.set("objects",{
                [shipid]:{
                    name:"Andromeda",
                    type:"ship",
                    position:new Vec3([0,0,0]),
                    velocity:new Vec3([0,0,0]),
                    angular:Quaternion.identity(),
                    rotation:Quaternion.identity(),
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
            let newUUUID = uuid()
            newobjects[newUUUID] = data
            this.set("objects",newobjects)
            let traobjects = Ship.Transporters.objects
            traobjects[newUUUID] = {[newUUUID]: {range: 0, override: 0, subResidences: {}, objects: {}}}
            Ship.Transporters.set("objects", traobjects)
        }
        removeObject(uuid){
            let newobjects = this.objects
            delete newobjects[uuid]
            this.set("objects",newobjects)
            newobjects = Ship.Transporters.objects
            delete newobjects[uuid]
            Ship.Transporters.set("objects", newobjects)
        }
        updateVelocity(uuid,velocity){
            let newobjects = this.objects
            newobjects[uuid].velocity = velocity
            this.set("objects",newobjects)
        }
        updateAngular(uuid,angular){
            let newobjects = this.objects
            newobjects[uuid].angular = angular
            this.set("objects",newobjects)
        }
        updateRotation(uuid,rotation){
            let newobjects = this.objects
            newobjects[uuid].rotation = rotation
            this.set("objects",newobjects)
        }
        updateObjects(){
            let delta = this.getDelta()/1000.0
            let newobjects = this.objects
            for(var key in newobjects){
                if(newobjects.hasOwnProperty(key)){
                    newobjects[key].rotation = newobjects[key].rotation.multQuat(Quaternion.slerp(Quaternion.identity(),newobjects[key].angular,delta))
                    newobjects[key].position = newobjects[key].position.add(newobjects[key].rotation.rotate(newobjects[key].velocity).multScalar(delta))
                }
            }
            this.setT("objects",newobjects)
            setImmediate(()=>{this.updateObjects()})
        }
        stuffChanged(){
            this.objects[this.shipid].velocity = [Ship.Thrusters.x*Ship.Defaults.Thrusters.Factor,Ship.Thrusters.y*Ship.Defaults.Thrusters.Factor,-1*(Ship.Thrusters.z*Ship.Defaults.Thrusters.Factor+Ship.Warp.speed*Ship.Defaults.Warp.Factor+Ship.Impulse.speed*Ship.Defaults.Impulse.Factor)]
            this.objects[this.shipid].angular = Quaternion.rotation(Ship.Thrusters.h*Ship.Defaults.Thrusters.AngularFactor,[0,-1,0]).multQuat(Quaternion.rotation(Ship.Thrusters.p*Ship.Defaults.Thrusters.AngularFactor,[-1,0,0])).multQuat(Quaternion.rotation(Ship.Thrusters.r*Ship.Defaults.Thrusters.AngularFactor,[0,0,-1]))
        }
        setupWatches(){
            this.updateObjects()
            const thrusters = ["x","y","z","h","p","r"]
            thrusters.forEach((value)=>{
                Ship.Thrusters.watch(value,Ship.Objects.stuffChanged)
            })
            Ship.Warp.watch("speed",Ship.Objects.stuffChanged)
            Ship.Impulse.watch("speed",Ship.Objects.stuffChanged)
        }
    }
    return new Objects()
}
