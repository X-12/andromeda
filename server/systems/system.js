"use strict";

module.exports = (io,Ship) =>{
    class System {
        constructor(name){
            this.callbacks = {}
            this.name = name
            this.lastTime = null
            this.timeout = null
        }
        set(ident,value){
            this[ident] = value
            io.emit(this.name+"."+ident,value)
            if(this.callbacks.hasOwnProperty(ident)){
                for(var i in this.callbacks[ident]){
                    setImmediate(()=>{this.callbacks[ident][i]()})
                }
            }
            else{
                this.callbacks[ident] = []
            } 
        }
        setT(ident,value){
            this[ident] = value
            if(this.timeout == null){
                this.timeout = setTimeout(()=>{
                    this.set(ident,value)
                    this.timeout=null
                },Ship.Defaults.System.throttle)
            }
        }
        watch(ident,callback){
            if(this.callbacks.hasOwnProperty(ident)){
                this.callbacks[ident].push(callback)
            }
            else{
                this.callbacks[ident] = [callback]
            }
        }
        setupWatches(){
        }
        setupSocket(socket){
            for(var ident in this.callbacks){
                if(this.callbacks.hasOwnProperty(ident)){
                    socket.emit(this.name+"."+ident,this[ident])
                }
            }
        }
        getDelta(){
            if(this.lastTime == null){
                this.lastTime = Date.now()
                return 0
            }
            let now = Date.now()
            let dt = now - this.lastTime
            this.lastTime = now
            return dt
        }
    }
    return System
}