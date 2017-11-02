"use strict";

module.exports = (io,Ship) =>{
    class System {
        constructor(name){
            this.callbacks = {}
            this.name = name
            this.lastTime = null
        }
        set(ident,value){
            this[ident] = value
            io.emit(this.name+"."+ident,value)
            if(this.callbacks.hasOwnProperty(ident)){
                for(var i in this.callbacks[ident]){
                    setImmediate(this.callbacks[ident][i])
                }
            }
            else{
                this.callbacks[ident] = []
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