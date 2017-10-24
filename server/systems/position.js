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
            /*Ship.WarpDrive.watch("velocity",speedChanged)
            Ship.ImpulseDrive.watch("velocity",speedChanged*/
            this.thread = fork('./server/systems/threads/position')
            this.thread.send({x:this.x,y:this.y,z:this.z,yaw:this.yaw,pitch:this.pitch,roll:this.roll,v:this.v})
            this.watch("x",this.xChanged)
            this.watch("y",this.yChanged)
            this.watch("z",this.zChanged)
            this.watch("yaw",this.yawChanged)
            this.watch("pitch",this.pitchChanged)
            this.watch("roll",this.rollChanged)
            this.watch("v",this.vChanged)
            this.thread.on('message',(data)=>{
                this.threadChanged(data)
            })
        }
        xChanged(){
            if(this.thread != null){
                this.thread.send({x:this.x})
            }
        }
        yChanged(){
            if(this.thread != null){
                this.thread.send({y:this.y})
            }
        }
        zChanged(){
            if(this.thread != null){
                this.thread.send({z:this.z})
            }
        }
        yawChanged(){
            if(this.thread != null){
                this.thread.send({yaw:this.yaw})
            }
        }
        pitchChanged(){
            if(this.thread != null){
                this.thread.send({pitch:this.pitch})
            }
        }
        rollChanged(){
            if(this.thread != null){
                this.thread.send({roll:this.roll})
            }
        }
        vChanged(){
            if(this.thread != null){
                this.thread.send({v:this.v})
            }
        }
        threadChanged(data){
            this.set("x",data.x)
            this.set("y",data.y)
            this.set("z",data.z)
        }
        speedChanged(){
            /*
            Set velocity accordingly
            */
        }
    }
    return new Position()
}