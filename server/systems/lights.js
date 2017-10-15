"use strict";

class Lights {
    constructor(io){
        this.on = false
        this.io = io
        this.io.on("Lights.setLight", (value) => {
            setLight(value)
        })
    }
    setLight(value){
        if(typeof value == "boolean"){
            this.on = value
            this.io.emit("Lights.on",this.on)
        }
        else{
            console.error("Invalid type "+typeof value+" for Lights.setLight")
        }
    }
}