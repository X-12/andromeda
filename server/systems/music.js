"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Music extends System{
        constructor(){
            super("Music")
            this.set("song", Ship.Defaults.Music.song)
        }
        setMusic(value){
            if(typeof value == "string"){
                this.set("song",value)
            }
            else{
                console.error("Invalid type "+typeof value+" for Music.setMusic")
            }
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Music.setMusic", (value)=>{
                this.setMusic(value)
            })
        }
    }
    return new Music()
}