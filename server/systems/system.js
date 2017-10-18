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
            try{
                for(callback in this.callbacks[ident]){
                    callback()
                }
            }
            catch(error){
                this.callbacks.ident = []
            } 
        }
        watch(ident,callback){
            try{
                this.callbacks[ident].push(callback)
            }
            catch(error){
                this.callbacks.ident = [callback]
            }
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