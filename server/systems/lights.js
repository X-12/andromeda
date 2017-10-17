"use strict";

module.exports = (io,Ship) =>{
    class Lights {
        constructor(){
            this.on = false
            io.on("Lights.setLight", (value) => {
                setLight(value)
            })
        }
        setLight(value){
            if(typeof value == "boolean"){
                this.on = value
                io.emit("Lights.on",this.on)
            }
            else{
                console.error("Invalid type "+typeof value+" for Lights.setLight")
            }
        }
    }
    return new Lights()
}