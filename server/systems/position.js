"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    const fork = require('child_process').fork
    class Position extends System {
        constructor(){
            super("Position")
            this.set("x",0)
            this.set("y",0)
            this.set("z",0)
            this.set("yaw",0)
            this.set("pitch",0)
            this.set("roll",0)
            this.set("v",0)
            this.thread = null
        }
        setX(value){
            if(typeof value == "number"){
                this.set("x",value)
            }
        }
        setY(value){
            if(typeof value == "number"){
                this.set("y",value)
            }
        }
        setZ(value){
            if(typeof value == "number"){
                this.set("z",value)
            }
        }
        setYaw(value){
            if(typeof value == "number"){
                this.set("yaw",value)
            }
        }
        setPitch(value){
            if(typeof value == "number"){
                this.set("pitch",value)
            }
        }
        setRoll(value){
            if(typeof value == "number"){
                this.set("roll",value)
            }
        }
        updatePosition(){
            let delta = this.getDelta()
            let newx = Math.cos(this.pitch)*Math.sin(this.yaw)*this.v*(1000/delta)
            let newy = Math.cos(this.pitch)*Math.cos(this.yaw)*this.v*(1000/delta)
            let newz = Math.sin(this.pitch)*this.v*(1000/delta)
            this.set("x",newx)
            this.set("y",newy)
            this.set("z",newz)
            setImmediate(()=>{this.updatePosition()})
        }
        setupSocket(socket){
            super.setupSocket(socket)
            const functions = ["setX","setY","setZ","setYaw","setPitch","setRoll"]
            functions.forEach((name)=>{
                socket.on("Position."+name, (value) => {
                    this[name](value)
                })
            })
        }
        setupWatches(){
            Ship.Warp.watch("speed",this.speedChanged)
            Ship.Impulse.watch("speed",this.speedChanged)
            setImmediate(()=>{this.updatePosition()})
        }
        speedChanged(){
            this.set("v",Ship.Defaults.Warp.Factor*Ship.Warp.speed,Ship.Defaults.Impulse.Factor*Ship.Impulse.speed)
        }
    }
    return new Position()
}