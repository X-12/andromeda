"use strict";

module.exports = (io,Ship) =>{
    class System {
        constructor(name){
            this.callbacks = {}
            this.name = name
        }
        set(ident,value){
            this[ident] = value
            io.emit(this.name+"."+ident,value)
            if(this.callbacks.hasOwnProperty(ident)){
                for(callback in this.callbacks[ident]){
                    callback()
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
    }
    return System
}