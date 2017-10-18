"use strict";

module.exports = (io,Ship) =>{
    class Alert {
        constructor(){
            this.status = 3
            io.on("Alert.status", (value) => {
                setStatus(value)
            })
        }
        setLight(value){
            if(typeof value == "number"){
                this.status = value
                io.emit("Alert.status",this.status)
            }
            else{
                console.error("Invalid type "+typeof value+" for Alert.setStatus")
            }
        }
    }
    return new Alert()
}