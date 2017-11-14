"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Thrusters extends System{
        constructor(){
            super("Thrusters")
            this.set("x",0)
            this.set("y",0)
            this.set("z",0)
            this.set("h",0)
            this.set("p",0)
            this.set("r",0)
        }
        setupSocket(socket){
            super.setupSocket(socket)
            const values = ["X","Y","Z","H","P","R"]
            values.forEach((value)=>{
                socket.on("Thrusters.set"+value,(data)=>{
                    this["set"+value](data)
                })
            })
        }
        setX(value){
            this.set("x",value)
        }
        setY(value){
            this.set("y", value)
        }
        setZ(value){
            this.set("z",value)
        }
        setH(value){
            this.set("h",value)
        }
        setP(value){
            this.set("p", value)
        }
        setR(value){
            this.set("r",value)
        }
    }
    return new Thrusters()
}