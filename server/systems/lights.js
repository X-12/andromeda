"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Lights extends System{
        constructor(){
            super("Lights")
            this.set("on",false)
            io.on("Lights.setLight", (value) => {
                setLight(value)
            })
        }
        setLight(value){
            if(typeof value == "boolean"){
                this.set("on",value)
            }
            else{
                console.error("Invalid type "+typeof value+" for Lights.setLight")
            }
        }
    }
    return new Lights()
}